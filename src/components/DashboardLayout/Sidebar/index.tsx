/* eslint-disable @typescript-eslint/ban-ts-comment */

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { type FC, useState } from 'react';
import { BiBookAlt } from 'react-icons/bi';
import { LINKS } from './constants';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import ModeToggler from './ModeToggler';
import { Switch } from '@/components/ui/switch';
import { ActiveSidebarIcon, HideIcon, MoonIcon, SideBarSvg, SunIcon } from '@/assets';
import { Button } from '@/components/ui/button';
import { useDisclosure } from '@/hooks';
import SideBarModal from '@/components/Kanban/Modals/SideBarModal';

interface SidebarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: FC<SidebarProps> = ({ isSidebarOpen, toggleSidebar }) => {
  const pathname = usePathname();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleAddNewBoard = () => {
    onOpen();
  };

  const checkIfLinkIsActive = (link: string) => {
    return pathname === link;
  };

  return (
    <>
      <SideBarModal isOpen={isOpen} onClose={onClose} />
      <div
        className={cn(
          'flex h-full w-full  flex-col overflow-hidden p-0 text-sm transition-all duration-100 ease-in-out',
          isSidebarOpen ? '' : 'hidden'
        )}
      >
        {/* <div className="mt-8 pl-8">
      <Image src={KanbanLogo} alt="img" />
    </div> */}

        <div className="mt-[30px] flex h-full flex-col justify-between overflow-y-auto">
          <div>
            {LINKS.map((link, Idx) => {
              const [hovered, setHovered] = useState(false);
              return (
                <Link href={link.url} key={link.name} className="hover:fill-brand-iris">
                  <div
                    className={cn(
                      'duration-150 mb-0 flex cursor-pointer items-center justify-start gap-2 px-4 py-3 transition-all ease-in-out hover:bg-gray-200 hover:text-black md:justify-center xl:justify-start  rounded-r-[100px] text-[15px] font-bold text-brand-regent-grey rounded-b-[100px]xl:px-4 xl:py-2',
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
    </>
  );
};

export default Sidebar;
