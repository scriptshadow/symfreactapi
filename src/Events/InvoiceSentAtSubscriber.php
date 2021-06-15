<?php
namespace App\Events;

use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\Invoice;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\RequestEvent;
use Symfony\Component\HttpKernel\KernelEvents;

class InvoiceSentAtSubscriber implements EventSubscriberInterface{

    public static function getSubscribedEvents() {
        return [
            kernelEvents::VIEW => ['setSentAtForInvoice', EventPriorities::PRE_VALIDATE]
        ];
    }

    public function setSentAtForInvoice(RequestEvent $event) {

        $invoice = $event->getControllerResult();
        $method = $event->getRequest()->getMethod(); //POST, GET, PUT, PATCH, DELETE

        if($invoice instanceof Invoice && $method === "POST"){
            if(empty($invoice->getSentAt())){
                $invoice->setSentAt(new \DateTime());
            }
        }
    }
}