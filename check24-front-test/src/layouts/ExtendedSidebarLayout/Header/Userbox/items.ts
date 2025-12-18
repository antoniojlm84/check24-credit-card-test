export interface MenuItem {
  link?: string;
  name: string;
  roles?: any;
}

export interface MenuItems {
  items: MenuItem[];
  heading: string;
  roles?: any;
}

const userBoxItems: MenuItems[] = [
  {
    heading: 'Profile',
    roles: false,
    items: [
      {
        name: 'userbox.my-account',
        link: '/management/profile',
        roles: false
      }
    ]
  },
  {
    heading: 'Admin',
    roles: '["ADMIN"]',
    items: [
      {
        name: 'userbox.admin',
        link: '/admin',
        roles: '["ADMIN"]'
      }
    ]
  }
];

export default userBoxItems;
