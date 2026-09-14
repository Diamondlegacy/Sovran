// /api/hotels.js
// Hotel search via Duffel Stays.
//
// IMPORTANT: as of building this, Duffel Stays is only available to
// customers in a "closed user group" — i.e. approved, authenticated
// accounts. If your sandbox calls come back with an access error, email
// stays@duffel.com to request access before troubleshooting the code.
//
// Duffel Stays searches by lat/long + radius, not by free-text city name,
// so this file includes a small lookup table for common cities. Add more
// as you need them, or swap this for a real geocoding service (Mapbox,
// Google Geocoding) once you're past the prototype stage.

const DUFFEL_BASE = 'https://api.duffel.com';

const CITY_COORDINATES = {
  LOS: { latitude: 6.5244, longitude: 3.3792 },   // Lagos
  ABV: { latitude: 9.0765, longitude: 7.3986 },   // Abuja
  LON: { latitude: 51.5072, longitude: -0.1276 }, // London
  NYC: { latitude: 40.7128, longitude: -74.0060 },// New York
  DXB: { latitude: 25.2048, longitude: 55.2708 }, // Dubai
  PAR: { latitude: 48.8566, longitude: 2.3522 },  // Paris
};

async function duffelRequest(path, { method = 'GET', body } = {}) {
  const apiKey = process.env.DUFFEL_API_KEY;
  if (!apiKey) {
    const err = new Error('DUFFEL_API_KEY is not set in your environment variables');
    err.status = 500;
    throw err;
  }

  const response = await fetch(`${DUFFEL_BASE}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Duffel-Version': 'v2',
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await response.json();
  if (!response.ok) {
    const message = data?.errors?.[0]?.message || `Duffel request failed (${response.status})`;
    const err = new Error(message);
    err.status = response.status;
    err.details = data;
    throw err;
  }
  return data;
}

// action=search -> search accommodations near a known city code
async function handleSearch(req, res) {
  const { cityCode, checkInDate, checkOutDate, adults, radius } = req.query;

  if (!cityCode) {
    return res.status(400).json({ error: 'cityCode is required' });
  }
  const coords = CITY_COORDINATES[cityCode];
  if (!coords) {
    return res.status(400).json({
      error: `Unknown cityCode "${cityCode}". Add it to CITY_COORDINATES in api/hotels.js, or wire up a geocoding service.`,
      knownCities: Object.keys(CITY_COORDINATES),
    });
  }
  if (!checkInDate || !checkOutDate) {
    return res.status(400).json({ error: 'checkInDate and checkOutDate are required' });
  }

  const guestCount = parseInt(adults, 10) || 1;
  const guests = Array.from({ length: guestCount }, () => ({ type: 'adult' }));

  const data = await duffelRequest('/stays/search', {
    method: 'POST',
    body: {
      data: {
        rooms: 1,
        guests,
        check_in_date: checkInDate,
        check_out_date: checkOutDate,
        location: {
          radius: radius ? parseInt(radius, 10) : 5,
          geographic_coordinates: coords,
        },
      },
    },
  });

  // Duffel returns search results, each wrapping an accommodation
  const results = (data.data?.results || []).map((r) => ({
    id: r.accommodation?.id,
    name: r.accommodation?.name,
    cheapest_rate_total_amount: r.cheapest_rate_total_amount,
    cheapest_rate_currency: r.cheapest_rate_currency,
  }));

  return res.status(200).json({ data: results });
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { action } = req.query;

  try {
    switch (action) {
      case 'search':
        return await handleSearch(req, res);
      default:
        return res.status(400).json({
          error: 'Unknown or missing action',
          validActions: ['search'],
        });
    }
  } catch (err) {
    console.error('Hotels API error:', err);
    return res.status(err.status || 500).json({ error: err.message || 'Internal server error' });
  }
}
