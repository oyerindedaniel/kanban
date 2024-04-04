import Sidebar from '@/components/DashboardLayout/sidebar';
import TopBar from '@/components/DashboardLayout/topbar';
import LayoutContainer from '@/components/layout-container';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Sidebar />
      <div className="fixed right-0 top-0 z-30 w-full max-w-full">
        <TopBar />
      </div>
      <LayoutContainer>{children}</LayoutContainer>
    </div>
  );
};

export default MainLayout;
