import { useRef, useState, useEffect } from 'react';

import {
  IconButton,
  Box,
  List,
  Typography,
  Popover,
  Tooltip,
  styled,
  ListItemButton
} from '@mui/material';

import { useSelectedLanguage, LanguageSwitcher } from 'next-export-i18n';
import { useTranslation } from 'next-export-i18n';
import { useRefMounted } from 'src/hooks/useRefMounted';
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

const FlagContainer = styled('div')(
  ({}) => `
  display: inline-block;
  padding: 1px;
  border: 1px solid;
  border-radius: 100%;
  background-color: white;
  height: 42px;
`
);

const StyledFlag = styled('div')(
  () => `
  border-radius: 100%;
  width: 40px;
  height: 38px;
  overflow: hidden;
`
);

function LanguageSwitch() {
  const { t } = useTranslation();
  const { lang } = useSelectedLanguage();
  const ref = useRef<any>(null);
  const [isOpen, setOpen] = useState<boolean>(false);
  const isMountedRef = useRefMounted();
  const [isLoading, setIsLoading] = useState(true);

  const Flag = ({ countryCode, title }) => {
    const FlagComponent = Flags[countryCode];

    if (!FlagComponent) {
      return <div>Invalid country code</div>;
    }

    return (
      <FlagContainer>
        <StyledFlag as={FlagComponent} title={title} />
      </FlagContainer>
    );
  };

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  useEffect(() => {
    setIsLoading(false);
  }, [isMountedRef()]);

  return (
    !isLoading && (
      <>
        <Tooltip arrow title={t('ui.languageSwitcher')}>
          <IconButton color="secondary" ref={ref} onClick={handleOpen}>
            {lang === 'es' && <Flag countryCode="ES" title={t('ui.spanish')} />}
            {lang === 'en' && <Flag countryCode="US" title={t('ui.english')} />}
            {lang === 'en-US' && (
              <Flag countryCode="US" title={t('ui.english')} />
            )}
            {lang === 'en-GB' && (
              <Flag countryCode="US" title={t('ui.english')} />
            )}
          </IconButton>
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
            vertical: 'bottom',
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
                      <Flags.US title={t('ui.english')} />
                    </ImageWrapper>
                    {t('ui.english')}
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
                      <Flags.ES title={t('ui.spanish')} />
                    </ImageWrapper>
                    {t('ui.spanish')}
                  </Box>
                </LanguageSwitcher>
              </ListItemButton>
            </List>
          </Box>
        </Popover>
      </>
    )
  );
}

export default LanguageSwitch;
