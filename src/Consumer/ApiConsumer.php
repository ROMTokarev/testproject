<?php

namespace App\Consumer;

use App\Entity\Client;
use Doctrine\ORM\EntityManagerInterface;
use OldSound\RabbitMqBundle\RabbitMq\ConsumerInterface;
use PhpAmqpLib\Message\AMQPMessage;
use PhpAmqpLib\Wire\AMQPTable;
use PhpAmqpLib\Connection\AMQPStreamConnection;

class ApiConsumer implements ConsumerInterface
{
    private $em;

    private $connection;
    private $queueName;
    private $delayedQueueName;
    private $channel;
    private $callback;

    public function __construct(EntityManagerInterface $EntityManager)
    {
        $this->em = $EntityManager;

        $this->connection = new AMQPStreamConnection('localhost', 5672, 'guest', 'guest');
        $this->queueName = "ApiReturn";
        $this->delayedQueueName = null;
        $this->channel = $this->connection->channel();
        $this->channel->queue_declare($this->queueName, false, false, false, false);
    }

    public function __destruct()
    {
        $this->close();
    }

    public function close()
    {
        if (!is_null($this->channel)) {
            $this->channel->close();
            $this->channel = null;
        }

        if (!is_null($this->connection)) {
            $this->connection->close();
            $this->connection = null;
        }
    }

    public function produce($data)
    {
        $msg = new AMQPMessage(
            $data,
            array('delivery_mode' => AMQPMessage::DELIVERY_MODE_PERSISTENT)
        );

        $this->channel->basic_publish($msg, '', $this->queueName);
    }

    public function execute(AMQPMessage $msg)
    {
        return $this->processMessage($msg);
    }

    public function processMessage(AMQPMessage $msg)
    {
        $RPC = json_decode($msg->getBody(), true);
        call_user_func(array($this, $RPC["method"]), $RPC["params"]);
    }


    public function add($data)
    {
        $client = unserialize(base64_decode($data["client"]));
        $this->em->persist($client);
        $this->em->flush();
        echo "Add Client".PHP_EOL;
    }

    public function del($data)
    {
        $repository = $this->em->getRepository(Client::class);
        $client = $repository->findOneById($data["id"]);

        $this->em->remove($client);
        $this->em->flush();

        $this->produce(serialize($client));

        echo "Del Client".PHP_EOL;
    }

    public function list()
    {
        $repository = $this->em->getRepository(Client::class);
        $client = $repository->findBy(array(), array('id' => 'ASC'));

        $this->produce(serialize($client));

        echo "Get Client list".PHP_EOL;
    }


}