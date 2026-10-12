import type { ReactNode } from "react";
import "./globals.css";
import "./css/ui.css";
import "./css/layout.css";

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({
  children,
}: RootLayoutProps) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}