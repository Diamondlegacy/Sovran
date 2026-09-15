import { useEffect, useState } from 'react';
import { apartmentsApi } from '../services/dataService.js';
import GoogleMap from '../components/GoogleMap.jsx';

export default function MapPage() {
  const [listings, setListings] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    apartmentsApi
      .list()
      .then((data) => setListings(data.listings || []))
      .catch((err) => setError(err.message));
  }, []);

  const markers = listings
    .filter((l) => l.latitude != null && l.longitude != null)
    .map((l) => ({
      lat: parseFloat(l.latitude),
      lng: parseFloat(l.longitude),
      title: l.title,
      info: `${l.location} · ₦${l.monthly_rent}/month`,
    }));

  return (
    <div className="container" style={{ paddingTop: 40 }}>
      <h2>Map</h2>
      <p>Every apartment listing, plotted — click a pin for details.</p>

      {error && <div className="status-banner">Couldn't load listings: {error}</div>}
      {listings.length > 0 && markers.length === 0 && (
        <div className="empty-state">Listings exist but none have coordinates yet — add latitude/longitude when inserting a listing.</div>
      )}

      <GoogleMap markers={markers} height={520} />
    </div>
  );
}
