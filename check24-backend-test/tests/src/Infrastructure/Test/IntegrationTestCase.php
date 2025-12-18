<?php

declare(strict_types=1);

namespace Check24\BackendTest\Tests\src\Infrastructure\Test;

use Symfony\Bundle\FrameworkBundle\Test\KernelTestCase;

/**
 * @internal
 */
class IntegrationTestCase extends KernelTestCase
{
    use ClearProperties;
    use ClearDoctrineRepositoryTrait;
    use LoadFixturesTrait;
    protected bool $transactional = true;

    protected function setUp(): void
    {
        if ($this->transactional) {
            $doctrine = $this->getContainer()->get('doctrine'); // Boot the Symfony kernel
            $doctrine->getConnection()->beginTransaction();
        }
    }

    protected function tearDown(): void
    {
        if ($this->transactional) {
            $this->getContainer()->get('doctrine')->getConnection()->rollBack();
        } else {
            $this->loadAllFixtures();
        }

        $this->clearDoctrineManager();
        parent::tearDown();
        $this->clearProperties();
    }
}
