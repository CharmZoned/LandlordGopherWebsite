export type NavLink = {
  label: string;
  href: string;
};

export type ServiceIcon = "megaphone" | "screening" | "shield-home";

export type ServiceGroup = {
  title: string;
  icon: ServiceIcon;
  items: readonly string[];
};

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  rating: 1 | 2 | 3 | 4 | 5;
};

export const site = {
  name: "Landlord Gopher",
  legalName: "Landlord Gopher Investor Concierge Services",
  tagline: "Property management made simple.",
  description:
    "Landlord Gopher Investor Concierge Services: full-service property management for $99/month. Marketing, tenant screening, leases and inspections, all in one place.",
  // Public Google Business profile, opened on the reviews panel.
  reviewsUrl:
    "https://www.google.com/search?q=Landlord+Gopher&ludocid=4897110313983215106#lrd=0x89c81798c2e74adf:0x43f607e272df0602,1,,,",
  offer: {
    label: "Full-service management",
    price: "$99/month",
  },
} as const;

export const routes = {
  home: "/",
  about: "/about",
  listings: "/current-listings",
  contact: "/contact",
} as const;

export const navLinks: readonly NavLink[] = [
  { label: "Home", href: routes.home },
  { label: "About Us", href: routes.about },
  { label: "Current Listings", href: routes.listings },
  { label: "Contact Us", href: routes.contact },
];

export const serviceGroups: readonly ServiceGroup[] = [
  {
    title: "Market your property",
    icon: "megaphone",
    items: ["Online and offline marketing", "Social media promotion"],
  },
  {
    title: "Screen prospective tenants",
    icon: "screening",
    items: ["Credit and criminal background checks", "Income and employment verification"],
  },
  {
    title: "Prepare and protect",
    icon: "shield-home",
    items: ["Professional lease application and contract", "Semi-annual property inspections"],
  },
];

// Supplied copy, verbatim. Inner quotes are single because the card wraps the
// quote in double quotes, matching the wireframe.
const sharedReview =
  "There’s a difference in ‘okay’ property management and ‘5 Star Excellence’-and Mainstay is the 5 Star kind. Kyle and Mandy have proven countless times that they truly CARE about our property. They were extremely thorough in working thru the transition of one tenant leaving and finding us a new one (which they did very quickly!). Thru emails, texts, FaceTimes-the communication was always above and beyond anything I could have ever imagined. They are truly the best in the business.";

export const testimonials: readonly Testimonial[] = [
  { quote: sharedReview, name: "Rob", role: "Owner", rating: 5 },
  { quote: sharedReview, name: "Dilaco", role: "CEO", rating: 5 },
  { quote: sharedReview, name: "John Deo", role: "HR", rating: 5 },
];
