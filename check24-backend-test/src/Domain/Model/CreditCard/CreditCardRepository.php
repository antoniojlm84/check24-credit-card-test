<?php

declare(strict_types=1);

namespace Check24\BackendTest\Domain\Model\CreditCard;

use Check24\BackendTest\Domain\Criteria\Expr\Criteria;

interface CreditCardRepository
{
    public function byId(
        CreditCardId $creditCardId,
        ?array $includes = null,
    ): ?CreditCard;

    public function byCriteria(
        Criteria $criteria,
    ): CreditCardCollection;

    public function save(
        CreditCard $creditCard,
        ?array $relations = null,
    ): void;

    public function count(
        Criteria $criteria,
    ): int;
}
