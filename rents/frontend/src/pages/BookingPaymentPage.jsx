import { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import client from '../api/client';
import SEO from '../components/SEO';

const isProfileComplete = (u) => {
  if (!u) return false;
  if (u.profileStatus !== 'APPROVED') return false;
  const required = [
    'fullName', 'fatherName', 'dob', 'nationality', 'residenceCountry',
    'streetAddress', 'zipCode', 'city', 'country',
    'photoWithPassport', 'passportPath', 'residenceProofPath', 'signaturePath'
  ];
  return required.every(field => u[field] && String(u[field]).trim() !== '');
};

export default function BookingPaymentPage() {
  const { bookingId } = useParams();
  const navigate = useNavigate();

  const [bookingInfo, setBookingInfo] = useState(null);
  const [platformAccount, setPlatformAccount] = useState(null);
  const [ownerAccount, setOwnerAccount] = useState(null);
  const [platformPaymentRef, setPlatformPaymentRef] = useState('');
  const [rentPaymentRef, setRentPaymentRef] = useState('');
  const [contractInfo, setContractInfo] = useState(null);
  const [message, setMessage] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [deductReason, setDeductReason] = useState('');
  const [deductAmt, setDeductAmt] = useState('');
  const [evidenceFile, setEvidenceFile] = useState(null);
  const [uploadingEvidence, setUploadingEvidence] = useState(false);

  const authUser = useMemo(() => {
    try {
      const str = localStorage.getItem('auth_user');
      return str ? JSON.parse(str) : null;
    } catch (_) {
      return null;
    }
  }, []);

  const isTenantUser = authUser?.role === 'TENANT';
  const isOwnerOrAdmin = authUser && ['OWNER', 'ADMIN'].includes(authUser.role);
  const isTenantOk = useMemo(() => isProfileComplete(bookingInfo?.User), [bookingInfo]);
  const isOwnerOk = useMemo(() => isProfileComplete(bookingInfo?.Listing?.User), [bookingInfo]);
  const isProfileWarning = !isTenantOk || !isOwnerOk;

  const platformPayment = useMemo(() => bookingInfo?.Payments?.find(p => p.paymentType === 'PLATFORM_FEE'), [bookingInfo]);
  const rentPayment = useMemo(() => bookingInfo?.Payments?.find(p => p.paymentType === 'RENT'), [bookingInfo]);
  const allApproved = platformPayment?.status === 'COMPLETED' && rentPayment?.status === 'COMPLETED';

  const quote = useMemo(() => {
    if (!bookingInfo || !bookingInfo.Listing) return null;
    const start = new Date(bookingInfo.checkIn);
    const end = new Date(bookingInfo.checkOut);
    if (isNaN(start.getTime()) || isNaN(end.getTime()) || end <= start) return null;
    const days = Math.max(1, Math.ceil((end - start) / (1000 * 60 * 60 * 24)));
    const months = Math.max(1, Math.ceil(days / 30));

    const rentUnits = bookingInfo.Listing.stayType === 'LONG_TERM' ? months : days;
    const rentAmount = Number(bookingInfo.Listing.baseRent) * rentUnits;
    const platformFee = bookingInfo.Listing.stayType === 'LONG_TERM' ? 100 : Math.max(10, 3 * days);
    const depositAmount = Number(bookingInfo.Listing.depositAmount || 0);
    const cleaningCharge = Number(bookingInfo.Listing.cleaningCharge || 0);
    const totalAmount = Number((rentAmount + platformFee + depositAmount + cleaningCharge).toFixed(2));

    return {
      days,
      months,
      rentAmount,
      platformFee,
      depositAmount,
      cleaningCharge,
      totalAmount,
      ownerTotal: rentAmount + depositAmount + cleaningCharge
    };
  }, [bookingInfo]);

  const totalDeductedSum = useMemo(() => {
    if (!bookingInfo || !bookingInfo.DepositDeductions) return 0;
    return bookingInfo.DepositDeductions.reduce((sum, d) => sum + Number(d.amount), 0);
  }, [bookingInfo]);

  const loadBookingDetails = async () => {
    try {
      const { data } = await client.get(`/me/bookings/${bookingId}`);
      setBookingInfo(data);
      if (data?.Contracts?.length > 0) {
        const latestContract = [...data.Contracts].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        )[0];
        setContractInfo(latestContract);
      }

      // Load accounts if approved
      if (['OWNER_APPROVED', 'PAYMENT_RECEIVED', 'CONFIRMED', 'CHECKED_IN'].includes(data.status)) {
        loadBookingAccounts(data.id);
      }
    } catch (err) {
      setErrorMsg(err.response?.data?.error || 'Failed to load booking details');
    }
  };

  const loadBookingAccounts = async (bId) => {
    try {
      const [{ data: platform }, { data: owner }] = await Promise.all([
        client.get(`/bookings/${bId}/platform-account`),
        client.get(`/bookings/${bId}/owner-account`)
      ]);
      setPlatformAccount(platform);
      setOwnerAccount(owner);
    } catch (_err) {
      // Accounts might not be ready yet
    }
  };

  useEffect(() => {
    if (bookingId) {
      loadBookingDetails();
    }
  }, [bookingId]);

  const payPlatformFee = async () => {
    if (!bookingInfo?.id) return;
    try {
      await client.post(`/me/bookings/${bookingInfo.id}/pay-platform`, {
        paymentReference: platformPaymentRef
      });
      setMessage('Platform fee payment submitted. Please wait for owner confirmation.');
      setPlatformPaymentRef('');
      loadBookingDetails();
    } catch (err) {
      setMessage(err.response?.data?.error || 'Payment submission failed');
    }
  };

  const payOwnerRent = async () => {
    if (!bookingInfo?.id) return;
    try {
      await client.post(`/me/bookings/${bookingInfo.id}/pay-owner`, {
        paymentReference: rentPaymentRef,
        ownerAccountId: ownerAccount?.bankAccount?.id || null
      });
      setMessage('Owner rent payment submitted. Please wait for owner confirmation.');
      setRentPaymentRef('');
      loadBookingDetails();
    } catch (err) {
      setMessage(err.response?.data?.error || 'Payment submission failed');
    }
  };

  const generateContract = async () => {
    if (!bookingInfo?.id) return;
    try {
      const { data } = await client.post('/contracts/generate', {
        bookingId: bookingInfo.id,
        leaseType: bookingInfo.Listing?.stayType || 'SHORT_TERM',
        startDate: bookingInfo.checkIn,
        endDate: bookingInfo.checkOut
      });
      setContractInfo(data);
      setMessage('Contract created successfully.');
    } catch (err) {
      setMessage(err.response?.data?.error || 'Contract generation failed');
    }
  };

  const downloadContract = async () => {
    if (!contractInfo?.id) return;
    try {
      const response = await client.get(`/contracts/${contractInfo.id}/download`, {
        responseType: 'blob'
      });
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `contract-${contractInfo.id}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setMessage('Failed to download contract file');
    }
  };

  const approvePayment = async (paymentType) => {
    try {
      await client.patch(`/owner/bookings/${bookingId}/approve-payment/${paymentType}`);
      setMessage(`${paymentType === 'PLATFORM_FEE' ? 'Platform fee' : 'Rent'} payment approved.`);
      loadBookingDetails();
    } catch (err) {
      setMessage(err.response?.data?.error || 'Failed to approve payment');
    }
  };

  const confirmOverallPaymentReceived = async () => {
    try {
      const { data } = await client.patch(`/owner/bookings/${bookingId}/payment-received`);
      setMessage(`Booking status updated to PAYMENT_RECEIVED. Tenant can now confirm with Payment ID: ${data.paymentId}`);
      loadBookingDetails();
    } catch (err) {
      setMessage(err.response?.data?.error || 'Failed to confirm payment');
    }
  };

  const handleEvidenceFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setEvidenceFile(e.target.files[0]);
    }
  };

  const submitDeduction = async () => {
    setMessage('');
    setErrorMsg('');
    if (!deductAmt || Number(deductAmt) <= 0) {
      setErrorMsg('Please specify a positive deduction amount');
      return;
    }
    if (!deductReason.trim()) {
      setErrorMsg('Please select or specify a reason for the deduction');
      return;
    }

    setUploadingEvidence(true);
    let evidenceUrl = '';
    try {
      if (evidenceFile) {
        const formData = new FormData();
        formData.append('images', evidenceFile);
        const uploadRes = await client.post('/uploads/images', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        evidenceUrl = uploadRes.data.urls?.[0] || '';
      }

      const res = await client.post(`/owner/bookings/${bookingId}/deduct-deposit`, {
        amount: Number(deductAmt),
        reason: deductReason,
        evidenceUrl
      });

      setBookingInfo(res.data);
      setDeductReason('');
      setDeductAmt('');
      setEvidenceFile(null);
      setMessage('Damage deduction successfully applied.');
    } catch (err) {
      setErrorMsg(err.response?.data?.error || 'Failed to submit damage deduction');
    } finally {
      setUploadingEvidence(false);
    }
  };

  if (errorMsg) {
    return (
      <section>
        <div className="card" style={{ padding: 24, textAlign: 'center' }}>
          <p className="error-text" style={{ fontSize: '1.1rem' }}>{errorMsg}</p>
          <button type="button" onClick={() => navigate('/manage-entry')}>Back to My Bookings</button>
        </div>
      </section>
    );
  }

  if (!bookingInfo) {
    return (
      <section>
        <p>Loading booking details...</p>
      </section>
    );
  }

  const isApproved = ['OWNER_APPROVED', 'PAYMENT_RECEIVED', 'CONFIRMED', 'CHECKED_IN'].includes(bookingInfo.status);
  const canShowContract = ['OWNER_APPROVED', 'PAYMENT_RECEIVED', 'CONFIRMED', 'CHECKED_IN'].includes(bookingInfo.status);

  return (
    <section>
      <SEO title="Booking Payment & Lease Agreement" description="Submit transaction reference codes for platform fees and landlord rent, check status, and generate signed PDF contracts." />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <h2>Booking Payment & Contract</h2>
        <button
          type="button"
          onClick={() => navigate('/manage-entry')}
          style={{ background: '#64748b', color: '#fff', fontSize: '0.9rem', padding: '8px 16px' }}
        >
          ← Back to My Bookings
        </button>
      </div>

      {isOwnerOrAdmin && (
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
      )}

      {bookingInfo && (
        <>
          {!isTenantOk ? (
            <div style={{ background: '#fffbeb', border: '1px solid #fef3c7', color: '#b45309', padding: '12px 18px', borderRadius: '8px', marginBottom: '16px', fontSize: '0.95rem', fontWeight: '500' }}>
              ⚠️ Tenant's profile must be 100% completed and verified by admin before this booking can be confirmed. Please visit the <Link to="/profile" style={{ color: '#1f66ea', textDecoration: 'underline', fontWeight: 'bold' }}>Profile Page</Link> to fill it.
            </div>
          ) : (
            <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', color: '#047857', padding: '12px 18px', borderRadius: '8px', marginBottom: '16px', fontSize: '0.95rem', fontWeight: '600' }}>
              ✓ Tenant Verified by Admin
            </div>
          )}
          {!isOwnerOk ? (
            <div style={{ background: '#fffbeb', border: '1px solid #fef3c7', color: '#b45309', padding: '12px 18px', borderRadius: '8px', marginBottom: '16px', fontSize: '0.95rem', fontWeight: '500' }}>
              ⚠️ Owner's profile must be 100% completed and verified by admin before this booking can be confirmed.
            </div>
          ) : (
            <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', color: '#047857', padding: '12px 18px', borderRadius: '8px', marginBottom: '16px', fontSize: '0.95rem', fontWeight: '600' }}>
              ✓ Owner Verified by Admin
            </div>
          )}
        </>
      )}

      <div className="card" style={{ padding: '20px 24px', marginBottom: 20 }}>
        <p style={{ fontSize: '1.1rem', margin: '6px 0' }}>
          <strong>Booking ID:</strong> {bookingInfo.id}
        </p>
        <p style={{ fontSize: '1.1rem', margin: '6px 0' }}>
          <strong>Listing:</strong> {bookingInfo.Listing?.title || 'N/A'}
        </p>
        <p style={{ fontSize: '1.1rem', margin: '6px 0' }}>
          <strong>Status:</strong> <span style={{ color: '#1f66ea', fontWeight: '800' }}>{bookingInfo.status}</span>
        </p>
        <p style={{ fontSize: '1.1rem', margin: '6px 0' }}>
          <strong>Stay Dates:</strong> {bookingInfo.checkIn} to {bookingInfo.checkOut}
        </p>
        <p style={{ fontSize: '1.1rem', margin: '6px 0' }}>
          <strong>Total Amount:</strong> €{Number(bookingInfo.totalAmount).toFixed(2)}
        </p>
      </div>

      {/* Deposit Refund Info visible to both Tenant and Owner */}
      {quote && Number(quote.depositAmount) > 0 && (
        <div className="card" style={{ padding: '20px 24px', marginBottom: 20, borderLeft: '4px solid #3b82f6' }}>
          <h3 style={{ margin: '0 0 10px 0', fontSize: '1.1rem', color: '#1d4ed8' }}>
            Security Deposit Refund Information
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '20px', alignItems: 'start' }}>
            <div>
              <p style={{ margin: '4px 0' }}><strong>Total Deposit Paid:</strong> €{Number(quote.depositAmount).toFixed(2)}</p>
              {totalDeductedSum > 0 ? (
                <>
                  <p style={{ margin: '4px 0', color: '#ef4444' }}>
                    <strong>Total Deductions Sum:</strong> -€{totalDeductedSum.toFixed(2)}
                  </p>
                  <p style={{ margin: '4px 0', color: '#10b981', fontWeight: 'bold', fontSize: '1.05rem' }}>
                    <strong>Net Refund Owed:</strong> €{Number(Math.max(0, quote.depositAmount - totalDeductedSum)).toFixed(2)}
                  </p>

                  <div style={{ marginTop: 12, borderTop: '1px solid #e2e8f0', paddingTop: 8 }}>
                    <span style={{ fontWeight: '700', color: '#475569', fontSize: '0.85rem', display: 'block', marginBottom: '6px' }}>
                      Applied Deductions Details:
                    </span>
                    <ul style={{ paddingLeft: '20px', margin: 0, fontSize: '0.82rem', color: '#475569' }}>
                      {(bookingInfo.DepositDeductions || []).map((d, index) => (
                        <li key={d.id || index} style={{ marginBottom: 6 }}>
                          <strong style={{ color: '#ef4444' }}>-€{Number(d.amount).toFixed(2)}</strong>: {d.reason}{' '}
                          {d.evidenceUrl && (
                            <a href={d.evidenceUrl} target="_blank" rel="noreferrer" style={{ color: '#1f66ea', textDecoration: 'underline', marginLeft: 4 }}>
                              (View Evidence)
                            </a>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              ) : (
                <p style={{ margin: '4px 0', color: '#10b981', fontWeight: 'bold' }}>
                  <strong>Net Refund Owed:</strong> €{Number(quote.depositAmount).toFixed(2)} (No damage logged)
                </p>
              )}
            </div>

            <div style={{ background: '#f8fafc', padding: '12px 16px', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
              <span style={{ fontWeight: '700', color: '#475569', display: 'block', marginBottom: '6px', fontSize: '0.9rem' }}>
                Recipient Bank Account
              </span>
              {bookingInfo.User?.TenantBankAccount ? (
                <>
                  <p style={{ margin: '2px 0', fontSize: '0.88rem' }}><strong>Holder:</strong> {bookingInfo.User.TenantBankAccount.accountHolder}</p>
                  <p style={{ margin: '2px 0', fontSize: '0.88rem' }}><strong>IBAN:</strong> {bookingInfo.User.TenantBankAccount.iban}</p>
                  <p style={{ margin: '2px 0', fontSize: '0.88rem' }}><strong>BIC:</strong> {bookingInfo.User.TenantBankAccount.bic}</p>
                </>
              ) : (
                <p style={{ margin: 0, fontSize: '0.85rem', color: '#ef4444', fontStyle: 'italic' }}>
                  ⚠️ Tenant has not configured their payout details. Please configure it in Profile Page.
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── TENANT VIEW ── */}
      {isApproved && isTenantUser && (
        <>
          {/* Platform fee bank account */}
          {platformAccount && (
            <div className="card" style={{ marginBottom: 16, borderLeft: '4px solid #1f66ea' }}>
              <h3 style={{ margin: '0 0 12px 0', fontSize: '1.1rem' }}>Platform fee bank account</h3>
              <div className="notice-panel" style={{ margin: '0 0 12px 0', background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                <p>Account holder: {platformAccount.bankAccount.accountHolder}</p>
                <p>IBAN: {platformAccount.bankAccount.iban}</p>
                <p>BIC: {platformAccount.bankAccount.bic}</p>
                {quote && (
                  <p style={{ marginTop: 8, paddingTop: 8, borderTop: '1px dashed #cbd5e1', color: '#1f66ea' }}>
                    <strong>Platform Fee Amount:</strong> €{Number(quote.platformFee).toFixed(2)}
                  </p>
                )}
              </div>

              {platformPayment ? (
                <div className="notice-panel" style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', color: '#166534', margin: '8px 0 0 0' }}>
                  <p><strong>Platform Reference Submitted:</strong> {platformPayment.paymentReference}</p>
                  <p><strong>Status:</strong> {platformPayment.status}</p>
                </div>
              ) : (
                bookingInfo.status === 'OWNER_APPROVED' && (
                  <div className="row" style={{ marginTop: 8 }}>
                    <input
                      type="text"
                      placeholder="Platform payment reference"
                      value={platformPaymentRef}
                      onChange={(e) => setPlatformPaymentRef(e.target.value)}
                      style={{ flex: 1, padding: 10, borderRadius: 8, border: '1px solid #cbd5e1' }}
                    />
                    <button
                      type="button"
                      onClick={payPlatformFee}
                      style={{ background: '#1f66ea', color: '#fff', padding: '10px 20px', borderRadius: 8 }}
                    >
                      Submit platform fee
                    </button>
                  </div>
                )
              )}
            </div>
          )}

          {/* Owner bank account */}
          {ownerAccount && (
            <div className="card" style={{ marginBottom: 16, borderLeft: '4px solid #10b981' }}>
              <h3 style={{ margin: '0 0 12px 0', fontSize: '1.1rem' }}>Owner bank account</h3>
              <div className="notice-panel" style={{ margin: '0 0 12px 0', background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                <p>Owner: {ownerAccount.owner.fullName}</p>
                <p>Account holder: {ownerAccount.bankAccount.accountHolder}</p>
                <p>IBAN: {ownerAccount.bankAccount.iban}</p>
                <p>BIC: {ownerAccount.bankAccount.bic}</p>
                {quote && (
                  <div style={{ marginTop: 8, paddingTop: 8, borderTop: '1px dashed #cbd5e1' }}>
                    <p style={{ margin: '4px 0' }}><strong>Rent:</strong> €{Number(quote.rentAmount).toFixed(2)}</p>
                    <p style={{ margin: '4px 0' }}><strong>Deposit:</strong> €{Number(quote.depositAmount).toFixed(2)}</p>
                    <p style={{ margin: '4px 0' }}><strong>Cleaning Charge:</strong> €{Number(quote.cleaningCharge).toFixed(2)}</p>
                    <p style={{ margin: '4px 0', fontSize: '1.02rem', color: '#10b981' }}>
                      <strong>Total Charges to Owner:</strong> €{Number(quote.ownerTotal).toFixed(2)}
                    </p>
                  </div>
                )}
              </div>

              {rentPayment ? (
                <div className="notice-panel" style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', color: '#166534', margin: '8px 0 0 0' }}>
                  <p><strong>Rent Reference Submitted:</strong> {rentPayment.paymentReference}</p>
                  <p><strong>Status:</strong> {rentPayment.status}</p>
                </div>
              ) : (
                bookingInfo.status === 'OWNER_APPROVED' && (
                  <div className="row" style={{ marginTop: 8 }}>
                    <input
                      type="text"
                      placeholder="Rent payment reference"
                      value={rentPaymentRef}
                      onChange={(e) => setRentPaymentRef(e.target.value)}
                      style={{ flex: 1, padding: 10, borderRadius: 8, border: '1px solid #cbd5e1' }}
                    />
                    <button
                      type="button"
                      onClick={payOwnerRent}
                      style={{ background: '#10b981', color: '#fff', padding: '10px 20px', borderRadius: 8 }}
                    >
                      Submit rent payment
                    </button>
                  </div>
                )
              )}
            </div>
          )}
        </>
      )}

      {/* ── OWNER/ADMIN VIEW ── */}
      {isApproved && !isTenantUser && (
        <>
          {/* Owner Rent & Charges Section */}
          <div className="card" style={{ marginBottom: 16, borderLeft: '4px solid #10b981' }}>
            <h3 style={{ margin: '0 0 12px 0', fontSize: '1.1rem' }}>Owner rent payout & reference</h3>
            <div className="notice-panel" style={{ margin: '0 0 12px 0', background: '#f8fafc', border: '1px solid #e2e8f0' }}>
              {quote && (
                <>
                  <p style={{ margin: '4px 0' }}><strong>Stay Duration:</strong> {quote.days} day(s) ({quote.months} month(s))</p>
                  <p style={{ margin: '4px 0' }}><strong>Rent Amount:</strong> €{Number(quote.rentAmount).toFixed(2)}</p>
                  <p style={{ margin: '4px 0' }}><strong>Deposit:</strong> €{Number(quote.depositAmount).toFixed(2)}</p>
                  <p style={{ margin: '4px 0' }}><strong>Cleaning Charge:</strong> €{Number(quote.cleaningCharge).toFixed(2)}</p>
                  <p style={{ margin: '4px 0', fontSize: '1.02rem', color: '#10b981' }}>
                    <strong>Total Rent & Charges Payout:</strong> €{Number(quote.ownerTotal).toFixed(2)}
                  </p>
                </>
              )}
            </div>

            <div className="notice-panel" style={{ background: '#f8fafc', border: '1px solid #e2e8f0', margin: 0 }}>
              <p><strong>Rent Payment Reference:</strong> <span style={{ color: '#047857', fontWeight: 'bold' }}>{rentPayment?.paymentReference || 'Not submitted yet'}</span></p>
              <p><strong>Status:</strong> {rentPayment?.status || 'N/A'}</p>
              {rentPayment?.status === 'PENDING' && (
                <button
                  type="button"
                  onClick={() => approvePayment('RENT')}
                  style={{ background: '#10b981', color: '#fff', padding: '6px 14px', borderRadius: 8, marginTop: 8 }}
                >
                  Approve Rent Reference
                </button>
              )}
            </div>
          </div>

          {/* Platform Fee Section */}
          <div className="card" style={{ marginBottom: 16, borderLeft: '4px solid #1f66ea' }}>
            <h3 style={{ margin: '0 0 12px 0', fontSize: '1.1rem' }}>Platform fee payment & reference</h3>
            <div className="notice-panel" style={{ margin: '0 0 12px 0', background: '#f8fafc', border: '1px solid #e2e8f0' }}>
              {quote && (
                <p style={{ margin: '4px 0' }}><strong>Platform Fee Amount:</strong> €{Number(quote.platformFee).toFixed(2)}</p>
              )}
            </div>

            <div className="notice-panel" style={{ background: '#f8fafc', border: '1px solid #e2e8f0', margin: 0 }}>
              <p><strong>Platform Payment Reference:</strong> <span style={{ color: '#1d4ed8', fontWeight: 'bold' }}>{platformPayment?.paymentReference || 'Not submitted yet'}</span></p>
              <p><strong>Status:</strong> {platformPayment?.status || 'N/A'}</p>
              {platformPayment?.status === 'PENDING' && (
                <button
                  type="button"
                  onClick={() => approvePayment('PLATFORM_FEE')}
                  style={{ background: '#1f66ea', color: '#fff', padding: '6px 14px', borderRadius: 8, marginTop: 8 }}
                >
                  Approve Platform Reference
                </button>
              )}
            </div>
          </div>

          {/* Tenant Refund Details for Security Deposit returns */}
          <div className="card" style={{ marginBottom: 16, borderLeft: '4px solid #3b82f6', background: '#eff6ff' }}>
            <h3 style={{ margin: '0 0 12px 0', fontSize: '1.1rem', color: '#1d4ed8' }}>
              Tenant Security Deposit Refund Details
            </h3>
            <div className="notice-panel" style={{ margin: '0 0 12px 0', background: '#ffffff', border: '1px solid #bfdbfe' }}>
              {quote && (
                <>
                  <p style={{ margin: '4px 0', color: '#1e3a8a' }}>
                    <strong>Security Deposit Amount:</strong> €{Number(quote.depositAmount).toFixed(2)}
                  </p>
                  {totalDeductedSum > 0 ? (
                    <>
                      <p style={{ margin: '4px 0', color: '#b91c1c' }}>
                        <strong>Total Deductions Sum:</strong> -€{totalDeductedSum.toFixed(2)}
                      </p>
                      <p style={{ margin: '4px 0', color: '#15803d', fontWeight: 'bold' }}>
                        <strong>Net Refund Owed to Tenant:</strong> €{Number(Math.max(0, quote.depositAmount - totalDeductedSum)).toFixed(2)}
                      </p>

                      <div style={{ marginTop: 12, borderTop: '1px dashed #bfdbfe', paddingTop: 8 }}>
                        <span style={{ fontWeight: '700', color: '#1e3a8a', fontSize: '0.85rem', display: 'block', marginBottom: '6px' }}>
                          Deduction History:
                        </span>
                        <ul style={{ paddingLeft: '20px', margin: 0, fontSize: '0.82rem', color: '#475569' }}>
                          {(bookingInfo.DepositDeductions || []).map((d, index) => (
                            <li key={d.id || index} style={{ marginBottom: 4 }}>
                              <strong style={{ color: '#ef4444' }}>-€{Number(d.amount).toFixed(2)}</strong>: {d.reason}{' '}
                              {d.evidenceUrl && (
                                <a href={d.evidenceUrl} target="_blank" rel="noreferrer" style={{ color: '#2563eb', textDecoration: 'underline', marginLeft: 4 }}>
                                  (View Evidence)
                                </a>
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </>
                  ) : (
                    <p style={{ margin: '4px 0', color: '#166534', fontWeight: '600' }}>
                      <strong>Net Refund Owed to Tenant:</strong> €{Number(quote.depositAmount).toFixed(2)} (No deductions logged)
                    </p>
                  )}
                </>
              )}
            </div>

            {bookingInfo.User?.TenantBankAccount ? (
              <div className="notice-panel" style={{ background: '#ffffff', border: '1px solid #bfdbfe' }}>
                <p style={{ margin: '4px 0', color: '#1e3a8a' }}><strong>Account Holder:</strong> {bookingInfo.User.TenantBankAccount.accountHolder}</p>
                <p style={{ margin: '4px 0', color: '#1e3a8a' }}><strong>IBAN:</strong> {bookingInfo.User.TenantBankAccount.iban}</p>
                <p style={{ margin: '4px 0', color: '#1e3a8a' }}><strong>BIC / SWIFT:</strong> {bookingInfo.User.TenantBankAccount.bic}</p>
              </div>
            ) : (
              <div className="notice-panel" style={{ background: '#fffbeb', border: '1px solid #fef3c7', color: '#b45309' }}>
                ⚠️ Tenant has not configured their bank details on their profile page yet.
              </div>
            )}

            {/* Deduct/Cut Amount feature form for owner */}
            {quote && Number(quote.depositAmount) > 0 && (
              <div style={{ marginTop: '16px', background: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px dashed #cbd5e1' }}>
                <h4 style={{ margin: '0 0 12px 0', fontSize: '0.95rem', color: '#334155' }}>
                  Log Damage Deduction (Deduct from Deposit)
                </h4>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '12px' }}>
                  {["Deep Cleaning Fee", "Key Loss Replacement", "Wall Scratch/Painting", "Furniture Repair"].map((reasonOpt) => (
                    <button
                      key={reasonOpt}
                      type="button"
                      onClick={() => setDeductReason(reasonOpt)}
                      style={{
                        padding: '4px 10px',
                        fontSize: '0.78rem',
                        background: deductReason === reasonOpt ? '#2563eb' : '#f1f5f9',
                        color: deductReason === reasonOpt ? '#ffffff' : '#475569',
                        border: '1px solid #cbd5e1',
                        borderRadius: '6px',
                        cursor: 'pointer'
                      }}
                    >
                      {reasonOpt}
                    </button>
                  ))}
                </div>

                <div style={{ marginBottom: '12px' }}>
                  <input
                    type="text"
                    placeholder="Or enter custom damage description"
                    value={deductReason}
                    onChange={(e) => setDeductReason(e.target.value)}
                    style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.88rem' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '12px' }}>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#475569', display: 'block', marginBottom: '4px' }}>Deduction Amount (€)</label>
                    <input
                      type="number"
                      placeholder="e.g. 50"
                      value={deductAmt}
                      onChange={(e) => setDeductAmt(e.target.value)}
                      max={quote.depositAmount}
                      min="0"
                      style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.88rem' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#475569', display: 'block', marginBottom: '4px' }}>Evidence Image</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleEvidenceFileChange}
                      style={{ width: '100%', fontSize: '0.8rem' }}
                    />
                  </div>
                </div>

                {uploadingEvidence && <p style={{ fontSize: '0.8rem', color: '#2563eb', marginBottom: '8px' }}>Uploading evidence photo...</p>}

                <button
                  type="button"
                  onClick={submitDeduction}
                  style={{
                    width: '100%',
                    padding: '10px',
                    background: '#ef4444',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '8px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    fontSize: '0.88rem'
                  }}
                >
                  Submit Damage Deduction
                </button>
              </div>
            )}
          </div>

          {/* Overall Confirmation Block */}
          {bookingInfo.status === 'OWNER_APPROVED' && (
            <div className="card" style={{ marginBottom: 16, borderLeft: '4px solid #f59e0b', background: '#fffbeb' }}>
              <h3 style={{ margin: '0 0 8px 0', fontSize: '1.1rem', color: '#b45309' }}>Confirm Overall Payment</h3>
              {!allApproved ? (
                <p style={{ color: '#b45309', fontSize: '0.9rem', margin: '4px 0 12px 0' }}>
                  ⚠️ <strong>Action Required:</strong> Tenant must submit both references, and you must click the approval buttons above for both references to verify them before you can finalize this booking.
                </p>
              ) : (
                <p style={{ color: '#15803d', fontSize: '0.9rem', margin: '4px 0 12px 0' }}>
                  ✓ <strong>Ready to finalize:</strong> Both payments have been successfully approved. You can now confirm the overall payment receipt.
                </p>
              )}

              <button
                type="button"
                onClick={confirmOverallPaymentReceived}
                disabled={!allApproved || isProfileWarning}
                style={{
                  background: (allApproved && !isProfileWarning) ? '#d97706' : '#cbd5e1',
                  color: '#fff',
                  padding: '10px 20px',
                  borderRadius: 8,
                  cursor: (allApproved && !isProfileWarning) ? 'pointer' : 'not-allowed',
                  fontWeight: '600'
                }}
              >
                Confirm Payment Received
              </button>
            </div>
          )}

          {bookingInfo.status === 'PAYMENT_RECEIVED' && (
            <div className="card" style={{ marginBottom: 16, background: '#ecfdf5', borderLeft: '4px solid #10b981' }}>
              <h3 style={{ margin: '0 0 4px 0', fontSize: '1.1rem', color: '#047857' }}>Payment Receipt Logged</h3>
              <p style={{ color: '#065f46', margin: '4px 0' }}>
                Overall payment is marked as received. Shared Booking Payment ID: <strong>{bookingInfo.paymentId}</strong>
              </p>
            </div>
          )}
        </>
      )}

      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 20 }}>
        {canShowContract && (
          <>
            <button
              type="button"
              onClick={generateContract}
              style={{ background: '#1f66ea', color: '#fff', padding: '10px 20px', fontWeight: '600' }}
            >
              Generate contract
            </button>
            {contractInfo?.id && (
              <button
                type="button"
                onClick={downloadContract}
                style={{ background: '#10b981', color: '#fff', padding: '10px 20px', fontWeight: '600' }}
              >
                Download contract
              </button>
            )}
          </>
        )}
        <button
          type="button"
          onClick={loadBookingDetails}
          style={{ background: '#475569', color: '#fff', padding: '10px 20px', fontWeight: '600' }}
        >
          Refresh booking status
        </button>
      </div>

      {message && (
        <div className="notice-panel" style={{ marginTop: 16, background: '#ecfdf5', color: '#065f46', border: '1px solid #a7f3d0' }}>
          <p>{message}</p>
        </div>
      )}
    </section>
  );
}
