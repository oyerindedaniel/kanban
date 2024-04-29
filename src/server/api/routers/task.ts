import { createTRPCRouter, publicProcedure } from '@/server/api/trpc';
import { createTaskSchema } from '@/types';
import { TRPCError } from '@trpc/server';
import cookie from 'cookie';
import { z } from 'zod';
import { handleServerError } from '../lib/error';

export const taskRouter = createTRPCRouter({
  create: publicProcedure.input(createTaskSchema).mutation(async ({ ctx, input }) => {
    const { name, description, columnId, subTasks, boardId } = input;
    if (ctx.resHeaders) {
      console.log('Ddd');
      ctx.resHeaders.set(
        'set-cookie',
        cookie.serialize('access_refresh_token', 'daniel-mitchell_davies-daniel', {
          httpOnly: true,
          secure: Boolean(Number(process.env.COOKIE_SECURE ?? 0)),
          sameSite: 'lax'
        })
      );
    }

    console.log('token--------', ctx.cookies().get('access_refresh_token')?.value);

    // console.log('ctx.cooi', ctx.cookies);
    // if (ctx.cookies) {
    //   console.log('ctx.cooiinnnnnnnnnnnnnnnnnn', ctx.cookies);
    //   console.log('inheregetting', ctx.cookies().get('name'));
    //   ctx.cookies().set({
    //     name: 'boyyy',
    //     value: 'CHARIS IOOOOOO',
    //     httpOnly: true,
    //     path: '/'
    //   });
    // }

    try {
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
    } catch (error) {
      const { type, message } = handleServerError(error);

      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: type === 'prisma' ? 'Duplicate task fields detected on the same column.' : message
      });
    }
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
