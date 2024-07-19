'use client';

import { type ColumnAllIncludes } from '@/types';
import { useOptimistic } from 'react';

export interface MoveTask {
  intent: 'moveTask';
  previousColumnId: string;
  columnId: string;
  taskId: string;
}

export const useOptimisticColumns = (initialColumns: Array<ColumnAllIncludes>) => {
  const [optimisticColumns, optimisticUpdate] = useOptimistic(
    [...initialColumns],
    (state: ColumnAllIncludes[], action: MoveTask): ColumnAllIncludes[] => {
      switch (action.intent) {
        case 'moveTask': {
          const { columnId, previousColumnId, taskId } = action;

          const previousColumn = state.find((column) => column.id === previousColumnId);

          if (!previousColumn) return state;

          const taskIdx = previousColumn.tasks.findIndex((task) => task.id === taskId);

          if (taskIdx === -1) return state;

          const task = previousColumn.tasks[taskIdx];
          const newState = state.map((column) => {
            if (column.id === previousColumnId) {
              return {
                ...column,
                tasks: column.tasks.filter((task) => task.id !== taskId)
              };
            }
            if (column.id === columnId) {
              return {
                ...column,
                tasks: [...column.tasks, task]
              };
            }
            return column;
          });

          return newState as Array<ColumnAllIncludes>;
        }
        default:
          return state;
      }
    }
  );

  return { optimisticColumns, optimisticUpdate };
};
