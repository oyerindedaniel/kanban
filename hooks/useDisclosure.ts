import { useState, useCallback } from 'react';

export interface DisclosureState {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useDisclosure = (): DisclosureState => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  const onClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  return {
    isOpen,
    onOpen,
    onClose
  };
};
