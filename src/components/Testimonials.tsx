import { site, testimonials, type Testimonial } from "@/content/site";
import { ButtonLink } from "./ButtonLink";

function Stars({ rating }: { rating: Testimonial["rating"] }) {
  return (
    <p role="img" aria-label={`${rating} out of 5 stars`} className="flex justify-center gap-1 text-gold-500">
      {Array.from({ length: 5 }, (_, index) => (
        <svg
          key={index}
          className={`size-5 ${index < rating ? "" : "opacity-25"}`}
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
          focusable="false"
        >
          <path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.5 7.7l5.9-.9Z" />
        </svg>
      ))}
    </p>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <figure className="flex h-full flex-col rounded-xl border border-line bg-white p-6 shadow-[0_8px_24px_-16px_rgba(11,42,91,0.35)] sm:p-7">
      <Stars rating={testimonial.rating} />
      <blockquote className="mt-4 flex-1 text-[0.95rem] leading-relaxed text-ink-700">
        <p>“{testimonial.quote}”</p>
      </blockquote>
      <figcaption className="mt-6">
        <span aria-hidden="true" className="mb-3 block h-0.5 w-10 bg-gold-500" />
        <span className="block font-bold text-navy-900">{testimonial.name}</span>
        <span className="block text-sm text-ink-500">{testimonial.role}</span>
      </figcaption>
    </figure>
  );
}

export function Testimonials() {
  return (
    <section aria-labelledby="reviews-title" className="bg-brand-50 py-16 sm:py-20">
      <div className="container-page">
        <h2
          id="reviews-title"
          className="heading-section title-rule text-center text-navy-900"
        >
          What our customers say
        </h2>
        <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <li key={testimonial.name}>
              <TestimonialCard testimonial={testimonial} />
            </li>
          ))}
        </ul>
        <p className="mt-10 text-center">
          <ButtonLink href={site.reviewsUrl} variant="outline" arrow target="_blank" rel="noopener noreferrer">
            Check Out Our Reviews
            <span className="sr-only"> (opens Google reviews in a new tab)</span>
          </ButtonLink>
        </p>
      </div>
    </section>
  );
}
