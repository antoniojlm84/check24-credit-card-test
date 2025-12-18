// import { externalURLsConfig } from 'config';
export interface MenuItem {
  link?: string;
  icon?: any;
  badge?: string;
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
        name: 'sidebar_menu.menu.calculator.title',
        link: '/form',
        css: true
      }
    ]
  }
];

export default menuItems;
