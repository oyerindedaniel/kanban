import { z } from 'zod';

import { createTRPCRouter, publicProcedure } from '@/server/api/trpc';
import { createColumnsSchema, subTasksSchema } from '@/types';
import { TRPCError } from '@trpc/server';

export const columnRouter = createTRPCRouter({
  create: publicProcedure.input(createColumnsSchema).mutation(async ({ ctx, input }) => {
    const { columns, boardId } = input;
    const createdColumns = await Promise.all(
      columns.map((column) => {
        return ctx.db.column.create({
          data: {
            name: column.name,
            boardId
          },
          include: {
            tasks: { include: { subTasks: true } }
          }
        });
      })
    );

    return {
      data: createdColumns
    };
  }),
  update: publicProcedure.input(subTasksSchema).mutation(async ({ ctx, input }) => {
    const { columnId, previousColumnId, taskId, subTasks } = input;

    console.log({ columnId, previousColumnId, taskId });

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
  findById: publicProcedure
    .input(
      z.object({
        id: z.string()
      })
    )
    .query(async ({ ctx, input }) => {
      const { id } = input;

      const column = await ctx.db.column.findUnique({
        where: {
          id
        },
        include: {
          tasks: {
            include: { subTasks: true },
            orderBy: {
              createdAt: 'desc'
            }
          }
        }
      });

      return {
        data: column
      };
    }),
  findByBoardSlug: publicProcedure
    .input(
      z.object({
        slug: z.string()
      })
    )
    .query(async ({ ctx, input }) => {
      const { slug } = input;

      const columns = await ctx.db.column.findMany({
        where: {
          board: {
            slug
          }
        },
        include: {
          board: true,
          tasks: {
            include: { subTasks: true },
            orderBy: {
              createdAt: 'desc'
            }
          }
        }
      });

      return {
        data: columns
      };
    }),
  findByBoardId: publicProcedure
    .input(
      z.object({
        boardId: z.string()
      })
    )
    .query(async ({ ctx, input }) => {
      const { boardId } = input;

      const columns = await ctx.db.column.findMany({
        where: {
          boardId
        },
        include: {
          tasks: {
            include: { subTasks: true },
            orderBy: {
              createdAt: 'desc'
            }
          }
        }
      });

      return {
        data: columns
      };
    }),
  findAll: publicProcedure.query(async ({ ctx, input }) => {
    const columns = await ctx.db.column.findMany({
      include: {
        tasks: {
          include: { subTasks: true },
          orderBy: {
            createdAt: 'desc'
          }
        }
      }
    });

    return {
      data: columns
    };
  })
});
