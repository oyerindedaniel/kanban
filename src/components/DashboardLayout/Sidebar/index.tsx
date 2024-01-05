/* eslint-disable @typescript-eslint/ban-ts-comment */

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, type FC } from 'react';
import { LINKS } from './constants';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { Switch } from '@/components/ui/switch';
import { ActiveSidebarIcon, HideIcon, MoonIcon, SideBarSvg, SunIcon } from '@/assets';
import { Button } from '@/components/ui/button';
import { useDisclosure } from 'hooks';
import SideBarModal from '@/components/Kanban/Modals/SideBarModal';

interface SidebarProps {
  isSidebarOpen?: boolean;
  isSidebarHidden: boolean;
  toggleSidebar: () => void;
}

const Sidebar: FC<SidebarProps> = ({ isSidebarOpen = true, isSidebarHidden, toggleSidebar }) => {
  const pathname = usePathname();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleAddNewBoard = () => {
    onOpen();
  };

  const checkIfLinkIsActive = (link: string) => {
    // @ts-ignore

    return pathname === link;
  };

  return (
    <div
      className={cn(
        'flex h-full w-full -translate-x-full  flex-col overflow-hidden bg-white p-0 text-sm transition-all duration-100 ease-in-out',
        isSidebarOpen && 'translate-x-0',
        isSidebarHidden && 'hidden'
      )}
    >
      <div className="mt-[30px] flex h-full flex-col justify-between overflow-y-auto pr-4">
        <div>
          {LINKS.map((link, Idx) => {
            const [hovered, setHovered] = useState(false);
            return (
              <Link href={link.url} key={link.name} className="hover:fill-brand-iris">
                <div
                  className={cn(
                    'duration-350 mb-0 flex cursor-pointer items-center justify-start gap-2 px-4 py-3 transition-all ease-in-out hover:bg-brand-zircon hover:text-brand-iris  md:justify-center xl:justify-start  rounded-r-[100px] rounded-b-[100px]xl:px-4 xl:py-2 text-white',
                    checkIfLinkIsActive(link.url) && 'bg-brand-iris text-white',
                    Idx !== LINKS.length - 1 && 'mb-3'
                  )}
                  onMouseEnter={() => setHovered(true)}
                  onMouseLeave={() => setHovered(false)}
                >
                  {/* <Image src={SideBarIcon} alt="img"></Image> */}

                  <SideBarSvg className={hovered ? '' : 'white'} />

                  <span className="block font-medium capitalize py-4">{link.name}</span>
                </div>
              </Link>
            );
          })}

          <Button
            className="duration-350 mb-0 mt-3 flex cursor-pointer items-center justify-start gap-2 px-4 py-3 transition-all ease-in-outmd:justify-center xl:justify-start xl:px-4 xl:py-2 text-brand-iris"
            variant={null}
            onClick={handleAddNewBoard}
          >
            <span>
              <Image src={ActiveSidebarIcon} alt="img"></Image>
            </span>
            + Create New Board
          </Button>
          <SideBarModal isOpen={isOpen} onClose={onClose} />
        </div>

        <div className="flex flex-col justify-around mb-12">
          <div className=" mx-6 mb-7 py-3 flex items-center justify-center bg-brand-zircon rounded-md">
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
            <p className="hover:text-brand-iris hover:cursor-pointer">Hide Sidebar</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
