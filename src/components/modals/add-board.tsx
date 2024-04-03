/* eslint-disable @typescript-eslint/no-unsafe-member-access */
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
import { useModal } from '@/hooks/use-modal-store';
import { api } from '@/trpc/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { ReloadIcon } from '@radix-ui/react-icons';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, type FC } from 'react';
import { useFieldArray, useForm, type FieldArrayMethodProps } from 'react-hook-form';
import { RiCloseLine } from 'react-icons/ri';

import { createBoardSchema, type CreateBoard, type CreateColumn } from '@/types';

const AddNewBoard: FC = () => {
  const router = useRouter();

  const { isOpen, onClose, type, data } = useModal();

  const isModalOpen = isOpen && type === 'addNewBoard';

  const form = useForm<CreateBoard>({
    resolver: zodResolver(createBoardSchema)
  });

  const mutateAddBoard = api.board.create.useMutation({
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
    control,
    reset,
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
    (value: CreateColumn, options?: FieldArrayMethodProps) => {
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

  const onSubmit = (data: CreateBoard) => {
    mutateAddBoard.mutate(data);
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">Add New Column</DialogTitle>
        </DialogHeader>
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
            <DialogFooter className="bg-gray-100 px-6 py-4">
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
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddNewBoard;
