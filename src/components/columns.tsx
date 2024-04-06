'use client';

import { useModal } from '@/hooks/use-modal-store';
import { useAppDispatch } from '@/store/hooks';
import { setGlobalState } from '@/store/slice/global';
import { api } from '@/trpc/react';
import {
  type Board,
  type Column as ColumnType,
  type SubTask,
  type Task as TaskType
} from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useEffect, useState, type FC } from 'react';
import { toast as toastSonner } from 'sonner';
import Column from './column';
import Task from './task';
import { useToast } from './ui/use-toast';

export interface Props {
  columns: Array<
    ColumnType & {
      tasks: Array<TaskType & { subTasks: Array<SubTask> }>;
    }
  >;
  activeBoard: Board;
}

const GAP = 32;
const ADD_COLUMN_WIDTH = 288;
const COLUMN_WIDTH = 320;

const Columns: FC<Props> = ({ columns, activeBoard }) => {
  const [draggedToColumnName, setDraggedToColumnName] = useState<string>('');

  const router = useRouter();

  const { toast } = useToast();

  const { onOpen } = useModal();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      setGlobalState({
        dataKey: 'board' as const,
        data: activeBoard
      })
    );

    dispatch(
      setGlobalState({
        dataKey: 'columns' as const,
        data: columns
      })
    );
  }, [dispatch, columns, activeBoard]);

  const mutateUpdateColumn = api.column.update.useMutation({
    onSuccess: () => {
      router.refresh();
      toastSonner(`Task status changed`, { description: draggedToColumnName });
    },
    onError: (error) => {
      console.error(error);
      return toast({
        variant: 'destructive',
        description: 'An error occurred'
      });
    }
  });

  const handleOnDrop = ({
    event,
    columnId
  }: {
    event: React.DragEvent<HTMLDivElement>;
    columnId: string;
  }) => {
    const { previousColumnId, taskId } = JSON.parse(event.dataTransfer.getData('text'));

    if (columnId !== previousColumnId) {
      //@ts-ignore
      mutateUpdateColumn.mutate({ columnId, previousColumnId, taskId, subTasks: [] });
    }
  };

  const handleOnDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const isUpdating = mutateUpdateColumn.isLoading;

  return (
    <>
      {isUpdating && (
        <div className="fixed right-6 font-medium bottom-10 border dark:border-brand-bright-grey border-input text-black text-sm rounded-xl dark:text-white bg-white dark:bg-brand-ebony-clay px-3 py-2 shadow-lg">
          Updating task ...
        </div>
      )}
      <div
        style={{
          gap: `${GAP}px`,
          width: `calc(${columns?.length + 1 * GAP + columns?.length * COLUMN_WIDTH + ADD_COLUMN_WIDTH}px)`,
          gridTemplateColumns: `repeat(${columns?.length + 1}, minmax(0, 1fr))`
        }}
        className="grid"
      >
        {columns.map((column) => (
          <div
            onDrop={(event) => {
              handleOnDrop({ event, columnId: column.id });
              setDraggedToColumnName(column.name);
            }}
            onDragOver={handleOnDragOver}
            style={{ maxWidth: `${COLUMN_WIDTH}px` }}
            key={column.id}
          >
            <Column column={column} />
            <div className="flex flex-col gap-4">
              {column.tasks?.map((task) => <Task key={task?.id} task={task} />)}
            </div>
          </div>
        ))}

        <div
          style={{ maxWidth: `${ADD_COLUMN_WIDTH}px` }}
          onClick={() => onOpen('addNewColumn', { board: activeBoard })}
          className="min-h-[75vh] bg-gradient-to-b from-brand-sky-blue/100 to-brand-light-blue/50 justify-center flex items-center rounded-lg cursor-pointer"
        >
          <p className="font-medium text-brand-regent-grey hover:text-brand-iris">+ New Column</p>
        </div>
      </div>
    </>
  );
};

export default Columns;
