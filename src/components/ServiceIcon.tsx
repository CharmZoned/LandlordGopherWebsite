import type { ReactNode } from "react";
import type { ServiceIcon as ServiceIconName } from "@/content/site";

const navy = "var(--color-navy-900)";
const gold = "var(--color-gold-500)";

const paths: Record<ServiceIconName, ReactNode> = {
  megaphone: (
    <>
      <path stroke={navy} d="M8 26v12a4 4 0 0 0 4 4h6l18 10V12L18 22h-6a4 4 0 0 0-4 4Z" />
      <path stroke={navy} d="M16 42l4 12h6l-3-11" />
      <path stroke={gold} d="M44 24l8-6M46 32h10M44 40l8 6" />
    </>
  ),
  screening: (
    <>
      <path stroke={navy} d="M38 54H12a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h28l8 8v14" />
      <circle stroke={navy} cx="22" cy="18" r="5" />
      <path stroke={navy} d="M14 30c1-4 4-6 8-6s7 2 8 6M16 38h10M16 46h8" />
      <circle stroke={gold} cx="42" cy="42" r="8" />
      <path stroke={gold} d="M48 48l8 8" />
    </>
  ),
  "shield-home": (
    <>
      <path stroke={navy} d="M6 30 28 10l14 12.5M10 27v27h26" />
      <path stroke={navy} d="M20 54V40h10v14" />
      <path stroke={gold} d="M48 30l10 4v9c0 6-4 10-10 12-6-2-10-6-10-12v-9Z" />
    </>
  ),
};

export function ServiceIcon({ name }: { name: ServiceIconName }) {
  return (
    <svg
      className="size-16"
      viewBox="0 0 64 64"
      fill="none"
      strokeWidth={3.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {paths[name]}
    </svg>
  );
}
