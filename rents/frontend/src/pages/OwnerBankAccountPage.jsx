import { useEffect, useMemo, useState } from 'react';
import client from '../api/client';
import ManageNav from '../components/ManageNav';

export default function OwnerBankAccountPage() {
  const user = useMemo(() => {
    try { return JSON.parse(localStorage.getItem('auth_user') || '{}'); } catch { return {}; }
  }, []);

  const [bankAccount, setBankAccount] = useState({ accountHolder: '', iban: '', bic: '' });
  const [canEditBank, setCanEditBank] = useState(true);
  const [bankMessage, setBankMessage] = useState('');
  const [bankError, setBankError] = useState('');

  const [systemSettings, setSystemSettings] = useState({ shortTermFee: '10', longTermFee: '50' });
  const [settingsMessage, setSettingsMessage] = useState('');
  const [settingsError, setSettingsError] = useState('');

  const loadOwnerBankAccount = async () => {
    try {
      const res = await client.get('/owner/bank-account');
      if (res.data.account) {
        setBankAccount(res.data.account);
      }
      setCanEditBank(res.data.canEdit);
    } catch (_err) {}
  };

  const saveOwnerBankAccount = async (e) => {
    e.preventDefault();
    setBankMessage('');
    setBankError('');
    try {
      const res = await client.put('/owner/bank-account', bankAccount);
      if (res.data.account) setBankAccount(res.data.account);
      setCanEditBank(res.data.canEdit);
      setBankMessage('Owner bank account updated successfully.');
    } catch (err) {
      setBankError(err.response?.data?.error || 'Failed to update bank account.');
    }
  };

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
      const res = await client.put('/admin/settings', systemSettings);
      setSystemSettings(res.data.settings);
      setSettingsMessage('System platform fee settings updated successfully.');
    } catch (err) {
      setSettingsError(err.response?.data?.error || 'Failed to update settings.');
    }
  };

  useEffect(() => {
    loadOwnerBankAccount();
    loadSystemSettings();
  }, []);

  return (
    <section>
      <h2>Owner Payout & Settings</h2>
      <p className="muted">Role: {user?.role || 'N/A'}</p>
      <ManageNav />

      <div className="card" style={{ marginBottom: 24, maxWidth: '650px', margin: '0 auto' }}>
        <h3 style={{ fontSize: '1.3rem', fontWeight: '700', color: '#1e293b', marginBottom: '8px' }}>
          Owner Payout Bank Account
        </h3>
        <p style={{ color: '#64748b', fontSize: '0.88rem', marginBottom: '16px' }}>
          Provide your official bank account details to receive payouts for rent and security deposit transactions.
        </p>

        {bankMessage && <div style={{ background: '#dcfce7', color: '#15803d', padding: '12px', borderRadius: '8px', marginBottom: '16px', fontWeight: '600' }}>{bankMessage}</div>}
        {bankError && <div style={{ background: '#fee2e2', color: '#b91c1c', padding: '12px', borderRadius: '8px', marginBottom: '16px', fontWeight: '600' }}>{bankError}</div>}

        {!canEditBank && (
          <div style={{ background: '#fffbeb', border: '1px solid #fef3c7', color: '#b45309', padding: '12px', borderRadius: '8px', marginBottom: '16px', fontSize: '0.88rem' }}>
            🔒 <strong>Bank account details locked:</strong> Landlord bank account details can only be edited 1 time for security reasons. Contact admin to request additional edits.
          </div>
        )}

        <form onSubmit={saveOwnerBankAccount}>
          <div style={{ marginBottom: '14px' }}>
            <label style={{ display: 'block', fontWeight: '600', marginBottom: '6px', color: '#475569', fontSize: '0.88rem' }}>Account Holder Name</label>
            <input
              type="text"
              value={bankAccount.accountHolder || ''}
              onChange={(e) => setBankAccount({ ...bankAccount, accountHolder: e.target.value })}
              disabled={!canEditBank}
              required
              style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
            />
          </div>
          <div style={{ marginBottom: '14px' }}>
            <label style={{ display: 'block', fontWeight: '600', marginBottom: '6px', color: '#475569', fontSize: '0.88rem' }}>IBAN</label>
            <input
              type="text"
              value={bankAccount.iban || ''}
              onChange={(e) => setBankAccount({ ...bankAccount, iban: e.target.value })}
              disabled={!canEditBank}
              required
              style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
            />
          </div>
          <div style={{ marginBottom: '18px' }}>
            <label style={{ display: 'block', fontWeight: '600', marginBottom: '6px', color: '#475569', fontSize: '0.88rem' }}>BIC / SWIFT</label>
            <input
              type="text"
              value={bankAccount.bic || ''}
              onChange={(e) => setBankAccount({ ...bankAccount, bic: e.target.value })}
              disabled={!canEditBank}
              required
              style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
            />
          </div>
          {canEditBank && (
            <button type="submit" style={{ width: '100%', padding: '12px', background: '#0f172a', color: '#ffffff', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
              Save Owner Payout Account
            </button>
          )}
        </form>
      </div>

      {user?.role === 'ADMIN' && (
        <div className="card" style={{ marginBottom: 24, maxWidth: '650px', margin: '24px auto 0' }}>
          <h3 style={{ fontSize: '1.3rem', fontWeight: '700', color: '#1e293b', marginBottom: '8px' }}>
            Platform Fee & System Settings
          </h3>
          <p style={{ color: '#64748b', fontSize: '0.88rem', marginBottom: '16px' }}>
            Configure global service fees charged to listing rents for Short-Term and Long-Term bookings.
          </p>

          {settingsMessage && <div style={{ background: '#dcfce7', color: '#15803d', padding: '12px', borderRadius: '8px', marginBottom: '16px', fontWeight: '600' }}>{settingsMessage}</div>}
          {settingsError && <div style={{ background: '#fee2e2', color: '#b91c1c', padding: '12px', borderRadius: '8px', marginBottom: '16px', fontWeight: '600' }}>{settingsError}</div>}

          <form onSubmit={saveSystemSettings}>
            <div style={{ marginBottom: '14px' }}>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '6px', color: '#475569', fontSize: '0.88rem' }}>
                Short-Term Stay Platform Fee (€)
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
                Fee added per month for short-term stays.
              </span>
            </div>
            <div style={{ marginBottom: '18px' }}>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '6px', color: '#475569', fontSize: '0.88rem' }}>
                Long-Term Stay Platform Fee (€)
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
                Fee added per month for long-term stays.
              </span>
            </div>
            <button type="submit" style={{ width: '100%', padding: '12px', background: '#0f172a', color: '#ffffff', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
              Save Platform Fee Settings
            </button>
          </form>
        </div>
      )}
    </section>
  );
}
