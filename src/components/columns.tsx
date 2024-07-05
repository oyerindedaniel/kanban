'use client';

import { useModal } from '@/hooks/use-modal-store';
import { cn } from '@/lib/utils';
import { useAppDispatch } from '@/store/hooks';
import { setGlobalState } from '@/store/slice/global';
import { api } from '@/trpc/react';
import { type ColumnAllIncludes } from '@/types';
import { type Board } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState, useTransition, type FC } from 'react';
import { toast as toastSonner } from 'sonner';
import Column from './column';
import { revalidateBoardBySlug } from './modals/actions';
import Task from './task';
import { useToast } from './ui/use-toast';
import { useOptimisticColumns } from './use-optimistic-column';

export type Props = {
  columns: Array<ColumnAllIncludes>;
  activeBoard: Board;
};

const GAP = 32;
const ADD_COLUMN_WIDTH = 288;
const COLUMN_WIDTH = 320;

const Columns: FC<Props> = ({ columns, activeBoard }) => {
  const [_, startTransition] = useTransition();
  // console.log(columns);
  const { optimisticColumns, optimisticUpdate } = useOptimisticColumns(columns);

  console.log('-----columns-----', columns);

  const [hoveredColumnId, setHoveredColumnId] = useState<string | null>(null);

  const router = useRouter();

  const { toast } = useToast();

  const { onOpen } = useModal();

  const dispatch = useAppDispatch();

  const dispatchState = useCallback(() => {
    dispatch(
      setGlobalState({
        dataKey: 'board' as const,
        data: activeBoard
      })
    );

    // dispatch(
    //   setGlobalState({
    //     dataKey: 'columns' as const,
    //     data: optimisticColumns
    //   })
    // );
  }, [dispatch, activeBoard, optimisticColumns]);

  useEffect(() => {
    dispatchState();
  }, [dispatchState]);

  const mutateUpdateColumn = api.column.update.useMutation();

  const handleOnDrop = ({
    event,
    columnId,
    columnName
  }: {
    event: React.DragEvent<HTMLDivElement>;
    columnId: string;
    columnName: string;
  }) => {
    event.preventDefault();
    event.stopPropagation();

    const { previousColumnId, taskId, taskName } = JSON.parse(event.dataTransfer.getData('text'));
    if (columnId === previousColumnId) return;

    const columns = [...optimisticColumns];

    console.log('pc---------', columns);

    dispatchState();

    optimisticUpdate({
      intent: 'moveTask',
      previousColumnId,
      taskId,
      columnId
    });

    setHoveredColumnId(null);

    toastSonner.promise(
      mutateUpdateColumn.mutateAsync({ columnId, previousColumnId, taskId, subTasks: [] }),
      {
        loading: `Updating task (${taskName}) ...`,
        success: () => {
          revalidateBoardBySlug();
          return `Task status changed to ${columnName}`;
        },
        error: () => {
          revalidateBoardBySlug();
          return `An error occurred`;
        }
      }
    );

    console.log('daniel');
  };

  const handleOnDragOver = ({
    event,
    columnId
  }: {
    event: React.DragEvent<HTMLDivElement>;
    columnId: string;
  }) => {
    event.preventDefault();
    event.stopPropagation();

    if (!columnId || hoveredColumnId === columnId) return;
    console.log('ondragover');
    setHoveredColumnId(columnId);
  };

  // console.log(optimisticColumns);

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
              startTransition(() =>
                handleOnDrop({ event, columnId: column.id, columnName: column.name })
              );
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
