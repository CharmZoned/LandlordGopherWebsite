import { demoListings } from "./demo-listings";
import type { Listing, ListingsResult } from "./types";

// The single place the site reads listings from. No live listing feed is connected yet, so
// this returns the sample fixtures, flagged as "demo" so the UI labels them as such.
//
// To connect a real source (property-management export, MLS/IDX feed, JSON file), fetch and
// map it to `Listing` here and return `mode: "live"`. If that request fails, throw: the route's
// error boundary shows a retry state. Never fall back to the demo fixtures on failure.

export async function getListings(): Promise<ListingsResult> {
  return { listings: demoListings, mode: "demo" };
}

export async function getListing(id: string): Promise<{ listing: Listing | undefined; mode: ListingsResult["mode"] }> {
  const { listings, mode } = await getListings();
  return { listing: listings.find((listing) => listing.id === id), mode };
}
