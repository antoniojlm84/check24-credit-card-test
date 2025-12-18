<?php

declare(strict_types=1);

namespace Check24\BackendTest\Application\Query\CreditCard\List;

use Check24\BackendTest\Domain\PaginatorResponse;
use Check24\BackendTest\Domain\Query\PaginatorResponse as PaginatorResponseInterface;
use Check24\BackendTest\Domain\Query\QueryResponse;

class CreditCardListQueryResponse extends PaginatorResponse implements PaginatorResponseInterface, QueryResponse
{
}
