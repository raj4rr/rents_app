import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import client from '../api/client';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const ImageCarousel = ({ images, title }) => {
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
          style={{ width: '100%', height: '300px', objectFit: 'cover', display: 'block' }}
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
                width: '36px',
                height: '36px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                boxShadow: '0 2px 4px rgba(0,0,0,0.15)',
                zIndex: 2,
                color: '#334155',
                fontSize: '1.3rem',
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
                width: '36px',
                height: '36px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                boxShadow: '0 2px 4px rgba(0,0,0,0.15)',
                zIndex: 2,
                color: '#334155',
                fontSize: '1.3rem',
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

import { resolveImageUrl } from '../utils/imageUrl';

export default function BookingPage() {
  const [searchParams] = useSearchParams();
  const presetListingId = searchParams.get('listingId') || '';
  const presetBookingId = searchParams.get('bookingId') || '';

  const [listings, setListings] = useState([]);
  const [form, setForm] = useState({ listingId: presetListingId, checkIn: '', checkOut: '' });
  const [availability, setAvailability] = useState([]);
  const [quote, setQuote] = useState(null);
  const [message, setMessage] = useState('');
  const [longTermMonths, setLongTermMonths] = useState(1);
  const [bookingInfo, setBookingInfo] = useState(null);
  const [platformAccount, setPlatformAccount] = useState(null);
  const [ownerAccount, setOwnerAccount] = useState(null);
  const [platformPaymentRef, setPlatformPaymentRef] = useState('');
  const [rentPaymentRef, setRentPaymentRef] = useState('');
  const [contractInfo, setContractInfo] = useState(null);

  useEffect(() => {
    client.get('/listings').then((res) => setListings(res.data));
  }, []);

  useEffect(() => {
    if (!form.listingId) {
      setAvailability([]);
      return;
    }
    client.get(`/listings/${form.listingId}/availability`).then((res) => {
      setAvailability(res.data.days || []);
    });
    setLongTermMonths(1);
  }, [form.listingId]);

  const availabilityMap = useMemo(() => {
    const map = {};
    availability.forEach((d) => { map[d.date] = d.available; });
    return map;
  }, [availability]);

  const selectedListing = useMemo(
    () => listings.find((l) => String(l.id) === String(form.listingId)),
    [listings, form.listingId]
  );

  const canShowContract = bookingInfo && ['OWNER_APPROVED', 'PAYMENT_RECEIVED', 'CONFIRMED'].includes(bookingInfo.status);

  const setBookingWithContract = (data) => {
    setBookingInfo(data);
    if (data?.Contracts?.length > 0) {
      const latestContract = [...data.Contracts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];
      setContractInfo(latestContract);
    }
  };

  useEffect(() => {
    if (!presetBookingId) return;
    const loadBooking = async () => {
      try {
        const { data } = await client.get(`/me/bookings/${presetBookingId}`);
        setBookingWithContract(data);
        if (['OWNER_APPROVED', 'PAYMENT_RECEIVED'].includes(data.status)) {
          loadBookingAccounts(data.id);
        }
      } catch (_err) {
        // ignore if booking not found
      }
    };
    loadBooking();
  }, [presetBookingId]);

  const gallery = useMemo(() => {
    if (!selectedListing) return [];
    const images = [...(selectedListing.imageUrls || [])];
    if (selectedListing.imageUrl && !images.includes(selectedListing.imageUrl)) images.unshift(selectedListing.imageUrl);
    return images.map(resolveImageUrl);
  }, [selectedListing]);

  const onListingChange = (e) => {
    setForm({ listingId: e.target.value, checkIn: '', checkOut: '' });
    setQuote(null);
    setMessage('');
  };

  const rangeIsAvailable = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const cursor = new Date(startDate);
    while (cursor < endDate) {
      const ds = cursor.toISOString().slice(0, 10);
      if (availabilityMap[ds] === false) return false;
      cursor.setDate(cursor.getDate() + 1);
    }
    return true;
  };

  const findNextAvailableDay = (dayOfMonth) => {
    const start = new Date();
    for (let i = 0; i < 365; i += 1) {
      const d = new Date(start);
      d.setDate(d.getDate() + i);
      if (d.getDate() !== dayOfMonth) continue;
      const ds = d.toISOString().slice(0, 10);
      if (availabilityMap[ds] !== false) return ds;
    }
    return null;
  };

  const addMonthsToDate = (dateStr, months) => {
    const d = new Date(dateStr);
    const newMonth = d.getMonth() + months;
    const res = new Date(d.getFullYear(), newMonth, d.getDate());
    return res.toISOString().slice(0, 10);
  };

  const selectDate = (date) => {
    if (availabilityMap[date] === false) return;
    setQuote(null);
    setMessage('');

    if (!form.checkIn || form.checkOut) {
      setForm((prev) => ({ ...prev, checkIn: date, checkOut: '' }));
      return;
    }

    if (date <= form.checkIn) {
      setForm((prev) => ({ ...prev, checkIn: date, checkOut: '' }));
      return;
    }

    if (!rangeIsAvailable(form.checkIn, date)) {
      setMessage('Selected range includes booked dates. Choose only available dates.');
      return;
    }

    setForm((prev) => ({ ...prev, checkOut: date }));
  };



  const chooseNextDay = (dayOfMonth) => {
    const ds = findNextAvailableDay(dayOfMonth);
    if (!ds) {
      setMessage('No available matching check-in date found in the next year');
      return;
    }
    const months = Math.max(Number(longTermMonths) || 1, selectedListing?.minStayMonths || 1);
    const co = addMonthsToDate(ds, months);
    if (!rangeIsAvailable(ds, co)) {
      setMessage('Selected range includes booked dates. Choose a different start or months.');
      setForm((prev) => ({ ...prev, checkIn: ds, checkOut: '' }));
      return;
    }
    setForm((prev) => ({ ...prev, checkIn: ds, checkOut: co }));
    setMessage('');
  };

  const getQuote = async () => {
    const res = await client.post('/bookings/quote', { ...form, listingId: Number(form.listingId) });
    setQuote(res.data);
    setMessage('');
  };

  const requestBooking = async () => {
    try {
      const res = await client.post('/bookings/confirm', {
        ...form,
        listingId: Number(form.listingId),
        totalAmount: quote.totalAmount
      });
      setBookingInfo(res.data);
      const note = quote?.quoteNote ? ` ${quote.quoteNote}` : '';
      setMessage(`Booking request submitted #${res.data.id}. Wait for owner/admin confirmation.${note}`);
    } catch (err) {
      setMessage(err.response?.data?.error || 'Booking failed');
    }
  };

  const loadBookingAccounts = async (bookingId) => {
    try {
      const [{ data: platform }, { data: owner }] = await Promise.all([
        client.get(`/bookings/${bookingId}/platform-account`),
        client.get(`/bookings/${bookingId}/owner-account`)
      ]);
      setPlatformAccount(platform);
      setOwnerAccount(owner);
    } catch (_err) {
      // Accounts may not yet be available until booking is approved
    }
  };

  const refreshBooking = async () => {
    if (!bookingInfo?.id) return;
    try {
      const { data } = await client.get(`/me/bookings/${bookingInfo.id}`);
      setBookingWithContract(data);
      if (data.status === 'OWNER_APPROVED') {
        loadBookingAccounts(data.id);
      }
    } catch (_err) {
      // ignore refresh failures
    }
  };

  useEffect(() => {
    if (!bookingInfo?.id) return;
    if (bookingInfo.status === 'OWNER_APPROVED') {
      loadBookingAccounts(bookingInfo.id);
    }

    const interval = setInterval(() => {
      if (bookingInfo.status !== 'CONFIRMED') {
        refreshBooking();
      }
    }, 10000);
    return () => clearInterval(interval);
  }, [bookingInfo]);

  const payPlatformFee = async () => {
    if (!bookingInfo?.id) return;
    try {
      await client.post(`/me/bookings/${bookingInfo.id}/pay-platform`, {
        paymentReference: platformPaymentRef
      });
      setMessage('Platform fee payment submitted. Please wait for owner confirmation.');
      setPlatformPaymentRef('');
    } catch (err) {
      setMessage(err.response?.data?.error || 'Payment submission failed');
    }
  };

  const payOwnerRent = async () => {
    if (!bookingInfo?.id) return;
    try {
      await client.post(`/me/bookings/${bookingInfo.id}/pay-owner`, {
        paymentReference: rentPaymentRef,
        ownerAccountId: ownerAccount?.bankAccount?.id || null
      });
      setMessage('Owner rent payment submitted. Please wait for owner confirmation.');
      setRentPaymentRef('');
    } catch (err) {
      setMessage(err.response?.data?.error || 'Payment submission failed');
    }
  };

  const generateContract = async () => {
    if (!bookingInfo?.id) return;
    try {
      const { data } = await client.post('/contracts/generate', {
        bookingId: bookingInfo.id,
        leaseType: selectedListing?.stayType || 'SHORT_TERM',
        startDate: form.checkIn,
        endDate: form.checkOut
      });
      setContractInfo(data);
      setMessage('Contract created. You can download it below.');
    } catch (err) {
      setMessage(err.response?.data?.error || 'Contract generation failed');
    }
  };

  const downloadContract = () => {
    if (!contractInfo?.id) return;
    window.open(`${apiBaseUrl}/contracts/${contractInfo.id}/download`, '_blank');
  };

  return (
    <section>
      <h2>Create Booking</h2>

      <div className="card form-card" style={{ marginBottom: 14 }}>
        <select name="listingId" value={form.listingId} onChange={onListingChange} required>
          <option value="">Select Listing</option>
          {listings.map((l) => <option key={l.id} value={l.id}>{l.title} (#{l.id})</option>)}
        </select>

        {form.listingId && (
          <>
            <p><strong>Check-In:</strong> {form.checkIn || '-'}</p>
            <p><strong>Check-Out:</strong> {form.checkOut || '-'}</p>
            <p className="muted">Green = available, Red = booked (disabled)</p>
            <div className="date-grid">
              {availability.map((d) => {
                const selected = d.date === form.checkIn || d.date === form.checkOut;
                return (
                  <button
                    key={d.date}
                    type="button"
                    className={`date-chip ${d.available ? 'available' : 'booked'} ${selected ? 'selected' : ''}`}
                    disabled={!d.available}
                    onClick={() => selectDate(d.date)}
                  >
                    {d.date.slice(5)}
                  </button>
                );
              })}
            </div>
          </>
        )}

        <div className="row" style={{ marginTop: 10 }}>
          <button onClick={getQuote} disabled={!form.listingId || !form.checkIn || !form.checkOut}>Get Quote</button>
          <button onClick={requestBooking} disabled={!quote}>Request Booking</button>
        </div>
        {quote && (
          <>
            <p>
              <strong>Rent {selectedListing?.stayType === 'LONG_TERM' ? '(1st month)' : ''}:</strong> €{Number(quote.rentAmount).toFixed(2)} ({quote.durationLabel})
              {selectedListing?.stayType === 'LONG_TERM' && (
                <span className="muted" style={{ marginLeft: '6px', fontSize: '0.9em' }}>
                  - First month payment, next months you pay to the owner.
                </span>
              )}
            </p>
            {Number(quote.depositAmount) > 0 && <p><strong>Deposit:</strong> €{Number(quote.depositAmount).toFixed(2)}</p>}
            {Number(quote.cleaningCharge) > 0 && <p><strong>Cleaning Charge:</strong> €{Number(quote.cleaningCharge).toFixed(2)}</p>}
            <p><strong>Platform Fee:</strong> €{Number(quote.platformFee).toFixed(2)}</p>
            <p><strong>Total:</strong> €{Number(quote.totalAmount).toFixed(2)}</p>
            {quote.quoteNote && <p className="muted">{quote.quoteNote}</p>}
          </>
        )}
        {message && <p>{message}</p>}
      </div>

      {bookingInfo && (
        <div className="card" style={{ marginBottom: 14 }}>
          <h3>Booking Payment & Contract</h3>
          <p><strong>Booking ID:</strong> {bookingInfo.id}</p>
          <p><strong>Status:</strong> {bookingInfo.status}</p>

          {bookingInfo.status === 'OWNER_APPROVED' && platformAccount && (
            <div className="notice-panel">
              <p><strong>Platform fee bank account</strong></p>
              <p>Account holder: {platformAccount.bankAccount.accountHolder}</p>
              <p>IBAN: {platformAccount.bankAccount.iban}</p>
              <p>BIC: {platformAccount.bankAccount.bic}</p>
            </div>
          )}

          {bookingInfo.status === 'OWNER_APPROVED' && (
            <div style={{ marginTop: 8 }}>
              <input
                type="text"
                placeholder="Platform payment reference"
                value={platformPaymentRef}
                onChange={(e) => setPlatformPaymentRef(e.target.value)}
              />
              <button type="button" onClick={payPlatformFee} style={{ marginLeft: 8 }}>Submit platform fee</button>
            </div>
          )}

          {bookingInfo.status === 'OWNER_APPROVED' && ownerAccount && (
            <div className="notice-panel" style={{ marginTop: 12 }}>
              <p><strong>Owner bank account</strong></p>
              <p>Owner: {ownerAccount.owner.fullName}</p>
              <p>Account holder: {ownerAccount.bankAccount.accountHolder}</p>
              <p>IBAN: {ownerAccount.bankAccount.iban}</p>
              <p>BIC: {ownerAccount.bankAccount.bic}</p>
            </div>
          )}

          {bookingInfo.status === 'OWNER_APPROVED' && (
            <div style={{ marginTop: 8 }}>
              <input
                type="text"
                placeholder="Rent payment reference"
                value={rentPaymentRef}
                onChange={(e) => setRentPaymentRef(e.target.value)}
              />
              <button type="button" onClick={payOwnerRent} style={{ marginLeft: 8 }}>Submit rent payment</button>
            </div>
          )}

          {canShowContract && (
            <>
              <div style={{ marginTop: 12 }}>
                <button type="button" onClick={generateContract}>Generate contract</button>
                {contractInfo?.id && (
                  <button type="button" onClick={downloadContract} style={{ marginLeft: 8 }}>Download contract</button>
                )}
              </div>

              <div style={{ marginTop: 12 }}>
                <button type="button" onClick={refreshBooking}>Refresh booking status</button>
              </div>
            </>
          )}
        </div>
      )}

      {selectedListing && (
        <div className="card">
          <h3>{selectedListing.title}</h3>
          <ImageCarousel images={gallery} title={selectedListing.title} />
          <p><strong>Price:</strong> €{selectedListing.baseRent} ({selectedListing.rentType === 'WARM' ? 'warmmiete' : selectedListing.rentType === 'COLD' ? 'kaltmiete' : selectedListing.rentType})</p>
          {Number(selectedListing.depositAmount || 0) > 0 && <p><strong>Deposit:</strong> €{selectedListing.depositAmount}</p>}
          {Number(selectedListing.cleaningCharge || 0) > 0 && <p><strong>Cleaning Charge:</strong> €{selectedListing.cleaningCharge}</p>}
          <p><strong>Stay Type:</strong> {selectedListing.stayType === 'LONG_TERM' ? 'Long-term stay' : 'Short-term stay'}</p>
          {selectedListing.stayType === 'LONG_TERM' && <p><strong>Minimum stay:</strong> {selectedListing.minStayMonths} month(s)</p>}
          <p><strong>Location:</strong> {selectedListing.locationText || 'N/A'}</p>
          <p><strong>Type:</strong> {selectedListing.listingType}</p>
          <p><strong>Property:</strong> {selectedListing.Room?.Apartment?.Property?.name || 'N/A'}</p>
          <p><strong>Address:</strong> {selectedListing.Room?.Apartment?.Property?.address || 'N/A'}</p>
          <p><strong>Apartment:</strong> {selectedListing.Room?.Apartment?.code || 'N/A'}</p>
          <p><strong>Room:</strong> {selectedListing.Room?.code || 'N/A'}</p>
          <p><strong>Capacity:</strong> {selectedListing.Room?.capacity || 'N/A'}</p>
          <p><strong>Furnishing:</strong> {selectedListing.Room?.furnishingStatus || 'N/A'}</p>
          <p><strong>Inventory:</strong> {selectedListing.Room?.inventoryMode || 'N/A'}</p>
          <p><strong>Private Bathroom:</strong> {selectedListing.Room?.hasPrivateBathroom ? 'Yes' : 'No'}</p>
          <p><strong>Amenities:</strong> {Array.isArray(selectedListing.Room?.Apartment?.amenities) ? selectedListing.Room.Apartment.amenities.join(', ') : (selectedListing.Room?.Apartment?.amenities || 'N/A')}</p>
          <p><strong>Anmeldung:</strong> {selectedListing.anmeldungAvailable ? 'Yes' : 'No'}</p>
          
          <div style={{ marginTop: 14, paddingTop: 14, borderTop: '1px dashed #cbd5e1' }}>
            <p style={{ fontWeight: 'bold', marginBottom: 8, fontSize: '0.95rem', color: '#1e293b' }}>Utility Inclusions:</p>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.8rem', padding: '3px 8px', borderRadius: '12px', background: selectedListing.internetIncluded ? '#e0f2fe' : '#f1f5f9', color: selectedListing.internetIncluded ? '#0369a1' : '#64748b', fontWeight: '600' }}>
                🌐 Internet: {selectedListing.internetIncluded ? 'Included' : 'No'}
              </span>
              <span style={{ fontSize: '0.8rem', padding: '3px 8px', borderRadius: '12px', background: selectedListing.electricityIncluded ? '#fef9c3' : '#f1f5f9', color: selectedListing.electricityIncluded ? '#854d0e' : '#64748b', fontWeight: '600' }}>
                ⚡ Electricity: {selectedListing.electricityIncluded ? 'Included' : 'No'}
              </span>
              <span style={{ fontSize: '0.8rem', padding: '3px 8px', borderRadius: '12px', background: selectedListing.maintenanceIncluded ? '#dcfce7' : '#f1f5f9', color: selectedListing.maintenanceIncluded ? '#166534' : '#64748b', fontWeight: '600' }}>
                🛠️ Maintenance: {selectedListing.maintenanceIncluded ? 'Included' : 'No'}
              </span>
              <span style={{ fontSize: '0.8rem', padding: '3px 8px', borderRadius: '12px', background: selectedListing.heatingIncluded ? '#fee2e2' : '#f1f5f9', color: selectedListing.heatingIncluded ? '#991b1b' : '#64748b', fontWeight: '600' }}>
                🔥 Heating: {selectedListing.heatingIncluded ? 'Included' : 'No'}
              </span>
              <span style={{ fontSize: '0.8rem', padding: '3px 8px', borderRadius: '12px', background: selectedListing.waterIncluded ? '#e0f7fa' : '#f1f5f9', color: selectedListing.waterIncluded ? '#006064' : '#64748b', fontWeight: '600' }}>
                💧 Water: {selectedListing.waterIncluded ? 'Included' : 'No'}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
