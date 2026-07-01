import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  User,
  ClipboardList,
  Joystick,
  Settings,
} from "lucide-react";

import { NavLink } from "react-router-dom";

const items = [
  {
    title: "Dashboard",
    url: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Patient Profile",
    url: "/patient",
    icon: User,
  },
  {
    title: "Medical History",
    url: "/history",
    icon: ClipboardList,
  },
  {
    title: "Wheelchair",
    url: "/control",
    icon: Joystick,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];

function AppSidebar() {
  return (
    <Sidebar collapsible="offcanvas">

      <SidebarContent>

        <SidebarGroup>

          <SidebarGroupContent>

            <div className="mt-4">

              <SidebarMenu>

                {items.map((item) => (

                  <SidebarMenuItem key={item.title}>

                    <SidebarMenuButton asChild>

                      <NavLink
                        to={item.url}
                        className={({ isActive }) =>
                          `flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${isActive
                            ? "bg-blue-600 text-white"
                            : "hover:bg-slate-100"
                          }`
                        }
                      >

                        <item.icon className="w-5 h-5" />

                        <span>

                          {item.title}

                        </span>

                      </NavLink>

                    </SidebarMenuButton>

                  </SidebarMenuItem>

                ))}

              </SidebarMenu>

            </div>

          </SidebarGroupContent>

        </SidebarGroup>

      </SidebarContent>

    </Sidebar>
  );
}

export default AppSidebar;