<?php

declare(strict_types=1);

namespace Check24\BackendTest\Infrastructure\Delivery\Model\Exception;

use Check24\BackendTest\Domain\Exception\NoContentException;

class InvalidPageException extends NoContentException
{
    public static function withPage(int $page): self
    {
        return new self("No content to page '{$page}'.");
    }
}
