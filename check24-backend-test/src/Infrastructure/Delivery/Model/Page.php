<?php

declare(strict_types=1);

namespace Check24\BackendTest\Infrastructure\Delivery\Model;

use Check24\BackendTest\Infrastructure\Delivery\Model\Exception\InvalidPageException;

class Page
{
    public const MAX_SIZE = 300;
    public const DEFAULT_SIZE = 10;
    public const DEFAULT_PAGE = 1;

    /** @var int */
    private $size;

    /** @var int */
    private $number;

    /**
     * Page constructor.
     */
    public function __construct(int $size, int $number)
    {
        if (0 == $number) {
            throw InvalidPageException::withPage($number);
        }

        $this->size = $size;
        $this->number = $number;
    }

    public function size(): int
    {
        return $this->size;
    }

    public function number(): int
    {
        return $this->number;
    }
}
