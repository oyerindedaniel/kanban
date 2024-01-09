import { z } from 'zod';

import { createTRPCRouter, publicProcedure } from '@/server/api/trpc';
import { taskSchema } from '@/types';
import { handleServerError } from '../lib/error';
import { TRPCError } from '@trpc/server';

export const taskRouter = createTRPCRouter({
  create: publicProcedure.input(taskSchema).mutation(async ({ ctx, input }) => {
    const { name, description, columnId, subTasks, boardId } = input;

    const task = await ctx.db.task.create({
      data: {
        name,
        description,
        board: {
          connect: {
            id: boardId
          }
        },
        column: {
          connect: {
            id: columnId
          }
        },
        subTasks: {
          create: subTasks
        }
      },
      include: {
        subTasks: true
      }
    });

    return {
      data: task
    };
  })
});
