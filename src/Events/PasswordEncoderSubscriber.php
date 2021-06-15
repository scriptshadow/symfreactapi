<?php

namespace App\Events;


use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\User;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\RequestEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class PasswordEncoderSubscriber implements EventSubscriberInterface{
    /**
     * @var UserPasswordHasherInterface
     */
    private $encoder;

    public function __construct(UserPasswordHasherInterface $encoder) {
        $this->encoder = $encoder;
    }
    public static function getSubscribedEvents() {
        return [
            kernelEvents::VIEW => ['encodPassword', EventPriorities::PRE_WRITE]
        ];
    }

    public function encodPassword(RequestEvent $event) {

        $user = $event->getControllerResult();

        $method = $event->getRequest()->getMethod(); //POST, GET, PUT, PATCH, DELETE

        if($user instanceof User && $method === "POST"){
            $hash = $this->encoder->hashPassword($user, $user->getPassword());
            $user->setPassword($hash);
        }
    }
}