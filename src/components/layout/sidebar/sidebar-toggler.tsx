'use client';

import { ViewIcon } from '@/assets';
import { cn } from '@/lib/utils';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { updateUI } from '@/store/slice/ui';
import Image from 'next/image';

const SideBarToggler = () => {
  const { isSideBarOpen } = useAppSelector((state) => state.UIService.UI);

  const dispatch = useAppDispatch();

  const toggleSidebar = () => {
    dispatch(
      updateUI({
        isSideBarOpen: !isSideBarOpen
      })
    );
  };

  return (
    <div
      onClick={toggleSidebar}
      className={cn(
        'text-white bg-brand-iris h-12 w-14 cursor-pointer p-5 z-30 bottom-8 rounded-r-[100px] rounded-br-[100px] hover:bg-brand-biloba-flower',
        isSideBarOpen ? 'hidden' : 'fixed'
      )}
    >
      <Image src={ViewIcon} alt="toggle sidebar" />
    </div>
  );
};

export default SideBarToggler;
