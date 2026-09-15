import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <>
      <div className="hero-band hero-band--simple">
        <svg className="hero-motif" viewBox="0 0 480 400" aria-hidden="true">
          <path d="M40 340 Q 200 260 300 120" fill="none" stroke="#C99A3D" strokeWidth="1" strokeDasharray="2 6" />
          <path d="M100 380 Q 260 300 420 60" fill="none" stroke="#C99A3D" strokeWidth="1" strokeDasharray="2 6" />
          <circle cx="40" cy="340" r="2.5" fill="#C99A3D" />
          <circle cx="300" cy="120" r="2.5" fill="#C99A3D" />
          <circle cx="100" cy="380" r="2.5" fill="#C99A3D" />
          <circle cx="420" cy="60" r="2.5" fill="#C99A3D" />
        </svg>
        <div className="container">
          <h1>Book like you already know where you're going.</h1>
          <p>
            Sovran cuts the noise out of trip planning — real fares, real
            rooms, real listings, compared honestly in one place.
          </p>
          <div className="hero-actions">
            <Link to="/flights" className="btn-primary btn-gold">Search flights</Link>
            <Link to="/hotels" className="btn-primary btn-ghost">Browse stays</Link>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="editorial">
          <h2>
            Most travel sites are built to upsell you.<br />
            We built this one to get you there.
          </h2>
          <div>
            <p>
              No bundled add-ons you didn't ask for, no fake urgency timers,
              no price that changes between search and checkout. Just what's
              actually available, at the actual price, from people who
              answer for it.
            </p>
            <div className="stats-row">
              <div><strong>300+</strong><span>airlines</span></div>
              <div><strong>2M+</strong><span>properties worldwide</span></div>
              <div><strong>1</strong><span>search to start</span></div>
            </div>
          </div>
        </div>

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
