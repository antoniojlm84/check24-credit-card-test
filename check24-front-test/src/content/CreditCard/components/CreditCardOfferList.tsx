import { useState, useMemo } from 'react';
import CreditCardOffer from './CreditCardOffer';
import { useTranslation } from 'next-export-i18n';
import {
  Box,
  Grid,
  Stack,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  ToggleButton,
  ToggleButtonGroup
} from '@mui/material';
import { ArrowUpward, ArrowDownward } from '@mui/icons-material';

export default function CreditCardOfferList({
  creditCards,
  importCards
}: {
  creditCards: any[];
  importCards: () => void;
}) {
  const { t } = useTranslation();
  const [isLoading, SetIsLoading] = useState(false);
  const [filters, setFilters] = useState({
    orderBy: 'name',
    direction: 'asc'
  });

  const updateFilter = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value
    }));
  };

  const sortedCreditCards = useMemo(() => {
    return [...creditCards].sort((a, b) => {
      let result = 0;

      switch (filters.orderBy) {
        case 'price':
          result = (a.attributes.price ?? 0) - (b.attributes.price ?? 0);
          break;

        case 'name':
        default:
          result = a.attributes.name.localeCompare(b.attributes.name);
          break;
      }

      return filters.direction === 'asc' ? result : -result;
    });
  }, [creditCards, filters]);

  return (
    <>
      {creditCards.length === 0 ? (
        <Box>{t('credit_cards.no_items')}</Box>
      ) : (
        <>
          <Grid container spacing={2}>
            <Grid item xs={12} textAlign="right">
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={2}
                gap={2}
              >
                {/* FILTROS */}
                <Stack direction="row" spacing={2}>
                  {/* ORDENAR POR */}
                  <FormControl size="small" sx={{ minWidth: 160 }}>
                    <InputLabel>{t('credit_cards.order_by')}</InputLabel>
                    <Select
                      value={filters.orderBy}
                      label={t('credit_cards.order_by')}
                      onChange={(e) => updateFilter('orderBy', e.target.value)}
                    >
                      <MenuItem value="name">{t('credit_cards.name')}</MenuItem>
                      <MenuItem value="price">{t('credit_cards.price')}</MenuItem>
                    </Select>
                  </FormControl>

                  {/* DIRECCIÓN */}
                  <ToggleButtonGroup
                    value={filters.direction}
                    exclusive
                    onChange={(_e, value) =>
                      value && updateFilter('direction', value)
                    }
                    size="small"
                  >
                    <ToggleButton value="asc">
                      <ArrowUpward fontSize="small" />
                    </ToggleButton>
                    <ToggleButton value="desc">
                      <ArrowDownward fontSize="small" />
                    </ToggleButton>
                  </ToggleButtonGroup>
                </Stack>
                <Button
                  variant="contained"
                  color="primary"
                  href="#filters"
                  sx={{ mb: 2 }}
                  onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    SetIsLoading(true);
                    importCards();
                  }}
                  disabled={isLoading}
                  startIcon={
                    isLoading ? (
                      <CircularProgress size={20} color="inherit" />
                    ) : null
                  }
                >
                  {isLoading
                    ? t('actions.loading')
                    : t('actions.import_credit_cards')}
                </Button>
              </Box>
            </Grid>
          </Grid>
          <Stack spacing={2}>
            {sortedCreditCards.map((creditCard, index) => (
              <CreditCardOffer
                key={index}
                name={creditCard.attributes.name}
                originalValues={creditCard.attributes.original_value}
                index={index}
              />
            ))}
          </Stack>
        </>
      )}
    </>
  );
}
