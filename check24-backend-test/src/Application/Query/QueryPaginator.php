<?php

declare(strict_types=1);

namespace Check24\BackendTest\Application\Query;

use Check24\BackendTest\Domain\Criteria\Field;
use Check24\BackendTest\Domain\Criteria\FieldCollection;
use Check24\BackendTest\Domain\Criteria\Order;
use Check24\BackendTest\Domain\Criteria\OrderBy;
use Check24\BackendTest\Domain\Criteria\OrderType;
use Check24\BackendTest\Domain\Query\Query;
use Doctrine\Common\Collections\Order as DoctrineOrder;
use Symfony\Component\Security\Core\User\UserInterface;

abstract class QueryPaginator implements Query
{
    protected ?string $orderBy;
    protected ?DoctrineOrder $orderType;
    protected ?array $orders;
    private int $page;
    private int $size;
    private ?string $query;
    private ?array $include;
    private array $filters;

    private ?UserInterface $loggedUser;

    public function __construct(
        ?UserInterface $loggedUser,
        array $filters,
        int $page,
        int $size,
        ?string $query,
        ?string $orderBy,
        ?DoctrineOrder $orderType,
        ?array $include,
        ?array $orders = null,
    ) {
        $this->setDefaultOrder();

        $this->page = $page;
        $this->size = $size;
        $this->query = $query;
        $this->orderBy = null !== $this->filterOrder($orderBy) ? $orderBy : $this->orderBy;
        $this->orderType = null !== $orderType ? $orderType : $this->orderType;
        $this->include = $include;
        $this->filters = $filters;
        $this->loggedUser = $loggedUser;
        $this->orders = $this->processOrders($orders);
    }

    public function page(): int
    {
        return $this->page;
    }

    public function size(): int
    {
        return $this->size;
    }

    public function query(): ?string
    {
        return $this->query;
    }

    public function orderBy(): ?string
    {
        return $this->orderBy;
    }

    public function orderType(): ?DoctrineOrder
    {
        return $this->orderType;
    }

    public function include(): ?array
    {
        return $this->include;
    }

    public function getIncludes(): FieldCollection
    {
        $fieldCollection = FieldCollection::create();
        if ($this->include()) {
            $fieldCollection->addFields(
                array_map(
                    function (string $field) {
                        return new Field($field);
                    },
                    $this->include()
                )
            );
        }

        return $fieldCollection;
    }

    public function getOrder(): ?Order
    {
        $order = null;
        if (null !== $this->orderBy() && null !== $this->orderType()) {
            $order = new Order(
                new OrderBy($this->orderBy()),
                new OrderType($this->orderType()->value)
            );
        }

        return $order;
    }

    public function getOrders(): array
    {
        if (null !== $this->orders) {
            return $this->orders;
        }

        // Fallback a ordenación simple para compatibilidad
        $order = $this->getOrder();

        return null !== $order ? [$order] : [];
    }

    public function filters(): array
    {
        return $this->filters;
    }

    public function loggedUser(): ?UserInterface
    {
        return $this->loggedUser;
    }

    abstract protected function setDefaultOrder();

    abstract protected function availableOrders(): array;

    private function filterOrder(?string $order): ?string
    {
        if (null !== $order && false === in_array($order, $this->availableOrders())) {
            throw new \RuntimeException('Error order not found!');
        }

        return $order;
    }

    private function processOrders(?array $orders): ?array
    {
        if (null === $orders) {
            return null;
        }

        $processedOrders = [];
        foreach ($orders as $order) {
            if ($order instanceof \Check24\BackendTest\Domain\Model\Order) {
                $field = $order->field();
                if (false === in_array($field, $this->availableOrders())) {
                    throw new \RuntimeException("Error order field '{$field}' not found!");
                }

                $processedOrders[] = new Order(
                    new OrderBy($field),
                    new OrderType($order->type()->value)
                );
            }
        }

        return $processedOrders;
    }
}
