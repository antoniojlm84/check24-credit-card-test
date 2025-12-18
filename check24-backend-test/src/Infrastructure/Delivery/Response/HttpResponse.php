<?php

declare(strict_types=1);

namespace Check24\BackendTest\Infrastructure\Delivery\Response;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class HttpResponse
{
    public const CONTENT_TYPE = 'application/vnd.api+json';

    public static function create(
        $data,
        int $statusCode = Response::HTTP_OK,
        array $headers = [],
    ): JsonResponse {
        return new JsonResponse(
            $data,
            $statusCode,
            array_merge(
                $headers,
                [
                    'Content-type' => self::CONTENT_TYPE,
                ]
            )
        );
    }
}
