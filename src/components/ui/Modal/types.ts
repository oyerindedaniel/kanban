import { ReactNode } from 'react';

export interface Modal {
  isOpen: boolean;
  onOpen?: () => void;
  onClose: () => void;
  closeOnOverlayClick?: boolean;
  children: ReactNode;
}

export interface ModalTitle {
  children: ReactNode;
}

export interface ModalBody {
  children: ReactNode;
}

export interface ModalFooter {
  children: ReactNode;
}
