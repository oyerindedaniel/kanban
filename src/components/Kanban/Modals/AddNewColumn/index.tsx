/* eslint-disable @typescript-eslint/no-unsafe-member-access */
'use client';

import { type ChangeEvent, useState } from 'react';
import { type FC } from 'react';
import { type AddNewColumnProps } from './types';
import { Button } from '@/components/ui/button';
import { Modal, ModalBody, ModalTitle, ModalFooter } from '@/components/ui/Modal';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const AddNewColumnModal: FC<AddNewColumnProps> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div>
        <ModalTitle>Add New Column</ModalTitle>

        <ModalBody>
          <div className="grid w-full max-w-sm  items-left gap-1.5">
            <Label className="mb-2 text-brand-regent-grey">Name</Label>
            <Input placeholder="e.g. Todo" />

            <div>
              <Button
                className="bg-brand-iris rounded-[100px] font-bold w-full  mt-6 hover:text-brand-iris hover:bg-brand-zircon"
                size={'lg'}
              >
                + Add New Column
              </Button>
            </div>
          </div>
        </ModalBody>
      </div>
    </Modal>
  );
};

export default AddNewColumnModal;
