import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import client from '../api/client';

export default function ListingViewPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [listing, setListing] = useState(null);
  const [zoomImage, setZoomImage] = useState('');

  useEffect(() => {
    client.get('/listings').then((res) => {
      const match = res.data.find((x) => String(x.id) === String(id));
      setListing(match || null);
    });
  }, [id]);

  const gallery = useMemo(() => {
    if (!listing) return [];
    const all = [...(listing.imageUrls || [])];
    if (listing.imageUrl && !all.includes(listing.imageUrl)) all.unshift(listing.imageUrl);
    return all;
  }, [listing]);

  const mapSrc = useMemo(() => {
    if (!listing?.latitude || !listing?.longitude) return '';
    return `https://maps.google.com/maps?q=${listing.latitude},${listing.longitude}&z=15&output=embed`;
  }, [listing]);

  const bookNow = () => {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      navigate('/login');
      return;
    }
    navigate(`/book?listingId=${id}`);
  };

  if (!listing) return <section><p>Listing not found.</p></section>;

  return (
    <section>
      <h2>{listing.title}</h2>
      <p>{listing.locationText || 'Location not available'}</p>

      {gallery.length > 0 && (
        <div className="gallery-grid">
          {gallery.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`${listing.title}-${idx + 1}`}
              className="listing-image"
              onClick={() => setZoomImage(img)}
            />
          ))}
        </div>
      )}

      <div className="row">
        <button type="button" onClick={bookNow}>Book</button>
        <button type="button" onClick={() => navigate('/')}>Back to Listings</button>
      </div>

      {mapSrc && (
        <div className="card" style={{ marginTop: 14 }}>
          <h3>Map</h3>
          <iframe
            title="listing-map"
            src={mapSrc}
            width="100%"
            height="420"
            style={{ border: 0, borderRadius: '10px' }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      )}

      {zoomImage && (
        <div className="zoom-overlay" onClick={() => setZoomImage('')}>
          <img className="zoom-image" src={zoomImage} alt="zoom" />
        </div>
      )}
    </section>
  );
}
