import { useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  const handleOpenSidebar = () => {
    setIsSidebarOpen(true);
  };

  return (
    <div className="flex min-h-screen bg-slate-900 text-white">
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={handleCloseSidebar}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <Navbar onMenuClick={handleOpenSidebar} />

        <main className="flex-1 overflow-auto p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;