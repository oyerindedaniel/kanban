'use client';

import { Button } from '@/components/ui/button';
import { useModal } from '@/hooks/use-modal-store';
import { useAppDispatch } from '@/store/hooks';
import { clearBoard, clearColumns } from '@/store/slice/globalSlice';
import { useEffect } from 'react';

const NoBoard = () => {
  const { onOpen } = useModal();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(clearBoard());
    dispatch(clearColumns());
  }, [dispatch]);

  return (
    <div className="flex flex-col items-center justify-center h-[75vh]">
      <p className="text-brand-regent-grey text-center font-medium">
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
