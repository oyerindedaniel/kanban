import LayoutContainer from '@/components/layout/layout-container';
import Sidebar from '@/components/layout/sidebar';
import TopBar from '@/components/layout/topbar';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Sidebar />
      <div className="fixed right-0 top-0 z-30 w-full max-w-full overflow-auto">
        <TopBar />
      </div>
      <LayoutContainer>{children}</LayoutContainer>
    </div>
  );
};

export default MainLayout;
