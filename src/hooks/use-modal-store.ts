import { create } from 'zustand';
import { Board, Column, Task } from '@/types';

export type ModalType = 'addNewTask' | 'addNewColumn' | 'addNewBoard';

interface ModalData {
  task?: Partial<Task>;
  board?: Partial<Board>;
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
