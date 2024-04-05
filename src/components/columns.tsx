'use client';

import { useModal } from '@/hooks/use-modal-store';
import { useAppDispatch } from '@/store/hooks';
import { setGlobalState } from '@/store/slice/Global';
import {
  type Board,
  type Column as ColumnType,
  type SubTask,
  type Task as TaskType
} from '@prisma/client';
import { useEffect, type FC } from 'react';
import Column from './column';
import Task from './task';

export interface Props {
  columns: Array<
    ColumnType & {
      tasks: Array<TaskType & { subTasks: Array<SubTask> }>;
    }
  >;
  activeBoardId: Board['id'];
}

const GAP = 32;
const ADD_COLUMN_WIDTH = 288;
const COLUMN_WIDTH = 320;

const Columns: FC<Props> = ({ columns, activeBoardId }) => {
  const { onOpen } = useModal();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      setGlobalState({
        dataKey: 'columns' as const,
        data: columns
      })
    );
  }, [dispatch, columns]);

  return (
    <div
      style={{
        gap: `${GAP}px`,
        width: `calc(${columns?.length + 1 * GAP + columns?.length * COLUMN_WIDTH + ADD_COLUMN_WIDTH}px)`,
        gridTemplateColumns: `repeat(${columns?.length + 1}, minmax(0, 1fr))`
      }}
      className="grid"
    >
      {columns.map((column) => (
        <div style={{ maxWidth: `${COLUMN_WIDTH}px` }} key={column.id}>
          <Column column={column} />
          <div className="flex flex-col gap-4">
            {column.tasks?.map((task) => <Task key={task?.id} task={task} />)}
          </div>
        </div>
      ))}

      <div
        style={{ maxWidth: `${ADD_COLUMN_WIDTH}px` }}
        onClick={() => onOpen('addNewColumn', { board: activeBoardId })}
        className="min-h-[75vh] bg-gradient-to-b from-brand-sky-blue/100 to-brand-light-blue/50 justify-center flex rounded-lg cursor-pointer"
      >
        <p className="my-auto font-medium text-brand-regent-grey hover:text-brand-iris">
          + New Column
        </p>
      </div>
    </div>
  );
};

export default Columns;
