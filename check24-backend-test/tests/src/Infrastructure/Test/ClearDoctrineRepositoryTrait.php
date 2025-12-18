<?php

declare(strict_types=1);

namespace Check24\BackendTest\Tests\src\Infrastructure\Test;

use Doctrine\Persistence\ObjectManager;

trait ClearDoctrineRepositoryTrait
{
    public function clearDoctrineManager()
    {
        $kernel = self::$kernel;

        /**
         * @var ObjectManager $manager
         */
        $manager = $kernel->getContainer()->get('doctrine.orm.entity_manager');
        $manager->clear();
    }
}
