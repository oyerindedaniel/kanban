'use client';

import Column from '@/components/column';
import Task from '@/components/task';
import { Button } from '@/components/ui/button';
import ErrorComponent from '@/components/ui/error';
import Loading from '@/components/ui/loading';
import { useModal } from '@/hooks/use-modal-store';
import { api } from '@/trpc/react';
import { useEffect, useMemo, useState } from 'react';

export default function Board({ params: { slug } }: { params: { slug: string } }) {
  const { onOpen } = useModal();
  const [activeBoardId, setActiveBoardId] = useState('');

  const data = api.column.findByBoardSlug.useQuery(
    { slug },
    {
      refetchInterval: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false
    }
  );

  useEffect(() => {
    const boardId = data?.data?.data?.[0]?.boardId;
    if (!!boardId) setActiveBoardId(boardId);
  }, [data]);

  const columns = useMemo(() => {
    if (data) {
      return data?.data?.data;
    }
    return [];
  }, [data]);

  const GAP = 32;
  const ADD_COLUMN_WIDTH = 288;
  const COLUMN_WIDTH = 320;

  return (
    <div>
      {data.isLoading || data.isRefetching ? (
        <Loading size="48" description="loading columns" />
      ) : data.isError ? (
        <ErrorComponent
          description="An error occurred."
          refetchButtonText="Try Again"
          refetch={data.refetch()}
          isRefetching={data.isRefetching}
        />
      ) : (
        <>
          {columns && columns?.length > 0 ? (
            <div
              style={{
                gap: `${GAP}px`,
                width: `calc(${columns?.length + 1 * GAP + columns?.length * COLUMN_WIDTH + ADD_COLUMN_WIDTH}px)`,
                gridTemplateColumns: `repeat(${columns?.length + 1}, minmax(0, 1fr))`
              }}
              className="grid"
            >
              {columns.map((column) => (
                <div style={{ maxWidth: `${COLUMN_WIDTH}px` }} key={column.id}>
                  <Column column={column} />
                  <div className="flex flex-col gap-6">
                    {column.tasks?.map((task) => <Task key={task?.id} task={task} />)}
                  </div>
                </div>
              ))}

              <div
                style={{ maxWidth: `${ADD_COLUMN_WIDTH}px` }}
                onClick={() => onOpen('addNewColumn', { board: activeBoardId })}
                className="min-h-[75vh] bg-gradient-to-b from-brand-sky-blue/100 to-brand-light-blue/50 justify-center flex rounded-lg cursor-pointer"
              >
                <p className="my-auto font-medium text-brand-regent-grey hover:text-brand-iris">
                  + New Column
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-[75vh]">
              <p className="text-brand-regent-grey font-medium mb-8">
                This board is empty. Create a new column to get started.
              </p>
              <Button
                variant="default"
                onClick={() => onOpen('addNewColumn', { board: activeBoardId })}
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
