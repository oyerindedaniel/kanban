import { createTRPCRouter, publicProcedure } from '@/server/api/trpc';
import { subTasksSchema } from '@/types';

export const subTaskRouter = createTRPCRouter({
  update: publicProcedure.input(subTasksSchema).mutation(async ({ ctx, input }) => {
    const { columnId, previousColumnId, taskId, subTasks } = input;

    const subTaskUpdates = subTasks.map((subTask) => ({
      where: { id: subTask.id },
      data: { isCompleted: subTask.isCompleted }
    }));

    await ctx.db.column.update({
      where: { id: columnId },
      data: {
        tasks: {
          update: {
            where: { id: taskId },
            data: {
              subTasks: {
                updateMany: subTaskUpdates
              }
            }
          }
        }
      }
    });

    return {
      data: true
    };
  })
});
