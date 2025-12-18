<?php

declare(strict_types=1);

namespace Check24\BackendTest\Application\Query\CreditCard\List;

use Assert\AssertionFailedException;
use Check24\BackendTest\Domain\AbstractCollection;
use Check24\BackendTest\Domain\Criteria\FieldCollection;
use Check24\BackendTest\Domain\Criteria\Order;
use Check24\BackendTest\Domain\Model\CreditCard\CreditCard;
use Check24\BackendTest\Domain\Model\CreditCard\CreditCardCollection;
use Check24\BackendTest\Domain\Model\CreditCard\CreditCardCriteriaFactory;
use Check24\BackendTest\Domain\Model\CreditCard\CreditCardRepository;
use Symfony\Component\Security\Core\User\UserInterface;

class CreditCardListService
{
    public function __construct(
        private CreditCardRepository $repository,
        private CreditCardCriteriaFactory $criteriaFactory,
    ) {
    }

    public function execute(
        ?UserInterface $loggedUser,
        array $filters,
        int $page,
        int $size,
        FieldCollection $fields,
        ?Order $order = null,
        ?string $query = null,
    ): CreditCardListQueryResponse {
        $defaultCriteria = $this->criteriaFactory->create(
            $loggedUser,
            $filters,
            $order,
            $query,
            $page,
            $size
        );

        $totalItems = $this->repository->count($defaultCriteria);

        $collection = $this->repository->byCriteria($defaultCriteria);

        return new CreditCardListQueryResponse(
            $this->buildResponse($collection),
            $page,
            $size,
            $totalItems,
            $fields
        );
    }

    /**
     * @param mixed $collection
     *
     * @throws AssertionFailedException
     */
    private function buildResponse(CreditCardCollection $collection): AbstractCollection
    {
        $responseCollection = CreditCardCollection::create();

        /** @var CreditCard $itemCollection */
        foreach ($collection as $itemCollection) {
            $originalValues = $itemCollection->originalValue()->originalValue();
            if (!empty($itemCollection->editedValue()->editedValue())) {
                foreach ($itemCollection->editedValue()->editedValue() as $key => $editedValue) {
                    if (
                        array_key_exists($key, $originalValues)
                        && $originalValues[$key] !== $editedValue
                    ) {
                        $originalValues[$key] = $editedValue;
                    }
                }
            }

            $responseCollection->addCreditCard(
                CreditCard::create(
                    $itemCollection->id()->value(),
                    $itemCollection->bankId()->value(),
                    $itemCollection->productId()->value(),
                    $itemCollection->name()->value(),
                    $itemCollection->price()->value(),
                    $originalValues,
                    $itemCollection->editedValue()->editedValue()
                )
            );
        }

        return $responseCollection;
    }
}
