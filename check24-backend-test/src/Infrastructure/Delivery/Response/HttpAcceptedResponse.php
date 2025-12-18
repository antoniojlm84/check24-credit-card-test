<?php

declare(strict_types=1);

namespace Check24\BackendTest\Infrastructure\Delivery\Response;

use Symfony\Component\HttpFoundation\Response;

class HttpAcceptedResponse
{
    public static function create(?array $data = null, int $statusCode = Response::HTTP_ACCEPTED, $headers = [])
    {
        return HttpResponse::create(
            $data,
            $statusCode,
            $headers
        );
    }
}
