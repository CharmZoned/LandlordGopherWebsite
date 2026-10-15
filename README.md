# Landlord Gopher Website

Static marketing site for Landlord Gopher Investor Concierge Services (HTML, CSS and vanilla JS — no build step).

- `index.html` — homepage (hero, services, reviews, inquiry form)
- `listings.html` — Current Listings placeholder until a listings feed is connected
- `assets/js/config.js` — integration settings (`inquiryEndpoint`, `reviewsUrl`)

## Development

```sh
npm install
npm start      # serves the site at http://localhost:4173
npm run lint   # html-validate, stylelint and ESLint
```

The inquiry form will not report success until `inquiryEndpoint` is set in `assets/js/config.js`.
