<?php

declare(strict_types=1);

namespace Check24\BackendTest\Domain\Model\CreditCard;

use Check24\BackendTest\Domain\Collection\AbstractEntityCollection;

class CreditCardCollection extends AbstractEntityCollection
{
    public function addCreditCard(CreditCard $creditCard): void
    {
        $this->addItem($creditCard);
    }

    public function addCreditCards(iterable $creditCards): void
    {
        foreach ($creditCards as $creditCard) {
            $this->addCreditCard($creditCard);
        }
    }
}
