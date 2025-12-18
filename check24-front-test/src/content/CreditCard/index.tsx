import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { Container, Box, styled, Slide, CircularProgress } from '@mui/material';
import CreditCardOfferList from './components/CreditCardOfferList';
import { useRouter } from 'next/router';
import { useRefMounted } from 'src/hooks/useRefMounted';
import { creditCardHttpRepository } from 'src/services/api/creditCardHttpRepository';
import { useTranslation } from 'next-export-i18n';
import { useSnackbar } from 'notistack';

const MainContent = styled(Box)(
  () => `
    height: 100%;
    display: flex;
    flex: 1;
    flex-direction: column;
`
);

const TopWrapper = styled(Box)(
  ({ theme }) => `
  display: flex;
  width: 100%;
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing(6)};
`
);

function CreditCard() {
  const router = useRouter();
  const isMountedRef = useRefMounted();
  const [isLoading, setIsLoading] = useState(true);
  const [creditCards, setCreditCards]: any = useState([]);
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();

  const getCreditCards = async (query = null) => {
    try {
      router.push(
        { pathname: '/credit-cards', query: query ?? router.query },
        null,
        { shallow: true }
      );

      setCreditCards([]);

      const response = await creditCardHttpRepository.getCreditCardsList(
        query ?? router.query
      );

      if (isMountedRef() && response.data) {
        setCreditCards(response.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const importCards = async () => {
    try {
      const response = await creditCardHttpRepository.importCreditCards();

      if (response) {
        enqueueSnackbar(t('messages.import_ok'), {
          variant: 'success',
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'right'
          },
          autoHideDuration: 2000,
          TransitionComponent: Slide
        });
        setIsLoading(true);
      }
    } catch (err) {
      setIsLoading(false);
      enqueueSnackbar(t('500.text1'), {
        variant: 'error',
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'right'
        },
        autoHideDuration: 2000,
        TransitionComponent: Slide
      });
      console.error(err);
    }
  };

  useEffect(() => {
    if (isLoading) {
      getCreditCards(router.query);
    }
  }, [isLoading]);

  return (
    <>
      <Head>
        <title>{t('buttons.compare_credit_cards')}</title>
      </Head>
      <MainContent>
        <TopWrapper>
          <Container maxWidth="md">
            <Box textAlign="center">
              {isLoading ? (
                <CircularProgress size={32} disableShrink thickness={3} />
              ) : (
                <CreditCardOfferList
                  creditCards={creditCards}
                  importCards={importCards}
                />
              )}
            </Box>
          </Container>
        </TopWrapper>
      </MainContent>
    </>
  );
}

export default CreditCard;
