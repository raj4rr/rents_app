import { useEffect, useMemo, useState } from 'react';
import client from '../api/client';
import ManageNav from '../components/ManageNav';

export default function MyEntriesPage() {
  const user = useMemo(() => {
    try { return JSON.parse(localStorage.getItem('auth_user') || '{}'); } catch { return {}; }
  }, []);
  const canManageEntries = ['OWNER', 'ADMIN'].includes(user?.role);

  const [myEntries, setMyEntries] = useState([]);
  const [entryEdits, setEntryEdits] = useState({});
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const clearNotice = () => { setMessage(''); setError(''); };

  const loadMyEntries = async () => {
    if (!canManageEntries) return;
    try {
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
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load entries');
    }
  };

  useEffect(() => {
    loadMyEntries();
  }, []);

  const updateMyEntry = async (entryId) => {
    clearNotice();
    try {
      await client.patch(`/me/entries/${entryId}`, entryEdits[entryId]);
      setMessage('Entry updated successfully');
      await loadMyEntries();
    } catch (err) { setError(err.response?.data?.error || 'Failed to update entry'); }
  };

  return (
    <section>
      <h2>My Entries (Listings)</h2>
      <p className="muted">Role: {user?.role || 'N/A'}</p>
      <ManageNav />

      {message && <p className="success-text">{message}</p>}
      {error && <p className="error-text">{error}</p>}

      <div className="card">
        <h3>Active Property & Room Listings</h3>
        {myEntries.length === 0 && <p>No entries yet.</p>}
        {myEntries.map((e) => (
          <div key={e.id} className="card" style={{ marginBottom: 14 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 2fr 1fr auto', gap: 12, alignItems: 'center' }}>
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
                placeholder="Base Rent (€)"
              />
              <input
                value={entryEdits[e.id]?.locationText || ''}
                onChange={(ev) => setEntryEdits((prev) => ({ ...prev, [e.id]: { ...prev[e.id], locationText: ev.target.value } }))}
                placeholder="Location"
              />
              <label style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', fontSize: '0.9rem' }}>
                <input
                  type="checkbox"
                  checked={Boolean(entryEdits[e.id]?.isActive)}
                  onChange={(ev) => setEntryEdits((prev) => ({ ...prev, [e.id]: { ...prev[e.id], isActive: ev.target.checked } }))}
                /> Active
              </label>
              <button type="button" onClick={() => updateMyEntry(e.id)}>Update Entry</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
