<?php

declare(strict_types=1);

namespace Check24\BackendTest\Domain\Model\CreditCard;

class CreditCardEditedValue
{
    private array $editedValue;

    public function __construct(?array $editedValue)
    {
        $this->editedValue = $editedValue;
    }

    public function __toString()
    {
        return json_encode($this->editedValue);
    }

    public function editedValue(): ?array
    {
        return $this->editedValue;
    }
}
