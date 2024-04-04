import { z } from 'zod';

import { createTRPCRouter, publicProcedure } from '@/server/api/trpc';
import { createColumnsSchema } from '@/types';

export const columnRouter = createTRPCRouter({
  create: publicProcedure.input(createColumnsSchema).mutation(async ({ ctx, input }) => {
    const { columns, boardId } = input;
    const createdColumns = await Promise.all(
      columns.map(async (column) => {
        const createdColumn = await ctx.db.column.create({
          data: {
            name: column.name,
            boardId
          },
          include: {
            tasks: { include: { subTasks: true } }
          }
        });
        return createdColumn;
      })
    );

    return {
      data: createdColumns
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
          tasks: { include: { subTasks: true } }
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
          tasks: { include: { subTasks: true } }
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
          tasks: { include: { subTasks: true } }
        }
      });

      return {
        data: columns
      };
    }),
  findAll: publicProcedure.query(async ({ ctx, input }) => {
    const columns = await ctx.db.column.findMany({
      include: {
        tasks: { include: { subTasks: true } }
      }
    });

    return {
      data: columns
    };
  })
});
