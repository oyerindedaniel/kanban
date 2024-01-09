import { z, ZodType, ZodTypeDef } from 'zod';
import { type store } from '@/store';

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

const subTaskSchema = z.object({
  id: z.string().optional(),
  name: z.string().trim().min(1, { message: 'Can’t be empty' }),
  isCompleted: z.boolean().optional(),
  currentStatus: z.string().optional(),
  taskId: z.string().optional(),
  boardId: z.string().optional()
});

const taskSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string(),
  boardId: z.string().optional(),
  columnId: z.string(),
  // board: boardSchema,
  subTasks: z.array(subTaskSchema)
});

const columnSchema = z.object({
  id: z.string().optional(),
  name: z.string().trim().min(1, { message: 'Can’t be empty' })
});

const baseBoardSchema = z.object({
  name: z.string().trim().min(1, { message: 'Can’t be empty' }),
  columns: z.array(columnSchema)
});

type BaseBoard = z.infer<typeof baseBoardSchema>;

const createBoardSchema = baseBoardSchema;

const boardSchema = baseBoardSchema.extend({
  id: z.string(),
  tasks: z.array(taskSchema),
  subTasks: z.array(subTaskSchema)
});

type Board = z.infer<typeof boardSchema>;

export { taskSchema, subTaskSchema, boardSchema, createBoardSchema };

type Column = z.infer<typeof columnSchema>;
type SubTask = z.infer<typeof subTaskSchema>;
type Task = z.infer<typeof taskSchema>;

export type { SubTask, Task, Board, BaseBoard, Column };
