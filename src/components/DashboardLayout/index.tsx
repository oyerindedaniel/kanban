'use client';

import { useState } from 'react';
import TopBar from './Topbar';
import Sidebar from './Sidebar';
import { ViewIcon } from '@/assets';
import Image from 'next/image';

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
          className={`fixed left-0 top-0 z-10 h-full w-[300px] border-[1px] border-gray-200 ${
            isSidebarHidden ? 'none' : ''
          }`}
        >
          <Sidebar isSidebarHidden={isSidebarHidden} toggleSidebar={toggleSidebar} />
        </div>
      ) : (
        <div className="text-white bg-brand-iris h-12 w-14 p-5 absolute bottom-8 rounded-r-[100px] rounded-br-[100px]">
          <Image src={ViewIcon} alt="img" onClick={toggleSidebar} style={{ cursor: 'pointer' }} />
        </div>
      )}

      <div
        className={`relative right-0 z-10 ml-[300px] mt-[45px] h-full min-h-[calc(100vh-45px)] p-6`}
      >
        <div className="fixed right-0 top-0 z-30 w-full max-w-full">
          <TopBar />
        </div>
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
