import React from 'react';
import Head from 'next/head';
import { Container, Button, Box, styled } from '@mui/material';
import { useTranslation } from 'next-export-i18n';

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

function LandingMain() {
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>Credit cards comparator</title>
      </Head>
      <MainContent>
        <TopWrapper>
          <Container maxWidth="md">
            <Box textAlign="center">
              <Button variant="contained" color="primary" href="/credit-cards">
                {t('buttons.compare_credit_cards')}
              </Button>
            </Box>
          </Container>
        </TopWrapper>
      </MainContent>
    </>
  );
}

export default LandingMain;
