"use client";

import { useState, type ReactNode } from "react";

import { Sidebar } from "./Sidebar";
import Header from "./Header";

type DashboardLayoutProps = {
  children: ReactNode;
};

export function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const [menuAberto, setMenuAberto] = useState(false);

  return (
    <div className="flex min-h-screen w-full flex-col bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <Header onMenuClick={() => setMenuAberto(true)} />

      <div className="flex flex-1">
        {/* Sidebar para tablet e desktop (a partir de 561px) */}
        <aside className="hidden min-[561px]:block min-[561px]:w-[240px] min-[561px]:shrink-0 md:w-[300px]">
          <div className="sticky top-[var(--altura-header)] h-[calc(100vh-var(--altura-header))] overflow-y-auto border-r border-[var(--border-light)] bg-[var(--surface-muted)]">
            <Sidebar />
          </div>
        </aside>

        {/* Sidebar mobile (até 560px), aberta pelo "Menu do painel" do header */}
        {menuAberto && (
          <div className="fixed inset-0 z-[200] min-[561px]:hidden">
            <button
              type="button"
              className="absolute inset-0 cursor-default bg-[rgba(25,24,21,0.65)]"
              onClick={() => setMenuAberto(false)}
              aria-label="Fechar menu"
            />

            <div className="absolute left-0 top-0 h-full w-[280px] max-w-[80%] overflow-y-auto border-r border-[var(--border-dark)] bg-[var(--surface-muted)] shadow-xl">
              <button
                type="button"
                onClick={() => setMenuAberto(false)}
                className="flex h-12 w-12 items-center justify-center text-2xl text-[var(--text-secondary)] transition-colors hover:bg-[var(--surface-hover)] hover:text-[var(--primary)]"
                aria-label="Fechar menu"
              >
                ✕
              </button>

              <Sidebar />
            </div>
          </div>
        )}

        {/* Conteúdo */}
        <main className="min-w-0 flex-1 overflow-x-hidden bg-[var(--bg-primary)] px-4 py-6 sm:px-6 sm:py-8">
          {children}
        </main>
      </div>
    </div>
  );
}