import Columns from '@/components/columns';
import NoColumn from '@/components/no-column';
import { api } from '@/trpc/server';
import { redirect } from 'next/navigation';

interface BoardPageProps {
  params: { slug: string };
}

export default async function BoardPage({ params: { slug } }: BoardPageProps) {
  const data = await api.column.findByBoardSlug.query({ slug });

  const columns = data?.data;

  const board = data?.data[0]?.board;

  if (!board) {
    return redirect('/');
  }

  return (
    <div>
      {columns && columns?.length > 0 ? (
        <Columns columns={columns} activeBoard={board} />
      ) : (
        <NoColumn activeBoard={board} />
      )}
    </div>
  );
}
