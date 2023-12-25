'use client';

import { type FC } from 'react';
import { type AddNewTaskProps } from './types';
import { Button } from '@/components/ui/button';
import { Modal, ModalBody, ModalTitle, ModalFooter } from '@/components/ui/Modal';


const AddNewTaskModal: FC<AddNewTaskProps> = ({ isOpen, onClose }) => {
    
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="text-center">
        <ModalTitle>&nbsp;</ModalTitle>

        <ModalBody>
          <div className=" flex justify-center">
            <p>sfdsfs</p>
          </div>

          <div className="my-8">
            <h3 className="text-3xl font-medium">Post No Debit!</h3>
            <p className="mt-4 text-base text-[#636363]">
              The debit account in currently on Post No Debit (PND). Would you like to force debit?
            </p>
          </div>

          <Button className="w-full bg-iris" size="lg" onClick={() => onClose()}>
            Cancel
          </Button>

          <Button
            variant="ghost"
            className="mt-2
          w-full text-[#636363]"
            size="lg"
          >
            Force Debit
          </Button>
        </ModalBody>

        <ModalFooter>&nbsp;</ModalFooter>
      </div>
    </Modal>
  );
};

export default AddNewTaskModal;
