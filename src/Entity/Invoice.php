<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\OrderFilter;

use App\Repository\InvoiceRepository;
use DateTimeInterface;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass=InvoiceRepository::class)
 * @ApiResource(
 *     subresourceOperations={
 *         "api_customers_invoices_get_subresource"={
 *              "normalization_context"={
 *                  "groups"={"invoices_subresource"}
 *              }
 *          }
 *     },
 *     itemOperations={"GET", "PUT", "DELETE", "PATCH", "increment"={
 *          "method"="post",
 *          "path"="/invoices/{id}/increment",
 *          "controller"="App\Controller\InvoiceIncrementationController",
 *          "openapi_context"={
 *              "summary"="Incrément une facture",
 *              "description"="Incrément le chrono d'une facture donnée"
 *          }
 *        }
 *     },
 *     attributes={
 *         "pagination_enabled": false,
 *         "pagination_items_per_page": 10,
 *         "order": {"sentAt": "desc"}
 *     },
 *     normalizationContext={
 *         "groups"={"invoices_read", "invoices_write"}
 *     },
 *     denormalizationContext={"disable_type_enforcement": true}
 * )
 * @ApiFilter(OrderFilter::class, properties={"status":"partial","sentAt", "amount"})
 */
class Invoice
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"invoices_read", "customers_read", "invoices_subresource"})
     */
    private $id;

    /**
     * @ORM\Column(type="float")
     * @Groups({"invoices_read", "customers_read", "invoices_subresource"})
     * @Assert\NotBlank(message="Le montant de la facture est obligatoire")
     * @Assert\Type(type="numeric", message="Le montant doit être un numérique")
     */
    private $amount;

    /**
     * @ORM\Column(type="datetime")
     * @Groups({"invoices_read", "customers_read", "invoices_subresource"})
     * @Assert\Type(type="datetime", message="La date doit être au format YYYY-MM-DD")
     * @Assert\NotBlank(message="La date d'envoi doit être renseignée")
     */
    private $sentAt;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"invoices_read", "customers_read", "invoices_subresource"})
     * @Assert\Type(type="string", message="Le statut doit être une chaine de caractères")
     * @Assert\Choice(choices={"SENT","CANCELLED", "PAID"}, message="Le statut doit être SENT, CANCELLED, PAID")
     * @Assert\NotBlank(message="Le statut de la facture est obligatoire")
     */
    private $status;

    /**
     * @ORM\ManyToOne(targetEntity=Customer::class, inversedBy="invoices")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"invoices_read"})
     * @Assert\NotBlank(message="Le client de la facture est obligatoire")
     */
    private $customer;

    /**
     * @ORM\Column(type="integer")
     * @Groups({"invoices_read", "customers_read", "invoices_subresource"})
     * @Assert\NotBlank(message="Il faut absolument un chrono pour la facture")
     * @Assert\Type(type="integer", message="Le chrono doit être un nombre")
     */
    private $chrono;

    /**
     * Permet de récupérer l'utilisateur à qui appartient finalement la facture
     * @return User
     * @Groups({"invoices_read", "invoices_subresource"})
     */
    public function getUser(): ?User
    {
        return $this->customer->getUser();
    }
    public function getId(): ?int
    {
        return $this->id;
    }

    public function getAmount(): ?float
    {
        return $this->amount;
    }

    public function setAmount($amount): self
    {
        $this->amount = $amount;

        return $this;
    }

    public function getSentAt(): ?DateTimeInterface
    {
        return $this->sentAt;
    }

    public function setSentAt($sentAt): self
    {
        $this->sentAt = $sentAt;

        return $this;
    }

    public function getStatus(): ?string
    {
        return $this->status;
    }

    public function setStatus(string $status): self
    {
        $this->status = $status;

        return $this;
    }

    public function getCustomer(): ?Customer
    {
        return $this->customer;
    }

    public function setCustomer(?Customer $customer): self
    {
        $this->customer = $customer;

        return $this;
    }

    public function getChrono(): ?int
    {
        return $this->chrono;
    }

    public function setChrono($chrono): self
    {
        $this->chrono = $chrono;

        return $this;
    }
}
