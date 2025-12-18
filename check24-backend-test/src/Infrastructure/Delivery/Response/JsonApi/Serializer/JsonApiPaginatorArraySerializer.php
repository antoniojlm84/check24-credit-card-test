<?php

declare(strict_types=1);

namespace Check24\BackendTest\Infrastructure\Delivery\Response\JsonApi\Serializer;

use Check24\BackendTest\Application\Query\Serializer\JsonApiPaginatorSerializer;
use Check24\BackendTest\Application\Query\Transformer\Transformer;
use Check24\BackendTest\Domain\Criteria\Field;
use Check24\BackendTest\Domain\Query\PaginatorResponse;
use Check24\BackendTest\Infrastructure\Delivery\Response\JsonApi\Transformer\JsonApiFractalDataTransformer;
use League\Fractal\Resource\Collection;

class JsonApiPaginatorArraySerializer extends JsonApiFractalDataTransformer implements JsonApiPaginatorSerializer
{
    public function serialize(
        PaginatorResponse $paginatorResponse,
        Transformer $transformer,
        string $resourceName,
    ): array {
        $resource = new Collection(
            $paginatorResponse->collection()->toArray(),
            $transformer,
            $resourceName
        );

        $resource->setMeta(
            [
                'page' => $paginatorResponse->page(),
                'totalPages' => $paginatorResponse->size() > 0 ? (int) ceil($paginatorResponse->totalResults() / $paginatorResponse->size()) : 1,
                'totalResults' => $paginatorResponse->totalResults(),
                'size' => $paginatorResponse->size() > 0 ? $paginatorResponse->size() : $paginatorResponse->totalResults(),
            ]
        );

        return $this->manager
            ->parseIncludes($this->extractIncludes($paginatorResponse))
            ->createData($resource)
            ->toArray()
        ;
    }

    private function extractIncludes(PaginatorResponse $paginatorResponse): array
    {
        return $paginatorResponse->includes()->serialize(
            function (Field $field) {
                return $field->name();
            }
        );
    }
}
