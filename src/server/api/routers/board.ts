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
