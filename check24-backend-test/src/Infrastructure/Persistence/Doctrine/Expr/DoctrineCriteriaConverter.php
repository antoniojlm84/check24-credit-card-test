<?php

declare(strict_types=1);

namespace Check24\BackendTest\Infrastructure\Persistence\Doctrine\Expr;

use Check24\BackendTest\Domain\Criteria\Expr\Comparison;
use Check24\BackendTest\Domain\Criteria\Expr\CompositeExpression;
use Check24\BackendTest\Domain\Criteria\Expr\Criteria;
use Check24\BackendTest\Domain\Criteria\Expr\Value;
use Doctrine\Common\Collections\Criteria as DoctrineCriteria;
use Doctrine\Common\Collections\Expr\Comparison as DoctrineComparison;
use Doctrine\Common\Collections\Expr\CompositeExpression as DoctrineCompositeExpression;
use Doctrine\Common\Collections\Expr\Expression;
use Doctrine\Common\Collections\Expr\Value as DoctrineExpressionValue;

final class DoctrineCriteriaConverter
{
    public static function convert(Criteria $criteria, array $domainToDoctrineMappingFields): DoctrineCriteria
    {
        return new DoctrineCriteria(
            null !== $criteria->getWhereExpression() ? self::convertExpression(
                $criteria->getWhereExpression(),
                $domainToDoctrineMappingFields
            ) : null,
            self::convertOrderings($criteria->getOrderings(), $domainToDoctrineMappingFields),
            $criteria->getFirstResult(),
            $criteria->getMaxResults()
        );
    }

    public static function convertToCount(Criteria $criteria, array $domainToDoctrineMappingFields): DoctrineCriteria
    {
        return new DoctrineCriteria(
            null !== $criteria->getWhereExpression() ? self::convertExpression(
                $criteria->getWhereExpression(),
                $domainToDoctrineMappingFields
            ) : null,
        );
    }

    private static function convertExpression(
        $expression,
        array $domainToDoctrineMappingFields,
    ): Expression {
        if ($expression instanceof Comparison) {
            return new DoctrineComparison(
                $domainToDoctrineMappingFields[$expression->getField()],
                $expression->getOperator(),
                self::convertValue($expression->getValue())
            );
        }

        if ($expression instanceof CompositeExpression) {
            return self::convertCompositeExpression($expression, $domainToDoctrineMappingFields);
        }
    }

    private static function convertCompositeExpression(
        CompositeExpression $expression,
        $domainToDoctrineMappingFields,
    ): DoctrineCompositeExpression {
        $expressionArray = [];
        foreach ($expression->getExpressionList() as $expressionItem) {
            $expressionArray[] = self::convertExpression($expressionItem, $domainToDoctrineMappingFields);
        }

        return new DoctrineCompositeExpression($expression->getType(), $expressionArray);
    }

    private static function convertValue(Value $value): DoctrineExpressionValue
    {
        return new DoctrineExpressionValue($value->getValue());
    }

    private static function convertOrderings(array $orderings, array $domainToDoctrineMappingFields)
    {
        foreach ($orderings as $fieldName => $value) {
            unset($orderings[$fieldName]);
            $orderings[$domainToDoctrineMappingFields[$fieldName]] = $value;
        }

        return $orderings;
    }
}
