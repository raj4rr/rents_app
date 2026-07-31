import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import client from '../api/client';
import ManageNav from '../components/ManageNav';

import { resolveImageUrl } from '../utils/imageUrl';

export default function ManageRecordsPage() {
  const navigate = useNavigate();
  const user = useMemo(() => {
    try { return JSON.parse(localStorage.getItem('auth_user') || '{}'); } catch { return {}; }
  }, []);
  const canManageEntries = ['OWNER', 'ADMIN'].includes(user?.role);

  const [manageData, setManageData] = useState({
    properties: [],
    apartments: [],
    rooms: [],
    beds: [],
    listings: []
  });
  const [manageEntityTab, setManageEntityTab] = useState('properties');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const loadManageData = async () => {
    if (!canManageEntries) return;
    try {
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
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load records');
    }
  };

  useEffect(() => {
    loadManageData();
  }, []);

  const openEditWindow = (entity, id) => {
    window.open(`/manage-entry/edit/${entity}/${id}`, `edit-${entity}-${id}`, 'width=840,height=760,scrollbars=yes,resizable=yes');
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

  const manageEntityConfig = {
    properties: { label: 'Properties', items: manageData.properties },
    apartments: { label: 'Apartments', items: manageData.apartments },
    rooms: { label: 'Rooms', items: manageData.rooms },
    beds: { label: 'Beds', items: manageData.beds },
    listings: { label: 'Listings', items: manageData.listings }
  };

  return (
    <section>
      <h2>Manage System Records</h2>
      <p className="muted">Role: {user?.role || 'N/A'}</p>
      <ManageNav />

      {message && <p className="success-text">{message}</p>}
      {error && <p className="error-text">{error}</p>}

      <div className="card">
        <div className="manage-head">
          <div>
            <h3 style={{ marginBottom: 4 }}>System Records Explorer</h3>
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
                {preview ? <img src={resolveImageUrl(preview)} alt={`${manageEntityTab}-${row.id}`} className="manage-thumb" /> : <div className="manage-thumb empty">No image</div>}
                <div className="manage-content">
                  <p className="manage-title">#{row.id} {getPrimaryLine(manageEntityTab, row)}</p>
                  <p className="manage-sub">{getSecondaryLine(manageEntityTab, row)}</p>
                </div>
                <button type="button" onClick={() => openEditWindow(manageEntityTab, row.id)}>Edit</button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
