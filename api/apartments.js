// /api/apartments.js
// Apartments are your own inventory, queried straight from Postgres.
import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { action } = req.query;

  try {
    switch (action) {
      case 'list': {
        const { rows } = await sql`
          SELECT id, title, location, monthly_rent, bedrooms, description, created_at
          FROM listings
          WHERE status = 'active'
          ORDER BY created_at DESC
        `;
        return res.status(200).json({ listings: rows });
      }
      default:
        return res.status(400).json({ error: 'Unknown or missing action', validActions: ['list'] });
    }
  } catch (err) {
    console.error('Apartments API error:', err);
    return res.status(500).json({ error: err.message || 'Internal server error' });
  }
}
