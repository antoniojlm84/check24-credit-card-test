import { useTranslation } from 'next-export-i18n';

import { Grid, Typography } from '@mui/material';

function PageHeader() {
  const { t } = useTranslation();

  return (
    <>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h3" component="h3" gutterBottom>
            {t('buttons.compare_credit_cards')}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
}

export default PageHeader;
