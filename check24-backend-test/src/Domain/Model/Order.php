<?php

declare(strict_types=1);

namespace Check24\BackendTest\Domain\Model;

use Doctrine\Common\Collections\Order as OrderType;

class Order
{
    /** @var string */
    private $field;

    /** @var string */
    private $type;

    /**
     * Order constructor.
     */
    public function __construct(string $field, OrderType $type)
    {
        $this->field = $field;
        $this->type = $type;
    }

    public function field(): string
    {
        return $this->field;
    }

    public function type(): OrderType
    {
        return $this->type;
    }
}
