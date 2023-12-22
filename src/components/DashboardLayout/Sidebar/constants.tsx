import { ReactNode } from 'react';
import { BiBookAlt } from 'react-icons/bi';
import { type IconType } from 'react-icons/lib';
import { SideBarIcon } from '@/assets';

export const LINK_ICON_STYLE = { height: '20px', width: '20px' };

export type SideBarLink = {
  icon: string;
  name: string;
  url: string;
};

export type SideBarLinks = SideBarLink[];

export const LINKS: SideBarLinks = [
  {
    name: 'Platform Lunch',
    url: '/platform-lunch',
    icon: SideBarIcon
  }
  // {
  //   name: 'Marketing Plan',
  //   url: '/marketing-plan',
  //   icon: BiBookAlt
  // },
  // {
  //   name: 'Roadmap',
  //   url: '/roadmap',
  //   icon: BiBookAlt
  // },
  // {
  //   name: '+ Create New Board',
  //   url: '/create-new',
  //   icon: BiBookAlt
  // }
];