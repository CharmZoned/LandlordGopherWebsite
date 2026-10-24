import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { demoListings } from "../src/lib/listings/demo-listings.ts";
import {
  clearFilters,
  defaultSearch,
  filterListings,
  hasActiveFilters,
  parseSearch,
  searchListings,
  sortListings,
  toQueryString,
  type ListingSearch,
} from "../src/lib/listings/search.ts";
import type { Listing } from "../src/lib/listings/types.ts";

const search = (overrides: Partial<ListingSearch>): ListingSearch => ({ ...defaultSearch, ...overrides });
const ids = (listings: readonly Listing[]) => listings.map((listing) => listing.id);

const studio: Listing = {
  id: "studio",
  title: "Studio loft",
  city: "Baltimore",
  state: "MD",
  zip: "21201",
  neighborhood: "Mount Vernon",
  propertyType: "apartment",
  monthlyRent: 1200,
  bedrooms: 0,
  bathrooms: 1,
  photos: [],
};
const noBedroomCount: Listing = { ...studio, id: "unknown-beds", bedrooms: undefined, monthlyRent: 1250 };
const fiveBed: Listing = { ...studio, id: "five-bed", propertyType: "single-family", bedrooms: 5, monthlyRent: 3200 };
const all = [...demoListings, studio, noBedroomCount, fiveBed];

describe("filterListings", () => {
  it("returns everything with no filters", () => {
    assert.equal(filterListings(demoListings, defaultSearch).length, 6);
  });

  it("treats max rent as inclusive", () => {
    assert.deepEqual(ids(filterListings(demoListings, search({ maxRent: 1650 }))), [
      "sunny-city-apartment",
      "classic-brick-rowhome",
    ]);
    assert.deepEqual(ids(filterListings(demoListings, search({ maxRent: 1649 }))), ["sunny-city-apartment"]);
    assert.deepEqual(filterListings(demoListings, search({ maxRent: 1349 })), []);
  });

  it("distinguishes Studio from Any", () => {
    assert.deepEqual(ids(filterListings(all, search({ bedrooms: "studio" }))), ["studio"]);
    assert.equal(filterListings(all, search({ bedrooms: "any" })).length, all.length);
  });

  it("matches exact bedroom counts", () => {
    assert.deepEqual(ids(filterListings(demoListings, search({ bedrooms: "3" }))), [
      "spacious-townhome",
      "welcoming-single-family-home",
    ]);
    assert.deepEqual(ids(filterListings(demoListings, search({ bedrooms: "1" }))), ["sunny-city-apartment"]);
  });

  it("treats 4+ as four or more bedrooms", () => {
    assert.deepEqual(ids(filterListings(all, search({ bedrooms: "4plus" }))), ["room-to-settle-in", "five-bed"]);
  });

  it("never matches a specific bedroom filter when the count is missing", () => {
    for (const bedrooms of ["studio", "1", "2", "3", "4plus"] as const) {
      assert.ok(!ids(filterListings(all, search({ bedrooms }))).includes("unknown-beds"));
    }
  });

  it("filters by property type", () => {
    assert.deepEqual(ids(filterListings(demoListings, search({ propertyType: "townhome" }))), [
      "classic-brick-rowhome",
      "spacious-townhome",
    ]);
  });

  it("matches location by city, state, neighborhood or ZIP, case-insensitively", () => {
    assert.deepEqual(ids(filterListings(demoListings, search({ location: "towson" }))), ["light-filled-apartment"]);
    assert.deepEqual(ids(filterListings(demoListings, search({ location: "Baltimore, MD" }))), [
      "sunny-city-apartment",
      "classic-brick-rowhome",
    ]);
    assert.deepEqual(ids(filterListings(all, search({ location: "21201" }))), ["studio", "unknown-beds", "five-bed"]);
    assert.deepEqual(ids(filterListings(all, search({ location: "mount vernon" }))), [
      "studio",
      "unknown-beds",
      "five-bed",
    ]);
    assert.deepEqual(filterListings(demoListings, search({ location: "Richmond" })), []);
  });

  it("combines filters with AND", () => {
    assert.deepEqual(
      ids(filterListings(demoListings, search({ location: "Baltimore", maxRent: 2000, bedrooms: "2" }))),
      ["classic-brick-rowhome"],
    );
    assert.deepEqual(
      ids(filterListings(demoListings, search({ propertyType: "apartment", bedrooms: "2", maxRent: 1800 }))),
      ["light-filled-apartment"],
    );
    assert.deepEqual(filterListings(demoListings, search({ propertyType: "single-family", maxRent: 2300 })), []);
  });
});

describe("sortListings", () => {
  it("defaults to rent low to high", () => {
    assert.deepEqual(
      searchListings([...demoListings].reverse(), defaultSearch).map((listing) => listing.monthlyRent),
      [1350, 1650, 1800, 2100, 2350, 2650],
    );
  });

  it("sorts rent high to low", () => {
    assert.deepEqual(
      sortListings(demoListings, "rent-desc").map((listing) => listing.monthlyRent),
      [2650, 2350, 2100, 1800, 1650, 1350],
    );
  });

  it("does not mutate its input", () => {
    const input = [...demoListings].reverse();
    const before = ids(input);
    sortListings(input, "rent-asc");
    assert.deepEqual(ids(input), before);
  });
});

describe("URL state", () => {
  it("round-trips a search through the query string", () => {
    const value = search({ location: "Towson", maxRent: 2000, bedrooms: "4plus", propertyType: "apartment", sort: "rent-desc" });
    const query = toQueryString(value);
    assert.equal(query, "?location=Towson&maxRent=2000&beds=4plus&type=apartment&sort=rent-desc");
    assert.deepEqual(parseSearch(new URLSearchParams(query)), value);
  });

  it("omits defaults so the plain page URL has no query", () => {
    assert.equal(toQueryString(defaultSearch), "");
  });

  it("parses Next.js searchParams objects, taking the first repeated value", () => {
    assert.deepEqual(parseSearch({ beds: ["2", "3"], type: "townhome" }), search({ bedrooms: "2", propertyType: "townhome" }));
  });

  it("ignores invalid values", () => {
    assert.deepEqual(
      parseSearch({ beds: "7", type: "castle", sort: "newest", maxRent: "-5" }),
      defaultSearch,
    );
    assert.equal(parseSearch({ maxRent: "abc" }).maxRent, null);
    assert.equal(parseSearch({ maxRent: "0" }).maxRent, null);
    assert.equal(parseSearch({ maxRent: "$2,000" }).maxRent, 2000);
  });

  it("trims and collapses whitespace in the location", () => {
    assert.equal(parseSearch({ location: "  Ellicott   City " }).location, "Ellicott City");
  });
});

describe("reset", () => {
  it("clears every filter but keeps the sort order", () => {
    const applied = search({ location: "Towson", maxRent: 1800, bedrooms: "studio", propertyType: "apartment", sort: "rent-desc" });
    assert.ok(hasActiveFilters(applied));
    const cleared = clearFilters(applied);
    assert.deepEqual(cleared, search({ sort: "rent-desc" }));
    assert.ok(!hasActiveFilters(cleared));
    assert.equal(toQueryString(cleared), "?sort=rent-desc");
  });

  it("does not count the sort order as a filter", () => {
    assert.ok(!hasActiveFilters(search({ sort: "rent-desc" })));
  });
});
