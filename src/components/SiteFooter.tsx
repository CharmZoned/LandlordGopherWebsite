import Link from "next/link";
import { navLinks, site } from "@/content/site";
import { Logo } from "./Logo";

export function SiteFooter() {
  return (
    <footer className="bg-navy-900 text-brand-100">
      <div className="container-page flex flex-col gap-6 py-8 md:flex-row md:items-center md:justify-between">
        <Logo className="w-40" />
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-2 gap-y-1 md:justify-end">
            {navLinks.map((link, index) => (
              <li key={link.href} className="flex items-center">
                {index > 0 && <span aria-hidden="true" className="mr-2 hidden h-4 w-px bg-brand-100/40 sm:block" />}
                <Link
                  href={link.href}
                  className="inline-flex min-h-11 items-center px-2 text-sm text-white hover:text-gold-500 hover:underline"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="container-page">
        <div className="border-t border-gold-500/60 py-4 text-sm">
          <p>
            © {new Date().getFullYear()} {site.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
