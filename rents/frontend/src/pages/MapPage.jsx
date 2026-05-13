import { useEffect, useMemo, useState } from 'react';
import client from '../api/client';

export default function MapPage() {
  const [listings, setListings] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    client.get('/listings').then((res) => {
      setListings(res.data);
      const firstWithCoords = res.data.find((l) => l.latitude && l.longitude);
      setSelected(firstWithCoords || null);
    });
  }, []);

  const mapSrc = useMemo(() => {
    if (!selected?.latitude || !selected?.longitude) return '';
    return `https://maps.google.com/maps?q=${selected.latitude},${selected.longitude}&z=15&output=embed`;
  }, [selected]);

  return (
    <section>
      <h2>Listings Map</h2>
      <p className="muted">Select a listing to view its location on map.</p>

      <div className="map-layout">
        <div className="card map-list">
          {listings.map((l) => (
            <button
              key={l.id}
              type="button"
              className={`map-list-item ${selected?.id === l.id ? 'active' : ''}`}
              onClick={() => setSelected(l)}
            >
              <div>
                <strong>{l.title}</strong>
                <p>{l.locationText || 'No location text'}</p>
                <small>{l.latitude && l.longitude ? `${l.latitude}, ${l.longitude}` : 'Coordinates missing'}</small>
              </div>
            </button>
          ))}
        </div>

        <div className="card map-view">
          {!selected && <p>No listing selected.</p>}
          {selected && !mapSrc && <p>This listing has no map coordinates.</p>}
          {selected && mapSrc && (
            <>
              <h3>{selected.title}</h3>
              <p>{selected.locationText}</p>
              <iframe
                title="listing-map"
                src={mapSrc}
                width="100%"
                height="420"
                style={{ border: 0, borderRadius: '10px' }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </>
          )}
        </div>
      </div>
    </section>
  );
}
