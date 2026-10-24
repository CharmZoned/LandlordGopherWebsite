/**
 * Inquiry form contract shared by the client form and the /api/inquiry route,
 * so both sides validate identically.
 */

export const referralSources = ["Angie’s List", "Google", "Referral", "Other"] as const;
export type ReferralSource = (typeof referralSources)[number];

export type Inquiry = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  referralSource: ReferralSource | "";
  message: string;
};

export type InquiryField = keyof Inquiry;
export type InquiryErrors = Partial<Record<InquiryField, string>>;

export type InquiryResponse =
  | { ok: true }
  | { ok: false; reason: "invalid"; errors: InquiryErrors }
  | { ok: false; reason: "not_configured" | "delivery_failed" | "bad_request" };

const limits: Record<InquiryField, number> = {
  firstName: 100,
  lastName: 100,
  phone: 40,
  email: 254,
  referralSource: 40,
  message: 5000,
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[0-9+().\-\s]{7,}$/;

function text(value: unknown, field: InquiryField): string {
  return typeof value === "string" ? value.trim().slice(0, limits[field]) : "";
}

/** Trims and bounds untrusted input into an Inquiry shape. */
export function normalizeInquiry(input: Record<string, unknown>): Inquiry {
  const referral = text(input.referralSource, "referralSource");
  return {
    firstName: text(input.firstName, "firstName"),
    lastName: text(input.lastName, "lastName"),
    phone: text(input.phone, "phone"),
    email: text(input.email, "email"),
    referralSource: (referralSources as readonly string[]).includes(referral)
      ? (referral as ReferralSource)
      : "",
    message: text(input.message, "message"),
  };
}

export function validateInquiry(inquiry: Inquiry): InquiryErrors {
  const errors: InquiryErrors = {};

  if (!inquiry.firstName) errors.firstName = "Please enter your first name.";

  if (!inquiry.email) {
    errors.email = "Please enter your email address.";
  } else if (!emailPattern.test(inquiry.email)) {
    errors.email = "Please enter a valid email address, like name@example.com.";
  }

  if (inquiry.phone && !phonePattern.test(inquiry.phone)) {
    errors.phone = "Please enter a valid phone number, like (555) 555-5555.";
  }

  return errors;
}
