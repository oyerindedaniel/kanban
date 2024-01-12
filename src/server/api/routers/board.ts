import { z } from 'zod';

import { createTRPCRouter, publicProcedure } from '@/server/api/trpc';
import { createBoardSchema, boardSchema } from '@/types';
import { handleServerError } from '../lib/error';
import { TRPCError } from '@trpc/server';

export const boardRouter = createTRPCRouter({
  create: publicProcedure.input(createBoardSchema).mutation(async ({ ctx, input }) => {
    const { name, columns } = input;

  const boardWithColumns = await ctx.db.board.create({
    data: {
      name: name.toLowerCase(),
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
  findAll: publicProcedure.query(async ({ ctx, input }) => {
    const boards = await ctx.db.board.findMany({
      select: {
        id: true,
        name: true
      }
    });

    return {
      boards: boards || []
    };
  })
});

