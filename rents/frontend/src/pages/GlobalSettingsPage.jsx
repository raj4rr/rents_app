import { useEffect, useMemo, useState } from 'react';
import client from '../api/client';
import ManageNav from '../components/ManageNav';

export default function GlobalSettingsPage() {
  const user = useMemo(() => {
    try { return JSON.parse(localStorage.getItem('auth_user') || '{}'); } catch { return {}; }
  }, []);

  const [systemSettings, setSystemSettings] = useState({ shortTermFee: '10', longTermFee: '50' });
  const [settingsMessage, setSettingsMessage] = useState('');
  const [settingsError, setSettingsError] = useState('');

  const loadSystemSettings = async () => {
    if (user?.role !== 'ADMIN') return;
    try {
      const res = await client.get('/settings');
      setSystemSettings(res.data);
    } catch (_err) {}
  };

  const saveSystemSettings = async (e) => {
    e.preventDefault();
    setSettingsMessage('');
    setSettingsError('');
    try {
      const payload = [
        { key: 'SHORT_TERM_FEE', value: systemSettings.shortTermFee },
        { key: 'LONG_TERM_FEE', value: systemSettings.longTermFee }
      ];
      const res = await client.put('/admin/settings', { settings: payload });
      if (res.data.settings) setSystemSettings(res.data.settings);
      setSettingsMessage('Global default platform fee settings updated successfully.');
    } catch (err) {
      setSettingsError(err.response?.data?.error || 'Failed to update global settings.');
    }
  };

  useEffect(() => {
    loadSystemSettings();
  }, []);

  if (user?.role !== 'ADMIN') {
    return (
      <section>
        <h2>Global Default Platform Fees & System Settings</h2>
        <ManageNav />
        <div className="card" style={{ maxWidth: '650px', margin: '0 auto', textAlign: 'center', color: '#b91c1c' }}>
          Access Restricted: Only Administrators can configure global system platform fees.
        </div>
      </section>
    );
  }

  return (
    <section>
      <h2>Global Default Platform Fees & System Settings</h2>
      <p className="muted">Role: {user?.role || 'N/A'}</p>
      <ManageNav />

      <div className="card" style={{ marginBottom: 24, maxWidth: '650px', margin: '0 auto' }}>
        <h3 style={{ fontSize: '1.3rem', fontWeight: '700', color: '#1e293b', marginBottom: '8px' }}>
          System Default Platform Fees
        </h3>
        <p style={{ color: '#64748b', fontSize: '0.88rem', marginBottom: '16px' }}>
          Configure standard baseline service fees charged on Short-Term and Long-Term bookings across the entire system.
          (These defaults apply to any owner who does not have custom fees configured).
        </p>

        {settingsMessage && (
          <div style={{ background: '#dcfce7', color: '#15803d', padding: '12px', borderRadius: '8px', marginBottom: '16px', fontWeight: '600' }}>
            {settingsMessage}
          </div>
        )}
        {settingsError && (
          <div style={{ background: '#fee2e2', color: '#b91c1c', padding: '12px', borderRadius: '8px', marginBottom: '16px', fontWeight: '600' }}>
            {settingsError}
          </div>
        )}

        <form onSubmit={saveSystemSettings}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontWeight: '600', marginBottom: '6px', color: '#475569', fontSize: '0.88rem' }}>
              Default Short-Term Stay Platform Fee (€)
            </label>
            <input
              type="number"
              step="any"
              value={systemSettings.shortTermFee || ''}
              onChange={(e) => setSystemSettings({ ...systemSettings, shortTermFee: e.target.value })}
              required
              style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
            />
            <span style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '4px', display: 'block' }}>
              Baseline fee added per month for short-term stays.
            </span>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontWeight: '600', marginBottom: '6px', color: '#475569', fontSize: '0.88rem' }}>
              Default Long-Term Stay Platform Fee (€)
            </label>
            <input
              type="number"
              step="any"
              value={systemSettings.longTermFee || ''}
              onChange={(e) => setSystemSettings({ ...systemSettings, longTermFee: e.target.value })}
              required
              style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
            />
            <span style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '4px', display: 'block' }}>
              Baseline fee added per month for long-term stays.
            </span>
          </div>

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '12px',
              background: '#0f172a',
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            Save Global Platform Fee Settings
          </button>
        </form>
      </div>
    </section>
  );
}
