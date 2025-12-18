import { Typography, Box, styled, useTheme } from '@mui/material';
import { useTranslation } from 'next-export-i18n';
import Shared from 'src/components/Nido/SocialMedia/Shared';

const TitleWrapper = styled(Box)(
  ({ theme }) => `
      width: 100%;
      min-height: 45px;
      color: ${theme.colors.primary.main} !important;
      background: #faebec;
      display: flex;
      align-items: center;
      text-align: center;
      padding: 30px 10px 30px 10px;
`
);

const TitleH3Wrapper = styled(Typography)(
  ({ theme }) => `
    font-size: 38px;
    margin: auto;
    max-width: 55%;
    @media (max-width: 768px) {
      font-size: 28px;
      max-width: 100%;
    }

    .color-word {
      color: ${theme.colors.primaryAlt.main} !important;
    }
`
);

interface NidoAppProps {
  title?: string;
  showShared?: boolean | null;
}

function PageHeader(props: NidoAppProps) {
  const { t } = useTranslation();
  const theme = useTheme();

  const { title, showShared } = props;

  return (
    <Box>
      {/* <Box display="flex" alignItems="center">
        <Box>
          <Typography variant="subtitle2">
            
            {t('dashboard.title')}
          </Typography>
        </Box>
      </Box> */}
      <TitleWrapper>
        <TitleH3Wrapper variant="h3" color={theme.colors.primary.main}>
          <span dangerouslySetInnerHTML={{ __html: t(title) }}></span>
          {showShared && <Shared />}
        </TitleH3Wrapper>
      </TitleWrapper>

      <Box mt={{ xs: 3, md: 0 }}></Box>
    </Box>
  );
}

export default PageHeader;
