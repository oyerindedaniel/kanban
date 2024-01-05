/* eslint-disable @typescript-eslint/ban-ts-comment */

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { type FC, useState } from 'react';
import { BiBookAlt } from 'react-icons/bi';
import { LINKS, LINK_ICON_STYLE } from './constants';
import { cn } from '@/lib/utils';
import KanbanLogo from 'src/assets/KanbanLogo.svg';
import Image from 'next/image';
import { HideIcon, MoonIcon, SunIcon } from '@/assets';
import { Button } from '@/components/ui/button';
import ModeToggler from './ModeToggler';

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
    return pathname === link;
  };

  return (
    <div
      className={cn(
        'flex h-full w-full bg-white dark:bg-brand-ebony-clay text-white dark:text-black -translate-x-full flex-col overflow-hidden p-0 text-sm transition-all duration-100 ease-in-out',
        isSidebarOpen && 'translate-x-0',
        isSidebarHidden && 'hidden'
      )}
    >
      {/* <div className="mt-8 pl-8">
        <Image src={KanbanLogo} alt="img" />
      </div> */}

      <div className="mt-[30px] flex h-full flex-col justify-between overflow-y-auto">
        <div>
          {LINKS.map((link, Idx) => {
            const SideBarIcon = link?.icon;
            return (
              <Link href={link.url} key={link.name}>
                <div
                  className={cn(
                    'duration-150 mb-0 flex cursor-pointer items-center justify-start gap-2 px-4 py-3 transition-all ease-in-out hover:bg-gray-200 hover:text-black md:justify-center xl:justify-start  rounded-r-[100px] text-[15px] font-bold text-brand-regent-grey rounded-b-[100px]xl:px-4 xl:py-2',
                    checkIfLinkIsActive(link.url) && 'bg-brand-iris text-white',
                    Idx !== LINKS.length - 1 && 'mb-3'
                  )}
                >
                  <Image src={SideBarIcon} alt="img" />
                  <span className="block font-medium capitalize py-4">{link.name}</span>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="flex flex-col justify-around mb-12 px-4">
          <ModeToggler />
          <Button
            type="button"
            onClick={toggleSidebar}
            size="lg"
            variant="unstyled"
            className="rounded-full flex gap-3 items-center"
          >
            <Image src={HideIcon} width={20} height={20} alt="img" />
            <span className="text-brand-regent-grey">Hide Sidebar</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
