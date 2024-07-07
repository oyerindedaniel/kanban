'use client';

import { useEffect, useState } from 'react';

import AddNewBoard from '../components/modals/add-new-board';
import AddNewColumnModal from '../components/modals/add-new-column';
import AddNewTaskModal from '../components/modals/add-new-task';
import DeleteBoard from '../components/modals/delete-board';
import DeleteTask from '../components/modals/delete-task';
import ViewTask from '../components/modals/view-task';

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  // const { board } = useAppSelector((state) => state.GlobalService);

  // const columns = getColumnsByBoardSlug(board?.slug!);

  return (
    <>
      <AddNewBoard />
      <AddNewColumnModal />
      <AddNewTaskModal />
      <ViewTask />
      <DeleteTask />
      <DeleteBoard />
    </>
  );
};
