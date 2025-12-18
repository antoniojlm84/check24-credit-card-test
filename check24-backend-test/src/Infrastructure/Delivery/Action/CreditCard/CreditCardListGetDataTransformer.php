<?php

declare(strict_types=1);

namespace Check24\BackendTest\Infrastructure\Delivery\Action\CreditCard;

use Check24\BackendTest\Infrastructure\Delivery\Action\ListGetDataTransformer;

class CreditCardListGetDataTransformer extends ListGetDataTransformer
{
    protected function fieldsToShow(): ?array
    {
        return [];
    }

    protected function relatedFieldsToShow(): ?array
    {
        return [];
    }

    protected function type(): string
    {
        return 'credit_card';
    }
}
