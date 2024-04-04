import { type Board, type Column, type Task } from '@prisma/client';
import { create } from 'zustand';

export type ModalType = 'addNewTask' | 'addNewColumn' | 'addNewBoard';

interface ModalData {
  task?: Partial<Task>;
  board?: Board['id'];
  column?: Partial<Column>;
}

interface ModalStore {
  type: ModalType | null;
  data: ModalData;
  isOpen: boolean;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
  onClose: () => set({ type: null, isOpen: false })
}));
