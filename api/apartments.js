// /api/apartments.js
// Apartments are your own inventory (not a third-party API), so this will
// eventually query a `listings` table in Postgres. For now it returns an
// empty array so the frontend has something real to render against.
//
// TODO once the database is set up (see /db/schema.sql):
//   const { rows } = await pool.query('SELECT * FROM listings ORDER BY created_at DESC');
//   return res.status(200).json({ listings: rows });

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { action } = req.query;

  switch (action) {
    case 'list':
      return res.status(200).json({ listings: [] });
    default:
      return res.status(400).json({
        error: 'Unknown or missing action',
        validActions: ['list'],
      });
  }
}
