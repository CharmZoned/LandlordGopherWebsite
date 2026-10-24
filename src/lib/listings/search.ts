import type { Listing, PropertyType } from "./types";

// Pure search/filter/sort logic shared by the listings page, the search form and the tests.
// Search state lives in URL query parameters so refresh, sharing and back/forward keep it.

export type BedroomFilter = "any" | "studio" | "1" | "2" | "3" | "4plus";
export type TypeFilter = "all" | PropertyType;
export type SortOrder = "rent-asc" | "rent-desc";

export type ListingSearch = {
  location: string;
  /** Inclusive monthly rent ceiling, or null for any price. */
  maxRent: number | null;
  bedrooms: BedroomFilter;
  propertyType: TypeFilter;
  sort: SortOrder;
};

export const defaultSearch: ListingSearch = {
  location: "",
  maxRent: null,
  bedrooms: "any",
  propertyType: "all",
  sort: "rent-asc",
};

export const bedroomOptions: readonly { value: BedroomFilter; label: string }[] = [
  { value: "any", label: "Any" },
  { value: "studio", label: "Studio" },
  { value: "1", label: "1 bedroom" },
  { value: "2", label: "2 bedrooms" },
  { value: "3", label: "3 bedrooms" },
  { value: "4plus", label: "4+ bedrooms" },
];

export const propertyTypeOptions: readonly { value: TypeFilter; label: string }[] = [
  { value: "all", label: "All types" },
  { value: "apartment", label: "Apartment" },
  { value: "townhome", label: "Townhome" },
  { value: "single-family", label: "Single-family home" },
];

export const maxRentOptions: readonly number[] = [1500, 2000, 2500, 3000, 3500];

export const sortOptions: readonly { value: SortOrder; label: string }[] = [
  { value: "rent-asc", label: "Rent: low to high" },
  { value: "rent-desc", label: "Rent: high to low" },
];

export const propertyTypeLabels: Record<PropertyType, string> = {
  apartment: "Apartment",
  townhome: "Townhome",
  "single-family": "Single-family home",
};

/** Query parameter names. */
export const searchParamKeys = {
  location: "location",
  maxRent: "maxRent",
  bedrooms: "beds",
  propertyType: "type",
  sort: "sort",
} as const;

export type RawSearchParams = Record<string, string | string[] | undefined>;

function first(value: string | string[] | undefined | null): string {
  return (Array.isArray(value) ? value[0] : value) ?? "";
}

function oneOf<T extends string>(value: string, options: readonly { value: T }[], fallback: T): T {
  return options.some((option) => option.value === value) ? (value as T) : fallback;
}

/** Reads search state from query parameters, ignoring invalid values. */
export function parseSearch(params: RawSearchParams | URLSearchParams): ListingSearch {
  const get = (key: string) =>
    first(params instanceof URLSearchParams ? params.get(key) : params[key]).trim();

  const rawRent = get(searchParamKeys.maxRent).replace(/[$,\s]/g, "");
  const rent = /^\d+$/.test(rawRent) ? Number(rawRent) : NaN;

  return {
    location: get(searchParamKeys.location).replace(/\s+/g, " ").slice(0, 100),
    maxRent: Number.isSafeInteger(rent) && rent > 0 ? rent : null,
    bedrooms: oneOf(get(searchParamKeys.bedrooms), bedroomOptions, defaultSearch.bedrooms),
    propertyType: oneOf(get(searchParamKeys.propertyType), propertyTypeOptions, defaultSearch.propertyType),
    sort: oneOf(get(searchParamKeys.sort), sortOptions, defaultSearch.sort),
  };
}

/** Serializes search state to a query string ("" or "?…"), leaving out defaults. */
export function toQueryString(search: ListingSearch): string {
  const params = new URLSearchParams();
  if (search.location) params.set(searchParamKeys.location, search.location);
  if (search.maxRent !== null) params.set(searchParamKeys.maxRent, String(search.maxRent));
  if (search.bedrooms !== defaultSearch.bedrooms) params.set(searchParamKeys.bedrooms, search.bedrooms);
  if (search.propertyType !== defaultSearch.propertyType) params.set(searchParamKeys.propertyType, search.propertyType);
  if (search.sort !== defaultSearch.sort) params.set(searchParamKeys.sort, search.sort);
  const query = params.toString();
  return query ? `?${query}` : "";
}

/** True when any filter (not the sort order) narrows the results. */
export function hasActiveFilters(search: ListingSearch): boolean {
  return (
    search.location !== "" ||
    search.maxRent !== null ||
    search.bedrooms !== "any" ||
    search.propertyType !== "all"
  );
}

/** Clears the filters but keeps the chosen sort order. */
export function clearFilters(search: ListingSearch): ListingSearch {
  return { ...defaultSearch, sort: search.sort };
}

function normalize(text: string): string {
  return text.toLowerCase().normalize("NFKD").replace(/[̀-ͯ]/g, "");
}

function matchesLocation(listing: Listing, location: string): boolean {
  const terms = normalize(location).split(/[\s,]+/).filter(Boolean);
  if (terms.length === 0) return true;
  const haystack = normalize(
    [listing.address, listing.neighborhood, listing.city, listing.state, listing.zip].filter(Boolean).join(" "),
  );
  return terms.every((term) => haystack.includes(term));
}

function matchesBedrooms(listing: Listing, filter: BedroomFilter): boolean {
  if (filter === "any") return true;
  // A listing without a bedroom count can't be shown to match a specific count.
  if (listing.bedrooms === undefined) return false;
  if (filter === "studio") return listing.bedrooms === 0;
  if (filter === "4plus") return listing.bedrooms >= 4;
  return listing.bedrooms === Number(filter);
}

export function filterListings(listings: readonly Listing[], search: ListingSearch): Listing[] {
  return listings.filter(
    (listing) =>
      matchesLocation(listing, search.location) &&
      (search.maxRent === null || listing.monthlyRent <= search.maxRent) &&
      matchesBedrooms(listing, search.bedrooms) &&
      (search.propertyType === "all" || listing.propertyType === search.propertyType),
  );
}

export function sortListings(listings: readonly Listing[], sort: SortOrder): Listing[] {
  const direction = sort === "rent-desc" ? -1 : 1;
  // Ties fall back to title so the order is stable across renders.
  return [...listings].sort(
    (a, b) => direction * (a.monthlyRent - b.monthlyRent) || a.title.localeCompare(b.title),
  );
}

export function searchListings(listings: readonly Listing[], search: ListingSearch): Listing[] {
  return sortListings(filterListings(listings, search), search.sort);
}
