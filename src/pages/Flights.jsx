import { useState } from 'react';
import { flightsApi } from '../services/dataService.js';

export default function Flights() {
  const [form, setForm] = useState({
    origin: '',
    destination: '',
    departureDate: '',
    returnDate: '',
    adults: 1,
  });
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSearch(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResults(null);
    try {
      const data = await flightsApi.search(form);
      setResults(data.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container" style={{ paddingTop: 40 }}>
      <h2>Search flights</h2>

      <form className="search-panel" onSubmit={handleSearch}>
        <div className="field">
          <label htmlFor="origin">From</label>
          <input
            id="origin"
            placeholder="LOS"
            value={form.origin}
            onChange={(e) => update('origin', e.target.value.toUpperCase())}
            required
          />
        </div>
        <div className="field">
          <label htmlFor="destination">To</label>
          <input
            id="destination"
            placeholder="LON"
            value={form.destination}
            onChange={(e) => update('destination', e.target.value.toUpperCase())}
            required
          />
        </div>
        <div className="field">
          <label htmlFor="departureDate">Depart</label>
          <input
            id="departureDate"
            type="date"
            value={form.departureDate}
            onChange={(e) => update('departureDate', e.target.value)}
            required
          />
        </div>
        <div className="field">
          <label htmlFor="returnDate">Return (optional)</label>
          <input
            id="returnDate"
            type="date"
            value={form.returnDate}
            onChange={(e) => update('returnDate', e.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="adults">Adults</label>
          <input
            id="adults"
            type="number"
            min="1"
            value={form.adults}
            onChange={(e) => update('adults', e.target.value)}
          />
        </div>
        <button className="btn-primary" type="submit" disabled={loading}>
          {loading ? 'Searching…' : 'Search'}
        </button>
      </form>

      {error && (
        <div className="status-banner">
          Couldn't complete that search: {error}
        </div>
      )}

      {results && results.length === 0 && (
        <div className="empty-state">No flights found for that route and date.</div>
      )}

      {results && results.length > 0 && (
        <div className="card-list">
          {results.map((offer) => (
            <div className="result-card" key={offer.id}>
              <div>
                <div className="title">
                  {offer.slices?.[0]?.origin?.iata_code} → {offer.slices?.[0]?.destination?.iata_code}
                </div>
                <div className="meta">
                  {offer.owner?.name} · {offer.slices?.[0]?.segments?.length || 1} segment(s)
                </div>
              </div>
              <div className="price">{offer.total_currency} {offer.total_amount}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
