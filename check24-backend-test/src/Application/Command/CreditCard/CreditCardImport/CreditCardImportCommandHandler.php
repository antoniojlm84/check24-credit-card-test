<?php

declare(strict_types=1);

namespace Check24\BackendTest\Application\Command\CreditCard\CreditCardImport;

use Check24\BackendTest\Domain\Command\CommandHandler;

final class CreditCardImportCommandHandler implements CommandHandler
{
    public function __construct(
        private readonly CreditCardImportService $importService,
    ) {
    }

    public function __invoke(CreditCardImportCommand $command): void
    {
        $this->importService->execute();
    }
}
