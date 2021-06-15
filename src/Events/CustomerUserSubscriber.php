<?php
namespace App\Events;

use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\Customer;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\RequestEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Security\Core\Security;

class CustomerUserSubscriber implements EventSubscriberInterface{

    private $security;

    public function __construct(Security $security) {
        $this->security = $security;
    }
    public static function getSubscribedEvents() {
        return [
            kernelEvents::VIEW => ['setUserForCustomers', EventPriorities::PRE_VALIDATE]
        ];
    }

    public function setUserForCustomers(RequestEvent $event) {

        $customer = $event->getControllerResult();

        $method = $event->getRequest()->getMethod(); //POST, GET, PUT, PATCH, DELETE
        if($customer instanceof Customer && $method === "POST"){
            //Chopper l'utilisateur actuellement connecté
            $user = $this->security->getUser();
            //Assigner l'utilsateur au customer que nous sommes entrain de créer
            $customer->setUser($user);
        }
    }
}