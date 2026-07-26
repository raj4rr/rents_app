import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import client from '../api/client';
import SEO from '../components/SEO';

const ImageCarousel = ({ images, title, setZoomImage }) => {
  const [currentIdx, setCurrentIdx] = useState(0);

  if (!images || images.length === 0) return null;

  const nextSlide = (e) => {
    e.stopPropagation();
    setCurrentIdx((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = (e) => {
    e.stopPropagation();
    setCurrentIdx((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div style={{ marginBottom: 16 }}>
      <div className="carousel-container" style={{ position: 'relative', overflow: 'hidden', borderRadius: 12, marginBottom: 8 }}>
        <img
          className="listing-image"
          src={images[currentIdx]}
          alt={title}
          onClick={() => setZoomImage(images[currentIdx])}
          style={{ width: '100%', height: '400px', objectFit: 'cover', cursor: 'zoom-in', display: 'block' }}
        />
        
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={prevSlide}
              style={{
                position: 'absolute',
                top: '50%',
                left: '12px',
                transform: 'translateY(-50%)',
                background: 'rgba(255, 255, 255, 0.9)',
                border: 'none',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                boxShadow: '0 2px 4px rgba(0,0,0,0.15)',
                zIndex: 2,
                color: '#334155',
                fontSize: '1.4rem',
                lineHeight: 1
              }}
            >
              ‹
            </button>
            <button
              type="button"
              onClick={nextSlide}
              style={{
                position: 'absolute',
                top: '50%',
                right: '12px',
                transform: 'translateY(-50%)',
                background: 'rgba(255, 255, 255, 0.9)',
                border: 'none',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                boxShadow: '0 2px 4px rgba(0,0,0,0.15)',
                zIndex: 2,
                color: '#334155',
                fontSize: '1.4rem',
                lineHeight: 1
              }}
            >
              ›
            </button>
          </>
        )}

        {images.length > 1 && (
          <div
            style={{
              position: 'absolute',
              bottom: '12px',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              gap: '6px',
              zIndex: 2
            }}
          >
            {images.map((_, idx) => (
              <span
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentIdx(idx);
                }}
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: currentIdx === idx ? '#1f66ea' : 'rgba(255, 255, 255, 0.6)',
                  cursor: 'pointer',
                  transition: 'background 0.2s'
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Thumbnails row */}
      {images.length > 1 && (
        <div className="gallery-row" style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 6 }}>
          {images.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`${title}-${idx + 1}`}
              className={`gallery-thumb ${currentIdx === idx ? 'active' : ''}`}
              style={{
                width: '64px',
                height: '48px',
                objectFit: 'cover',
                borderRadius: '6px',
                cursor: 'pointer',
                border: currentIdx === idx ? '2px solid #1f66ea' : '1px solid #cbd5e1',
                opacity: currentIdx === idx ? 1 : 0.7,
                transition: 'all 0.15s',
                flexShrink: 0
              }}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIdx(idx);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const TRUST_QUOTES = [
  "Verified Landlord & Deed — 100% scam-safe guarantee.",
  "KYC Passport Audited Landlord — direct rent validation.",
  "Mathematically Checked Capacity — zero stay overlap.",
  "Fully Vetted Space & Layout — standard 3D AI rendered details."
];

export default function ListingViewPage() {
  const userObj = JSON.parse(localStorage.getItem('auth_user') || 'null');
  const isOwnerOrAdmin = userObj && ['OWNER', 'ADMIN'].includes(userObj.role);

  const { id } = useParams();
  const navigate = useNavigate();
  const [listing, setListing] = useState(null);
  const [zoomImage, setZoomImage] = useState('');
  const [platformFees, setPlatformFees] = useState({ shortTermFee: 10, longTermFee: 50 });

  useEffect(() => {
    client.get('/settings').then(res => {
      if (res.data) setPlatformFees(res.data);
    }).catch(() => {});
  }, []);

  useEffect(() => {
    client.get(`/listings/${id}`).then((res) => {
      setListing(res.data || null);
    }).catch(() => setListing(null));
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

    const bookingPath = listing?.stayType === 'LONG_TERM'
      ? `/book/long?listingId=${id}`
      : `/book/short?listingId=${id}`;

    navigate(bookingPath);
  };

  if (!listing) return <section><p>Listing not found.</p></section>;

  return (
    <section>
      <SEO 
        title={listing.title} 
        description={`Book ${listing.title} in ${listing.locationText || 'Berlin'}. Fully vetted room rentals and coliving accommodations in Berlin on RentStack Inventory at https://rentstackinventory.com/.`} 
        keywords={`accommodations in Berlin, room rental in Berlin, rent flat in Berlin, student housing Berlin, ${listing.title}`} 
      />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '16px' }}>
        <div>
          <h2 style={{ marginBottom: '6px' }}>{listing.title}</h2>
          <p style={{ margin: 0, color: '#64748b' }}>{listing.locationText || 'Location not available'}</p>
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          background: '#ecfdf5',
          border: '1px solid #a7f3d0',
          borderRadius: '12px',
          padding: '10px 16px',
          maxWidth: '380px'
        }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
            <path d="M12 2L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-3z" fill="#10b981"/>
            <path d="M10 15.5l-3.5-3.5 1.41-1.41L10 12.67l5.59-5.59L17 8.5 10 15.5z" fill="#ffffff"/>
          </svg>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '0.8rem', color: '#047857', fontWeight: '800', letterSpacing: '0.04em', textTransform: 'uppercase', lineHeight: 1.1 }}>
              Trusted & Verified Listing
            </span>
            <span style={{ fontSize: '0.74rem', color: '#065f46', fontWeight: '500', lineHeight: 1.25, marginTop: '2px' }}>
              {TRUST_QUOTES[listing.id % TRUST_QUOTES.length]}
            </span>
          </div>
        </div>
      </div>

      <ImageCarousel images={gallery} title={listing.title} setZoomImage={setZoomImage} />

      <div className="row">
        <button type="button" onClick={bookNow}>Book</button>
        <button type="button" onClick={() => navigate('/')}>Back to Listings</button>
      </div>

      <div className="card" style={{ marginTop: 14 }}>
        <h3>Pricing</h3>
        {isOwnerOrAdmin ? (
          <p>
            <strong>Rent:</strong> €{listing.baseRent} ({listing.rentType === 'WARM' ? 'warmmiete' : 'kaltmiete'})
            <span style={{ display: 'block', fontSize: '0.85rem', color: '#16a34a', marginTop: '3px', fontWeight: 'bold' }}>
              (€{Number(listing.baseRent) - (listing.stayType === 'LONG_TERM' ? platformFees.longTermFee : platformFees.shortTermFee)} base + €{listing.stayType === 'LONG_TERM' ? platformFees.longTermFee : platformFees.shortTermFee} platform fee)
            </span>
          </p>
        ) : (
          <p><strong>Rent:</strong> €{listing.baseRent} ({listing.rentType === 'WARM' ? 'warmmiete' : listing.rentType === 'COLD' ? 'kaltmiete' : listing.rentType})</p>
        )}
        {Number(listing.depositAmount || 0) > 0 && <p><strong>Deposit:</strong> €{listing.depositAmount}</p>}
        {Number(listing.cleaningCharge || 0) > 0 && <p><strong>Cleaning Charge:</strong> €{listing.cleaningCharge}</p>}
        <p><strong>Stay Type:</strong> {listing.stayType === 'LONG_TERM' ? 'Long-term stay' : 'Short-term stay'}</p>
        {listing.stayType === 'LONG_TERM' && <p><strong>Minimum stay:</strong> {listing.minStayMonths} month(s)</p>}
      </div>

      <div className="card" style={{ marginTop: 14 }}>
        {isOwnerOrAdmin ? (
          <p>
            <strong>Price:</strong> €{listing.baseRent} ({listing.rentType === 'WARM' ? 'warmmiete' : 'kaltmiete'})
            <span style={{ display: 'block', fontSize: '0.85rem', color: '#16a34a', marginTop: '3px', fontWeight: 'bold' }}>
              (€{Number(listing.baseRent) - (listing.stayType === 'LONG_TERM' ? platformFees.longTermFee : platformFees.shortTermFee)} base + €{listing.stayType === 'LONG_TERM' ? platformFees.longTermFee : platformFees.shortTermFee} platform fee)
            </span>
          </p>
        ) : (
          <p><strong>Price:</strong> €{listing.baseRent} ({listing.rentType === 'WARM' ? 'warmmiete' : listing.rentType === 'COLD' ? 'kaltmiete' : listing.rentType})</p>
        )}
        <p><strong>Stay Type:</strong> {listing.stayType === 'LONG_TERM' ? 'Long-term stay' : 'Short-term stay'}</p>
        <p><strong>Property:</strong> {listing.Room?.Apartment?.Property?.name || 'N/A'}</p>
        <p><strong>Address:</strong> {listing.Room?.Apartment?.Property?.address || 'N/A'}</p>
        <p><strong>Apartment:</strong> {listing.Room?.Apartment?.code || 'N/A'}</p>
        <p><strong>Room:</strong> {listing.Room?.code || 'N/A'}</p>
        <p><strong>Capacity:</strong> {listing.Room?.capacity || 'N/A'}</p>
        <p><strong>Furnishing:</strong> {listing.Room?.furnishingStatus || 'N/A'}</p>
        <p><strong>Inventory:</strong> {listing.Room?.inventoryMode || 'N/A'}</p>
        <p><strong>Private Bathroom:</strong> {listing.Room?.hasPrivateBathroom ? 'Yes' : 'No'}</p>
        <p><strong>Amenities:</strong> {Array.isArray(listing.Room?.Apartment?.amenities) ? listing.Room.Apartment.amenities.join(', ') : (listing.Room?.Apartment?.amenities || 'N/A')}</p>
        <p><strong>Anmeldung:</strong> {listing.anmeldungAvailable ? 'Yes' : 'No'}</p>
        
        <div style={{ marginTop: 14, paddingTop: 14, borderTop: '1px dashed #cbd5e1' }}>
          <p style={{ fontWeight: 'bold', marginBottom: 8, fontSize: '0.95rem', color: '#1e293b' }}>Utility Inclusions:</p>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.8rem', padding: '3px 8px', borderRadius: '12px', background: listing.internetIncluded ? '#e0f2fe' : '#f1f5f9', color: listing.internetIncluded ? '#0369a1' : '#64748b', fontWeight: '600' }}>
              🌐 Internet: {listing.internetIncluded ? 'Included' : 'No'}
            </span>
            <span style={{ fontSize: '0.8rem', padding: '3px 8px', borderRadius: '12px', background: listing.electricityIncluded ? '#fef9c3' : '#f1f5f9', color: listing.electricityIncluded ? '#854d0e' : '#64748b', fontWeight: '600' }}>
              ⚡ Electricity: {listing.electricityIncluded ? 'Included' : 'No'}
            </span>
            <span style={{ fontSize: '0.8rem', padding: '3px 8px', borderRadius: '12px', background: listing.maintenanceIncluded ? '#dcfce7' : '#f1f5f9', color: listing.maintenanceIncluded ? '#166534' : '#64748b', fontWeight: '600' }}>
              🛠️ Maintenance: {listing.maintenanceIncluded ? 'Included' : 'No'}
            </span>
            <span style={{ fontSize: '0.8rem', padding: '3px 8px', borderRadius: '12px', background: listing.heatingIncluded ? '#fee2e2' : '#f1f5f9', color: listing.heatingIncluded ? '#991b1b' : '#64748b', fontWeight: '600' }}>
              🔥 Heating: {listing.heatingIncluded ? 'Included' : 'No'}
            </span>
            <span style={{ fontSize: '0.8rem', padding: '3px 8px', borderRadius: '12px', background: listing.waterIncluded ? '#e0f7fa' : '#f1f5f9', color: listing.waterIncluded ? '#006064' : '#64748b', fontWeight: '600' }}>
              💧 Water: {listing.waterIncluded ? 'Included' : 'No'}
            </span>
          </div>
        </div>
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
