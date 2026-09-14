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
    href: "https://vagasnordestinas.com/dashboard",
    icon: "💼",
  },
  {
    label: "Criar Nova Vaga",
    href: "https://vagasnordestinas.com/create-job",
    icon: "➕",
  },
  {
    label: "Perfil",
    href: "/dashboard/profile",
    icon: "👤",
  },
  {
    label: "Sair",
    href: "https://vagasnordestinas.com/",
    icon: "↪️",
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <nav className="h-full w-full overflow-y-auto bg-[var(--surface-muted)] shadow-sm">
      <div className="grid grid-cols-1 gap-2 px-4 pt-6">
        {menuItems.map((item) => {
          const isExternal = item.href.startsWith("http");
          const isActive = !isExternal && pathname === item.href;

          const itemClasses = `
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
          `;

          const content = (
            <>
              <span className="text-center text-xl transition-transform duration-300 group-hover:scale-110">
                {item.icon}
              </span>

              <span className="whitespace-nowrap text-[15px] font-bold">
                {item.label}
              </span>
            </>
          );

          if (isExternal) {
            return (
              <a
                key={item.href}
                href={item.href}
                className={itemClasses}
              >
                {content}
              </a>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={itemClasses}
            >
              {content}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}