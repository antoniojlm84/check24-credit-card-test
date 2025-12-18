import React from 'react';
import { Box, Container, styled } from '@mui/material';
import Head from 'next/head';
import { useTranslation } from 'next-export-i18n';
import LandingMain from '@/content/Landing/Main';
import TopNavigationLayout from 'src/layouts/TopNavigationLayout';

const OverviewWrapper = styled(Box)(
  ({ theme }) => `
    overflow: auto;
    background: ${theme.palette.common.white};
    flex: 1;
    overflow-x: hidden;
`
);

function LandingPage() {
  const { t } = useTranslation();

  return (
    <OverviewWrapper>
      <Head>
        <title>{`${t('app.title')} - ${t('landing_main.title')}`}</title>
      </Head>
      <Container maxWidth="lg">
        <Box display="flex" alignItems="center">
          <LandingMain />
        </Box>
      </Container>
    </OverviewWrapper>
  );
}

export default LandingPage;

LandingPage.getLayout = function getLayout(page) {
  return <TopNavigationLayout>{page}</TopNavigationLayout>;
};
