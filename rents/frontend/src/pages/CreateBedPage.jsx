import { useState, useEffect } from 'react';
import client from '../api/client';
import ManageNav from '../components/ManageNav';

const initialBed = { roomId: '', bedCode: '', status: 'ACTIVE', imageUrl: '' };

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

export default function CreateBedPage() {
  const [bed, setBed] = useState(initialBed);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [rooms, setRooms] = useState([]);

  const clearNotice = () => { setMessage(''); setError(''); };

  
  const loadDependencies = async () => {
    try {
      
      const r = await client.get('/rooms');
      setRooms(r.data);

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
        roomId: Number(bed.roomId),
        bedCode: bed.bedCode,
        status: bed.status,
        imageUrl: bed.imageUrl
      };
      const { data } = await client.post('/beds', payload);

      setMessage(`Bed created successfully: ID ${data.id}`);
      setBed(initialBed);
      await loadDependencies();
    } catch (err) { setError(err.response?.data?.error || 'Failed to create bed'); }
  };

  return (
    <section>
      <h2>Add Bed</h2>
      <ManageNav />
      {message && <p className="success-text">{message}</p>}
      {error && <p className="error-text">{error}</p>}
      <div className="card form-card" style={{ maxWidth: '600px', background: '#ffffff', border: '1px solid #e2e8f0' }}>
        <form onSubmit={submitForm} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          
          <LabelWrapper label="Select Room *">
            <select value={bed.roomId} onChange={(e) => setBed({ ...bed, roomId: e.target.value })} required>
              <option value="">-- Select Room --</option>
              {rooms.map((r) => <option key={r.id} value={r.id}>{r.code} (#{r.id})</option>)}
            </select>
          </LabelWrapper>

          <LabelWrapper label="Bed Code *">
            <input placeholder="e.g. Bed 1" value={bed.bedCode} onChange={(e) => setBed({ ...bed, bedCode: e.target.value })} required />
          </LabelWrapper>

          <LabelWrapper label="Bed Status">
            <select value={bed.status} onChange={(e) => setBed({ ...bed, status: e.target.value })}>
              <option value="ACTIVE">ACTIVE</option>
              <option value="INACTIVE">INACTIVE</option>
              <option value="MAINTENANCE">MAINTENANCE</option>
            </select>
          </LabelWrapper>

          <LabelWrapper label="Bed Image (Max 1)">
            <div style={{ border: '1px solid #cbd5e1', padding: '12px', borderRadius: '6px', background: '#f8fafc' }}>
              <input type="file" accept="image/*" onChange={async (e) => {
                clearNotice();
                try {
                  const urls = await uploadImages(e.target.files, 1);
                  setBed((prev) => ({ ...prev, imageUrl: urls[0] || '' }));
                } catch (err) { setError(err.message || 'Bed image upload failed'); }
              }} />
              <p className="muted" style={{ margin: '4px 0 0' }}>Status: {bed.imageUrl ? 'Uploaded' : 'None'}</p>
              <Preview urls={bed.imageUrl ? [bed.imageUrl] : []} />
            </div>
          </LabelWrapper>

          <button type="submit" style={{ padding: '14px', fontSize: '1rem', fontWeight: 'bold', background: '#1f66ea', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', marginTop: '10px' }}>Create Bed</button>
        </form>
      </div>
    </section>
  );
}
