import { useRef, useState } from 'react';
//import { useAuth } from 'src/hooks/useAuth';
//import { Security } from 'src/services/security/security';
//import userBoxItems from 'src/layouts/ExtendedSidebarLayout/Header/Userbox/items';

import {
  //Avatar,
  Box,
  Button,
  Divider,
  MenuList,
  alpha,
  IconButton,
  // MenuItem,
  // ListItemText,
  Popover,
  //Typography,
  styled
} from '@mui/material';
import { useTranslation } from 'next-export-i18n';
import LockOpenTwoToneIcon from '@mui/icons-material/LockOpenTwoTone';
// import NextLink from 'next/link';
// import { useRouter } from 'next/router';

const UserBoxButton = styled(IconButton)(
  ({ theme }) => `
  width: ${theme.spacing(4)};
  padding: 0;
  height: ${theme.spacing(4)};
  margin-left: ${theme.spacing(1)};
  border-radius: ${theme.general.borderRadiusLg};
  
  &:hover {
    background: ${theme.colors.primary.main};
  }
`
);

// const UserAvatar = styled(Avatar)(
//   ({ theme }) => `
//         height: 90%;
//         width: 90%;
//         border-radius: ${theme.general.borderRadiusLg};
// `
// );

const MenuListWrapperPrimary = styled(MenuList)(
  ({ theme }) => `
  padding: ${theme.spacing(2)};

  & .MuiMenuItem-root {
      border-radius: 50px;
      padding: ${theme.spacing(1, 1, 1, 2.5)};
      min-width: 200px;
      margin-bottom: 2px;
      position: relative;
      color: ${theme.colors.alpha.black[100]};

      &.Mui-selected,
      &:hover,
      &.MuiButtonBase-root:active {
          background: ${theme.colors.primary.lighter};
          color: ${theme.colors.primary.main};
      }

      &:last-child {
          margin-bottom: 0;
      }
    }
`
);

const MenuUserBox = styled(Box)(
  ({ theme }) => `
        background: ${alpha(theme.colors.alpha.black[100], 0.08)};
        padding: ${theme.spacing(2)};
`
);

// const UserBoxText = styled(Box)(
//   ({ theme }) => `
//         text-align: left;
//         padding-left: ${theme.spacing(1)};
// `
// );

// const UserBoxLabel = styled(Typography)(
//   ({ theme }) => `
//         font-weight: ${theme.typography.fontWeightBold};
//         color: ${theme.palette.secondary.main};
//         display: block;
// `
// );

// const UserBoxDescription = styled(Typography)(
//   ({ theme }) => `
//         color: ${theme.palette.secondary.light}
// `
// );

function HeaderUserbox() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const [isOpen, setOpen] = useState(false);
  //const { isUserAllowed } = Security();
  //const { logout, user} = useAuth();
  //const router = useRouter();

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  const handleLogout = async (): Promise<void> => {
    try {
      // await logout().then(function () {
      //   router.push('/');
      // });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <UserBoxButton color="primary" ref={ref} onClick={handleOpen}>
        {/* <UserAvatar alt={user?.name} src={user?.picture} /> */}
      </UserBoxButton>
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
        <MenuUserBox
          sx={{
            minWidth: 210
          }}
          display="flex"
        >
          {/* <Avatar variant="rounded" alt={user?.name} src={user?.picture} />
          <UserBoxText>
            <UserBoxLabel variant="body1">{user?.name}</UserBoxLabel>
            <UserBoxDescription variant="body2">
              {user?.email}
            </UserBoxDescription>
          </UserBoxText> */}
        </MenuUserBox>
        <Divider
          sx={{
            mb: 0
          }}
        />
        <MenuListWrapperPrimary disablePadding>
          {/* {userBoxItems[0].items.map((item, index) => {
            if (user && isUserAllowed(item.roles, user)) 
            {
              return <MenuItem key={index}>
                <NextLink
                  href={{ pathname: item.link }}
                  passHref
                >
                  <ListItemText
                      onClick={handleClose}
                      primaryTypographyProps={{ variant: 'h5' }}
                      primary={t(item.name)}
                    />
                </NextLink>
              </MenuItem>
            }
          })} */}
        </MenuListWrapperPrimary>
        <Divider />
        <Box m={1}>
          <Button color="primary" fullWidth onClick={handleLogout}>
            <LockOpenTwoToneIcon
              sx={{
                mr: 1
              }}
            />
            {t('logout.sign-out')}
          </Button>
        </Box>
      </Popover>
    </>
  );
}

export default HeaderUserbox;
