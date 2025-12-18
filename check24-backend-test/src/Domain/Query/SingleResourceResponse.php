<?php

declare(strict_types=1);

namespace Check24\BackendTest\Domain\Query;

interface SingleResourceResponse extends QueryResponse
{
    public function includes(): array;

    public function resource();
}
