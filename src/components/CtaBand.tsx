import { routes } from "@/content/site";
import { ButtonLink } from "./ButtonLink";

type CtaBandProps = {
  title: string;
  text: string;
};

export function CtaBand({ title, text }: CtaBandProps) {
  return (
    <section aria-labelledby="cta-band-title" className="border-b border-white/15 bg-navy-900 py-12 text-white sm:py-14">
      <div className="container-page flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 id="cta-band-title" className="font-serif text-3xl font-bold tracking-tight sm:text-[2.6rem]">
            {title}
          </h2>
          <p className="mt-3 text-lg text-brand-100">{text}</p>
        </div>
        <div className="flex shrink-0 flex-col items-start gap-3 md:items-center">
          <ButtonLink href={routes.contact} size="lg" arrow className="md:min-w-56">
            Contact Us
          </ButtonLink>
          <ButtonLink href={routes.listings} variant="text-inverse" arrow>
            View Current Listings
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
