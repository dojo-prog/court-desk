import { Button } from "@/components/ui/button";
import { useLogout } from "@/features/auth/hooks/useLogout";

import {
  LogOut,
  PanelLeftClose,
  PanelLeftOpen,
  LayoutDashboard,
  CalendarDays,
  BookBookmark,
  PhilippinePeso,
  UserGroup,
  CircleUser,
  SportShoe,
} from "lucide-react";

import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

const sidebarTabs = [
  {
    label: "Dashboard",
    path: "/",
    Icon: LayoutDashboard,
  },
  {
    label: "Calendar",
    path: "/calendar",
    Icon: CalendarDays,
  },
  {
    label: "Reservations",
    path: "/reservations",
    Icon: BookBookmark,
  },
  {
    label: "Courts",
    path: "/courts",
    Icon: SportShoe,
  },
  {
    label: "Payments",
    path: "/payments",
    Icon: PhilippinePeso,
  },
  {
    label: "Customers",
    path: "/customers",
    Icon: UserGroup,
  },
  {
    label: "Users",
    path: "/users",
    Icon: CircleUser,
  },
];

type SidebarProps = {
  collapsed: boolean;
  onToggle: () => void;
};

const Sidebar = ({ collapsed, onToggle }: SidebarProps) => {
  const { mutateAsync: logout } = useLogout();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <aside
      className={`sticky top-0 flex h-screen shrink-0 flex-col border-r bg-background transition-[width] duration-200 ${
        collapsed ? "w-16" : "w-60"
      }`}
    >
      {/* Brand */}
      <div
        className={`flex h-16 shrink-0 items-center border-b ${
          collapsed ? "justify-center" : "px-5"
        }`}
      >
        {collapsed ? (
          <Link to="/admin" className="text-lg font-bold tracking-tight">
            C
          </Link>
        ) : (
          <Link to="/admin" className="text-lg font-bold tracking-tight">
            Court
            <span className="ml-1.5 text-xs font-medium text-muted-foreground">
              Desk
            </span>
          </Link>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-3">
        {sidebarTabs.map((tab) => (
          <NavItem
            key={tab.path}
            to={tab.path}
            icon={tab.Icon}
            label={tab.label}
            collapsed={collapsed}
          />
        ))}
      </nav>

      {/* Footer */}
      <div>
        <div>
          <div className="shrink-0 p-3">
            {/* Collapse */}
            <Tooltip>
              <TooltipTrigger className={"w-full"}>
                <Button
                  variant="ghost"
                  className={`mt-1 h-10 w-full ${
                    collapsed ? "justify-center" : "justify-start"
                  }`}
                  onClick={onToggle}
                >
                  {collapsed ? (
                    <PanelLeftOpen className="size-5" />
                  ) : (
                    <>
                      <PanelLeftClose className="size-5" />
                      <span>Collapse</span>
                    </>
                  )}
                </Button>
              </TooltipTrigger>

              {collapsed && (
                <TooltipContent side="right" sideOffset={8}>
                  Expand sidebar
                </TooltipContent>
              )}
            </Tooltip>
          </div>

          <div className="p-3 border-t">
            <Tooltip>
              <TooltipTrigger className={"w-full"}>
                <Button
                  variant="ghost"
                  className={`h-10 w-full ${
                    collapsed ? "justify-center" : "justify-start"
                  }`}
                  onClick={handleLogout}
                >
                  <LogOut className="size-5 shrink-0" />

                  {!collapsed && <span>Logout</span>}
                </Button>
              </TooltipTrigger>

              {collapsed && (
                <TooltipContent side="right" sideOffset={8}>
                  Logout
                </TooltipContent>
              )}
            </Tooltip>
          </div>
        </div>
      </div>
    </aside>
  );
};

type NavItemProps = {
  to: string;
  icon: React.ElementType;
  label: string;
  collapsed: boolean;
};

const NavItem = ({ to, icon: Icon, label, collapsed }: NavItemProps) => {
  const link = (
    <NavLink
      to={to}
      title={collapsed ? undefined : undefined}
      className={({ isActive }) =>
        [
          "flex items-center rounded-lg py-2.5 text-sm font-medium",
          "transition-colors",
          collapsed ? "justify-center px-2" : "gap-3 px-3",
          isActive
            ? "bg-primary/80 text-white"
            : "text-muted-foreground hover:bg-muted hover:text-foreground",
        ].join(" ")
      }
    >
      <Icon className="size-4 shrink-0" />
      {!collapsed && <span>{label}</span>}
    </NavLink>
  );

  if (!collapsed) {
    return link;
  }

  return (
    <Tooltip>
      <TooltipTrigger>{link}</TooltipTrigger>
      <TooltipContent side="right" sideOffset={8}>
        {label}
      </TooltipContent>
    </Tooltip>
  );
};

export default Sidebar;
