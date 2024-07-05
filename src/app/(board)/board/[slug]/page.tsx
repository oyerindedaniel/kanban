import { getColumnsByBoardSlug } from '@/app/_data';
import Columns from '@/components/columns';
import NoColumn from '@/components/no-column';
import { redirect } from 'next/navigation';

interface BoardPageProps {
  params: { slug: string };
}

export default async function BoardPage({ params: { slug } }: BoardPageProps) {
  const columns = await getColumnsByBoardSlug(slug);

  const board = columns[0]?.board;

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
