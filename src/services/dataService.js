// src/services/dataService.js
// Single place all frontend code talks to the backend from.
// If a fetch shape ever changes, this is the only file that should need editing.

async function request(path) {
  const res = await fetch(path);
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || `Request failed (${res.status})`);
  }
  return data;
}

export const flightsApi = {
  search: ({ origin, destination, departureDate, returnDate, adults }) => {
    const params = new URLSearchParams({
      action: 'search',
      origin,
      destination,
      departureDate,
      adults: adults || 1,
    });
    if (returnDate) params.set('returnDate', returnDate);
    return request(`/api/flights?${params.toString()}`);
  },
};

export const hotelsApi = {
  search: ({ cityCode, checkInDate, checkOutDate, adults }) => {
    const params = new URLSearchParams({
      action: 'search',
      cityCode,
      checkInDate,
      checkOutDate,
      adults: adults || 1,
    });
    return request(`/api/hotels?${params.toString()}`);
  },
};

export const apartmentsApi = {
  list: () => request('/api/apartments?action=list'),
};
