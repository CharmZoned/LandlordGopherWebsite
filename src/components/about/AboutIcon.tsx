import type { ReactNode } from "react";
import type { AboutIconName } from "@/content/about";

// Two-tone line icons matching the homepage ServiceIcon style (navy + gold).
const navy = "var(--color-navy-900)";
const gold = "var(--color-gold-500)";

const icons: Record<AboutIconName, ReactNode> = {
  calendar: (
    <>
      <rect stroke={gold} x="8" y="12" width="48" height="44" rx="5" />
      <path stroke={gold} d="M8 24h48M20 6v12M44 6v12" />
      <path stroke={gold} d="M19 34h4M30 34h4M41 34h4M19 44h4M30 44h4" />
    </>
  ),
  people: (
    <>
      <circle stroke={gold} cx="32" cy="20" r="9" />
      <path stroke={gold} d="M16 54v-4c0-8 7-14 16-14s16 6 16 14v4Z" />
      <circle stroke={gold} cx="14" cy="26" r="6" />
      <path stroke={gold} d="M4 50v-2c0-6 4-10 10-10" />
      <circle stroke={gold} cx="50" cy="26" r="6" />
      <path stroke={gold} d="M60 50v-2c0-6-4-10-10-10" />
    </>
  ),
  "map-pin": (
    <>
      <path stroke={gold} d="M32 58S12 38 12 25a20 20 0 0 1 40 0c0 13-20 33-20 33Z" />
      <circle stroke={gold} cx="32" cy="25" r="7" />
    </>
  ),
  "person-heart": (
    <>
      <circle stroke={navy} cx="26" cy="18" r="10" />
      <path stroke={navy} d="M6 56v-4c0-10 9-17 20-17 3 0 6 .5 8.5 1.5" />
      <path stroke={navy} d="M6 56h28" />
      <path stroke={gold} d="M48 58s-12-7-12-15a6 6 0 0 1 12-2 6 6 0 0 1 12 2c0 8-12 15-12 15Z" />
    </>
  ),
  gear: (
    <>
      <path
        stroke={navy}
        d="M27 6h10l2 7 6 3 7-3 5 8-5 6v6l5 6-5 8-7-3-6 3-2 7H27l-2-7-6-3-7 3-5-8 5-6v-6l-5-6 5-8 7 3 6-3Z"
      />
      <circle stroke={gold} cx="32" cy="32" r="9" />
    </>
  ),
  "home-people": (
    <>
      <path stroke={navy} d="M4 30 26 10l18 16M8 27v27h18" />
      <path stroke={navy} d="M18 54V40h8" />
      <circle stroke={gold} cx="42" cy="38" r="5" />
      <circle stroke={gold} cx="54" cy="38" r="5" />
      <path stroke={gold} d="M33 56v-3c0-4 4-7 9-7s9 3 9 7v3ZM51 46c5 0 9 3 9 7v3h-9" />
    </>
  ),
};

export function AboutIcon({ name, className = "size-14" }: { name: AboutIconName; className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      fill="none"
      strokeWidth={3.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {icons[name]}
    </svg>
  );
}
