import { useEffect } from 'react';
import { Box, List, styled } from '@mui/material';
import { useRouter } from 'next/router';
import NavigationMenuItem from './item';
import menuItems, { MenuItem } from './items';
import { v4 as uuidv4 } from 'uuid';
import { useTranslation } from 'next-export-i18n';

const MenuWrapper = styled(Box)(
  () => `
  .MuiList-root {
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;

    & > .MuiList-root {
      display: flex;
      flex-direction: row;
      width: 100%;
      flex-wrap: wrap;
    }
  }
`
);

const SubMenuWrapper = styled(Box)(
  ({ theme }) => `
    width: 100%;
    .MuiList-root {
      padding: 0;
      display: flex;
      flex-direction: row;
      
      .MuiList-root .MuiList-root .MuiListItem-root .MuiIconButton-root {
        font-weight: normal !important;
      }

      
      a{
        text-decoration: none;
      }

      a:hover {
        color: ${theme.colors.alpha.black[40]} 
      }

      .MuiListItem-root {
        padding: 0 2px;
        justify-content: center;
        width: auto;
    
        .MuiIconButton-root {
          display: flex;
          background-color: transparent;
          border-radius: ${theme.general.borderRadiusLg};
          justify-content: center;
          font-size: ${theme.typography.pxToRem(14)};
          padding: ${theme.spacing(1.4, 2)};
          position: relative;
          font-weight: bold;
          color: ${theme.colors.alpha.trueWhite[100]};

          .name-wrapper {
            transition: ${theme.transitions.create(['color'])};
          }

          .MuiBadge-root {
            position: absolute;
            right: 16px;
            top: 12px;

            .MuiBadge-badge {
              background: ${theme.colors.alpha.white[70]};
              color: ${theme.colors.alpha.black[100]};
              font-size: ${theme.typography.pxToRem(11)};
              font-weight: bold;
              text-transform: uppercase;
            }
          }
  
          .MuiSvgIcon-root {
            transition: ${theme.transitions.create(['color'])};
            font-size: ${theme.typography.pxToRem(24)};
            margin-right: ${theme.spacing(1)};
            color: ${theme.colors.alpha.trueWhite[50]};
          }

          &.Mui-active,
          &:hover {
            background-color: transparent;

            .MuiSvgIcon-root {
              color: ${theme.colors.alpha.trueWhite[100]};
            }
          }
        }
      }
    }
`
);

const renderNavigationMenuItems = (
  {
    items,
    path
  }: {
    items: MenuItem[];
    path: string;
  },
  t: any
): JSX.Element => (
  <SubMenuWrapper>
    <List component="div">
      {items.reduce((ev, item) => reduceChildRoutes({ ev, item, path }, t), [])}
    </List>
  </SubMenuWrapper>
);

const reduceChildRoutes = (
  {
    ev,
    path,
    item
  }: {
    ev: JSX.Element[];
    path: string;
    item: MenuItem;
  },
  t: any
): Array<JSX.Element> => {
  const key = uuidv4();
  const partialMatch = path.includes(item.link);
  const exactMatch = path === item.link;

  if (item.items) {
    ev.push(
      <NavigationMenuItem
        key={key}
        active={partialMatch}
        open={partialMatch}
        name={t(item.name)}
        link={item.link}
        badge={item.badge}
      >
        {renderNavigationMenuItems(
          {
            path,
            items: item.items
          },
          t
        )}
      </NavigationMenuItem>
    );
  } else {
    ev.push(
      <NavigationMenuItem
        key={key}
        active={exactMatch}
        name={t(item.name)}
        link={item.link}
        badge={item.badge}
        css={item.css}
      />
    );
  }

  return ev;
};

function NavigationMenu() {
  const router = useRouter();
  const { t } = useTranslation();
  const handlePathChange = () => {
    if (!router.isReady) {
      return;
    }
  };

  useEffect(handlePathChange, [router.isReady, router.asPath]);

  return (
    <>
      {menuItems.map((section) => (
        <MenuWrapper key={uuidv4()}>
          <List component="div">
            {renderNavigationMenuItems(
              {
                items: section.items,
                path: router.asPath
              },
              t
            )}
          </List>
        </MenuWrapper>
      ))}
    </>
  );
}

export default NavigationMenu;
