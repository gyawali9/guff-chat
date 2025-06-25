import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardNavbar } from "@/modules/home/ui/components/DashboardNavbar";
import { DashboardSidebar } from "@/modules/home/ui/components/DashboardSidebar";

import { Outlet } from "react-router-dom";
const DashboardLayout = () => {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <main className="flex flex-col h-screen w-screen bg-muted">
        <DashboardNavbar />
        <Outlet />
      </main>
    </SidebarProvider>
  );
};

export default DashboardLayout;
