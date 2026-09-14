import { useState } from 'react';
import { flightsApi } from '../services/dataService.js';
import AirportInput from '../components/AirportInput.jsx';

export default function Flights() {
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [adults, setAdults] = useState(1);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleSearch(e) {
    e.preventDefault();
    if (!origin || !destination) {
      setError('Pick an airport from the dropdown for both From and To.');
      return;
    }
    setLoading(true);
    setError(null);
    setResults(null);
    try {
      const data = await flightsApi.search({
        origin: origin.iata_code,
        destination: destination.iata_code,
        departureDate,
        returnDate,
        adults,
      });
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
        <AirportInput label="From" placeholder="Lagos" onSelect={setOrigin} />
        <AirportInput label="To" placeholder="London" onSelect={setDestination} />
        <div className="field">
          <label htmlFor="departureDate">Depart</label>
          <input id="departureDate" type="date" value={departureDate} onChange={(e) => setDepartureDate(e.target.value)} required />
        </div>
        <div className="field">
          <label htmlFor="returnDate">Return (optional)</label>
          <input id="returnDate" type="date" value={returnDate} onChange={(e) => setReturnDate(e.target.value)} />
        </div>
        <div className="field">
          <label htmlFor="adults">Adults</label>
          <input id="adults" type="number" min="1" value={adults} onChange={(e) => setAdults(e.target.value)} />
        </div>
        <button className="btn-primary btn-gold" type="submit" disabled={loading}>
          {loading ? 'Searching…' : 'Search'}
        </button>
      </form>

      {error && <div className="status-banner">{error}</div>}
      {results && results.length === 0 && <div className="empty-state">No flights found for that route and date.</div>}
      {results && results.length > 0 && (
        <div className="card-list">
          {results.map((offer) => (
            <div className="result-card" key={offer.id}>
              <div>
                <div className="title">{offer.slices?.[0]?.origin?.iata_code} → {offer.slices?.[0]?.destination?.iata_code}</div>
                <div className="meta">{offer.owner?.name} · {offer.slices?.[0]?.segments?.length || 1} segment(s)</div>
              </div>
              <div className="price">{offer.total_currency} {offer.total_amount}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
