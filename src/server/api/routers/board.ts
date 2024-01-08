import { z } from 'zod';

import { createTRPCRouter, publicProcedure } from '@/server/api/trpc';
import { createBoardSchema } from '@/types';
import { handleServerError } from '../lib/error';
import { TRPCError } from '@trpc/server';

export const boardRouter = createTRPCRouter({
  create: publicProcedure.input(createBoardSchema).mutation(async ({ ctx, input }) => {
    const { name, columns } = input;

    // try {
    const boardWithColumns = await ctx.db.board.create({
      data: {
        name,
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // } catch (error: any) {
    //   console.error(error);
    //   const { statusCode, message } = handleServerError(error);
    //   // throw new TRPCError({
    //   //   code: 'BAD_REQUEST',
    //   //   message,
    //   //   cause: error
    //   // });
    //   return {
    //     statusCode,
    //     message
    //   };
    // }
  }),
  money: publicProcedure.input(createBoardSchema).mutation(async ({ ctx, input }) => {
    const { name, columns } = input;

    try {
      const boardWithColumns = await ctx.db.board.create({
        data: {
          name,
          columns: {
            create: columns
          }
        },
        include: {
          columns: true
        }
      });

      return {
        greeting: `Hello ${input.name}`,
        daniel: 'daniel'
      };
    } catch (error) {}
  })
});

