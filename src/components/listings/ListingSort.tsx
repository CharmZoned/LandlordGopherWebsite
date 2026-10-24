"use client";

import { useRouter } from "next/navigation";
import { useOptimistic, useTransition } from "react";
import { routes } from "@/content/site";
import { searchParamKeys, sortOptions, toQueryString, type ListingSearch, type SortOrder } from "@/lib/listings/search";
import { inputClasses, selectChevronClasses } from "../formStyles";

/**
 * Sort order for the results. Changes apply immediately with JavaScript; without it the
 * form submits (keeping the applied filters) through its fallback button.
 */
export function ListingSort({ applied }: { applied: ListingSearch }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  // Shows the new choice right away while the re-sorted results load.
  const [sort, setSort] = useOptimistic(applied.sort);
  const filterParams = new URLSearchParams(toQueryString({ ...applied, sort: "rent-asc" }));

  function handleChange(next: SortOrder) {
    startTransition(() => {
      setSort(next);
      router.push(`${routes.listings}${toQueryString({ ...applied, sort: next })}`, { scroll: false });
    });
  }

  return (
    <form action={routes.listings} method="get" className="flex items-center gap-3" onSubmit={(event) => event.preventDefault()}>
      {[...filterParams].map(([key, value]) => (
        <input key={key} type="hidden" name={key} value={value} />
      ))}
      <label htmlFor="listing-sort" className="shrink-0 text-sm font-semibold text-navy-900">
        Sort by:
      </label>
      <select
        id="listing-sort"
        name={searchParamKeys.sort}
        value={sort}
        aria-busy={pending}
        onChange={(event) => handleChange(event.target.value as SortOrder)}
        className={`${inputClasses} ${selectChevronClasses} w-auto min-w-[12.5rem] py-2 pr-10 text-[0.95rem]`}
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <noscript>
        <button type="submit" className="min-h-11 rounded-md border-2 border-brand-600 px-3 font-semibold text-brand-700">
          Apply
        </button>
      </noscript>
    </form>
  );
}
