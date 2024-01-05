'use client';

import { useState } from 'react';
import TopBar from './Topbar';
import Sidebar from './Sidebar';
import { KanbanLogo, ViewIcon } from '@/assets';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: LayoutProps) => {
  const [isSidebarHidden, setIsSidebarHidden] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarHidden(!isSidebarHidden);
  };

  return (
    <div>
      {!isSidebarHidden ? (
        <div
          className={`fixed h-[calc(100vh-96px)] left-0 bottom-0 z-30  w-[300px] border-[1px] border-gray-200 border-t-0 ${
            isSidebarHidden ? 'hidden' : ''
          }`}
        >
          <Sidebar isSidebarHidden={isSidebarHidden} toggleSidebar={toggleSidebar} />
        </div>
      ) : (
        <div className="text-white bg-brand-iris h-12 w-14 p-5 z-30 absolute bottom-8 rounded-r-[100px] rounded-br-[100px] hover:bg-brand-biloba-flower">
          <Image src={ViewIcon} alt="img" onClick={toggleSidebar} style={{ cursor: 'pointer' }} />
        </div>
      )}

      <div className={`fixed right-0 top-0 z-30 w-full max-w-full`}>
        <TopBar />
      </div>

      <div
        className={cn(
          'dark:bg-brand-dark bg-brand-lavender-mist text-black overflow-auto dark:text-white relative right-0 z-10 transition-all duration-500 mt-24 h-full min-h-[calc(100vh-96px)] p-6',
          isSidebarHidden ? 'ml-0' : 'ml-[300px]'
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
