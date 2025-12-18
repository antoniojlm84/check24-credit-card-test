<?php

declare(strict_types=1);

namespace Check24\BackendTest\Infrastructure\Delivery\Action;

use Check24\BackendTest\Application\Query\Transformer\JsonApiPaginatorDataTransformer;
use Check24\BackendTest\Application\Query\Transformer\ResponseDataTransformer;
use Check24\BackendTest\Domain\Query\PaginatorResponse;
use Check24\BackendTest\Domain\Query\QueryResponse;
use Check24\BackendTest\Infrastructure\Delivery\Response\JsonApi\Transformer\JsonApiDTOTransformer;

abstract class ListGetDataTransformer extends JsonApiPaginatorDataTransformer implements ResponseDataTransformer
{
    private PaginatorResponse $response;

    public function read(): array
    {
        return $this->serializer->serialize(
            $this->response,
            new JsonApiDTOTransformer(
                $this->fieldsToShow(),
                $this->relatedFieldsToShow()
            ),
            $this->type()
        );
    }

    public function write(QueryResponse $queryResponse)
    {
        $this->response = $queryResponse;
    }

    abstract protected function fieldsToShow(): ?array;

    abstract protected function relatedFieldsToShow(): ?array;

    abstract protected function type(): string;
}
