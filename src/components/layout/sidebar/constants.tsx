import { SideBarSvg } from '@/assets';

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
