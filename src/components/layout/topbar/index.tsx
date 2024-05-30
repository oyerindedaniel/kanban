'use client';

import { KanbanLogo, KanbanLogoDark, MoreOptionsIcon } from '@/assets';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { useModal } from '@/hooks/use-modal-store';
import { useInitialRender } from '@/hooks/useInitialRender';
import { useAppSelector } from '@/store/hooks';
import { Plus } from 'lucide-react';
import { useTheme } from 'next-themes';
import Image from 'next/image';

const TopBar = () => {
  const { onOpen } = useModal();

  const { theme } = useTheme();

  const { board } = useAppSelector((state) => state.GlobalService);

  const boardName = board?.name ?? '';

  const initialRenderComplete = useInitialRender();

  return (
    <nav className="bg-white dark:bg-brand-ebony-clay relative text-black dark:text-white flex h-24 items-center px-4">
      <div>
        <Image className="ml-6 mr-6 block dark:hidden" src={KanbanLogo} alt="logo" />
        <Image className="ml-6 mr-6 none dark:block" src={KanbanLogoDark} alt="logo" />
      </div>
      <div className="flex justify-between items-center w-full">
        <span className="font-bold text-2xl capitalize hidden absolute left-[300px] md:block">
          {boardName}
        </span>
        <div className="flex gap-4 ml-auto">
          <Button
            variant="default"
            disabled={!boardName}
            onClick={() => {
              onOpen('addNewTask');
            }}
          >
            <span className="hidden md:block">+Add New Task</span>
            <span className="block md:hidden">
              <Plus />
            </span>
          </Button>
          {!!board && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Image className="cursor-pointer" src={MoreOptionsIcon} alt="More options" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48 mr-6">
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => onOpen('addNewBoard', { board: board, asEdit: true })}
                >
                  <span>Edit Board</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => onOpen('deleteBoard', { board: board })}
                >
                  <span className="text-brand-valentine-red">Delete Board</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </nav>
  );
};
export default TopBar;
