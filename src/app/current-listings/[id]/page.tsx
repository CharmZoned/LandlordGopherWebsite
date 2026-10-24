import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowIcon } from "@/components/ArrowIcon";
import { ButtonLink } from "@/components/ButtonLink";
import { ListingIcon } from "@/components/listings/ListingIcons";
import { ListingPhoto } from "@/components/listings/ListingPhoto";
import { ListingsAssistance } from "@/components/listings/ListingsAssistance";
import { DemoNotice, SampleBadge } from "@/components/listings/SampleBadge";
import { routes } from "@/content/site";
import { formatRent, listingFacts, listingHeading, listingLocation } from "@/lib/listings/format";
import { listingsHref } from "@/lib/listings/links";
import { parseSearch, propertyTypeLabels, type RawSearchParams } from "@/lib/listings/search";
import { getListing } from "@/lib/listings/source";

type PageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<RawSearchParams>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const { listing } = await getListing(id);
  if (!listing) return { title: "Listing not found" };

  const facts = listingFacts(listing).join(", ");
  return {
    title: `${listingHeading(listing)}, ${listingLocation(listing)}`,
    description: `${listing.sample ? "Sample listing: " : ""}${formatRent(listing.monthlyRent)}/mo ${propertyTypeLabels[listing.propertyType].toLowerCase()} in ${listingLocation(listing)}${facts ? ` (${facts})` : ""}.`,
    alternates: { canonical: `${routes.listings}/${listing.id}` },
    // Sample fixtures are not real homes; keep them out of search results.
    robots: listing.sample ? { index: false, follow: true } : undefined,
  };
}

export default async function ListingDetailPage({ params, searchParams }: PageProps) {
  const [{ id }, rawSearch] = await Promise.all([params, searchParams]);
  const { listing, mode } = await getListing(id);
  if (!listing) notFound();

  const backHref = listingsHref(parseSearch(rawSearch));
  const heading = listingHeading(listing);
  const [mainPhoto, ...morePhotos] = listing.photos;

  const facts: { label: string; value: string; icon: Parameters<typeof ListingIcon>[0]["name"] }[] = [
    { label: "Property type", value: propertyTypeLabels[listing.propertyType], icon: "home" },
  ];
  if (listing.bedrooms !== undefined) {
    facts.push({ label: "Bedrooms", value: listing.bedrooms === 0 ? "Studio" : String(listing.bedrooms), icon: "bed" });
  }
  if (listing.bathrooms !== undefined) facts.push({ label: "Bathrooms", value: String(listing.bathrooms), icon: "bath" });
  if (listing.squareFeet !== undefined) {
    facts.push({ label: "Square feet", value: listing.squareFeet.toLocaleString("en-US"), icon: "area" });
  }

  return (
    <>
      <article aria-labelledby="listing-title" className="bg-gradient-to-b from-brand-50 to-white pt-6 pb-16 sm:pt-8 sm:pb-20">
        <div className="container-page">
          <Link
            href={backHref}
            className="inline-flex min-h-11 items-center gap-2 font-semibold text-brand-700 hover:text-navy-900 hover:underline"
          >
            <ArrowIcon className="size-[1.1em] rotate-180" />
            Back to Listings
          </Link>

          {mode === "demo" && <DemoNotice className="mt-3" />}

          <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:gap-10">
            <div>
              <div className="relative">
                <ListingPhoto
                  photo={mainPhoto}
                  priority
                  sizes="(min-width: 1216px) 700px, (min-width: 1024px) 60vw, 100vw"
                  className="aspect-[3/2] overflow-hidden rounded-xl border border-line"
                />
                {listing.sample && <SampleBadge className="absolute top-4 left-4" />}
              </div>
              {morePhotos.length > 0 && (
                <ul aria-label="More photos" className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
                  {morePhotos.map((photo) => (
                    <li key={photo.src}>
                      <ListingPhoto
                        photo={photo}
                        sizes="(min-width: 1024px) 230px, (min-width: 640px) 33vw, 50vw"
                        className="aspect-[3/2] overflow-hidden rounded-lg border border-line"
                      />
                    </li>
                  ))}
                </ul>
              )}
              {listing.photos.some((photo) => photo.placeholder) && (
                <p className="mt-2 text-sm text-ink-500">Image is a placeholder illustration, not a photo of this home.</p>
              )}
            </div>

            <div className="lg:pt-1">
              <h1
                id="listing-title"
                className="heading-section text-navy-900"
              >
                {heading}
              </h1>
              <p className="mt-2 flex items-center gap-1.5 text-lg text-ink-700">
                <ListingIcon name="pin" className="size-5 shrink-0 text-brand-600" />
                {listing.address ? `${listing.address}, ` : ""}
                {listingLocation(listing)}
                {listing.zip ? ` ${listing.zip}` : ""}
              </p>
              <p className="mt-5 text-4xl font-bold tracking-tight text-brand-600">
                {formatRent(listing.monthlyRent)}
                <span className="ml-1 text-xl font-semibold">/mo</span>
              </p>

              <h2 className="sr-only">Property facts</h2>
              <dl className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line">
                {facts.map((fact) => (
                  <div key={fact.label} className="flex items-center gap-3 bg-white p-4">
                    <ListingIcon name={fact.icon} className="size-6 shrink-0 text-gold-700" />
                    <div>
                      <dt className="text-sm text-ink-500">{fact.label}</dt>
                      <dd className="font-bold text-navy-900">{fact.value}</dd>
                    </div>
                  </div>
                ))}
              </dl>

              <div className="mt-6 rounded-xl border border-line bg-white p-5">
                <h2 className="font-serif text-xl font-bold text-navy-900">Interested in this home?</h2>
                <p className="mt-2 text-ink-700">Ask us about this listing and we’ll get back to you.</p>
                <ButtonLink href={routes.contact} arrow className="mt-4 w-full">
                  Contact Us
                </ButtonLink>
              </div>
            </div>
          </div>

          {listing.description && (
            <section aria-labelledby="listing-description-title" className="mt-10 max-w-3xl">
              <h2 id="listing-description-title" className="font-serif text-2xl font-bold text-navy-900">
                About this home
              </h2>
              <p className="mt-3 text-base leading-relaxed whitespace-pre-line text-ink-700 sm:text-[1.0625rem]">
                {listing.description}
              </p>
            </section>
          )}
        </div>
      </article>

      <ListingsAssistance />
    </>
  );
}
