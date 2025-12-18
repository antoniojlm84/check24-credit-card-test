<?php

declare(strict_types=1);

namespace Check24\BackendTest\Domain\Exception;

abstract class NotFoundException extends \DomainException
{
    private const ERROR_CODE = 404;

    public function __construct(string $message)
    {
        parent::__construct($message, self::ERROR_CODE);
    }
}
