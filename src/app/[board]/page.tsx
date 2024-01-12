'use client';

import Platform from '@/components/PlatformLayout';
import { Button } from '@/components/ui/button';
import AddNewColumnModal from '@/components/Kanban/Modals/AddNewColumn';
import { useDisclosure } from '@/hooks';

const PlatformLaunch = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleAddNewColumn = () => {
    onOpen();
  };

  const ITEMS = 2;

  return (
    <>
      <AddNewColumnModal isOpen={isOpen} onClose={onClose} />
      {ITEMS > 0 ? (
        <div className="grid grid-cols-4 gap-8 w-[1250px]">
          {/* <Platform /> */}
          <div className="h-[360px] w-72 bg-gradient-to-b from-brand-sky-blue/100 to-brand-light-blue/50 justify-center flex rounded-md cursor-pointer ">
            <p
              className="my-auto font-medium text-brand-regent-grey hover:text-brand-iris"
              onClick={handleAddNewColumn}
            >
              + New Column
            </p>
          </div>
        </div>
      ) : (
        <div className="py-auto flex flex-col items-center justify-center h-[75vh]">
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
      )}
    </>
  );
};

export default PlatformLaunch;
