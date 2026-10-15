import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import { useState } from "react";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState<boolean>(true);

  return (
    <div className="flex min-h-screen w-full bg-muted/20">
      <Sidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed((prev) => !prev)}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <Navbar />

        <main className="mx-auto w-full max-w-7xl">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
