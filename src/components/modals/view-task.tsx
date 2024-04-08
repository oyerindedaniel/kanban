'use client';

import { MoreOptionsIcon } from '@/assets';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { useModal } from '@/hooks/use-modal-store';
import { useAppSelector } from '@/store/hooks';
import { api } from '@/trpc/react';
import { subTasksSchema, type subTaskSchema } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { ReloadIcon } from '@radix-ui/react-icons';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo } from 'react';
import { useFieldArray, useForm, type FieldArrayMethodProps } from 'react-hook-form';
import { type z } from 'zod';
import { type ColumnProps } from '../column';
import { type TaskProps } from '../task';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';

type subTask = z.infer<typeof subTaskSchema>;
type subTasks = z.infer<typeof subTasksSchema>;

const ViewTask = () => {
  const { isOpen, onOpen, onClose, type, data } = useModal();

  const router = useRouter();

  const { columns } = useAppSelector((state) => state.GlobalService);

  const taskId = data?.task?.id ?? '';
  const taskName = data?.task?.name ?? '';
  const taskDescription = data?.task?.description ?? '';
  const taskSubTasks = data?.task?.subTasks ?? [];

  // used to set the initial columnId
  const activeColumn = (columns ?? []).find((column: ColumnProps['column']) =>
    column.tasks.find((task: Omit<TaskProps['task'], 'subTasks'>) => task.id === taskId)
  ) ?? { id: '' };

  const otherNonActiveColumn = (columns ?? []).filter(
    (column: ColumnProps['column']) => column.id !== activeColumn.id
  ) ?? [{ id: '' }];

  const formattedTaskSubTasks = useMemo(() => {
    return taskSubTasks?.map((subTask) => ({
      id: subTask.id,
      isCompleted: subTask.isCompleted!
    }));
  }, [taskSubTasks]);

  const isModalOpen = isOpen && type === 'viewTask';

  const form = useForm<subTasks>({
    resolver: zodResolver(subTasksSchema),
    values: {
      subTasks: formattedTaskSubTasks,
      columnId: activeColumn.id,
      // previousColumnId: undefined,
      taskId
    }
  });

  const subTasks = form.getValues('subTasks');

  const taskSubTasksIsCompletedLength = subTasks?.filter((subTask) => subTask.isCompleted).length;

  // watches for changes in columnId
  const currentActiveColumnId = form.watch('columnId');

  const previousColumnId = form.watch('previousColumnId');

  useEffect(() => {
    const previousColumnId =
      activeColumn.id === currentActiveColumnId ? undefined : activeColumn.id;
    form.setValue('previousColumnId', previousColumnId);
  }, [currentActiveColumnId, activeColumn.id]);

  const {
    control,
    reset,
    clearErrors,
    formState: { errors }
  } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'subTasks'
  });

  const addNewSubTask = useCallback(
    (value: subTask, options?: FieldArrayMethodProps) => {
      append(value);
      // clearErrors();
    },
    [errors, append, clearErrors]
  );

  const mutateUpdateSubTask = api.subTask.update.useMutation({
    onSuccess: () => {
      router.refresh();
    },
    onError: (error) => {
      console.error(error);
    }
  });

  const mutateUpdateColumn = api.column.update.useMutation({
    onSuccess: () => {
      onClose();
      router.refresh();
    },
    onError: (error) => {
      console.error(error);
    }
  });

  const onSubmit = (data: subTasks) => {
    mutateUpdateSubTask.mutate(data);
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  const isSubmitting = mutateUpdateSubTask.isLoading || mutateUpdateColumn.isLoading;

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-white text-black overflow-hidden">
        {isSubmitting && <p className="text-sm text-gray-400">Updating ...</p>}
        <DialogHeader className="pt-4 text-black dark:text-white">
          <DialogTitle className="text-xl flex justify-between">
            <span>{taskName}</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Image className="cursor-pointer" src={MoreOptionsIcon} alt="More options" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48">
                <DropdownMenuItem
                  onClick={() => onOpen('addNewTask', { task: data.task, asEdit: true })}
                  className="cursor-pointer"
                >
                  <span>Edit Task</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => onOpen('deleteTask', { task: data.task })}
                  className="cursor-pointer"
                >
                  <span className="text-brand-valentine-red">Delete Task</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </DialogTitle>
          <DialogDescription className="text-base text-black dark:text-white">
            {taskDescription}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormLabel className="mb-3 inline-block">{`Subtask(s) (${taskSubTasksIsCompletedLength} of ${taskSubTasks?.length})`}</FormLabel>
            <div className="flex flex-col gap-4">
              {fields.map((column, Idx) => (
                <div key={column.id} className="flex flex-col gap-3">
                  <FormField
                    control={form.control}
                    name={`subTasks.${Idx}.isCompleted`}
                    render={({ field }) => (
                      <FormItem className="flex flex-row bg-brand-lavender-mist dark:bg-brand-dark items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            type="submit"
                            disabled={isSubmitting || !!previousColumnId}
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="capitalize">{taskSubTasks[Idx]?.name}</FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              ))}
            </div>
            <div className="mt-2">
              {!!previousColumnId && (
                <FormDescription>Status changed, update status</FormDescription>
              )}
            </div>

            <FormField
              control={form.control}
              name="columnId"
              render={({ field }) => (
                <FormItem className="mt-4">
                  <FormLabel>Status</FormLabel>
                  <Select
                    disabled={isSubmitting}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger
                        // type="submit"
                        className="w-full rounded-md dark:border-brand-bright-grey border-input text-black dark:text-white bg-white dark:bg-brand-ebony-clay"
                      >
                        <SelectValue placeholder="Select a status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {columns && columns.length > 0 ? (
                        columns.map((column: ColumnProps['column']) => (
                          <SelectItem key={column.id} value={column.id}>
                            {column.name}
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem value="">No status, please reload</SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex w-full justify-end mt-2">
              <Button
                disabled={isSubmitting || !previousColumnId}
                leftElement={
                  mutateUpdateColumn.isLoading && (
                    <ReloadIcon className="mr-2 h-2 w-2 animate-spin" />
                  )
                }
                onClick={() => mutateUpdateColumn.mutate(form.getValues())}
                variant="outline"
                className="h-6 text-sm rounded-lg"
              >
                Update status
              </Button>
            </div>
            {/* <DialogFooter className="px-6 py-4">

            </DialogFooter> */}
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ViewTask;
