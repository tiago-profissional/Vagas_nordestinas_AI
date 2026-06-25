import { ReactNode } from "react";

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

const variantClasses: Record<CardVariant, string> = {
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
      className={`
        flex
        h-full
        w-full
        min-w-0
        flex-col
        rounded-3xl
        border
        border-neutral-200
        bg-white
        p-6
        shadow-sm
        transition-all
        duration-300
        sm:p-7
        lg:p-8
        ${variantClasses[variant]}
        ${className}
      `}
    >
      {title && (
        <h2 className="break-words text-lg font-bold text-gray-900 sm:text-xl">
          {title}
        </h2>
      )}

      {description && (
        <p className="mt-2 break-words text-sm text-gray-600 sm:text-base">
          {description}
        </p>
      )}

      {children}
    </div>
  );
}