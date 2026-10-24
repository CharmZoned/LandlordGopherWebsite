# Landlord Gopher Website

Marketing site for Landlord Gopher Investor Concierge Services, built with Next.js (App Router), React, TypeScript and Tailwind CSS v4.

## Structure

- `src/app/` holds the routes: `/`, `/about`, `/current-listings`, `/current-listings/[id]`, `/contact`, plus `sitemap.xml` and `robots.txt`. The listings routes render on demand because they read search filters from the URL; the rest are prerendered as static pages.
- `src/app/api/inquiry/route.ts` is the inquiry form endpoint. It saves submissions to Supabase from the server.
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

Submissions are saved to the `inquiries` table in Supabase (schema in `supabase/migrations/`). The table has row-level security on with no policies, so only the server-side secret key can write to it.

Copy `.env.example` to `.env.local` and set:

| Variable | Purpose |
| --- | --- |
| `SUPABASE_URL` | Supabase project URL (`https://bgjkjtfgrfiszbzatriq.supabase.co`). |
| `SUPABASE_SECRET_KEY` | Supabase secret key (`sb_secret_…` or legacy `service_role`), from Project Settings → API Keys. Never commit it or prefix it with `NEXT_PUBLIC_`. |
| `NEXT_PUBLIC_SITE_URL` | Optional canonical URL for metadata and the sitemap (default `https://landlordgopher.com`). |

The Supabase variables are read on the server only, and must also be set in the hosting provider's environment settings for production. Until both are set, the endpoint returns `503 not_configured` and the form tells visitors their message was **not** sent. It never shows a false success.

Columns written: `first_name`, `last_name`, `phone`, `email`, `referral_source`, `message`. `id`, `created_at`, `source` and `status` (`new`) come from table defaults.

## Current listings

No live listing feed is connected. `/current-listings` shows six **sample** fixtures with placeholder illustrations (`public/images/listings/`), labelled "Sample listing" and introduced by a "Design preview" notice.

To go live, implement `getListings()` in `src/lib/listings/source.ts` to fetch and map real listings to the `Listing` type and return `mode: "live"`; the notice and badges then disappear. If the source fails, throw: the route shows an error with a retry button. Do not fall back to the sample data.

Search state lives in the URL: `location`, `maxRent` (inclusive), `beds` (`studio`, `1`, `2`, `3`, `4plus`), `type` (`apartment`, `townhome`, `single-family`) and `sort` (`rent-asc` default, `rent-desc`).
