<?php

declare(strict_types=1);

namespace Check24\BackendTest\Domain\Criteria;

use Check24\BackendTest\Domain\Criteria\Expr\Criteria;
use Check24\BackendTest\Domain\ValueObject\Enum;

/**
 * @method static OrderType asc()
 * @method static OrderType desc()
 */
final class OrderType extends Enum
{
    public const ASC = Criteria::ASC;

    public const DESC = Criteria::DESC;

    public function getPossibleValues(): array
    {
        return [
            self::ASC->value,
            self::DESC->value,
        ];
    }

    protected function throwExceptionForInvalidValue($value): void
    {
        throw new \InvalidArgumentException($value);
    }
}
