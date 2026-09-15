import { useEffect, useRef, useState } from 'react';

let scriptLoadingPromise = null;

function loadGoogleMaps(apiKey) {
  if (window.google?.maps) return Promise.resolve();
  if (scriptLoadingPromise) return scriptLoadingPromise;

  scriptLoadingPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
    script.async = true;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
  return scriptLoadingPromise;
}

export default function GoogleMap({ markers = [], height = 480, defaultCenter = { lat: 9.082, lng: 8.6753 }, defaultZoom = 5 }) {
  const containerRef = useRef(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
      setError('VITE_GOOGLE_MAPS_API_KEY is not set in your environment variables');
      return;
    }

    let cancelled = false;

    loadGoogleMaps(apiKey)
      .then(() => {
        if (cancelled || !containerRef.current) return;

        const validMarkers = markers.filter((m) => m.lat != null && m.lng != null);

        const map = new window.google.maps.Map(containerRef.current, {
          center: validMarkers.length ? { lat: validMarkers[0].lat, lng: validMarkers[0].lng } : defaultCenter,
          zoom: validMarkers.length ? 11 : defaultZoom,
          mapId: 'SOVRAN_MAP',
        });

        const bounds = new window.google.maps.LatLngBounds();
        const infoWindow = new window.google.maps.InfoWindow();

        validMarkers.forEach((m) => {
          const position = { lat: m.lat, lng: m.lng };
          const marker = new window.google.maps.Marker({ position, map, title: m.title });
          marker.addListener('click', () => {
            infoWindow.setContent(`<strong>${m.title}</strong><br/>${m.info || ''}`);
            infoWindow.open(map, marker);
          });
          bounds.extend(position);
        });

        if (validMarkers.length > 1) map.fitBounds(bounds);
      })
      .catch(() => setError('Failed to load Google Maps'));

    return () => { cancelled = true; };
  }, [markers, defaultCenter, defaultZoom]);

  if (error) {
    return <div className="status-banner">{error}</div>;
  }

  return <div ref={containerRef} style={{ width: '100%', height, borderRadius: 8 }} />;
}
