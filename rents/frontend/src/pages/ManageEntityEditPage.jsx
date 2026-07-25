import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import client from '../api/client';

const editableFields = {
  properties: ['name', 'city', 'address'],
  apartments: ['code', 'amenities', 'imageUrls'],
  rooms: ['code', 'capacity', 'maxPersons', 'singleBeds', 'doubleBeds', 'inventoryMode', 'furnishingStatus', 'hasPrivateBathroom', 'imageUrls'],
  beds: ['bedCode', 'status', 'imageUrl'],
  listings: ['title', 'listingType', 'stayType', 'minStayMonths', 'imageUrl', 'imageUrls', 'locationText', 'latitude', 'longitude', 'rentType', 'baseRent', 'depositAmount', 'cleaningCharge', 'anmeldungAvailable', 'internetIncluded', 'electricityIncluded', 'maintenanceIncluded', 'heatingIncluded', 'waterIncluded', 'isActive']
};

const maxImagesByEntity = {
  apartments: 2,
  rooms: 2,
  beds: 1,
  listings: 4
};

const parseCsv = (raw) => String(raw || '').split(',').map((x) => x.trim()).filter(Boolean);

export default function ManageEntityEditPage() {
  const { entity, id } = useParams();
  const [form, setForm] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);
  const [platformFees, setPlatformFees] = useState({ shortTermFee: 10, longTermFee: 50 });

  useEffect(() => {
    Promise.all([
      client.get('/settings').catch(() => ({ data: { shortTermFee: 10, longTermFee: 50 } })),
      client.get(`/manage/${entity}/${id}`)
    ]).then(([settingsRes, entityRes]) => {
      const feesObj = settingsRes.data || { shortTermFee: 10, longTermFee: 50 };
      setPlatformFees(feesObj);

      const data = { ...entityRes.data };
      if (Array.isArray(data.amenities)) data.amenities = data.amenities.join(', ');
      if (Array.isArray(data.imageUrls)) data.imageUrls = data.imageUrls.join(', ');
      if (entity === 'listings' && data.baseRent !== undefined) {
        const fee = data.stayType === 'LONG_TERM' ? feesObj.longTermFee : feesObj.shortTermFee;
        data.baseRent = Number(data.baseRent) - fee;
      }
      setForm(data);
    }).catch((err) => {
      setError(err.response?.data?.error || 'Failed to load record');
    });
  }, [entity, id]);

  const previewUrls = useMemo(() => {
    if (!form) return [];
    if (entity === 'beds') return form.imageUrl ? [form.imageUrl] : [];
    const arr = parseCsv(form.imageUrls);
    if (entity === 'listings' && form.imageUrl && !arr.includes(form.imageUrl)) arr.unshift(form.imageUrl);
    return arr;
  }, [entity, form]);

  if (!editableFields[entity]) return <section><p>Unsupported entity.</p></section>;

  const onChange = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const uploadImages = async (files) => {
    const selected = Array.from(files || []);
    if (!selected.length) return;
    const maxCount = maxImagesByEntity[entity] || 0;
    if (!maxCount) return;

    setUploading(true);
    setMessage('');
    setError('');
    try {
      const formData = new FormData();
      selected.forEach((file) => formData.append('images', file));
      const { data } = await client.post('/uploads/images', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      const urls = data.urls || [];

      if (entity === 'beds') {
        onChange('imageUrl', urls[0] || '');
      } else {
        const current = parseCsv(form.imageUrls);
        const merged = [...current, ...urls].slice(0, maxCount);
        onChange('imageUrls', merged.join(', '));
        if (entity === 'listings' && merged[0]) onChange('imageUrl', merged[0]);
      }
      setMessage('Images uploaded. Click Save Changes to persist.');
    } catch (err) {
      setError(err.response?.data?.error || 'Image upload failed');
    } finally {
      setUploading(false);
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    try {
      const payload = {};
      editableFields[entity].forEach((key) => {
        let value = form[key];
        if (key === 'amenities' || key === 'imageUrls') {
          value = parseCsv(value);
        }
        if (['capacity', 'maxPersons', 'singleBeds', 'doubleBeds', 'minStayMonths', 'baseRent', 'depositAmount', 'cleaningCharge', 'latitude', 'longitude'].includes(key) && value !== '' && value !== null && value !== undefined) {
          value = Number(value);
        }
        payload[key] = value;
      });
      await client.patch(`/manage/${entity}/${id}`, payload);
      setMessage('Updated successfully');
    } catch (err) {
      setError(err.response?.data?.error || 'Update failed');
    }
  };

  const supportsImages = ['apartments', 'rooms', 'beds', 'listings'].includes(entity);

  return (
    <section>
      <h2>Edit {entity} #{id}</h2>
      {error && <p className="error-text">{error}</p>}
      {message && <p className="success-text">{message}</p>}
      {form && (
        <form className="card form-card" onSubmit={submit}>
          {supportsImages && (
            <div className="edit-images-box">
              <p className="muted" style={{ marginBottom: 8 }}>Uploaded Images</p>
              <div className="gallery-row">
                {previewUrls.length === 0 && <span className="muted">No images uploaded</span>}
                {previewUrls.map((url, i) => <img key={`${url}-${i}`} src={url} alt={`uploaded-${i}`} className="gallery-thumb" />)}
              </div>
              <input
                type="file"
                accept="image/*"
                multiple={entity !== 'beds'}
                onChange={(e) => uploadImages(e.target.files)}
              />
              <p className="muted" style={{ marginTop: 6 }}>
                Max images: {maxImagesByEntity[entity] || 0} {uploading ? '(Uploading...)' : ''}
              </p>
            </div>
          )}

          {editableFields[entity].map((field) => {
            const v = form[field];
            const lower = field.toLowerCase();
            if (typeof v === 'boolean') {
              return (
                <label key={field}>
                  <input type="checkbox" checked={Boolean(v)} onChange={(e) => onChange(field, e.target.checked)} /> {field}
                </label>
              );
            }
            if (field === 'inventoryMode') {
              return (
                <select key={field} value={v || 'HYBRID'} onChange={(e) => onChange(field, e.target.value)}>
                  <option value="PRIVATE_ONLY">PRIVATE_ONLY</option>
                  <option value="SHARED_ONLY">SHARED_ONLY</option>
                  <option value="HYBRID">HYBRID</option>
                </select>
              );
            }
            if (field === 'furnishingStatus') {
              return (
                <select key={field} value={v || 'SEMI_FURNISHED'} onChange={(e) => onChange(field, e.target.value)}>
                  <option value="FURNISHED">FURNISHED</option>
                  <option value="SEMI_FURNISHED">SEMI_FURNISHED</option>
                  <option value="UNFURNISHED">UNFURNISHED</option>
                </select>
              );
            }
            if (field === 'listingType') {
              return (
                <select key={field} value={v || 'SINGLE_BED'} onChange={(e) => onChange(field, e.target.value)}>
                  <option value="SINGLE_BED">SINGLE_BED</option>
                  <option value="ENTIRE_ROOM">ENTIRE_ROOM</option>
                  <option value="PRIVATE_ROOM_IN_SHARED_APT">PRIVATE_ROOM_IN_SHARED_APT</option>
                </select>
              );
            }
            if (field === 'stayType') {
              return (
                <select key={field} value={v || 'SHORT_TERM'} onChange={(e) => onChange(field, e.target.value)}>
                  <option value="SHORT_TERM">Short-term stay</option>
                  <option value="LONG_TERM">Long-term stay</option>
                </select>
              );
            }
            if (field === 'minStayMonths') {
              return (
                <select key={field} value={v || 1} onChange={(e) => onChange(field, Number(e.target.value))}>
                  <option value={1}>1 month</option>
                  <option value={2}>2 months</option>
                  <option value={3}>3 months</option>
                  <option value={6}>6 months</option>
                  <option value={12}>12 months</option>
                </select>
              );
            }
            if (field === 'rentType') {
              return (
                <select key={field} value={v || 'WARM'} onChange={(e) => onChange(field, e.target.value)}>
                  <option value="WARM">warmmiete</option>
                  <option value="COLD">kaltmiete</option>
                </select>
              );
            }
            if (field === 'status' && entity === 'beds') {
              return (
                <select key={field} value={v || 'ACTIVE'} onChange={(e) => onChange(field, e.target.value)}>
                  <option value="ACTIVE">ACTIVE</option>
                  <option value="INACTIVE">INACTIVE</option>
                  <option value="MAINTENANCE">MAINTENANCE</option>
                </select>
              );
            }
            if (field === 'baseRent' && entity === 'listings') {
              return (
                <div key={field} style={{ marginBottom: '12px' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#475569', display: 'block', marginBottom: '4px' }}>Base Rent (€)</label>
                  <input
                    type="number"
                    step="any"
                    value={v ?? ''}
                    onChange={(e) => onChange(field, e.target.value)}
                    placeholder="base rent"
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', marginBottom: '8px', boxSizing: 'border-box' }}
                  />
                  {v && (
                    <div style={{ background: '#f8fafc', padding: '10px 12px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.82rem', marginBottom: '4px' }}>
                      <p style={{ margin: '0 0 3px', color: '#475569' }}>
                        Base price input: <strong>€{v}</strong>
                      </p>
                      <p style={{ margin: 0, color: '#16a34a', fontWeight: 'bold' }}>
                        Stored Rent: €{Number(v) + (form.stayType === 'LONG_TERM' ? platformFees.longTermFee : platformFees.shortTermFee)}
                        <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 'normal', marginLeft: '6px' }}>
                          (includes €{form.stayType === 'LONG_TERM' ? platformFees.longTermFee : platformFees.shortTermFee} platform fee)
                        </span>
                      </p>
                    </div>
                  )}
                </div>
              );
            }
            const type = ['capacity', 'baseRent', 'depositAmount', 'cleaningCharge', 'latitude', 'longitude'].includes(field) ? 'number' : 'text';
            return (
              <input
                key={field}
                type={type}
                step={type === 'number' ? 'any' : undefined}
                value={v ?? ''}
                onChange={(e) => onChange(field, e.target.value)}
                placeholder={lower}
              />
            );
          })}
          <button type="submit">Save Changes</button>
        </form>
      )}
    </section>
  );
}
