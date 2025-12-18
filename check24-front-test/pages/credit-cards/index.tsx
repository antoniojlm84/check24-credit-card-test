import React from 'react';
import { Box, Container, styled } from '@mui/material';
import Head from 'next/head';
import { useTranslation } from 'next-export-i18n';
import TopNavigationLayout from 'src/layouts/TopNavigationLayout';
import CreditCard from '@/content/CreditCard';

const OverviewWrapper = styled(Box)(
  ({ theme }) => `
    overflow: auto;
    background: ${theme.palette.common.white};
    flex: 1;
    overflow-x: hidden;
`
);

function CreditCardsPage() {
  const { t } = useTranslation();

  return (
    <OverviewWrapper>
      <Head>
        <title>{`${t('app.title')} - ${t('landing_main.title')}`}</title>
      </Head>
      <Container maxWidth="lg">
        <Box display="flex" alignItems="center">
          <CreditCard />
        </Box>
      </Container>
    </OverviewWrapper>
  );
}

export default CreditCardsPage;

CreditCardsPage.getLayout = function getLayout(page) {
  return <TopNavigationLayout>{page}</TopNavigationLayout>;
};
