'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { KanbanLogo } from '@/assets';
import { MoreOptionsIcon } from '@/assets';
import { useDisclosure } from 'hooks';
import AddNewTaskModal from '@/components/AddNewTask/Modal';
import Image from 'next/image';

const TopBar = () => {
  const pathname = usePathname();
  const { isOpen, onOpen, onClose } = useDisclosure();

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
    <nav className=" flex h-24 items-center border-[1px] border-b-0 border-gray-200 bg-white md:p-1.5">
      <Image className="ml-6" src={KanbanLogo} alt="logo" />
      <span className="border-l border-gray-200 h-24 ml-[115.5px]"></span>

      <div className=" flex justify-between items-center w-full  px-5">
        <div className="font-medium">
          <p>{path}</p>
        </div>
        <div className="flex">
          <Button className="bg-brand-iris text white  rounded-[100px] mr-6" size="lg">
            +Add New Task
          </Button>
          <Image src={MoreOptionsIcon} alt="img"></Image>
        </div>
      </div>
    </nav>
  );
};

export default TopBar;
