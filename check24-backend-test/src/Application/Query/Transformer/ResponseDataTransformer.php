<?php

declare(strict_types=1);

namespace Check24\BackendTest\Application\Query\Transformer;

use Check24\BackendTest\Domain\Query\QueryResponse;

interface ResponseDataTransformer
{
    public function write(QueryResponse $queryResponse);

    public function read(): array;
}
