export const PORTAL_URL = (
  process.env.NEXT_PUBLIC_PORTAL_URL ||
  (process.env.NODE_ENV === "development"
    ? "http://localhost:5173"
    : "https://vagasnordestinas.com")
).replace(/\/+$/, "");
