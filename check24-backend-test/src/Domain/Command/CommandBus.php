<?php

declare(strict_types=1);

namespace Check24\BackendTest\Domain\Command;

interface CommandBus
{
    public function dispatch(Command $command): void;
}
