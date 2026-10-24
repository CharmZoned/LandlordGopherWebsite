import type { Listing } from "./types";

const currency = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
const number = new Intl.NumberFormat("en-US");

export function formatRent(amount: number): string {
  return currency.format(amount);
}

function plural(count: number, one: string, many: string) {
  return `${number.format(count)} ${count === 1 ? one : many}`;
}

/** "1 bed · 1 bath · 750 sq ft", using only the facts the listing supplies. */
export function listingFacts(listing: Listing): string[] {
  const facts: string[] = [];
  if (listing.bedrooms !== undefined) {
    facts.push(listing.bedrooms === 0 ? "Studio" : plural(listing.bedrooms, "bed", "beds"));
  }
  if (listing.bathrooms !== undefined) facts.push(plural(listing.bathrooms, "bath", "baths"));
  if (listing.squareFeet !== undefined) facts.push(`${number.format(listing.squareFeet)} sq ft`);
  return facts;
}

export function listingLocation(listing: Listing): string {
  return `${listing.city}, ${listing.state}`;
}

/** The verified street address when supplied, otherwise the listing title. */
export function listingHeading(listing: Listing): string {
  return listing.address ?? listing.title;
}
