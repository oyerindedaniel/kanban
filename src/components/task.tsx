/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client';

import { cn } from '@/lib/utils';
import { type SubTask, type Task } from '@prisma/client';
import { type FC } from 'react';

interface TaskProps {
  task: Task & {
    subTasks: Array<SubTask>;
  };
}

const Task: FC<TaskProps> = ({ task }) => {
  return (
    <div
      className={cn(
        'bg-white dark:bg-brand-ebony-clay text-white dark:text-black flex flex-col h-[88px] justify-center rounded-lg cursor-pointer px-4 py-3 shadow-md'
      )}
    >
      <p className="font-medium line-clamp-1 text-black dark:text-white hover:text-brand-iris">
        {task.name}
      </p>
      <p className="font-medium text-brand-regent-grey">{task?.subTasks?.length}</p>
    </div>
  );
};

export default Task;
