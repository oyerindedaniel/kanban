import { getUserBoards } from '@/app/_data';
import Sidebar from './sidebar';

export default async function SideBarPage() {
  const boards = await getUserBoards();

  return <Sidebar boards={boards} />;
}
