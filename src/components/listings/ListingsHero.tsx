import Image from "next/image";
import { Eyebrow } from "../Eyebrow";
import { HomesIllustration } from "../HomesIllustration";

/** Compact Current Listings hero. The mascot is hidden on small screens so the search form stays close. */
export function ListingsHero() {
  return (
    <section
      aria-labelledby="listings-title"
      className="relative overflow-hidden bg-gradient-to-br from-white via-brand-50 to-brand-100/80"
    >
      <HomesIllustration className="pointer-events-none absolute right-0 bottom-0 hidden h-[78%] w-auto translate-x-[18%] opacity-90 md:block" />
      <div className="container-page relative grid items-end gap-6 pt-9 pb-20 sm:pt-12 md:grid-cols-[minmax(0,1fr)_auto] md:pb-16 lg:pb-14">
        <div className="max-w-2xl md:pb-12 lg:pb-14">
          <Eyebrow>Current listings</Eyebrow>
          <h1
            id="listings-title"
            className="mt-3 font-serif text-[2.125rem] leading-[1.05] font-bold tracking-tight text-navy-900 sm:text-[2.75rem] lg:text-[3.25rem]"
          >
            Find your next place <br className="hidden sm:inline" />
            to <span className="text-brand-600">call home.</span>
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-ink-700">
            Explore rental homes across Baltimore and the DMV.
          </p>
        </div>
        <Image
          src="/images/gopher-for-rent.webp"
          alt="The Landlord Gopher mascot in a tuxedo, leaning on a For Rent sign"
          width={1120}
          height={1309}
          priority
          sizes="(min-width: 1024px) 250px, 210px"
          className="relative hidden h-auto w-[210px] drop-shadow-[0_12px_18px_rgba(7,29,64,0.22)] md:mr-8 md:block lg:mr-24 lg:w-[250px]"
        />
      </div>
    </section>
  );
}
