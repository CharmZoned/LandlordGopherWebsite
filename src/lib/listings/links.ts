import { routes } from "@/content/site";
import { toQueryString, type ListingSearch } from "./search";

/** Results page URL for a search. */
export function listingsHref(search: ListingSearch): string {
  return `${routes.listings}${toQueryString(search)}`;
}

/** Detail page URL. Carries the search so "Back to listings" can restore it. */
export function listingHref(id: string, search: ListingSearch): string {
  return `${routes.listings}/${encodeURIComponent(id)}${toQueryString(search)}`;
}
