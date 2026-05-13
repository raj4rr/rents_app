import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import client from '../api/client';

export default function BookingPage() {
  const [searchParams] = useSearchParams();
  const presetListingId = searchParams.get('listingId') || '';

  const [listings, setListings] = useState([]);
  const [form, setForm] = useState({ listingId: presetListingId, checkIn: '', checkOut: '' });
  const [availability, setAvailability] = useState([]);
  const [quote, setQuote] = useState(null);
  const [message, setMessage] = useState('');

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

  const availabilityMap = useMemo(() => {
    const map = {};
    availability.forEach((d) => { map[d.date] = d.available; });
    return map;
  }, [availability]);

  const selectedListing = useMemo(
    () => listings.find((l) => String(l.id) === String(form.listingId)),
    [listings, form.listingId]
  );

  const gallery = useMemo(() => {
    if (!selectedListing) return [];
    const images = [...(selectedListing.imageUrls || [])];
    if (selectedListing.imageUrl && !images.includes(selectedListing.imageUrl)) images.unshift(selectedListing.imageUrl);
    return images;
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
      if (!availabilityMap[ds]) return false;
      cursor.setDate(cursor.getDate() + 1);
    }
    return true;
  };

  const selectDate = (date) => {
    if (!availabilityMap[date]) return;
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
      setMessage(`Booking request submitted #${res.data.id}. Wait for owner/admin confirmation.`);
    } catch (err) {
      setMessage(err.response?.data?.error || 'Booking failed');
    }
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
        {quote && <p>Total: {quote.totalAmount} for {quote.nights} nights</p>}
        {message && <p>{message}</p>}
      </div>

      {selectedListing && (
        <div className="card">
          <h3>{selectedListing.title}</h3>
          {gallery.length > 0 && (
            <div className="gallery-grid" style={{ marginBottom: 10 }}>
              {gallery.map((img, idx) => (
                <img key={idx} className="listing-image" src={img} alt={`${selectedListing.title}-${idx + 1}`} />
              ))}
            </div>
          )}
          <p><strong>Price:</strong> {selectedListing.baseRent} ({selectedListing.rentType})</p>
          <p><strong>Location:</strong> {selectedListing.locationText || 'N/A'}</p>
          <p><strong>Type:</strong> {selectedListing.listingType}</p>
          <p><strong>Furnishing:</strong> {selectedListing.Room?.furnishingStatus || 'N/A'}</p>
          <p><strong>Anmeldung:</strong> {selectedListing.anmeldungAvailable ? 'Yes' : 'No'}</p>
        </div>
      )}
    </section>
  );
}
