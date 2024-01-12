'use client';

import { useMemo } from 'react';
import { BiSolidError } from 'react-icons/bi';
import Platform from '@/components/PlatformLayout';
import { Button } from '@/components/ui/button';
import AddNewColumnModal from '@/components/Kanban/Modals/AddNewColumn';
import { useDisclosure } from '@/hooks';
import { type Board } from '@/types';
import { api } from '@/trpc/react';
import Loading from '@/components/ui/loading';
import { useAppDispatch } from '@/store/hooks';
import { setGlobalState } from '@/store/slice/Global';

const PlatformLaunch = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const dispatch = useAppDispatch();

  const data = api.column.findAll.useQuery(undefined, {
    refetchInterval: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false
  });

  const columns = useMemo(() => {
    if (data) {
      //   dispatch(setGlobalState({ dataKey: 'boards', data: data?.data?.boards ?? [] }));
      return data?.data?.column;
    }
    return [];
  }, [data]);

  console.log(columns?.length);

  return data.isLoading || data.isRefetching ? (
    <Loading />
  ) : data.isError ? (
    <div className="flex flex-col items-center justify-center h-[75vh]">
      <span className="text-destructive mb-1">
        <BiSolidError size="85px" fill="currentColor" />
      </span>
      <p className="text-brand-regent-grey mb-3 text-md text-center font-medium">
        An error occurred.
      </p>
      <Button
        className="bg-brand-iris rounded-[100px] hover:bg-brand-biloba-flower hover:text-white"
        onClick={() => data.refetch()}
      >
        Try Again
      </Button>
    </div>
  ) : (
    <>
      <AddNewColumnModal isOpen={isOpen} onClose={onClose} />
      {columns && columns?.length > 0 ? (
        <div className={`grid grid-cols-${columns.length + 1} gap-8 w-[1250px]`}>
          {columns.map((column) => (
            <Platform key={column.id} column={column} />
          ))}
          <div className="h-[360px] w-72 bg-gradient-to-b from-brand-sky-blue/100 to-brand-light-blue/50 justify-center flex rounded-md cursor-pointer">
            <p
              className="my-auto font-medium text-brand-regent-grey hover:text-brand-iris"
              onClick={() => onOpen()}
            >
              + New Column
            </p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-[75vh]">
          <p className="text-brand-regent-grey font-medium">
            This board is empty. Create a new column to get started.
          </p>
          <Button
            className="mt-8 bg-brand-iris rounded-[100px] hover:bg-brand-biloba-flower hover:text-white"
            onClick={() => onOpen()}
          >
            + Add New Column
          </Button>
        </div>
      )}
    </>
  );
};

export default PlatformLaunch;
