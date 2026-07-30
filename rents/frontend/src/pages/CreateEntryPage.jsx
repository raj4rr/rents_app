import { useEffect, useMemo, useState } from 'react';
import client from '../api/client';
import ManageNav from '../components/ManageNav';

const initialProperty = { name: '', city: '', address: '' };
const initialApartment = { propertyId: '', code: '', amenities: 'Common Kitchen,Shared Washroom', imageUrls: [] };
const initialRoom = {
  apartmentId: '',
  code: '',
  capacity: 2,
  maxPersons: 1,
  singleBeds: 0,
  doubleBeds: 0,
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
  stayType: 'SHORT_TERM',
  minStayMonths: 3,
  title: '',
  imageUrl: '',
  imageUrls: [],
  locationText: '',
  latitude: '',
  longitude: '',
  rentType: 'WARM',
  baseRent: '',
  depositAmount: '',
  cleaningCharge: '',
  anmeldungAvailable: true,
  internetIncluded: true,
  electricityIncluded: true,
  maintenanceIncluded: true,
  heatingIncluded: true,
  waterIncluded: true,
  isActive: true
};

export default function CreateEntryPage() {
  const user = useMemo(() => {
    try { return JSON.parse(localStorage.getItem('auth_user') || '{}'); } catch { return {}; }
  }, []);

  const [property, setProperty] = useState(initialProperty);
  const [apartment, setApartment] = useState(initialApartment);
  const [room, setRoom] = useState(initialRoom);
  const [bed, setBed] = useState(initialBed);
  const [listing, setListing] = useState(initialListing);

  const [properties, setProperties] = useState([]);
  const [apartments, setApartments] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [beds, setBeds] = useState([]);

  const [csvFile, setCsvFile] = useState(null);
  const [importing, setImporting] = useState(false);
  const [importResult, setImportResult] = useState(null);

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const clearNotice = () => { setMessage(''); setError(''); };

  const loadHierarchy = async () => {
    try {
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
    } catch (_err) {}
  };

  useEffect(() => {
    loadHierarchy();
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
        maxPersons: Number(room.maxPersons),
        singleBeds: Number(room.singleBeds),
        doubleBeds: Number(room.doubleBeds),
        inventoryMode: room.inventoryMode,
        furnishingStatus: room.furnishingStatus,
        hasPrivateBathroom: room.hasPrivateBathroom,
        imageUrls: room.imageUrls
      };
      const { data } = await client.post('/rooms', payload);
      setMessage(`Room created: ${data.code} (ID ${data.id})`);
      setRoom(initialRoom);
      await loadHierarchy();
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
        imageUrl: bed.imageUrl
      };
      const { data } = await client.post('/beds', payload);
      setMessage(`Bed created: ${data.bedCode} (ID ${data.id})`);
      setBed(initialBed);
      await loadHierarchy();
    } catch (err) { setError(err.response?.data?.error || 'Failed to create bed'); }
  };

  const submitListing = async (e) => {
    e.preventDefault();
    clearNotice();
    try {
      const payload = {
        roomId: Number(listing.roomId),
        bedId: listing.bedId ? Number(listing.bedId) : null,
        listingType: listing.listingType,
        stayType: listing.stayType,
        minStayMonths: Number(listing.minStayMonths),
        title: listing.title,
        imageUrl: listing.imageUrl || listing.imageUrls?.[0] || '',
        imageUrls: listing.imageUrls,
        locationText: listing.locationText,
        latitude: listing.latitude ? Number(listing.latitude) : null,
        longitude: listing.longitude ? Number(listing.longitude) : null,
        rentType: listing.rentType,
        baseRent: Number(listing.baseRent),
        depositAmount: listing.depositAmount ? Number(listing.depositAmount) : 0,
        cleaningCharge: listing.cleaningCharge ? Number(listing.cleaningCharge) : 0,
        anmeldungAvailable: listing.anmeldungAvailable,
        internetIncluded: listing.internetIncluded,
        electricityIncluded: listing.electricityIncluded,
        maintenanceIncluded: listing.maintenanceIncluded,
        heatingIncluded: listing.heatingIncluded,
        waterIncluded: listing.waterIncluded,
        isActive: listing.isActive
      };
      const { data } = await client.post('/listings', payload);
      setMessage(`Listing created: ${data.title} (ID ${data.id})`);
      setListing(initialListing);
      await loadHierarchy();
    } catch (err) { setError(err.response?.data?.error || 'Failed to create listing'); }
  };

  const handleBulkImportSubmit = async (e) => {
    e.preventDefault();
    if (!csvFile) {
      setError('Please select a CSV file to import.');
      return;
    }
    setImporting(true);
    setImportResult(null);
    clearNotice();

    const formData = new FormData();
    formData.append('file', csvFile);

    try {
      const res = await client.post('/listings/import', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setImportResult(res.data);
      setMessage(`Bulk Import completed: ${res.data.successCount} listings created.`);
      setCsvFile(null);
      await loadHierarchy();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to import CSV file.');
    } finally {
      setImporting(false);
    }
  };

  const listingBeds = beds.filter((b) => String(b.roomId) === String(listing.roomId));
  const Preview = ({ urls = [] }) => (
    <div className="gallery-row">
      {urls.map((u, i) => <img key={`${u}-${i}`} src={u} alt={`preview-${i}`} className="gallery-thumb" />)}
    </div>
  );

  return (
    <section>
      <h2>Create New Entry</h2>
      <p className="muted">Role: {user?.role || 'N/A'}</p>
      <ManageNav />

      {message && <p className="success-text">{message}</p>}
      {error && <p className="error-text">{error}</p>}

      {/* ── Bulk Import Listings via Spreadsheet ── */}
      <div className="card form-card" style={{ marginBottom: 24, background: '#f8fafc', border: '1px solid #cbd5e1' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, flexWrap: 'wrap', gap: 10 }}>
          <h3 style={{ margin: 0, color: '#1e293b' }}>Bulk Import Listings via Spreadsheet (Optional)</h3>
          <a
            href="/listing_template.csv"
            download="listing_template.csv"
            style={{
              background: '#0f172a',
              color: '#ffffff',
              padding: '8px 14px',
              borderRadius: '8px',
              fontSize: '0.84rem',
              fontWeight: 'bold',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            📥 Download listing_template.csv
          </a>
        </div>
        <p style={{ margin: '0 0 14px 0', fontSize: '0.85rem', color: '#64748b' }}>
          Owners can fill room codes, title, rent, deposit, and inclusions in a spreadsheet and upload the file to add multiple listings at once.
        </p>

        <form onSubmit={handleBulkImportSubmit} style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
          <input
            type="file"
            accept=".csv,text/csv"
            onChange={(e) => setCsvFile(e.target.files[0] || null)}
            style={{ fontSize: '0.85rem' }}
          />
          <button
            type="submit"
            disabled={!csvFile || importing}
            style={{
              padding: '10px 18px',
              background: importing ? '#94a3b8' : '#16a34a',
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 'bold',
              cursor: importing ? 'not-allowed' : 'pointer'
            }}
          >
            {importing ? 'Importing Listings...' : 'Upload & Process CSV'}
          </button>
        </form>

        {importResult && (
          <div style={{ marginTop: 14, padding: 12, borderRadius: 8, background: importResult.errors?.length > 0 ? '#fff7ed' : '#ecfdf5', border: importResult.errors?.length > 0 ? '1px solid #ffedd5' : '1px solid #a7f3d0' }}>
            <p style={{ margin: 0, fontWeight: 'bold', color: importResult.errors?.length > 0 ? '#c2410c' : '#047857', fontSize: '0.88rem' }}>
              ✓ Import Processed: {importResult.successCount} listing(s) created.
            </p>
            {importResult.errors?.length > 0 && (
              <div style={{ marginTop: 8 }}>
                <p style={{ margin: '0 0 4px 0', fontSize: '0.82rem', fontWeight: 'bold', color: '#9a3412' }}>Encountered Line Errors:</p>
                <ul style={{ margin: 0, paddingLeft: 18, fontSize: '0.8rem', color: '#c2410c' }}>
                  {importResult.errors.map((errStr, idx) => (
                    <li key={idx}>{errStr}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>

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
          <input type="number" min="1" max="10" placeholder="Number of persons" value={room.maxPersons} onChange={(e) => setRoom({ ...room, maxPersons: e.target.value })} required />
          <input type="number" min="0" max="10" placeholder="Single beds" value={room.singleBeds} onChange={(e) => setRoom({ ...room, singleBeds: e.target.value })} />
          <input type="number" min="0" max="10" placeholder="Double beds" value={room.doubleBeds} onChange={(e) => setRoom({ ...room, doubleBeds: e.target.value })} />
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
          <input type="number" min="0" step="0.01" placeholder="Deposit Amount (optional)" value={listing.depositAmount} onChange={(e) => setListing({ ...listing, depositAmount: e.target.value })} />
          <input type="number" min="0" step="0.01" placeholder="Cleaning Charge (optional)" value={listing.cleaningCharge} onChange={(e) => setListing({ ...listing, cleaningCharge: e.target.value })} />
          <select value={listing.listingType} onChange={(e) => setListing({ ...listing, listingType: e.target.value })}>
            <option value="SINGLE_BED">SINGLE_BED</option>
            <option value="ENTIRE_ROOM">ENTIRE_ROOM</option>
            <option value="PRIVATE_ROOM_IN_SHARED_APT">PRIVATE_ROOM_IN_SHARED_APT</option>
          </select>
          <select value={listing.stayType} onChange={(e) => setListing({ ...listing, stayType: e.target.value })}>
            <option value="SHORT_TERM">Short-term stay</option>
            <option value="LONG_TERM">Long-term stay</option>
          </select>
          <select value={listing.minStayMonths} onChange={(e) => setListing({ ...listing, minStayMonths: Number(e.target.value) })}>
            <option value={1}>1 month minimum stay</option>
            <option value={2}>2 months minimum stay</option>
            <option value={3}>3 months minimum stay</option>
            <option value={6}>6 months minimum stay</option>
            <option value={12}>12 months minimum stay</option>
          </select>
          <select
            value={listing.rentType}
            onChange={(e) => {
              const val = e.target.value;
              if (val === 'COLD') {
                setListing({
                  ...listing,
                  rentType: val,
                  anmeldungAvailable: true,
                  waterIncluded: true,
                  internetIncluded: false,
                  electricityIncluded: false,
                  maintenanceIncluded: false,
                  heatingIncluded: false
                });
              } else {
                setListing({
                  ...listing,
                  rentType: val,
                  anmeldungAvailable: true,
                  waterIncluded: true,
                  internetIncluded: true,
                  electricityIncluded: true,
                  maintenanceIncluded: true,
                  heatingIncluded: true
                });
              }
            }}
          >
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
    </section>
  );
}
