<?php

declare(strict_types=1);

namespace Check24\BackendTest\Infrastructure\Delivery\Action\CreditCard;

use Check24\BackendTest\Application\Query\CreditCard\Show\CreditCardShowQuery;
use Check24\BackendTest\Application\Query\CreditCard\Show\CreditCardShowQueryHandler;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class CreditCardShowGetController extends AbstractController
{
    public function __construct(
        protected CreditCardShowQueryHandler $queryHandler,
        protected CreditCardShowGetDataTransformer $transformer,
    ) {
    }

    public function __invoke(Request $request, string $creditCardId): JsonResponse
    {
        $query = new CreditCardShowQuery(
            $creditCardId
        );

        $queryResult = $this->queryHandler->__invoke($query);

        $this->transformer->write($queryResult);

        return new JsonResponse(
            $this->transformer->read(),
            Response::HTTP_OK
        );
    }
}
