<?php

declare(strict_types=1);

namespace Check24\BackendTest\Tests\src\Infrastructure\Test;

use PHPUnit\Framework\TestCase;

/**
 * @internal
 */
class UnitTestCase extends TestCase
{
    use ClearProperties;

    protected function tearDown(): void
    {
        parent::tearDown();
        $this->clearProperties();
    }
}
