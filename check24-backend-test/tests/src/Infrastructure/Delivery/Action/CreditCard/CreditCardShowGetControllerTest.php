<?php

declare(strict_types=1);

namespace Check24\BackendTest\Tests\src\Infrastructure\Delivery\Action\CreditCard;

use Check24\BackendTest\Tests\src\Infrastructure\Test\FunctionalTestCase;

/**
 * @internal
 */
class CreditCardShowGetControllerTest extends FunctionalTestCase
{
    private const FILE = 'tests/Fixtures/data/creditcard/credit_cards_show_get.json';

    public function testShow(): void
    {
        $expectedResponse = $this->expectedResponse();
        $client = $this->client;

        // When
        $client->request('GET', '/api/credit-cards/ea798907-bcae-431a-b44d-86e718d562bf');
        $response = json_decode($client->getResponse()->getContent(), true);
        unset($response['data']['attributes']['created_at'], $response['data']['attributes']['updated_at']);

        $this->assertResponseIsSuccessful();
        $this->assertEquals($expectedResponse, $response);
    }

    private function expectedResponse(): array
    {
        $content = file_get_contents(self::FILE);
        $jsonDecodeInfo = json_decode($content, true);

        unset($jsonDecodeInfo['data']['attributes']['created_at'], $jsonDecodeInfo['data']['attributes']['updated_at']);

        return $jsonDecodeInfo;
    }
}
