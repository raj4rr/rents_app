import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import client from '../api/client';

const roleConfig = {
  USER: {
    title: 'Resident Login',
    subtitle: 'Access bookings, chores, expenses, and your shared living hub.'
  },
  ADMIN: {
    title: 'Admin Login',
    subtitle: 'Manage inventory, occupancy, legal docs, and operations in one place.'
  }
};

export default function LoginPage() {
  const [portal, setPortal] = useState('USER');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const [showResetModal, setShowResetModal] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetDob, setResetDob] = useState('');
  const [resetFullName, setResetFullName] = useState('');
  const [resetNationality, setResetNationality] = useState('');
  const [resetNewPassword, setResetNewPassword] = useState('');
  const [resetConfirmPassword, setResetConfirmPassword] = useState('');
  const [resetMessage, setResetMessage] = useState('');
  const [resetError, setResetError] = useState('');

  const handleResetSubmit = async (e) => {
    e.preventDefault();
    setResetMessage('');
    setResetError('');

    const fields = [resetEmail, resetDob, resetFullName, resetNationality].filter(f => f.trim() !== '');
    if (fields.length < 2) {
      setResetError('Please fill in at least two verification fields (Email, DOB, Name, or Nationality)');
      return;
    }

    if (resetNewPassword !== resetConfirmPassword) {
      setResetError('New passwords do not match');
      return;
    }

    try {
      await client.post('/auth/reset-password', {
        email: resetEmail,
        dob: resetDob,
        fullName: resetFullName,
        nationality: resetNationality,
        newPassword: resetNewPassword
      });
      setResetMessage('Password reset successfully! You can now log in.');
      setResetEmail('');
      setResetDob('');
      setResetFullName('');
      setResetNationality('');
      setResetNewPassword('');
      setResetConfirmPassword('');
    } catch (err) {
      setResetError(err.response?.data?.error || 'Verification failed. Password reset rejected.');
    }
  };

  const current = roleConfig[portal];

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await client.post('/auth/login', { email, password });
      const userRole = res.data.user?.role;

      if (portal === 'ADMIN' && userRole !== 'ADMIN') {
        setError('This portal only allows ADMIN accounts.');
        setLoading(false);
        return;
      }

      localStorage.setItem('auth_token', res.data.token);
      localStorage.setItem('auth_user', JSON.stringify(res.data.user));
      navigate('/listings');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed. Please check credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="login-page">
      <div className="login-panel hero">
        <p className="eyebrow">RentStack Inventory OS</p>
        <h2>Run Bed-Level To Apartment-Level Inventory Without Chaos</h2>
        <p>
          Unified booking control for private rooms, shared beds, contracts, KYC, maintenance,
          and billing workflows.
        </p>
        <ul>
          <li>Property → Apartment → Room → Bed hierarchy</li>
          <li>Admin and resident workflows in one system</li>
          <li>Live occupancy and booking conflict checks</li>
        </ul>
      </div>

      <div className="login-panel form-wrap">
        <div className="portal-switch">
          <button
            className={portal === 'USER' ? 'active' : ''}
            type="button"
            onClick={() => setPortal('USER')}
          >
            User
          </button>
          <button
            className={portal === 'ADMIN' ? 'active' : ''}
            type="button"
            onClick={() => setPortal('ADMIN')}
          >
            Admin
          </button>
        </div>

        <h3>{current.title}</h3>
        <p className="muted">{current.subtitle}</p>

        <form onSubmit={submit} className="auth-form">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="********"
          />

          <div style={{ textAlign: 'right', marginBottom: '14px', marginTop: '6px' }}>
            <button
              type="button"
              onClick={() => setShowResetModal(true)}
              style={{ background: 'none', border: 'none', color: '#1f66ea', fontSize: '0.82rem', cursor: 'pointer', textDecoration: 'underline', padding: 0 }}
            >
              Forgot password?
            </button>
          </div>

          <button className="login-btn" type="submit" disabled={loading}>
            {loading ? 'Signing in...' : 'Login'}
          </button>
        </form>

        {error && <p className="error-text">{error}</p>}
        <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
          <p className="demo-hint" style={{ margin: 0 }}>
            New user? <Link to="/register">Create account</Link>.
          </p>
          <button
            type="button"
            onClick={() => navigate('/')}
            style={{
              marginTop: '8px',
              width: '100%',
              padding: '10px 14px',
              background: '#f1f5f9',
              color: '#334155',
              border: '1px solid #cbd5e1',
              borderRadius: '8px',
              fontWeight: 'bold',
              cursor: 'pointer',
              fontSize: '0.9rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px'
            }}
          >
            🏠 Go to Home
          </button>
        </div>
      </div>

      {showResetModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(15, 23, 42, 0.75)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999
          }}
        >
          <div
            style={{
              background: '#ffffff',
              padding: '28px',
              borderRadius: '16px',
              maxWidth: '480px',
              width: '90%',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
              maxHeight: '90vh',
              overflowY: 'auto',
              cursor: 'default'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: '12px', marginBottom: '16px' }}>
              <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: '800', color: '#1e293b' }}>Reset Password</h3>
              <button
                type="button"
                onClick={() => {
                  setShowResetModal(false);
                  setResetMessage('');
                  setResetError('');
                }}
                style={{ background: '#f1f5f9', border: 'none', borderRadius: '50%', width: '32px', height: '32px', cursor: 'pointer', fontWeight: 'bold', color: '#475569', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                ✕
              </button>
            </div>



            {resetMessage && <div style={{ background: '#dcfce7', color: '#15803d', padding: '10px 14px', borderRadius: '8px', marginBottom: '16px', fontSize: '0.85rem', fontWeight: '600' }}>{resetMessage}</div>}
            {resetError && <div style={{ background: '#fee2e2', color: '#b91c1c', padding: '10px 14px', borderRadius: '8px', marginBottom: '16px', fontSize: '0.85rem', fontWeight: '600' }}>{resetError}</div>}

            <form onSubmit={handleResetSubmit}>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', fontWeight: '700', marginBottom: '4px', color: '#475569', fontSize: '0.82rem' }}>Email Address</label>
                <input
                  type="email"
                  placeholder="e.g. resident@example.com"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', fontWeight: '700', marginBottom: '4px', color: '#475569', fontSize: '0.82rem' }}>Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. John Doe"
                  value={resetFullName}
                  onChange={(e) => setResetFullName(e.target.value)}
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', fontWeight: '700', marginBottom: '4px', color: '#475569', fontSize: '0.82rem' }}>Date of Birth</label>
                <input
                  type="date"
                  value={resetDob}
                  onChange={(e) => setResetDob(e.target.value)}
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontWeight: '700', marginBottom: '4px', color: '#475569', fontSize: '0.82rem' }}>Nationality</label>
                <input
                  type="text"
                  placeholder="e.g. German"
                  value={resetNationality}
                  onChange={(e) => setResetNationality(e.target.value)}
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '14px', marginBottom: '12px' }}>
                <label style={{ display: 'block', fontWeight: '700', marginBottom: '4px', color: '#475569', fontSize: '0.82rem' }}>New Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  required
                  value={resetNewPassword}
                  onChange={(e) => setResetNewPassword(e.target.value)}
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem', boxSizing: 'border-box', marginBottom: '12px' }}
                />
                
                <label style={{ display: 'block', fontWeight: '700', marginBottom: '4px', color: '#475569', fontSize: '0.82rem' }}>Confirm New Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  required
                  value={resetConfirmPassword}
                  onChange={(e) => setResetConfirmPassword(e.target.value)}
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem', boxSizing: 'border-box' }}
                />
              </div>

              <button
                type="submit"
                style={{
                  width: '100%',
                  padding: '12px',
                  background: 'var(--accent)',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  marginTop: '6px'
                }}
              >
                Reset Password
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
