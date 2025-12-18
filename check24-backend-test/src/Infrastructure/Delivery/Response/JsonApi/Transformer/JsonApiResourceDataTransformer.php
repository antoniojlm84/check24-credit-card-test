<?php

declare(strict_types=1);

namespace Check24\BackendTest\Infrastructure\Delivery\Response\JsonApi\Transformer;

use Check24\BackendTest\Application\Query\Transformer\JsonApiResourceSerializer;

abstract class JsonApiResourceDataTransformer
{
    protected JsonApiResourceSerializer $serializer;

    public function __construct(
        JsonApiResourceSerializer $serializer,
    ) {
        $this->serializer = $serializer;
    }
}
