import { useState, useEffect } from 'react';
import client from '../api/client';
import ManageNav from '../components/ManageNav';

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

export default function CreateRoomPage() {
  const [room, setRoom] = useState(initialRoom);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [apartments, setApartments] = useState([]);

  const clearNotice = () => { setMessage(''); setError(''); };

  
  const loadDependencies = async () => {
    try {
      
      const a = await client.get('/apartments');
      setApartments(a.data);

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

      setMessage(`Room created successfully: ID ${data.id}`);
      setRoom(initialRoom);
      await loadDependencies();
    } catch (err) { setError(err.response?.data?.error || 'Failed to create room'); }
  };

  return (
    <section>
      <h2>Add Room</h2>
      <ManageNav />
      {message && <p className="success-text">{message}</p>}
      {error && <p className="error-text">{error}</p>}
      <div className="card form-card" style={{ maxWidth: '600px', background: '#ffffff', border: '1px solid #e2e8f0' }}>
        <form onSubmit={submitForm} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          
          <LabelWrapper label="Select Apartment *">
            <select value={room.apartmentId} onChange={(e) => setRoom({ ...room, apartmentId: e.target.value })} required>
              <option value="">-- Select Apartment --</option>
              {apartments.map((a) => <option key={a.id} value={a.id}>{a.code} (#{a.id})</option>)}
            </select>
          </LabelWrapper>
          
          <LabelWrapper label="Room Code *">
            <input placeholder="e.g. Room A" value={room.code} onChange={(e) => setRoom({ ...room, code: e.target.value })} required />
          </LabelWrapper>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <LabelWrapper label="Capacity (Beds) *">
              <input type="number" min="1" max="3" value={room.capacity} onChange={(e) => setRoom({ ...room, capacity: e.target.value })} required />
            </LabelWrapper>
            <LabelWrapper label="Max Persons *">
              <input type="number" min="1" max="10" value={room.maxPersons} onChange={(e) => setRoom({ ...room, maxPersons: e.target.value })} required />
            </LabelWrapper>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <LabelWrapper label="Single Beds">
              <input type="number" min="0" max="10" value={room.singleBeds} onChange={(e) => setRoom({ ...room, singleBeds: e.target.value })} />
            </LabelWrapper>
            <LabelWrapper label="Double Beds">
              <input type="number" min="0" max="10" value={room.doubleBeds} onChange={(e) => setRoom({ ...room, doubleBeds: e.target.value })} />
            </LabelWrapper>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <LabelWrapper label="Inventory Mode">
              <select value={room.inventoryMode} onChange={(e) => setRoom({ ...room, inventoryMode: e.target.value })}>
                <option value="PRIVATE_ONLY">PRIVATE_ONLY</option>
                <option value="SHARED_ONLY">SHARED_ONLY</option>
                <option value="HYBRID">HYBRID</option>
              </select>
            </LabelWrapper>
            <LabelWrapper label="Furnishing Status">
              <select value={room.furnishingStatus} onChange={(e) => setRoom({ ...room, furnishingStatus: e.target.value })}>
                <option value="FURNISHED">FURNISHED</option>
                <option value="SEMI_FURNISHED">SEMI_FURNISHED</option>
                <option value="UNFURNISHED">UNFURNISHED</option>
              </select>
            </LabelWrapper>
          </div>

          <LabelWrapper label="Additional Features">
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <input type="checkbox" checked={room.hasPrivateBathroom} onChange={(e) => setRoom({ ...room, hasPrivateBathroom: e.target.checked })} /> Has Private Bathroom
            </label>
          </LabelWrapper>

          <LabelWrapper label="Room Images (Max 2)">
            <div style={{ border: '1px solid #cbd5e1', padding: '12px', borderRadius: '6px', background: '#f8fafc' }}>
              <input type="file" accept="image/*" multiple onChange={async (e) => {
                clearNotice();
                try {
                  const urls = await uploadImages(e.target.files, 2);
                  setRoom((prev) => ({ ...prev, imageUrls: urls }));
                }
                catch (err) { setError(err.message || 'Room image upload failed'); }
              }} />
              <p className="muted" style={{ margin: '4px 0 0' }}>Uploaded: {room.imageUrls.length}/2</p>
              <Preview urls={room.imageUrls} />
            </div>
          </LabelWrapper>

          <button type="submit" style={{ padding: '14px', fontSize: '1rem', fontWeight: 'bold', background: '#1f66ea', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', marginTop: '10px' }}>Create Room</button>
        </form>
      </div>
    </section>
  );
}
