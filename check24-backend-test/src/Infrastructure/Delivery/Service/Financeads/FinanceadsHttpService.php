<?php

namespace Check24\BackendTest\Infrastructure\Delivery\Service\Financeads;

use Check24\BackendTest\Domain\Service\FinanceadsHttpServiceInterface;
use Symfony\Contracts\HttpClient\Exception\ClientExceptionInterface;
use Symfony\Contracts\HttpClient\Exception\ServerExceptionInterface;
use Symfony\Contracts\HttpClient\Exception\TransportExceptionInterface;
use Symfony\Contracts\HttpClient\HttpClientInterface;

class FinanceadsHttpService implements FinanceadsHttpServiceInterface
{
    public const CREDIT_CARDS_URL_GET = 'https://tools.financeads.net/webservice.php?wf=1&format=xml&calc=kreditkarterechner&country=ES';

    public function __construct(
        private HttpClientInterface $client,
    ) {
    }

    public function getCreditCardsData(): array
    {
        try {
            $response = $this->client->request('GET', self::CREDIT_CARDS_URL_GET);

            $data = $response->getContent();

            $xml = simplexml_load_string($data, 'SimpleXMLElement', LIBXML_NOCDATA);
            $json = json_encode($xml);

            return json_decode($json, true);
        } catch (TransportExceptionInterface|ClientExceptionInterface|ServerExceptionInterface $e) {
            throw new \RuntimeException('Error on external API call: '.$e->getMessage());
        }
    }
}
