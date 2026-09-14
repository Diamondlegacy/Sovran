import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="container hero">
      <h1>One search. Every way to get there and stay.</h1>
      <p>
        Flights, hotels, and apartments in one place — built for travelers who
        don't want to juggle four different tabs to plan one trip.
      </p>

      <div className="search-panel" style={{ marginTop: 32, maxWidth: 640 }}>
        <Link to="/flights" className="btn-primary" style={{ textAlign: 'center', textDecoration: 'none' }}>
          Find flights
        </Link>
        <Link to="/hotels" className="btn-primary" style={{ textAlign: 'center', textDecoration: 'none', background: 'var(--ink)' }}>
          Find hotels
        </Link>
        <Link to="/apartments" className="btn-primary" style={{ textAlign: 'center', textDecoration: 'none', background: 'var(--amber)' }}>
          Browse apartments
        </Link>
      </div>
    </div>
  );
}
