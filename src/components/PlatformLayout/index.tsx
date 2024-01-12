/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client';

import { type FC } from 'react';
import { Button } from '../ui/button';
import { LINKS } from './constants';
import { cn } from '@/lib/utils';
import { useDisclosure } from '@/hooks';
import AddNewColumnModal from '../Kanban/Modals/AddNewColumn';
import { type Column, type Task } from '@/types';

interface PlatformProps {
  column: Column;
}

const Platform: FC<PlatformProps> = ({ column }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleAddNewColumn = () => {
    onOpen();
  };

  return (
    <div>
      <>
        <div className="flex gap-3 mb-6 items-center">
          <div className="rounded-full h-4 w-4 bg-brand-todo" />
          <p className="text-brand-regent-grey text-[15px] font-semibold">
            {`${column?.name} (${column?.tasks?.length})`}
          </p>
        </div>
        <div className="flex flex-col gap-6">
          {column?.tasks?.map((task, Idx) => (
            <div
              key={Idx}
              className={cn(
                'bg-white dark:bg-brand-ebony-clay text-white dark:text-black flex flex-col h-[88px] justify-center rounded-lg cursor-pointer px-4 py-3 shadow-md'
              )}
            >
              <p className="font-medium line-clamp-1 text-black dark:text-white hover:text-brand-iris">
                {task.name}
              </p>
              <p className="font-medium text-brand-regent-grey">{task?.subTasks?.length}</p>
            </div>
          ))}
        </div>
      </>
    </div>
  );
};

export default Platform;
