// /api/health.js
// Hit this once deployed to confirm your Vercel functions are live at all,
// separate from whether Duffel itself is working. Visit /api/health in
// your browser — you should see { "status": "ok" }.

export default function handler(req, res) {
  res.status(200).json({
    status: 'ok',
    hasDuffelKey: Boolean(process.env.DUFFEL_API_KEY),
    time: new Date().toISOString(),
  });
}
