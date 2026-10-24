import { NextResponse } from "next/server";
import { normalizeInquiry, validateInquiry, type InquiryResponse } from "@/lib/inquiry";

// Inquiries are forwarded to a server-side webhook so no credentials reach the browser.
// See .env.example for the variables.

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

  const webhookUrl = process.env.INQUIRY_WEBHOOK_URL;
  if (!webhookUrl) {
    return respond({ ok: false, reason: "not_configured" }, 503);
  }

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  if (process.env.INQUIRY_WEBHOOK_SECRET) {
    headers.Authorization = `Bearer ${process.env.INQUIRY_WEBHOOK_SECRET}`;
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers,
      body: JSON.stringify({ ...inquiry, source: "landlordgopher.com", submittedAt: new Date().toISOString() }),
      signal: AbortSignal.timeout(10_000),
      cache: "no-store",
    });
    if (!response.ok) {
      console.error(`Inquiry webhook responded with ${response.status}`);
      return respond({ ok: false, reason: "delivery_failed" }, 502);
    }
  } catch (error) {
    console.error("Inquiry webhook request failed", error);
    return respond({ ok: false, reason: "delivery_failed" }, 502);
  }

  return respond({ ok: true }, 200);
}
