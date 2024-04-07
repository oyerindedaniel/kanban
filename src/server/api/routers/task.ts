import { createTRPCRouter, publicProcedure } from '@/server/api/trpc';
import { createTaskSchema } from '@/types';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';

export const taskRouter = createTRPCRouter({
  create: publicProcedure.input(createTaskSchema).mutation(async ({ ctx, input }) => {
    const { name, description, columnId, subTasks, boardId } = input;

    if (!subTasks || (subTasks && subTasks.length === 0)) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'Enter at least one subtask'
      });
    }

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
  update: publicProcedure.input(createTaskSchema).mutation(async ({ ctx, input }) => {
    const { columnId, name, description, subTasks } = input;

    if (!subTasks || (subTasks && subTasks.length === 0)) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'Enter at least one subtask'
      });
    }

    const taskId = subTasks[0]?.taskId;

    const existingTask = await ctx.db.task.findUnique({
      where: { id: taskId },
      include: {
        subTasks: true
      }
    });

    if (!existingTask) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'Task does not exist'
      });
    }

    const subTasksToUpdate = [];
    const subTasksToDelete = [];

    for (const existingSubTask of existingTask.subTasks) {
      const matchingSubTask = subTasks.find((subTask) => subTask.id === existingSubTask.id);

      if (matchingSubTask) {
        subTasksToUpdate.push({
          where: { id: existingSubTask.id },
          data: { name: matchingSubTask.name }
        });
      } else {
        subTasksToDelete.push({ id: existingSubTask.id });
      }
    }

    await ctx.db.task.update({
      where: {
        id: taskId
      },
      data: {
        name,
        description,
        column: {
          connect: { id: columnId }
        },
        subTasks: {
          updateMany: subTasksToUpdate,
          deleteMany: subTasksToDelete,
          create: subTasks.filter((subTask) => !subTask.id)
        }
      }
    });

    return {
      data: true
    };
  }),
  delete: publicProcedure
    .input(
      z.object({
        id: z.string()
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id } = input;

      await ctx.db.task.delete({
        where: {
          id
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
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return {
      data: tasks || []
    };
  })
});
