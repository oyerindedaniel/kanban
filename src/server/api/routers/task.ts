import { createTRPCRouter, publicProcedure } from '@/server/api/trpc';
import { createTaskSchema, subTasksSchema } from '@/types';
import { TRPCError } from '@trpc/server';

export const taskRouter = createTRPCRouter({
  create: publicProcedure.input(createTaskSchema).mutation(async ({ ctx, input }) => {
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
  }),
  update: publicProcedure.input(subTasksSchema).mutation(async ({ ctx, input }) => {
    const { columnId, previousColumnId, taskId, subTasks } = input;

    if (!previousColumnId || !columnId) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'Column does not exist.'
      });
    }

    await ctx.db.column.update({
      where: { id: columnId },
      data: {
        tasks: {
          connect: { id: taskId }
        }
      }
    });

    return {
      data: true
    };
  }),
  findAll: publicProcedure.query(async ({ ctx, input }) => {
    const tasks = await ctx.db.task.findMany({
      include: {
        subTasks: true
      }
    });

    return {
      tasks: tasks || []
    };
  })
});
