/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client';

import { Button } from '../ui/button';
import { LINKS } from './constants';
import { cn } from '@/lib/utils';
import { useDisclosure } from 'hooks';
import AddNewColumnModal from '../Kanban/Modals/AddNewColumn';

const Platform = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleAddNewColumn = () => {
    onOpen();
  };

  return (
    <div className="">
      <div className="flex gap-3 mb-6 items-center">
        <div className="rounded-full h-4 w-4 bg-brand-todo" />
        <p className="text-brand-regent-grey text-[15px] font-semibold"> TODO (1)</p>
      </div>
      <div className="flex flex-col gap-6">
        {LINKS.map((link, Idx) => (
          <div
            key={Idx}
            className={cn(
              'bg-white flex flex-col h-[88px] justify-center rounded-lg cursor-pointer px-4 py-3 shadow-md'
            )}
          >
            <p className="font-medium hover:text-brand-iris">{link.platformTitle}</p>
            <p className="font-medium text-brand-regent-grey">{link.subtaskStatus}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Platform;
