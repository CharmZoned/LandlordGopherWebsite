"use client";

import { useRef, useState, type FormEvent, type ReactNode } from "react";
import {
  normalizeInquiry,
  referralSources,
  validateInquiry,
  type InquiryErrors,
  type InquiryField,
  type InquiryResponse,
} from "@/lib/inquiry";
import { ArrowIcon } from "./ArrowIcon";
import { inputClasses } from "./formStyles";

type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "success"; message: string }
  | { kind: "error"; message: string };

const failureMessages: Record<Exclude<InquiryResponse, { ok: true }>["reason"], string> = {
  invalid: "Please fix the highlighted fields and try again.",
  not_configured:
    "Online inquiries aren’t connected yet, so your message was not sent. Please try again later.",
  delivery_failed: "Sorry, we couldn’t send your inquiry. Please try again in a few minutes.",
  bad_request: "Sorry, something went wrong sending your inquiry. Please try again.",
};

// Field order decides which invalid field receives focus first.
const fieldOrder: InquiryField[] = ["firstName", "lastName", "phone", "email", "referralSource", "message"];


type FieldProps = {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  className?: string;
  children: (describedBy: string | undefined) => ReactNode;
};

function Field({ id, label, required, error, className = "", children }: FieldProps) {
  const errorId = `${id}-error`;
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-navy-900">
        {label}
        {required && (
          <>
            <span aria-hidden="true" className="ml-0.5 text-danger-700">*</span>
            <span className="sr-only"> (required)</span>
          </>
        )}
      </label>
      {children(error ? errorId : undefined)}
      {error && (
        <p id={errorId} className="mt-1.5 text-sm font-semibold text-danger-700">
          {error}
        </p>
      )}
    </div>
  );
}

export function InquiryForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const [errors, setErrors] = useState<InquiryErrors>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  function focusFirstError(found: InquiryErrors) {
    const first = fieldOrder.find((field) => found[field]);
    const element = first ? formRef.current?.elements.namedItem(first) : null;
    if (element instanceof HTMLElement) element.focus();
  }

  function revalidateField(field: InquiryField) {
    if (!errors[field] || !formRef.current) return;
    const next = validateInquiry(normalizeInquiry(Object.fromEntries(new FormData(formRef.current))));
    setErrors((current) => ({ ...current, [field]: next[field] }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    const found = validateInquiry(normalizeInquiry(data));
    setErrors(found);

    if (Object.keys(found).length > 0) {
      setStatus({ kind: "idle" });
      focusFirstError(found);
      return;
    }

    setStatus({ kind: "sending" });
    let result: Status;
    let fieldFocused = false;
    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data),
      });
      const body = (await response.json().catch(() => null)) as InquiryResponse | null;

      if (response.ok && body?.ok) {
        form.reset();
        result = { kind: "success", message: "Thanks! Your inquiry was sent. We’ll be in touch soon." };
      } else if (body && !body.ok) {
        if (body.reason === "invalid") {
          setErrors(body.errors);
          focusFirstError(body.errors);
          fieldFocused = true;
        }
        result = { kind: "error", message: failureMessages[body.reason] };
      } else {
        result = { kind: "error", message: failureMessages.delivery_failed };
      }
    } catch {
      result = {
        kind: "error",
        message: "We couldn’t reach the server. Please check your connection and try again.",
      };
    }

    setStatus(result);
    if (!fieldFocused) requestAnimationFrame(() => statusRef.current?.focus());
  }

  const sending = status.kind === "sending";

  return (
    <form ref={formRef} noValidate onSubmit={handleSubmit} aria-describedby="inquiry-required-note">
      <p id="inquiry-required-note" className="mb-4 text-sm text-ink-500">
        Fields marked <span aria-hidden="true" className="text-danger-700">*</span>
        <span className="sr-only">with an asterisk</span> are required.
      </p>

      <div className="grid gap-x-5 gap-y-4 sm:grid-cols-2">
        <Field id="inquiry-first-name" label="First name" required error={errors.firstName}>
          {(describedBy) => (
            <input
              id="inquiry-first-name"
              name="firstName"
              type="text"
              autoComplete="given-name"
              placeholder="First name"
              required
              aria-invalid={errors.firstName ? true : undefined}
              aria-describedby={describedBy}
              onBlur={() => revalidateField("firstName")}
              className={inputClasses}
            />
          )}
        </Field>
        <Field id="inquiry-last-name" label="Last name">
          {() => (
            <input
              id="inquiry-last-name"
              name="lastName"
              type="text"
              autoComplete="family-name"
              placeholder="Last name"
              className={inputClasses}
            />
          )}
        </Field>
        <Field id="inquiry-phone" label="Phone number" error={errors.phone}>
          {(describedBy) => (
            <input
              id="inquiry-phone"
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="(555) 555-5555"
              aria-invalid={errors.phone ? true : undefined}
              aria-describedby={describedBy}
              onBlur={() => revalidateField("phone")}
              className={inputClasses}
            />
          )}
        </Field>
        <Field id="inquiry-email" label="Email" required error={errors.email}>
          {(describedBy) => (
            <input
              id="inquiry-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@yourdomain.com"
              required
              aria-invalid={errors.email ? true : undefined}
              aria-describedby={describedBy}
              onBlur={() => revalidateField("email")}
              className={inputClasses}
            />
          )}
        </Field>
        <Field id="inquiry-referral" label="How did you hear about us?" className="sm:col-span-2">
          {() => (
            <select id="inquiry-referral" name="referralSource" defaultValue="" className={`${inputClasses} pr-10`}>
              <option value="">Select an option</option>
              {referralSources.map((source) => (
                <option key={source} value={source}>
                  {source}
                </option>
              ))}
            </select>
          )}
        </Field>
        <Field
          id="inquiry-message"
          label="What should we know about your property or portfolio?"
          className="sm:col-span-2"
        >
          {() => (
            <textarea
              id="inquiry-message"
              name="message"
              rows={4}
              placeholder="Tell us about your property or portfolio…"
              className={`${inputClasses} resize-y`}
            />
          )}
        </Field>

        {/* Honeypot for spam bots; hidden from people and assistive tech. */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label htmlFor="inquiry-website">Website</label>
          <input id="inquiry-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
        </div>
      </div>

      <button
        type="submit"
        disabled={sending}
        aria-disabled={sending}
        className="mt-6 inline-flex min-h-13 w-full items-center justify-center gap-2 rounded-md bg-brand-600 px-6 text-lg font-semibold text-white shadow-[0_6px_16px_-6px_rgba(21,84,189,0.6)] transition-colors hover:bg-brand-700 disabled:cursor-wait disabled:opacity-75"
      >
        {sending ? "Sending…" : "Get Started"}
        {!sending && <ArrowIcon />}
      </button>

      <div
        ref={statusRef}
        role="status"
        aria-live="polite"
        tabIndex={-1}
        className={`mt-4 rounded-md text-sm font-semibold empty:hidden ${
          status.kind === "success"
            ? "border border-success-700/30 bg-success-700/5 p-3 text-success-700"
            : status.kind === "error"
              ? "border border-danger-700/30 bg-danger-700/5 p-3 text-danger-700"
              : ""
        }`}
      >
        {status.kind === "success" || status.kind === "error" ? status.message : ""}
      </div>
    </form>
  );
}
