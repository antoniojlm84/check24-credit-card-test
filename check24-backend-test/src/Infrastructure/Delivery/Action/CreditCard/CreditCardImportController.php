<?php

declare(strict_types=1);

namespace Check24\BackendTest\Infrastructure\Delivery\Action\CreditCard;

use Check24\BackendTest\Application\Command\CreditCard\CreditCardImport\CreditCardImportCommand;
use Check24\BackendTest\Application\Command\CreditCard\CreditCardImport\CreditCardImportCommandHandler;
use Check24\BackendTest\Infrastructure\Delivery\Response\HttpAcceptedResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class CreditCardImportController extends AbstractController
{
    public function __construct(
        private readonly CreditCardImportCommandHandler $creditCardImportCommandHandler,
    ) {
    }

    public function __invoke(Request $request): Response
    {
        $this->creditCardImportCommandHandler->__invoke(new CreditCardImportCommand());

        return HttpAcceptedResponse::create(
            [
                'message' => 'The credit cards has been sync successfully.',
            ],
            Response::HTTP_OK
        );
    }
}
