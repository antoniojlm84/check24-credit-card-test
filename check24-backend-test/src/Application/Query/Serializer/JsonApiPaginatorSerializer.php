<?php

declare(strict_types=1);

namespace Check24\BackendTest\Application\Query\Serializer;

use Check24\BackendTest\Application\Query\Transformer\Transformer;
use Check24\BackendTest\Domain\Query\PaginatorResponse;

interface JsonApiPaginatorSerializer
{
    public function serialize(
        PaginatorResponse $paginatorResponse,
        Transformer $transformer,
        string $resourceName,
    ): array;
}
