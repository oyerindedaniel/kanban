import { ReactNode } from 'react';
import { BiBookAlt } from 'react-icons/bi';
import { type IconType } from 'react-icons/lib';
import { SideBarSvg, ActiveSidebarIcon } from '@/assets';

export type SideBarLink = {
  icon: unknown;
  name: string;
  url: string;
};

export type SideBarLinks = SideBarLink[];

export const LINKS: SideBarLinks = [
  {
    name: 'Platform Launch',
    url: '/platform-launch',
    icon: SideBarSvg
  }
];