import { redirect } from 'next/navigation';
import NoBoard from '../../components/no-board';
import { getUserBoards } from '../_data';

export default async function Platform() {
  const boards = await getUserBoards();

  if (boards && boards?.length > 0) {
    return redirect(`/board/${boards[0]?.slug}`);
  }

  return <NoBoard />;
}
