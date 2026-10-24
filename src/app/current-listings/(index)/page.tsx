import type { Metadata } from "next";
import { ButtonLink } from "@/components/ButtonLink";
import { ListingCard } from "@/components/listings/ListingCard";
import { ListingSearchForm } from "@/components/listings/ListingSearchForm";
import { ListingSort } from "@/components/listings/ListingSort";
import { ListingsAssistance } from "@/components/listings/ListingsAssistance";
import { ListingsHero } from "@/components/listings/ListingsHero";
import { DemoNotice } from "@/components/listings/SampleBadge";
import { routes } from "@/content/site";
import { listingHref, listingsHref } from "@/lib/listings/links";
import { clearFilters, hasActiveFilters, parseSearch, searchListings, type RawSearchParams } from "@/lib/listings/search";
import { getListings } from "@/lib/listings/source";

export const metadata: Metadata = {
  title: "Current Listings",
  description:
    "Find your next place to call home. Search Landlord Gopher rental homes across Baltimore and the DMV by location, rent, bedrooms and property type.",
  alternates: { canonical: routes.listings },
};

type PageProps = {
  searchParams: Promise<RawSearchParams>;
};

function resultSummary(count: number, total: number, sample: boolean, filtered: boolean): string {
  if (total === 0) return "No homes listed right now";
  const noun = `${sample ? "sample " : ""}${count === 1 ? "home" : "homes"}`;
  if (!filtered) return `${count} ${noun}`;
  if (count === 0) return `No ${sample ? "sample " : ""}homes match your search`;
  return `${count} ${noun} ${count === 1 ? "matches" : "match"} your search`;
}

export default async function CurrentListingsPage({ searchParams }: PageProps) {
  const search = parseSearch(await searchParams);
  const { listings, mode } = await getListings();
  const results = searchListings(listings, search);
  const filtered = hasActiveFilters(search);
  const demo = mode === "demo";

  return (
    <>
      <ListingsHero />

      <div className="container-page relative z-10 -mt-14 md:-mt-12">
        <ListingSearchForm applied={search} />
        {demo && <DemoNotice className="mt-3" />}
      </div>

      <section aria-labelledby="results-title" className="bg-white pt-10 pb-16 sm:pt-12 sm:pb-20">
        <div className="container-page">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span aria-hidden="true" className="block h-[3px] w-10 rounded-full bg-gold-500" />
              <h2
                id="results-title"
                className="mt-4 font-serif text-3xl font-bold tracking-tight text-navy-900 sm:text-[2.6rem]"
              >
                Explore rentals
              </h2>
              {/* Stays mounted across searches so screen readers announce the new count. */}
              <p role="status" aria-live="polite" aria-atomic="true" className="mt-1 text-lg text-ink-700 sm:text-xl">
                {resultSummary(results.length, listings.length, demo, filtered)}
              </p>
            </div>
            {results.length > 1 && <ListingSort applied={search} />}
          </div>

          {listings.length === 0 ? (
            <div className="mt-10 rounded-xl border border-dashed border-line px-6 py-12 text-center">
              <h3 className="font-serif text-2xl font-bold text-navy-900">No listings are posted right now</h3>
              <p className="mx-auto mt-3 max-w-xl text-lg text-ink-700">
                Check back soon for available homes, or contact us and we’ll let you know what’s coming up.
              </p>
              <ButtonLink href={routes.contact} arrow className="mt-6">
                Contact Us
              </ButtonLink>
            </div>
          ) : results.length === 0 ? (
            <div className="mt-10 rounded-xl border border-dashed border-line px-6 py-12 text-center">
              <h3 className="font-serif text-2xl font-bold text-navy-900">
                No homes match your search. Try adjusting your filters.
              </h3>
              <ButtonLink href={listingsHref(clearFilters(search))} scroll={false} variant="outline" className="mt-6">
                Clear Filters
              </ButtonLink>
            </div>
          ) : (
            <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((listing) => (
                <li key={listing.id}>
                  <ListingCard listing={listing} href={listingHref(listing.id, search)} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <ListingsAssistance />
    </>
  );
}
