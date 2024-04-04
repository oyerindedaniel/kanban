'use client';

import { Button } from '@/components/ui/button';
import { useModal } from '@/hooks/use-modal-store';

const NoBoard = () => {
  const { onOpen } = useModal();

  return (
    <div className="flex flex-col items-center justify-center h-[75vh]">
      <p className="text-brand-regent-grey font-medium">
        This platform is empty. Create a new board to get started.
      </p>
      <Button
        className="mt-8 bg-brand-iris rounded-[100px] hover:bg-brand-biloba-flower hover:text-white"
        onClick={() => onOpen('addNewBoard')}
      >
        + Add New Board
      </Button>
    </div>
  );
};

export default NoBoard;
