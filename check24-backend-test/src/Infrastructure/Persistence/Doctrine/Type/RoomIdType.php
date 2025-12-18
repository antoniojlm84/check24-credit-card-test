<?php

declare(strict_types=1);

namespace Check24\BackendTest\Infrastructure\Persistence\Doctrine\Type;

use Check24\BackendTest\Domain\Model\Room\RoomId;
use Doctrine\DBAL\Platforms\AbstractPlatform;

class RoomIdType extends UuidType
{
    public const NAME = 'room_id';

    public function getName(): string
    {
        return static::NAME;
    }

    public function convertToPHPValue($value, AbstractPlatform $platform)
    {
        return new RoomId($value);
    }
}
