<?php

declare(strict_types=1);

namespace Check24\BackendTest\Domain\Criteria\Expr;

class ExpressionBuilder
{
    /**
     * @return CompositeExpression
     */
    public function andX($x = null)
    {
        return new CompositeExpression(CompositeExpression::TYPE_AND, func_get_args());
    }

    /**
     * @return CompositeExpression
     */
    public function orX($x = null)
    {
        return new CompositeExpression(CompositeExpression::TYPE_OR, func_get_args());
    }

    /**
     * @param string $field
     *
     * @return Comparison
     */
    public function eq($field, $value)
    {
        return new Comparison($field, Comparison::EQ, new Value($value));
    }

    /**
     * @param string $field
     *
     * @return Comparison
     */
    public function gt($field, $value)
    {
        return new Comparison($field, Comparison::GT, new Value($value));
    }

    /**
     * @param string $field
     *
     * @return Comparison
     */
    public function lt($field, $value)
    {
        return new Comparison($field, Comparison::LT, new Value($value));
    }

    /**
     * @param string $field
     *
     * @return Comparison
     */
    public function gte($field, $value)
    {
        return new Comparison($field, Comparison::GTE, new Value($value));
    }

    /**
     * @param string $field
     *
     * @return Comparison
     */
    public function lte($field, $value)
    {
        return new Comparison($field, Comparison::LTE, new Value($value));
    }

    /**
     * @param string $field
     *
     * @return Comparison
     */
    public function neq($field, $value)
    {
        return new Comparison($field, Comparison::NEQ, new Value($value));
    }

    /**
     * @param string $field
     *
     * @return Comparison
     */
    public function isNull($field)
    {
        return new Comparison($field, Comparison::EQ, new Value(null));
    }

    /**
     * @param string $field
     *
     * @return Comparison
     */
    public function in($field, array $values)
    {
        return new Comparison($field, Comparison::IN, new Value($values));
    }

    /**
     * @param string $field
     *
     * @return Comparison
     */
    public function notIn($field, array $values)
    {
        return new Comparison($field, Comparison::NIN, new Value($values));
    }

    /**
     * @param string $field
     *
     * @return Comparison
     */
    public function contains($field, $value)
    {
        return new Comparison($field, Comparison::CONTAINS, new Value($value));
    }

    /**
     * @param string $field
     *
     * @return Comparison
     */
    public function memberOf($field, $value)
    {
        return new Comparison($field, Comparison::MEMBER_OF, new Value($value));
    }

    /**
     * @param string $field
     *
     * @return Comparison
     */
    public function startsWith($field, $value)
    {
        return new Comparison($field, Comparison::STARTS_WITH, new Value($value));
    }

    /**
     * @param string $field
     *
     * @return Comparison
     */
    public function endsWith($field, $value)
    {
        return new Comparison($field, Comparison::ENDS_WITH, new Value($value));
    }
}
