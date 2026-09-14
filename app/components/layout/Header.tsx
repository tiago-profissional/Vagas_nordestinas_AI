"use client";

import Link from "next/link";

import Avatar from "@/app/components/ui/Avatar";

type HeaderProps = {
  userName?: string;
  userPhoto?: string;
  onMenuClick?: () => void;
};

export default function Header({
  userName = "Tiago",
  userPhoto,
  onMenuClick,
}: HeaderProps) {
  const navLinkClasses =
    "whitespace-nowrap text-[15px] font-semibold text-[var(--text-primary)] transition-colors hover:text-[var(--primary)]";

  return (
    <header className="fixed left-0 top-0 z-50 h-[80px] w-full border-b border-[var(--border-light)] bg-[var(--surface)] shadow-sm">
      <div className="flex h-full items-center justify-between gap-3 px-3 sm:px-6">
        <div className="flex min-w-0 items-center gap-2">
          <button
            type="button"
            onClick={onMenuClick}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-2xl text-[var(--text-primary)] transition-colors hover:bg-[var(--primary-10)] hover:text-[var(--primary)] min-[650px]:hidden"
            aria-label="Abrir menu"
          >
            ☰
          </button>

          <h1 className="truncate text-base font-bold text-[var(--brand-orange)] sm:text-xl lg:text-[28px]">
            Vagas Nordestinas
          </h1>
        </div>

        <nav className="hidden items-center gap-6 min-[650px]:flex">
          <Link href="/vagas" className={navLinkClasses}>
            Vagas
          </Link>

          <Link href="/avaliacoes" className={navLinkClasses}>
            Avaliações da Empresa
          </Link>

          <Link href="/cargos" className={navLinkClasses}>
            Cargos e Salários
          </Link>
        </nav>

        <div className="flex shrink-0 items-center gap-3">
          <button
            type="button"
            className="hidden text-[15px] font-semibold text-[var(--text-primary)] transition-colors hover:text-[var(--primary)] md:block"
          >
            Buscar
          </button>

          <Avatar nome={userName} foto={userPhoto} />

          <span className="hidden text-[15px] font-semibold text-[var(--text-primary)] sm:inline">
            {userName}
          </span>
        </div>
      </div>
    </header>
  );
}