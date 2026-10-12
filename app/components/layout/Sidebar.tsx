"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  BriefcaseBusiness,
  FileText,
  GitCompareArrows,
  LogOut,
  Plus,
  UserRound,
} from "lucide-react";

const menuItems = [
  {
    label: "Meu Currículo",
    href: "/dashboard",
    icon: FileText,
  },
  {
    label: "Comparar com vaga",
    href: "/dashboard/compare",
    icon: GitCompareArrows,
  },
  {
    label: "Minhas Vagas",
    href: "https://vagasnordestinas.com/dashboard",
    icon: BriefcaseBusiness,
  },
  {
    label: "Criar Nova Vaga",
    href: "https://vagasnordestinas.com/create-job",
    icon: Plus,
  },
  {
    label: "Perfil",
    href: "/dashboard/profile",
    icon: UserRound,
  },
  {
    label: "Sair",
    href: "https://vagasnordestinas.com/",
    icon: LogOut,
  },
];

// "/dashboard" só fica ativo na rota exata; os demais também nas sub-rotas.
function isRouteActive(pathname: string, href: string) {
  if (href === "/dashboard") return pathname === href;

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Sidebar() {
  const pathname = usePathname();

  return (
    <nav aria-label="Menu principal" className="vn-sidebar">
      <div className="vn-sidebar__list">
        {menuItems.map((item) => {
          const isExternal = item.href.startsWith("http");
          const isActive = !isExternal && isRouteActive(pathname, item.href);
          const Icon = item.icon;

          const className = `vn-nav-item ${isActive ? "vn-nav-item--active" : ""}`;

          const content = (
            <>
              <Icon
                aria-hidden="true"
                size={20}
                strokeWidth={1.8}
                className="vn-nav-item__icon"
              />

              <span className="vn-nav-item__label">{item.label}</span>
            </>
          );

          if (isExternal) {
            return (
              <a key={item.href} href={item.href} className={className}>
                {content}
              </a>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={className}
            >
              {content}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}