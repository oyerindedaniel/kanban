import { z } from 'zod';

import { CreateColumnSchema } from '@/components/modals/add-new-column';
import { createTRPCRouter, publicProcedure } from '@/server/api/trpc';

export const columnRouter = createTRPCRouter({
  create: publicProcedure.input(CreateColumnSchema).mutation(async ({ ctx, input }) => {
    const { columns } = input;
    const createdColumns = await Promise.all(
      columns.map(async (column) => {
        const createdColumn = await ctx.db.column.create({
          data: {
            name: column.name,
            boardId: column.boardId!
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
  findByBoardId: publicProcedure
    .input(
      z.object({
        boardId: z.string()
      })
    )
    .query(async ({ ctx, input }) => {
      const { boardId } = input;

      const column = await ctx.db.column.findMany({
        where: {
          boardId
        },
        include: {
          tasks: { include: { subTasks: true } }
        }
      });

      return {
        data: column
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
