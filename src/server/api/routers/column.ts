import { z } from 'zod';

import { createTRPCRouter, publicProcedure } from '@/server/api/trpc';
import { columnSchema } from '@/types';
import { TRPCError } from '@trpc/server';

export const columnRouter = createTRPCRouter({
  findAll: publicProcedure.query(async ({ ctx, input }) => {
    const columns = await ctx.db.column.findMany({
      include: {
        tasks: { include: { subTasks: true } }
      }
    });

    const data = columns.map(({ createdAt, tasks, updatedAt, boardId, ...column }) => ({
      ...column,
      createdAt: createdAt.toString(),
      tasks: tasks.map(({ createdAt, updatedAt, boardId, columnId, subTasks, ...task }) => ({
        ...task,
        createdAt: createdAt.toString(),
        subTasks: subTasks.map(({ createdAt, updatedAt, taskId, ...subTask }) => ({
          ...subTask,
          createdAt: createdAt.toString()
        }))
      }))
    }));

    return {
      column: data || []
    };
  })
});
