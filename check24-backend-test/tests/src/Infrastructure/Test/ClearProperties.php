<?php

declare(strict_types=1);

namespace Check24\BackendTest\Tests\src\Infrastructure\Test;

trait ClearProperties
{
    /**
     * Unset each property declared in this test class and its traits.
     */
    protected function clearProperties(): void
    {
        $reflection = new \ReflectionObject($this);

        foreach ($reflection->getProperties() as $property) {
            if (!$property->isStatic() && $property->getDeclaringClass()->getName() === $reflection->getName() && '' !== $property->class) {
                $property->setAccessible(true);
                $value = $property->getValue($this);
                if (is_object($value)) {
                    $property->setValue($this, null);
                }
                $property->setAccessible(false);
            }
        }

        unset($reflection);
    }
}
