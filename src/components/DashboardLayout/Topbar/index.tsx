'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { KanbanLogo } from '@/assets';
import { MoreOptionsIcon } from '@/assets';
import { useDisclosure } from '@/hooks';
import AddNewTaskModal from '@/components/Kanban/Modals/AddNewTask';
import Image from 'next/image';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

const TopBar = () => {
  const pathname = usePathname();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleAddNewTask = () => {
    onOpen();
  };

  const handlePath = pathname.slice(1).split('-');

  const capitalizePathname = (path: string[]) => {
    return path.map((p) => {
      if (p.length > 0) {
        return p.charAt(0).toUpperCase() + p.slice(1);
      }
    });
  };

  const path = capitalizePathname(handlePath).join(' ');

  return (
    <nav className="bg-white dark:bg-brand-ebony-clay text-black dark:text-white flex h-24 items-center md:p-1.5">
      <Image className="ml-6" src={KanbanLogo} alt="logo" />
      <span className="h-24 ml-[115.5px]"></span>

      <div className=" flex justify-between items-center w-full  px-5">
        <span className="font-bold text-2xl">{path.split('-').join(' ')}</span>
        <div className="flex">
          <Button
            className="bg-brand-iris text white rounded-[100px] mr-6 hover:bg-brand-biloba-flower"
            onClick={handleAddNewTask}
          >
            +Add New Task
          </Button>
          <AddNewTaskModal isOpen={isOpen} onClose={onClose} />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Image className="cursor-pointer" src={MoreOptionsIcon} alt="More options" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48 mr-6">
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                <span>Edit Board</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
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
