<?php

declare(strict_types=1);

namespace Check24\BackendTest\Infrastructure\Persistence\Doctrine\Type;

use Check24\BackendTest\Domain\Model\CreditCard\CreditCardId;
use Doctrine\DBAL\Platforms\AbstractPlatform;

class CreditCardIdType extends UuidType
{
    public const NAME = 'credit_card_id';

    public function getName(): string
    {
        return static::NAME;
    }

    public function convertToDatabaseValue($value, AbstractPlatform $platform)
    {
        return true === is_null($value) ? null : $value->value();
    }

    public function convertToPHPValue($value, AbstractPlatform $platform)
    {
        return null === $value ? null : new CreditCardId($value);
    }
}
