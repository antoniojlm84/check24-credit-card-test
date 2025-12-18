<?php

declare(strict_types=1);

namespace Check24\BackendTest\Application\Command\CreditCard\CreditCardImport;

use Check24\BackendTest\Domain\Criteria\Expr\Criteria;
use Check24\BackendTest\Domain\Model\CreditCard\CreditCard;
use Check24\BackendTest\Domain\Model\CreditCard\CreditCardRepository;
use Check24\BackendTest\Domain\ValueObject\Uuid;
use Check24\BackendTest\Infrastructure\Delivery\Service\Financeads\FinanceadsHttpService;

class CreditCardImportService
{
    public function __construct(
        private readonly CreditCardRepository $creditCardRepository,
        private readonly FinanceadsHttpService $financeadsHttpService,
    ) {
    }

    public function execute(): void
    {
        // Call to external service
        $data = $this->financeadsHttpService->getCreditCardsData();

        if (!empty($data)) {
            // Update registry in Bd if exists or add if not
            foreach ($data as $creditCard) {
                // Look for it in BD
                if (isset($creditCard[0])) {
                    $creditCard = $creditCard[0];
                }
                $bankId = $creditCard['bankid'];
                $creditCard['anmerkungen'] = (!empty($creditCard['anmerkungen']) && !is_array($creditCard['anmerkungen'])) ? $this->sanitizeHTMLEntities($creditCard['anmerkungen']) : $creditCard['anmerkungen'];

                $expressionBuilder = Criteria::expr();
                $comparison = $expressionBuilder->eq('bankId', $bankId);
                $foundCreditCard = $this->creditCardRepository->byCriteria(
                    new Criteria($comparison)
                );

                if (0 == $foundCreditCard->count()) {
                    $newCreditCard = CreditCard::create(
                        Uuid::random()->value(),
                        $bankId,
                        $creditCard['productid'],
                        $creditCard['bank'],
                        $creditCard['kosten'],
                        $creditCard
                    );
                } else {
                    /** @var CreditCard $newCreditCard */
                    $newCreditCard = $foundCreditCard->first();
                    $newCreditCard->updateOriginalValue($creditCard);
                }

                $this->creditCardRepository->save($newCreditCard);
            }
        }
    }

    private function sanitizeHTMLEntities(string $text): string
    {
        if (!is_string($text)) {
            return '';
        }

        return html_entity_decode($text, ENT_QUOTES | ENT_HTML5, 'UTF-8');
    }
}
