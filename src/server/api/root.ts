import { postRouter } from '@/server/api/routers/post';
import { createTRPCRouter } from '@/server/api/trpc';
import { boardRouter } from './routers/board';
import { columnRouter } from './routers/column';
import { subTaskRouter } from './routers/subtask';
import { taskRouter } from './routers/task';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  board: boardRouter,
  task: taskRouter,
  column: columnRouter,
  subTask: subTaskRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
