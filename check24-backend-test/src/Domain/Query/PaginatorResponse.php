<?php

declare(strict_types=1);

namespace Check24\BackendTest\Domain\Query;

use Check24\BackendTest\Domain\AbstractCollection;
use Check24\BackendTest\Domain\Criteria\FieldCollection;

interface PaginatorResponse
{
    public function page(): int;

    public function size(): int;

    public function totalResults(): int;

    public function includes(): FieldCollection;

    public function collection(): AbstractCollection;
}
