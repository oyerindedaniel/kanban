import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { ViewIcon } from '@/assets';
import { updateUI } from '@/store/slice/UI';
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
      className="text-white bg-brand-iris fixed h-12 w-14 cursor-pointer p-5 z-30 bottom-8 rounded-r-[100px] rounded-br-[100px] hover:bg-brand-biloba-flower"
    >
      <Image src={ViewIcon} alt="img" />
    </div>
  );
};

export default SideBarToggler;
