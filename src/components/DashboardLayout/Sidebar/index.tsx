/* eslint-disable @typescript-eslint/ban-ts-comment */

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FC, useState } from 'react';
import { BiBookAlt } from 'react-icons/bi';
import { LINKS, LINK_ICON_STYLE } from './constants';
import { cn } from '@/lib/utils';
import KanbanLogo from 'src/assets/KanbanLogo.svg';
import Image from 'next/image';
import { Switch } from '@/components/ui/switch';
import { HideIcon, MoonIcon, SunIcon } from '@/assets';

interface SidebarProps {
  isSidebarOpen?: boolean;
  isSidebarHidden: boolean;
  toggleSidebar: () => void;
}

const Sidebar: FC<SidebarProps> = ({ isSidebarOpen = true, isSidebarHidden, toggleSidebar }) => {
  const pathname = usePathname();
  const DASHBOARD_ROUTE = '/';
  const [isSideBarHidden, setIsSideBarHidden] = useState(true);

  const checkIfLinkIsActive = (link: string) => {
    // @ts-ignore
    console.log(pathname);
    return pathname === link;
  };

  return (
    <div
      className={cn(
        'flex h-full w-full -translate-x-full flex-col overflow-hidden bg-white p-0 text-sm transition-all duration-100 ease-in-out',
        isSidebarOpen && 'translate-x-0',
        isSidebarHidden && 'hidden'
      )}
    >
      <div className="mt-8 pl-8">
        <Image src={KanbanLogo} alt="img" />
      </div>

      <div className="mt-[30px] flex h-full flex-col justify-between overflow-y-auto pr-4">
        <div>
          {LINKS.map((link, Idx) => {
            const SideBarIcon = link?.icon;
            return (
              <Link href={link.url} key={link.name}>
                <div
                  className={cn(
                    'duration-350 mb-0 flex cursor-pointer items-center justify-start gap-2 px-4 py-3 transition-all ease-in-out hover:bg-gray-200 hover:text-black md:justify-center xl:justify-start  rounded-r-[100px] rounded-b-[100px]xl:px-4 xl:py-2',
                    checkIfLinkIsActive(link.url) && 'bg-brand-iris text-white',
                    Idx !== LINKS.length - 1 && 'mb-3'
                  )}
                >
                  <Image src={SideBarIcon} alt="img"></Image>

                  <span className="block font-medium capitalize py-4">{link.name}</span>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="flex flex-col justify-around mb-12">
          <div className=" mx-6 mb-7 py-3 flex items-center justify-center bg-brand-zircon">
            <span>
              <Image src={SunIcon} alt="img"></Image>
            </span>
            <Switch className="mx-6" />
            <span>
              <Image src={MoonIcon} alt="img"></Image>
            </span>
          </div>
          <div className=" ml-6  flex items-center ">
            <span className="mr-2" onClick={toggleSidebar} style={{ cursor: 'pointer' }}>
              <Image src={HideIcon} alt="img"></Image>
            </span>
            <p>Hide Sidebar</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
