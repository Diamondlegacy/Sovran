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
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const close = () => setSidebarOpen(false);

  return (
    <>
      <nav className="nav">
        <div className="nav-inner">
          <button className="nav-toggle" onClick={() => setSidebarOpen(true)} aria-label="Open menu">
            <MenuIcon />
          </button>

          <NavLink to="/" className="nav-brand" onClick={close}>
            <img src="/logo.svg" alt="" width="28" height="28" />
            Sov<span>ran</span>
          </NavLink>

          <ul className="nav-links nav-links--desktop">
            <li><NavLink to="/" end><HomeIcon />Home</NavLink></li>
            <li><NavLink to="/flights"><FlightsIcon />Flights</NavLink></li>
            <li><NavLink to="/hotels"><HotelsIcon />Hotels</NavLink></li>
            <li><NavLink to="/apartments"><ApartmentsIcon />Apartments</NavLink></li>
            <li><NavLink to="/map"><MapIcon />Map</NavLink></li>
            <li><NavLink to="/ask"><AskIcon />Ask</NavLink></li>
          </ul>
        </div>
      </nav>

      {sidebarOpen && <div className="sidebar-overlay" onClick={close} />}

      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <NavLink to="/" className="nav-brand" onClick={close}>
            <img src="/logo.svg" alt="" width="26" height="26" />
            Sov<span>ran</span>
          </NavLink>
          <button className="nav-toggle" onClick={close} aria-label="Close menu">
            <CloseIcon />
          </button>
        </div>
        <ul className="sidebar-links">
          <li><NavLink to="/" end onClick={close}><HomeIcon />Home</NavLink></li>
          <li><NavLink to="/flights" onClick={close}><FlightsIcon />Flights</NavLink></li>
          <li><NavLink to="/hotels" onClick={close}><HotelsIcon />Hotels</NavLink></li>
          <li><NavLink to="/apartments" onClick={close}><ApartmentsIcon />Apartments</NavLink></li>
          <li><NavLink to="/map" onClick={close}><MapIcon />Map</NavLink></li>
          <li><NavLink to="/ask" onClick={close}><AskIcon />Ask</NavLink></li>
        </ul>
      </aside>

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
