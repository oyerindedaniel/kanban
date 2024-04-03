'use client';

import { type Column, type Task } from '@prisma/client';
import { type FC } from 'react';

interface ColumnProps {
  column: Column & {
    tasks: Array<Task>;
  };
}

const Column: FC<ColumnProps> = ({ column }) => {
  return (
    <div className="flex gap-3 mb-6 items-center">
      <div className="rounded-full h-4 w-4 bg-brand-todo" />
      <p className="text-brand-regent-grey text-[15px] font-semibold">
        {`${column?.name} (${column?.tasks?.length})`}
      </p>
    </div>
  );
};

export default Column;
