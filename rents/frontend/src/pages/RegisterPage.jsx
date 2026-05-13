import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import client from '../api/client';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    mobileNumber: '',
    password: '',
    role: 'TENANT'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await client.post('/auth/register', form);
      const loginRes = await client.post('/auth/login', { email: form.email, password: form.password });
      localStorage.setItem('auth_token', loginRes.data.token);
      localStorage.setItem('auth_user', JSON.stringify(loginRes.data.user));
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="login-page">
      <div className="login-panel hero">
        <p className="eyebrow">RentStack OS</p>
        <h2>Create Account</h2>
        <p>Register as Owner or Tenant and start booking or managing entries.</p>
      </div>

      <div className="login-panel form-wrap">
        <h3>New User Registration</h3>
        <form onSubmit={submit} className="auth-form">
          <label htmlFor="fullName">Full Name</label>
          <input id="fullName" name="fullName" value={form.fullName} onChange={onChange} required />

          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" value={form.email} onChange={onChange} required />

          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" value={form.password} onChange={onChange} required minLength={6} />

          <label htmlFor="mobileNumber">Mobile Number</label>
          <input id="mobileNumber" name="mobileNumber" value={form.mobileNumber} onChange={onChange} required />

          <label htmlFor="role">Role</label>
          <select id="role" name="role" value={form.role} onChange={onChange}>
            <option value="TENANT">TENANT</option>
            <option value="OWNER">OWNER</option>
          </select>

          <button className="login-btn" type="submit" disabled={loading}>{loading ? 'Creating...' : 'Register'}</button>
        </form>

        {error && <p className="error-text">{error}</p>}
        <p className="demo-hint">Already registered? <Link to="/login">Login here</Link>.</p>
      </div>
    </section>
  );
}
