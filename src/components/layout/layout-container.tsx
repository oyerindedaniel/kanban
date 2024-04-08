'use client';

import { useMediaQuery } from '@/hooks';
import { cn } from '@/lib/utils';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { updateUI } from '@/store/slice/ui';
import { useEffect } from 'react';

const LayoutContainer = ({ children }: { children: React.ReactNode }) => {
  const { isSideBarOpen } = useAppSelector((state) => state.UIService.UI);

  const dispatch = useAppDispatch();

  const setSidebar = () => {
    dispatch(
      updateUI({
        isSideBarOpen: false
      })
    );
  };

  const maxMatches768px = useMediaQuery('(max-width: 768px)');

  useEffect(() => {
    if (maxMatches768px && isSideBarOpen) {
      setSidebar();
    }
  }, [maxMatches768px]);

  return (
    <div
      className={cn(
        'dark:bg-brand-dark bg-brand-lavender-mist text-black dark:text-white overflow-auto relative right-0 z-10 transition-all duration-500 mt-24 h-full min-h-[calc(100vh-96px)] p-6',
        isSideBarOpen ? 'ml-[300px]' : 'ml-0'
      )}
    >
      {children}
    </div>
  );
};

export default LayoutContainer;
