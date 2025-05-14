
import React from "react";
import { NavLink } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { 
  LayoutDashboard,
  Play,
  BarChart2,
  Settings,
  Database,
  Users,
  FileText
} from "lucide-react";

export function AppSidebar() {
  const navigationItems = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      path: "/"
    },
    {
      title: "New Simulation",
      icon: Play,
      path: "/new-simulation"
    },
    {
      title: "Results",
      icon: BarChart2,
      path: "/results"
    },
    {
      title: "Audiences",
      icon: Users,
      path: "/audiences"
    },
    {
      title: "Templates",
      icon: FileText,
      path: "/templates"
    },
    {
      title: "Data Sources",
      icon: Database,
      path: "/data-sources"
    },
    {
      title: "Settings",
      icon: Settings,
      path: "/settings"
    }
  ];

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.path} className={({ isActive }) => 
                      isActive ? "nav-link active" : "nav-link"
                    }>
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="px-3 py-2">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Epsilon
          </p>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
