
import React from "react";
import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppHeader } from "./AppHeader";
import { AppSidebar } from "./AppSidebar";

export function AppLayout() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full flex-col">
        <AppHeader />
        <div className="flex flex-1 w-full">
          <AppSidebar />
          <main className="flex-1">
            <div className="flex items-center px-4 py-2 lg:hidden">
              <SidebarTrigger />
            </div>
            <div className="container py-6">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
