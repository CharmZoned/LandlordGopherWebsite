import { NextResponse } from "next/server";
import { normalizeInquiry, validateInquiry, type InquiryResponse } from "@/lib/inquiry";

// Inquiries are saved to the Supabase "inquiries" table from the server, so the secret key
// never reaches the browser. See .env.example for the variables.

function respond(body: InquiryResponse, status: number) {
  return NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: Request) {
  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return respond({ ok: false, reason: "bad_request" }, 400);
  }
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
    return respond({ ok: false, reason: "bad_request" }, 400);
  }

  const body = raw as Record<string, unknown>;

  // Honeypot: real visitors never see or fill this field, so quietly drop bot posts.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return respond({ ok: true }, 200);
  }

  const inquiry = normalizeInquiry(body);
  const errors = validateInquiry(inquiry);
  if (Object.keys(errors).length > 0) {
    return respond({ ok: false, reason: "invalid", errors }, 422);
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const secretKey = process.env.SUPABASE_SECRET_KEY;
  if (!supabaseUrl || !secretKey) {
    return respond({ ok: false, reason: "not_configured" }, 503);
  }

  // Optional fields are stored as NULL rather than empty strings.
  const row = {
    first_name: inquiry.firstName,
    last_name: inquiry.lastName || null,
    phone: inquiry.phone || null,
    email: inquiry.email,
    referral_source: inquiry.referralSource || null,
    message: inquiry.message || null,
  };

  try {
    // The apikey header alone authenticates both new (sb_secret_…) and legacy service_role keys.
    const response = await fetch(`${supabaseUrl.replace(/\/+$/, "")}/rest/v1/inquiries`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: secretKey,
        Prefer: "return=minimal",
      },
      body: JSON.stringify(row),
      signal: AbortSignal.timeout(10_000),
      cache: "no-store",
    });
    if (!response.ok) {
      console.error(`Supabase insert responded with ${response.status}: ${await response.text()}`);
      return respond({ ok: false, reason: "delivery_failed" }, 502);
    }
  } catch (error) {
    console.error("Supabase insert request failed", error);
    return respond({ ok: false, reason: "delivery_failed" }, 502);
  }

  return respond({ ok: true }, 200);
}
