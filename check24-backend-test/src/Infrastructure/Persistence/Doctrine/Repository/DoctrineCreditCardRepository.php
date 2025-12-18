<?php

declare(strict_types=1);

namespace Check24\BackendTest\Infrastructure\Persistence\Doctrine\Repository;

use Check24\BackendTest\Domain\Criteria\Expr\Criteria;
use Check24\BackendTest\Domain\Model\CreditCard\CreditCard;
use Check24\BackendTest\Domain\Model\CreditCard\CreditCardCollection;
use Check24\BackendTest\Domain\Model\CreditCard\CreditCardId;
use Check24\BackendTest\Domain\Model\CreditCard\CreditCardRepository;
use Check24\BackendTest\Infrastructure\Persistence\Doctrine\Expr\DoctrineCriteriaConverter;
use Check24\BackendTest\Infrastructure\Persistence\Doctrine\PropertyHydrator;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\NonUniqueResultException;
use Doctrine\ORM\NoResultException;

class DoctrineCreditCardRepository extends DoctrineRepository implements CreditCardRepository
{
    use PropertyHydrator;

    private static array $mappingFields = [
        'name' => 'creditCard.name.value',
        'productId' => 'creditCard.productId.value',
        'price' => 'creditCard.price.value',
        'originalValue' => 'creditCard.originalValue.originalValue',
        'editedValue' => 'creditCard.editedValue.editedValue',
        'bankId' => 'creditCard.bankId.value',
        'id' => 'creditCard.id.id',
        'createdAt' => 'creditCard.createdAt',
        'updatedAt' => 'creditCard.updatedAt',
        'deleted' => 'creditCard.deleted',
    ];

    public function __construct(EntityManagerInterface $entityManager)
    {
        parent::__construct($entityManager, CreditCard::class);
    }

    public function save(CreditCard $creditCard, ?array $relations = null): void
    {
        $this->entityManager->persist($creditCard);
        $this->entityManager->flush();
    }

    public function byCriteria(Criteria $criteria): CreditCardCollection
    {
        $items = $this->repository
            ->createQueryBuilder('creditCard')
            ->addCriteria(
                DoctrineCriteriaConverter::convert($criteria, self::$mappingFields)
            )
            ->getQuery()
            ->getResult()
        ;

        $collection = CreditCardCollection::create();
        $collection->addCreditCards($items);

        return $collection;
    }

    public function byId(CreditCardId $creditCardId, ?array $includes = null): ?CreditCard
    {
        /** @var CreditCard|null $creditCard */
        $creditCard = $this->repository->findOneBy(
            [
                'id' => $creditCardId,
            ]
        );

        return $creditCard;
    }

    public function count(Criteria $criteria): int
    {
        $query = $this->repository->createQueryBuilder('creditCard')
            ->select('count(distinct(creditCard))')
            ->addCriteria(
                DoctrineCriteriaConverter::convertToCount($criteria, self::$mappingFields)
            )
            ->getQuery()
        ;

        try {
            return $query->getSingleScalarResult();
        } catch (NonUniqueResultException|NoResultException) {
            return 0;
        }
    }
}
