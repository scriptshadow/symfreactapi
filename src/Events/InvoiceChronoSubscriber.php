<?php
namespace App\Events;

use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\Invoice;
use App\Repository\InvoiceRepository;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\RequestEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Security\Core\Security;

class InvoiceChronoSubscriber implements EventSubscriberInterface{

    private $security;
    private $repository;

    public function __construct(Security $security, InvoiceRepository $repository) {
        $this->security = $security;
        $this->repository = $repository;
    }
    public static function getSubscribedEvents() {
        return [
            kernelEvents::VIEW => ['setChronoForInvoice', EventPriorities::PRE_VALIDATE]
        ];
    }

    public function setChronoForInvoice(RequestEvent $event) {

        $invoice = $event->getControllerResult();
        $method = $event->getRequest()->getMethod(); //POST, GET, PUT, PATCH, DELETE

        if($invoice instanceof Invoice && $method === "POST"){
            //1. Chopper l'utilisateur actuellement connecté
            $user = $this->security->getUser();

            //2. Chopper la dernière facture qui a été inséree et chopper son chrono de l'utilisateur et l'incrementé de 1
            $nextChrono = $this->repository->findNextChrono($user);

            //3. Assigner le chrono + 1 à la facture
            $invoice->setChrono($nextChrono);
        }
    }
}