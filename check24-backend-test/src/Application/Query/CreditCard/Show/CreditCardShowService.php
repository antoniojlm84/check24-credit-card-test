<?php

declare(strict_types=1);

namespace Check24\BackendTest\Application\Query\CreditCard\Show;

use Assert\AssertionFailedException;
use Check24\BackendTest\Domain\Model\CreditCard\CreditCard;
use Check24\BackendTest\Domain\Model\CreditCard\CreditCardId;
use Check24\BackendTest\Domain\Model\CreditCard\CreditCardRepository;
use Check24\BackendTest\Domain\Model\CreditCard\Exception\CreditCardNotFoundException;

class CreditCardShowService
{
    public function __construct(
        private readonly CreditCardRepository $CreditCardRepository,
    ) {
    }

    /**
     * @throws AssertionFailedException
     * @throws CreditCardNotFoundException
     */
    public function execute(
        CreditCardId $creditCardId,
    ): CreditCardShowQueryResponse {
        $creditCard = $this->CreditCardRepository->byId($creditCardId);

        if (!$creditCard) {
            throw CreditCardNotFoundException::withId($creditCardId->value());
        }

        $originalValues = $creditCard->originalValue()->originalValue();
        if (!empty($creditCard->editedValue()->editedValue())) {
            foreach ($creditCard->editedValue()->editedValue() as $key => $editedValue) {
                if (
                    array_key_exists($key, $originalValues)
                    && $originalValues[$key] !== $editedValue
                ) {
                    $originalValues[$key] = $editedValue;
                }
            }
        }

        $resource = CreditCard::create(
            $creditCard->id()->value(),
            $creditCard->bankId()->value(),
            $creditCard->productId()->value(),
            $creditCard->name()->value(),
            $creditCard->price()->value(),
            $originalValues,
            $creditCard->editedValue()->editedValue()
        );

        return new CreditCardShowQueryResponse($resource);
    }
}
