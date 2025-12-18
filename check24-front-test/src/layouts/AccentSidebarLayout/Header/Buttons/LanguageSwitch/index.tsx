import { useRef, useState } from 'react';

import {
  IconButton,
  Box,
  List,
  ListItem,
  Divider,
  Typography,
  ListItemText,
  Popover,
  Tooltip,
  styled
} from '@mui/material';
import Text from 'src/components/Text';

import WarningTwoToneIcon from '@mui/icons-material/WarningTwoTone';
import { useSelectedLanguage, LanguageSwitcher } from 'next-export-i18n';
import { useTranslation } from 'next-export-i18n';

import { DE } from 'country-flag-icons/react/3x2';
import { US } from 'country-flag-icons/react/3x2';
import { ES } from 'country-flag-icons/react/3x2';
import { FR } from 'country-flag-icons/react/3x2';
import { CN } from 'country-flag-icons/react/3x2';
import { AE } from 'country-flag-icons/react/3x2';

const SectionHeading = styled(Typography)(
  ({ theme }) => `
        font-weight: ${theme.typography.fontWeightBold};
        color: ${theme.palette.secondary.main};
        display: block;
        padding: ${theme.spacing(2, 2, 0)};
`
);

const IconButtonWrapper = styled(IconButton)(
  ({ theme }) => `
        width: ${theme.spacing(7)};
        height: ${theme.spacing(7)};

        svg {
          width: 30px;
        }
`
);

function LanguageSwitcher() {
  const { t } = useTranslation();
  const { lang } = useSelectedLanguage();

  const ref = useRef<any>(null);
  const [isOpen, setOpen] = useState<boolean>(false);

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  return (
    <>
      <Tooltip arrow title={t('Language Switcher')}>
        <IconButtonWrapper color="primary" ref={ref} onClick={handleOpen}>
          {lang === 'de' && <DE title="German" />}
          {lang === 'en' && <US title="English" />}
          {lang === 'en-US' && <US title="English" />}
          {lang === 'en-GB' && <US title="English" />}
          {lang === 'es' && <ES title="Spanish" />}
          {lang === 'fr' && <FR title="French" />}
          {lang === 'cn' && <CN title="Chinese" />}
          {lang === 'ae' && <AE title="Arabic" />}
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
            {t('Language Switcher')}
          </SectionHeading>
          <List
            sx={{
              p: 2,
              svg: {
                width: 26,
                mr: 1
              }
            }}
            component="nav"
          >
            <ListItem
              className={lang === 'en' || lang === 'en-US' ? 'active' : ''}
              button
              onClick={() => {
                handleClose();
              }}
            >
              <US title="English" />
              <ListItemText
                sx={{
                  pl: 1
                }}
                primary="English"
              />
            </ListItem>
            <ListItem
              className={lang === 'de' ? 'active' : ''}
              button
              onClick={() => {
                handleClose();
              }}
            >
              <DE title="German" />
              <ListItemText
                sx={{
                  pl: 1
                }}
                primary="German"
              />
            </ListItem>
            <ListItem
              className={lang === 'es' ? 'active' : ''}
              button
              onClick={() => {
                handleClose();
              }}
            >
              <ES title="Spanish" />
              <ListItemText
                sx={{
                  pl: 1
                }}
                primary="Spanish"
              />
            </ListItem>
            <ListItem
              className={lang === 'fr' ? 'active' : ''}
              button
              onClick={() => {
                handleClose();
              }}
            >
              <FR title="French" />
              <ListItemText
                sx={{
                  pl: 1
                }}
                primary="French"
              />
            </ListItem>
            <ListItem
              className={lang === 'cn' ? 'active' : ''}
              button
              onClick={() => {
                handleClose();
              }}
            >
              <CN title="Chinese" />
              <ListItemText
                sx={{
                  pl: 1
                }}
                primary="Chinese"
              />
            </ListItem>
            <ListItem
              className={lang === 'ae' ? 'active' : ''}
              button
              onClick={() => {
                handleClose();
              }}
            >
              <AE title="Arabic" />
              <ListItemText
                sx={{
                  pl: 1
                }}
                primary="Arabic"
              />
            </ListItem>
          </List>
          <Divider />
          <Text color="warning">
            <Box
              p={2}
              sx={{
                maxWidth: 340
              }}
            >
              <WarningTwoToneIcon fontSize="small" />
              <Typography variant="body1">
                {t(
                  'We only translated a small part of the template, for demonstration purposes'
                )}
                !
              </Typography>
            </Box>
          </Text>
        </Box>
      </Popover>
    </>
  );
}

export default LanguageSwitcher;
