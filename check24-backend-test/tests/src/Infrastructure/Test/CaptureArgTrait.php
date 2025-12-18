<?php

declare(strict_types=1);

namespace Check24\BackendTest\Tests\src\Infrastructure\Test;

use PHPUnit\Framework\Constraint\Callback;

trait CaptureArgTrait
{
    /**
     * @return callable
     */
    protected function captureArg(&$arg): Callback
    {
        return $this->callback(function ($argToMock) use (&$arg) {
            $arg = $argToMock;

            return true;
        });
    }
}
