<?php

declare(strict_types=1);

namespace Check24\BackendTest\Domain\Service;

interface FinanceadsHttpServiceInterface
{
    public function getCreditCardsData(): array;
}
