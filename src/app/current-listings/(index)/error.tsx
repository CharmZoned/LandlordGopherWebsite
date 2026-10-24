"use client";

import { useRouter } from "next/navigation";
import { startTransition } from "react";
import { ButtonLink } from "@/components/ButtonLink";
import { ArrowIcon } from "@/components/ArrowIcon";
import { routes } from "@/content/site";

/** Shown when the listing source fails. Never substitutes sample data. */
export default function ListingsError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const router = useRouter();

  function retry() {
    startTransition(() => {
      router.refresh();
      reset();
    });
  }

  return (
    <section aria-labelledby="listings-error-title" className="bg-white py-16 sm:py-20">
      <div role="alert" className="container-page max-w-2xl rounded-xl border border-danger-700/30 bg-danger-700/5 px-6 py-12 text-center">
        <h1 id="listings-error-title" className="font-serif text-3xl font-bold text-navy-900">
          We couldn’t load listings right now
        </h1>
        <p className="mt-3 text-base text-ink-700 sm:text-[1.0625rem]">
          Please try again in a moment. If the problem continues, contact us and we’ll help.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            onClick={retry}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-brand-600 px-5 font-semibold text-white hover:bg-brand-700"
          >
            Try again
            <ArrowIcon />
          </button>
          <ButtonLink href={routes.contact} variant="outline">
            Contact Us
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
