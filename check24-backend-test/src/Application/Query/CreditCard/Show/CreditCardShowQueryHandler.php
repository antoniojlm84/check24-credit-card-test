<?php

declare(strict_types=1);

namespace Check24\BackendTest\Application\Query\CreditCard\Show;

use Check24\BackendTest\Domain\Model\CreditCard\CreditCardId;
use Check24\BackendTest\Domain\Query\QueryHandler;

class CreditCardShowQueryHandler implements QueryHandler
{
    private CreditCardShowService $showService;

    public function __construct(CreditCardShowService $showService)
    {
        $this->showService = $showService;
    }

    public function __invoke(CreditCardShowQuery $query): CreditCardShowQueryResponse
    {
        return $this->showService->execute(
            new CreditCardId($query->id())
        );
    }
}
