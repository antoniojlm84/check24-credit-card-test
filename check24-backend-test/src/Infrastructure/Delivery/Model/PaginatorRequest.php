<?php

declare(strict_types=1);

namespace Check24\BackendTest\Infrastructure\Delivery\Model;

class PaginatorRequest
{
    /** @var Page */
    private $page;

    /** @var array|null */
    private $include;

    /** @var array|null */
    private $orders;

    /** @var string|null */
    private $query;

    /** @var array */
    private $filters;

    public function __construct(
        Page $page,
        array $filters,
        ?array $include = null,
        ?array $orders = null,
        ?string $query = null,
    ) {
        $this->page = $page;
        $this->include = $include;
        $this->orders = $orders;
        $this->query = $query;
        $this->filters = $filters;
    }

    public function page(): Page
    {
        return $this->page;
    }

    public function include(): ?array
    {
        return $this->include;
    }

    public function orders(): ?array
    {
        return $this->orders;
    }

    public function order(): ?Order
    {
        // Mantener compatibilidad hacia atrás - devuelve el primer orden si existe
        return $this->orders && count($this->orders) > 0 ? $this->orders[0] : null;
    }

    public function query(): ?string
    {
        return $this->query;
    }

    public function filters(): ?array
    {
        return $this->filters;
    }
}
