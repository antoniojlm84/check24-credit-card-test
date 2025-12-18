import { Box, Typography, Container, styled, Button } from '@mui/material';
import Head from 'next/head';
import TopNavigationLayout from 'src/layouts/TopNavigationLayout';
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
    flex-direction: column;
  width: 100%;
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing(6)};
`
);

function Status500() {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>Status - 500</title>
      </Head>
      <MainContent>
        <TopWrapper>
          <Container maxWidth="md">
            <Box textAlign="center" sx={{ my: 15 }}>
              <Typography variant="h1" sx={{ my: 2 }}>
                {t('500.text1')}
              </Typography>
              <Typography
                variant="body1"
                sx={{ my: 2, fontSize: '1rem' }}
                dangerouslySetInnerHTML={{
                  __html: t('500.text2')
                }}
              />
              <Button
                variant="contained"
                color="primary"
                href="/"
                sx={{ display: { xs: 'none', sm: 'inline-flex' } }}
              >
                {t('500.button-back')}
              </Button>
            </Box>
          </Container>
        </TopWrapper>
      </MainContent>
    </>
  );
}

Status500.getLayout = (page: any) => (
  <Authenticated>
    <TopNavigationLayout>{page}</TopNavigationLayout>
  </Authenticated>
);

export default Status500;
