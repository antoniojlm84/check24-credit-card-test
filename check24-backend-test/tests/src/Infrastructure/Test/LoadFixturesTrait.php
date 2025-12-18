<?php

declare(strict_types=1);

namespace Check24\BackendTest\Tests\src\Infrastructure\Test;

use Liip\TestFixturesBundle\Services\DatabaseToolCollection;
use Liip\TestFixturesBundle\Services\DatabaseTools\AbstractDatabaseTool;

trait LoadFixturesTrait
{
    public function loadAllFixtures(): void
    {
        if ($this->transactional) {
            return;
        }

        /** @var AbstractDatabaseTool $databaseTool */
        $databaseTool = self::getContainer()->get(DatabaseToolCollection::class)
            ->get()
        ;
        $databaseTool->loadAllFixtures(['app_fixtures_common']);
    }
}
