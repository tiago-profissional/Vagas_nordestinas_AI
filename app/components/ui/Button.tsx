import type { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  disabled?: boolean;
};

const baseClasses =
  "inline-flex items-center justify-center rounded-xl font-semibold transition-all hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-50";

const variantClasses = {
  primary:
    "bg-[var(--primary)] text-[var(--text-on-primary)] shadow-md hover:bg-[var(--primary-hover)]",

  secondary:
    "border border-[var(--primary)] bg-[var(--surface)] text-[var(--primary-dark)] hover:bg-[var(--primary-10)]",
};

const sizeClasses = {
  sm: "h-[40px] w-[160px] text-sm",
  md: "h-[50px] w-[200px] text-base",
  lg: "h-[56px] w-[240px] text-lg",
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  onClick,
  disabled = false,
}: ButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]}`}
    >
      {children}
    </button>
  );
}