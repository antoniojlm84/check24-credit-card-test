<?php

declare(strict_types=1);

namespace Check24\BackendTest\Infrastructure\Delivery\Response\JsonApi\Transformer;

use Check24\BackendTest\Application\Query\Transformer\Transformer;
use League\Fractal\TransformerAbstract;

class JsonApiDTOTransformer extends TransformerAbstract implements Transformer
{
    public function __construct(
        protected ?array $fields = [],
        protected ?array $relatedFields = [],
    ) {
        $this->fields = $fields;
        $this->relatedFields = $relatedFields;
    }

    public function transform($object): array
    {
        $data = $object->jsonSerialize();

        if (true == empty($this->fields) && true == empty($this->relatedFields)) {
            return $data;
        }

        if (false == empty($this->fields)) {
            $fieldsToSearch = array_merge($this->fields, array_keys($this->relatedFields));
            $item = [];

            foreach ($fieldsToSearch as $field) {
                if (array_key_exists($field, $data)) {
                    $item[$field] = $data[$field];
                }
            }
        } else {
            $item = $data;
        }

        if (false == empty($this->relatedFields)) {
            foreach ($this->relatedFields as $field => $innerFields) {
                if (false == array_key_exists($field, $item) || true == empty($innerFields) || true == empty($item[$field])) {
                    continue;
                }

                $data = $item[$field];
                $item[$field] = [];

                foreach ($innerFields as $innerField) {
                    $item[$field][$innerField] = $data[$innerField];
                }
            }
        }

        return $item;
    }
}
