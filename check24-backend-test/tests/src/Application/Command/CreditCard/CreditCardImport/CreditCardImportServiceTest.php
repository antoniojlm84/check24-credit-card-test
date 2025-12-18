<?php

declare(strict_types=1);

namespace Check24\BackendTest\Tests\src\Application\Command\CreditCard\CreditCardImport;

use Check24\BackendTest\Application\Command\CreditCard\CreditCardImport\CreditCardImportService;
use Check24\BackendTest\Domain\Model\CreditCard\CreditCardCollection;
use Check24\BackendTest\Domain\Model\CreditCard\CreditCardRepository;
use Check24\BackendTest\Infrastructure\Delivery\Service\Financeads\FinanceadsHttpService;
use Check24\BackendTest\Tests\src\Domain\Model\CreditCard\CreditCardDataBuilder;
use PHPUnit\Framework\MockObject\MockObject;
use PHPUnit\Framework\TestCase;

final class CreditCardImportServiceTest extends TestCase
{
    private const XML_FIXTURE = 'tests/Fixtures/data/financeads/credit_cards_api_response.xml';

    private MockObject|CreditCardRepository|null $repository;
    private FinanceadsHttpService|MockObject|null $httpService;

    protected function setUp(): void
    {
        $this->repository = $this->createMock(CreditCardRepository::class);
        $this->httpService = $this->createMock(FinanceadsHttpService::class);
    }

    public function testItCreatesNewCreditCardWhenNotExists(): void
    {
        $apiData = $this->loadParsedXmlFixture();

        $this->httpService
            ->expects($this->once())
            ->method('getCreditCardsData')
            ->willReturn($apiData);

        $this->repository
            ->expects($this->atLeast(2))
            ->method('byCriteria')
            ->willReturn($this->getDBCollection());

        $service = new CreditCardImportService(
            $this->repository,
            $this->httpService
        );

        $service->execute();
    }

    public function testItDoesNothingWhenApiReturnsEmptyArray(): void
    {
        $this->httpService
            ->expects($this->once())
            ->method('getCreditCardsData')
            ->willReturn([]);

        $this->repository
            ->expects($this->never())
            ->method('save');

        $service = new CreditCardImportService(
            $this->repository,
            $this->httpService
        );

        $service->execute();
    }

    private function getDBCollection(): CreditCardCollection
    {
        $collection = CreditCardCollection::create();
        $existingCard = CreditCardDataBuilder::aCard()->build();
        $collection->addCreditCard($existingCard);

        return $collection;
    }

    private function loadParsedXmlFixture(): array
    {
        $xml = file_get_contents(self::XML_FIXTURE);

        $simpleXml = simplexml_load_string($xml);
        $json = json_encode($simpleXml);

        return json_decode(
            $json,
            true,
            flags: JSON_THROW_ON_ERROR
        )['product'];
    }
}
