"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition, type FormEvent, type ReactNode } from "react";
import { routes } from "@/content/site";
import {
  bedroomOptions,
  clearFilters,
  hasActiveFilters,
  maxRentOptions,
  propertyTypeOptions,
  searchParamKeys,
  toQueryString,
  type BedroomFilter,
  type ListingSearch,
  type TypeFilter,
} from "@/lib/listings/search";
import { formatRent } from "@/lib/listings/format";
import { ArrowIcon } from "../ArrowIcon";
import { inputClasses, selectChevronClasses } from "../formStyles";
import { ListingIcon } from "./ListingIcons";

type FieldProps = {
  id: string;
  label: string;
  icon: Parameters<typeof ListingIcon>[0]["name"];
  children: ReactNode;
};

function Field({ id, label, icon, children }: FieldProps) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-navy-900">
        {label}
      </label>
      <div className="relative">
        <ListingIcon
          name={icon}
          className="pointer-events-none absolute top-1/2 left-3 size-5 -translate-y-1/2 text-navy-900"
        />
        {children}
      </div>
    </div>
  );
}

const selectClasses = `${inputClasses} ${selectChevronClasses} pr-10 pl-10`;

/**
 * Listing filters. Without JavaScript it is a plain GET form to the listings page; with it,
 * submissions update the URL client-side so the server re-renders the results in place.
 */
export function ListingSearchForm({ applied }: { applied: ListingSearch }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [draft, setDraft] = useState(applied);

  // When the applied search changes (back/forward, Clear filters, sort), reset the draft to it.
  const appliedKey = toQueryString(applied);
  const [syncedKey, setSyncedKey] = useState(appliedKey);
  if (appliedKey !== syncedKey) {
    setSyncedKey(appliedKey);
    setDraft(applied);
  }

  function update<K extends keyof ListingSearch>(key: K, value: ListingSearch[K]) {
    setDraft((current) => ({ ...current, [key]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next: ListingSearch = { ...draft, location: draft.location.trim().replace(/\s+/g, " "), sort: applied.sort };
    startTransition(() => {
      router.push(`${routes.listings}${toQueryString(next)}`, { scroll: false });
    });
  }

  const rentChoices =
    applied.maxRent !== null && !maxRentOptions.includes(applied.maxRent)
      ? [...maxRentOptions, applied.maxRent].sort((a, b) => a - b)
      : maxRentOptions;

  return (
    <form
      action={routes.listings}
      method="get"
      onSubmit={handleSubmit}
      role="search"
      aria-label="Search rentals"
      className="rounded-xl border border-line bg-white p-4 shadow-[0_18px_40px_-24px_rgba(11,42,91,0.45)] sm:p-5"
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.35fr)_repeat(3,minmax(0,1fr))_auto] lg:items-end lg:gap-0 lg:divide-x lg:divide-line">
        <div className="lg:pr-4">
          <Field id="search-location" label="Location" icon="pin">
            <input
              id="search-location"
              name={searchParamKeys.location}
              type="search"
              enterKeyHint="search"
              autoComplete="address-level2"
              placeholder="City, neighborhood or ZIP"
              maxLength={100}
              value={draft.location}
              onChange={(event) => update("location", event.target.value)}
              className={`${inputClasses} pl-10`}
            />
          </Field>
        </div>
        <div className="lg:px-4">
          <Field id="search-max-rent" label="Max rent" icon="dollar">
            <select
              id="search-max-rent"
              name={searchParamKeys.maxRent}
              value={draft.maxRent === null ? "" : String(draft.maxRent)}
              onChange={(event) => update("maxRent", event.target.value ? Number(event.target.value) : null)}
              className={selectClasses}
            >
              <option value="">Any price</option>
              {rentChoices.map((amount) => (
                <option key={amount} value={amount}>
                  Up to {formatRent(amount)}/mo
                </option>
              ))}
            </select>
          </Field>
        </div>
        <div className="lg:px-4">
          <Field id="search-bedrooms" label="Bedrooms" icon="bed">
            <select
              id="search-bedrooms"
              name={searchParamKeys.bedrooms}
              value={draft.bedrooms}
              onChange={(event) => update("bedrooms", event.target.value as BedroomFilter)}
              className={selectClasses}
            >
              {bedroomOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </Field>
        </div>
        <div className="lg:px-4">
          <Field id="search-type" label="Property type" icon="home">
            <select
              id="search-type"
              name={searchParamKeys.propertyType}
              value={draft.propertyType}
              onChange={(event) => update("propertyType", event.target.value as TypeFilter)}
              className={selectClasses}
            >
              {propertyTypeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </Field>
        </div>
        <div className="sm:col-span-2 lg:col-span-1 lg:pl-4">
          {/* Keeps the chosen sort order when the form is submitted without JavaScript. */}
          {applied.sort !== "rent-asc" && <input type="hidden" name={searchParamKeys.sort} value={applied.sort} />}
          <button
            type="submit"
            aria-disabled={pending}
            className="inline-flex min-h-[2.875rem] w-full items-center justify-center gap-2 rounded-md bg-brand-600 px-7 text-lg font-semibold text-white shadow-[0_6px_16px_-6px_rgba(21,84,189,0.6)] transition-colors hover:bg-brand-700 aria-disabled:cursor-wait aria-disabled:opacity-80"
          >
            {pending ? "Searching…" : "Search"}
            {!pending && <ArrowIcon />}
          </button>
        </div>
      </div>

      {hasActiveFilters(applied) && (
        <p className="mt-3 flex justify-end">
          <Link
            href={`${routes.listings}${toQueryString(clearFilters(applied))}`}
            scroll={false}
            className="inline-flex min-h-11 items-center px-1 text-sm font-semibold text-brand-700 underline decoration-2 underline-offset-4 hover:text-navy-900"
          >
            Clear filters
          </Link>
        </p>
      )}
    </form>
  );
}
