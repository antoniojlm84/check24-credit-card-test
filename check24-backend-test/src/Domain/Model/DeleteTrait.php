<?php

declare(strict_types=1);

namespace Check24\BackendTest\Domain\Model;

trait DeleteTrait
{
    /** @var bool */
    protected $deleted = false;

    /** @var \DateTimeImmutable|null */
    protected $deletedAt;

    public function deleted(): bool
    {
        return $this->deleted;
    }

    public function deletedAt(): ?\DateTimeImmutable
    {
        return $this->deletedAt;
    }

    public function delete()
    {
        $this->deleted = true;
        $this->deletedAt = new \DateTime('now');
    }
}
