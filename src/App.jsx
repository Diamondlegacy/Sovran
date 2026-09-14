import { Routes, Route, NavLink } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Flights from './pages/Flights.jsx';
import Hotels from './pages/Hotels.jsx';
import Apartments from './pages/Apartments.jsx';

export default function App() {
  return (
    <>
      <nav className="nav">
        <div className="nav-inner">
          <NavLink to="/" className="nav-brand">Sov<span>ran</span></NavLink>
          <ul className="nav-links">
            <li><NavLink to="/" end>Home</NavLink></li>
            <li><NavLink to="/flights">Flights</NavLink></li>
            <li><NavLink to="/hotels">Hotels</NavLink></li>
            <li><NavLink to="/apartments">Apartments</NavLink></li>
          </ul>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/flights" element={<Flights />} />
        <Route path="/hotels" element={<Hotels />} />
        <Route path="/apartments" element={<Apartments />} />
      </Routes>

      <footer>
        <div className="footer-brand">Sovran</div>
        <div>Flights, stays, and apartments — one search, every way to travel.</div>
      </footer>
    </>
  );
}
