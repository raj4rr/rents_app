import { useState } from 'react';
import client from '../api/client';
import ManageNav from '../components/ManageNav';

const initialProperty = { name: '', city: '', address: '' };

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

export default function CreatePropertyPage() {
  const [property, setProperty] = useState(initialProperty);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  

  const clearNotice = () => { setMessage(''); setError(''); };

  

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
      const { data } = await client.post('/properties', property);
      setMessage(`Property created successfully: ID ${data.id}`);
      setProperty(initialProperty);
      
    } catch (err) { setError(err.response?.data?.error || 'Failed to create property'); }
  };

  return (
    <section>
      <h2>Add Property</h2>
      <ManageNav />
      {message && <p className="success-text">{message}</p>}
      {error && <p className="error-text">{error}</p>}
      <div className="card form-card" style={{ maxWidth: '600px', background: '#ffffff', border: '1px solid #e2e8f0' }}>
        <form onSubmit={submitForm} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          
          <LabelWrapper label="Property Name *">
            <input placeholder="e.g. Skyline Apartments" value={property.name} onChange={(e) => setProperty({ ...property, name: e.target.value })} required />
          </LabelWrapper>
          <LabelWrapper label="City *">
            <input placeholder="e.g. Berlin" value={property.city} onChange={(e) => setProperty({ ...property, city: e.target.value })} required />
          </LabelWrapper>
          <LabelWrapper label="Address *">
            <input placeholder="e.g. 123 Main St" value={property.address} onChange={(e) => setProperty({ ...property, address: e.target.value })} required />
          </LabelWrapper>

          <button type="submit" style={{ padding: '14px', fontSize: '1rem', fontWeight: 'bold', background: '#1f66ea', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', marginTop: '10px' }}>Create Property</button>
        </form>
      </div>
    </section>
  );
}
