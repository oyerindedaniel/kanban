'use client';

import Platform from '@/components/PlatformLayout';
import { Button } from '@/components/ui/button';
import AddNewColumnModal from '@/components/Kanban/Modals/AddNewColumn';
import { useDisclosure } from 'hooks';

const PlatformLaunch = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleAddNewColumn = () => {
    onOpen();
  };

  return (
    <div>
      <div className="grid grid-cols-12 gap-14 ">
        <div className="grid grid-cols-2">
          <Button className="rounded-full bg-brand-todo " size={'icon'} />
          <p className="text-brand-regent-grey text-xs mb-6 ml-2"> TODO </p>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-72 ">
        <Platform />
        <div className="h-[360px] w-72 bg-gradient-to-b from-brand-sky-blue/100 to-brand-light-blue/50 justify-center flex rounded-md cursor-pointer ">
          <p
            className="my-auto font-medium text-brand-regent-grey hover:text-brand-iris"
            onClick={handleAddNewColumn}
          >
            + New Column
          </p>
        </div>
        <AddNewColumnModal isOpen={isOpen} onClose={onClose} />
      </div>
    </div>
  );
};

export default PlatformLaunch;
