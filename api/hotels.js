// /api/hotels.js
// Hotel search via Duffel Stays. Takes real lat/long from the frontend's
// place autocomplete instead of a hardcoded city list.
//
// IMPORTANT: Duffel Stays is limited to an approved "closed user group" —
// if search errors out with an access message, email stays@duffel.com.

const DUFFEL_BASE = 'https://api.duffel.com';

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
    const raw = await response.text();
  let data;
  try {
    data = JSON.parse(raw);
  } catch {
    const err = new Error(
      raw.slice(0, 200) || `Duffel request failed (${response.status})`
    );
    err.status = response.status;
    throw err;
  }
  if (!response.ok) {
    const message = data?.errors?.[0]?.message || `Duffel request failed (${response.status})`;
    const err = new Error(message);
    err.status = response.status;
    err.details = data;
    throw err;
  }
  return data;
}

async function handleSearch(req, res) {
  const { lat, lng, checkInDate, checkOutDate, adults, radius } = req.query;

  if (!lat || !lng) {
    return res.status(400).json({ error: 'lat and lng are required — pick a place from the dropdown.' });
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
          geographic_coordinates: { latitude: parseFloat(lat), longitude: parseFloat(lng) },
        },
      },
    },
  });

  const results = (data.data?.results || []).map((r) => ({
    id: r.accommodation?.id,
    name: r.accommodation?.name,
    cheapest_rate_total_amount: r.cheapest_rate_total_amount,
    cheapest_rate_currency: r.cheapest_rate_currency,
  }));

  return res.status(200).json({ data: results });
}

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });
  const { action } = req.query;
  try {
    switch (action) {
      case 'search':
        return await handleSearch(req, res);
      default:
        return res.status(400).json({ error: 'Unknown or missing action', validActions: ['search'] });
    }
  } catch (err) {
    console.error('Hotels API error:', err);
    return res.status(err.status || 500).json({ error: err.message || 'Internal server error' });
  }
}
