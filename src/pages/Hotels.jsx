import { useState } from 'react';
import { hotelsApi } from '../services/dataService.js';

// NOTE: Duffel Stays search (below) returns each accommodation with its
// cheapest available rate — enough for a results list. Fetching full
// room-by-room rates for booking is a separate step (Duffel's
// "search_result_id" flow) that we'll add once we're past the
// closed-user-group approval Duffel requires for Stays. See the comment
// at the top of api/hotels.js.

export default function Hotels() {
  const [cityCode, setCityCode] = useState('');
  const [dates, setDates] = useState({ checkInDate: '', checkOutDate: '' });
  const [hotels, setHotels] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleSearch(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setHotels(null);
    try {
      const data = await hotelsApi.search({ cityCode, ...dates });
      setHotels(data.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container" style={{ paddingTop: 40 }}>
      <h2>Search hotels</h2>

      <form className="search-panel" onSubmit={handleSearch}>
        <div className="field">
          <label htmlFor="cityCode">City</label>
          <input
            id="cityCode"
            placeholder="LOS"
            value={cityCode}
            onChange={(e) => setCityCode(e.target.value.toUpperCase())}
            required
          />
        </div>
        <div className="field">
          <label htmlFor="checkIn">Check-in</label>
          <input
            id="checkIn"
            type="date"
            value={dates.checkInDate}
            onChange={(e) => setDates((d) => ({ ...d, checkInDate: e.target.value }))}
            required
          />
        </div>
        <div className="field">
          <label htmlFor="checkOut">Check-out</label>
          <input
            id="checkOut"
            type="date"
            value={dates.checkOutDate}
            onChange={(e) => setDates((d) => ({ ...d, checkOutDate: e.target.value }))}
            required
          />
        </div>
        <button className="btn-primary" type="submit" disabled={loading}>
          {loading ? 'Searching…' : 'Search'}
        </button>
      </form>

      {error && <div className="status-banner">Couldn't complete that search: {error}</div>}

      {hotels && hotels.length === 0 && (
        <div className="empty-state">No hotels found near that city.</div>
      )}

      {hotels && hotels.length > 0 && (
        <div className="card-list">
          {hotels.map((hotel) => (
            <div className="result-card" key={hotel.id}>
              <div className="title">{hotel.name}</div>
              <div className="price">
                {hotel.cheapest_rate_currency} {hotel.cheapest_rate_total_amount}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
