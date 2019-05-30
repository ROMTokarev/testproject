<?php

namespace App\Controller;

use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;


/**
 * @Route("/")
 *
 * Class ClientsController
 * @package App\Controller
 */
class HomeController extends Controller
{

    /**
     * @Route("/{url}", requirements={"url"="^(?!api).+"}, defaults={"url": null})
     */
    public function index()
    {

        return $this->render('base.html.twig', [
            'name' => "TestProject",
        ]);
    }

}