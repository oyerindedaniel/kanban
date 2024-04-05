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
import { useAppSelector } from '@/store/hooks';
import { api } from '@/trpc/react';
import { createTaskSchema, type CreateSubTask, type CreateTask } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { ReloadIcon } from '@radix-ui/react-icons';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { useFieldArray, useForm, type FieldArrayMethodProps } from 'react-hook-form';
import { RiCloseLine } from 'react-icons/ri';

const AddNewTaskModal = () => {
  const router = useRouter();

  const { columns } = useAppSelector((state) => state.GlobalService);

  const { isOpen, onClose, type, data } = useModal();

  const isModalOpen = isOpen && type === 'addNewTask';

  const form = useForm<CreateTask>({
    resolver: zodResolver(createTaskSchema)
  });

  const mutateAddTask = api.task.create.useMutation({
    onSuccess: (data) => {
      form.reset();
      onClose();
      router.refresh();
    },
    onError: (error) => {
      console.error(error);
    }
  });

  const {
    register,
    control,
    reset,
    setValue,
    getValues,
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

  const addNewTask = useCallback(
    (value: CreateSubTask, options?: FieldArrayMethodProps) => {
      append(value);
      // clearErrors();
    },
    [errors, append, clearErrors]
  );

  useEffectOnce(() => {
    if (fields.length === 0) {
      addNewTask({ name: '' });
    }
  });

  const onSubmit = (data: CreateTask) => {
    mutateAddTask.mutate({ ...data });
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-white text-black overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-lg text-black dark:text-white">Add New Task</DialogTitle>
        </DialogHeader>
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
                <div key={Idx}>
                  <div className="w-full flex items-center gap-2">
                    <FormField
                      control={control}
                      name={`subTasks.${Idx}.name`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input placeholder={`Subtask ${Idx + 1}`} {...field} />
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
              onClick={() => addNewTask({ name: '' })}
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
                disabled={mutateAddTask.isLoading}
                variant="default"
                className="font-medium w-full my-6"
                size="lg"
              >
                {mutateAddTask.isLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
                Create Task
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddNewTaskModal;
