import Image from "next/image";
import { ButtonLink } from "@/components/ButtonLink";
import { Eyebrow } from "@/components/Eyebrow";
import { routes } from "@/content/site";
import { AboutHeroBackdrop } from "./Illustrations";

export function AboutHero() {
  return (
    <section
      aria-labelledby="about-title"
      className="relative overflow-hidden bg-gradient-to-br from-white via-brand-50 to-brand-100/70"
    >
      <div className="container-page grid items-center gap-8 pt-10 sm:pt-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-4 lg:pt-12">
        <div className="max-w-xl pb-2 lg:pb-14">
          <Eyebrow>About Landlord Gopher</Eyebrow>
          <h1
            id="about-title"
            className="mt-4 font-serif text-[2.6rem] leading-[1.04] font-bold tracking-tight text-navy-900 sm:text-6xl lg:text-[4rem]"
          >
            <span className="block">Property management.</span>{" "}
            <span className="block text-brand-600">With a personal touch.</span>
          </h1>
          <p className="mt-6 text-xl leading-relaxed text-ink-700">
            Built by property investors. Focused on better service, straightforward pricing, and the people behind
            every property.
          </p>
          <div className="mt-8 flex flex-col items-start gap-4">
            <ButtonLink href={routes.contact} size="lg" arrow className="min-w-52">
              Contact Us
            </ButtonLink>
            <ButtonLink href={routes.listings} variant="text" arrow>
              View Current Listings
            </ButtonLink>
          </div>
        </div>

        {/* Circular street-scene backdrop, cropped by the section edge on large screens. */}
        <div className="relative mx-auto aspect-square w-full max-w-md sm:max-w-lg lg:max-w-none lg:translate-x-[8%]">
          <div className="absolute inset-x-0 top-[6%] bottom-0 overflow-hidden rounded-t-full">
            <AboutHeroBackdrop className="size-full" />
          </div>
          <Image
            src="/images/gopher-platter.webp"
            alt="The Landlord Gopher mascot in a tuxedo, holding a serving platter with a towel over his arm"
            width={1272}
            height={2000}
            priority
            sizes="(min-width: 1024px) 340px, (min-width: 640px) 300px, 60vw"
            className="absolute bottom-0 left-1/2 h-[94%] w-auto max-w-none -translate-x-[42%] drop-shadow-[0_12px_18px_rgba(7,29,64,0.25)]"
          />
        </div>
      </div>
    </section>
  );
}
