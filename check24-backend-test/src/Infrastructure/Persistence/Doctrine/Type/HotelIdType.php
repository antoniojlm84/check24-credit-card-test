<?php

declare(strict_types=1);

namespace Check24\BackendTest\Infrastructure\Persistence\Doctrine\Type;

use Check24\BackendTest\Domain\Model\Hotel\HotelId;
use Doctrine\DBAL\Platforms\AbstractPlatform;

class HotelIdType extends UuidType
{
    public const NAME = 'hotel_id';

    public function getName(): string
    {
        return static::NAME;
    }

    public function convertToPHPValue($value, AbstractPlatform $platform)
    {
        return new HotelId($value);
    }
}
