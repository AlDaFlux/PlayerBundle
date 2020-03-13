<?php

namespace Aldaflux\PlayerBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Doctrine\Common\Persistence\ManagerRegistry;

class PlayerController extends AbstractController
{

    /**
     * @Route("/", name="testplayer")
     * @Method("GET")
     */
    public function mainTestAction() {
        return $this->render('PlayerBundle:test.html.twig');
    }

   
}