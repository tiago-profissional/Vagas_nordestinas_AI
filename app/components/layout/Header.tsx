"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import "@/app/css/header.css";

const SITE_URL = "https://vagasnordestinas.com";

type HeaderProps = {
  userName?: string;
  userPhoto?: string | null;
  onMenuClick?: () => void;
};

export default function Header({
  userName = "Tiago",
  userPhoto,
  onMenuClick,
}: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname() ?? "";
  const aiResumeActive = pathname.startsWith("/dashboard");

  function closeMenu() {
    setMenuOpen(false);
  }

  function toggleMenu() {
    setMenuOpen((current) => !current);
  }

  function openPanelMenu() {
    setMenuOpen(false);
    onMenuClick?.();
  }

  const profileContent = userPhoto ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={userPhoto}
      alt=""
      style={{
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        objectFit: "cover",
      }}
    />
  ) : (
    <span aria-hidden="true">👤</span>
  );

  return (
    <header className="vne-header">
      <div className="vne-header__container">
        <a
          href={`${SITE_URL}/`}
          className="vne-header__logo"
          aria-label="Vagas Nordestinas — página inicial"
        >
          <Image
            src="/logo-vagas-nordestinas.png"
            alt="Vagas Nordestinas"
            width={180}
            height={72}
            priority
            className="vne-header__logo-image"
            style={{ width: "100%", height: "100%" }}
          />
        </a>

        <nav
          id="menu-principal"
          className={`vne-header__nav ${menuOpen ? "is-open" : ""}`}
          aria-label="Navegação principal"
        >
          <a href={`${SITE_URL}/`} className="vne-header__nav-link">
            Vagas
          </a>

          <a href={`${SITE_URL}/dashboard`} className="vne-header__nav-link">
            Dashboard
          </a>

          <Link
            href="/dashboard"
            className={`vne-header__nav-link ${aiResumeActive ? "active" : ""}`}
            onClick={closeMenu}
          >
            AI Resume
          </Link>

          <div className="vne-header__mobile-icons">
            <a
              href={`${SITE_URL}/`}
              className="vne-header__mobile-search"
            >
              <span aria-hidden="true">⌕</span>
              Buscar
            </a>

            {onMenuClick && (
              <button type="button" onClick={openPanelMenu}>
                Menu do painel
              </button>
            )}

            <Link
              href="/dashboard/profile"
              className="vne-header__mobile-login"
              onClick={closeMenu}
            >
              Meu perfil
            </Link>
          </div>
        </nav>

        <div className="vne-header__actions">
          <a
            href={`${SITE_URL}/`}
            className="vne-header__icon-btn"
            aria-label="Buscar vagas"
          >
            <span aria-hidden="true">⌕</span>
          </a>

          <Link
            href="/dashboard/profile"
            className="profile-icon"
            aria-label={`Abrir perfil de ${userName}`}
            title={userName}
          >
            {profileContent}
          </Link>
        </div>

        <button
          type="button"
          className={`vne-header__hamburger ${menuOpen ? "is-active" : ""}`}
          onClick={toggleMenu}
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuOpen}
          aria-controls="menu-principal"
        >
          <Image src="/menu_hamburger.svg" alt="" width={24} height={24} />
        </button>
      </div>
    </header>
  );
}