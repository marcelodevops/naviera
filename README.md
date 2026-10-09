# TAINA Naviera

Astro static site for the TAINA maritime-services landing page.

## Development

```sh
npm install
npm run dev
```

Create a production build with `npm run build` and preview it with `npm run preview`.

## Project structure

- `src/pages/` contains route entry points.
- `src/layouts/` contains the shared HTML document and global assets.
- `src/components/layout/` contains shared page chrome.
- `src/components/sections/` contains the landing-page sections.
- `src/scripts/` contains browser interactions and feature behavior.
- `src/data/` contains estimator values and explicitly labeled demo shipment data.
- `src/services/api.js` is the frontend boundary for the future API.

## Data and API boundary

Without `PUBLIC_API_URL`, tracking reads only the fictitious records in
`src/data/demo/shipments.js`, and quote forms open a prefilled email. The page
labels this as demo behavior; these records are not live shipments.

Setting `PUBLIC_API_URL` enables these API requests:

- `GET {PUBLIC_API_URL}/api/shipments/{trackingCode}` returns a shipment object
  matching the demo shipment shape, or HTTP 404 when it does not exist.
- `POST {PUBLIC_API_URL}/api/quotes` accepts the quote form fields as JSON.

The API must return only information safe for public display. An operational
tracking service, database, and protected staff workflow are not included yet:
they depend on the source of shipment events and the process for maintaining
those records. Do not put secrets in `PUBLIC_API_URL`; Astro exposes `PUBLIC_`
environment variables to browser code.

Copy `.env.example` to `.env` for local configuration.
