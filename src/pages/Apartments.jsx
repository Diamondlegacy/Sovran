import { useEffect, useState } from 'react';
import { apartmentsApi } from '../services/dataService.js';

export default function Apartments() {
  const [listings, setListings] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    apartmentsApi
      .list()
      .then((data) => setListings(data.listings || []))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div className="container" style={{ paddingTop: 40 }}>
      <h2>Long-term apartments</h2>
      <p>Listings posted directly by landlords and agents — no middleman API.</p>

      {error && <div className="status-banner">Couldn't load listings: {error}</div>}

      {listings && listings.length === 0 && (
        <div className="empty-state">No listings yet — this is where they'll appear once the apartments database is built out.</div>
      )}

      {listings && listings.length > 0 && (
        <div className="card-list">
          {listings.map((listing) => (
            <div className="result-card" key={listing.id}>
              <div>
                <div className="title">{listing.title}</div>
                <div className="meta">{listing.location}</div>
              </div>
              <div className="price">₦{listing.monthly_rent}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
