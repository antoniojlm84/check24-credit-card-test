<?php

declare(strict_types=1);

namespace Check24\BackendTest\Application\Query;

use Check24\BackendTest\Domain\Model\User\User;
use Check24\BackendTest\Domain\Query\MultipleResourceQuery;

abstract class QueryMultipleResource implements MultipleResourceQuery
{
    /** @var User */
    protected $loggedUser;

    /** @var array|null */
    protected $includes;

    public function __construct(
        ?User $loggedUser,
        array $include,
    ) {
        $this->loggedUser = $loggedUser;
        $this->includes = $include;
    }

    public function loggedUser(): ?User
    {
        return $this->loggedUser;
    }

    public function includes(): array
    {
        return $this->includes;
    }
}
