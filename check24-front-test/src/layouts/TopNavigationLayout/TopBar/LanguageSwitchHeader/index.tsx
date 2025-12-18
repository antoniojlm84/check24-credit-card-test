import { useRef, useState } from 'react';

import {
  IconButton,
  Box,
  List,
  ListItemButton,
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
    font-family: inherit;
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
    display: flex;
    align-items: center;
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
  const theme = useTheme();

  const ref = useRef(null);
  const [isOpen, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
          {lang === 'es' && <Flags.ES title="Español" className="flag-icon" />}
          {lang === 'en' && <Flags.US title="English" className="flag-icon" />}
          {lang === 'en-US' && (
            <Flags.US title="English" className="flag-icon" />
          )}
          {lang === 'en-GB' && (
            <Flags.US title="English" className="flag-icon" />
          )}
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
        sx={{ zIndex: 2000 }}
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
            <ListItemButton
              className={lang === 'en' || lang === 'en-US' ? 'active' : ''}
              onClick={() => {
                handleClose();
              }}
            >
              <LanguageSwitcher lang="en">
                <Box
                  display={'flex'}
                  sx={{ flexDirection: 'row', alignItems: 'center' }}
                >
                  <ImageWrapper>
                    <Flags.US title="English" />
                  </ImageWrapper>
                  English
                </Box>
              </LanguageSwitcher>
            </ListItemButton>
            <ListItemButton
              className={lang === 'es' ? 'active' : ''}
              onClick={() => {
                handleClose();
              }}
            >
              <LanguageSwitcher lang="es">
                <Box
                  display={'flex'}
                  sx={{ flexDirection: 'row', alignItems: 'center' }}
                >
                  <ImageWrapper>
                    <Flags.ES title="Español" />
                  </ImageWrapper>
                  Español
                </Box>
              </LanguageSwitcher>
            </ListItemButton>
          </List>
        </Box>
      </Popover>
    </>
  );
}

export default LanguageSwitch;
