import { useRef, useState } from 'react';

import {
  IconButton,
  Box,
  List,
  ListItem,
  Typography,
  alpha,
  Popover,
  Tooltip,
  styled,
  useTheme
} from '@mui/material';

import { useSelectedLanguage, LanguageSwitcher } from 'next-export-i18n';
import { useTranslation } from 'next-export-i18n';

/* @ts-ignore */
import Flags from 'country-flag-icons/react/3x2';

const SectionHeading = styled(Typography)(
  ({ theme }) => `
    font-weight: ${theme.typography.fontWeightBold};
    color: ${theme.palette.secondary.main};
    display: block;
    padding: ${theme.spacing(2, 2, 0)};
`
);

const ImageWrapper = styled('svg')(
  () => `
    width: 24px;
    margin-right: 10px;
    height: 32px;
`
);

const IconButtonWrapper = styled(IconButton)(
  ({ theme }) => `
    width: ${theme.spacing(4)};
    height: ${theme.spacing(4)};
    border-radius: ${theme.general.borderRadiusLg};
`
);

function LanguageSwitch() {
  const { t } = useTranslation();
  const { lang } = useSelectedLanguage();
  const { setLanguagePreference } = useLanguage();
  const theme = useTheme();

  const ref = useRef(null);
  const [isOpen, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeLanguage = (language: string) => {
    setLanguagePreference(language);
  };

  return (
    <>
      <Tooltip arrow title={t('ui.languageSwitcher')}>
        <IconButtonWrapper
          color="secondary"
          ref={ref}
          onClick={handleOpen}
          sx={{
            mx: 1,
            background: alpha(theme.colors.error.main, 0.1),
            transition: `${theme.transitions.create(['background'])}`,
            color: theme.colors.error.main,

            '&:hover': {
              background: alpha(theme.colors.error.main, 0.2)
            }
          }}
        >
          {lang === 'es' && <Flags.ES title={t('ui.spanish')} />}
          {lang === 'en' && <Flags.US title={t('ui.english')} />}
          {lang === 'en-US' && <Flags.US title={t('ui.english')} />}
          {lang === 'en-GB' && <Flags.US title={t('ui.english')} />}
        </IconButtonWrapper>
      </Tooltip>
      <Popover
        disableScrollLock
        anchorEl={ref.current}
        onClose={handleClose}
        open={isOpen}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      >
        <Box
          sx={{
            maxWidth: 240
          }}
        >
          <SectionHeading variant="body2" color="text.primary">
            {t('ui.languageSwitcher')}
          </SectionHeading>
          <List
            sx={{
              p: 2
            }}
            component="nav"
          >
            <ListItem
              className={lang === 'en' || lang === 'en-US' ? 'active' : ''}
              button
              onClick={() => {
                handleChangeLanguage('en');
                handleClose();
              }}
            >
              <ImageWrapper>
                <Flags.US title={t('ui.english')} />
              </ImageWrapper>
              <LanguageSwitcher lang="en">{t('ui.english')}</LanguageSwitcher>
            </ListItem>
            <ListItem
              className={lang === 'es' ? 'active' : ''}
              button
              onClick={() => {
                handleChangeLanguage('es');
                handleClose();
              }}
            >
              <ImageWrapper>
                <Flags.ES title={t('ui.spanish')} />
              </ImageWrapper>
              <LanguageSwitcher lang="es">{t('ui.spanish')}</LanguageSwitcher>
            </ListItem>
          </List>
        </Box>
      </Popover>
    </>
  );
}

export default LanguageSwitch;
