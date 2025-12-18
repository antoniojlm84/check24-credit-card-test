<?php

declare(strict_types=1);

namespace Check24\BackendTest\Domain;

use Check24\BackendTest\Domain\Criteria\FieldCollection;
use Check24\BackendTest\Domain\Query\PaginatorResponse as PaginatorResponseInterface;

class PaginatorResponse implements PaginatorResponseInterface
{
    protected AbstractCollection $collection;
    protected int $page;
    protected int $size;
    protected int $totalResults;
    protected FieldCollection $includes;

    public function __construct(
        AbstractCollection $collection,
        int $page,
        int $size,
        int $totalResults,
        ?FieldCollection $includes = null,
    ) {
        $this->collection = $collection;
        $this->page = $page;
        $this->size = $size;
        $this->totalResults = $totalResults;
        $this->includes = $includes;
    }

    public function collection(): AbstractCollection
    {
        return $this->collection;
    }

    public function page(): int
    {
        return $this->page;
    }

    public function size(): int
    {
        return $this->size;
    }

    public function totalResults(): int
    {
        return $this->totalResults;
    }

    public function includes(): FieldCollection
    {
        return $this->includes;
    }
}
