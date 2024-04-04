import { z } from 'zod';

import { createTRPCRouter, publicProcedure } from '@/server/api/trpc';
import { createBoardSchema } from '@/types';
import { generateUniqueSlug } from '../lib/utils';

export const boardRouter = createTRPCRouter({
  create: publicProcedure.input(createBoardSchema).mutation(async ({ ctx, input }) => {
    const { name, columns } = input;
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
          columns: { include: { tasks: true } }
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
          columns: { include: { tasks: true } }
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
      }
    });

    return {
      data: boards || []
    };
  })
});
