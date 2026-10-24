"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navLinks, routes } from "@/content/site";
import { ButtonLink } from "./ButtonLink";
import { Logo } from "./Logo";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the mobile menu on Escape and when the viewport grows to desktop.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        document.getElementById("menu-toggle")?.focus();
      }
    };
    const desktop = window.matchMedia("(min-width: 64rem)");
    const onResize = () => desktop.matches && setOpen(false);
    document.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onResize);
    return () => {
      document.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onResize);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85">
      <div className="container-page flex items-center justify-between gap-6 py-3">
        <Logo priority />

        <button
          id="menu-toggle"
          type="button"
          className="inline-flex size-12 items-center justify-center rounded-md text-navy-900 hover:bg-brand-50 lg:hidden"
          aria-expanded={open}
          aria-controls="primary-nav"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <svg className="size-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden="true">
            {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>

        <nav
          id="primary-nav"
          aria-label="Primary"
          className={`${open ? "flex" : "hidden"} absolute inset-x-0 top-full flex-col gap-2 border-b border-line bg-white px-4 pb-6 pt-2 shadow-lg lg:static lg:flex lg:flex-row lg:items-center lg:gap-10 lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none`}
        >
          <ul className="flex flex-col lg:flex-row lg:items-center lg:gap-8">
            {navLinks.map((link) => {
              const current = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={current ? "page" : undefined}
                    onClick={() => setOpen(false)}
                    className={`relative flex min-h-12 items-center text-base font-semibold text-navy-900 hover:text-brand-700 lg:min-h-11 lg:text-[0.95rem] ${
                      current
                        ? "after:absolute after:bottom-1 after:left-0 after:h-[3px] after:w-8 after:rounded-full after:bg-gold-500 lg:after:left-1/2 lg:after:-translate-x-1/2"
                        : ""
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <ButtonLink href={routes.contact} className="mt-2 lg:mt-0" onClick={() => setOpen(false)}>
            Get Started
          </ButtonLink>
        </nav>
      </div>
    </header>
  );
}
