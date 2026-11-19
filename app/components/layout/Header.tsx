"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import "@/app/css/header.css";
import { PORTAL_URL } from "@/app/lib/portal";

const SITE_URL = PORTAL_URL;

// Mesmo backend e mesmo banco de dados do site principal.
const API_URL = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"
).replace(/\/$/, "");

// Cookie criado pelo login do site principal (veja useCurrentUser.js).
const SESSION_COOKIE = "vn_token";

type HeaderProps = {
  userName?: string;
  userPhoto?: string | null;
  onMenuClick?: () => void;
};

type AccountProfile = {
  name: string;
  email: string;
  avatarUrl: string | null;
};

function readSessionToken(): string | null {
  const entry = document.cookie
    .split("; ")
    .find((item) => item.startsWith(`${SESSION_COOKIE}=`));

  if (!entry) return null;

  const value = entry.slice(SESSION_COOKIE.length + 1);

  try {
    return decodeURIComponent(value) || null;
  } catch {
    return null;
  }
}

function clearSessionToken() {
  const cookie = `${SESSION_COOKIE}=; Path=/; Max-Age=0; SameSite=Lax`;
  document.cookie = cookie;

  if (process.env.NODE_ENV === "production") {
    document.cookie = `${cookie}; Domain=.vagasnordestinas.com`;
  }
}

function toAbsoluteUrl(url: string | null | undefined): string | null {
  if (!url) return null;
  if (/^(https?:|blob:|data:)/i.test(url)) return url;

  return `${API_URL}${url.startsWith("/") ? "" : "/"}${url}`;
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);

  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0][0].toUpperCase();

  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export default function Header({
  userName,
  userPhoto,
  onMenuClick,
}: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profile, setProfile] = useState<AccountProfile | null>(null);
  const [photoFailed, setPhotoFailed] = useState(false);

  const pathname = usePathname() ?? "";
  const aiResumeActive = pathname.startsWith("/dashboard");

  // Busca nome, e-mail e foto da conta logada, direto do banco de dados.
  const loadProfile = useCallback(async () => {
    const token = readSessionToken();

    if (!token) {
      setProfile(null);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/users/profile`, {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
      });

      if (response.status === 401) {
        clearSessionToken();
        setProfile(null);
        return;
      }

      if (!response.ok) return;

      const json = await response.json();
      const personal = json?.data?.personal_data;

      if (!personal) return;

      setProfile({
        name: personal.name || "",
        email: personal.email || "",
        avatarUrl: toAbsoluteUrl(personal.avatar_url),
      });
      setPhotoFailed(false);
    } catch {
      // Backend desligado: mantém o que já estava na tela.
    }
  }, []);

  useEffect(() => {
    loadProfile();

    // Ao voltar para esta aba (ex.: depois de editar o perfil), atualiza de novo.
    window.addEventListener("focus", loadProfile);

    return () => window.removeEventListener("focus", loadProfile);
  }, [loadProfile]);

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

  const displayName = profile?.name || userName || "Minha conta";
  const firstName = displayName.split(" ")[0];
  const photoUrl = profile ? profile.avatarUrl : toAbsoluteUrl(userPhoto);
  const showPhoto = Boolean(photoUrl) && !photoFailed;

  let profileContent;

  if (showPhoto) {
    profileContent = (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={photoUrl as string}
        alt=""
        onError={() => setPhotoFailed(true)}
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "50%",
          objectFit: "cover",
        }}
      />
    );
  } else if (profile?.name) {
    profileContent = (
      <span
        aria-hidden="true"
        style={{ fontSize: "15px", fontWeight: 800, lineHeight: 1 }}
      >
        {getInitials(profile.name)}
      </span>
    );
  } else {
    profileContent = <span aria-hidden="true">👤</span>;
  }

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
              href="/profile"
              className="vne-header__mobile-login"
              onClick={closeMenu}
            >
              <span className="vne-header__avatar" aria-hidden="true">
                {showPhoto ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={photoUrl as string} alt="" />
                ) : profile?.name ? (
                  getInitials(profile.name)
                ) : (
                  "👤"
                )}
              </span>
              <span>{profile ? displayName : "Meu perfil"}</span>
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
            href="/profile"
            className="profile-icon"
            aria-label={`Abrir perfil de ${displayName}`}
            title={profile?.email ? `${displayName} — ${profile.email}` : displayName}
            style={showPhoto ? { overflow: "hidden", padding: 0 } : undefined}
          >
            {profileContent}
          </Link>

          {profile && (
            <span className="vne-header__user-name">{firstName}</span>
          )}
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