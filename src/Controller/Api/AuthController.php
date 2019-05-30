<?php

namespace App\Controller\Api;

use App\Entity\Users;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;

/**
 * @Route("/auth")
 *
 * Class AuthController
 * @package App\AuthController\Api
 */
class AuthController extends Controller
{

    /**
     * @Route("/register", methods={"POST"})
     */
    public function register(Request $request, UserPasswordEncoderInterface $encoder)
    {
        $params = array();
        $content = $request->getContent();
        if (!empty($content))
        {
            $params = json_decode($content, true);
        }

        $em = $this->getDoctrine()->getManager();

        $user = new Users();
        $user->setUsername($params["username"]);
        $user->setEmail($params["email"]);
        $user->setEnabled(true);
        $user->addRole('ROLE_USER');

        $serializer = $this->get('jms_serializer');
        $data = $serializer->serialize($user, 'json');

        $user->setPassword($encoder->encodePassword($user, $params["password"]));

        $em->persist($user);
        $em->flush();

        return new Response($data);

    }

    /**
     * @Route("/user/{user}", methods={"POST"})
     * @Security("is_granted('ROLE_ADMIN')")
     * @ParamConverter("user")
     *
     * @param Users $user
     * @return Response
     */
    public function edit(Users $user, Request $request)
    {
        $params = array();
        $content = $request->getContent();
        if (!empty($content))
        {
            $params = json_decode($content, true);
        }

        $entityManager = $this->getDoctrine()->getManager();

        $user->setRoles(array($params["roles"]));

        $entityManager->persist($user);
        $entityManager->flush();

        $serializer = $this->get('jms_serializer');
        return new Response($serializer->serialize($user, 'json'));

    }

    /**
     * @Route("/user", methods={"GET"})
     * @Security("is_granted('ROLE_ADMIN')")
     *
     * @return Response
     */
    public function list()
    {
        $repository = $this->getDoctrine()->getRepository(Users::class);
        $user = $repository->findBy(array(), array('id' => 'ASC'));

        $serializer = $this->get('jms_serializer');
        return new Response($serializer->serialize($user, 'json'));
    }

}
