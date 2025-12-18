// import type { ReactNode } from 'react';

// import Widgets from '@mui/icons-material/Widgets';
// import Summarize from '@mui/icons-material/Summarize';
import Leaderboard from '@mui/icons-material/Leaderboard';
// import GroupWork from '@mui/icons-material/GroupWork';
// import Groups from '@mui/icons-material/Groups';
// import FamilyRestroom from '@mui/icons-material/FamilyRestroom';
// import Description from '@mui/icons-material/Description';

export interface MenuItem {
  link?: string;
  icon?: any;
  badge?: string;
  badgeTooltip?: string;

  items?: MenuItem[];
  name: string;
  roles?: string;
  prefixLink?: string;
}

export interface MenuItems {
  items: MenuItem[];
  heading: string;
  roles?: string;
}

const menuItems: MenuItems[] = [
  {
    heading: 'sidebar_menu.section_general.title',
    roles: '["USER","ADMIN"]',
    items: [
      {
        name: 'sidebar_menu.section_general.dashboard.title',
        icon: Leaderboard,
        prefixLink: '/dashboards/',
        link: '/dashboard',
        roles: '["ADMIN","USER"]'
        // },
        // {
        //   name: 'sidebar_menu.section_general.persons.title',
        //   icon: Groups,
        //   prefixLink: '/person/',
        //   link: '/person/list',
        //   roles: '["ADMIN","PERSON_ADMIN","PERSON_LIST"]'
        // },
        // {
        //   name: 'sidebar_menu.section_general.contracts.title',
        //   icon: Description,
        //   prefixLink: '/contract/',
        //   link: '/contract/list',
        //   roles: '["ADMIN","CONTRACT_ADMIN","CONTRACT_LIST"]',
        // },
        // {
        //   name: 'sidebar_menu.section_general.products.title',
        //   icon: Widgets,
        //   prefixLink: '/product/',
        //   link: '/product/list',
        //   roles: '["ADMIN","PRODUCT_ADMIN","PRODUCT_LIST"]',
        // },
        // {
        //   name: 'sidebar_menu.section_general.groups.title',
        //   icon: GroupWork,
        //   prefixLink: '/group/',
        //   roles: '["ADMIN","FAMILY_GROUP_ADMIN","FAMILY_GROUP_LIST","REPORTING_GROUP_ADMIN","REPORTING_GROUP_LIST"]',
        //   items: [
        //     {
        //       name: 'sidebar_menu.section_general.groups.items.family_groups',
        //       icon: FamilyRestroom,
        //       prefixLink: '/group/family-group/',
        //       link: '/group/family-group/list',
        //       roles: '["ADMIN","FAMILY_GROUP_ADMIN","FAMILY_GROUP_LIST"]'
        //     },
        //     {
        //       name: 'sidebar_menu.section_general.groups.items.reporting_group',
        //       icon: Summarize,
        //       prefixLink: '/group/reporting-group/',
        //       link: '/group/reporting-group/list',
        //       roles: '["ADMIN","REPORTING_GROUP_ADMIN","REPORTING_GROUP_LIST"]'
        //     }
        //   ]
      }
    ]
  }
];

export default menuItems;
