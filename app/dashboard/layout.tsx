import { DashboardLayout } from "../components/layout/DashboardLayout";

type DashboardRouteLayoutProps = {
  children: React.ReactNode;
};

export default function DashboardRouteLayout({
  children,
}: DashboardRouteLayoutProps) {
  return <DashboardLayout>{children}</DashboardLayout>;
}

