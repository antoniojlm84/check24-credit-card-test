<?php

declare(strict_types=1);

namespace Check24\BackendTest\Infrastructure\Delivery\Action\CreditCard;

use Check24\BackendTest\Application\Query\CreditCard\List\CreditCardListQuery;
use Check24\BackendTest\Application\Query\CreditCard\List\CreditCardListQueryHandler;
use Check24\BackendTest\Infrastructure\Delivery\Mapper\PaginatorRequestMapper;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class CreditCardListGetController extends AbstractController
{
    public function __construct(
        protected CreditCardListQueryHandler $queryHandler,
        protected CreditCardListGetDataTransformer $transformer,
    ) {
    }

    public function __invoke(Request $request): JsonResponse
    {
        $paginatorRequest = PaginatorRequestMapper::create($request);

        $queryResult = $this->queryHandler->__invoke(new CreditCardListQuery(
            $this->getUser(),
            $paginatorRequest->filters(),
            $request->query->has('no_pagination') ? 0 : $paginatorRequest->page()->number(),
            $request->query->has('no_pagination') ? 0 : $paginatorRequest->page()->size(),
            $paginatorRequest->query(),
            $paginatorRequest->order()?->field(),
            $paginatorRequest->order()?->type(),
            $paginatorRequest->include()
        ));

        $this->transformer->write($queryResult);

        return new JsonResponse(
            $this->transformer->read(),
            Response::HTTP_OK
        );
    }
}
