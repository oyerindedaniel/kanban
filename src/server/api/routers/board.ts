import { z } from 'zod';

import { createTRPCRouter, publicProcedure } from '@/server/api/trpc';

export const boardRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call
      // return ctx.db.board.create({
      //   data: {
      //     name: input.name
      //   }
      // });
    }),

  getLatest: publicProcedure.query(({ ctx }) => {
    // return ctx.db.board.findFirst({
    //   orderBy: { createdAt: 'desc' }
    // });
  })
});
