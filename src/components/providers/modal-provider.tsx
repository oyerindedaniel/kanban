'use client';

import { useEffect, useState } from 'react';

import AddNewColumnModal from '../modals/add-new-column';
import AddNewBoard from '../modals/add-board';
import AddNewTaskModal from '../modals/add-new-task';

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <AddNewColumnModal />
      <AddNewBoard />
      <AddNewTaskModal />
    </>
  );
};
