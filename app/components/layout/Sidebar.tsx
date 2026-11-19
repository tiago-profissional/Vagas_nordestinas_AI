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

import { PORTAL_URL } from "@/app/lib/portal";

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
    status: "Em desenvolvimento",
  },
  {
    label: "Minhas Vagas",
    href: `${PORTAL_URL}/dashboard`,
    icon: BriefcaseBusiness,
    status: "Em produção",
  },
  {
    label: "Criar Nova Vaga",
    href: `${PORTAL_URL}/create-job`,
    icon: Plus,
  },
  {
    label: "Perfil",
    href: `${PORTAL_URL}/profile`,
    icon: UserRound,
  },
  {
    label: "Sair",
    href: `${PORTAL_URL}/`,
    icon: LogOut,
  },
];

function clearSessionToken() {
  const cookie = "vn_token=; Path=/; Max-Age=0; SameSite=Lax";
  document.cookie = cookie;

  if (process.env.NODE_ENV === "production") {
    document.cookie = `${cookie}; Domain=.vagasnordestinas.com`;
  }
}

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
              {"status" in item && item.status && (
                <span className="vn-nav-item__status">{item.status}</span>
              )}
            </>
          );

          if (isExternal) {
            return (
              <a
                key={item.href}
                href={item.href}
                className={className}
                onClick={item.label === "Sair" ? clearSessionToken : undefined}
              >
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