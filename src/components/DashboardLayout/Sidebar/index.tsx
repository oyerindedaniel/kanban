/* eslint-disable @typescript-eslint/ban-ts-comment */

'use client';

import { ActiveSidebarIcon, HideIcon, SideBarSvg } from '@/assets';
import { Button } from '@/components/ui/button';
import ErrorComponent from '@/components/ui/error';
import Loading from '@/components/ui/loading';
import { useDisclosure } from '@/hooks';
import { cn } from '@/lib/utils';
import { useAppDispatch } from '@/store/hooks';
import { setGlobalState } from '@/store/slice/Global';
import { api } from '@/trpc/react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo, type FC } from 'react';
import ModeToggler from './ModeToggler';

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
    refetchOnWindowFocus: false,
    retry: false
  });

  const boards = useMemo(() => {
    if (data) {
      return data?.data?.data;
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
              <Loading />
            ) : data.isError ? (
              <ErrorComponent
                description="An error occurred."
                refetchButtonText=" Try Again"
                refetch={data.refetch()}
                isRefetching={data.isRefetching}
              />
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
