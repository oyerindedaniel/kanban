'use client';

import { KanbanLogo, MoreOptionsIcon } from '@/assets';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { useModal } from '@/hooks/use-modal-store';
import { useAppSelector } from '@/store/hooks';
import Image from 'next/image';

const TopBar = () => {
  const { onOpen } = useModal();

  const { board } = useAppSelector((state) => state.GlobalService);

  const boardName = board?.name ?? '';

  console.log(board);

  return (
    <nav className="bg-white dark:bg-brand-ebony-clay text-black dark:text-white flex h-24 items-center md:p-1.5">
      <Image className="ml-6" src={KanbanLogo} alt="logo" />
      <span className="h-24 ml-[116px]"></span>
      <div className=" flex justify-between items-center w-full  px-5">
        <span className="font-bold text-2xl capitalize">{boardName}</span>
        <div className="flex gap-4">
          <Button
            variant="default"
            disabled={!boardName}
            onClick={() => {
              onOpen('addNewTask');
            }}
          >
            +Add New Task
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Image className="cursor-pointer" src={MoreOptionsIcon} alt="More options" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48 mr-6">
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => onOpen('addNewBoard', { board: board!, asEdit: true })}
              >
                <span>Edit Board</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => onOpen('deleteBoard', { board: board! })}
              >
                <span className="text-brand-valentine-red">Delete Board</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};
export default TopBar;
