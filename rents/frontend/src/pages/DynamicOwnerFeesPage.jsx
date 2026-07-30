import { useEffect, useMemo, useState } from 'react';
import client from '../api/client';
import ManageNav from '../components/ManageNav';

export default function DynamicOwnerFeesPage() {
  const user = useMemo(() => {
    try { return JSON.parse(localStorage.getItem('auth_user') || '{}'); } catch { return {}; }
  }, []);

  const [systemSettings, setSystemSettings] = useState({ shortTermFee: '10', longTermFee: '50' });
  const [ownersList, setOwnersList] = useState([]);
  const [selectedOwnerId, setSelectedOwnerId] = useState('');
  const [ownerFeesForm, setOwnerFeesForm] = useState({});
  const [ownerFeeMessage, setOwnerFeeMessage] = useState('');
  const [ownerFeeError, setOwnerFeeError] = useState('');
  const [savingOwnerId, setSavingOwnerId] = useState(null);

  const loadSystemSettings = async () => {
    try {
      const res = await client.get('/settings');
      setSystemSettings(res.data);
    } catch (_err) {}
  };

  const loadOwners = async () => {
    if (user?.role !== 'ADMIN') return;
    try {
      const res = await client.get('/admin/owners');
      const list = res.data || [];
      setOwnersList(list);
      
      const forms = {};
      list.forEach(o => {
        forms[o.id] = {
          shortTermFee: o.shortTermFee !== null ? String(o.shortTermFee) : '',
          longTermFee: o.longTermFee !== null ? String(o.longTermFee) : ''
        };
      });
      setOwnerFeesForm(forms);

      if (list.length > 0) {
        setSelectedOwnerId(prev => {
          const exists = list.some(o => String(o.id) === String(prev));
          return exists ? prev : String(list[0].id);
        });
      } else {
        setSelectedOwnerId('');
      }
    } catch (_err) {}
  };

  const handleOwnerFeeInputChange = (ownerId, field, val) => {
    setOwnerFeesForm(prev => ({
      ...prev,
      [ownerId]: {
        ...(prev[ownerId] || {}),
        [field]: val
      }
    }));
  };

  const saveOwnerFees = async (ownerId) => {
    setOwnerFeeMessage('');
    setOwnerFeeError('');
    setSavingOwnerId(ownerId);
    const form = ownerFeesForm[ownerId] || {};
    try {
      const payload = {
        shortTermFee: form.shortTermFee === '' ? null : Number(form.shortTermFee),
        longTermFee: form.longTermFee === '' ? null : Number(form.longTermFee)
      };
      const res = await client.put(`/admin/owners/${ownerId}/fees`, payload);
      setOwnerFeeMessage(res.data.message || 'Owner platform fees updated successfully.');
      await loadOwners();
    } catch (err) {
      setOwnerFeeError(err.response?.data?.error || 'Failed to update owner fees.');
    } finally {
      setSavingOwnerId(null);
    }
  };

  const resetOwnerFees = async (ownerId) => {
    setOwnerFeeMessage('');
    setOwnerFeeError('');
    setSavingOwnerId(ownerId);
    try {
      const res = await client.put(`/admin/owners/${ownerId}/fees`, { shortTermFee: null, longTermFee: null });
      setOwnerFeeMessage(`Reset platform fees to global defaults for ${res.data.owner.fullName}.`);
      await loadOwners();
    } catch (err) {
      setOwnerFeeError(err.response?.data?.error || 'Failed to reset owner fees.');
    } finally {
      setSavingOwnerId(null);
    }
  };

  useEffect(() => {
    loadSystemSettings();
    loadOwners();
  }, []);

  const selectedOwner = useMemo(() => {
    return ownersList.find(o => String(o.id) === String(selectedOwnerId)) || null;
  }, [ownersList, selectedOwnerId]);

  if (user?.role !== 'ADMIN') {
    return (
      <section>
        <h2>Dynamic Owner Platform Fees</h2>
        <ManageNav />
        <div className="card" style={{ maxWidth: '650px', margin: '0 auto', textAlign: 'center', color: '#b91c1c' }}>
          Access Restricted: Only Administrators can configure per-owner platform fees.
        </div>
      </section>
    );
  }

  return (
    <section>
      <h2>Dynamic Owner Platform Fees</h2>
      <p className="muted">Role: {user?.role || 'N/A'}</p>
      <ManageNav />

      <div className="card" style={{ marginBottom: 24, maxWidth: '700px', margin: '0 auto' }}>
        <h3 style={{ fontSize: '1.3rem', fontWeight: '700', color: '#1e293b', marginBottom: '8px' }}>
          Per-Owner Dynamic Platform Fees
        </h3>
        <p style={{ color: '#64748b', fontSize: '0.88rem', marginBottom: '20px' }}>
          Select an owner from the dropdown list below to view or set custom short-term and long-term platform fees.
        </p>

        {ownerFeeMessage && (
          <div style={{ background: '#dcfce7', color: '#15803d', padding: '12px', borderRadius: '8px', marginBottom: '16px', fontWeight: '600' }}>
            {ownerFeeMessage}
          </div>
        )}
        {ownerFeeError && (
          <div style={{ background: '#fee2e2', color: '#b91c1c', padding: '12px', borderRadius: '8px', marginBottom: '16px', fontWeight: '600' }}>
            {ownerFeeError}
          </div>
        )}

        {ownersList.length === 0 ? (
          <div style={{ padding: '24px', textAlign: 'center', color: '#64748b', background: '#f8fafc', borderRadius: '8px' }}>
            No property owners currently registered in the system.
          </div>
        ) : (
          <div>
            {/* Owner Dropdown Selector */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#334155', fontSize: '0.9rem' }}>
                Select Property Owner
              </label>
              <select
                value={selectedOwnerId}
                onChange={(e) => {
                  setSelectedOwnerId(e.target.value);
                  setOwnerFeeMessage('');
                  setOwnerFeeError('');
                }}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  fontSize: '0.95rem',
                  fontWeight: '500',
                  background: '#ffffff',
                  color: '#0f172a',
                  cursor: 'pointer'
                }}
              >
                {ownersList.map(o => (
                  <option key={o.id} value={o.id}>
                    {o.fullName} ({o.email}) — Short: €{o.effectiveShortTermFee}{o.shortTermFee !== null ? ' (Custom)' : ''}, Long: €{o.effectiveLongTermFee}{o.longTermFee !== null ? ' (Custom)' : ''}
                  </option>
                ))}
              </select>
            </div>

            {/* Selected Owner Fee Configuration Form */}
            {selectedOwner && (() => {
              const form = ownerFeesForm[selectedOwner.id] || { shortTermFee: '', longTermFee: '' };
              const isSaving = savingOwnerId === selectedOwner.id;
              const hasCustomShort = selectedOwner.shortTermFee !== null;
              const hasCustomLong = selectedOwner.longTermFee !== null;

              return (
                <div
                  style={{
                    padding: '20px',
                    border: '1px solid #e2e8f0',
                    borderRadius: '12px',
                    background: '#f8fafc',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px', marginBottom: '16px' }}>
                    <div>
                      <h4 style={{ margin: '0 0 4px', fontSize: '1.1rem', color: '#0f172a', fontWeight: '700' }}>
                        {selectedOwner.fullName}
                      </h4>
                      <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748b' }}>
                        Email: <strong>{selectedOwner.email}</strong> {selectedOwner.mobileNumber ? `| Mobile: ${selectedOwner.mobileNumber}` : ''}
                      </p>
                    </div>

                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      <span style={{ fontSize: '0.78rem', padding: '4px 10px', borderRadius: '12px', fontWeight: '600', background: hasCustomShort ? '#e0e7ff' : '#ffffff', border: '1px solid #c7d2fe', color: hasCustomShort ? '#4338ca' : '#475569' }}>
                        Short-Term: €{selectedOwner.effectiveShortTermFee} {hasCustomShort ? '(Custom)' : '(Default)'}
                      </span>
                      <span style={{ fontSize: '0.78rem', padding: '4px 10px', borderRadius: '12px', fontWeight: '600', background: hasCustomLong ? '#e0e7ff' : '#ffffff', border: '1px solid #c7d2fe', color: hasCustomLong ? '#4338ca' : '#475569' }}>
                        Long-Term: €{selectedOwner.effectiveLongTermFee} {hasCustomLong ? '(Custom)' : '(Default)'}
                      </span>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>
                        Short-Term Platform Fee (€)
                      </label>
                      <input
                        type="number"
                        step="any"
                        placeholder={`System Default (€${systemSettings.shortTermFee || 10})`}
                        value={form.shortTermFee}
                        onChange={(e) => handleOwnerFeeInputChange(selectedOwner.id, 'shortTermFee', e.target.value)}
                        style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box', fontSize: '0.9rem' }}
                      />
                      <span style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '4px', display: 'block' }}>
                        Leave blank to inherit global default (€{systemSettings.shortTermFee || 10}).
                      </span>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>
                        Long-Term Platform Fee (€)
                      </label>
                      <input
                        type="number"
                        step="any"
                        placeholder={`System Default (€${systemSettings.longTermFee || 50})`}
                        value={form.longTermFee}
                        onChange={(e) => handleOwnerFeeInputChange(selectedOwner.id, 'longTermFee', e.target.value)}
                        style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box', fontSize: '0.9rem' }}
                      />
                      <span style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '4px', display: 'block' }}>
                        Leave blank to inherit global default (€{systemSettings.longTermFee || 50}).
                      </span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                    {(hasCustomShort || hasCustomLong || form.shortTermFee !== '' || form.longTermFee !== '') && (
                      <button
                        type="button"
                        onClick={() => resetOwnerFees(selectedOwner.id)}
                        disabled={isSaving}
                        style={{
                          padding: '10px 16px',
                          background: '#ffffff',
                          color: '#475569',
                          border: '1px solid #cbd5e1',
                          borderRadius: '8px',
                          fontSize: '0.85rem',
                          fontWeight: '600',
                          cursor: 'pointer'
                        }}
                      >
                        Reset to Global Default
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => saveOwnerFees(selectedOwner.id)}
                      disabled={isSaving}
                      style={{
                        padding: '10px 20px',
                        background: '#0f172a',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '0.85rem',
                        fontWeight: '600',
                        cursor: 'pointer'
                      }}
                    >
                      {isSaving ? 'Saving...' : 'Save Owner Fees'}
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>
        )}
      </div>
    </section>
  );
}
