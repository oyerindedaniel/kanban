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
    <div>
      <div>
        {LINKS.map((link, Idx) => {
          {
            return LINKS.length <= 1 ? (
              <div
                className={cn(
                  ' h-[88px] w-[280px] bg-white flex flex-col justify-center rounded-lg cursor-pointer px-4 py-3 shadow-md'
                )}
              >
                <p className="font-medium hover:text-brand-iris">{link.platformTitle}</p>
                <p className=" font-medium text-brand-regent-grey">{link.subtaskStatus}</p>
              </div>
            ) : (
              <div className="py-auto flex flex-col items-center justify-center h-[73vh] ">
                <p className="text-brand-regent-grey font-medium">
                  This board is empty. Create a new column to get started.
                </p>
                <Button
                  className="mt-8 bg-brand-iris rounded-[100px] hover:bg-brand-biloba-flower hover:text-white"
                  onClick={handleAddNewColumn}
                >
                  + Add New Column
                </Button>
                <AddNewColumnModal isOpen={isOpen} onClose={onClose} />
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default Platform;
