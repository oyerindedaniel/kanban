/* eslint-disable @typescript-eslint/ban-ts-comment */

'use client';

import { type FC, useMemo, useState, useEffect } from 'react';
import { BiSolidError } from 'react-icons/bi';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BiBookAlt } from 'react-icons/bi';
import { LINKS } from './constants';
import { cn } from '@/lib/utils';
import { api } from '@/trpc/react';
import Image from 'next/image';
import ModeToggler from './ModeToggler';
import { Switch } from '@/components/ui/switch';
import { ActiveSidebarIcon, HideIcon, MoonIcon, SideBarSvg, SunIcon } from '@/assets';
import { Button } from '@/components/ui/button';
import { useDisclosure } from '@/hooks';
import SideBarModal from '@/components/Kanban/Modals/Board';
import { useAppDispatch } from '@/store/hooks';
import { setGlobalState } from '@/store/slice/Global';
import Loading from '@/components/ui/loading';
import { type Board } from '@/types';

interface SidebarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: FC<SidebarProps> = ({ isSidebarOpen, toggleSidebar }) => {
  const pathname = usePathname();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const dispatch = useAppDispatch();

  const data = api.board.findAll.useQuery(undefined, {
    refetchInterval: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false
  });

  const boards = useMemo(() => {
    if (data) {
      const boards = data?.data?.boards ?? [];
      const foundBoard = boards.find(
        (board) => board.name.trim() === pathname.trim().split('-').join(' ').slice(1)
      );
      if (foundBoard) {
        dispatch(setGlobalState({ dataKey: 'activeBoard', data: foundBoard }));
      }
      return boards;
    }
    return [];
  }, [data]);

  const handleAddNewBoard = () => {
    onOpen();
  };

  const checkIfLinkIsActive = (link: string) => {
    return pathname.trim().split('-').join(' ') === `/${link}`;
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

        <div className="flex h-full flex-col justify-between overflow-y-auto">
          <div>
            {data.isLoading || data.isRefetching ? (
              <Loading spinnerHeight={50} spinnerWidth={50} parentHeight={55} />
            ) : data.isError ? (
              <div className="flex flex-col items-center justify-center h-[75vh]">
                <span className="text-destructive mb-1">
                  <BiSolidError size="85px" fill="currentColor" />
                </span>
                <p className="text-brand-regent-grey mb-3 text-md text-center font-medium">
                  An error occurred.
                </p>
                <Button
                  className="bg-brand-iris rounded-[100px] hover:bg-brand-biloba-flower hover:text-white"
                  onClick={() => data.refetch()}
                >
                  Try Again
                </Button>
              </div>
            ) : boards && boards?.length > 0 ? (
              <div className="flex flex-col">
                <span className="uppercase px-4 pt-5 pb-3 text-md font-bold text-brand-regent-grey">{`All Boards (${boards.length})`}</span>
                {boards.map((board, Idx) => {
                  return (
                    <Link
                      href={board.name.trim().split(' ').join('-')}
                      key={board.id}
                      className="hover:fill-brand-iris"
                      onClick={() =>
                        dispatch(setGlobalState({ dataKey: 'activeBoard', data: board }))
                      }
                    >
                      <div
                        className={cn(
                          'duration-150 flex gap-4 cursor-pointer items-center justify-start px-4 py-5 transition-all ease-in-out hover:bg-brand-lavender-mist hover:text-white md:justify-center xl:justify-start rounded-r-[100px] dark:hover:bg-white hover:text-brand-iris text-base font-bold text-brand-regent-grey',
                          checkIfLinkIsActive(board.name) && 'bg-brand-iris text-white'
                          // Idx !== LINKS.length - 1 && 'mb-3'
                        )}
                      >
                        <SideBarSvg className="" />
                        <span className="w-full font-medium capitalize">{board.name}</span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            ) : null}

            <Button
              className="duration-350 mb-6 mt-3 flex cursor-pointer items-center justify-start gap-2 px-4 py-3 transition-all ease-in-out md:justify-center xl:justify-start xl:px-4 xl:py-2 text-brand-iris"
              variant="unstyled"
              onClick={handleAddNewBoard}
            >
              <Image src={ActiveSidebarIcon} alt="img"></Image>
              <span className="text-base">+ Create New Board</span>
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
