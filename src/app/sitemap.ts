import type { MetadataRoute } from "next";
import { navLinks } from "@/content/site";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://landlordgopher.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return navLinks.map((link) => ({ url: new URL(link.href, baseUrl).toString() }));
}
