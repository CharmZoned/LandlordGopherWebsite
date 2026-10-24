import Image from "next/image";
import { ButtonLink } from "@/components/ButtonLink";
import { Eyebrow } from "@/components/Eyebrow";
import { angiesListAwards, experienceHighlights, serviceCommitments } from "@/content/about";
import { routes } from "@/content/site";
import { AboutIcon } from "./AboutIcon";
import { HouseKeyGold, HouseKeyNavy, HousesRow } from "./Illustrations";

const sectionTitle = "font-serif text-3xl leading-tight font-bold tracking-tight text-navy-900 sm:text-[2.6rem]";

export function ExperienceStrip() {
  return (
    <section aria-label="Our experience" className="border-b border-line bg-white">
      <ul className="container-page grid gap-6 py-8 sm:grid-cols-3 sm:gap-0">
        {experienceHighlights.map((item) => (
          <li
            key={item.title}
            className="flex items-center gap-4 sm:justify-center sm:border-l sm:border-line sm:px-4 sm:first:border-l-0 lg:px-8"
          >
            <AboutIcon name={item.icon} className="size-12 shrink-0" />
            <p>
              <span className="block font-serif text-xl font-bold text-navy-900">{item.title}</span>
              <span className="block text-ink-700">{item.text}</span>
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function StorySection() {
  return (
    <section aria-labelledby="story-title" className="bg-white py-16 sm:py-20">
      <div className="container-page grid items-center gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-14">
        <div>
          <Eyebrow>Our Story</Eyebrow>
          <h2 id="story-title" className={`mt-3 ${sectionTitle}`}>
            A better way to manage property.
          </h2>
          <div className="mt-6 space-y-5 text-lg leading-relaxed text-ink-700">
            <p>
              Our founders have worked in residential property management since 2001, managing thousands of units
              across Baltimore and the DMV.
            </p>
            <p>
              In 2015, we asked our customers what their ideal property management company would look like. Their
              feedback inspired a different approach: flat-rate pricing and service that puts owners and tenants
              first.
            </p>
          </div>
        </div>

        <aside className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-50 to-brand-100 px-7 pt-9 pb-24 shadow-[0_8px_24px_-16px_rgba(11,42,91,0.35)] sm:px-10">
          <p className="font-serif text-3xl leading-tight font-bold text-navy-900 sm:text-4xl">
            <span className="block">One property or 100.</span>{" "}
            <span className="block text-brand-600">You matter to us.</span>
          </p>
          <span aria-hidden="true" className="mt-5 block h-[3px] w-12 rounded-full bg-gold-500" />
          <p className="mt-5 max-w-xs text-lg leading-relaxed text-ink-700">
            As investors ourselves, we understand what your property means to you.
          </p>
          <HousesRow className="absolute right-0 bottom-0 w-56 sm:w-64" />
        </aside>
      </div>
    </section>
  );
}

export function PhilosophySection() {
  return (
    <section aria-labelledby="philosophy-title" className="bg-brand-50 py-14 sm:py-16">
      <div className="container-page grid items-center gap-8 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:gap-12">
        <HouseKeyGold className="mx-auto w-full max-w-sm md:max-w-md" />
        <div>
          <Eyebrow>Our Philosophy</Eyebrow>
          <h2 id="philosophy-title" className={`mt-3 ${sectionTitle}`}>
            <span className="block">Flat-rate pricing.</span>{" "}
            <span className="block">No 10% management fee.</span>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-ink-700">
            Our management fee is based on the service we provide—not a percentage of your rent. Whether you own a
            single-family home, townhome, or apartment, our philosophy stays the same: straightforward pricing and
            dependable support.
          </p>
        </div>
      </div>
    </section>
  );
}

export function CommitmentsSection() {
  return (
    <section aria-labelledby="commitments-title" className="bg-white py-16 sm:py-20">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <h2 id="commitments-title" className={sectionTitle}>
            Great pricing. Even better service.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-700">
            Experienced property managers. An investor’s perspective. A team that treats your property like it
            matters.
          </p>
        </div>
        <ul className="mt-12 grid gap-10 md:grid-cols-3 md:gap-0">
          {serviceCommitments.map((item) => (
            <li
              key={item.title}
              className="md:border-l md:border-line md:px-8 md:first:border-l-0 md:first:pl-0 md:last:pr-0 lg:px-10"
            >
              <AboutIcon name={item.icon} className="size-14" />
              <h3 className="mt-4 font-serif text-2xl font-bold text-navy-900">{item.title}</h3>
              <p className="mt-2 text-[1.05rem] leading-relaxed text-ink-700">{item.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function AwardsSection() {
  return (
    <section aria-labelledby="awards-title" className="border-t border-line bg-white py-12 sm:py-14">
      <div className="container-page text-center">
        <h2 id="awards-title" className="font-serif text-2xl font-bold text-navy-900 sm:text-3xl">
          Angie’s List Super Service Award
        </h2>
        <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-4 gap-y-6 sm:gap-x-10">
          {angiesListAwards.map((award) => (
            <li key={award.year}>
              <Image
                src={award.src}
                alt={`Angie’s List Super Service Award ${award.year}`}
                width={230}
                height={203}
                sizes="(min-width: 640px) 176px, 96px"
                className="h-auto w-24 sm:w-44"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function InvestSection() {
  return (
    <section
      aria-labelledby="invest-title"
      className="overflow-hidden bg-gradient-to-r from-white via-brand-50 to-brand-100/60 py-14 sm:py-16"
    >
      <div className="container-page grid items-center gap-10 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <div>
          <h2 id="invest-title" className={sectionTitle}>
            Here for your next investment, too.
          </h2>
          <span aria-hidden="true" className="mt-5 block h-[3px] w-12 rounded-full bg-gold-500" />
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-700">
            Looking to grow your portfolio or sell a property? Our Maryland-licensed real estate agents can help you
            buy and sell, with your investment goals in mind.
          </p>
          <ButtonLink href={routes.contact} variant="text" arrow className="mt-3">
            Talk to Our Team
          </ButtonLink>
        </div>
        <div className="relative mx-auto w-full max-w-md">
          <div aria-hidden="true" className="absolute inset-[6%_4%_-30%] rounded-full bg-brand-100/80" />
          <HouseKeyNavy className="relative w-full" />
        </div>
      </div>
    </section>
  );
}
