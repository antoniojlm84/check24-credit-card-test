<?php

declare(strict_types=1);

namespace Check24\BackendTest\Tests\src\Infrastructure\Test;

use Symfony\Bundle\FrameworkBundle\KernelBrowser;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

/**
 * @internal
 */
class FunctionalTestCase extends WebTestCase
{
    use ClearProperties;
    use ClearDoctrineRepositoryTrait;
    use LoadFixturesTrait;
    protected KernelBrowser $client;
    protected bool $transactional = true;
    private static KernelBrowser $static_client;

    protected function setUp(): void
    {
        parent::setUp();

        $this->client = static::createClient();

        if ($this->transactional) {
            $doctrine = $this->getContainer()->get('doctrine'); // Boot the Symfony kernel
            $doctrine->getConnection()->beginTransaction();
            $doctrine->getConnection()->executeQuery('SET SESSION innodb_lock_wait_timeout = 100');
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
