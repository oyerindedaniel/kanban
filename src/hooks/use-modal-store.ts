import { type ColumnProps } from '@/components/column';
import { type TaskProps } from '@/components/task';
import { type Board } from '@prisma/client';
import { create } from 'zustand';

export type ModalType =
  | 'addNewTask'
  | 'addNewColumn'
  | 'addNewBoard'
  | 'viewTask'
  | 'deleteTask'
  | 'deleteBoard';

interface ModalData {
  task?: TaskProps['task'];
  board?: Board;
  column?: ColumnProps['column'];
  asEdit?: boolean;
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
  onClose: () => set({ type: null, isOpen: false, data: {} })
}));
