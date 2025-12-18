<?php

declare(strict_types=1);

namespace Check24\BackendTest\Domain\Criteria;

use Check24\BackendTest\Domain\Criteria\Expr\CompositeExpression;
use Check24\BackendTest\Domain\Criteria\Expr\Criteria;
use Check24\BackendTest\Domain\Criteria\Expr\Expression;
use Check24\BackendTest\Domain\Criteria\Expr\ExpressionBuilder;
use Symfony\Component\Security\Core\User\UserInterface;

abstract class CriteriaFactory
{
    protected string $op = 'contains';

    /**
     * @throws \Exception
     */
    public function create(
        $user,
        array $filters,
        $order,
        ?string $query = null,
        $page = 1,
        $itemsPerPage = 20,
    ): Criteria {
        $expression = null;

        $searchAllItems = true === isset($filters['all']);
        unset($filters['all']);

        $searchExpression = $this->getSearchExpression($query);
        $filterExpression = $this->getFilterExpression($filters);
        $userExpression = $this->getUserExpression($user, $filters, $searchAllItems);

        $expressionArray = array_values(
            array_filter(
                [
                    $searchExpression,
                    $filterExpression,
                    $userExpression,
                ]
            )
        );

        if (count($expressionArray) > 0) {
            if (1 === count($expressionArray)) {
                $expression = $expressionArray[0];
            } else {
                $expression = new CompositeExpression(
                    CompositeExpression::TYPE_AND,
                    $expressionArray
                );
            }
        }

        return new Criteria(
            $expression,
            $this->getOrderings($order),
            ($page - 1) * $itemsPerPage,
            $itemsPerPage
        );
    }

    abstract public function fieldToSearch(): array;

    abstract public function getUserCriteria(UserInterface $user, array $filters): Criteria;

    protected function getOrderings($order): ?array
    {
        if (null !== $order) {
            if (is_array($order)) {
                $orderings = [];
                foreach ($order as $singleOrder) {
                    if ($singleOrder instanceof Order) {
                        $orderings[$singleOrder->orderBy()->value()] = $singleOrder->orderType()->value();
                    }
                }

                return empty($orderings) ? null : $orderings;
            }

            if ($order instanceof Order) {
                return [
                    $order->orderBy()->value() => $order->orderType()->value(),
                ];
            }
        }

        return null;
    }

    protected function getFilterExpression(array $filters): ?Expression
    {
        $expressionBuilder = new ExpressionBuilder();

        $expression = null;
        $filterExpressionArray = [];
        foreach ($filters as $field => $value) {
            if (is_bool($value)) {
                $filterExpressionArray[] = $expressionBuilder->eq(
                    $field,
                    $value
                );

                continue;
            }

            if (is_array($value) && isset($value['op'])) {
                switch ($value['op']) {
                    case 'contains':
                        $filterExpressionArray[] = $expressionBuilder->contains(
                            $field,
                            $value['value']
                        );

                        break;

                    case 'equals':
                        $filterExpressionArray[] = $expressionBuilder->eq(
                            $field,
                            $value['value']
                        );

                        break;

                    case 'notequals':
                        $filterExpressionArray[] = $expressionBuilder->neq(
                            $field,
                            $value['value']
                        );

                        break;

                    case 'gt':
                        $filterExpressionArray[] = $expressionBuilder->gt(
                            $field,
                            $value['value']
                        );

                        break;

                    case 'lt':
                        $filterExpressionArray[] = $expressionBuilder->lt(
                            $field,
                            $value['value']
                        );

                        break;

                    case 'in':
                        $filterExpressionArray[] = $expressionBuilder->in(
                            $field,
                            $value['value']
                        );

                        break;

                    case 'not_in':
                        $filterExpressionArray[] = $expressionBuilder->notIn(
                            $field,
                            $value['value']
                        );

                        break;

                    case 'or':
                        $fields = explode(':', $field);
                        $expressionOr = [];
                        foreach ($fields as $index => $field) {
                            $expressionOr[] = $expressionBuilder->eq($field, $value['value'.($index + 1)]);
                        }
                        $filterExpressionArray[] = $expressionBuilder->orX(
                            ...$expressionOr
                        );

                        break;

                    case 'or_contains':
                        $fields = explode(':', $field);
                        $expressionOr = [];
                        foreach ($fields as $index => $field) {
                            $expressionOr[] = $expressionBuilder->contains($field, $value['value'.($index + 1)]);
                        }
                        $filterExpressionArray[] = $expressionBuilder->orX(
                            ...$expressionOr
                        );

                        break;

                    default:
                        throw new \Exception('Invalid op '.$value['op']);
                }

                continue;
            }

            if (null === $value) {
                $filterExpressionArray[] = $expressionBuilder->eq(
                    $field,
                    $value
                );

                continue;
            }

            $valueArray = explode(',', $value);

            if (('exclude' == $field) === true) {
                $filterExpressionArray[] = $expressionBuilder->notIn(
                    'id',
                    $valueArray
                );

                continue;
            }

            if (('include' == $field) === true) {
                $filterExpressionArray[] = $expressionBuilder->in(
                    'id',
                    $valueArray
                );

                continue;
            }

            $expressionsField = [];

            foreach ($valueArray as $itemFilter) {
                if (true === in_array($field, [
                    'deleted',
                    'id',
                ])) {
                    $expressionsField[] = $expressionBuilder->eq(
                        $field,
                        $itemFilter
                    );

                    continue;
                }

                if ('contains' === $this->op) {
                    $expressionsField[] = $expressionBuilder->contains(
                        $field,
                        $itemFilter
                    );

                    continue;
                }

                if ('equals' === $this->op) {
                    $expressionsField[] = $expressionBuilder->eq(
                        $field,
                        $itemFilter
                    );

                    continue;
                }

                throw new \Exception('Invalid op '.$this->op);
            }

            if (count($valueArray) > 1) {
                $filterExpressionArray[] = new CompositeExpression(CompositeExpression::TYPE_OR, $expressionsField);
            } else {
                $filterExpressionArray[] = $expressionsField[0];
            }
        }

        if (count($filterExpressionArray) > 1) {
            $expression = new CompositeExpression(
                CompositeExpression::TYPE_AND,
                $filterExpressionArray
            );
        } elseif (1 === count($filterExpressionArray)) {
            $expression = $filterExpressionArray[0];
        }

        return $expression;
    }

    protected function getSearchExpression(?string $query): ?Expression
    {
        $expressionBuilder = new ExpressionBuilder();

        $expression = null;
        $searchExpression = [];
        if (null !== $query) {
            $searchExpressionArray = [];
            foreach ($this->fieldToSearch() as $fieldToSearch) {
                if (true === in_array($fieldToSearch, ['id'])) {
                    $searchExpressionArray[] = $expressionBuilder->eq(
                        $fieldToSearch,
                        $query
                    );

                    continue;
                }

                $searchExpressionArray[] = $expressionBuilder->contains(
                    $fieldToSearch,
                    $query
                );
            }

            $searchExpression[] = new CompositeExpression(
                CompositeExpression::TYPE_OR,
                $searchExpressionArray
            );
        }

        if (1 === count($searchExpression)) {
            $expression = $searchExpression[0];
        }

        return $expression;
    }

    protected function getUserExpression($user, $filters, $searchAll = false): ?Expression
    {
        if (null !== $user && false === $searchAll) {
            $userExpression = $this->getUserCriteria($user, $filters);

            return $userExpression->getWhereExpression();
        }

        return null;
    }
}
