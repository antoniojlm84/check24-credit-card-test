<?php

declare(strict_types=1);

namespace Check24\BackendTest\Domain\Model;

trait TimeAwareTrait
{
    /** @var \DateTimeImmutable */
    protected $createdAt;

    /** @var \DateTimeImmutable */
    protected $updatedAt;

    public function createdAt(): \DateTimeImmutable
    {
        return $this->createdAt;
    }

    public function updatedAt(): ?\DateTimeImmutable
    {
        return $this->updatedAt;
    }
}
