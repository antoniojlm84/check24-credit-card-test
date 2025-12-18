import { useRef, useState } from 'react';
import { useTranslation } from 'next-export-i18n';
import {
  Box,
  Button,
  useTheme,
  Typography,
  MenuList,
  Divider,
  MenuItem,
  ListItemText,
  Popover,
  Stack,
  styled
} from '@mui/material';
import {
  KeyboardArrowDownTwoTone,
  ChevronRightTwoTone
} from '@mui/icons-material';
import Link from 'src/components/Link';

const MenuListWrapper = styled(MenuList)(
  ({ theme }) => `
  padding: ${theme.spacing(3)};

  & .MuiMenuItem-root {
      border-radius: 50px;
      padding: ${theme.spacing(1, 1, 1, 2.5)};
      min-width: 200px;
      margin-bottom: 2px;
      position: relative;
      color: ${theme.colors.alpha.black[70]};

      &.Mui-selected,
      &:hover,
      &.MuiButtonBase-root:active {
          background: ${theme.colors.alpha.black[10]};
          color: ${theme.colors.alpha.black[100]};
      }

      &:last-child {
          margin-bottom: 0;
      }
    }
`
);

function HeaderMenu() {
  const { t } = useTranslation();
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
      <Box>
        <Button
          ref={ref}
          onClick={handleOpen}
          endIcon={<KeyboardArrowDownTwoTone />}
          color="primary"
          size="small"
          sx={{
            mr: 1,
            px: 2,
            background: `${theme.colors.warning.main}`,
            color: `${theme.colors.alpha.white[100]}`,

            '&:hover': {
              backgroundColor: `${theme.colors.warning.dark}`,
              color: `${theme.colors.alpha.white[100]}`,

              '.MuiSvgIcon-root': {
                color: `${theme.colors.alpha.white[100]}`
              }
            }
          }}
        >
          {t('admin.menu.title')}
        </Button>
      </Box>
      <Popover
        disableScrollLock
        anchorEl={ref.current}
        onClose={handleClose}
        open={isOpen}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
      >
        <Box
          sx={{
            p: 3,
            background: `${theme.colors.warning.main}`,
            color: `${theme.colors.alpha.white[100]}`
          }}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box>
            <Typography sx={{ pb: 1 }} variant="h4">
              {t('admin.menu.title')}
            </Typography>
            <Typography noWrap variant="body1">
              {t('admin.menu.subtitle')}
            </Typography>
          </Box>
        </Box>
        <Divider />
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          divider={<Divider orientation="vertical" flexItem />}
          justifyContent="stretch"
          alignItems="stretch"
          spacing={0}
        >
          <MenuListWrapper disablePadding>
            <MenuItem
              component={Link}
              href="/admin/user/list"
              onClick={handleClose}
            >
              <ListItemText
                primary={t('user.list.title')}
                primaryTypographyProps={{ variant: 'h5' }}
              />
              <ChevronRightTwoTone
                sx={{
                  color: `${theme.colors.alpha.black[30]}`,
                  opacity: 0.8
                }}
              />
            </MenuItem>
            <MenuItem
              component={Link}
              href="/admin/role/list"
              onClick={handleClose}
            >
              <ListItemText
                primary={t('role.list.title')}
                primaryTypographyProps={{ variant: 'h5' }}
              />
              <Box display="flex" alignItems="center">
                <ChevronRightTwoTone
                  sx={{
                    ml: 1,
                    color: `${theme.colors.alpha.black[30]}`,
                    opacity: 0.8
                  }}
                />
              </Box>
            </MenuItem>
          </MenuListWrapper>
          <MenuListWrapper disablePadding>
            {/* <MenuItem
              component={Link}
              href="/admin/bank/list"
              onClick={handleClose}
            >
              <ListItemText
                primary={t('bank.list.title')}
                primaryTypographyProps={{ variant: 'h5' }}
              />
              <ChevronRightTwoTone
                sx={{
                  color: `${theme.colors.alpha.black[30]}`,
                  opacity: 0.8
                }}
              />
            </MenuItem>
            <MenuItem
              component={Link}
              href="/admin/managing-organization/list"
              onClick={handleClose}
            >
              <ListItemText
                primary={t('managing_organization.list.title')}
                primaryTypographyProps={{ variant: 'h5' }}
              />
              <ChevronRightTwoTone
                sx={{
                  color: `${theme.colors.alpha.black[30]}`,
                  opacity: 0.8
                }}
              />
            </MenuItem>
            <MenuItem
              component={Link}
              href="/admin/direct-investment/list"
              onClick={handleClose}
            >
              <ListItemText
                primary={t('direct_investment.list.title')}
                primaryTypographyProps={{ variant: 'h5' }}
              />
              <ChevronRightTwoTone
                sx={{
                  color: `${theme.colors.alpha.black[30]}`,
                  opacity: 0.8
                }}
              />
            </MenuItem> */}
          </MenuListWrapper>
        </Stack>
        <Divider />
        <Box sx={{ m: 2, textAlign: 'center' }}>
          <Button color="primary" href="/admin">
            {t('buttons.view_all')}
          </Button>
        </Box>
      </Popover>
    </>
  );
}

export default HeaderMenu;
