import { useContext } from 'react';
import Scrollbar from 'src/components/Scrollbar';
import { SidebarContext } from 'src/contexts/SidebarContext';
import versionArray from 'version.json';
import Label from 'src/components/Label';
import { useAuth } from 'src/hooks/useAuth';

import {
  Box,
  Drawer,
  alpha,
  styled,
  Divider,
  useTheme,
  lighten,
  darken,
  Card,
  Typography,
  Grid
} from '@mui/material';

import SidebarMenu from './SidebarMenu';
import Logo from 'src/components/LogoWhite';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

const SidebarWrapper = styled(Box)(
  ({ theme }) => `
        width: ${theme.sidebar.width};
        min-width: ${theme.sidebar.width};
        color: ${theme.colors.alpha.trueWhite[70]};
        position: relative;
        z-index: 7;
        height: 100%;
        padding-bottom: 61px;
`
);

const VersionWrapper = styled(Box)(
  ({ theme }) => `
        width: ${theme.sidebar.width};
        position: relative;
        text-align:center;
        padding: 0px;
        margin-bottom: 0px;
        bottom: -8px;
`
);

const CardBorderTop = styled(Card)(
  () => `
        border-top: transparent 5px solid;
        border-radius: 0px;
  `
);

const AdminPanelSettingsIconWrapper = styled(AdminPanelSettingsIcon)(
  ({ theme }) => `
    color: ${theme.colors.warning.main};
`
);

function Sidebar() {
  const { sidebarToggle, toggleSidebar } = useContext(SidebarContext);
  const closeSidebar = () => toggleSidebar();
  const theme = useTheme();
  const version = versionArray[0];
  const color = 'develop' == version ? 'success' : 'warning';
  const themeColor =
    'develop' == version
      ? `${theme.colors.success.main}`
      : `${theme.colors.warning.main}`;
  const { user } = useAuth();

  return (
    <>
      <SidebarWrapper
        sx={{
          display: {
            xs: 'none',
            lg: 'inline-block'
          },
          position: 'fixed',
          left: 0,
          top: 0,
          background:
            theme.palette.mode === 'dark'
              ? alpha(lighten(theme.header.background, 0.1), 0.5)
              : alpha(theme.colors.primary.main, 1),
          boxShadow:
            theme.palette.mode === 'dark' ? theme.sidebar.boxShadow : 'none'
        }}
      >
        <Scrollbar>
          <Box mt={3}>
            <Box
              mx={2}
              sx={{
                width: 52
              }}
            >
              <Logo />
            </Box>
          </Box>
          <Divider
            sx={{
              my: theme.spacing(3),
              mx: theme.spacing(2),
              background: theme.colors.alpha.trueWhite[10]
            }}
          />
          <SidebarMenu />
        </Scrollbar>
        <VersionWrapper>
          {'develop' == version || -1 !== version.indexOf('pre') ? (
            <CardBorderTop
              sx={{
                textAlign: 'center',
                borderTopColor: themeColor
              }}
            >
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                p={1.16}
                sx={{
                  background: `${theme.colors.alpha.black[5]}`
                }}
              >
                <Box display="flex" alignItems="center">
                  <Typography
                    sx={{
                      display: 'flex',
                      mr: 1.5,
                      alignItems: 'center'
                    }}
                    variant="subtitle1"
                  >
                    Enviroment
                  </Typography>
                  <Label color={color}>{version}</Label>
                </Box>
              </Box>
            </CardBorderTop>
          ) : (
            <Box
              alignItems="center"
              sx={{
                background: user?.isAdmin ? `red` : 'transparent'
              }}
            >
              <Grid
                container
                spacing={0}
                columns={16}
                sx={{ alignItems: 'left', padding: '5px 0 0 0' }}
              >
                {user?.isAdmin && (
                  <Grid
                    item
                    xs={4}
                    sx={{ textAlign: 'left', paddingLeft: '10px' }}
                  >
                    <AdminPanelSettingsIconWrapper />
                  </Grid>
                )}
                <Grid
                  item
                  xs={12}
                  sx={{
                    textAlign: user?.isAdmin ? 'left' : 'center',
                    paddingTop: '1px'
                  }}
                >
                  {version}
                </Grid>
              </Grid>
            </Box>
          )}
        </VersionWrapper>
      </SidebarWrapper>
      <Drawer
        sx={{
          boxShadow: `${theme.sidebar.boxShadow}`
        }}
        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
        open={sidebarToggle}
        onClose={closeSidebar}
        variant="temporary"
        elevation={9}
      >
        <SidebarWrapper
          sx={{
            background:
              theme.palette.mode === 'dark'
                ? theme.colors.alpha.white[100]
                : darken(theme.colors.alpha.black[100], 0.5)
          }}
        >
          <Scrollbar>
            <Box mt={3}>
              <Box
                mx={2}
                sx={{
                  width: 52
                }}
              >
                <Logo />
              </Box>
            </Box>
            <Divider
              sx={{
                my: theme.spacing(3),
                mx: theme.spacing(2),
                background: theme.colors.alpha.trueWhite[10]
              }}
            />
            <Divider
              sx={{
                my: theme.spacing(3),
                mx: theme.spacing(2),
                background: theme.colors.alpha.trueWhite[10]
              }}
            />
            <SidebarMenu />
          </Scrollbar>
        </SidebarWrapper>
      </Drawer>
    </>
  );
}

export default Sidebar;
