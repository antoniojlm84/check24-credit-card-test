<?php

declare(strict_types=1);

namespace Check24\BackendTest\Application\Query\Serializer;

use Check24\BackendTest\Application\Query\Transformer\Transformer;

interface JsonApiSerializer
{
    public function serialize(
        array $data,
        Transformer $transformer,
        string $resourceName,
    ): array;
}
