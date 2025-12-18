<?php

declare(strict_types=1);

namespace Check24\BackendTest\Tests\src\Infrastructure\Test;

use PHPUnit\Framework\MockObject\MockObject;
use PHPUnit\Framework\TestCase;

/**
 * @internal
 */
final class MockServiceFactory extends TestCase
{
    public function createDependencyServiceMock(string $class): MockObject
    {
        // Use PHPUnit's TestCase to create a mock for the interface
        return $this->createMock($class);
    }
}
