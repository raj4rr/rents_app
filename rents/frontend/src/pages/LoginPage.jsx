import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import client from '../api/client';

const roleConfig = {
  USER: {
    title: 'Resident Login',
    subtitle: 'Access bookings, chores, expenses, and your shared living hub.',
    hint: 'Demo: tenant@rentstack.dev / Pass@123'
  },
  ADMIN: {
    title: 'Admin Login',
    subtitle: 'Manage inventory, occupancy, legal docs, and operations in one place.',
    hint: 'Demo: admin@rentstack.dev / Pass@123'
  }
};

export default function LoginPage() {
  const [portal, setPortal] = useState('USER');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

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
        <p className="eyebrow">RentStack OS</p>
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

          <button className="login-btn" type="submit" disabled={loading}>
            {loading ? 'Signing in...' : 'Login'}
          </button>
        </form>

        {error && <p className="error-text">{error}</p>}
        <p className="demo-hint">{current.hint}</p>
        <p className="demo-hint">New user? <Link to="/register">Create account</Link>.</p>
      </div>
    </section>
  );
}
