<?php

declare(strict_types=1);

namespace Check24\BackendTest\Infrastructure\Delivery\Mapper;

use Check24\BackendTest\Domain\Criteria\OrderType;
use Check24\BackendTest\Infrastructure\Delivery\Model\Order;
use Check24\BackendTest\Infrastructure\Delivery\Model\Page;
use Check24\BackendTest\Infrastructure\Delivery\Model\PaginatorRequest;
use Symfony\Component\HttpFoundation\Request;

class PaginatorRequestMapper
{
    public static function create(Request $request, array $extraFields = []): PaginatorRequest
    {
        $orders = self::getSort($request);

        $include = self::getIncludes($request);

        $page = self::getPage($request);

        $filters = self::getFilters($request, $extraFields);

        $query = $request->query->get('q', null);

        return new PaginatorRequest($page, $filters, $include, $orders, $query);
    }

    protected static function getSort(Request $request)
    {
        $sort = $request->query->get('sort');

        if (null === $sort) {
            return null;
        }

        $orders = [];
        $sortFields = explode(',', $sort);

        foreach ($sortFields as $sortField) {
            $sortField = trim($sortField);
            if (empty($sortField)) {
                continue;
            }

            $orderType = ('-' === $sortField[0]) ? OrderType::DESC : OrderType::ASC;
            $field = ('-' === $sortField[0]) ? substr($sortField, 1) : $sortField;

            $orders[] = new Order($field, $orderType);
        }

        return empty($orders) ? null : $orders;
    }

    protected static function getIncludes(Request $request): array
    {
        $includes = $request->query->get('include');
        $include = [];
        if (null !== $includes) {
            $include = explode(',', $includes);
        }

        return $include;
    }

    private static function getPage(Request $request): Page
    {
        $page = $request->query->all('page');

        $number = isset($page['number']) ? (int) $page['number'] : Page::DEFAULT_PAGE;
        $size = isset($page['size']) ? (int) $page['size'] : Page::DEFAULT_SIZE;

        if ($size > Page::MAX_SIZE) {
            $size = Page::MAX_SIZE;
        }

        return new Page($size, $number);
    }

    private static function getFilters(Request $request, array $extraFields = []): array
    {
        $filters = array_merge($request->query->all('fields'), $extraFields);

        return !isset($filters) ? [] : $filters;
    }
}
