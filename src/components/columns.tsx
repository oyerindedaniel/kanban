'use client';

import { useModal } from '@/hooks/use-modal-store';
import { cn } from '@/lib/utils';
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
  const [draggedToColumnName, setDraggedToColumnName] = useState('');

  const [optimisticColumns, setOptimisticColumns] = useState<Props['columns']>(columns);
  const [hoveredColumnId, setHoveredColumnId] = useState<string | null>(null);

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

  const mutateUpdateColumn = api.column.update.useMutation();

  // {
  //   onSuccess: () => {
  //     router.refresh();
  //     toastSonner(`Task status changed`, { description: draggedToColumnName });
  //   },
  //   onError: (error) => {
  //     console.error(error);
  //     return toast({
  //       variant: 'destructive',
  //       description: 'An error occurred'
  //     });
  //   }

  // }

  const handleOnDrop = ({
    event,
    columnId
  }: {
    event: React.DragEvent<HTMLDivElement>;
    columnId: string;
  }) => {
    const { previousColumnId, taskId } = JSON.parse(event.dataTransfer.getData('text'));
    if (columnId === previousColumnId) return;

    // This is a temporary, somewhat sloppy solution.
    // When using splice, there's an error: Cannot assign to read-only property '0' of object '[object Array]'.

    const columns = [...optimisticColumns];

    const previousColumnIdx = columns.findIndex((column) => column.id === previousColumnId);
    const newColumn = columns.find((column) => column.id === columnId);
    const previousColumn = columns[previousColumnIdx];
    const movedTask = previousColumn?.tasks.find((task) => task.id === taskId);

    if (!movedTask) return;

    const updatedColumns = columns.map((column) => {
      if (column.id === previousColumnId) {
        return { ...column, tasks: column.tasks.filter((task) => task.id !== taskId) };
      }

      if (column.id === columnId) {
        return { ...column, tasks: [movedTask, ...column.tasks] };
      }

      return column;
    });

    setOptimisticColumns(updatedColumns);

    toastSonner.promise(
      mutateUpdateColumn.mutateAsync({ columnId, previousColumnId, taskId, subTasks: [] }),
      {
        loading: `Updating task (${movedTask.name}) ...`,
        success: () => {
          router.refresh();
          return `Task status changed to ${newColumn?.name}`;
        },
        error: `An error occurred`
      }
    );
  };

  const handleOnDragOver = ({
    event,
    columnId
  }: {
    event: React.DragEvent<HTMLDivElement>;
    columnId: string;
  }) => {
    event.preventDefault();

    // if (!columnId) return setHoveredColumnId(null);

    setHoveredColumnId(columnId);
  };

  const isUpdating = mutateUpdateColumn.isLoading;

  return (
    <>
      {/* {isUpdating && (
        <div className="fixed right-6 font-medium bottom-10 border dark:border-brand-bright-grey border-input text-black text-sm rounded-xl dark:text-white bg-white dark:bg-brand-ebony-clay px-3 py-2 shadow-lg">
          Updating task ...
        </div>
      )} */}
      <div
        style={{
          gap: `${GAP}px`,
          width: `calc(${columns?.length + 1 * GAP + columns?.length * COLUMN_WIDTH + ADD_COLUMN_WIDTH}px)`,
          gridTemplateColumns: `repeat(${columns?.length + 1}, minmax(0, 1fr))`
        }}
        className="grid"
      >
        {optimisticColumns.map((column) => (
          <div
            onDrop={(event) => {
              setDraggedToColumnName(column.name);
              handleOnDrop({ event, columnId: column.id });
            }}
            onDragOver={(event) => handleOnDragOver({ event, columnId: column.id })}
            style={{
              maxWidth: `${COLUMN_WIDTH}px`
            }}
            key={column.id}
            className={cn(
              '',
              hoveredColumnId === column.id
                ? 'border-2 border-dashed dark:border-white border-brand-dark p-3 rounded-lg'
                : 'none'
            )}
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
