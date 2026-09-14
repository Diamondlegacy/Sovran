-- Run these one statement at a time in your Postgres provider's SQL editor
-- (e.g. Vercel Postgres / Neon Query tab), same as the multi-link project.

-- Users (shared login across flights/hotels/apartments/rentals)
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  full_name TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Apartment listings — your own inventory, not from a third-party API
CREATE TABLE listings (
  id SERIAL PRIMARY KEY,
  owner_id INTEGER REFERENCES users(id),
  title TEXT NOT NULL,
  location TEXT NOT NULL,
  monthly_rent NUMERIC NOT NULL,
  bedrooms INTEGER,
  description TEXT,
  status TEXT DEFAULT 'active', -- active | rented | archived
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Unified bookings across all 4 verticals (flight / hotel / rental / apartment)
CREATE TABLE bookings (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  type TEXT NOT NULL, -- 'flight' | 'hotel' | 'rental' | 'apartment'
  reference TEXT, -- Duffel order id, or listing id for apartments
  details JSONB NOT NULL, -- flexible payload per booking type
  total_amount NUMERIC,
  currency TEXT DEFAULT 'NGN',
  status TEXT DEFAULT 'pending', -- pending | confirmed | cancelled
  created_at TIMESTAMPTZ DEFAULT now()
);
