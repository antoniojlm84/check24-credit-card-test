<?php

declare(strict_types=1);

namespace Check24\BackendTest\Tests\src\Domain\Model\CreditCard;

use Check24\BackendTest\Domain\Model\CreditCard\CreditCard;
use Check24\BackendTest\Domain\Model\CreditCard\CreditCardBankId;
use Check24\BackendTest\Domain\Model\CreditCard\CreditCardEditedValue;
use Check24\BackendTest\Domain\Model\CreditCard\CreditCardId;
use Check24\BackendTest\Domain\Model\CreditCard\CreditCardName;
use Check24\BackendTest\Domain\Model\CreditCard\CreditCardOriginalValue;
use Check24\BackendTest\Domain\Model\CreditCard\CreditcardPrice;
use Check24\BackendTest\Domain\Model\CreditCard\CreditCardProductId;
use Check24\BackendTest\Tests\src\Infrastructure\ReflectionUtils;
use Doctrine\ORM\PersistentCollection;

class CreditCardDataBuilder
{
    private const ID = '8e4f67ef-d6de-474b-b7db-9b5053826e07';
    private const BANK_ID = '2554';
    private const ORIGINAL_VALUE = '{"nfc": "0", "bank": "Advanzia Bank S.A.", "link": "http://www.financeads.net/tc.php?t=1C255409004D&product=3364", "logo": "https://bilder.financeads.net/creditcards/120076/3364.jpg", "bankid": "2554", "kosten": "0,00", "hotline": [], "kkoffer": "0,00", "produkt": "Tarjeta You", "benefits": "0", "cardtype": "0", "cashback": [], "services": "0", "sollzins": "26,82", "bewertung": "4.7", "dauerhaft": "0,00", "gebuehren": "0,00", "habenzins": "0,00", "incentive": "21", "productid": "3364", "bewertung2": [], "insurances": "0", "testsiegel": [], "@attributes": {"id": "3364"}, "anmerkungen": "&lt;li&gt;&lt;strong&gt;Tarjeta de cr&eacute;dito sin cambiar de banco o crear una cuenta nueva&lt;/strong&gt;&lt;/li&gt;&lt;li&gt;&lt;strong&gt;Gratis a&ntilde;os tras a&ntilde;o&lt;/strong&gt;&lt;/li&gt;&lt;li&gt;&lt;strong&gt;Devoluci&oacute;n de hasta 7 semanas sin intereses&lt;/strong&gt;&lt;/li&gt;&lt;li&gt;Seguro de viaje gratuito&lt;/li&gt;&lt;li&gt;Pago fin de mes (hasta 7 semanas)&lt;/li&gt;&lt;li&gt;Solicitud online completa&lt;/li&gt;", "cc_provider": "3", "gc_provider": [], "hotlinetext": [], "umschuldung": "0", "bonusprogram": "0", "cashbacktext": [], "cc_themecard": "0", "gc_themecard": [], "loungeaccess": [], "cardtype_text": "credit", "hoteldiscount": [], "subbewertung1": [], "subbewertung2": [], "subbewertung3": [], "subbewertung4": [], "subbewertung5": [], "besonderheiten": "<li>Residir en España</li><li>23 años</li><li>No estar reportado en ASNEF o central de riesgo</li>", "cc_partnercard": "1", "gc_partnercard": [], "gebuehrenjahr1": "0,00", "incentive_text": "TAE", "petroldiscount": [], "productgroupid": [], "testsiegel_url": [], "traveldiscount": [], "cc_atm_euro_fee": "0,00", "cc_atmfree_euro": "0", "documentservice": [], "kostenmitaktion": "0,00 &amp;euro;", "subbewertung2_1": [], "subbewertung2_2": [], "subbewertung2_3": [], "subbewertung2_4": [], "subbewertung2_5": [], "bewertung_anzahl": "1", "bewertung_gesamt": [], "bonuspointsystem": [], "cc_paymentmethod": "credit", "gc_paymentmethod": [], "hotelreservation": [], "incentive_amount": "21", "loungeaccesstext": [], "bewertung2_anzahl": [], "bewertung2_gesamt": [], "bewertung_details": [], "cc_themecard_cost": [], "flightreservation": [], "gc_themecard_cost": [], "hoteldiscounttext": [], "rentalcardiscount": [], "shoppinginsurance": [], "bewertung2_details": [], "gebuehrenmitaktion": "0,00 &amp;euro;", "petroldiscounttext": [], "travelcarinsurance": [], "traveldiscounttext": [], "cc_atm_euro_fee_min": "0,00", "cc_atmfree_domestic": "1.000.000", "cc_partnercard_cost": "0,00", "documentservicetext": [], "gc_atmfree_domestic": "0", "gc_partnercard_cost": [], "bonuspointsystemtext": [], "cc_atmfree_euro_text": [], "cc_transactionfee_eu": "0,00", "gc_transactionfee_eu": [], "hotelreservationtext": [], "flightreservationtext": [], "incentive_description": [], "rentalcardiscounttext": [], "shoppinginsurancetext": [], "travelhealthinsurance": [], "eventticketreservation": [], "travelbaggageinsurance": [], "travelcarinsurancetext": [], "travelaccidentinsurance": [], "cc_atmfree_domestic_text": [], "cc_atmfree_international": "0", "gc_atmfree_domestic_text": [], "gc_atmfree_international": "0", "travelhealthinsurancetext": [], "cc_transactionfee_currency": "0,00", "eventticketreservationtext": [], "gc_transactionfee_currency": [], "transportaccidentinsurance": [], "travelbaggageinsurancetext": [], "rentalcarcomprehensivecover": [], "rentalcarliabilityinsurance": [], "travelaccidentinsurancetext": [], "travelcancellationinsurance": [], "cc_atmfree_international_text": [], "gc_atmfree_international_text": [], "transportaccidentinsurancetext": [], "cc_transactionfee_international": "0,00", "gc_transactionfee_international": [], "rentalcarcomprehensivecovertext": [], "rentalcarlegalexpensesinsurance": [], "rentalcarliabilityinsurancetext": [], "travelcancellationinsurancetext": [], "rentalcarlegalexpensesinsurancetext": []}';
    private const EDITED_VALUE = '[]';
    private const NAME = 'Advanzia Bank S.A.';
    private const PRICE = 0.00;
    private const PRODUCT_ID = '3364';

