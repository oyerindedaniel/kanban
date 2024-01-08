/* eslint-disable @typescript-eslint/no-unsafe-member-access */
'use client';

import { type ChangeEvent, useState } from 'react';
import { type FC } from 'react';
import { type SideBarProps } from './types';
import { Button } from '@/components/ui/button';
import { Modal, ModalBody, ModalTitle, ModalFooter } from '@/components/ui/Modal';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const SideBarModal: FC<SideBarProps> = ({ isOpen, onClose }) => {
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
        <ModalTitle>Add New Board</ModalTitle>

        <ModalBody>
          <div className="grid w-full max-w-sm  items-left gap-1.5">
            <Label className="dark:text-white mb-2 text-brand-regent-grey">Name</Label>
            <Input
              placeholder="e.g. Web Design"
              className="dark:bg-brand-regent-grey/25 dark:text-white"
            />

            <Label className="my-2 text-brand-regent-grey dark:text-white">Columns</Label>
            {formValues.map((element, index) => (
              <div className="form-inline" key={index}>
                <div className="grid grid-cols-12 gap-2">
                  <div className="col-span-11">
                    <Input
                      className="mb-3 dark:bg-brand-regent-grey/25 dark:text-white"
                      onChange={(e) => handleChange(index, e)}
                    />
                  </div>

                  {index ? (
                    <>
                      <Button
                        className="col-span-1 font-bold text-xl text-brand-regent-grey"
                        size={'sm'}
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
            <div>
              <Button
                className="dark:bg-white dark:hover:bg-white bg-brand-iris/10 rounded-[100px] font-bold w-full text-brand-iris mb-6 hover:bg-brand-iris/10"
                onClick={() => addFormFields()}
                size={'lg'}
              >
                + Add New Column
              </Button>
            </div>
          </div>
        </ModalBody>

        <ModalFooter>
          <Button
            className="bg-brand-iris rounded-[100px] font-medium w-full text-white mt-6 hover:bg-brand-biloba-flower "
            size={'lg'}
          >
            Create New Board
          </Button>
        </ModalFooter>
      </div>
    </Modal>
  );
};

export default SideBarModal;
