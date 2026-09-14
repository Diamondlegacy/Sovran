import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <>
      <div className="hero-band">
        <div className="container">
          <h1>One search. Every way to get there and stay.</h1>
          <p>
            Flights, hotels, and apartments in one place — built for travelers
            who don't want to juggle four different tabs to plan one trip.
          </p>

          <div className="search-tabs">
            <span className="search-tab active">Flights</span>
          </div>
          <div className="search-panel">
            <div className="field">
              <label>From</label>
              <input placeholder="LOS" />
            </div>
            <div className="field">
              <label>To</label>
              <input placeholder="LON" />
            </div>
            <div className="field">
              <label>Depart</label>
              <input type="date" />
            </div>
            <Link to="/flights" className="btn-primary btn-gold" style={{ textAlign: 'center', textDecoration: 'none' }}>
              Search flights
            </Link>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="vertical-grid">
          <Link to="/flights" className="vertical-card">
            <div className="eyebrow">Flights</div>
            <h3>Get there</h3>
            <p>Compare fares across airlines and find the route that works.</p>
          </Link>
          <Link to="/hotels" className="vertical-card">
            <div className="eyebrow">Hotels</div>
            <h3>Somewhere to stay</h3>
            <p>Search hotels by city with real-time rates and availability.</p>
          </Link>
          <Link to="/apartments" className="vertical-card">
            <div className="eyebrow">Apartments</div>
            <h3>Stay longer</h3>
            <p>Browse long-term apartment listings posted directly by owners.</p>
          </Link>
        </div>
      </div>
    </>
  );
}
