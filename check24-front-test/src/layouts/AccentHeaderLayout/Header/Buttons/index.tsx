import { Box } from '@mui/material';
import HeaderNotifications from './Notifications';
import LanguageSwitch from './LanguageSwitch';

function HeaderButtons() {
  return (
    <Box
      sx={{
        mr: 1
      }}
    >
      <HeaderNotifications />
      <LanguageSwitch />
    </Box>
  );
}

export default HeaderButtons;
