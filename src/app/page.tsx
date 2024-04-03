'use client';

import { Button } from '@/components/ui/button';
import ErrorComponent from '@/components/ui/error';
import Loading from '@/components/ui/loading';
import { useModal } from '@/hooks/use-modal-store';
import { api } from '@/trpc/react';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo } from 'react';

const PlatformLaunch = () => {
  const router = useRouter();

  const { onOpen } = useModal();

  const data = api.board.findAll.useQuery(undefined, {
    refetchInterval: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    retry: false
  });

  const boards = useMemo(() => {
    if (data) {
      return data?.data?.data;
    }
    return [];
  }, [data]);

  useEffect(() => {
    if (boards && boards?.length > 0) {
      router.push(`/board/${boards[0]?.id}`);
    }
  }, [boards]);

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
          {boards && boards?.length > 0 ? (
            <></>
          ) : (
            <div className="flex flex-col items-center justify-center h-[75vh]">
              <p className="text-brand-regent-grey font-medium">
                This platform is empty. Create a new board to get started.
              </p>
              <Button
                className="mt-8 bg-brand-iris rounded-[100px] hover:bg-brand-biloba-flower hover:text-white"
                onClick={() => onOpen('addNewBoard')}
              >
                + Add New Board
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PlatformLaunch;
