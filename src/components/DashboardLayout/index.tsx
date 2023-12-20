import TopBar from "./Topbar";
import Sidebar from "./Sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: LayoutProps) => {
  return (
    <div>
      <div className="fixed left-0 top-0 z-10 h-full w-[300px] border-[1px] border-gray-200">
        <Sidebar />
      </div>
      <div className="relative right-0 z-10 ml-[300px] mt-[45px] h-full min-h-[calc(100vh-45px)] p-6">
        <div className="fixed right-0 top-0 z-30 w-full max-w-full">
          <TopBar />
        </div>
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
