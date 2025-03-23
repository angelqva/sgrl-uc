import StoreProvider from "./provider";

import Breadcrumb from "@/components/breadcrumb";
import Sidebar from "@/components/sidebar";
import SidebarRight from "@/components/sidebar-right";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StoreProvider>
      <div className="relative flex flex-col h-screen">
        <Sidebar />
        <SidebarRight />
        <main className="container flex-grow px-5 py-5 md:px-12 mx-auto max-w-[1440px]">
          <Breadcrumb />
          {children}
        </main>
      </div>
    </StoreProvider>
  );
}
