<?php

declare(strict_types=1);

namespace Check24\BackendTest\Domain\Model\CreditCard;

class CreditCardPrice
{
    protected ?float $value;

    public function __construct(?float $value)
    {
        $this->value = $value;
    }

    public function value(): ?float
    {
        return $this->value;
    }
}
