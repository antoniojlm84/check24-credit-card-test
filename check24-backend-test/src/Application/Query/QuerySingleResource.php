<?php

declare(strict_types=1);

namespace Check24\BackendTest\Application\Query;

use Check24\BackendTest\Domain\Query\SingleResourceQuery;

abstract class QuerySingleResource implements SingleResourceQuery
{
    /** @var array|null */
    protected $includes;

    public function __construct(
        array $include,
    ) {
        $this->includes = $include;
    }

    public function includes(): array
    {
        return $this->includes;
    }
}
