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
  }),
  findBy: publicProcedure
    .input(
      z.object({
        activeBoardId: z.string().optional()
      })
    )
    .query(async ({ input: { activeBoardId }, ctx }) => {
      try {
        const columns = await ctx.db.column.findMany({
          where: {
            boardId: activeBoardId
          },
          include: {
            board: true,
            tasks: {
              include: {
                subTasks: true
              }
            }
          }
        });

        // if (!columns || columns.length === 0) {
        //   throw new Error('No columns found for the specified boardId.');
        // }
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
          column: data
        };
      } catch (error) {
        // return {
        //   error: {
        //     message: error.message || 'An error occurred while fetching data.'
        //   }
        // };
      }
    })
});
