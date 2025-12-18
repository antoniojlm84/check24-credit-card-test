<?php

declare(strict_types=1);

namespace Check24\BackendTest\Application\Query\CreditCard\List;

use Check24\BackendTest\Application\Query\QueryPaginator;
use Check24\BackendTest\Domain\Criteria\OrderType;

class CreditCardListQuery extends QueryPaginator
{
    protected function setDefaultOrder()
    {
        $this->orderType = OrderType::DESC;
        $this->orderBy = 'price';
    }

    protected function availableOrders(): array
    {
        return [
            'createdAt',
            'price',
            'name',
        ];
    }
}
