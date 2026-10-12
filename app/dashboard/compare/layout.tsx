import "./compare.css";

export default function CompareLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="cmp-page">{children}</div>;
}