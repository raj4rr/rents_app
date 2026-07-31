import useSEO from '../hooks/useSEO';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import client from '../api/client';
import SEO from '../components/SEO';
import { resolveImageUrl } from '../utils/imageUrl';

const ImageCarousel = ({ images = [], title, setZoomImage }) => {
  const [currentIdx, setCurrentIdx] = useState(0);

  const resolvedImages = useMemo(() => images.map(resolveImageUrl), [images]);

  if (!resolvedImages || resolvedImages.length === 0) return null;

  const nextSlide = (e) => {
    e.stopPropagation();
    setCurrentIdx((prev) => (prev === resolvedImages.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = (e) => {
    e.stopPropagation();
    setCurrentIdx((prev) => (prev === 0 ? resolvedImages.length - 1 : prev - 1));
  };

  return (
    <div style={{ marginBottom: 12 }}>
      <div className="carousel-container" style={{ position: 'relative', overflow: 'hidden', borderRadius: 12, marginBottom: 8 }}>
        <img
          className="listing-image"
          src={resolvedImages[currentIdx]}
          alt={title}
          onClick={() => setZoomImage(resolvedImages[currentIdx])}
          style={{ width: '100%', height: '220px', objectFit: 'cover', cursor: 'zoom-in', display: 'block' }}
        />
        
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={prevSlide}
              style={{
                position: 'absolute',
                top: '50%',
                left: '8px',
                transform: 'translateY(-50%)',
                background: 'rgba(255, 255, 255, 0.9)',
                border: 'none',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                boxShadow: '0 2px 4px rgba(0,0,0,0.15)',
                zIndex: 2,
                color: '#334155',
                fontSize: '1.2rem',
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
                right: '8px',
                transform: 'translateY(-50%)',
                background: 'rgba(255, 255, 255, 0.9)',
                border: 'none',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                boxShadow: '0 2px 4px rgba(0,0,0,0.15)',
                zIndex: 2,
                color: '#334155',
                fontSize: '1.2rem',
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
              bottom: '8px',
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
      {resolvedImages.length > 1 && (
        <div className="gallery-row" style={{ display: 'flex', gap: 6, overflowX: 'auto', paddingBottom: 4 }}>
          {resolvedImages.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`${title}-${idx + 1}`}
              className={`gallery-thumb ${currentIdx === idx ? 'active' : ''}`}
              style={{
                width: '50px',
                height: '38px',
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

export default function ListingsPage({ defaultStayType = 'ALL', title = 'All Listings' }) {
  useSEO({
    title: 'All Rental Listings',
    description: 'Browse our comprehensive inventory of premium rental properties, apartments, and rooms. Find your next home with RentStack today.',
    keywords: 'rentals, apartments, rooms, real estate, property listings, rentstack'
  });

  const userObj = JSON.parse(localStorage.getItem('auth_user') || 'null');
  const isOwnerOrAdmin = userObj && ['OWNER', 'ADMIN'].includes(userObj.role);

  const [listings, setListings] = useState([]);
  const [zoomImage, setZoomImage] = useState('');
  const [platformFees, setPlatformFees] = useState({ shortTermFee: 10, longTermFee: 50 });

  useEffect(() => {
    client.get('/settings').then(res => {
      if (res.data) setPlatformFees(res.data);
    }).catch(() => {});
  }, []);
  const [filters, setFilters] = useState({
    location: '',
    minPrice: '',
    maxPrice: '',
    category: 'ALL',
    stayType: defaultStayType || 'ALL',
    minMonths: '',
    maxMonths: '',
    singleBed: false,
    doubleBed: false,
    anmeldung: false
  });
  const navigate = useNavigate();
  const [showAdvanced, setShowAdvanced] = useState(false);

  const clearFilters = () => {
    setFilters({
      location: '',
      minPrice: '',
      maxPrice: '',
      category: 'ALL',
      stayType: defaultStayType || 'ALL',
      minMonths: '',
      maxMonths: '',
      singleBed: false,
      doubleBed: false,
      anmeldung: false
    });
  };

  useEffect(() => {
    setFilters((prev) => ({ ...prev, stayType: defaultStayType || 'ALL' }));
  }, [defaultStayType]);

  useEffect(() => {
    client.get('/listings').then((res) => setListings(res.data));
  }, []);

  const bookNow = (listingId) => {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      navigate('/login');
      return;
    }
    const l = listings.find((li) => String(li.id) === String(listingId));
    const path = l?.stayType === 'LONG_TERM' ? 'long' : 'short';
    navigate(`/book/${path}?listingId=${listingId}`);
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

  const filteredListings = useMemo(() => {
    return listingsWithGallery.filter((l) => {
      if (filters.location.trim()) {
        const search = filters.location.trim().toLowerCase();
        const location = (l.locationText || '').toLowerCase();
        const title = (l.title || '').toLowerCase();
        if (!location.includes(search) && !title.includes(search)) return false;
      }

      if (filters.minPrice !== '') {
        const min = Number(filters.minPrice);
        if (!Number.isNaN(min) && l.baseRent < min) return false;
      }

      if (filters.maxPrice !== '') {
        const max = Number(filters.maxPrice);
        if (!Number.isNaN(max) && l.baseRent > max) return false;
      }

      if (filters.category === 'PRIVATE' && !['ENTIRE_ROOM', 'PRIVATE_ROOM_IN_SHARED_APT'].includes(l.listingType)) {
        return false;
      }
      if (filters.category === 'SHARED' && l.listingType !== 'SINGLE_BED') {
        return false;
      }

      if (filters.stayType !== 'ALL' && l.stayType !== filters.stayType) return false;

      if (filters.minMonths !== '') {
        const minMonths = Number(filters.minMonths);
        if (!Number.isNaN(minMonths) && l.minStayMonths < minMonths) return false;
      }

      if (filters.maxMonths !== '') {
        const maxMonths = Number(filters.maxMonths);
        if (!Number.isNaN(maxMonths) && l.minStayMonths > maxMonths) return false;
      }

      if (filters.anmeldung && !l.anmeldungAvailable) return false;

      const hasSingleBed = !!(l.Room?.singleBeds > 0);
      const hasDoubleBed = !!(l.Room?.doubleBeds > 0);
      if (filters.singleBed || filters.doubleBed) {
        if (filters.singleBed && filters.doubleBed) {
          if (!hasSingleBed && !hasDoubleBed) return false;
        } else if (filters.singleBed && !hasSingleBed) {
          return false;
        } else if (filters.doubleBed && !hasDoubleBed) {
          return false;
        }
      }

      return true;
    });
  }, [filters, listingsWithGallery]);

  return (
    <section>
      <SEO title="Verified Stays & Room Listings" description="Browse RentStack Inventory's listings of fully verified rooms, shared apartments, and student housing options in top cities." />
      <h2>{title}</h2>
      <div className="search-and-filter-card">
        {/* Main Search Bar */}
        <div className="search-bar-main">
          <div className="search-input-group">
            <span className="search-icon">🔍</span>
            <input
              value={filters.location}
              onChange={(e) => setFilters({ ...filters, location: e.target.value })}
              placeholder="Search by city, street, neighborhood or title..."
              className="main-search-input"
            />
            {filters.location && (
              <button
                type="button"
                className="clear-search-btn"
                onClick={() => setFilters({ ...filters, location: '' })}
              >
                ✕
              </button>
            )}
          </div>
          <div className="search-actions">
            <button
              type="button"
              className={`btn-filter-toggle ${showAdvanced ? 'active' : ''}`}
              onClick={() => setShowAdvanced(!showAdvanced)}
            >
              <span>⚙️</span> Filters
              {Object.keys(filters).some(k => {
                if (k === 'stayType' && filters[k] === defaultStayType) return false;
                if (k === 'category' && filters[k] === 'ALL') return false;
                if (k === 'stayType' && filters[k] === 'ALL') return false;
                if (typeof filters[k] === 'boolean') return filters[k];
                return filters[k] !== '';
              }) && <span className="filter-badge-dot" />}
            </button>
            <button
              type="button"
              className="btn-filter-reset"
              onClick={clearFilters}
            >
              Reset
            </button>
          </div>
        </div>

        {/* Expandable Advanced Filters Grid */}
        <div className={`advanced-filters-wrapper ${showAdvanced ? 'expanded' : ''}`}>
          <div className="advanced-filters-grid">
            {/* Price Range */}
            <div className="filter-group">
              <span className="filter-group-title">Price range (€)</span>
              <div className="dual-inputs">
                <input
                  type="number"
                  value={filters.minPrice}
                  onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                  placeholder="Min"
                />
                <span className="dual-separator">to</span>
                <input
                  type="number"
                  value={filters.maxPrice}
                  onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                  placeholder="Max"
                />
              </div>
            </div>

            {/* Room Category */}
            <div className="filter-group">
              <span className="filter-group-title">Room Category</span>
              <select
                value={filters.category}
                onChange={(e) => setFilters({ ...filters, category: e.target.value })}
              >
                <option value="ALL">All Categories</option>
                <option value="PRIVATE">Private (Entire/Private Room)</option>
                <option value="SHARED">Shared (Bed space)</option>
              </select>
            </div>

            {/* Stay Type */}
            <div className="filter-group">
              <span className="filter-group-title">Stay Type</span>
              <select
                value={filters.stayType}
                onChange={(e) => setFilters({ ...filters, stayType: e.target.value })}
                disabled={defaultStayType !== 'ALL'}
              >
                <option value="ALL">All Stay Types</option>
                <option value="SHORT_TERM">Short-term</option>
                <option value="LONG_TERM">Long-term</option>
              </select>
            </div>

            {/* Stay Duration */}
            <div className="filter-group">
              <span className="filter-group-title">Min stay duration (months)</span>
              <div className="dual-inputs">
                <input
                  type="number"
                  value={filters.minMonths}
                  onChange={(e) => setFilters({ ...filters, minMonths: e.target.value })}
                  placeholder="Min"
                />
                <span className="dual-separator">to</span>
                <input
                  type="number"
                  value={filters.maxMonths}
                  onChange={(e) => setFilters({ ...filters, maxMonths: e.target.value })}
                  placeholder="Max"
                />
              </div>
            </div>
          </div>

          {/* Preferences Checkboxes */}
          <div style={{ marginTop: 16 }}>
            <span className="filter-group-title block-title">Additional Preferences</span>
            <div className="checkbox-group">
              <label className="custom-checkbox-label">
                <input
                  type="checkbox"
                  checked={filters.singleBed}
                  onChange={(e) => setFilters({ ...filters, singleBed: e.target.checked })}
                />
                <span className="checkbox-text">Single bed room</span>
              </label>

              <label className="custom-checkbox-label">
                <input
                  type="checkbox"
                  checked={filters.doubleBed}
                  onChange={(e) => setFilters({ ...filters, doubleBed: e.target.checked })}
                />
                <span className="checkbox-text">Double bed room</span>
              </label>

              <label className="custom-checkbox-label">
                <input
                  type="checkbox"
                  checked={filters.anmeldung}
                  onChange={(e) => setFilters({ ...filters, anmeldung: e.target.checked })}
                />
                <span className="checkbox-text">Anmeldung available</span>
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="grid">
        {filteredListings.map((l) => (
          <article key={l.id} className="card">
            <ImageCarousel images={l.gallery} title={l.title} setZoomImage={setZoomImage} />

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: '#ecfdf5',
              border: '1px solid #a7f3d0',
              borderRadius: '8px',
              padding: '8px 10px',
              marginBottom: '12px',
              width: '100%',
              boxSizing: 'border-box'
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
                <path d="M12 2L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-3z" fill="#10b981"/>
                <path d="M10 15.5l-3.5-3.5 1.41-1.41L10 12.67l5.59-5.59L17 8.5 10 15.5z" fill="#ffffff"/>
              </svg>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '0.72rem', color: '#047857', fontWeight: '800', letterSpacing: '0.04em', textTransform: 'uppercase', lineHeight: 1.1 }}>
                  Trusted & Verified
                </span>
                <span style={{ fontSize: '0.68rem', color: '#065f46', fontWeight: '500', lineHeight: 1.2 }}>
                  {TRUST_QUOTES[l.id % TRUST_QUOTES.length]}
                </span>
              </div>
            </div>

            <h3>{l.title}</h3>
            <p>Type: {l.listingType}</p>
            <p>Stay: {l.stayType === 'LONG_TERM' ? 'Long-term' : 'Short-term'}</p>
            {isOwnerOrAdmin ? (
              <p style={{ margin: '8px 0' }}>
                Rent: <strong>€{l.baseRent}</strong> ({l.rentType === 'WARM' ? 'warmmiete' : 'kaltmiete'})
                <span style={{ display: 'block', fontSize: '0.78rem', color: '#16a34a', marginTop: '2px', fontWeight: 'bold' }}>
                  (€{Number(l.baseRent) - (l.stayType === 'LONG_TERM' ? platformFees.longTermFee : platformFees.shortTermFee)} base + €{l.stayType === 'LONG_TERM' ? platformFees.longTermFee : platformFees.shortTermFee} platform fee)
                </span>
              </p>
            ) : (
              <p>Rent: €{l.baseRent} ({l.rentType === 'WARM' ? 'warmmiete' : l.rentType === 'COLD' ? 'kaltmiete' : l.rentType})</p>
            )}
            {Number(l.depositAmount || 0) > 0 && <p>Deposit: €{l.depositAmount}</p>}
            {Number(l.cleaningCharge || 0) > 0 && <p>Cleaning: €{l.cleaningCharge}</p>}
            <p>Location: {l.locationText || 'N/A'}</p>
            
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '10px', marginBottom: '10px' }}>
              <span style={{ fontSize: '0.8rem', padding: '3px 8px', borderRadius: '12px', background: l.internetIncluded ? '#e0f2fe' : '#f1f5f9', color: l.internetIncluded ? '#0369a1' : '#64748b', fontWeight: '600' }}>
                🌐 Internet: {l.internetIncluded ? 'Included' : 'No'}
              </span>
              <span style={{ fontSize: '0.8rem', padding: '3px 8px', borderRadius: '12px', background: l.electricityIncluded ? '#fef9c3' : '#f1f5f9', color: l.electricityIncluded ? '#854d0e' : '#64748b', fontWeight: '600' }}>
                ⚡ Electricity: {l.electricityIncluded ? 'Included' : 'No'}
              </span>
              <span style={{ fontSize: '0.8rem', padding: '3px 8px', borderRadius: '12px', background: l.maintenanceIncluded ? '#dcfce7' : '#f1f5f9', color: l.maintenanceIncluded ? '#166534' : '#64748b', fontWeight: '600' }}>
                🛠️ Maintenance: {l.maintenanceIncluded ? 'Included' : 'No'}
              </span>
              <span style={{ fontSize: '0.8rem', padding: '3px 8px', borderRadius: '12px', background: l.heatingIncluded ? '#fee2e2' : '#f1f5f9', color: l.heatingIncluded ? '#991b1b' : '#64748b', fontWeight: '600' }}>
                🔥 Heating: {l.heatingIncluded ? 'Included' : 'No'}
              </span>
              <span style={{ fontSize: '0.8rem', padding: '3px 8px', borderRadius: '12px', background: l.waterIncluded ? '#e0f7fa' : '#f1f5f9', color: l.waterIncluded ? '#006064' : '#64748b', fontWeight: '600' }}>
                💧 Water: {l.waterIncluded ? 'Included' : 'No'}
              </span>
            </div>

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
