import { useEffect, useMemo, useState } from 'react';
import client from '../api/client';
import ManageNav from '../components/ManageNav';

const fileBaseUrl = 'http://localhost:5000';

export default function BookingRequestsPage() {
  const user = useMemo(() => {
    try { return JSON.parse(localStorage.getItem('auth_user') || '{}'); } catch { return {}; }
  }, []);
  const canManageEntries = ['OWNER', 'ADMIN'].includes(user?.role);

  const [myBookings, setMyBookings] = useState([]);
  const [ownerBookings, setOwnerBookings] = useState([]);
  const [bookingEdits, setBookingEdits] = useState({});
  const [bookingPaymentInputs, setBookingPaymentInputs] = useState({});
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

  const updateMyBooking = async (bookingId) => {
    clearNotice();
    try {
      const { data } = await client.patch(`/me/bookings/${bookingId}`, bookingEdits[bookingId]);
      const extra = data.additionalPaymentAmount > 0 ? ` Additional payment: ${data.additionalPaymentAmount}.` : '';
      const reapproval = data.requiresReapproval ? ' Owner re-approval required before payment.' : '';
      setMessage(`Booking dates updated.${extra}${reapproval}`);
      await loadMyBookings();
    } catch (err) { setError(err.response?.data?.error || 'Failed to update booking'); }
  };

  const confirmPaymentIdForBooking = async (bookingId) => {
    clearNotice();
    try {
      await client.patch(`/me/bookings/${bookingId}/confirm-payment`, { paymentId: bookingPaymentInputs[bookingId] });
      setMessage('Booking confirmed successfully');
      await loadMyBookings();
    } catch (err) { setError(err.response?.data?.error || 'Failed to confirm payment id'); }
  };

  const approveOwnerBooking = async (bookingId) => {
    clearNotice();
    try {
      await client.patch(`/owner/bookings/${bookingId}/approve`);
      setMessage('Booking approved');
      await loadOwnerBookings();
      await loadMyBookings();
    } catch (err) { setError(err.response?.data?.error || 'Failed to approve booking'); }
  };

  const markPaymentReceived = async (bookingId) => {
    clearNotice();
    try {
      const { data } = await client.patch(`/owner/bookings/${bookingId}/payment-received`);
      setMessage(`Payment received. Share Payment ID with tenant: ${data.paymentId}`);
      await loadOwnerBookings();
      await loadMyBookings();
    } catch (err) { setError(err.response?.data?.error || 'Failed to mark payment received'); }
  };

  const uploadWohnungsgeber = async (bookingId, e) => {
    clearNotice();
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      await client.put(`/bookings/${bookingId}/wohnungsgeber`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setMessage('Wohnungsgeberbestätigung uploaded successfully');
      await loadOwnerBookings();
      await loadMyBookings();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to upload Wohnungsgeberbestätigung');
    }
  };

  return (
    <section>
      <h2>Booking Requests & Management</h2>
      <p className="muted">Role: {user?.role || 'N/A'}</p>
      <ManageNav />

      {message && <p className="success-text">{message}</p>}
      {error && <p className="error-text">{error}</p>}

      {canManageEntries && (
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

          {ownerBookings.length === 0 && <p>No booking requests.</p>}
          {ownerBookings.map((b) => (
            <div key={b.id} className="card" style={{ marginBottom: 10 }}>
              <p><strong>{b.Listing?.title || `Listing #${b.listingId}`}</strong></p>
              <p>Tenant: {b.User?.fullName || 'N/A'} ({b.User?.mobileNumber || 'No mobile'})</p>
              {b.tenantComment && (
                <div style={{ margin: '8px 0', background: '#f8fafc', padding: '10px 14px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.85rem' }}>
                  <span style={{ fontWeight: '700', color: '#334155', display: 'block', marginBottom: '4px' }}>
                    📝 Tenant Motivation Comment
                  </span>
                  <p style={{ margin: 0, color: '#475569', fontStyle: 'italic', whiteSpace: 'pre-wrap', lineHeight: '1.4' }}>
                    "{b.tenantComment}"
                  </p>
                </div>
              )}
              {b.User?.financialDocPath ? (
                <div style={{ margin: '8px 0', background: '#eff6ff', padding: '10px 14px', borderRadius: '8px', border: '1px solid #bfdbfe', fontSize: '0.85rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: '700', color: '#1e40af' }}>
                    📂 Tenant Financial Verification Document
                  </span>
                  <a
                    href={`${fileBaseUrl}/${b.User.financialDocPath}`}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      background: '#1e293b',
                      color: '#ffffff',
                      padding: '4px 10px',
                      borderRadius: '6px',
                      fontWeight: 'bold',
                      fontSize: '0.78rem',
                      textDecoration: 'none'
                    }}
                  >
                    View Document
                  </a>
                </div>
              ) : (
                <div style={{ margin: '8px 0', background: '#fee2e2', padding: '10px 14px', borderRadius: '8px', border: '1px solid #fecaca', fontSize: '0.85rem' }}>
                  <span style={{ fontWeight: '700', color: '#991b1b' }}>
                    ✗ Financial Document Missing
                  </span>
                  <span style={{ color: '#7f1d1d', fontSize: '0.8rem', display: 'block', marginTop: '2px' }}>
                    The tenant has not uploaded any financial documents (e.g. payslips) for review yet.
                  </span>
                </div>
              )}
              <p>Dates: {b.checkIn} to {b.checkOut}</p>
              <p>Status: {b.status}</p>
              {b.Listing?.stayType === 'LONG_TERM' && ['CONFIRMED', 'CHECKED_IN', 'COMPLETED'].includes(b.status) && (
                <div style={{ margin: '14px 0', padding: '14px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
                  <span style={{ fontWeight: '700', color: '#1e293b', display: 'block', marginBottom: '6px', fontSize: '0.88rem' }}>
                    📋 Wohnungsgeberbestätigung (Landlord Confirmation)
                  </span>
                  
                  {b.wohnungsgeberPath ? (
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <span style={{ fontSize: '0.85rem', color: '#16a34a', fontWeight: '600' }}>✓ Document Stored</span>
                        <a href={`${fileBaseUrl}/${b.wohnungsgeberPath}`} target="_blank" rel="noreferrer" style={{ marginLeft: '10px', fontSize: '0.82rem', color: '#1f66ea', textDecoration: 'underline' }}>
                          View Uploaded File
                        </a>
                      </div>
                      <label style={{ background: '#f1f5f9', color: '#475569', padding: '4px 10px', borderRadius: '6px', fontSize: '0.78rem', fontWeight: 'bold', cursor: 'pointer', border: '1px solid #cbd5e1' }}>
                        Replace File
                        <input type="file" onChange={(e) => uploadWohnungsgeber(b.id, e)} style={{ display: 'none' }} />
                      </label>
                    </div>
                  ) : (
                    <div>
                      <p style={{ margin: '0 0 10px 0', fontSize: '0.8rem', color: '#64748b' }}>
                        Upload the signed Wohnungsgeberbestätigung to allow the tenant to register their address (Anmeldung).
                      </p>
                      <input type="file" onChange={(e) => uploadWohnungsgeber(b.id, e)} style={{ fontSize: '0.82rem' }} />
                    </div>
                  )}
                </div>
              )}
              {b.status === 'PAYMENT_RECEIVED' && <p><strong>Payment ID:</strong> {b.paymentId}</p>}
              {(b.status === 'PENDING' || b.status === 'OWNER_APPROVED') && (
                <div className="row">
                  {b.status === 'PENDING' && (
                    <button type="button" onClick={() => approveOwnerBooking(b.id)}>Approve Booking</button>
                  )}
                  {b.status === 'OWNER_APPROVED' && (
                    <button type="button" onClick={() => markPaymentReceived(b.id)}>Payment Received</button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="card">
        <h3>My Bookings</h3>
        {myBookings.length === 0 && <p>No bookings yet.</p>}
        {myBookings.map((b) => {
          const cannotEdit = daysUntil(b.checkIn) < 2;
          const statusAllowsDateEdit = ['PENDING', 'OWNER_APPROVED'].includes(b.status);
          const canEditDates = statusAllowsDateEdit && !cannotEdit;
          return (
            <div key={b.id} className="card" style={{ marginBottom: 10 }}>
              <p><strong>{b.Listing?.title || `Listing #${b.listingId}`}</strong></p>
              <p>Status: {b.status}</p>
              {['CONFIRMED', 'CHECKED_IN', 'COMPLETED'].includes(b.status) && b.wohnungsgeberPath && (
                <div style={{ margin: '10px 0', padding: '10px 14px', background: '#ecfdf5', borderRadius: '8px', border: '1px solid #a7f3d0' }}>
                  <span style={{ fontWeight: '700', color: '#047857', fontSize: '0.84rem', display: 'block', marginBottom: '2px' }}>
                    📋 Wohnungsgeberbestätigung (Landlord Confirmation) Available
                  </span>
                  <a href={`${fileBaseUrl}/${b.wohnungsgeberPath}`} target="_blank" rel="noreferrer" style={{ fontSize: '0.82rem', color: '#059669', fontWeight: 'bold', textDecoration: 'underline' }}>
                    Download Document
                  </a>
                </div>
              )}
              <p>Owner mobile: {b.Listing?.User?.mobileNumber || 'Not provided'}</p>
              {b.status === 'PENDING' && <p className="muted">Wait for owner/admin booking approval.</p>}
              {b.status === 'OWNER_APPROVED' && <p className="muted">Owner approved. Waiting for owner to mark payment received.</p>}
              {b.status === 'PAYMENT_RECEIVED' && (
                <>
                  <p className="muted">Owner shared a payment ID. Enter it to confirm booking.</p>
                  <div className="row">
                    <input
                      placeholder="Enter payment ID"
                      value={bookingPaymentInputs[b.id] || ''}
                      onChange={(e) => setBookingPaymentInputs((prev) => ({ ...prev, [b.id]: e.target.value }))}
                    />
                    <button type="button" onClick={() => confirmPaymentIdForBooking(b.id)}>Confirm Booking</button>
                  </div>
                </>
              )}
              {statusAllowsDateEdit ? (
                <div className="row">
                  <input
                    type="date"
                    value={bookingEdits[b.id]?.checkIn || ''}
                    onChange={(e) => setBookingEdits((prev) => ({ ...prev, [b.id]: { ...prev[b.id], checkIn: e.target.value } }))}
                  />
                  <input
                    type="date"
                    value={bookingEdits[b.id]?.checkOut || ''}
                    onChange={(e) => setBookingEdits((prev) => ({ ...prev, [b.id]: { ...prev[b.id], checkOut: e.target.value } }))}
                  />
                  <button
                    type="button"
                    onClick={() => updateMyBooking(b.id)}
                    disabled={!canEditDates}
                  >
                    Update Booking Dates
                  </button>
                </div>
              ) : (
                <>
                  <p><strong>Check-In:</strong> {b.checkIn}</p>
                  <p><strong>Check-Out:</strong> {b.checkOut}</p>
                </>
              )}
              {cannotEdit && <p className="error-text">Cannot edit within 2 days of check-in.</p>}
              {!statusAllowsDateEdit && <p className="muted">Date editing is blocked because payment has started or booking is finalized.</p>}
            </div>
          );
        })}
      </div>
    </section>
  );
}
