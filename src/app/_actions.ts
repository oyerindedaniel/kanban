'use server';

import { revalidateBoardBySlug } from '@/components/modals/actions';
import { db } from '@/server/db';
import { subTasksSchema } from '@/types';
import { z } from 'zod';

export const mutateColumnUpdate = async (
  columnId: string,
  previousColumnId: string,
  taskId: string
) => {
  try {
    subTasksSchema.parse({ columnId, previousColumnId, taskId, subTasks: [] });

    if (!previousColumnId || !columnId) {
      throw new Error('Column does not exist.');
    }

    await db.column.update({
      where: { id: columnId },
      data: {
        tasks: {
          connect: { id: taskId }
        }
      }
    });

    revalidateBoardBySlug();
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('Validation error:', error.errors);
      throw new Error('Invalid input data.');
    } else {
      console.error('Error updating column:', error);
      throw error;
    }
  }
};
