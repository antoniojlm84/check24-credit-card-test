<?php

declare(strict_types=1);

namespace Check24\BackendTest\Domain\Criteria\Expr;

class CompositeExpression implements Expression
{
    public const TYPE_AND = 'AND';

    public const TYPE_OR = 'OR';

    /** @var string */
    private $type;

    /** @var Expression[] */
    private $expressions = [];

    /**
     * @param string $type
     *
     * @throws \RuntimeException
     */
    public function __construct($type, array $expressions)
    {
        $this->type = $type;

        foreach ($expressions as $expr) {
            if ($expr instanceof Value) {
                throw new \RuntimeException('Values are not supported expressions as children of and/or expressions.');
            }
            if (!$expr instanceof Expression) {
                throw new \RuntimeException('No expression given to CompositeExpression.');
            }

            $this->expressions[] = $expr;
        }
    }

    /**
     * Returns the list of expressions nested in this composite.
     *
     * @return Expression[]
     */
    public function getExpressionList()
    {
        return $this->expressions;
    }

    /**
     * @return string
     */
    public function getType()
    {
        return $this->type;
    }
}
