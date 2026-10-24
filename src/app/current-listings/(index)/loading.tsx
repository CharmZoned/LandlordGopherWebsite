import { ListingsHero } from "@/components/listings/ListingsHero";

/** Shown while listings load on first visit to the page. */
export default function ListingsLoading() {
  return (
    <>
      <ListingsHero />
      <section aria-labelledby="results-title" aria-busy="true" className="bg-white py-16">
        <div className="container-page">
          <h2 id="results-title" className="heading-section text-navy-900">
            Explore rentals
          </h2>
          <p role="status" className="mt-1 text-lg text-ink-700">
            Loading homes…
          </p>
          <ul aria-hidden="true" className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }, (_, index) => (
              <li key={index} className="rounded-xl border border-line p-2">
                <div className="aspect-[3/2] animate-pulse rounded-lg bg-brand-50" />
                <div className="space-y-3 px-3 py-4">
                  <div className="h-6 w-24 animate-pulse rounded bg-brand-50" />
                  <div className="h-5 w-3/4 animate-pulse rounded bg-brand-50" />
                  <div className="h-4 w-1/2 animate-pulse rounded bg-brand-50" />
                  <div className="h-11 animate-pulse rounded-md bg-brand-100/70" />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
