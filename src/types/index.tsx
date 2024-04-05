import { type store } from '@/store';
import { z } from 'zod';

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
  isCompleted: z.boolean().default(false)
});

const subTasksSchema = z.object({
  subTasks: z.array(subTaskSchema),
  columnId: z.string(),
  previousColumnId: z.string().optional(),
  taskId: z.string()
});

const taskSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  createdAt: z.string(),
  subTasks: z.array(subTaskSchema)
});

const createColumnSchema = z.object({
  name: z.string().trim().min(1, { message: 'Can’t be empty' })
});

const createColumnsSchema = z.object({
  columns: z.array(createColumnSchema),
  boardId: z.string()
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
  boardSchema,
  createBoardSchema,
  createColumnSchema,
  createColumnsSchema,
  createSubTaskSchema,
  createTaskSchema,
  subTaskSchema,
  subTasksSchema,
  taskSchema
};

type SubTask = z.infer<typeof subTaskSchema>;
type Task = z.infer<typeof taskSchema>;
type CreateColumn = z.infer<typeof createColumnSchema>;
type Board = z.infer<typeof boardSchema>;
type CreateBoard = z.infer<typeof createBoardSchema>;
type CreateColumns = z.infer<typeof createColumnsSchema>;
type CreateSubTask = z.infer<typeof createSubTaskSchema>;
type CreateTask = z.infer<typeof createTaskSchema>;

export type {
  Board,
  CreateBoard,
  CreateColumn,
  CreateColumns,
  CreateSubTask,
  CreateTask,
  SubTask,
  Task
};

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
