import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import client from '../api/client';
import ManageNav from '../components/ManageNav';

import { resolveImageUrl } from '../utils/imageUrl';

const initialListing = {
  roomId: '',
  bedId: '',
  listingType: 'SINGLE_BED',
  stayType: 'SHORT_TERM',
  minStayMonths: 3,
  title: '',
  imageUrl: '',
  imageUrls: [],
  locationText: 'Britzer Str. 25, 12439 Berlin, Deutschland',
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

const Preview = ({ urls = [] }) => (
  <div className="gallery-row" style={{ display: 'flex', gap: '10px', overflowX: 'auto', padding: '10px 0' }}>
    {urls.map((u, i) => <img key={`${u}-${i}`} src={resolveImageUrl(u)} alt={`preview-${i}`} style={{ height: '80px', borderRadius: '8px', objectFit: 'cover' }} />)}
  </div>
);

const LabelWrapper = ({ label, children }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
    <label style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#475569' }}>{label}</label>
    {children}
  </div>
);

export default function CreateEntryPage() {
  const navigate = useNavigate();
  const user = useMemo(() => {
    try { return JSON.parse(localStorage.getItem('auth_user') || '{}'); } catch { return {}; }
  }, []);

  // Hierarchy Data
  const [properties, setProperties] = useState([]);
  const [apartments, setApartments] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [beds, setBeds] = useState([]);

  // Selections for cascading dropdowns
  const [selectedPropertyId, setSelectedPropertyId] = useState('');
  const [selectedApartmentId, setSelectedApartmentId] = useState('');

  const [listing, setListing] = useState(initialListing);

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
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to import CSV file.');
    } finally {
      setImporting(false);
    }
  };

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
        depositAmount: listing.depositAmount ? Number(listing.depositAmount) : 0,
        cleaningCharge: listing.cleaningCharge ? Number(listing.cleaningCharge) : 0,
      };
      const { data } = await client.post('/listings', payload);
      setMessage(`Listing created successfully! (ID: ${data.id})`);
      setListing(initialListing);
      setSelectedPropertyId('');
      setSelectedApartmentId('');
    } catch (err) { setError(err.response?.data?.error || 'Failed to create listing'); }
  };

  // Filtered Lists
  const filteredApartments = apartments.filter(a => !selectedPropertyId || String(a.propertyId) === String(selectedPropertyId));
  const filteredRooms = rooms.filter(r => !selectedApartmentId || String(r.apartmentId) === String(selectedApartmentId));
  const filteredBeds = beds.filter(b => !listing.roomId || String(b.roomId) === String(listing.roomId));

  const selectedProperty = properties.find(p => String(p.id) === String(selectedPropertyId));
  const selectedApartment = apartments.find(a => String(a.id) === String(selectedApartmentId));
  const selectedRoom = rooms.find(r => String(r.id) === String(listing.roomId));
  const selectedBed = beds.find(b => String(b.id) === String(listing.bedId));

  return (
    <section>
      <h2>Add New Listing</h2>
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
            {importing ? 'Importing...' : 'Upload CSV'}
          </button>
        </form>

        {importResult && (
          <div style={{ marginTop: 14, padding: 12, borderRadius: 8, background: importResult.errors?.length > 0 ? '#fff7ed' : '#ecfdf5', border: importResult.errors?.length > 0 ? '1px solid #ffedd5' : '1px solid #a7f3d0' }}>
            <p style={{ margin: 0, fontWeight: 'bold', color: importResult.errors?.length > 0 ? '#c2410c' : '#047857', fontSize: '0.88rem' }}>
              ✓ Import Processed: {importResult.successCount} listing(s) created.
            </p>
            {importResult.errors?.length > 0 && (
              <div style={{ marginTop: 8 }}>
                <p style={{ margin: '0 0 4px 0', fontSize: '0.82rem', fontWeight: 'bold', color: '#9a3412' }}>Line Errors:</p>
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

      <div className="card form-card" style={{ maxWidth: '800px', margin: '0 auto', background: '#ffffff', border: '1px solid #e2e8f0' }}>
        <h3 style={{ marginTop: 0, borderBottom: '1px solid #e2e8f0', paddingBottom: '12px' }}>Create a Public Listing</h3>
        
        <form onSubmit={submitListing} style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '20px' }}>
          
          {/* Hierarchy Selection */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '12px', background: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            <h4 style={{ margin: 0, color: '#334155' }}>1. Select Location Hierarchy</h4>
            
            <LabelWrapper label="Property">
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <select style={{ flex: 1 }} value={selectedPropertyId} onChange={(e) => { setSelectedPropertyId(e.target.value); setSelectedApartmentId(''); setListing({ ...listing, roomId: '', bedId: '' }); }}>
                  <option value="">-- Select Property --</option>
                  {properties.map(p => <option key={p.id} value={p.id}>{p.name} (#{p.id})</option>)}
                </select>
                <Link to="/manage-entry/create/property" target="_blank" style={{ fontSize: '0.85rem', color: '#1f66ea', whiteSpace: 'nowrap' }}>+ Add Property</Link>
              </div>
              {selectedProperty && (
                <div style={{ padding: '8px', background: '#e2e8f0', borderRadius: '4px', fontSize: '0.8rem', color: '#334155', marginTop: '4px' }}>
                  <strong>City:</strong> {selectedProperty.city} &nbsp;|&nbsp; <strong>Address:</strong> {selectedProperty.address}
                </div>
              )}
            </LabelWrapper>

            <LabelWrapper label="Apartment">
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <select style={{ flex: 1 }} value={selectedApartmentId} onChange={(e) => { setSelectedApartmentId(e.target.value); setListing({ ...listing, roomId: '', bedId: '' }); }} disabled={!selectedPropertyId}>
                  <option value="">-- Select Apartment --</option>
                  {filteredApartments.map(a => <option key={a.id} value={a.id}>{a.code} (#{a.id})</option>)}
                </select>
                <Link to="/manage-entry/create/apartment" target="_blank" style={{ fontSize: '0.85rem', color: '#1f66ea', whiteSpace: 'nowrap' }}>+ Add Apartment</Link>
              </div>
              {selectedApartment && (
                <div style={{ padding: '8px', background: '#e2e8f0', borderRadius: '4px', fontSize: '0.8rem', color: '#334155', marginTop: '4px' }}>
                  <strong>Amenities:</strong> {selectedApartment.amenities || 'None'}
                </div>
              )}
            </LabelWrapper>

            <LabelWrapper label="Room (Required)">
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <select style={{ flex: 1 }} value={listing.roomId} onChange={(e) => setListing({ ...listing, roomId: e.target.value, bedId: '' })} required disabled={!selectedApartmentId}>
                  <option value="">-- Select Room --</option>
                  {filteredRooms.map(r => <option key={r.id} value={r.id}>{r.code} (#{r.id})</option>)}
                </select>
                <Link to="/manage-entry/create/room" target="_blank" style={{ fontSize: '0.85rem', color: '#1f66ea', whiteSpace: 'nowrap' }}>+ Add Room</Link>
              </div>
              {selectedRoom && (
                <div style={{ padding: '8px', background: '#e2e8f0', borderRadius: '4px', fontSize: '0.8rem', color: '#334155', marginTop: '4px' }}>
                  <strong>Capacity:</strong> {selectedRoom.capacity} person(s) &nbsp;|&nbsp; <strong>Inventory Mode:</strong> {selectedRoom.inventoryMode} &nbsp;|&nbsp; <strong>Furnishing:</strong> {selectedRoom.furnishingStatus}
                </div>
              )}
            </LabelWrapper>

            <LabelWrapper label="Bed (Optional)">
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <select style={{ flex: 1 }} value={listing.bedId} onChange={(e) => setListing({ ...listing, bedId: e.target.value })} disabled={!listing.roomId}>
                  <option value="">-- Select Bed --</option>
                  {filteredBeds.map(b => <option key={b.id} value={b.id}>{b.bedCode} (#{b.id})</option>)}
                </select>
                <Link to="/manage-entry/create/bed" target="_blank" style={{ fontSize: '0.85rem', color: '#1f66ea', whiteSpace: 'nowrap' }}>+ Add Bed</Link>
              </div>
              {selectedBed && (
                <div style={{ padding: '8px', background: '#e2e8f0', borderRadius: '4px', fontSize: '0.8rem', color: '#334155', marginTop: '4px' }}>
                  <strong>Status:</strong> {selectedBed.status}
                </div>
              )}
            </LabelWrapper>
          </div>

          {/* Listing Details */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '12px', background: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            <h4 style={{ margin: 0, color: '#334155' }}>2. Listing Details</h4>
            
            <LabelWrapper label="Listing Title *">
              <input placeholder="Enter title (e.g., Cozy Room in Berlin)" value={listing.title} onChange={(e) => setListing({ ...listing, title: e.target.value })} required />
            </LabelWrapper>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <LabelWrapper label="Listing Type">
                <select value={listing.listingType} onChange={(e) => setListing({ ...listing, listingType: e.target.value })}>
                  <option value="SINGLE_BED">Single Bed</option>
                  <option value="ENTIRE_ROOM">Entire Room</option>
                  <option value="PRIVATE_ROOM_IN_SHARED_APT">Private Room in Shared Apt</option>
                </select>
              </LabelWrapper>
              
              <LabelWrapper label="Stay Type">
                <select value={listing.stayType} onChange={(e) => setListing({ ...listing, stayType: e.target.value })}>
                  <option value="SHORT_TERM">Short-term stay</option>
                  <option value="LONG_TERM">Long-term stay</option>
                </select>
              </LabelWrapper>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <LabelWrapper label="Rent Type">
                <select value={listing.rentType} onChange={(e) => setListing({ ...listing, rentType: e.target.value })}>
                  <option value="WARM">Warm Rent (Includes extras)</option>
                  <option value="COLD">Cold Rent (Extras separate)</option>
                </select>
              </LabelWrapper>
              
              <LabelWrapper label="Minimum Stay (Months)">
                <select value={listing.minStayMonths} onChange={(e) => setListing({ ...listing, minStayMonths: Number(e.target.value) })}>
                  <option value={1}>1 month minimum stay</option>
                  <option value={2}>2 months minimum stay</option>
                  <option value={3}>3 months minimum stay</option>
                  <option value={6}>6 months minimum stay</option>
                  <option value={12}>12 months minimum stay</option>
                </select>
              </LabelWrapper>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
              <LabelWrapper label="Base Rent (per month) *">
                <input type="number" step="0.01" placeholder="0.00" value={listing.baseRent} onChange={(e) => setListing({ ...listing, baseRent: e.target.value })} required />
              </LabelWrapper>
              <LabelWrapper label="Deposit Amount">
                <input type="number" min="0" step="0.01" placeholder="0.00" value={listing.depositAmount} onChange={(e) => setListing({ ...listing, depositAmount: e.target.value })} />
              </LabelWrapper>
              <LabelWrapper label="Cleaning Charge">
                <input type="number" min="0" step="0.01" placeholder="0.00" value={listing.cleaningCharge} onChange={(e) => setListing({ ...listing, cleaningCharge: e.target.value })} />
              </LabelWrapper>
            </div>

            <LabelWrapper label="Location Text">
              <input placeholder="e.g. Near HBF, Central Berlin" value={listing.locationText} onChange={(e) => setListing({ ...listing, locationText: e.target.value })} />
            </LabelWrapper>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <LabelWrapper label="Latitude">
                <input type="number" step="0.0000001" placeholder="52.5200" value={listing.latitude} onChange={(e) => setListing({ ...listing, latitude: e.target.value })} />
              </LabelWrapper>
              <LabelWrapper label="Longitude">
                <input type="number" step="0.0000001" placeholder="13.4050" value={listing.longitude} onChange={(e) => setListing({ ...listing, longitude: e.target.value })} />
              </LabelWrapper>
            </div>

            <div style={{ border: '1px solid #cbd5e1', padding: '12px', borderRadius: '6px', background: '#fff' }}>
              <p style={{ margin: '0 0 8px 0', fontSize: '0.85rem', fontWeight: 'bold', color: '#475569' }}>Upload Images (Max 4)</p>
              <input type="file" accept="image/*" multiple onChange={async (e) => {
                clearNotice();
                try {
                  const urls = await uploadImages(e.target.files, 4);
                  setListing((prev) => ({ ...prev, imageUrls: urls, imageUrl: urls[0] || '' }));
                } catch (err) { setError(err.message || 'Listing image upload failed'); }
              }} />
              <p className="muted" style={{ margin: '4px 0 0' }}>{listing.imageUrls.length}/4 Images Uploaded</p>
              <Preview urls={listing.imageUrls} />
            </div>

            <LabelWrapper label="Inclusions & Features">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '4px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem' }}>
                  <input type="checkbox" checked={listing.anmeldungAvailable} onChange={(e) => setListing({ ...listing, anmeldungAvailable: e.target.checked })} /> Anmeldung available
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem' }}>
                  <input type="checkbox" checked={listing.internetIncluded} onChange={(e) => setListing({ ...listing, internetIncluded: e.target.checked })} /> Internet included
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem' }}>
                  <input type="checkbox" checked={listing.electricityIncluded} onChange={(e) => setListing({ ...listing, electricityIncluded: e.target.checked })} /> Electricity included
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem' }}>
                  <input type="checkbox" checked={listing.maintenanceIncluded} onChange={(e) => setListing({ ...listing, maintenanceIncluded: e.target.checked })} /> Maintenance included
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem' }}>
                  <input type="checkbox" checked={listing.heatingIncluded} onChange={(e) => setListing({ ...listing, heatingIncluded: e.target.checked })} /> Heating included
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem' }}>
                  <input type="checkbox" checked={listing.waterIncluded} onChange={(e) => setListing({ ...listing, waterIncluded: e.target.checked })} /> Water included
                </label>
              </div>
            </LabelWrapper>
          </div>

          <button type="submit" style={{ padding: '14px', fontSize: '1rem', fontWeight: 'bold', background: '#1f66ea', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', marginTop: '10px' }}>
            Add New Listing
          </button>
        </form>
      </div>
    </section>
  );
}
