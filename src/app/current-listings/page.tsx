import type { Metadata } from "next";
import { ButtonLink } from "@/components/ButtonLink";
import { PageHeader } from "@/components/PageHeader";
import { routes } from "@/content/site";

export const metadata: Metadata = {
  title: "Current Listings",
  description: "Rental homes currently available from Landlord Gopher.",
};

export default function CurrentListingsPage() {
  return (
    <>
      <PageHeader
        title="Current Listings"
        intro="Looking for your next home? Available Landlord Gopher rentals will appear here."
      />
      <section aria-labelledby="listings-empty-title" className="bg-white py-16 sm:py-20">
        <div className="container-page max-w-2xl rounded-xl border border-dashed border-line px-6 py-12 text-center">
          <h2 id="listings-empty-title" className="font-serif text-2xl font-bold text-navy-900">
            No listings are posted right now
          </h2>
          <p className="mt-3 text-lg text-ink-700">
            Check back soon for available homes. Property owners who want their rental listed can get started with
            full-service management.
          </p>
          <ButtonLink href={routes.contact} arrow className="mt-6">
            Get Your Property Rented
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
