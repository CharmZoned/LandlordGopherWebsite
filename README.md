# Landlord Gopher Website

Marketing site for Landlord Gopher Investor Concierge Services, built with Next.js (App Router), React, TypeScript and Tailwind CSS v4.

## Structure

- `src/app/` holds the routes: `/`, `/about`, `/current-listings`, `/current-listings/[id]`, `/contact`, plus `sitemap.xml` and `robots.txt`. The listings routes render on demand because they read search filters from the URL; the rest are prerendered as static pages.
- `src/app/api/inquiry/route.ts` is the inquiry form endpoint. It forwards submissions to a server-side webhook.
- `src/components/` holds the reusable sections: `SiteHeader`, `Hero`, `Services`, `Testimonials`, `InquirySection`/`InquiryForm`, `SiteFooter`, `PageHeader`, `ButtonLink`.
- `src/content/site.ts` holds typed site content: navigation, offer, service groups and testimonials.
- `src/lib/inquiry.ts` defines the inquiry types and the validation shared by the form and the API route.
- `src/lib/listings/` holds the listing types, the data source (`source.ts`), the search/filter/sort logic (`search.ts`) and the sample fixtures (`demo-listings.ts`). Listing UI lives in `src/components/listings/`.
- `public/images/` holds the logo and gopher mascot artwork.

Only the header (mobile menu), the inquiry form and the listing search/sort controls are client components.

## Development

```sh
npm install
npm run dev        # http://localhost:3000
npm test           # listing search unit tests (Node >= 22.18, built-in test runner)
npm run check      # typecheck + lint + tests + production build
npm start          # serve the production build
```

## Inquiry form

Copy `.env.example` to `.env.local` and set:

| Variable | Purpose |
| --- | --- |
| `INQUIRY_WEBHOOK_URL` | HTTPS endpoint that receives each inquiry as JSON (CRM, Zapier/Make, Formspree, etc.). |
| `INQUIRY_WEBHOOK_SECRET` | Optional. Sent as `Authorization: Bearer <value>`. |
| `NEXT_PUBLIC_SITE_URL` | Optional canonical URL for metadata and the sitemap (default `https://landlordgopher.com`). |

These are read on the server only. Until `INQUIRY_WEBHOOK_URL` is set, the endpoint returns `503 not_configured` and the form tells visitors their message was **not** sent. It never shows a false success.

Payload fields: `firstName`, `lastName`, `phone`, `email`, `referralSource`, `message`, `source`, `submittedAt`.

## Current listings

No live listing feed is connected. `/current-listings` shows six **sample** fixtures with placeholder illustrations (`public/images/listings/`), labelled "Sample listing" and introduced by a "Design preview" notice.

To go live, implement `getListings()` in `src/lib/listings/source.ts` to fetch and map real listings to the `Listing` type and return `mode: "live"`; the notice and badges then disappear. If the source fails, throw: the route shows an error with a retry button. Do not fall back to the sample data.

Search state lives in the URL: `location`, `maxRent` (inclusive), `beds` (`studio`, `1`, `2`, `3`, `4plus`), `type` (`apartment`, `townhome`, `single-family`) and `sort` (`rent-asc` default, `rent-desc`).
