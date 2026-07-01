"use client";

import { useState } from "react";
import { Sidebar } from "./Sidebar";
import Header from "./Header";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [menuAberto, setMenuAberto] = useState(false);

  return (
    <div className="flex min-h-screen w-full flex-col bg-white">
      {/* HEADER — recebe a função que abre o menu (o botão ☰ vive nele) */}
      <Header onMenuClick={() => setMenuAberto(true)} />

      {/* Abaixo do header (80px de altura) */}
      <div className="flex flex-1 pt-[80px]">
        {/* SIDEBAR DESKTOP/TABLET — fixa, aparece de md (768px) pra cima */}
        <aside className="hidden md:block md:w-[300px] md:shrink-0">
          <div className="sticky top-[80px] h-[calc(100vh-80px)] overflow-y-auto bg-[#F1F1EF]">
            <Sidebar />
          </div>
        </aside>

        {/* SIDEBAR MOBILE — drawer, só existe abaixo de md, quando aberto */}
        {menuAberto && (
          <div className="fixed inset-0 z-50 md:hidden">
            {/* fundo escuro: tocar nele fecha o menu */}
            <div
              className="absolute inset-0 bg-black/50"
              onClick={() => setMenuAberto(false)}
            />
            {/* painel que desliza da esquerda */}
            <div className="absolute left-0 top-0 h-full w-[280px] max-w-[80%] overflow-y-auto bg-[#F1F1EF] shadow-xl">
              <button
                onClick={() => setMenuAberto(false)}
                className="flex h-12 w-12 items-center justify-center text-2xl text-gray-600"
                aria-label="Fechar menu"
              >
                ✕
              </button>
              <Sidebar />
            </div>
          </div>
        )}

        {/* CONTEÚDO */}
        <main className="min-w-0 flex-1 overflow-x-hidden px-4 py-6 sm:px-6 sm:py-8">
          {children}
        </main>
      </div>
    </div>
  );
}