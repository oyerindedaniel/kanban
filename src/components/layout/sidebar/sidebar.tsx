'use client';

import { ActiveSidebarIcon, HideIcon, SideBarSvg } from '@/assets';
import { Button } from '@/components/ui/button';
import { useModal } from '@/hooks/use-modal-store';
import { cn } from '@/lib/utils';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { updateUI } from '@/store/slice/ui';
import { type Board } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import ModeToggler from './mode-toggler';

const Sidebar = ({ boards }: { boards: Array<Pick<Board, 'name' | 'slug' | 'id'>> }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { onOpen } = useModal();

  const handleAddNewBoard = () => {
    onOpen('addNewBoard');
  };

  const checkIfLinkIsActive = (link: Board['slug']) => {
    return pathname.trim().toLowerCase().split('/')[2] === link;
  };

  const { isSideBarOpen } = useAppSelector((state) => state.UIService.UI);

  const dispatch = useAppDispatch();

  const toggleSidebar = () => {
    dispatch(
      updateUI({
        isSideBarOpen: !isSideBarOpen
      })
    );
  };

  return (
    <div
      className={
        (cn('bg-white dark:bg-brand-ebony-clay text-white dark:text-black left-0 bottom-0 z-30'),
        isSideBarOpen ? 'fixed w-[300px] h-[calc(100vh-96px)]' : 'hidden')
      }
    >
      <div className="flex h-full flex-col justify-between">
        <div>
          {boards && boards?.length > 0 && (
            <div className="flex flex-col">
              <span className="uppercase px-4 pt-5 pb-3 text-md font-bold text-brand-regent-grey">{`All Boards (${boards.length})`}</span>
              <div className="h-full max-h-[calc(100vh-96px-250px)] overflow-y-auto">
                {boards.map((board, idx) => {
                  return (
                    <Link
                      href={board.name.trim().split(' ').join('-')}
                      key={board.id}
                      className="hover:fill-brand-iris"
                      onClick={() => router.push(`/board/${board?.slug}`)}
                    >
                      <div
                        className={cn(
                          'duration-150 flex gap-4 cursor-pointer items-center justify-start px-4 py-5 transition-all ease-in-out hover:bg-brand-lavender-mist md:justify-center xl:justify-start rounded-r-[100px] dark:hover:bg-white hover:text-brand-iris text-base font-bold text-brand-regent-grey',
                          checkIfLinkIsActive(board.slug) && 'bg-brand-iris text-white',
                          idx !== boards.length - 1 && 'mb-3'
                        )}
                      >
                        <SideBarSvg />
                        <span className="w-full font-medium capitalize">{board.name}</span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          <Button
            className="duration-350 my-3 flex cursor-pointer items-center justify-start gap-2 px-4 transition-all ease-in-out md:justify-center xl:justify-start text-brand-iris"
            variant="unstyled"
            onClick={handleAddNewBoard}
          >
            <Image src={ActiveSidebarIcon} alt="add new board" />
            <span className="text-base">+ Create New Board</span>
          </Button>
        </div>

        <div className="flex flex-col justify-around pb-12 px-4">
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
