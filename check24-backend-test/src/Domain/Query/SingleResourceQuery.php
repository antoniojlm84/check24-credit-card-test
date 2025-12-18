<?php

declare(strict_types=1);

namespace Check24\BackendTest\Domain\Query;

interface SingleResourceQuery extends Query
{
    public function includes(): array;
}
