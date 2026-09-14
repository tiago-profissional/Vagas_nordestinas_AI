"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  {
    label: "Meu Currículo",
    href: "/dashboard",
    icon: "📄",
  },
  {
    label: "Minhas Vagas",
    href: "/dashboard/jobs",
    icon: "💼",
  },
  {
    label: "Criar Nova Vaga",
    href: "/dashboard/create-job",
    icon: "➕",
  },
  {
    label: "Perfil",
    href: "/dashboard/profile",
    icon: "👤",
  },
  {
    label: "Configurações",
    href: "/dashboard/settings",
    icon: "⚙️",
  },
  {
    label: "Sair",
    href: "/",
    icon: "↪️",
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <nav className="h-full w-full overflow-y-auto bg-[var(--surface-muted)] shadow-sm">
      <div className="grid grid-cols-1 gap-2 px-4 pt-6">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                group
                grid
                h-[52px]
                grid-cols-[40px_1fr]
                items-center
                rounded-xl
                px-3
                transition-all
                duration-300
                ease-in-out
                hover:scale-[1.02]
                ${
                  isActive
                    ? "bg-[var(--primary)] text-[var(--text-on-primary)] shadow-lg"
                    : "text-[var(--text-primary)] hover:bg-[var(--primary-10)] hover:text-[var(--primary-dark)] hover:shadow-md"
                }
              `}
            >
              <span className="text-center text-xl transition-transform duration-300 group-hover:scale-110">
                {item.icon}
              </span>

              <span className="whitespace-nowrap text-[15px] font-bold">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}