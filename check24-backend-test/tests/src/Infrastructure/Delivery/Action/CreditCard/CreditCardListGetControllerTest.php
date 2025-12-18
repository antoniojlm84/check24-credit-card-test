<?php

declare(strict_types=1);

namespace Check24\BackendTest\Tests\src\Infrastructure\Delivery\Action\CreditCard;

use Check24\BackendTest\Tests\src\Infrastructure\Test\FunctionalTestCase;

/**
 * @internal
 */
class CreditCardListGetControllerTest extends FunctionalTestCase
{
    private const FILE = 'tests/Fixtures/data/creditcard/credit_cards_list_get.json';

    public function testListNoFilter(): void
    {
        $expectedResponse = $this->expectedResponse();
        $client = $this->client;

        // When
        $client->request('GET', '/api/credit-cards');
        $response = json_decode($client->getResponse()->getContent(), true);

        foreach ($response['data'] as &$data) {
            unset($data['attributes']['created_at'], $data['attributes']['updated_at']);
        }

        $this->assertResponseIsSuccessful();
        $this->assertEquals($expectedResponse, $response);
    }

    private function expectedResponse(): array
    {
        $content = file_get_contents(self::FILE);
        $jsonDecodeInfo = json_decode($content, true);

        foreach ($jsonDecodeInfo['data'] as &$data) {
            unset($data['attributes']['created_at'], $data['attributes']['updated_at']);
        }

        return $jsonDecodeInfo;
    }
}
