<?php

declare(strict_types=1);

namespace Check24\BackendTest\Application\Query\CreditCard\List;

use Check24\BackendTest\Domain\Query\QueryHandler;

class CreditCardListQueryHandler implements QueryHandler
{
    public function __construct(
        private readonly CreditCardListService $service,
    ) {
    }

    public function __invoke(CreditCardListQuery $query): CreditCardListQueryResponse
    {
        return $this->service->execute(
            $query->loggedUser(),
            $query->filters(),
            $query->page(),
            $query->size(),
            $query->getIncludes(),
            $query->getOrder(),
            $query->query()
        );
    }
}
