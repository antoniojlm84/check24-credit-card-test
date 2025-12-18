<?php

declare(strict_types=1);

namespace Check24\BackendTest\Domain\Exception;

use Symfony\Component\HttpKernel\Exception\HttpExceptionInterface;

abstract class NoContentException extends \DomainException implements HttpExceptionInterface
{
    private const ERROR_CODE = 204;

    public function __construct(string $message)
    {
        parent::__construct($message, self::ERROR_CODE);
    }

    /**
     * Returns the status code.
     */
    public function getStatusCode(): int
    {
        return self::ERROR_CODE;
    }

    /**
     * Returns response headers.
     */
    public function getHeaders(): array
    {
        return [];
    }
}
