"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "children"
> & {
  children: ReactNode;
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
};

const variants = {
  primary:
    "border-primary bg-primary text-text-on-primary enabled:hover:border-primary-hover enabled:hover:bg-primary-hover enabled:active:bg-primary-active",

  secondary:
    "border-secondary bg-transparent text-secondary enabled:hover:bg-[var(--secondary-10)]",
};

const sizes = {
  sm: "min-h-[var(--altura-botao)] px-4 py-2 text-sm",
  md: "min-h-[var(--altura-botao)] px-5 py-2.5 text-base",
  lg: "min-h-[48px] px-6 py-3 text-lg",
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  type = "button",
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      type={type}
      className={`vn-button max-w-full ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  );
}