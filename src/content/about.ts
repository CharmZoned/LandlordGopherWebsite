export type AboutIconName =
  | "calendar"
  | "people"
  | "map-pin"
  | "person-heart"
  | "gear"
  | "home-people";

export type IconItem = {
  icon: AboutIconName;
  title: string;
  text: string;
};

export type Award = {
  year: string;
  src: string;
};

export const experienceHighlights: readonly IconItem[] = [
  { icon: "calendar", title: "Since 2001", text: "Residential management experience" },
  { icon: "people", title: "Thousands of units", text: "Managed by our founders" },
  { icon: "map-pin", title: "Baltimore & DMV", text: "Local knowledge. Personal service." },
];

export const serviceCommitments: readonly IconItem[] = [
  {
    icon: "person-heart",
    title: "Personal attention",
    text: "One rental or an entire portfolio, you deserve attentive care.",
  },
  {
    icon: "gear",
    title: "Experienced support",
    text: "A knowledgeable team to help handle the challenges of property ownership.",
  },
  {
    icon: "home-people",
    title: "Respect for your tenants",
    text: "We hold your residents and your property in the highest regard.",
  },
];

// Badge artwork supplied by Landlord Gopher; each file is 230×203.
export const angiesListAwards: readonly Award[] = [
  { year: "2018", src: "/images/angies-list-super-service-award-2018.png" },
  { year: "2019", src: "/images/angies-list-super-service-award-2019.png" },
  { year: "2020", src: "/images/angies-list-super-service-award-2020.png" },
];
