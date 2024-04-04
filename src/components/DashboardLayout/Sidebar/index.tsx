import { api } from '@/trpc/server';
import Sidebar from './sidebar';

export default async function SideBarPage() {
  const data = await api.board.findAll.query();

  return <Sidebar boards={data.data} />;
}
