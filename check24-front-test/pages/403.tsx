import { Box, Typography, Container, styled, Button } from '@mui/material';
import Head from 'next/head';
import TopNavigationLayout from 'src/layouts/TopNavigationLayout';
//import LandingMainFooter from '@/content/Landing/Main/Footer';
import { Authenticated } from 'src/components/Authenticated';
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

function Status403() {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>Status - 403</title>
      </Head>
      <MainContent>
        <TopWrapper>
          <Container maxWidth="md">
            <Box textAlign="center" sx={{ my: 15 }}>
              <Typography variant="h1" sx={{ my: 2 }}>
                {t('403.text1')}
              </Typography>
              <Typography variant="body1" sx={{ my: 2, fontSize: '1rem' }}>
                {t('403.text2')}
              </Typography>
              <Button
                sx={{ mt: 2 }}
                variant="contained"
                color="primary"
                href="/"
              >
                {t('403.button-back')}
              </Button>
            </Box>
          </Container>
        </TopWrapper>
      </MainContent>
    </>
  );
}

Status403.getLayout = (page: any) => (
  <Authenticated>
    <TopNavigationLayout>{page}</TopNavigationLayout>
  </Authenticated>
);

export default Status403;
