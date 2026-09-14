# Waypoint — flights, hotels, apartments in one site

## What's in this starter

- `src/` — React + Vite frontend (Home, Flights, Hotels, Apartments pages)
- `api/` — Vercel serverless functions (`flights.js`, `hotels.js`, `apartments.js`, `health.js`)
- `db/schema.sql` — starter Postgres tables for users, listings, and bookings
- Flights and hotels are powered by **Duffel** (`DUFFEL_API_KEY`)
- Apartments will be powered by your own database once it's connected

## Local setup

1. Install dependencies:
   ```
   npm install
   ```
2. Copy `.env.example` to `.env` and add your real Duffel test key:
   ```
   cp .env.example .env
   ```
3. Run the frontend:
   ```
   npm run dev
   ```
   Note: `npm run dev` only serves the React app. To test `/api/*` routes
   locally too, install the Vercel CLI (`npm i -g vercel`) and run
   `vercel dev` instead — it runs both together.

## Deploying

1. Push this repo to GitHub (folder structure intact — use GitHub Desktop
   or `git push`, not a drag-and-drop web upload).
2. Import the repo in Vercel.
3. In Vercel → Project → Settings → Environment Variables, add:
   - `DUFFEL_API_KEY`
4. Deploy. Visit `/api/health` on your deployed URL first — it should
   return `{ "status": "ok", "hasDuffelKey": true }`. If `hasDuffelKey`
   is `false`, your env var isn't set correctly.

## Known limitations to fix as you go

- **Duffel Stays access**: hotel search may return an access error until
  Duffel approves your account for Stays (it's currently limited to a
  closed user group — email stays@duffel.com). Flights should work
  immediately with any sandbox key.
- **City lookup for hotels**: `api/hotels.js` uses a small hardcoded
  city → coordinates table. Add more cities there, or replace it with a
  real geocoding service later.
- **No auth or payments yet**: those come once flights/hotels are
  confirmed working end-to-end.
- **Apartments**: `api/apartments.js` returns an empty list until
  `db/schema.sql` is run against a real Postgres database and the
  handler is wired up to query it.

## Moving to a custom domain later

No re-hosting needed. Buy a domain (Namecheap, Porkbun, etc.), then in
Vercel → Project → Settings → Domains, add it and follow the DNS
instructions. Same deployment, new domain.
