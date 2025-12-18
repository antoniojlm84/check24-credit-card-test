<?php

declare(strict_types=1);

namespace Check24\BackendTest\Application\Query\CreditCard\Show;

use Check24\BackendTest\Application\Query\QuerySingleResource;

final class CreditCardShowQuery extends QuerySingleResource
{
    public function __construct(
        private string $id,
    ) {
        parent::__construct([]);
    }

    public function id(): string
    {
        return $this->id;
    }
}
