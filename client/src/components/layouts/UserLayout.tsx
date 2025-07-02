import { SidebarProvider } from "@/components/ui/sidebar";
import { useAppDispatch } from "@/hooks/react-redux";
import { DashboardNavbar } from "@/modules/home/ui/components/DashboardNavbar";
import { DashboardSidebar } from "@/modules/home/ui/components/DashboardSidebar";
import { getOtherUsersThunk } from "@/store/slice/user/user.thunk";
import { useEffect } from "react";

import { Outlet } from "react-router-dom";
const DashboardLayout = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getOtherUsersThunk());
  }, [dispatch]);

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
