import { routes } from "@/content/site";
import { ButtonLink } from "./ButtonLink";
import { HomesIllustration } from "./HomesIllustration";
import { InquiryForm } from "./InquiryForm";

type InquirySectionProps = {
  /** Use "h1" when the section is the page's main content (e.g. /contact). */
  headingLevel?: "h1" | "h2";
};

export function InquirySection({ headingLevel: Heading = "h2" }: InquirySectionProps) {
  return (
    <section id="get-started" aria-labelledby="inquiry-title" className="bg-white py-16 sm:py-20">
      <div className="container-page grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] lg:gap-16">
        <div className="lg:border-r lg:border-line lg:pr-12">
          <Heading
            id="inquiry-title"
            className="font-serif text-3xl leading-tight font-bold tracking-tight text-navy-900 sm:text-[2.6rem]"
          >
            Get help renting &amp; managing your property.
          </Heading>
          <p className="mt-5 text-xl leading-relaxed text-ink-700">
            Tell us a little about your property or portfolio.
          </p>
          <HomesIllustration className="mt-10 hidden w-full max-w-sm lg:block" />
        </div>

        <div>
          <InquiryForm />

          <div className="mt-8 flex items-start gap-4 border-t border-line pt-6">
            <svg
              className="size-10 shrink-0 text-gold-500"
              viewBox="0 0 40 40"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              focusable="false"
            >
              <path d="M5 19 20 6l15 13M9 16v18h22V16" />
              <path d="M17 34v-9h6v9" />
            </svg>
            <div>
              <p className="font-bold text-navy-900">Looking for your next home?</p>
              <ButtonLink href={routes.listings} variant="text" arrow>
                Browse Current Listings
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
