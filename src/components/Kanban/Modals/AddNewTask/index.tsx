/* eslint-disable @typescript-eslint/no-unsafe-member-access */
'use client';

import { type ChangeEvent, useState } from 'react';
import { type FC } from 'react';
import { type AddNewTaskProps } from './types';
import { Button } from '@/components/ui/button';
import { Modal, ModalBody, ModalTitle, ModalFooter } from '@/components/ui/Modal';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
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
  interface FormValue {
    subtask: string;
  }
  const [formValues, setFormValues] = useState<FormValue[]>([{ subtask: '' }]);

  const handleChange = (i: number, e: ChangeEvent<HTMLInputElement>) => {
    setFormValues((prevFormValues) =>
      prevFormValues.map((formValue, index) =>
        index === i ? { ...formValue, [e.target.name]: e.target.value } : formValue
      )
    );
  };

  const addFormFields = () => {
    setFormValues([...formValues, { subtask: '' }]);
  };

  const removeFormFields = (i: number) => {
    setFormValues((prevFormValues) => prevFormValues.filter((_, index) => index !== i));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div>
        <ModalTitle>
          <h4 className="text-lg text-black dark:text-white">Add New Task</h4>
        </ModalTitle>

        <ModalBody>
          <div className="grid w-full items-left gap-1.5">
            <Label className="mb-2 text-brand-regent-grey">Title</Label>
            <Input className="mb-2" placeholder="Email" />

            <Label className="mb-2 text-brand-regent-grey">Description</Label>
            <Textarea placeholder="Type your message here." />

            <Label className="my-2 text-brand-regent-grey">Subtasks</Label>
            {formValues.map((element, index) => (
              <div className="" key={index}>
                <div className="flex items-center gap-3">
                  <Input className="w-full" onChange={(e) => handleChange(index, e)} />

                  {index ? (
                    <>
                      <Button
                        className="font-bold text-xl h-10 text-brand-regent-grey"
                        size="sm"
                        onClick={() => removeFormFields(index)}
                        variant={null}
                      >
                        X
                      </Button>
                    </>
                  ) : null}
                </div>
              </div>
            ))}

            <Button
              className="bg-brand-iris/10 rounded-[100px] mb-5 mt-3 font-bold w-full text-brand-iris  hover:bg-brand-iris/10"
              onClick={() => addFormFields()}
              size={'lg'}
            >
              + Add New Subtask
            </Button>

            <Label className="mb-2 text-brand-regent-grey">Status</Label>
            <select name="" id="" className="w-full rounded-md border-brand-regent-grey/20">
              <option value="todo">Todo</option>
            </select>
          </div>
        </ModalBody>

        <ModalFooter>
          <Button
            className="bg-brand-iris rounded-[100px] font-medium w-full text-white mt-6 hover:bg-brand-biloba-flower hover:text-white"
            size={'lg'}
          >
            Create Task
          </Button>
        </ModalFooter>
      </div>
    </Modal>
  );
};

export default AddNewTaskModal;
