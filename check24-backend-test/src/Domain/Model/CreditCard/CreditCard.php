<?php

declare(strict_types=1);

namespace Check24\BackendTest\Domain\Model\CreditCard;

use Check24\BackendTest\Domain\JsonSerializable\JsonSerializable;
use Check24\BackendTest\Domain\Model\DeleteTrait;
use Check24\BackendTest\Domain\Model\TimeAwareTrait;

class CreditCard implements JsonSerializable
{
    use DeleteTrait;
    use TimeAwareTrait;

    private CreditCardId $id;
    private CreditCardOriginalValue $originalValue;
    private CreditCardEditedValue $editedValue;
    private CreditCardBankId $bankId;
    private CreditCardProductId $productId;
    private CreditCardName $name;
    private CreditCardPrice $price;

    private function __construct(
        CreditCardId $id,
        CreditCardBankId $bankId,
        CreditCardOriginalValue $originalValue,
        CreditCardEditedValue $editedValue,
        CreditCardProductId $productId,
        CreditCardName $name,
        CreditCardPrice $price,
    ) {
        $this->id = $id;
        $this->originalValue = $originalValue;
        $this->editedValue = $editedValue;
        $this->bankId = $bankId;
        $this->productId = $productId;
        $this->name = $name;
        $this->price = $price;
        $date = (new \DateTimeImmutable('now'))->setTimezone(new \DateTimeZone('Europe/Madrid'));
        $this->createdAt = $date;
        $this->deletedAt = null;
    }

    public static function create(
        string $id,
        string $bankId,
        string $productId,
        string $name,
        float $price,
        array $originalValue,
        ?array $editedValue = null,
    ): self {
        return new self(
            new CreditCardId($id),
            new CreditCardBankId($bankId),
            new CreditCardOriginalValue($originalValue),
            new CreditCardEditedValue($editedValue ?? []),
            new CreditCardProductId($productId),
            new CreditCardName($name),
            new CreditCardPrice($price)
        );
    }

    public function id(): CreditCardId
    {
        return $this->id;
    }

    public function originalValue(): CreditCardOriginalValue
    {
        return $this->originalValue;
    }

    public function editedValue(): CreditCardEditedValue
    {
        return $this->editedValue;
    }

    public function bankId(): CreditCardBankId
    {
        return $this->bankId;
    }

    public function productId(): CreditCardProductId
    {
        return $this->productId;
    }

    public function name(): CreditCardName
    {
        return $this->name;
    }

    public function price(): CreditCardPrice
    {
        return $this->price;
    }

    public function updateOriginalValue(array $originalValue): void
    {
        $this->originalValue = new CreditCardOriginalValue($originalValue);
    }

    public function updateEditedValue(array $editedValues): void
    {
        $this->editedValue = new CreditCardEditedValue($editedValues);
    }

    public function jsonSerialize(): array
    {
        return [
            'id' => $this->id()->value(),
            'name' => $this->name()->value(),
            'bank_id' => $this->bankId()->value(),
            'product_id' => $this->productId()->value(),
            'price' => $this->price()->value(),
            'original_value' => $this->originalValue()->originalValue(),
            'edited_value' => $this->editedValue()->editedValue(),
            'created_at' => $this->createdAt(),
            'updated_at' => $this->updatedAt(),
        ];
    }
}
