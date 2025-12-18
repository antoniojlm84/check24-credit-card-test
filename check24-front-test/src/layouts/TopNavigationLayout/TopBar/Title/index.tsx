import { useEffect, useState } from 'react';
import { Box, Button, Typography, useTheme, styled } from '@mui/material';
import { useTranslation } from 'next-export-i18n';
import { useRouter } from 'next/router';
import titleItems, { TitleItem } from './items';

const BoxWrapper = styled(Box)(
  ({}) => `
    max-width: 1150px;
    min-height: 385px;
    align-items: flex-end;
    display: block;
    margin-right: auto;
    margin-left: auto;
    position: relative;
    padding-top: 200px;
`
);

const TypographyWrapper = styled(Typography)(
  ({ theme }) => `
    position: relative;
    width: 100%;
    flex-wrap: wrap;
    align-content: flex-start;
    margin: auto;
    font-size: 58px;
    font-weight: 900;
    line-height: 62px;
    top: 0px;
    left: 0px;
    
    .red {
      color: ${theme.colors.primaryAlt.main} !important;
    }
`
);

const TypographySubtitleWrapper = styled(Typography)(
  ({ theme }) => `
    color: ${theme.colors.alpha.white[100]} !important;
    font-family: "Rubik", Sans-serif;
    font-size: 22px;
    font-weight: 300;
    line-height: 30px;
  `
);

const ButtonWrapper = styled(Button)(
  ({ theme }) => `
    width: auto;
    background-color: ${theme.colors.primaryAlt.main} !important;
    color: ${theme.colors.alpha.white[100]};

    :hover{
      background-color: ${theme.colors.alpha.white[100]} !important;
      color: ${theme.colors.primaryAlt.main};
    }
    margin-bottom: ${theme.spacing(0, 0, 3, 0)};
    font-size: ${theme.typography.pxToRem(18)};
  `
);

function TitlePage({ button = false }) {
  const { t } = useTranslation();
  const theme = useTheme();
  const router = useRouter();
  const [title, setTitle] = useState<any>({});

  const handleTitle = () => {
    if (router.isReady) {
      setTitle(getTitle());
    }
  };

  const getTitle = () => {
    const title: any = titleItems.items.filter((section: TitleItem) => {
      return section.path == router.pathname;
    });

    return title[0]?.title
      ? title[0]
      : { title: 'calculator.title', show: true };
  };

  useEffect(handleTitle, [router.isReady, router.asPath]);

  return (
    title.show && (
      <Box mx={0}>
        <BoxWrapper>
          <TypographyWrapper
            variant="h1"
            sx={{
              py: 2,
              color: `${theme.colors.alpha.white[100]}`,
              px: { xs: 3, lg: 0 },
              fontSize: {
                xs: theme.typography.pxToRem(33),
                md: theme.typography.pxToRem(58)
              }
            }}
            dangerouslySetInnerHTML={{ __html: t(title.title) }}
          />
          {title.subtitle && (
            <TypographySubtitleWrapper
              variant="h2"
              sx={{
                py: 2,
                color: `${theme.colors.alpha.white[100]}`,
                px: { xs: 3, lg: 0 },
                fontSize: {
                  xs: theme.typography.pxToRem(16),
                  md: theme.typography.pxToRem(22)
                }
              }}
              dangerouslySetInnerHTML={{ __html: t(title.subtitle) }}
            />
          )}
          {button && (
            <ButtonWrapper
              sx={{ mt: { xs: 2, sm: 0 }, mb: 5, ml: { xs: 2, sm: 3, md: 0 } }}
              href={'/form'}
              variant="contained"
            >
              {t('footer.calculator')}
            </ButtonWrapper>
          )}
        </BoxWrapper>
      </Box>
    )
  );
}

export default TitlePage;
