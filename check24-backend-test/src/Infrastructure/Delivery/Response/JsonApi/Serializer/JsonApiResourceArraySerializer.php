<?php

declare(strict_types=1);

namespace Check24\BackendTest\Infrastructure\Delivery\Response\JsonApi\Serializer;

use Check24\BackendTest\Application\Query\Transformer\JsonApiResourceSerializer;
use Check24\BackendTest\Application\Query\Transformer\Transformer;
use Check24\BackendTest\Domain\Query\SingleResourceResponse;
use Check24\BackendTest\Infrastructure\Delivery\Response\JsonApi\Transformer\JsonApiFractalDataTransformer;
use League\Fractal\Resource\Item;

class JsonApiResourceArraySerializer extends JsonApiFractalDataTransformer implements JsonApiResourceSerializer
{
    public function serialize(
        SingleResourceResponse $singleResourceResponse,
        Transformer $transformer,
        string $resourceName,
    ): array {
        $resource = new Item(
            $singleResourceResponse->resource(),
            $transformer,
            $resourceName
        );

        return $this->manager
            ->parseIncludes($singleResourceResponse->includes())
            ->createData($resource)
            ->toArray()
        ;
    }
}
