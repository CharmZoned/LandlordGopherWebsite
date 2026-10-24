import type { ReactNode } from "react";

export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={`flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.18em] text-gold-700 ${className}`}
    >
      {children}
      <span aria-hidden="true" className="h-0.5 w-12 bg-gold-500" />
    </p>
  );
}
