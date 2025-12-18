<?php

declare(strict_types=1);

namespace Check24\BackendTest\Domain\Criteria;

final class Field
{
    private $name;

    /**
     * Field constructor.
     */
    public function __construct($name)
    {
        $this->name = $name;
    }

    public function name()
    {
        return $this->name;
    }
}
