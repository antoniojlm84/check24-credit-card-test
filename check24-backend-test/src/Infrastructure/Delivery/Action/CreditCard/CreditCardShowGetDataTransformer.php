<?php

declare(strict_types=1);

namespace Check24\BackendTest\Infrastructure\Delivery\Action\CreditCard;

use Check24\BackendTest\Application\Query\CreditCard\Show\CreditCardShowQueryResponse;
use Check24\BackendTest\Application\Query\Transformer\ResponseDataTransformer;
use Check24\BackendTest\Domain\Query\QueryResponse;
use Check24\BackendTest\Infrastructure\Delivery\Response\JsonApi\Transformer\JsonApiDTOTransformer;
use Check24\BackendTest\Infrastructure\Delivery\Response\JsonApi\Transformer\JsonApiResourceDataTransformer;

class CreditCardShowGetDataTransformer extends JsonApiResourceDataTransformer implements ResponseDataTransformer
{
    private CreditCardShowQueryResponse $queryResponse;

    public function write(QueryResponse $queryResponse)
    {
        $this->queryResponse = $queryResponse;
    }

    public function read(): array
    {
        return $this->serializer->serialize(
            $this->queryResponse,
            new JsonApiDTOTransformer(),
            'credit_card'
        );
    }
}
