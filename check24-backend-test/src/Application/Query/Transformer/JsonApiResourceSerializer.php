<?php

declare(strict_types=1);

namespace Check24\BackendTest\Application\Query\Transformer;

use Check24\BackendTest\Domain\Query\SingleResourceResponse;

interface JsonApiResourceSerializer
{
    public function serialize(
        SingleResourceResponse $singleResourceResponse,
        Transformer $transformer,
        string $resourceName,
    ): array;
}
