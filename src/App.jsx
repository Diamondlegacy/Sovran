import { Routes, Route, NavLink } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Flights from './pages/Flights.jsx';
import Hotels from './pages/Hotels.jsx';
import Apartments from './pages/Apartments.jsx';
import Ask from './pages/Ask.jsx';
import { HomeIcon, FlightsIcon, HotelsIcon, ApartmentsIcon, AskIcon } from './components/Icons.jsx';

export default function App() {
  return (
    <>
      <nav className="nav">
        <div className="nav-inner">
          <NavLink to="/" className="nav-brand">
            <img src="/logo.svg" alt="" width="28" height="28" />
            Sov<span>ran</span>
          </NavLink>
          <ul className="nav-links">
            <li><NavLink to="/" end><HomeIcon />Home</NavLink></li>
            <li><NavLink to="/flights"><FlightsIcon />Flights</NavLink></li>
            <li><NavLink to="/hotels"><HotelsIcon />Hotels</NavLink></li>
            <li><NavLink to="/apartments"><ApartmentsIcon />Apartments</NavLink></li>
            <li><NavLink to="/ask"><AskIcon />Ask</NavLink></li>
          </ul>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/flights" element={<Flights />} />
        <Route path="/hotels" element={<Hotels />} />
        <Route path="/apartments" element={<Apartments />} />
        <Route path="/ask" element={<Ask />} />
      </Routes>

      <footer>
        <div className="footer-brand">Sovran</div>
        <div>Flights, stays, and apartments — one search, every way to travel.</div>
      </footer>
    </>
  );
}
