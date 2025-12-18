<?php

declare(strict_types=1);

namespace Check24\BackendTest\Application\Query\Transformer;

interface Transformer
{
    public function transform($object): array;
}
