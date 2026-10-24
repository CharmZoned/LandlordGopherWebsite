import Image from "next/image";
import Link from "next/link";
import { routes, site } from "@/content/site";

type LogoProps = {
  className?: string;
  priority?: boolean;
};

// Source artwork is 1040×387; width/height keep its aspect ratio at any rendered size.
export function Logo({ className = "w-44 sm:w-52", priority = false }: LogoProps) {
  return (
    <Link href={routes.home} className={`block shrink-0 ${className}`}>
      <Image
        src="/images/landlord-gopher-logo.webp"
        alt={`${site.legalName} home`}
        width={1040}
        height={387}
        sizes="(min-width: 640px) 208px, 176px"
        priority={priority}
        className="h-auto w-full"
      />
    </Link>
  );
}
