import Image from "next/image";
import { routes, site } from "@/content/site";
import { ButtonLink } from "./ButtonLink";
import { Eyebrow } from "./Eyebrow";
import { HeroScene } from "./HeroScene";

export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative overflow-hidden bg-gradient-to-br from-white via-brand-50 to-brand-100/70"
    >
      <div className="container-page grid items-center gap-10 pt-10 pb-0 sm:pt-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-6 lg:pt-16">
        <div className="max-w-xl pb-2 lg:pb-16">
          <Eyebrow>Property management</Eyebrow>
          <h1
            id="hero-title"
            className="heading-display mt-4"
          >
            Property management <span className="text-brand-600">made simple.</span>
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-ink-700">
            Help renting and managing your property, all in one place.
          </p>
          <p className="mt-7">
            <span className="block text-xl font-bold text-navy-900">{site.offer.label} —</span>
            <span className="block text-3xl font-bold tracking-tight text-brand-600 sm:text-4xl">
              {site.offer.price}
            </span>
          </p>
          <div className="mt-8 flex flex-col items-start gap-4">
            <ButtonLink href={routes.contact} size="lg" arrow>
              Get Your Property Rented
            </ButtonLink>
            <ButtonLink href={routes.listings} variant="text" arrow>
              View Current Listings
            </ButtonLink>
          </div>
        </div>

        <div className="relative -mx-4 sm:mx-0 lg:mr-[min(-2rem,calc((76rem-100vw)/2-2rem))] lg:self-stretch">
          <div className="relative mx-auto aspect-[6/5] w-full max-w-xl overflow-hidden sm:rounded-t-3xl lg:max-w-none lg:rounded-none lg:[clip-path:polygon(22%_0,100%_0,100%_100%,0_100%)] lg:aspect-auto lg:h-full lg:min-h-[34rem]">
            <HeroScene className="absolute inset-0 size-full" />
            <Image
              src="/images/gopher-for-rent.webp"
              alt="The Landlord Gopher mascot in a tuxedo, leaning on a For Rent sign"
              width={1120}
              height={1309}
              priority
              sizes="(min-width: 1024px) 440px, (min-width: 640px) 380px, 70vw"
              className="absolute bottom-0 left-1/2 h-[92%] w-auto max-w-none -translate-x-1/2 drop-shadow-[0_12px_18px_rgba(7,29,64,0.25)] lg:left-[42%] lg:h-[88%]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
