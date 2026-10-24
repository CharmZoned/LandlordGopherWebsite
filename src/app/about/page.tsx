import type { Metadata } from "next";
import { ButtonLink } from "@/components/ButtonLink";
import { PageHeader } from "@/components/PageHeader";
import { Services } from "@/components/Services";
import { Testimonials } from "@/components/Testimonials";
import { routes, site } from "@/content/site";

export const metadata: Metadata = {
  title: "About Us",
  description: `About ${site.legalName}: full-service property management for ${site.offer.price}.`,
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About us"
        title="#1 ranked property manager in the region since 2017."
        intro={`${site.legalName} helps owners rent and manage their properties, all in one place. ${site.offer.label} is only ${site.offer.price}.`}
      />
      <Services />
      <Testimonials />
      <section aria-labelledby="about-cta-title" className="bg-white py-16 text-center">
        <div className="container-page">
          <h2 id="about-cta-title" className="font-serif text-3xl font-bold text-navy-900">
            Ready to get your property rented?
          </h2>
          <ButtonLink href={routes.contact} size="lg" arrow className="mt-6">
            Get Started
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
