import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import client from '../api/client';

export default function ListingsPage() {
  const [listings, setListings] = useState([]);
  const [zoomImage, setZoomImage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    client.get('/listings').then((res) => setListings(res.data));
  }, []);

  const bookNow = (listingId) => {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      navigate('/login');
      return;
    }
    navigate(`/book?listingId=${listingId}`);
  };

  const galleryFor = (listing) => {
    const all = [...(listing.imageUrls || [])];
    if (listing.imageUrl && !all.includes(listing.imageUrl)) all.unshift(listing.imageUrl);
    return all;
  };

  const listingsWithGallery = useMemo(
    () => listings.map((l) => ({ ...l, gallery: galleryFor(l) })),
    [listings]
  );

  return (
    <section>
      <h2>All Listings</h2>
      <div className="grid">
        {listingsWithGallery.map((l) => (
          <article key={l.id} className="card">
            {l.gallery[0] && (
              <img
                className="listing-image"
                src={l.gallery[0]}
                alt={l.title}
                onClick={() => setZoomImage(l.gallery[0])}
              />
            )}

            {l.gallery.length > 0 && (
              <div className="gallery-row">
                {l.gallery.map((img, idx) => (
                  <img
                    key={`${l.id}-${idx}`}
                    src={img}
                    alt={`${l.title}-${idx + 1}`}
                    className="gallery-thumb"
                    onClick={() => setZoomImage(img)}
                  />
                ))}
              </div>
            )}

            <h3>{l.title}</h3>
            <p>Type: {l.listingType}</p>
            <p>Rent: {l.baseRent} ({l.rentType})</p>
            <p>Location: {l.locationText || 'N/A'}</p>
            <div className="row">
              <button onClick={() => navigate(`/listing/${l.id}`)} type="button">View</button>
              <button onClick={() => bookNow(l.id)} type="button">Book</button>
            </div>
          </article>
        ))}
      </div>

      {zoomImage && (
        <div className="zoom-overlay" onClick={() => setZoomImage('')}>
          <img className="zoom-image" src={zoomImage} alt="zoom" />
        </div>
      )}
    </section>
  );
}
