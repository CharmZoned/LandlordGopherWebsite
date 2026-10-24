export type PropertyType = "apartment" | "townhome" | "single-family";

export type ListingPhoto = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** True when the image is a stand-in illustration, not a photo of the property. */
  placeholder?: boolean;
};

/**
 * One rental listing. Optional fields are left out when the source does not supply them;
 * the UI never fills in missing facts.
 */
export type Listing = {
  id: string;
  title: string;
  /** Verified street address, when the source provides one. */
  address?: string;
  city: string;
  state: string;
  zip?: string;
  neighborhood?: string;
  propertyType: PropertyType;
  monthlyRent: number;
  /** 0 means a studio. */
  bedrooms?: number;
  bathrooms?: number;
  squareFeet?: number;
  description?: string;
  photos: readonly ListingPhoto[];
  /** True for design-preview fixtures that are not real, available homes. */
  sample?: boolean;
};

export type ListingsResult = {
  listings: readonly Listing[];
  /** "demo" when the listings are sample fixtures rather than live availability. */
  mode: "demo" | "live";
};
