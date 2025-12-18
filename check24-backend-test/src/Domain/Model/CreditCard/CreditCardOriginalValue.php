<?php

declare(strict_types=1);

namespace Check24\BackendTest\Domain\Model\CreditCard;

class CreditCardOriginalValue
{
    private array $originalValue;

    public function __construct(?array $originalValue)
    {
        $this->originalValue = $originalValue;
    }

    public function __toString()
    {
        return json_encode($this->originalValue);
    }

    public function originalValue(): ?array
    {
        return $this->originalValue;
    }
}
