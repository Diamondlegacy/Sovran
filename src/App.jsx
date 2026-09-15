import { useState } from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Flights from './pages/Flights.jsx';
import Hotels from './pages/Hotels.jsx';
import Apartments from './pages/Apartments.jsx';
import Ask from './pages/Ask.jsx';
import MapPage from './pages/MapPage.jsx';
import { HomeIcon, FlightsIcon, HotelsIcon, ApartmentsIcon, AskIcon, MapIcon, MenuIcon, CloseIcon } from './components/Icons.jsx';

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav className="nav">
        <div className="nav-inner">
          <NavLink to="/" className="nav-brand" onClick={() => setMenuOpen(false)}>
            <img src="/logo.svg" alt="" width="28" height="28" />
            Sov<span>ran</span>
          </NavLink>

          <button className="nav-toggle" onClick={() => setMenuOpen((o) => !o)} aria-label="Toggle menu">
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>

          <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
            <li><NavLink to="/" end onClick={() => setMenuOpen(false)}><HomeIcon />Home</NavLink></li>
            <li><NavLink to="/flights" onClick={() => setMenuOpen(false)}><FlightsIcon />Flights</NavLink></li>
            <li><NavLink to="/hotels" onClick={() => setMenuOpen(false)}><HotelsIcon />Hotels</NavLink></li>
            <li><NavLink to="/apartments" onClick={() => setMenuOpen(false)}><ApartmentsIcon />Apartments</NavLink></li>
            <li><NavLink to="/map" onClick={() => setMenuOpen(false)}><MapIcon />Map</NavLink></li>
            <li><NavLink to="/ask" onClick={() => setMenuOpen(false)}><AskIcon />Ask</NavLink></li>
          </ul>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/flights" element={<Flights />} />
        <Route path="/hotels" element={<Hotels />} />
        <Route path="/apartments" element={<Apartments />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/ask" element={<Ask />} />
      </Routes>

      <footer>
        <div className="footer-brand">Sovran</div>
        <div>Flights, stays, and apartments — one search, every way to travel.</div>
      </footer>
    </>
  );
}
