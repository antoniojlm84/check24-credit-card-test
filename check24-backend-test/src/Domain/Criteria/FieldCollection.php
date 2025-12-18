<?php

declare(strict_types=1);

namespace Check24\BackendTest\Domain\Criteria;

use Check24\BackendTest\Domain\AbstractCollection;

final class FieldCollection extends AbstractCollection
{
    public function addField(Field $field)
    {
        $this->addItem($field);
    }

    public function addFields(iterable $fields)
    {
        foreach ($fields as $field) {
            $this->addField($field);
        }
    }

    protected function calculateHash($item): string
    {
        return $item->name();
    }
}
