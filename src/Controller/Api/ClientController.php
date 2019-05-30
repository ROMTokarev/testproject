<?php

namespace App\Controller\Api;

use App\Entity\Client;
use PhpAmqpLib\Connection\AMQPStreamConnection;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;

use PhpAmqpLib\Message\AMQPMessage;

/**
 * @Route("/client")
 *
 * Class ClientController
 * @package App\Controller\Api
 */
class ClientController extends Controller
{

    private $response;
    private $connection;
    private $channel;

    public function __construct()
    {
        $this->connection = new AMQPStreamConnection('localhost', 5672, 'guest', 'guest');
        $this->channel = $this->connection->channel();

        $this->channel->queue_declare(
            'ApiReturn',	#queue
            false,      	#passive
            false,      	#durable
            false,      	#exclusive
            false       	#autodelete
        );

        $this->channel->basic_qos(
            null,   #prefetch size
            1,  	#prefetch count
            null	#global
        );

        $this->channel->basic_consume(
            'ApiReturn',            	#queue
            '',                     	#consumer tag
            false,                  	#no local
            false,                  	#no ack
            false,                  	#exclusive
            false,                  	#no wait
            array($this, 'processMessage')	#callback
        );

        $this->response = null;

    }

    public function __destruct()
    {
        $this->channel->close();
        $this->connection->close();
    }


    /**
     * @Route("/", methods={"GET"})
     * @Security("is_granted('ROLE_USER')")
     */
    public function list()
    {
        $JSON = '{"jsonrpc": "2.0", "method": "list", "params": {}}';
        $this->get('old_sound_rabbit_mq.api_producer')->publish($JSON);

        while(!$this->response) {
            $this->channel->wait(null, false, 30);
        }

        $serializer = $this->get('jms_serializer');
        return new Response($serializer->serialize(unserialize($this->response), 'json'));
    }


    /**
     * @Route("/{id}", methods={"DELETE"})
     * @Security("is_granted('ROLE_ADMIN')")
     *
     * @return Response
     */
    public function del($id)
    {
        $JSON = '{"jsonrpc": "2.0", "method": "del", "params": {"id": "'.$id.'"}}';
        $this->get('old_sound_rabbit_mq.api_producer')->publish($JSON);

        while(!$this->response) {
            $this->channel->wait(null, false, 30);
        }

        $serializer = $this->get('jms_serializer');
        return new Response($serializer->serialize(unserialize($this->response), 'json'));
    }

    /**
     * @Route("/{client}", methods={"POST"})
     * @Security("is_granted('ROLE_ADMIN')")
     * @ParamConverter("client")
     *
     * @param Client $client
     * @return Response
     */
    public function edit(Client $client, Request $request)
    {
        $params = array();
        $content = $request->getContent();
        if (!empty($content))
        {
            $params = json_decode($content, true);
        }

        $entityManager = $this->getDoctrine()->getManager();

        $client->setLastName($params["last_name"]);
        $client->setFirstName($params["first_name"]);
        $client->setFatherName($params["father_name"]);

        $entityManager->persist($client);
        $entityManager->flush();


        $serializer = $this->get('jms_serializer');
        return new Response($serializer->serialize($client, 'json'));

    }

    /**
     * @Route("/", methods={"PUT"})
     * @Security("is_granted('ROLE_MODERATOR')")
     * @return Response
     */
    public function add(Request $request)
    {
        $params = array();
        $content = $request->getContent();
        if (!empty($content))
        {
            $params = json_decode($content, true);
        }

        $client = new Client();

        $client->setLastName($params["last_name"]);
        $client->setFirstName($params["first_name"]);
        $client->setFatherName($params["father_name"]);

        $JSON = '{"jsonrpc": "2.0", "method": "add", "params": {"client": "'.base64_encode(serialize($client)).'"}}';
        $this->get('old_sound_rabbit_mq.api_producer')->publish($JSON);

        $serializer = $this->get('jms_serializer');
        return new Response($serializer->serialize($client, 'json'));

    }

    public function processMessage(AMQPMessage $message)
    {
        $message->delivery_info['channel']->basic_ack($message->delivery_info['delivery_tag']);
        $this->response = $message->body;
    }
}
