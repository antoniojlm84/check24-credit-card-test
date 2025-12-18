<?php

declare(strict_types=1);

namespace Check24\BackendTest\Domain\Model\CreditCard;

use Check24\BackendTest\Domain\Criteria\CriteriaFactory;
use Check24\BackendTest\Domain\Criteria\Expr\Criteria;
use Symfony\Component\Security\Core\User\UserInterface;

class CreditCardCriteriaFactory extends CriteriaFactory
{
    private static array $fieldToSearch = [
        'name',
        'bankId',
        'productId',
        'price',
    ];

    public function fieldToSearch(): array
    {
        return self::$fieldToSearch;
    }

    public function getUserCriteria(?UserInterface $user, array $filters): Criteria
    {
        return new Criteria();
    }
}
