<?php

declare(strict_types=1);

namespace Check24\BackendTest\Application\Query\CreditCard\Show;

use Check24\BackendTest\Domain\Model\CreditCard\CreditCard;
use Check24\BackendTest\Domain\Query\SingleResourceResponse;

class CreditCardShowQueryResponse implements SingleResourceResponse
{
    public function __construct(
        private readonly CreditCard $resource,
    ) {
    }

    public function includes(): array
    {
        return [];
    }

    public function resource(): CreditCard
    {
        return $this->resource;
    }
}
