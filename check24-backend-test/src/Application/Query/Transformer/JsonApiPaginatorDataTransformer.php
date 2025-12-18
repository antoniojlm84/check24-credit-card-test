<?php

declare(strict_types=1);

namespace Check24\BackendTest\Application\Query\Transformer;

use Check24\BackendTest\Application\Query\Serializer\JsonApiPaginatorSerializer;

abstract class JsonApiPaginatorDataTransformer
{
    protected JsonApiPaginatorSerializer $serializer;

    public function __construct(
        JsonApiPaginatorSerializer $serializer,
    ) {
        $this->serializer = $serializer;
    }
}
