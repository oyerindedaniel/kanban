'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useEffectOnce } from '@/hooks';
import { useModal } from '@/hooks/use-modal-store';
import { formatError, type ErrorObject } from '@/lib/utils';
import { useAppSelector } from '@/store/hooks';
import { api } from '@/trpc/react';
import { createTaskSchema, type CreateSubTask, type CreateTask } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { ReloadIcon } from '@radix-ui/react-icons';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { useFieldArray, useForm, type FieldArrayMethodProps } from 'react-hook-form';
import { RiCloseLine } from 'react-icons/ri';
import ErrorAlert from '../ui/error-response';
import { useToast } from '../ui/use-toast';

const AddNewTaskModal = () => {
  const router = useRouter();

  const { toast } = useToast();

  const { columns } = useAppSelector((state) => state.GlobalService);

  const { isOpen, onClose, type, data } = useModal();

  const isModalOpen = isOpen && type === 'addNewTask';

  const asEdit = (data?.asEdit && isModalOpen) ?? false;

  const taskId = asEdit ? data?.task!.id : '';
  const taskName = asEdit ? data?.task!.name : '';
  const taskDescription = asEdit ? data?.task!.description : '';
  const columnId = asEdit ? data?.task!.columnId : '';
  const subTasks = asEdit
    ? data?.task?.subTasks.map((subTask) => ({ ...subTask, taskId }))
    : [{ name: '' }];
  const boardId = asEdit ? data?.task?.boardId : '';

  const activeBoardId = columns?.[0]?.boardId ?? '';

  const form = useForm<CreateTask>({
    resolver: zodResolver(createTaskSchema),
    // @ts-ignore
    values: { name: taskName, description: taskDescription, columnId, subTasks, boardId }
  });

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

  const removeColumn = (Idx: number) => {
    remove(Idx);
  };

  const addNewSubTask = useCallback(
    (value: CreateSubTask, options?: FieldArrayMethodProps) => {
      append(value);
      // clearErrors();
    },
    [errors, append, clearErrors]
  );

  useEffectOnce(() => {
    if (fields.length === 0) {
      addNewSubTask({ name: '' });
    }
  });

  const mutateAddTask = api.task.create.useMutation({
    onSuccess: () => {
      form.reset();
      onClose();
      router.refresh();
    },
    onError: (error) => {
      console.error(error);
    }
  });

  const mutateUpdateTask = api.task.update.useMutation({
    onSuccess: () => {
      form.reset();
      onClose();
      router.refresh();
    },
    onError: (error) => {
      console.error(error);
    }
  });

  const onSubmit = (data: CreateTask) => {
    const subTasks = data?.subTasks;

    if (!subTasks || (subTasks && subTasks.length === 0)) {
      return toast({
        variant: 'destructive',
        description: 'Enter at least one subtask'
      });
    }

    if (asEdit) {
      return mutateUpdateTask.mutate(data);
    }

    mutateAddTask.mutate({ ...data, boardId: activeBoardId });
  };

  const isLoading = mutateAddTask.isLoading || mutateUpdateTask.isLoading;

  const handleClose = () => {
    reset();
    onClose();
  };

  console.log(fields);

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-white text-black overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-lg text-black dark:text-white">
            {asEdit ? 'Edit' : 'Add'} New Task
          </DialogTitle>
        </DialogHeader>
        {mutateAddTask.isError && (
          <ErrorAlert errors={formatError(mutateAddTask.error?.shape?.data as ErrorObject)} />
        )}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel required>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Take coffee break" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel required>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormLabel className="mb-3 inline-block" required>
              Subtasks
            </FormLabel>
            <div className="flex flex-col gap-3">
              {fields.map((column, Idx) => (
                <div key={column.id}>
                  <div className="w-full flex items-center gap-2">
                    <FormField
                      control={control}
                      name={`subTasks.${Idx}.name`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              defaultValue={column.name}
                              placeholder={`Subtask ${Idx + 1}`}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="button"
                      className="font-bold text-xl h-10 text-brand-regent-grey"
                      size="sm"
                      onClick={() => removeColumn(Idx)}
                      variant="unstyled"
                    >
                      <RiCloseLine size="24px" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <Button
              type="button"
              className="font-bold w-full my-4"
              variant="secondary"
              onClick={() => addNewSubTask({ name: '' })}
              size="lg"
            >
              + Add New SubTask
            </Button>
            <FormField
              control={form.control}
              name="columnId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full rounded-md dark:border-brand-bright-grey border-input text-black dark:text-white bg-white dark:bg-brand-ebony-clay">
                        <SelectValue placeholder="Select a status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {columns && columns.length > 0 ? (
                        columns.map((column) => (
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
            <DialogFooter className="px-6 py-4">
              <Button
                type="submit"
                disabled={isLoading}
                variant="default"
                className="font-medium w-full my-6"
                size="lg"
              >
                {isLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
                {asEdit ? 'Update Task' : 'Create Task'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddNewTaskModal;
