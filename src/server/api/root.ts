import { postRouter } from '@/server/api/routers/post';
import { boardRouter } from './routers/board';
import { taskRouter } from './routers/task';
import { createTRPCRouter } from '@/server/api/trpc';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  board: boardRouter,
  task: taskRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
