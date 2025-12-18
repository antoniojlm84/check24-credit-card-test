<?php

declare(strict_types=1);

namespace Check24\BackendTest\Domain\Transformer;

use Check24\BackendTest\Domain\Query\QueryResponse;
use League\Fractal\Scope;

interface Transformer
{
    public function transform(QueryResponse $data): array;

    public function responseMultiResult(QueryResponse $data): array;

    public function includes(array $includes, QueryResponse $data): void;

    public function setCurrentScope(Scope $scope): void;
}
