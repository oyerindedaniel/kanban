'use client';

import { useModal } from '@/hooks/use-modal-store';
import { cn } from '@/lib/utils';
import { type SubTask, type Task } from '@prisma/client';
import { type FC } from 'react';

export interface TaskProps {
  task: Task & {
    subTasks: Array<SubTask>;
  };
}

const Task: FC<TaskProps> = ({ task }) => {
  const { onOpen } = useModal();

  const taskSubTasks = task.subTasks;

  const taskSubTasksIsCompletedLength = taskSubTasks?.filter(
    (subTask) => subTask.isCompleted
  ).length;

  return (
    <div
      className={cn(
        'bg-white dark:bg-brand-ebony-clay text-white dark:text-black flex flex-col h-[88px] justify-center rounded-lg cursor-pointer px-4 py-3 shadow-md'
      )}
      onClick={() => onOpen('viewTask', { task })}
    >
      <p className="font-medium line-clamp-1 text-black dark:text-white">{task.name}</p>
      <p className="font-medium text-brand-regent-grey">{`${taskSubTasksIsCompletedLength} of ${taskSubTasks.length} substasks`}</p>
    </div>
  );
};

export default Task;
