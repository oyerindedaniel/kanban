import LayoutContainer from '@/components/layout/layout-container';
import Sidebar from '@/components/layout/sidebar';
import SideBarToggler from '@/components/layout/sidebar/sidebar-toggler';
import TopBar from '@/components/layout/topbar';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Sidebar />
      <SideBarToggler />
      <div className="fixed right-0 top-0 z-30 w-full">
        <TopBar />
      </div>
      <LayoutContainer>{children}</LayoutContainer>
    </div>
  );
};

export default MainLayout;
