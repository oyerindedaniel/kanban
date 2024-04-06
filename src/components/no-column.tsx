'use client';

import { useModal } from '@/hooks/use-modal-store';
import { type Board } from '@prisma/client';
import { type FC } from 'react';
import { Button } from './ui/button';

interface Props {
  activeBoard: Board;
}

const NoColumn: FC<Props> = ({ activeBoard }) => {
  const { onOpen } = useModal();

  return (
    <div className="flex flex-col items-center justify-center h-[75vh]">
      <p className="text-brand-regent-grey font-medium mb-8">
        This board is empty. Create a new column to get started.
      </p>
      <Button variant="default" onClick={() => onOpen('addNewColumn', { board: activeBoard })}>
        + Add New Column
      </Button>
    </div>
  );
};

export default NoColumn;
