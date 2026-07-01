"use client";

import Link from "next/link";
import Avatar from "@/app/components/ui/Avatar";

type HeaderProps = {
  userName?: string;
  userPhoto?: string;
  onMenuClick?: () => void;
};

export default function Header({ userName = "Tiago", userPhoto, onMenuClick }: HeaderProps) {
  return (
    <header className="fixed left-0 top-0 z-50 h-[80px] w-full border-b border-gray-200 bg-white shadow-sm">
      <div className="flex h-full items-center justify-between gap-3 px-3 sm:px-6">

        {/* ESQUERDA — hambúrguer (só abaixo de 650) + logo */}
        <div className="flex min-w-0 items-center gap-2">
          <button
            onClick={onMenuClick}
            className="flex h-10 w-10 shrink-0 items-center justify-center text-2xl text-gray-700 min-[650px]:hidden"
            aria-label="Abrir menu"
          >
            ☰
          </button>

          <h1 className="truncate text-base font-medium text-[#8A6A00] sm:text-xl lg:text-[28px]">
            Vagas Nordestinas
          </h1>
        </div>

        {/* CENTRO — links: aparecem de 650px pra cima (junto com a sidebar) */}
        <nav className="hidden items-center gap-6 min-[650px]:flex">
          <Link href="/vagas" className="whitespace-nowrap text-[15px] font-semibold text-gray-700 transition hover:text-[#C9A227]">
            Vagas
          </Link>
          <Link href="/avaliacoes" className="whitespace-nowrap text-[15px] font-semibold text-gray-700 transition hover:text-[#C9A227]">
            Avaliações da Empresa
          </Link>
          <Link href="/cargos" className="whitespace-nowrap text-[15px] font-semibold text-gray-700 transition hover:text-[#C9A227]">
            Cargos e Salários
          </Link>
        </nav>

        {/* DIREITA — perfil */}
        <div className="flex shrink-0 items-center gap-3">
          <button className="hidden text-[15px] font-semibold text-gray-700 transition hover:text-[#C9A227] md:block">
            Buscar
          </button>
          <Avatar nome={userName} foto={userPhoto} />
          <span className="hidden text-[15px] font-semibold text-gray-800 sm:inline">
            {userName}
          </span>
        </div>
      </div>
    </header>
  );
}