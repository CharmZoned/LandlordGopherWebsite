# Landlord Gopher Website

Marketing site for Landlord Gopher Investor Concierge Services, built with Next.js (App Router), React, TypeScript and Tailwind CSS v4.

## Structure

- `src/app/` holds the routes: `/`, `/about`, `/current-listings`, `/contact`, plus `sitemap.xml` and `robots.txt`. All of them are prerendered as static pages.
- `src/app/api/inquiry/route.ts` is the inquiry form endpoint. It forwards submissions to a server-side webhook.
- `src/components/` holds the reusable sections: `SiteHeader`, `Hero`, `Services`, `Testimonials`, `InquirySection`/`InquiryForm`, `SiteFooter`, `PageHeader`, `ButtonLink`.
- `src/content/site.ts` holds typed site content: navigation, offer, service groups and testimonials.
- `src/lib/inquiry.ts` defines the inquiry types and the validation shared by the form and the API route.
- `public/images/` holds the logo and gopher mascot artwork.

Only the header (mobile menu) and the inquiry form are client components.

## Development

```sh
npm install
npm run dev        # http://localhost:3000
npm run check      # typecheck + lint + production build
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
