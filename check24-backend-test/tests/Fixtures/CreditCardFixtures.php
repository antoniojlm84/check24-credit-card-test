<?php

declare(strict_types=1);

namespace Check24\BackendTest\Tests\Fixtures;

use Check24\BackendTest\Tests\src\Domain\Model\CreditCard\CreditCardDataBuilder;
use Doctrine\Bundle\FixturesBundle\ORMFixtureInterface;
use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Persistence\ObjectManager;

class CreditCardFixtures extends AbstractFixture implements ORMFixtureInterface
{
    private const FILE = 'tests/Fixtures/data/creditcard/credit_cards.json';

    public function load(ObjectManager $manager): void
    {
        $content = file_get_contents(self::FILE);
        $data = json_decode($content, true);

        foreach ($data as $itemData) {
            $item = CreditCardDataBuilder::aCard()
                ->withId($itemData['id'])
                ->withBankId($itemData['bank_id'])
                ->withProductId($itemData['product_id'])
                ->withName($itemData['name'])
                ->withPrice($itemData['price'])
                ->withOriginalValue($itemData['original_value'])
                ->withEditedValue($itemData['edited_value'])
                ->build()
            ;

            $manager->persist($item);
        }

        $manager->flush();
        $manager->clear();
    }
}
