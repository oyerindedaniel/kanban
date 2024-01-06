'use client';

import { useState, useEffect } from 'react';
import TopBar from './Topbar';
import Sidebar from './Sidebar';
import { KanbanLogo, ViewIcon } from '@/assets';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { updateUI } from '@/store/slice/UI';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useInitialRender } from '@/hooks/useInitialRender';

interface LayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: LayoutProps) => {
  const { isSideBarOpen } = useAppSelector((state) => state.UIService.UI);

  const [sideBarOpen, setSideBarOpen] = useState<boolean>(true);

  useEffect(() => {
    setSideBarOpen(isSideBarOpen);
  }, []);

  const dispatch = useAppDispatch();

  const toggleSidebar = () => {
    dispatch(
      updateUI({
        isSideBarOpen: !sideBarOpen
      })
    );
    setSideBarOpen((prevVal) => !prevVal);
  };

  return (
    <div>
      {sideBarOpen ? (
        <div
          className={cn(
            'bg-white dark:bg-brand-ebony-clay text-white dark:text-black fixed h-[calc(100vh-96px)] left-0 bottom-0 z-30 w-[300px]',
            sideBarOpen ? '' : 'hidden'
          )}
        >
          <Sidebar isSidebarOpen={sideBarOpen} toggleSidebar={toggleSidebar} />
        </div>
      ) : (
        <div
          onClick={toggleSidebar}
          className="text-white bg-brand-iris h-12 w-14 cursor-pointer p-5 z-30 absolute bottom-8 rounded-r-[100px] rounded-br-[100px] hover:bg-brand-biloba-flower"
        >
          <Image src={ViewIcon} alt="img" />
        </div>
      )}

      <div className={`fixed right-0 top-0 z-30 w-full max-w-full`}>
        <TopBar />
      </div>

      <div
        className={cn(
          'dark:bg-brand-dark bg-brand-lavender-mist text-black dark:text-white overflow-auto relative right-0 z-10 transition-all duration-500 mt-24 h-full min-h-[calc(100vh-96px)] p-6',
          sideBarOpen ? 'ml-[300px]' : 'ml-0'
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
