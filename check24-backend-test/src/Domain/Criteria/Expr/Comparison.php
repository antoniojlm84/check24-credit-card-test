<?php

declare(strict_types=1);

namespace Check24\BackendTest\Domain\Criteria\Expr;

class Comparison implements Expression
{
    public const EQ = '=';

    public const NEQ = '<>';

    public const LT = '<';

    public const LTE = '<=';

    public const GT = '>';

    public const GTE = '>=';

    public const IS = '='; // no difference with EQ

    public const IN = 'IN';

    public const NIN = 'NIN';

    public const CONTAINS = 'CONTAINS';

    public const MEMBER_OF = 'MEMBER_OF';

    public const STARTS_WITH = 'STARTS_WITH';

    public const ENDS_WITH = 'ENDS_WITH';

    /** @var string */
    private $field;

    /** @var string */
    private $op;

    /** @var Value */
    private $value;

    /**
     * @param string $field
     * @param string $operator
     */
    public function __construct($field, $operator, $value)
    {
        if (!$value instanceof Value) {
            $value = new Value($value);
        }

        $this->field = $field;
        $this->op = $operator;
        $this->value = $value;
    }

    /**
     * @return string
     */
    public function getField()
    {
        return $this->field;
    }

    /**
     * @return Value
     */
    public function getValue()
    {
        return $this->value;
    }

    /**
     * @return string
     */
    public function getOperator()
    {
        return $this->op;
    }
}
