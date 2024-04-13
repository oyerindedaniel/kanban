'use client';

import { cn } from '@/lib/utils';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

const LayoutContainer = ({ children }: { children: React.ReactNode }) => {
  const { isSideBarOpen } = useAppSelector((state) => state.UIService.UI);

  const dispatch = useAppDispatch();

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
