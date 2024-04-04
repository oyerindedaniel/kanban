'use client';

import { KanbanLogo, MoreOptionsIcon } from '@/assets';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { useDisclosure } from '@/hooks';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const TopBar = () => {
  const pathname = usePathname();
  const { onOpen } = useDisclosure();

  const handleAddNewTask = () => {
    onOpen();
  };

  const boardName = pathname.trim().toLowerCase().split('/')[2];

  return (
    <nav className="bg-white dark:bg-brand-ebony-clay text-black dark:text-white flex h-24 items-center md:p-1.5">
      <Image className="ml-6" src={KanbanLogo} alt="logo" />
      <span className="h-24 ml-[115.5px]"></span>

      <div className=" flex justify-between items-center w-full  px-5">
        <span className="font-bold text-2xl capitalize">{boardName}</span>
        <div className="flex">
          <Button
            className="bg-brand-iris text white rounded-[100px] mr-6 hover:bg-brand-biloba-flower"
            onClick={handleAddNewTask}
          >
            +Add New Task
          </Button>
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
