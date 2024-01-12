import { z, ZodType, ZodTypeDef } from 'zod';
import { type store } from '@/store';

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

const createSubTaskSchema = z.object({
  name: z.string().trim().min(1, { message: 'Can’t be empty' }),
  isCompleted: z.boolean().optional(),
  currentStatus: z.string().optional(),
  taskId: z.string().optional()
});

const createTaskSchema = z.object({
  name: z.string().trim().min(1, { message: 'Can’t be empty' }),
  description: z.string(),
  subTasks: z.array(createSubTaskSchema),
  boardId: z.string().optional(),
  columnId: z.string().trim().min(1, { message: 'Can’t be empty' })
});

const subTaskSchema = z.object({
  id: z.string(),
  name: z.string(),
  isCompleted: z.boolean().nullable(),
  currentStatus: z.string().nullable(),
  createdAt: z.string()
});

const taskSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  createdAt: z.string(),
  subTasks: z.array(subTaskSchema)
});

const columnSchema = z.object({
  id: z.string(),
  name: z.string(),
  createdAt: z.string(),
  tasks: z.array(taskSchema)
});

const createColumnSchema = z.object({
  name: z.string().trim().min(1, { message: 'Can’t be empty' })
});

const createBoardSchema = z.object({
  name: z.string().trim().min(1, { message: 'Can’t be empty' }),
  columns: z.array(createColumnSchema)
});

const boardSchema = z.object({
  id: z.string(),
  name: z.string(),
  columns: z.array(createColumnSchema).optional(),
  tasks: z.array(createTaskSchema).optional(),
  createdAt: z.string().optional()
  // subTasks: z.array(subTaskSchema)
});

export {
  createTaskSchema,
  createSubTaskSchema,
  boardSchema,
  createBoardSchema,
  columnSchema,
  subTaskSchema,
  taskSchema
};

type SubTask = z.infer<typeof subTaskSchema>;
type Task = z.infer<typeof taskSchema>;
type Column = z.infer<typeof columnSchema>;
type Board = z.infer<typeof boardSchema>;
type CreateBoard = z.infer<typeof createBoardSchema>;
type CreateColumn = z.infer<typeof createColumnSchema>;
type CreateSubTask = z.infer<typeof createSubTaskSchema>;
type CreateTask = z.infer<typeof createTaskSchema>;

export type { CreateSubTask, CreateTask, Board, Column, Task, SubTask, CreateBoard, CreateColumn };

// type BaseBoard = {
//   name: string;
//   columns: {
//     name: string;
//     tasks: {
//       name: string;
//       description: string;
//       columnId: string;
//       subTasks: {
//         name: string;
//         id?: string | undefined;
//         isCompleted?: boolean | undefined;
//         currentStatus?: string | undefined;
//         createdAt?: Date | undefined;
//         updatedAt?: Date | undefined;
//         taskId?: string | undefined;
//       }[];
//       id?: string | undefined;
//       createdAt?: Date | undefined;
//       updatedAt?: Date | undefined;
//       boardId?: string | undefined;
//     }[];
//     id?: string | undefined;
//     createdAt?: Date | undefined;
//     updatedAt?: Date | undefined;
//     boardId?: string | undefined;
//   }[];
// };
