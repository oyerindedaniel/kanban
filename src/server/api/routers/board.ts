import { z } from 'zod';

import { createTRPCRouter, publicProcedure } from '@/server/api/trpc';
import { createBoardSchema } from '@/types';
import { TRPCError } from '@trpc/server';
import { generateUniqueSlug } from '../lib/utils';

export const boardRouter = createTRPCRouter({
  create: publicProcedure.input(createBoardSchema).mutation(async ({ ctx, input }) => {
    const { name, columns } = input;

    const existedBoard = await ctx.db.board.findFirst({
      where: {
        name: name.toLowerCase()
      }
    });

    if (existedBoard) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'Board Name exist.'
      });
    }

    const slug = await generateUniqueSlug(name, ctx);

    const boardWithColumns = await ctx.db.board.create({
      data: {
        name: name.toLowerCase(),
        slug,
        columns: {
          create: columns
        }
      },
      include: {
        columns: true
      }
    });

    return {
      data: boardWithColumns
    };
  }),
  update: publicProcedure.input(createBoardSchema).mutation(async ({ ctx, input }) => {
    const { name, columns } = input;

    if (!columns || (columns && columns.length === 0)) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'Enter at least one column'
      });
    }

    const boardId = columns[0]?.boardId;

    const existingBoard = await ctx.db.board.findUnique({
      where: { id: boardId },
      include: { columns: true }
    });

    if (!existingBoard) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'Board does not exist'
      });
    }

    const columnsToUpdate = [];
    const columnsToDelete = [];

    for (const existingColumn of existingBoard.columns) {
      const matchingColumn = columns.find((column) => column.id === existingColumn.id);

      if (matchingColumn) {
        columnsToUpdate.push({
          where: { id: existingColumn.id },
          data: { name: matchingColumn.name }
        });
      } else {
        columnsToDelete.push({ id: existingColumn.id });
      }
    }

    await ctx.db.board.update({
      where: {
        id: boardId
      },
      data: {
        name,
        columns: {
          updateMany: columnsToUpdate,
          deleteMany: columnsToDelete,
          create: columns.filter((column) => !column.id)
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

      await ctx.db.board.delete({
        where: {
          id
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

      const column = await ctx.db.board.findUnique({
        where: {
          id
        },
        include: {
          columns: {
            include: {
              tasks: true
            },
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
  findBySlug: publicProcedure
    .input(
      z.object({
        slug: z.string()
      })
    )
    .query(async ({ ctx, input }) => {
      const { slug } = input;

      const column = await ctx.db.board.findUnique({
        where: {
          slug
        },
        include: {
          columns: {
            include: { tasks: true },
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
  findAll: publicProcedure.query(async ({ ctx, input }) => {
    const boards = await ctx.db.board.findMany({
      select: {
        id: true,
        name: true,
        slug: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return {
      data: boards || []
    };
  })
});
