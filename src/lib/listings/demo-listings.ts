import type { Listing, ListingPhoto } from "./types";

// Design-preview fixtures. These are NOT real or available homes: titles, rents and facts
// mirror the Current Listings mockup, and the images are labelled placeholder illustrations.
// Replace the data source in ./source.ts rather than editing the page when live listings exist.

function placeholder(name: string, subject: string): ListingPhoto {
  return {
    src: `/images/listings/placeholder-${name}.svg`,
    alt: `Placeholder illustration of a ${subject}, not a photo of this property`,
    width: 1200,
    height: 800,
    placeholder: true,
  };
}

export const demoListings: readonly Listing[] = [
  {
    id: "sunny-city-apartment",
    title: "Sunny city apartment",
    city: "Baltimore",
    state: "MD",
    propertyType: "apartment",
    monthlyRent: 1350,
    bedrooms: 1,
    bathrooms: 1,
    squareFeet: 750,
    photos: [placeholder("city-apartment", "city apartment building")],
    sample: true,
  },
  {
    id: "classic-brick-rowhome",
    title: "Classic brick rowhome",
    city: "Baltimore",
    state: "MD",
    propertyType: "townhome",
    monthlyRent: 1650,
    bedrooms: 2,
    bathrooms: 1,
    squareFeet: 1100,
    photos: [placeholder("brick-rowhome", "row of brick rowhomes")],
    sample: true,
  },
  {
    id: "light-filled-apartment",
    title: "Light-filled apartment",
    city: "Towson",
    state: "MD",
    propertyType: "apartment",
    monthlyRent: 1800,
    bedrooms: 2,
    bathrooms: 2,
    squareFeet: 1050,
    photos: [placeholder("garden-apartment", "garden apartment building")],
    sample: true,
  },
  {
    id: "spacious-townhome",
    title: "Spacious townhome",
    city: "Catonsville",
    state: "MD",
    propertyType: "townhome",
    monthlyRent: 2100,
    bedrooms: 3,
    bathrooms: 2,
    squareFeet: 1450,
    photos: [placeholder("townhome", "townhome")],
    sample: true,
  },
  {
    id: "welcoming-single-family-home",
    title: "Welcoming single-family home",
    city: "Parkville",
    state: "MD",
    propertyType: "single-family",
    monthlyRent: 2350,
    bedrooms: 3,
    bathrooms: 2,
    squareFeet: 1650,
    photos: [placeholder("single-family", "single-family home with a front porch")],
    sample: true,
  },
  {
    id: "room-to-settle-in",
    title: "Room to settle in",
    city: "Columbia",
    state: "MD",
    propertyType: "single-family",
    monthlyRent: 2650,
    bedrooms: 4,
    bathrooms: 2.5,
    squareFeet: 1900,
    photos: [placeholder("family-home-garage", "single-family home with a garage")],
    sample: true,
  },
];
