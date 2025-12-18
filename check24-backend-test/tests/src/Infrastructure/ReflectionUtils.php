<?php

declare(strict_types=1);

namespace Check24\BackendTest\Tests\src\Infrastructure;

class ReflectionUtils
{
    public static function newInstance(string $class, ...$args): mixed
    {
        $reflectionClass = new \ReflectionClass($class);
        $constructor = $reflectionClass->getConstructor();
        $constructor->setAccessible(true);
        $result = $reflectionClass->newInstanceWithoutConstructor();
        $constructor->invokeArgs($result, $args);
        $constructor->setAccessible(false);

        return $result;
    }

    /**
     * @throws \ReflectionException
     */
    public static function setPrivateValue(object $object, string $property, mixed $value): void
    {
        $refObject = new \ReflectionObject($object);
        $refProperty = $refObject->getProperty($property);
        $refProperty->setAccessible(true);
        $refProperty->setValue($object, $value);
        $refProperty->setAccessible(false);
    }

    public static function getPrivateValue(object $object, string $property): mixed
    {
        $refObject = new \ReflectionObject($object);
        $refProperty = $refObject->getProperty($property);
        $refProperty->setAccessible(true);
        $value = $refProperty->getValue($object);
        $refProperty->setAccessible(false);

        return $value;
    }
}
