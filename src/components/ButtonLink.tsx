import Link from "next/link";
import type { ComponentProps } from "react";
import { ArrowIcon } from "./ArrowIcon";

type Variant = "primary" | "outline" | "text";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 font-semibold transition-colors duration-150";

const variants: Record<Variant, string> = {
  primary:
    "rounded-md bg-brand-600 text-white shadow-[0_6px_16px_-6px_rgba(21,84,189,0.6)] hover:bg-brand-700",
  outline:
    "rounded-md border-2 border-brand-600 bg-white text-brand-700 hover:bg-brand-50",
  text: "min-h-11 text-brand-700 underline decoration-2 underline-offset-4 hover:text-navy-900",
};

const sizes: Record<Size, string> = {
  md: "min-h-11 px-5 text-base",
  lg: "min-h-13 px-7 text-lg",
};

export function buttonClasses(variant: Variant = "primary", size: Size = "md") {
  return [base, variants[variant], variant === "text" ? "" : sizes[size]].join(" ");
}

type ButtonLinkProps = ComponentProps<typeof Link> & {
  variant?: Variant;
  size?: Size;
  arrow?: boolean;
};

export function ButtonLink({
  variant = "primary",
  size = "md",
  arrow = false,
  className = "",
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <Link className={`${buttonClasses(variant, size)} ${className}`} {...props}>
      {children}
      {arrow && <ArrowIcon />}
    </Link>
  );
}
