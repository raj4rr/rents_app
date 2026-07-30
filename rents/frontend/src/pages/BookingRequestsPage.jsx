import { useEffect, useMemo, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import client from '../api/client';
import ManageNav from '../components/ManageNav';

const fileBaseUrl = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api').replace('/api', '');

export default function BookingRequestsPage() {
  const user = useMemo(() => {
    try { return JSON.parse(localStorage.getItem('auth_user') || '{}'); } catch { return {}; }
  }, []);
  const canManageEntries = ['OWNER', 'ADMIN'].includes(user?.role);
  const location = useLocation();
  const isMyBookings = location.pathname.includes('/my-bookings');
  const isBookingRequests = location.pathname.includes('/booking-requests');

  const [myBookings, setMyBookings] = useState([]);
  const [ownerBookings, setOwnerBookings] = useState([]);
  const [bookingEdits, setBookingEdits] = useState({});
  const [bookingPaymentInputs, setBookingPaymentInputs] = useState({});
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const clearNotice = () => { setMessage(''); setError(''); };

  const daysUntil = (dateStr) => {
    const now = new Date();
    const date = new Date(dateStr);
    return (date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
  };

  const loadMyBookings = async () => {
    try {
      const { data } = await client.get('/me/bookings');
      setMyBookings(data);
      const draft = {};
      const paymentDraft = {};
      data.forEach((b) => {
        draft[b.id] = { checkIn: b.checkIn, checkOut: b.checkOut };
        paymentDraft[b.id] = '';
      });
      setBookingEdits(draft);
      setBookingPaymentInputs(paymentDraft);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load bookings');
    }
  };

  const loadOwnerBookings = async () => {
    if (!canManageEntries) return;
    try {
      const { data } = await client.get('/owner/bookings');
      setOwnerBookings(data);
    } catch (_err) {}
  };

  useEffect(() => {
    loadMyBookings();
    loadOwnerBookings();
  }, []);





  return (
    <section>
      <h2>Booking Requests & Management</h2>
      <p className="muted">Role: {user?.role || 'N/A'}</p>
      <ManageNav />

      <div style={{ marginBottom: 20 }}>
        <label style={{ marginRight: 10, fontWeight: 'bold' }}>Filter by Status:</label>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} style={{ padding: '6px', borderRadius: '4px', border: '1px solid #ccc' }}>
          <option value="ALL">All</option>
          <option value="PENDING">PENDING</option>
          <option value="OWNER_APPROVED">OWNER_APPROVED</option>
          <option value="PAYMENT_RECEIVED">PAYMENT_RECEIVED</option>
          <option value="CONFIRMED">CONFIRMED</option>
          <option value="CHECKED_IN">CHECKED_IN</option>
          <option value="COMPLETED">COMPLETED</option>
          <option value="CANCELLED">CANCELLED</option>
        </select>
      </div>

      {message && <p className="success-text">{message}</p>}
      {error && <p className="error-text">{error}</p>}

      {canManageEntries && isBookingRequests && (
        <div className="card" style={{ marginBottom: 20 }}>
          <h3>Booking Requests For My Listings</h3>
          
          <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '12px', padding: '14px', marginBottom: '16px', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
            <span style={{ fontSize: '1.2rem', marginTop: '-2px' }}>ℹ️</span>
            <div>
              <p style={{ margin: 0, fontSize: '0.88rem', fontWeight: 'bold', color: '#1e3a8a', lineHeight: '1.4' }}>
                Important Note for Owners
              </p>
              <p style={{ margin: '4px 0 0', fontSize: '0.82rem', color: '#1e40af', lineHeight: '1.4' }}>
                Owners need to pay the platform fees to the admin bank account within 48 hours after a booking is confirmed.
              </p>
            </div>
          </div>

          {ownerBookings.filter(b => statusFilter === 'ALL' || b.status === statusFilter).length === 0 && <p>No booking requests match this status.</p>}
          {ownerBookings.filter(b => statusFilter === 'ALL' || b.status === statusFilter).map((b) => (
            <div key={b.id} className="card" style={{ marginBottom: 10 }}>
              <p><strong>{b.Listing?.title || `Listing #${b.listingId}`}</strong></p>
              <p>Tenant: {b.User?.fullName || 'N/A'} ({b.User?.mobileNumber || 'No mobile'})</p>
              <p>Dates: {b.checkIn} to {b.checkOut}</p>
              <p>Status: {b.status}</p>
              
              <Link to={`/booking-payment/${b.id}`} style={{ marginTop: 14, display: 'inline-block', padding: '8px 16px', background: '#3b82f6', color: '#fff', borderRadius: '6px', textDecoration: 'none', fontWeight: 'bold' }}>
                View & Manage Details
              </Link>
            </div>
          ))}
        </div>
      )}

      {isMyBookings && (
        <div className="card">
          <h3>My Bookings</h3>
        {myBookings.filter(b => statusFilter === 'ALL' || b.status === statusFilter).length === 0 && <p>No bookings match this status.</p>}
        {myBookings.filter(b => statusFilter === 'ALL' || b.status === statusFilter).map((b) => {
          return (
            <div key={b.id} className="card" style={{ marginBottom: 10 }}>
              <p><strong>{b.Listing?.title || `Listing #${b.listingId}`}</strong></p>
              <p>Dates: {b.checkIn} to {b.checkOut}</p>
              <p>Status: {b.status}</p>

              <Link to={`/booking-payment/${b.id}`} style={{ marginTop: 14, display: 'inline-block', padding: '8px 16px', background: '#3b82f6', color: '#fff', borderRadius: '6px', textDecoration: 'none', fontWeight: 'bold' }}>
                View & Manage Details
              </Link>
            </div>
          );
        })}
        </div>
      )}
    </section>
  );
}
