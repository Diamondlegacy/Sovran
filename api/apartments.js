import { createClient } from '@vercel/postgres';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { action } = req.query;

  if (action !== 'list') {
    return res.status(400).json({ error: 'Unknown or missing action', validActions: ['list'] });
  }

  const client = createClient();
  try {
    await client.connect();
    const { rows } = await client.sql`
      SELECT id, title, location, monthly_rent, bedrooms, description, latitude, longitude, created_at
      FROM listings
      WHERE status = 'active'
      ORDER BY created_at DESC
    `;
    return res.status(200).json({ listings: rows });
  } catch (err) {
    console.error('Apartments API error:', err);
    return res.status(500).json({ error: err.message || 'Internal server error' });
  } finally {
    await client.end();
  }
}
