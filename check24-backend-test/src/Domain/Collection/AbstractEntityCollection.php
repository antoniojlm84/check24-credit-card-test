<?php

declare(strict_types=1);

namespace Check24\BackendTest\Domain\Collection;

use Check24\BackendTest\Domain\AbstractCollection;

class AbstractEntityCollection extends AbstractCollection
{
    protected function calculateHash($item): string
    {
        return (string) $item->id()->value();
    }
}
