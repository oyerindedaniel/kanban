/* eslint-disable @typescript-eslint/no-unsafe-member-access */
'use client';

import { useCallback, useEffect } from 'react';
import { useForm, useFieldArray, type FieldArrayMethodProps } from 'react-hook-form';
import { RiCloseLine } from 'react-icons/ri';
import { ReloadIcon } from '@radix-ui/react-icons';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription
} from '@/components/ui/form';
import { type FC } from 'react';
import { api } from '@/trpc/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { type AddNewTaskProps } from './types';
import { Button } from '@/components/ui/button';
import { Modal, ModalBody, ModalTitle, ModalFooter } from '@/components/ui/Modal';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { createTaskSchema, type CreateTask, type CreateSubTask } from '@/types';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

const AddNewTaskModal: FC<AddNewTaskProps> = ({ isOpen, onClose }) => {
  const form = useForm<CreateTask>({
    resolver: zodResolver(createTaskSchema)
  });

  const mutateAddTask = api.task.create.useMutation({
    onSuccess: (data) => {
      form.reset();
      onClose();
    },
    onError: (error) => {
      console.log(error);
    }
  });

  const {
    register,
    control,
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

  useEffect(() => {
    if (fields.length === 0) {
      addNewTask({ name: '' });
    }
  }, [fields]);

  const onSubmit = (data: CreateTask) => {
    mutateAddTask.mutate({ ...data, boardId: '166c8c3a-821e-448c-bcdc-5aef97816e06' });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div>
        <ModalTitle>
          <h4 className="text-lg text-black dark:text-white">Add New Task</h4>
        </ModalTitle>

        <ModalBody>
          <div className="w-full">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel required>Title</FormLabel>
                      <FormControl>
                        <Input className="" placeholder="e.g. Take coffee break" {...field} />
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
                          className=""
                          placeholder="e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormLabel required>Subtasks</FormLabel>
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
                <select
                  {...register('columnId', { required: true })}
                  className="w-full rounded-md dark:border-brand-bright-grey border-input text-black dark:text-white bg-white dark:bg-brand-ebony-clay"
                >
                  <option value="079291e5-58c1-4e6a-9275-5103f97db485">Todo</option>
                </select>
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
              </form>
            </Form>
          </div>
        </ModalBody>

        <ModalFooter>&nbsp;</ModalFooter>
      </div>
    </Modal>
  );
};

export default AddNewTaskModal;
