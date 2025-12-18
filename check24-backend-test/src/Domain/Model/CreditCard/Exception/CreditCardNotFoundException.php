<?php

declare(strict_types=1);

namespace Check24\BackendTest\Domain\Model\CreditCard\Exception;

use Check24\BackendTest\Domain\Exception\NotFoundException;

class CreditCardNotFoundException extends NotFoundException
{
    public static function withId(string $id): self
    {
        return new self("The note with id '{$id}' has not been found.");
    }
}
