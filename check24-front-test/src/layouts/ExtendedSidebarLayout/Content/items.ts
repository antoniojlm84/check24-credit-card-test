export interface MenuItem {
  link?: string;
  roles?: string;
  name?: string;
}

export interface MenuItems {
  items: MenuItem[];
  heading: string;
  roles?: string;
}

const contentItems: MenuItems[] = [
  {
    heading: 'Calculator',
    items: [
      {
        link: '/calculator/edit',
        roles: '["ADMIN","CALCULATOR_UPDATE"]'
      },
      {
        link: '/calculator/new',
        roles: '["ADMIN","CALCULATOR_CREATE"]'
      },
      {
        link: '/calculator/show',
        roles: '["ADMIN","CALCULATOR_SHOW"]'
      }
    ]
  }
];

export default contentItems;
