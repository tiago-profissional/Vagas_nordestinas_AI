import type { ReactNode } from "react";

type CardVariant =
  | "default"
  | "middle"
  | "wide"
  | "banner"
  | "status"
  | "dashboard";

type CardProps = {
  title?: string;
  description?: string;
  children?: ReactNode;
  className?: string;
  variant?: CardVariant;
};

const variants: Record<CardVariant, string> = {
  default: "min-h-[240px]",
  middle: "min-h-[285px]",
  wide: "min-h-[300px]",
  banner: "min-h-[110px]",
  status: "min-h-[300px]",
  dashboard: "min-h-[250px]",
};

export default function Card({
  title,
  description,
  children,
  className = "",
  variant = "default",
}: CardProps) {
  return (
    <div
      className={`vn-card flex h-full w-full min-w-0 flex-col ${variants[variant]} ${className}`}
    >
      {title && (
        <h2 className="vn-card-title break-words">
          {title}
        </h2>
      )}

      {description && (
        <p className="vn-description mt-2 text-sm">
          {description}
        </p>
      )}

      {children}
    </div>
  );
}