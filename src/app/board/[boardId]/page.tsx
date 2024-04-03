'use client';

import Column from '@/components/column';
import Task from '@/components/task';
import { Button } from '@/components/ui/button';
import ErrorComponent from '@/components/ui/error';
import Loading from '@/components/ui/loading';
import { useModal } from '@/hooks/use-modal-store';
import { api } from '@/trpc/react';
import { useMemo } from 'react';

export default function Board({ params: { boardId } }: { params: { boardId: string } }) {
  const { onOpen } = useModal();

  const data = api.column.findByBoardId.useQuery(
    { boardId },
    {
      refetchInterval: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      retry: false
    }
  );

  const columns = useMemo(() => {
    if (data) {
      return data?.data?.data;
    }
    return [];
  }, [data]);

  return (
    <div className="relative">
      {(data.isLoading && !data.fetchStatus) || data.isRefetching ? (
        <Loading />
      ) : data.isError ? (
        <ErrorComponent
          description="An error occurred."
          refetchButtonText=" Try Again"
          refetch={data.refetch()}
          isRefetching={data.isRefetching}
        />
      ) : (
        <>
          {columns && columns?.length > 0 ? (
            <div
              className={`grid grid-cols-${columns?.length + 1} gap-8 w-[calc(318px*${
                columns?.length + 1
              })]`}
            >
              {columns.map((column) => (
                <div>
                  <Column column={column} />
                  <div className="flex flex-col gap-6">
                    {column.tasks.map((task) => (
                      <Task key={task?.id} task={task} />
                    ))}
                  </div>
                </div>
              ))}
              <div className="h-[360px] w-72 bg-gradient-to-b from-brand-sky-blue/100 to-brand-light-blue/50 justify-center flex rounded-md cursor-pointer">
                <p
                  className="my-auto font-medium text-brand-regent-grey hover:text-brand-iris"
                  onClick={() => onOpen('addNewColumn')}
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
                onClick={() => onOpen('addNewColumn', { board: { id: boardId } })}
              >
                + Add New Column
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
