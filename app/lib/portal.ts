export const PORTAL_URL = (
  process.env.NEXT_PUBLIC_PORTAL_URL ||
  (process.env.NODE_ENV === "development"
    ? "http://localhost:5173"
    : "https://vagasnordestinas.com")
).replace(/\/+$/, "");

export function clearSharedSessionCookie() {
  const hostname = window.location.hostname.toLowerCase();
  const isPortalDomain =
    hostname === "vagasnordestinas.com" ||
    hostname.endsWith(".vagasnordestinas.com");
  const cookie = "vn_token=; Path=/; Max-Age=0; SameSite=Lax";

  document.cookie = cookie;
  if (isPortalDomain) {
    const secure = window.location.protocol === "https:" ? "; Secure" : "";
    document.cookie = `${cookie}; Domain=.vagasnordestinas.com${secure}`;
  }
}
