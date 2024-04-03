'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useEffectOnce } from '@/hooks';
import { useModal } from '@/hooks/use-modal-store';
import { api } from '@/trpc/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { useFieldArray, useForm, type FieldArrayMethodProps } from 'react-hook-form';
import { RiCloseLine } from 'react-icons/ri';
import * as z from 'zod';

const ColumnSchema = z.object({
  name: z.string().trim().min(1, { message: 'Can’t be empty' }),
  boardId: z.string().optional()
});

export const CreateColumnSchema = z.object({
  columns: z.array(ColumnSchema)
});

type CreateColumn = z.infer<typeof CreateColumnSchema>;
type Column = z.infer<typeof ColumnSchema>;

const AddNewColumnModal = () => {
  const router = useRouter();

  const { isOpen, onClose, type, data } = useModal();

  const isModalOpen = isOpen && type === 'addNewColumn';

  const mutateAddColumn = api.column.create.useMutation({
    onSuccess: (data) => {
      form.reset();
      onClose();
      router.refresh();
    },
    onError: (error) => {
      console.error(error);
    }
  });

  const form = useForm<CreateColumn>({
    resolver: zodResolver(CreateColumnSchema)
  });

  const defaultValues = { name: '', boardId: '' };

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
    name: 'columns'
  });

  const onSubmit = (data: CreateColumn) => {
    mutateAddColumn.mutate(data);
  };

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

  useEffectOnce(() => {
    if (fields.length === 0) {
      addNewColumn(defaultValues);
    }
  });

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-white text-black overflow-hidden">
        <DialogHeader className="pt-8">
          <DialogTitle className="text-lg text-black dark:text-white">Add New Column</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="flex flex-col gap-3">
              {fields.map((column, Idx) => (
                <div key={Idx}>
                  <div className="w-full flex items-center gap-2">
                    <FormField
                      control={control}
                      name={`columns.${Idx}.name`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input placeholder={`Column ${Idx + 1}`} {...field} />
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
              onClick={() => addNewColumn(defaultValues)}
              size="lg"
            >
              + Add New Column
            </Button>
            <DialogFooter className="px-6 py-4">
              <Button variant="default" className="rounded-[100px] w-full" size="lg">
                Create New Column(s)
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddNewColumnModal;
