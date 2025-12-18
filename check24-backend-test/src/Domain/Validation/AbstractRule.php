<?php

declare(strict_types=1);

namespace Check24\BackendTest\Domain\Validation;

abstract class AbstractRule
{
    public static function create()
    {
        return new static();
    }

    abstract public function execute($value): bool;
}
