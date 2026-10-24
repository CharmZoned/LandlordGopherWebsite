import Link from "next/link";
import { listingFacts, listingHeading, listingLocation, formatRent } from "@/lib/listings/format";
import type { Listing } from "@/lib/listings/types";
import { ArrowIcon } from "../ArrowIcon";
import { buttonClasses } from "../ButtonLink";
import { ListingIcon } from "./ListingIcons";
import { ListingPhoto } from "./ListingPhoto";
import { SampleBadge } from "./SampleBadge";

type ListingCardProps = {
  listing: Listing;
  href: string;
};

export function ListingCard({ listing, href }: ListingCardProps) {
  const heading = listingHeading(listing);
  const facts = listingFacts(listing);

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-xl border border-line bg-white p-2 shadow-[0_8px_24px_-16px_rgba(11,42,91,0.35)]">
      <div className="relative">
        <ListingPhoto
          photo={listing.photos[0]}
          sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
          className="aspect-[3/2] overflow-hidden rounded-lg"
        />
        {listing.sample && <SampleBadge className="absolute top-3 left-3" />}
      </div>

      <div className="flex flex-1 flex-col px-3 pt-4 pb-2">
        <p className="text-[1.65rem] leading-none font-bold tracking-tight text-brand-600">
          {formatRent(listing.monthlyRent)}
          <span className="ml-1 text-base font-semibold">/mo</span>
        </p>
        <h3 className="mt-2 font-serif text-xl leading-snug font-bold text-navy-900">{heading}</h3>
        <p className="mt-1.5 flex items-center gap-1.5 text-[0.95rem] text-ink-700">
          <ListingIcon name="pin" className="size-4 shrink-0 text-brand-600" />
          {listingLocation(listing)}
        </p>
        {facts.length > 0 && (
          <p className="mt-1.5 text-[0.95rem] text-ink-700">
            {facts.map((fact, index) => (
              <span key={fact}>
                {index > 0 && <span aria-hidden="true"> · </span>}
                {index > 0 && <span className="sr-only">, </span>}
                {fact}
              </span>
            ))}
          </p>
        )}
        {/* mt-auto pins the button to the card bottom so buttons align across a row. */}
        <div className="mt-auto pt-4">
          <Link href={href} className={`${buttonClasses("primary")} w-full`}>
            View Details<span className="sr-only">: {heading}</span>
            <ArrowIcon />
          </Link>
        </div>
      </div>
    </article>
  );
}
