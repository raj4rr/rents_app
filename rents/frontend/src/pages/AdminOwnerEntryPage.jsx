import { useEffect, useMemo, useState } from 'react';
import client from '../api/client';

const initialProperty = { name: '', city: '', address: '' };
const initialApartment = { propertyId: '', code: '', amenities: 'Common Kitchen,Shared Washroom', imageUrls: [] };
const initialRoom = {
  apartmentId: '',
  code: '',
  capacity: 2,
  inventoryMode: 'HYBRID',
  furnishingStatus: 'SEMI_FURNISHED',
  hasPrivateBathroom: false,
  imageUrls: []
};
const initialBed = { roomId: '', bedCode: '', status: 'ACTIVE', imageUrl: '' };
const initialListing = {
  roomId: '',
  bedId: '',
  listingType: 'SINGLE_BED',
  title: '',
  imageUrl: '',
  imageUrls: [],
  locationText: '',
  latitude: '',
  longitude: '',
  rentType: 'WARM',
  baseRent: '',
  anmeldungAvailable: true,
  internetIncluded: true,
  electricityIncluded: true,
  maintenanceIncluded: true,
  heatingIncluded: true,
  waterIncluded: true,
  isActive: true
};

export default function AdminOwnerEntryPage() {
  const user = useMemo(() => {
    try { return JSON.parse(localStorage.getItem('auth_user') || '{}'); } catch { return {}; }
  }, []);
  const canManageEntries = ['OWNER', 'ADMIN'].includes(user?.role);

  const [property, setProperty] = useState(initialProperty);
  const [apartment, setApartment] = useState(initialApartment);
  const [room, setRoom] = useState(initialRoom);
  const [bed, setBed] = useState(initialBed);
  const [listing, setListing] = useState(initialListing);

  const [properties, setProperties] = useState([]);
  const [apartments, setApartments] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [beds, setBeds] = useState([]);

  const [myBookings, setMyBookings] = useState([]);
  const [bookingEdits, setBookingEdits] = useState({});
  const [bookingPaymentInputs, setBookingPaymentInputs] = useState({});
  const [ownerBookings, setOwnerBookings] = useState([]);

  const [myEntries, setMyEntries] = useState([]);
  const [entryEdits, setEntryEdits] = useState({});
  const [manageData, setManageData] = useState({
    properties: [],
    apartments: [],
    rooms: [],
    beds: [],
    listings: []
  });
  const [activeTab, setActiveTab] = useState('my-bookings');
  const [manageEntityTab, setManageEntityTab] = useState('properties');

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const clearNotice = () => { setMessage(''); setError(''); };

  const daysUntil = (dateStr) => {
    const now = new Date();
    const date = new Date(dateStr);
    return (date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
  };

  const loadHierarchy = async () => {
    const [p, a, r, b] = await Promise.all([
      client.get('/properties'),
      client.get('/apartments'),
      client.get('/rooms'),
      client.get('/beds')
    ]);
    setProperties(p.data);
    setApartments(a.data);
    setRooms(r.data);
    setBeds(b.data);
  };

  const loadMyBookings = async () => {
    const { data } = await client.get('/me/bookings');
    setMyBookings(data);
    const draft = {};
    const paymentDraft = {};
    data.forEach((b) => {
      draft[b.id] = { checkIn: b.checkIn, checkOut: b.checkOut };
      paymentDraft[b.id] = '';
    });
    setBookingEdits(draft);
    setBookingPaymentInputs(paymentDraft);
  };

  const loadOwnerBookings = async () => {
    if (!canManageEntries) return;
    const { data } = await client.get('/owner/bookings');
    setOwnerBookings(data);
  };

  const loadMyEntries = async () => {
    if (!canManageEntries) return;
    const { data } = await client.get('/me/entries');
    setMyEntries(data);
    const draft = {};
    data.forEach((e) => {
      draft[e.id] = {
        title: e.title,
        baseRent: e.baseRent,
        locationText: e.locationText || '',
        isActive: e.isActive
      };
    });
    setEntryEdits(draft);
  };

  const loadManageData = async () => {
    if (!canManageEntries) return;
    const [p, a, r, b, l] = await Promise.all([
      client.get('/manage/properties'),
      client.get('/manage/apartments'),
      client.get('/manage/rooms'),
      client.get('/manage/beds'),
      client.get('/manage/listings')
    ]);
    setManageData({
      properties: p.data,
      apartments: a.data,
      rooms: r.data,
      beds: b.data,
      listings: l.data
    });
  };

  useEffect(() => {
    loadHierarchy();
    loadMyBookings();
    loadMyEntries();
    loadOwnerBookings();
    loadManageData();
  }, []);

  const uploadImages = async (files, maxCount) => {
    const chosen = Array.from(files || []);
    if (!chosen.length) return [];
    if (chosen.length > maxCount) throw new Error(`You can upload max ${maxCount} image(s).`);
    const formData = new FormData();
    chosen.forEach((file) => formData.append('images', file));
    const { data } = await client.post('/uploads/images', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return data.urls || [];
  };

  const submitProperty = async (e) => {
    e.preventDefault();
    clearNotice();
    try {
      const { data } = await client.post('/properties', property);
      setMessage(`Property created: ${data.name} (ID ${data.id})`);
      setProperty(initialProperty);
      await loadHierarchy();
      await loadManageData();
    } catch (err) { setError(err.response?.data?.error || 'Failed to create property'); }
  };

  const submitApartment = async (e) => {
    e.preventDefault();
    clearNotice();
    try {
      const payload = {
        propertyId: Number(apartment.propertyId),
        code: apartment.code,
        amenities: apartment.amenities.split(',').map((a) => a.trim()).filter(Boolean),
        imageUrls: apartment.imageUrls
      };
      const { data } = await client.post('/apartments', payload);
      setMessage(`Apartment created: ${data.code} (ID ${data.id})`);
      setApartment(initialApartment);
      await loadHierarchy();
      await loadManageData();
    } catch (err) { setError(err.response?.data?.error || 'Failed to create apartment'); }
  };

  const submitRoom = async (e) => {
    e.preventDefault();
    clearNotice();
    try {
      const payload = {
        apartmentId: Number(room.apartmentId),
        code: room.code,
        capacity: Number(room.capacity),
        inventoryMode: room.inventoryMode,
        furnishingStatus: room.furnishingStatus,
        hasPrivateBathroom: room.hasPrivateBathroom,
        imageUrls: room.imageUrls
      };
      const { data } = await client.post('/rooms', payload);
      setMessage(`Room created: ${data.code} (ID ${data.id})`);
      setRoom(initialRoom);
      await loadHierarchy();
      await loadManageData();
    } catch (err) { setError(err.response?.data?.error || 'Failed to create room'); }
  };

  const submitBed = async (e) => {
    e.preventDefault();
    clearNotice();
    try {
      const payload = {
        roomId: Number(bed.roomId),
        bedCode: bed.bedCode,
        status: bed.status,
        imageUrl: bed.imageUrl || null
      };
      const { data } = await client.post('/beds', payload);
      setMessage(`Bed created: ${data.bedCode} (ID ${data.id})`);
      setBed(initialBed);
      await loadHierarchy();
      await loadManageData();
    } catch (err) { setError(err.response?.data?.error || 'Failed to create bed'); }
  };

  const submitListing = async (e) => {
    e.preventDefault();
    clearNotice();
    try {
      const payload = {
        ...listing,
        roomId: Number(listing.roomId),
        bedId: listing.bedId ? Number(listing.bedId) : null,
        latitude: listing.latitude ? Number(listing.latitude) : null,
        longitude: listing.longitude ? Number(listing.longitude) : null,
        baseRent: Number(listing.baseRent),
        imageUrl: listing.imageUrls[0] || listing.imageUrl || null
      };
      const { data } = await client.post('/listings', payload);
      setMessage(`Listing created: ${data.title} (ID ${data.id})`);
      setListing(initialListing);
      await loadMyEntries();
      await loadManageData();
    } catch (err) { setError(err.response?.data?.error || 'Failed to create listing'); }
  };

  const updateMyBooking = async (bookingId) => {
    clearNotice();
    try {
      const { data } = await client.patch(`/me/bookings/${bookingId}`, bookingEdits[bookingId]);
      const extra = data.additionalPaymentAmount > 0 ? ` Additional payment: ${data.additionalPaymentAmount}.` : '';
      const reapproval = data.requiresReapproval ? ' Owner re-approval required before payment.' : '';
      setMessage(`Booking dates updated.${extra}${reapproval}`);
      await loadMyBookings();
    } catch (err) { setError(err.response?.data?.error || 'Failed to update booking'); }
  };

  const confirmPaymentIdForBooking = async (bookingId) => {
    clearNotice();
    try {
      await client.patch(`/me/bookings/${bookingId}/confirm-payment`, { paymentId: bookingPaymentInputs[bookingId] });
      setMessage('Booking confirmed successfully');
      await loadMyBookings();
    } catch (err) { setError(err.response?.data?.error || 'Failed to confirm payment id'); }
  };

  const approveOwnerBooking = async (bookingId) => {
    clearNotice();
    try {
      await client.patch(`/owner/bookings/${bookingId}/approve`);
      setMessage('Booking approved');
      await loadOwnerBookings();
      await loadMyBookings();
    } catch (err) { setError(err.response?.data?.error || 'Failed to approve booking'); }
  };

  const markPaymentReceived = async (bookingId) => {
    clearNotice();
    try {
      const { data } = await client.patch(`/owner/bookings/${bookingId}/payment-received`);
      setMessage(`Payment received. Share Payment ID with tenant: ${data.paymentId}`);
      await loadOwnerBookings();
      await loadMyBookings();
    } catch (err) { setError(err.response?.data?.error || 'Failed to mark payment received'); }
  };

  const updateMyEntry = async (entryId) => {
    clearNotice();
    try {
      await client.patch(`/me/entries/${entryId}`, entryEdits[entryId]);
      setMessage('Entry updated');
      await loadMyEntries();
    } catch (err) { setError(err.response?.data?.error || 'Failed to update entry'); }
  };

  const openEditWindow = (entity, id) => {
    window.open(`/manage-entry/edit/${entity}/${id}`, '_blank', 'noopener,width=980,height=780');
  };

  const manageEntityConfig = {
    properties: { label: 'Properties', items: manageData.properties },
    apartments: { label: 'Apartments', items: manageData.apartments },
    rooms: { label: 'Rooms', items: manageData.rooms },
    beds: { label: 'Beds', items: manageData.beds },
    listings: { label: 'Listings', items: manageData.listings }
  };

  const getPreviewImage = (entity, row) => {
    if (entity === 'apartments' || entity === 'rooms') return row.imageUrls?.[0] || '';
    if (entity === 'beds') return row.imageUrl || '';
    if (entity === 'listings') return row.imageUrls?.[0] || row.imageUrl || '';
    return '';
  };

  const getPrimaryLine = (entity, row) => {
    if (entity === 'properties') return `${row.name} - ${row.city}`;
    if (entity === 'apartments') return row.code;
    if (entity === 'rooms') return `${row.code} · ${row.inventoryMode || 'MODE'}`;
    if (entity === 'beds') return `${row.bedCode} · ${row.status}`;
    if (entity === 'listings') return row.title;
    return `#${row.id}`;
  };

  const getSecondaryLine = (entity, row) => {
    if (entity === 'properties') return row.address;
    if (entity === 'apartments') return `Property #${row.propertyId}`;
    if (entity === 'rooms') return `Apartment #${row.apartmentId}`;
    if (entity === 'beds') return `Room #${row.roomId}`;
    if (entity === 'listings') return `Rent ${row.baseRent} (${row.rentType})`;
    return '';
  };

  const listingBeds = beds.filter((b) => String(b.roomId) === String(listing.roomId));
  const Preview = ({ urls = [] }) => (
    <div className="gallery-row">
      {urls.map((u, i) => <img key={`${u}-${i}`} src={u} alt={`preview-${i}`} className="gallery-thumb" />)}
    </div>
  );

  return (
    <section>
      <h2>Entry & Booking Management</h2>
      <p className="muted">Role: {user?.role || 'N/A'}</p>
      {message && <p className="success-text">{message}</p>}
      {error && <p className="error-text">{error}</p>}

      <div className="tab-bar">
        <button
          type="button"
          className={`tab-btn ${activeTab === 'my-bookings' ? 'active' : ''}`}
          onClick={() => setActiveTab('my-bookings')}
        >
          My Bookings
        </button>
        {canManageEntries && (
          <button
            type="button"
            className={`tab-btn ${activeTab === 'owner-bookings' ? 'active' : ''}`}
            onClick={() => setActiveTab('owner-bookings')}
          >
            Booking Requests
          </button>
        )}
        {canManageEntries && (
          <button
            type="button"
            className={`tab-btn ${activeTab === 'my-entries' ? 'active' : ''}`}
            onClick={() => setActiveTab('my-entries')}
          >
            My Entries
          </button>
        )}
        {canManageEntries && (
          <button
            type="button"
            className={`tab-btn ${activeTab === 'create-entry' ? 'active' : ''}`}
            onClick={() => setActiveTab('create-entry')}
          >
            Create Entry
          </button>
        )}
        {canManageEntries && (
          <button
            type="button"
            className={`tab-btn ${activeTab === 'manage-records' ? 'active' : ''}`}
            onClick={() => setActiveTab('manage-records')}
          >
            Manage Records
          </button>
        )}
      </div>

      {activeTab === 'my-bookings' && <div className="card" style={{ marginBottom: 14 }}>
        <h3>My Bookings</h3>
        {myBookings.length === 0 && <p>No bookings yet.</p>}
        {myBookings.map((b) => {
          const cannotEdit = daysUntil(b.checkIn) < 2;
          const statusAllowsDateEdit = ['PENDING', 'OWNER_APPROVED'].includes(b.status);
          const canEditDates = statusAllowsDateEdit && !cannotEdit;
          return (
            <div key={b.id} className="card" style={{ marginBottom: 10 }}>
              <p><strong>{b.Listing?.title || `Listing #${b.listingId}`}</strong></p>
              <p>Status: {b.status}</p>
              <p>Owner mobile: {b.Listing?.User?.mobileNumber || 'Not provided'}</p>
              {b.status === 'PENDING' && <p className="muted">Wait for owner/admin booking approval.</p>}
              {b.status === 'OWNER_APPROVED' && <p className="muted">Owner approved. Waiting for owner to mark payment received.</p>}
              {b.status === 'PAYMENT_RECEIVED' && (
                <>
                  <p className="muted">Owner shared a payment ID. Enter it to confirm booking.</p>
                  <div className="row">
                    <input
                      placeholder="Enter payment ID"
                      value={bookingPaymentInputs[b.id] || ''}
                      onChange={(e) => setBookingPaymentInputs((prev) => ({ ...prev, [b.id]: e.target.value }))}
                    />
                    <button type="button" onClick={() => confirmPaymentIdForBooking(b.id)}>Confirm Booking</button>
                  </div>
                </>
              )}
              {statusAllowsDateEdit ? (
                <div className="row">
                  <input
                    type="date"
                    value={bookingEdits[b.id]?.checkIn || ''}
                    onChange={(e) => setBookingEdits((prev) => ({ ...prev, [b.id]: { ...prev[b.id], checkIn: e.target.value } }))}
                  />
                  <input
                    type="date"
                    value={bookingEdits[b.id]?.checkOut || ''}
                    onChange={(e) => setBookingEdits((prev) => ({ ...prev, [b.id]: { ...prev[b.id], checkOut: e.target.value } }))}
                  />
                  <button
                    type="button"
                    onClick={() => updateMyBooking(b.id)}
                    disabled={!canEditDates}
                  >
                    Update Booking Dates
                  </button>
                </div>
              ) : (
                <>
                  <p><strong>Check-In:</strong> {b.checkIn}</p>
                  <p><strong>Check-Out:</strong> {b.checkOut}</p>
                </>
              )}
              {cannotEdit && <p className="error-text">Cannot edit within 2 days of check-in.</p>}
              {!statusAllowsDateEdit && <p className="muted">Date editing is blocked because payment has started or booking is finalized.</p>}
            </div>
          );
        })}
      </div>}

      {canManageEntries && (
        <>
          {activeTab === 'owner-bookings' && <div className="card" style={{ marginBottom: 14 }}>
            <h3>Booking Requests For My Listings</h3>
            {ownerBookings.length === 0 && <p>No booking requests.</p>}
            {ownerBookings.map((b) => (
              <div key={b.id} className="card" style={{ marginBottom: 10 }}>
                <p><strong>{b.Listing?.title || `Listing #${b.listingId}`}</strong></p>
                <p>Tenant: {b.User?.fullName || 'N/A'} ({b.User?.mobileNumber || 'No mobile'})</p>
                <p>Dates: {b.checkIn} to {b.checkOut}</p>
                <p>Status: {b.status}</p>
                {b.status === 'PAYMENT_RECEIVED' && <p><strong>Payment ID:</strong> {b.paymentId}</p>}
                {(b.status === 'PENDING' || b.status === 'OWNER_APPROVED') && (
                  <div className="row">
                    {b.status === 'PENDING' && (
                      <button type="button" onClick={() => approveOwnerBooking(b.id)}>Approve Booking</button>
                    )}
                    {b.status === 'OWNER_APPROVED' && (
                      <button type="button" onClick={() => markPaymentReceived(b.id)}>Payment Received</button>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>}

          {activeTab === 'my-entries' && <div className="card" style={{ marginBottom: 14 }}>
            <h3>My Entries (Listings)</h3>
            {myEntries.length === 0 && <p>No entries yet.</p>}
            {myEntries.map((e) => (
              <div key={e.id} className="card" style={{ marginBottom: 10 }}>
                <input
                  value={entryEdits[e.id]?.title || ''}
                  onChange={(ev) => setEntryEdits((prev) => ({ ...prev, [e.id]: { ...prev[e.id], title: ev.target.value } }))}
                  placeholder="Title"
                />
                <input
                  type="number"
                  step="0.01"
                  value={entryEdits[e.id]?.baseRent || ''}
                  onChange={(ev) => setEntryEdits((prev) => ({ ...prev, [e.id]: { ...prev[e.id], baseRent: Number(ev.target.value) } }))}
                  placeholder="Base Rent"
                />
                <input
                  value={entryEdits[e.id]?.locationText || ''}
                  onChange={(ev) => setEntryEdits((prev) => ({ ...prev, [e.id]: { ...prev[e.id], locationText: ev.target.value } }))}
                  placeholder="Location"
                />
                <label>
                  <input
                    type="checkbox"
                    checked={Boolean(entryEdits[e.id]?.isActive)}
                    onChange={(ev) => setEntryEdits((prev) => ({ ...prev, [e.id]: { ...prev[e.id], isActive: ev.target.checked } }))}
                  /> Active
                </label>
                <button type="button" onClick={() => updateMyEntry(e.id)}>Update Entry</button>
              </div>
            ))}
          </div>}

          {activeTab === 'create-entry' && <>
          <h3>Create New Entry</h3>
          <div className="grid">
            <form className="card form-card" onSubmit={submitProperty}>
              <h3>Add Property</h3>
              <input placeholder="Name" value={property.name} onChange={(e) => setProperty({ ...property, name: e.target.value })} required />
              <input placeholder="City" value={property.city} onChange={(e) => setProperty({ ...property, city: e.target.value })} required />
              <input placeholder="Address" value={property.address} onChange={(e) => setProperty({ ...property, address: e.target.value })} required />
              <button type="submit">Create Property</button>
            </form>

            <form className="card form-card" onSubmit={submitApartment}>
              <h3>Add Apartment</h3>
              <select value={apartment.propertyId} onChange={(e) => setApartment({ ...apartment, propertyId: e.target.value })} required>
                <option value="">Select Property</option>
                {properties.map((p) => <option key={p.id} value={p.id}>{p.name} (#{p.id})</option>)}
              </select>
              <input placeholder="Apartment Code" value={apartment.code} onChange={(e) => setApartment({ ...apartment, code: e.target.value })} required />
              <input placeholder="Amenities comma separated" value={apartment.amenities} onChange={(e) => setApartment({ ...apartment, amenities: e.target.value })} />
              <input type="file" accept="image/*" multiple onChange={async (e) => {
                clearNotice();
                try {
                  const urls = await uploadImages(e.target.files, 2);
                  setApartment((prev) => ({ ...prev, imageUrls: urls }));
                }
                catch (err) { setError(err.message || 'Apartment image upload failed'); }
              }} />
              <p className="muted">Apartment images: {apartment.imageUrls.length}/2</p>
              <Preview urls={apartment.imageUrls} />
              <button type="submit">Create Apartment</button>
            </form>

            <form className="card form-card" onSubmit={submitRoom}>
              <h3>Add Room</h3>
              <select value={room.apartmentId} onChange={(e) => setRoom({ ...room, apartmentId: e.target.value })} required>
                <option value="">Select Apartment</option>
                {apartments.map((a) => <option key={a.id} value={a.id}>{a.code} (#{a.id})</option>)}
              </select>
              <input placeholder="Room Code" value={room.code} onChange={(e) => setRoom({ ...room, code: e.target.value })} required />
              <input type="number" min="1" max="3" placeholder="Capacity" value={room.capacity} onChange={(e) => setRoom({ ...room, capacity: e.target.value })} required />
              <select value={room.inventoryMode} onChange={(e) => setRoom({ ...room, inventoryMode: e.target.value })}>
                <option value="PRIVATE_ONLY">PRIVATE_ONLY</option>
                <option value="SHARED_ONLY">SHARED_ONLY</option>
                <option value="HYBRID">HYBRID</option>
              </select>
              <select value={room.furnishingStatus} onChange={(e) => setRoom({ ...room, furnishingStatus: e.target.value })}>
                <option value="FURNISHED">FURNISHED</option>
                <option value="SEMI_FURNISHED">SEMI_FURNISHED</option>
                <option value="UNFURNISHED">UNFURNISHED</option>
              </select>
              <label><input type="checkbox" checked={room.hasPrivateBathroom} onChange={(e) => setRoom({ ...room, hasPrivateBathroom: e.target.checked })} /> Private bathroom</label>
              <input type="file" accept="image/*" multiple onChange={async (e) => {
                clearNotice();
                try {
                  const urls = await uploadImages(e.target.files, 2);
                  setRoom((prev) => ({ ...prev, imageUrls: urls }));
                }
                catch (err) { setError(err.message || 'Room image upload failed'); }
              }} />
              <p className="muted">Room images: {room.imageUrls.length}/2</p>
              <Preview urls={room.imageUrls} />
              <button type="submit">Create Room</button>
            </form>

            <form className="card form-card" onSubmit={submitBed}>
              <h3>Add Bed</h3>
              <select value={bed.roomId} onChange={(e) => setBed({ ...bed, roomId: e.target.value })} required>
                <option value="">Select Room</option>
                {rooms.map((r) => <option key={r.id} value={r.id}>{r.code} (#{r.id})</option>)}
              </select>
              <input placeholder="Bed Code" value={bed.bedCode} onChange={(e) => setBed({ ...bed, bedCode: e.target.value })} required />
              <select value={bed.status} onChange={(e) => setBed({ ...bed, status: e.target.value })}>
                <option value="ACTIVE">ACTIVE</option>
                <option value="INACTIVE">INACTIVE</option>
                <option value="MAINTENANCE">MAINTENANCE</option>
              </select>
              <input type="file" accept="image/*" onChange={async (e) => {
                clearNotice();
                try {
                  const urls = await uploadImages(e.target.files, 1);
                  setBed((prev) => ({ ...prev, imageUrl: urls[0] || '' }));
                } catch (err) { setError(err.message || 'Bed image upload failed'); }
              }} />
              <p className="muted">Bed image: {bed.imageUrl ? 'Uploaded' : 'None'}</p>
              <Preview urls={bed.imageUrl ? [bed.imageUrl] : []} />
              <button type="submit">Create Bed</button>
            </form>

            <form className="card form-card" onSubmit={submitListing}>
              <h3>Add Listing</h3>
              <select value={listing.roomId} onChange={(e) => setListing({ ...listing, roomId: e.target.value, bedId: '' })} required>
                <option value="">Select Room</option>
                {rooms.map((r) => <option key={r.id} value={r.id}>{r.code} (#{r.id})</option>)}
              </select>
              <select value={listing.bedId} onChange={(e) => setListing({ ...listing, bedId: e.target.value })}>
                <option value="">Select Bed (optional)</option>
                {listingBeds.map((b) => <option key={b.id} value={b.id}>{b.bedCode} (#{b.id})</option>)}
              </select>
              <input placeholder="Title" value={listing.title} onChange={(e) => setListing({ ...listing, title: e.target.value })} required />
              <input type="file" accept="image/*" multiple onChange={async (e) => {
                clearNotice();
                try {
                  const urls = await uploadImages(e.target.files, 4);
                  setListing((prev) => ({ ...prev, imageUrls: urls, imageUrl: urls[0] || '' }));
                } catch (err) { setError(err.message || 'Listing image upload failed'); }
              }} />
              <p className="muted">Listing images: {listing.imageUrls.length}/4</p>
              <Preview urls={listing.imageUrls} />
              <input placeholder="Location Text" value={listing.locationText} onChange={(e) => setListing({ ...listing, locationText: e.target.value })} />
              <input type="number" step="0.0000001" placeholder="Latitude" value={listing.latitude} onChange={(e) => setListing({ ...listing, latitude: e.target.value })} />
              <input type="number" step="0.0000001" placeholder="Longitude" value={listing.longitude} onChange={(e) => setListing({ ...listing, longitude: e.target.value })} />
              <input type="number" step="0.01" placeholder="Base Rent" value={listing.baseRent} onChange={(e) => setListing({ ...listing, baseRent: e.target.value })} required />
              <select value={listing.listingType} onChange={(e) => setListing({ ...listing, listingType: e.target.value })}>
                <option value="SINGLE_BED">SINGLE_BED</option>
                <option value="ENTIRE_ROOM">ENTIRE_ROOM</option>
                <option value="PRIVATE_ROOM_IN_SHARED_APT">PRIVATE_ROOM_IN_SHARED_APT</option>
              </select>
              <select value={listing.rentType} onChange={(e) => setListing({ ...listing, rentType: e.target.value })}>
                <option value="WARM">WARM</option>
                <option value="COLD">COLD</option>
              </select>
              <label><input type="checkbox" checked={listing.anmeldungAvailable} onChange={(e) => setListing({ ...listing, anmeldungAvailable: e.target.checked })} /> Anmeldung available</label>
              <label><input type="checkbox" checked={listing.internetIncluded} onChange={(e) => setListing({ ...listing, internetIncluded: e.target.checked })} /> Internet included</label>
              <label><input type="checkbox" checked={listing.electricityIncluded} onChange={(e) => setListing({ ...listing, electricityIncluded: e.target.checked })} /> Electricity included</label>
              <label><input type="checkbox" checked={listing.maintenanceIncluded} onChange={(e) => setListing({ ...listing, maintenanceIncluded: e.target.checked })} /> Maintenance included</label>
              <label><input type="checkbox" checked={listing.heatingIncluded} onChange={(e) => setListing({ ...listing, heatingIncluded: e.target.checked })} /> Heating included</label>
              <label><input type="checkbox" checked={listing.waterIncluded} onChange={(e) => setListing({ ...listing, waterIncluded: e.target.checked })} /> Water included</label>
              <button type="submit">Create Listing</button>
            </form>
          </div>
          </>}

          {activeTab === 'manage-records' && <div className="card" style={{ marginBottom: 14 }}>
            <div className="manage-head">
              <div>
                <h3 style={{ marginBottom: 4 }}>Manage Records</h3>
                <p className="muted">Pick a section, then click edit to open a dedicated edit window.</p>
              </div>
              <button type="button" onClick={loadManageData}>Refresh List</button>
            </div>

            <div className="entity-tabs">
              {Object.entries(manageEntityConfig).map(([key, cfg]) => (
                <button
                  key={key}
                  type="button"
                  className={`entity-tab ${manageEntityTab === key ? 'active' : ''}`}
                  onClick={() => setManageEntityTab(key)}
                >
                  {cfg.label} <span className="entity-count">{cfg.items.length}</span>
                </button>
              ))}
            </div>

            <div className="manage-list">
              {manageEntityConfig[manageEntityTab]?.items?.length === 0 && (
                <p className="muted">No records found for this section.</p>
              )}

              {manageEntityConfig[manageEntityTab]?.items?.map((row) => {
                const preview = getPreviewImage(manageEntityTab, row);
                return (
                  <div key={`${manageEntityTab}-${row.id}`} className="manage-item">
                    {preview ? <img src={preview} alt={`${manageEntityTab}-${row.id}`} className="manage-thumb" /> : <div className="manage-thumb empty">No image</div>}
                    <div className="manage-content">
                      <p className="manage-title">#{row.id} {getPrimaryLine(manageEntityTab, row)}</p>
                      <p className="manage-sub">{getSecondaryLine(manageEntityTab, row)}</p>
                    </div>
                    <button type="button" onClick={() => openEditWindow(manageEntityTab, row.id)}>Edit</button>
                  </div>
                );
              })}
            </div>
          </div>}
        </>
      )}
    </section>
  );
}
