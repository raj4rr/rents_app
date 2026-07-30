import { useState, useEffect } from 'react';
import client from '../api/client';
import ManageNav from '../components/ManageNav';

const initialApartment = { propertyId: '', code: '', amenities: 'Common Kitchen,Shared Washroom', imageUrls: [] };

const Preview = ({ urls = [] }) => (
  <div className="gallery-row" style={{ display: 'flex', gap: '10px', overflowX: 'auto', padding: '10px 0' }}>
    {urls.map((u, i) => <img key={`${u}-${i}`} src={u} alt={`preview-${i}`} style={{ height: '80px', borderRadius: '8px', objectFit: 'cover' }} />)}
  </div>
);

const LabelWrapper = ({ label, children }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '8px' }}>
    <label style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#475569' }}>{label}</label>
    {children}
  </div>
);

export default function CreateApartmentPage() {
  const [apartment, setApartment] = useState(initialApartment);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [properties, setProperties] = useState([]);

  const clearNotice = () => { setMessage(''); setError(''); };

  
  const loadDependencies = async () => {
    try {
      
      const p = await client.get('/properties');
      setProperties(p.data);

    } catch (_err) {}
  };

  useEffect(() => {
    loadDependencies();
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

  const submitForm = async (e) => {
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

      setMessage(`Apartment created successfully: ID ${data.id}`);
      setApartment(initialApartment);
      await loadDependencies();
    } catch (err) { setError(err.response?.data?.error || 'Failed to create apartment'); }
  };

  return (
    <section>
      <h2>Add Apartment</h2>
      <ManageNav />
      {message && <p className="success-text">{message}</p>}
      {error && <p className="error-text">{error}</p>}
      <div className="card form-card" style={{ maxWidth: '600px', background: '#ffffff', border: '1px solid #e2e8f0' }}>
        <form onSubmit={submitForm} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          
          <LabelWrapper label="Select Property *">
            <select value={apartment.propertyId} onChange={(e) => setApartment({ ...apartment, propertyId: e.target.value })} required>
              <option value="">-- Select Property --</option>
              {properties.map((p) => <option key={p.id} value={p.id}>{p.name} (#{p.id})</option>)}
            </select>
          </LabelWrapper>
          <LabelWrapper label="Apartment Code *">
            <input placeholder="e.g. Apt 4B" value={apartment.code} onChange={(e) => setApartment({ ...apartment, code: e.target.value })} required />
          </LabelWrapper>
          <LabelWrapper label="Amenities (comma separated)">
            <input placeholder="e.g. WiFi, Kitchen, Washer" value={apartment.amenities} onChange={(e) => setApartment({ ...apartment, amenities: e.target.value })} />
          </LabelWrapper>
          <LabelWrapper label="Apartment Images (Max 2)">
            <div style={{ border: '1px solid #cbd5e1', padding: '12px', borderRadius: '6px', background: '#f8fafc' }}>
              <input type="file" accept="image/*" multiple onChange={async (e) => {
                clearNotice();
                try {
                  const urls = await uploadImages(e.target.files, 2);
                  setApartment((prev) => ({ ...prev, imageUrls: urls }));
                }
                catch (err) { setError(err.message || 'Apartment image upload failed'); }
              }} />
              <p className="muted" style={{ margin: '4px 0 0' }}>Uploaded: {apartment.imageUrls.length}/2</p>
              <Preview urls={apartment.imageUrls} />
            </div>
          </LabelWrapper>

          <button type="submit" style={{ padding: '14px', fontSize: '1rem', fontWeight: 'bold', background: '#1f66ea', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', marginTop: '10px' }}>Create Apartment</button>
        </form>
      </div>
    </section>
  );
}
