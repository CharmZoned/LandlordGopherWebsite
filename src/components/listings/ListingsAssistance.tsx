import { routes } from "@/content/site";
import { ButtonLink } from "../ButtonLink";
import { HomesIllustration } from "../HomesIllustration";

export function ListingsAssistance() {
  return (
    <section aria-labelledby="listings-help-title" className="relative overflow-hidden bg-brand-50 py-14 sm:py-16">
      <HomesIllustration className="pointer-events-none absolute bottom-0 left-0 hidden w-80 -translate-x-1/4 lg:block" />
      <HomesIllustration className="pointer-events-none absolute right-0 bottom-0 hidden w-80 translate-x-1/4 lg:block" />
      <div className="container-page relative max-w-3xl text-center">
        <span aria-hidden="true" className="mx-auto block h-[3px] w-14 rounded-full bg-gold-500" />
        <h2
          id="listings-help-title"
          className="mt-5 font-serif text-3xl leading-tight font-bold tracking-tight text-balance text-navy-900 sm:text-[2.4rem]"
        >
          Need a hand finding your next home?
        </h2>
        <p className="mt-3 text-lg text-ink-700">Have a question about a listing? Our team is here to help.</p>
        <ButtonLink href={routes.contact} arrow className="mt-6 min-w-40">
          Contact Us
        </ButtonLink>
        <p className="mx-auto mt-6 max-w-md border-t border-line pt-3">
          <ButtonLink href={routes.contact} variant="text" className="text-[0.95rem] decoration-1">
            Own a rental property? Let’s talk about management.
          </ButtonLink>
        </p>
      </div>
    </section>
  );
}
