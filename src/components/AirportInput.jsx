import { useState, useEffect, useRef } from 'react';
import { flightsApi } from '../services/dataService.js';

// Airport/city autocomplete backed by Duffel's real Place Suggestion API.
// Passes the full place object back so callers can use whatever they need
// (iata_code for flights, latitude/longitude for hotels).
export default function AirportInput({ label, onSelect, placeholder }) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function handleInput(e) {
    const text = e.target.value;
    setQuery(text);
    setOpen(true);
    onSelect(null);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (text.trim().length < 2) {
      setSuggestions([]);
      return;
    }
    timeoutRef.current = setTimeout(async () => {
      try {
        const data = await flightsApi.suggestPlaces(text);
        setSuggestions(data.data || []);
      } catch {
        setSuggestions([]);
      }
    }, 300);
  }

  function handleSelect(place) {
    const readable = `${place.city_name || place.name} (${place.iata_code})${
      place.iata_country_code ? ` — ${place.iata_country_code}` : ''
    }`;
    setQuery(readable);
    setSuggestions([]);
    setOpen(false);
    onSelect(place);
  }

  return (
    <div className="field airport-input" ref={wrapperRef}>
      <label>{label}</label>
      <input
        value={query}
        onChange={handleInput}
        onFocus={() => query && setOpen(true)}
        placeholder={placeholder}
        autoComplete="off"
        required
      />
      {open && suggestions.length > 0 && (
        <ul className="airport-suggestions">
          {suggestions.map((place) => (
            <li key={place.id}>
              <button type="button" onClick={() => handleSelect(place)}>
                <span className="code">{place.iata_code}</span>
                <span className="name">
                  {place.name}
                  {place.city_name && place.city_name !== place.name ? `, ${place.city_name}` : ''}
                  {place.iata_country_code ? ` — ${place.iata_country_code}` : ''}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
