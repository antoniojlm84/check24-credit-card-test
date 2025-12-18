<?php

declare(strict_types=1);

namespace Check24\BackendTest\Infrastructure\Delivery\Response\JsonApi\Transformer;

use League\Fractal\Manager;
use League\Fractal\Serializer\JsonApiSerializer;

abstract class JsonApiFractalDataTransformer
{
    protected Manager $manager;

    public function __construct(
        Manager $manager,
        JsonApiSerializer $serializer,
    ) {
        $manager->setSerializer($serializer);
        $this->manager = $manager;
    }
}
