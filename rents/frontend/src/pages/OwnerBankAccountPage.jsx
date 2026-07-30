import { useEffect, useMemo, useState } from 'react';
import client from '../api/client';
import ManageNav from '../components/ManageNav';

export default function OwnerBankAccountPage() {
  const user = useMemo(() => {
    try { return JSON.parse(localStorage.getItem('auth_user') || '{}'); } catch { return {}; }
  }, []);

  const isAdmin = user?.role === 'ADMIN';

  const [bankAccount, setBankAccount] = useState({ accountHolder: '', iban: '', bic: '' });
  const [canEditBank, setCanEditBank] = useState(true);
  const [bankMessage, setBankMessage] = useState('');
  const [bankError, setBankError] = useState('');

  const loadBankAccount = async () => {
    try {
      const res = await client.get('/owner/bank-account');
      if (res.data.account) {
        setBankAccount(res.data.account);
      }
      setCanEditBank(res.data.canEdit);
    } catch (_err) {}
  };

  const saveBankAccount = async (e) => {
    e.preventDefault();
    setBankMessage('');
    setBankError('');
    try {
      const res = await client.put('/owner/bank-account', bankAccount);
      if (res.data.account) setBankAccount(res.data.account);
      setCanEditBank(res.data.canEdit);
      setBankMessage(
        isAdmin 
          ? 'Admin bank account details updated successfully.' 
          : 'Owner bank account updated successfully.'
      );
    } catch (err) {
      setBankError(err.response?.data?.error || 'Failed to update bank account.');
    }
  };

  useEffect(() => {
    loadBankAccount();
  }, []);

  return (
    <section>
      <h2>{isAdmin ? 'Admin Bank Account' : 'Owner Payout Bank Account'}</h2>
      <p className="muted">Role: {user?.role || 'N/A'}</p>
      <ManageNav />

      <div className="card" style={{ marginBottom: 24, maxWidth: '650px', margin: '0 auto' }}>
        <h3 style={{ fontSize: '1.3rem', fontWeight: '700', color: '#1e293b', marginBottom: '8px' }}>
          {isAdmin ? 'Platform Fee Collection Bank Account' : 'Owner Payout Bank Account'}
        </h3>
        <p style={{ color: '#64748b', fontSize: '0.88rem', marginBottom: '16px' }}>
          {isAdmin
            ? 'Provide official admin bank account details (Account Holder, IBAN, BIC) to receive platform fee payments from tenants and owners.'
            : 'Provide your official bank account details to receive payouts for rent and security deposit transactions.'}
        </p>

        {bankMessage && (
          <div style={{ background: '#dcfce7', color: '#15803d', padding: '12px', borderRadius: '8px', marginBottom: '16px', fontWeight: '600' }}>
            {bankMessage}
          </div>
        )}
        {bankError && (
          <div style={{ background: '#fee2e2', color: '#b91c1c', padding: '12px', borderRadius: '8px', marginBottom: '16px', fontWeight: '600' }}>
            {bankError}
          </div>
        )}

        {!canEditBank && (
          <div style={{ background: '#fffbeb', border: '1px solid #fef3c7', color: '#b45309', padding: '12px', borderRadius: '8px', marginBottom: '16px', fontSize: '0.88rem' }}>
            🔒 <strong>Bank account details locked:</strong> Bank account details can only be edited 1 time for security reasons. Contact support to request additional edits.
          </div>
        )}

        <form onSubmit={saveBankAccount}>
          <div style={{ marginBottom: '14px' }}>
            <label style={{ display: 'block', fontWeight: '600', marginBottom: '6px', color: '#475569', fontSize: '0.88rem' }}>
              Account Holder Name
            </label>
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
            <label style={{ display: 'block', fontWeight: '600', marginBottom: '6px', color: '#475569', fontSize: '0.88rem' }}>
              IBAN
            </label>
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
            <label style={{ display: 'block', fontWeight: '600', marginBottom: '6px', color: '#475569', fontSize: '0.88rem' }}>
              BIC / SWIFT
            </label>
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
              {isAdmin ? 'Save Admin Bank Account' : 'Save Owner Payout Account'}
            </button>
          )}
        </form>
      </div>
    </section>
  );
}
