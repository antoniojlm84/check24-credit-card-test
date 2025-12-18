<?php

declare(strict_types=1);

namespace Check24\BackendTest\Domain\Criteria\Expr;

class Value implements Expression
{
    private $value;

    public function __construct($value)
    {
        $this->value = $value;
    }

    public function getValue()
    {
        return $this->value;
    }
}
