import { externalURLsConfig } from 'config';
export interface MenuItem {
  link?: string;
  icon?: any;
  badge?: string;
  badgeTooltip?: string;
  css?: boolean;
  items?: MenuItem[];
  name: string;
}

export interface MenuItems {
  items: MenuItem[];
  heading: string;
}

const menuItems: MenuItems[] = [
  {
    heading: '',
    items: [
      {
        name: 'sidebar_menu.menu.aerothermal.title',
        link: 'https://gonido.com/'
      },
      {
        name: 'sidebar_menu.menu.faqs.title',
        link: 'https://gonido.com/faqs-nido/'
      },
      {
        name: 'sidebar_menu.menu.installers.title',
        link: externalURLsConfig.ares
      },
      {
        name: 'sidebar_menu.menu.calculator.title',
        link: '/form',
        css: true
      },
      {
        name: 'sidebar_menu.menu.company_access.title',
        link: externalURLsConfig.artemisa
      }
    ]
  }
];
export default menuItems;
