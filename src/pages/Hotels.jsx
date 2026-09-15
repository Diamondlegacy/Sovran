import { useState } from 'react';
import { hotelsApi } from '../services/dataService.js';
import AirportInput from '../components/AirportInput.jsx';
import MapEmbed from '../components/MapEmbed.jsx';

export default function Hotels() {
  const [place, setPlace] = useState(null);
  const [dates, setDates] = useState({ checkInDate: '', checkOutDate: '' });
  const [hotels, setHotels] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleSearch(e) {
    e.preventDefault();
    if (!place) {
      setError('Pick a city from the dropdown.');
      return;
    }
    const coords = place.type === 'airport'
      ? { lat: place.latitude, lng: place.longitude }
      : place.airports?.[0]
        ? { lat: place.airports[0].latitude, lng: place.airports[0].longitude }
        : null;
    if (!coords) {
      setError("Couldn't get coordinates for that place — try picking a specific airport instead of the city.");
      return;
    }
    setLoading(true);
    setError(null);
    setHotels(null);
    try {
      const data = await hotelsApi.search({ ...coords, ...dates });
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
        <AirportInput label="City" placeholder="London" onSelect={setPlace} />
        <div className="field">
          <label htmlFor="checkIn">Check-in</label>
          <input id="checkIn" type="date" value={dates.checkInDate} onChange={(e) => setDates((d) => ({ ...d, checkInDate: e.target.value }))} required />
        </div>
        <div className="field">
          <label htmlFor="checkOut">Check-out</label>
          <input id="checkOut" type="date" value={dates.checkOutDate} onChange={(e) => setDates((d) => ({ ...d, checkOutDate: e.target.value }))} required />
        </div>
        <button className="btn-primary btn-gold" type="submit" disabled={loading}>
          {loading ? 'Searching…' : 'Search'}
        </button>
      </form>

      {error && <div className="status-banner">{error}</div>}
      {place && <MapEmbed query={`${place.name}${place.iata_country_code ? ', ' + place.iata_country_code : ''}`} />}
      {hotels && hotels.length === 0 && <div className="empty-state">No hotels found near that city.</div>}
      {hotels && hotels.length > 0 && (
        <div className="card-list">
          {hotels.map((hotel) => (
            <div className="result-card" key={hotel.id}>
              <div className="title">{hotel.name}</div>
              <div className="price">{hotel.cheapest_rate_currency} {hotel.cheapest_rate_total_amount}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
