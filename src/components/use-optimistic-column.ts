'use client';

import { ColumnAllIncludes } from '@/types';
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
    (state, action: MoveTask) => {
      switch (action.intent) {
        case 'moveTask': {
          const { columnId, previousColumnId, taskId } = action;

          const previousColumn = state.find((column) => column.id === previousColumnId);
          const taskIdx = previousColumn?.tasks.findIndex((task) => task.id === taskId);
          const task = previousColumn?.tasks.splice(taskIdx!, 1)[0];
          state?.find((column) => column.id === columnId)!.tasks.push(task!);
          return state;
        }
        default:
          return state;
      }
    }
  );

  return { optimisticColumns, optimisticUpdate };
};
