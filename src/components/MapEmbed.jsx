// Free Google Maps embed — no API key required. For an interactive
// multi-marker map later, this would be swapped for the Maps JavaScript
// API with a real Google Cloud API key.
export default function MapEmbed({ query, height = 240 }) {
  if (!query) return null;
  const src = `https://maps.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
  return (
    <iframe
      title={`Map of ${query}`}
      src={src}
      width="100%"
      height={height}
      style={{ border: 0, borderRadius: 8, marginTop: 16 }}
      loading="lazy"
    />
  );
}
