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
import { api } from '@/trpc/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { type ChangeEvent, useState } from 'react';
import { type FC } from 'react';
import { type SideBarProps } from './types';
import { Button } from '@/components/ui/button';
import { Modal, ModalBody, ModalTitle, ModalFooter } from '@/components/ui/Modal';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { type Board, type BaseBoard, type Column, boardSchema, createBoardSchema } from '@/types';

const SideBarModal: FC<SideBarProps> = ({ isOpen, onClose }) => {
  const form = useForm<BaseBoard>({
    resolver: zodResolver(createBoardSchema)
  });

  const mutateAddBoard = api.board.create.useMutation({
    onSuccess: (data) => {
      form.reset();
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    }
  });

  const {
    control,
    setValue,
    getValues,
    clearErrors,
    formState: { errors }
  } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'columns'
  });

  const removeColumn = (Idx: number) => {
    remove(Idx);
  };

  const addNewColumn = useCallback(
    (value: Column, options?: FieldArrayMethodProps) => {
      append(value);
      // clearErrors();
    },
    [errors, append, clearErrors]
  );

  useEffect(() => {
    if (fields.length === 0) {
      addNewColumn({ name: '' });
    }
  }, [fields]);

  const onSubmit = (data: BaseBoard) => {
    mutateAddBoard.mutate(data);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalTitle>
        <h4 className="text-lg text-black mb-5 dark:text-white">Add New Board</h4>
      </ModalTitle>

      <ModalBody>
        <div className="w-full">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="mb-6">
                    <FormLabel required>Board Name</FormLabel>
                    <FormControl>
                      <Input className="mb-4" placeholder="e.g. Web Design" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormLabel required>Board Columns</FormLabel>
              <div className="flex flex-col gap-3 mt-2">
                {fields.map((column, Idx) => (
                  <div key={Idx}>
                    <div className="w-full flex items-center gap-2">
                      <FormField
                        control={control}
                        name={`columns.${Idx}.name`}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input placeholder={`Todo ${Idx + 1}`} {...field} />
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
                className="font-bold w-full my-6"
                variant="secondary"
                onClick={() => addNewColumn({ name: '' })}
                size="lg"
              >
                + Add New Column
              </Button>
              <Button
                type="submit"
                disabled={mutateAddBoard.isLoading}
                variant="default"
                className="font-medium w-full"
                size="lg"
              >
                {mutateAddBoard.isLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
                Create New Board
              </Button>
            </form>
          </Form>
        </div>
      </ModalBody>

      <ModalFooter>
        &nbsp;
        {/* {mutateAddBoard.error && <p>Something went wrong! {mutateAddBoard.error.message}</p>} */}
      </ModalFooter>
    </Modal>
  );
};

export default SideBarModal;