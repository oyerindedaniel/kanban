import { api } from '@/trpc/server';
import { redirect } from 'next/navigation';
import NoBoard from '../../components/no-board';

export default async function PlatformLaunch() {
  const data = await api.board.findAll.query();

  const boards = data?.data;

  if (boards && boards?.length > 0) {
    return redirect(`/board/${boards[0]?.slug}`);
  }

  return <NoBoard />;
}