    private CreditCard $entity;

    /**
     * @throws \ReflectionException
     */
    public function __construct()
    {
        $this->entity = $this->prototype();

        $this->withId(self::ID);
        $this->withBankId(self::BANK_ID);
        $this->withName(self::NAME);
        $this->withPrice(self::PRICE);
        $this->withProductId(self::PRODUCT_ID);
        $this->withOriginalValue(self::ORIGINAL_VALUE);
        $this->withEditedValue(self::EDITED_VALUE);
        $date = (new \DateTimeImmutable('now'))->setTimezone(new \DateTimeZone('Europe/Madrid'));
        $this->withCreatedDate($date);
    }

    public static function aCard(): self
    {
        return new self();
    }

    public function build(): CreditCard
    {
        return $this->entity;
    }

    /**
     * @throws \ReflectionException
     */
    public function withId(string $id): self
    {
        ReflectionUtils::setPrivateValue($this->entity, 'id', new CreditCardId($id));

        return $this;
    }

    /**
     * @throws \ReflectionException
     */
    public function withProductId(string $id): self
    {
        ReflectionUtils::setPrivateValue($this->entity, 'productId', new CreditCardProductId($id));

        return $this;
    }

    public function withBankId(string $bankId): self
    {
        ReflectionUtils::setPrivateValue($this->entity, 'bankId', new CreditCardBankId($bankId));

        return $this;
    }

    /**
     * @throws \ReflectionException
     */
    public function withName(string $name): self
    {
        ReflectionUtils::setPrivateValue($this->entity, 'name', new CreditCardName($name));

        return $this;
    }

    /**
     * @throws \ReflectionException
     */
    public function withOriginalValue(string $initialValue): self
    {
        ReflectionUtils::setPrivateValue($this->entity, 'originalValue', new CreditCardOriginalValue(json_decode($initialValue, true)));

        return $this;
    }

    /**
     * @throws \ReflectionException
     */
    public function withEditedValue(string $requestValue): self
    {
        ReflectionUtils::setPrivateValue($this->entity, 'editedValue', new CreditCardEditedValue(json_decode($requestValue, true)));

        return $this;
    }

    /**
     * @throws \ReflectionException
     */
    public function withPrice(float $price): self
    {
        ReflectionUtils::setPrivateValue($this->entity, 'price', new CreditcardPrice($price));

        return $this;
    }

    /**
     * @throws \ReflectionException
     */
    public function withCreatedDate(\DateTimeImmutable $createdAt): self
    {
        ReflectionUtils::setPrivateValue($this->entity, 'createdAt', $createdAt);

        return $this;
    }

    /**
     * @throws \ReflectionException
     */
    public function prototype(): CreditCard
    {
        $reflection = new \ReflectionClass(CreditCard::class);

        return $reflection->newInstanceWithoutConstructor();
    }

    public function prototypePersistentCollection(): PersistentCollection
    {
        $reflection = new \ReflectionClass(PersistentCollection::class);

        return $reflection->newInstanceWithoutConstructor();
    }
}
