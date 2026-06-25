"use client";

import { Sidebar } from "./Sidebar";
import Header from "./Header";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="grid min-h-screen w-full grid-cols-[320px_minmax(0,1fr)] grid-rows-[80px_1fr] overflow-hidden bg-white">
      <div className="col-span-2 row-start-1">
        <Header />
      </div>

      <aside className="col-start-1 row-start-2 h-[calc(100vh-80px)] min-w-0 overflow-hidden bg-[#F1F1EF]">
        <Sidebar />
      </aside>

      <main className="col-start-2 row-start-2 flex h-[calc(100vh-80px)] min-w-0 justify-center overflow-y-auto overflow-x-hidden px-6 py-8">
      {children}
    </main>
    </div>
  );
}