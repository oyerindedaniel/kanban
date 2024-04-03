import { type Column, type SubTask, type Task } from '@prisma/client';

export type IColumn = Column & {
  tasks: Array<Task & { subtasks: Array<SubTask> }>;
};

/**
 * Converts columns data into a formatted representation with stringified date values.
 * @param {Array} columns - Array of column objects.
 * @returns {Array} - Formatted columns data.
 */
export function formatColumnsData(columns: Array<IColumn>) {
  /**
   * Converts date objects to string representations.
   * @param {Date} date - Date object.
   * @returns {String} - String representation of the date.
   */
  function formatDate(date: Date) {
    return date.toString();
  }

  return columns.map((column) => ({
    ...column,
    createdAt: formatDate(column.createdAt),
    updatedAt: formatDate(column.updatedAt),
    tasks: column.tasks.map((task) => ({
      ...task,
      createdAt: formatDate(task.createdAt),
      updatedAt: formatDate(task.updatedAt),
      subTasks: task.subtasks.map((subTask) => ({
        ...subTask,
        createdAt: formatDate(subTask.createdAt),
        updatedAt: formatDate(subTask.updatedAt)
      }))
    }))
  }));
}
