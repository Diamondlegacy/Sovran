// /api/flights.js
// Flight search via Duffel. Needs DUFFEL_API_KEY set in your environment
// (starts with duffel_test_ while you're in sandbox).

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

// action=search -> create an offer request and return matching offers
async function handleSearch(req, res) {
  const { origin, destination, departureDate, returnDate, adults } = req.query;

  if (!origin || !destination || !departureDate) {
    return res.status(400).json({
      error: 'origin, destination, and departureDate are required',
    });
  }

  const slices = [
    { origin, destination, departure_date: departureDate },
  ];
  if (returnDate) {
    slices.push({ origin: destination, destination: origin, departure_date: returnDate });
  }

  const passengerCount = parseInt(adults, 10) || 1;
  const passengers = Array.from({ length: passengerCount }, () => ({ type: 'adult' }));

  const data = await duffelRequest('/air/offer_requests?return_offers=true', {
    method: 'POST',
    body: {
      data: {
        slices,
        passengers,
        cabin_class: 'economy',
      },
    },
  });

  // Duffel nests offers under data.offers for the offer_request response
  return res.status(200).json({ data: data.data?.offers || [] });
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
    console.error('Flights API error:', err);
    return res.status(err.status || 500).json({ error: err.message || 'Internal server error' });
  }
}
