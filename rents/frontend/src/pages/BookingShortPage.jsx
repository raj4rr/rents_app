import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import client from '../api/client';

import { resolveImageUrl } from '../utils/imageUrl';

export default function BookingShortPage() {
  const [searchParams] = useSearchParams();
  const presetListingId = searchParams.get('listingId') || '';
  const presetBookingId = searchParams.get('bookingId') || '';

  const [listings, setListings] = useState([]);
  const [form, setForm] = useState({ listingId: presetListingId, checkIn: '', checkOut: '' });
  const [availability, setAvailability] = useState([]);
  const [quote, setQuote] = useState(null);
  const [message, setMessage] = useState('');
  const [tenantComment, setTenantComment] = useState('');
  const [bookingInfo, setBookingInfo] = useState(null);
  const [platformAccount, setPlatformAccount] = useState(null);
  const [ownerAccount, setOwnerAccount] = useState(null);
  const [platformPaymentRef, setPlatformPaymentRef] = useState('');
  const [rentPaymentRef, setRentPaymentRef] = useState('');
  const [contractInfo, setContractInfo] = useState(null);
  const [zoomImage, setZoomImage] = useState('');

  const selectedListing = useMemo(
    () => listings.find((l) => String(l.id) === String(form.listingId)),
    [listings, form.listingId]
  );

  const gallery = useMemo(() => {
    if (!selectedListing) return [];
    const all = [...(selectedListing.imageUrls || [])];
    if (selectedListing.imageUrl && !all.includes(selectedListing.imageUrl)) all.unshift(selectedListing.imageUrl);
    if (selectedListing.Room?.imageUrls?.length) {
      selectedListing.Room.imageUrls.forEach((u) => { if (!all.includes(u)) all.push(u); });
    }
    if (selectedListing.Room?.Apartment?.imageUrls?.length) {
      selectedListing.Room.Apartment.imageUrls.forEach((u) => { if (!all.includes(u)) all.push(u); });
    }
    return all.map(resolveImageUrl);
  }, [selectedListing]);

  const [heroImage, setHeroImage] = useState('');

  useEffect(() => {
    setHeroImage(gallery[0] || '');
  }, [gallery]);

  const canShowContract = bookingInfo && ['OWNER_APPROVED', 'PAYMENT_RECEIVED', 'CONFIRMED'].includes(bookingInfo.status);

  const nextHeroSlide = (e) => {
    e.stopPropagation();
    const currentIdx = gallery.indexOf(heroImage);
    const nextIdx = currentIdx === gallery.length - 1 ? 0 : currentIdx + 1;
    setHeroImage(gallery[nextIdx]);
  };

  const prevHeroSlide = (e) => {
    e.stopPropagation();
    const currentIdx = gallery.indexOf(heroImage);
    const prevIdx = currentIdx === 0 ? gallery.length - 1 : currentIdx - 1;
    setHeroImage(gallery[prevIdx]);
  };

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
  }, [form.listingId]);

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

  const availabilityMap = useMemo(() => {
    const map = {};
    availability.forEach((d) => { map[d.date] = d.available; });
    return map;
  }, [availability]);

  const setBookingWithContract = (data) => {
    setBookingInfo(data);
    if (data?.Contracts?.length > 0) {
      const latestContract = [...data.Contracts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];
      setContractInfo(latestContract);
    }
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

  const getQuote = async () => {
    const res = await client.post('/bookings/quote', { ...form, listingId: Number(form.listingId) });
    setQuote(res.data);
    setMessage('');
  };

  const requestBooking = async () => {
    if (!tenantComment || tenantComment.trim().length < 200) {
      setMessage('Booking request rejected: Your comment explaining requirements & motivation must be at least 200 characters long.');
      return;
    }
    try {
      const res = await client.post('/bookings/confirm', {
        ...form,
        listingId: Number(form.listingId),
        totalAmount: quote.totalAmount,
        tenantComment: tenantComment.trim()
      });
      setBookingInfo(res.data);
      setMessage(`Booking request submitted #${res.data.id}. Wait for owner/admin confirmation.`);
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
      // Accounts may not yet be available until owner/admin approval
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

  const downloadContract = async () => {
    if (!contractInfo?.id) return;
    try {
      const response = await client.get(`/contracts/${contractInfo.id}/download`, {
        responseType: 'blob'
      });
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `contract-${contractInfo.id}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setMessage('Failed to download contract file');
    }
  };

  const inclusions = selectedListing ? [
    { label: 'Internet', on: selectedListing.internetIncluded },
    { label: 'Electricity', on: selectedListing.electricityIncluded },
    { label: 'Heating', on: selectedListing.heatingIncluded },
    { label: 'Water', on: selectedListing.waterIncluded },
    { label: 'Maintenance', on: selectedListing.maintenanceIncluded },
    { label: 'Anmeldung', on: selectedListing.anmeldungAvailable },
  ] : [];

  return (
    <section>
      <h2>Create Booking (Short-term)</h2>

      <div className="card form-card" style={{ marginBottom: 14 }}>
        <select name="listingId" value={form.listingId} onChange={(e) => setForm({ listingId: e.target.value, checkIn: '', checkOut: '' })} required>
          <option value="">Select Listing</option>
          {listings.filter(l => l.stayType === 'SHORT_TERM').map((l) => <option key={l.id} value={l.id}>{l.title} (#{l.id})</option>)}
        </select>
      </div>

      {/* ── Listing Detail Panel ── */}
      {selectedListing && (
        <div className="listing-detail-panel">
          {heroImage && (
            <div className="listing-hero-wrap" style={{ position: 'relative' }}>
              <img src={heroImage} alt={selectedListing.title} onClick={() => setZoomImage(heroImage)} style={{ cursor: 'zoom-in' }} />
              
              {gallery.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={prevHeroSlide}
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
                      zIndex: 3,
                      color: '#334155',
                      fontSize: '1.3rem',
                      lineHeight: 1
                    }}
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    onClick={nextHeroSlide}
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
                      zIndex: 3,
                      color: '#334155',
                      fontSize: '1.3rem',
                      lineHeight: 1
                    }}
                  >
                    ›
                  </button>
                </>
              )}

              <div className="listing-hero-overlay">
                <h3>{selectedListing.title}</h3>
                <p>{selectedListing.locationText || selectedListing.Room?.Apartment?.Property?.address || ''}</p>
              </div>
            </div>
          )}

          {gallery.length > 1 && (
            <div className="listing-thumb-strip">
              {gallery.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`${selectedListing.title} ${idx + 1}`}
                  className={img === heroImage ? 'active-thumb' : ''}
                  onClick={() => setHeroImage(img)}
                />
              ))}
            </div>
          )}

          <div className="listing-detail-body">
            <div className="listing-price-highlight">
              <span className="price-amount">€{Number(selectedListing.baseRent).toFixed(2)}</span>
              <span className="price-label">
                / night · {selectedListing.rentType === 'WARM' ? 'Warmmiete' : 'Kaltmiete'}
              </span>
            </div>

            <div className="listing-detail-grid" style={{ marginTop: 14 }}>
              <p><strong>Property:</strong> {selectedListing.Room?.Apartment?.Property?.name || '—'}</p>
              <p><strong>City:</strong> {selectedListing.Room?.Apartment?.Property?.city || '—'}</p>
              <p><strong>Address:</strong> {selectedListing.Room?.Apartment?.Property?.address || '—'}</p>
              <p><strong>Apartment:</strong> {selectedListing.Room?.Apartment?.code || '—'}</p>
              <p><strong>Room:</strong> {selectedListing.Room?.code || '—'}</p>
              <p><strong>Capacity:</strong> {selectedListing.Room?.capacity || '—'} person(s)</p>
              <p><strong>Furnishing:</strong> {(selectedListing.Room?.furnishingStatus || '—').replace(/_/g, ' ').toLowerCase()}</p>
              <p><strong>Listing Type:</strong> {(selectedListing.listingType || '—').replace(/_/g, ' ').toLowerCase()}</p>
              <p><strong>Private Bath:</strong> {selectedListing.Room?.hasPrivateBathroom ? '✓ Yes' : '✗ No'}</p>
              <p><strong>Stay Type:</strong> Short-term</p>
              {Number(selectedListing.depositAmount || 0) > 0 && (
                <p><strong>Deposit:</strong> €{Number(selectedListing.depositAmount).toFixed(2)}</p>
              )}
              {Number(selectedListing.cleaningCharge || 0) > 0 && (
                <p><strong>Cleaning:</strong> €{Number(selectedListing.cleaningCharge).toFixed(2)}</p>
              )}
            </div>

            {Array.isArray(selectedListing.Room?.Apartment?.amenities) && selectedListing.Room.Apartment.amenities.length > 0 && (
              <div style={{ marginTop: 12 }}>
                <strong style={{ fontSize: '0.92rem', color: '#374459' }}>Amenities:</strong>
                <div className="listing-inclusions" style={{ marginTop: 6 }}>
                  {selectedListing.Room.Apartment.amenities.map((a, i) => (
                    <span key={i} className="inclusion-badge included">{a}</span>
                  ))}
                </div>
              </div>
            )}

            <div style={{ marginTop: 12 }}>
              <strong style={{ fontSize: '0.92rem', color: '#374459' }}>Inclusions:</strong>
              <div className="listing-inclusions" style={{ marginTop: 6 }}>
                {inclusions.map((inc) => (
                  <span key={inc.label} className={`inclusion-badge ${inc.on ? 'included' : 'not-included'}`}>
                    {inc.on ? '✓' : '✗'} {inc.label}
                  </span>
                ))}
              </div>
            </div>

            {selectedListing.User && (
              <p style={{ marginTop: 10, fontSize: '0.9rem', color: '#5b6e86' }}>
                <strong>Listed by:</strong> {selectedListing.User.fullName}
              </p>
            )}
          </div>
        </div>
      )}

      {/* ── Booking Form ── */}
      <div className="card form-card" style={{ marginBottom: 14 }}>
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
                    onClick={() => {
                      if (!d.available) return;
                      if (!form.checkIn || form.checkOut) {
                        setForm((prev) => ({ ...prev, checkIn: d.date, checkOut: '' }));
                        return;
                      }
                      if (d.date <= form.checkIn) {
                        setForm((prev) => ({ ...prev, checkIn: d.date, checkOut: '' }));
                        return;
                      }
                      if (!rangeIsAvailable(form.checkIn, d.date)) {
                        setMessage('Selected range includes booked dates. Choose only available dates.');
                        return;
                      }
                      setForm((prev) => ({ ...prev, checkOut: d.date }));
                    }}
                  >
                    {d.date.slice(5)}
                  </button>
                );
              })}
            </div>
          </>
        )}

        {quote && (
          <div style={{ marginTop: '16px', background: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '6px', color: '#1e293b', fontSize: '0.88rem' }}>
              Add a note to Owner (Min 200 characters required):
            </label>
            <p style={{ margin: '0 0 8px 0', fontSize: '0.78rem', color: '#64748b' }}>
              Introduce yourself, explain your requirements, and outline your move-in plans to help the landlord approve your request.
            </p>
            <textarea
              rows="4"
              placeholder="Example: Hello, I am a software engineer relocating to Berlin for my new position starting next month. I value a quiet, clean, and peaceful environment. I have attached my payslips and look forward to hearing from you soon..."
              value={tenantComment}
              onChange={(e) => setTenantComment(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem', fontFamily: 'inherit', boxSizing: 'border-box' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px', fontSize: '0.76rem', fontWeight: 'bold', color: tenantComment.length >= 200 ? '#16a34a' : '#b91c1c' }}>
              <span>Character count: {tenantComment.length} / 200</span>
              <span>{tenantComment.length >= 200 ? '✓ Ready' : '✗ Need more details'}</span>
            </div>
          </div>
        )}

        <div className="row" style={{ marginTop: 10 }}>
          <button onClick={getQuote} disabled={!form.listingId || !form.checkIn || !form.checkOut}>Get Quote</button>
          <button onClick={requestBooking} disabled={!quote || tenantComment.length < 200}>Request Booking</button>
        </div>
        {quote && (
          <>
            <p><strong>Rent:</strong> €{Number(quote.rentAmount).toFixed(2)} ({quote.durationLabel})</p>
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

      {/* Zoom overlay */}
      {zoomImage && (
        <div className="zoom-overlay" onClick={() => setZoomImage('')}>
          <img className="zoom-image" src={zoomImage} alt="zoom" />
        </div>
      )}
    </section>
  );
}
