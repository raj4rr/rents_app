import { useEffect, useState } from 'react';
import client from '../api/client';
import SEO from '../components/SEO';

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    fullName: '',
    fatherName: '',
    dob: '',
    role: '',
    email: '',
    mobileNumber: '',
    photoWithPassport: '',
    passportPath: '',
    residenceProofPath: '',
    financialDocPath: '',
    nationality: '',
    residenceCountry: '',
    streetAddress: '',
    zipCode: '',
    city: '',
    country: ''
  });

  const [form, setForm] = useState({
    fullName: '',
    fatherName: '',
    dob: '',
    nationality: '',
    residenceCountry: '',
    streetAddress: '',
    zipCode: '',
    city: '',
    country: ''
  });

  const [files, setFiles] = useState({
    photoWithPassport: null,
    passport: null,
    residenceProof: null,
    signature: null,
    financialDoc: null
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);
  const [activeSample, setActiveSample] = useState(null);

  const [bankAccount, setBankAccount] = useState({
    accountHolder: '',
    iban: '',
    bic: ''
  });
  const [canEditBank, setCanEditBank] = useState(true);
  const [bankMessage, setBankMessage] = useState('');
  const [bankError, setBankError] = useState('');

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setPasswordMessage('');
    setPasswordError('');
    if (newPassword !== confirmPassword) {
      setPasswordError('New passwords do not match');
      return;
    }
    try {
      await client.post('/auth/change-password', { oldPassword, newPassword });
      setPasswordMessage('Password changed successfully!');
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      setPasswordError(err.response?.data?.error || 'Password change failed');
    }
  };

  const fetchProfile = () => {
    client.get('/me/profile')
      .then((res) => {
        const userProfile = res.data;
        setProfile(userProfile);
        setForm({
          fullName: userProfile.fullName || '',
          fatherName: userProfile.fatherName || '',
          dob: userProfile.dob || '',
          nationality: userProfile.nationality || '',
          residenceCountry: userProfile.residenceCountry || '',
          streetAddress: userProfile.streetAddress || '',
          zipCode: userProfile.zipCode || '',
          city: userProfile.city || '',
          country: userProfile.country || ''
        });

        // Fetch bank account details
        const isOwner = userProfile.role === 'OWNER';
        const endpoint = isOwner ? '/owner/bank-account' : '/me/bank-account';
        client.get(endpoint)
          .then((bankRes) => {
            const acc = bankRes.data.account;
            if (acc) {
              setBankAccount({
                accountHolder: acc.accountHolder || '',
                iban: acc.iban || '',
                bic: acc.bic || ''
              });
            }
            if (isOwner) {
              setCanEditBank(bankRes.data.canEdit);
            } else {
              setCanEditBank(true);
            }
          })
          .catch(() => {});
      })
      .catch((err) => {
        setError(err.response?.data?.error || 'Failed to load profile details.');
      });
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleTextSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    try {
      const res = await client.patch('/me/profile', form);
      setProfile(res.data);
      setMessage('Profile basic information updated successfully.');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update profile information.');
    }
  };

  const handleBankSubmit = async (e) => {
    e.preventDefault();
    setBankMessage('');
    setBankError('');
    const isOwner = profile.role === 'OWNER';
    const endpoint = isOwner ? '/owner/bank-account' : '/me/bank-account';
    try {
      const res = await client.put(endpoint, bankAccount);
      const acc = res.data.account;
      if (acc) {
        setBankAccount({
          accountHolder: acc.accountHolder || '',
          iban: acc.iban || '',
          bic: acc.bic || ''
        });
      }
      if (isOwner) {
        setCanEditBank(res.data.canEdit);
      } else {
        setCanEditBank(true);
      }
      setBankMessage('Payment account details updated successfully.');
    } catch (err) {
      setBankError(err.response?.data?.error || 'Failed to update payment account.');
    }
  };

  const handleFileChange = (e) => {
    const { name, files: selectedFiles } = e.target;
    if (selectedFiles && selectedFiles[0]) {
      setFiles((prev) => ({ ...prev, [name]: selectedFiles[0] }));
    }
  };

  const handleUploadSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    if (!files.photoWithPassport && !files.passport && !files.residenceProof && !files.signature && !files.financialDoc) {
      setError('Please select at least one document to upload.');
      return;
    }

    setUploading(true);
    const formData = new FormData();
    if (files.photoWithPassport) formData.append('photoWithPassport', files.photoWithPassport);
    if (files.passport) formData.append('passport', files.passport);
    if (files.residenceProof) formData.append('residenceProof', files.residenceProof);
    if (files.signature) formData.append('signature', files.signature);
    if (files.financialDoc) formData.append('financialDoc', files.financialDoc);

    try {
      const res = await client.post('/me/profile/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setProfile(res.data);
      setFiles({ photoWithPassport: null, passport: null, residenceProof: null, signature: null, financialDoc: null });
      setMessage('Verification documents uploaded successfully.');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to upload verification documents.');
    } finally {
      setUploading(false);
    }
  };

  const fileBaseUrl = 'http://localhost:5000';

  return (
    <section style={{ maxWidth: '800px', margin: '0 auto', padding: '20px 10px' }}>
      <SEO title="User Profile & Verification" description="Configure your personal details, verify legal documents, and set up your payout or refund bank accounts." />
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h2 style={{ fontSize: '2.2rem', fontWeight: '800', color: '#1e293b' }}>
          {profile.role === 'OWNER' ? 'Owner Verification Portal' : 'User Verification & Profile'}
        </h2>
        <p style={{ color: '#64748b' }}>
          Configure your legal credentials and identity documents to complete verification for RentStack Inventory contracts.
        </p>
      </div>

      {message && <div style={{ background: '#dcfce7', color: '#15803d', padding: '12px', borderRadius: '8px', marginBottom: '20px', fontWeight: '600' }}>{message}</div>}
      {error && <div style={{ background: '#fee2fee', color: '#b91c1c', padding: '12px', borderRadius: '8px', marginBottom: '20px', fontWeight: '600' }}>{error}</div>}

      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '24px', alignItems: 'start' }}>
        {/* Left Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="card" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#1e293b', marginBottom: '18px', borderBottom: '1px solid #e2e8f0', paddingBottom: '8px' }}>
            Basic Information
          </h3>
          <form onSubmit={handleTextSubmit}>
            <div style={{ marginBottom: '14px' }}>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '6px', color: '#475569' }}>Email</label>
              <input type="text" value={profile.email} disabled style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#f1f5f9', cursor: 'not-allowed' }} />
            </div>

            <div style={{ marginBottom: '14px' }}>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '6px', color: '#475569' }}>Account Type</label>
              <input type="text" value={profile.role || ''} disabled style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#f1f5f9', cursor: 'not-allowed' }} />
            </div>

            <div style={{ marginBottom: '14px' }}>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '6px', color: '#475569' }}>Full Name</label>
              <input
                type="text"
                value={form.fullName}
                onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                required
                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
              />
            </div>

            <div style={{ marginBottom: '14px' }}>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '6px', color: '#475569' }}>Father\'s Name</label>
              <input
                type="text"
                value={form.fatherName}
                onChange={(e) => setForm({ ...form, fatherName: e.target.value })}
                placeholder="Enter father's name"
                required
                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
              />
            </div>

            <div style={{ marginBottom: '14px' }}>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '6px', color: '#475569' }}>Date of Birth</label>
              <input
                type="date"
                value={form.dob}
                onChange={(e) => setForm({ ...form, dob: e.target.value })}
                required
                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
              />
            </div>

            <div style={{ marginBottom: '14px' }}>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '6px', color: '#475569' }}>Nationality</label>
              <input
                type="text"
                value={form.nationality}
                onChange={(e) => setForm({ ...form, nationality: e.target.value })}
                placeholder="e.g. German, Indian, Spanish"
                required
                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
              />
            </div>

            <div style={{ marginBottom: '14px' }}>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '6px', color: '#475569' }}>Residence Country</label>
              <input
                type="text"
                value={form.residenceCountry}
                onChange={(e) => setForm({ ...form, residenceCountry: e.target.value })}
                placeholder="Country you currently live in"
                required
                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
              />
            </div>

            <div style={{ marginBottom: '14px', borderTop: '1px dashed #cbd5e1', paddingTop: '14px' }}>
              <span style={{ fontWeight: '700', color: '#334155', display: 'block', marginBottom: '8px' }}>Residential Address</span>
            </div>

            <div style={{ marginBottom: '14px' }}>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '6px', color: '#475569' }}>Street Address</label>
              <input
                type="text"
                value={form.streetAddress}
                onChange={(e) => setForm({ ...form, streetAddress: e.target.value })}
                placeholder="Street name and house number"
                required
                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '14px' }}>
              <div>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '6px', color: '#475569' }}>Zip Code</label>
                <input
                  type="text"
                  value={form.zipCode}
                  onChange={(e) => setForm({ ...form, zipCode: e.target.value })}
                  placeholder="ZIP"
                  required
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '6px', color: '#475569' }}>City</label>
                <input
                  type="text"
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                  placeholder="City"
                  required
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                />
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '6px', color: '#475569' }}>Address Country</label>
              <input
                type="text"
                value={form.country}
                onChange={(e) => setForm({ ...form, country: e.target.value })}
                placeholder="Country of this address"
                required
                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
              />
            </div>

            <button type="submit" style={{ width: '100%', padding: '12px', background: '#1f66ea', color: '#ffffff', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
              Save Profile Details
            </button>
          </form>
        </div>
        </div>

        {/* Right Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Verification files upload */}
          <div className="card" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#1e293b', marginBottom: '18px', borderBottom: '1px solid #e2e8f0', paddingBottom: '8px' }}>
            Identity & Legal Verification
          </h3>
          <form onSubmit={handleUploadSubmit}>
            {/* Field 1: Photo holding Passport */}
            {/* Field 1: Photo holding Passport */}
            <div style={{ marginBottom: '18px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <label style={{ fontWeight: '600', color: '#475569' }}>Self Photo holding Passport</label>
                <button type="button" onClick={() => setActiveSample('photoWithPassport')} style={{ background: 'none', border: 'none', color: '#1f66ea', fontSize: '0.8rem', fontWeight: 'bold', textDecoration: 'underline', cursor: 'pointer', padding: 0 }}>
                  View Sample
                </button>
              </div>
              <input
                type="file"
                name="photoWithPassport"
                accept="image/*"
                onChange={handleFileChange}
                style={{ width: '100%', marginBottom: '6px' }}
              />
              {profile.photoWithPassport ? (
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.85rem', color: '#16a34a', fontWeight: '600' }}>✓ File Uploaded</span>
                  <a href={`${fileBaseUrl}/${profile.photoWithPassport}`} target="_blank" rel="noreferrer" style={{ fontSize: '0.85rem', color: '#1f66ea', textDecoration: 'underline' }}>View Document</a>
                </div>
              ) : (
                <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>No document uploaded</span>
              )}
            </div>

            {/* Field 2: Passport Document Scan */}
            <div style={{ marginBottom: '18px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <label style={{ fontWeight: '600', color: '#475569' }}>Passport Scan</label>
                <button type="button" onClick={() => setActiveSample('passport')} style={{ background: 'none', border: 'none', color: '#1f66ea', fontSize: '0.8rem', fontWeight: 'bold', textDecoration: 'underline', cursor: 'pointer', padding: 0 }}>
                  View Sample
                </button>
              </div>
              <input
                type="file"
                name="passport"
                accept="image/*,application/pdf"
                onChange={handleFileChange}
                style={{ width: '100%', marginBottom: '6px' }}
              />
              {profile.passportPath ? (
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.85rem', color: '#16a34a', fontWeight: '600' }}>✓ File Uploaded</span>
                  <a href={`${fileBaseUrl}/${profile.passportPath}`} target="_blank" rel="noreferrer" style={{ fontSize: '0.85rem', color: '#1f66ea', textDecoration: 'underline' }}>View Document</a>
                </div>
              ) : (
                <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>No document uploaded</span>
              )}
            </div>

            {/* Field 3: Visa or German Residence Proof */}
            <div style={{ marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <label style={{ fontWeight: '600', color: '#475569' }}>Visa / German Residence Proof</label>
                <button type="button" onClick={() => setActiveSample('residenceProof')} style={{ background: 'none', border: 'none', color: '#1f66ea', fontSize: '0.8rem', fontWeight: 'bold', textDecoration: 'underline', cursor: 'pointer', padding: 0 }}>
                  View Sample
                </button>
              </div>
              <input
                type="file"
                name="residenceProof"
                accept="image/*,application/pdf"
                onChange={handleFileChange}
                style={{ width: '100%', marginBottom: '6px' }}
              />
              {profile.residenceProofPath ? (
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.85rem', color: '#16a34a', fontWeight: '600' }}>✓ File Uploaded</span>
                  <a href={`${fileBaseUrl}/${profile.residenceProofPath}`} target="_blank" rel="noreferrer" style={{ fontSize: '0.85rem', color: '#1f66ea', textDecoration: 'underline' }}>View Document</a>
                </div>
              ) : (
                <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>No document uploaded</span>
              )}
            </div>

            {/* Field 4: Legal Signature Image */}
            <div style={{ marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <label style={{ fontWeight: '600', color: '#475569' }}>Legal Signature Image (White background)</label>
                <button type="button" onClick={() => setActiveSample('signature')} style={{ background: 'none', border: 'none', color: '#1f66ea', fontSize: '0.8rem', fontWeight: 'bold', textDecoration: 'underline', cursor: 'pointer', padding: 0 }}>
                  View Sample
                </button>
              </div>
              <input
                type="file"
                name="signature"
                accept="image/*"
                onChange={handleFileChange}
                style={{ width: '100%', marginBottom: '6px' }}
              />
              {profile.signaturePath ? (
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.85rem', color: '#16a34a', fontWeight: '600' }}>✓ File Uploaded</span>
                  <a href={`${fileBaseUrl}/${profile.signaturePath}`} target="_blank" rel="noreferrer" style={{ fontSize: '0.85rem', color: '#1f66ea', textDecoration: 'underline' }}>View Signature</a>
                </div>
              ) : (
                <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>No signature uploaded</span>
              )}
            </div>

            {/* Field 5: Financial Documents */}
            <div style={{ marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <label style={{ fontWeight: '600', color: '#475569' }}>Financial Documents (Payslips / Bank statement)</label>
              </div>
              <input
                type="file"
                name="financialDoc"
                accept="image/*,application/pdf"
                onChange={handleFileChange}
                style={{ width: '100%', marginBottom: '6px' }}
              />
              {profile.financialDocPath ? (
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.85rem', color: '#16a34a', fontWeight: '600' }}>✓ File Uploaded</span>
                  <a href={`${fileBaseUrl}/${profile.financialDocPath}`} target="_blank" rel="noreferrer" style={{ fontSize: '0.85rem', color: '#1f66ea', textDecoration: 'underline' }}>View Financial Document</a>
                </div>
              ) : (
                <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>No financial document uploaded</span>
              )}
            </div>

            <button type="submit" disabled={uploading} style={{ width: '100%', padding: '12px', background: '#0f172a', color: '#ffffff', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: uploading ? 'not-allowed' : 'pointer' }}>
              {uploading ? 'Uploading Documents...' : 'Upload Selected Files'}
            </button>
          </form>
        </div>

        {/* Payment Account card */}
        <div className="card" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#1e293b', marginBottom: '8px', borderBottom: '1px solid #e2e8f0', paddingBottom: '8px' }}>
            Payment Account
          </h3>
          <p style={{ color: '#64748b', fontSize: '0.85rem', marginBottom: '16px', lineHeight: '1.4' }}>
            {profile.role === 'OWNER' 
              ? 'Your verified payout account where tenants will transfer direct rent and deposits.' 
              : 'Your bank details for receiving rent refunds or security deposit returns.'}
          </p>

          {bankMessage && <div style={{ background: '#dcfce7', color: '#15803d', padding: '10px', borderRadius: '6px', marginBottom: '14px', fontSize: '0.85rem', fontWeight: '600' }}>{bankMessage}</div>}
          {bankError && <div style={{ background: '#fee2e2', color: '#b91c1c', padding: '10px', borderRadius: '6px', marginBottom: '14px', fontSize: '0.85rem', fontWeight: '600' }}>{bankError}</div>}

          <form onSubmit={handleBankSubmit}>
            <div style={{ marginBottom: '12px' }}>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '4px', color: '#475569', fontSize: '0.85rem' }}>Account Holder Name</label>
              <input
                type="text"
                placeholder="e.g. John Doe"
                value={bankAccount.accountHolder}
                onChange={(e) => setBankAccount({ ...bankAccount, accountHolder: e.target.value })}
                disabled={!canEditBank}
                required
                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }}
              />
            </div>
            <div style={{ marginBottom: '12px' }}>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '4px', color: '#475569', fontSize: '0.85rem' }}>IBAN</label>
              <input
                type="text"
                placeholder="e.g. DE89370400440532013000"
                value={bankAccount.iban}
                onChange={(e) => setBankAccount({ ...bankAccount, iban: e.target.value })}
                disabled={!canEditBank}
                required
                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }}
              />
            </div>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '4px', color: '#475569', fontSize: '0.85rem' }}>BIC / SWIFT Code</label>
              <input
                type="text"
                placeholder="e.g. DBKADEFFXXX"
                value={bankAccount.bic}
                onChange={(e) => setBankAccount({ ...bankAccount, bic: e.target.value })}
                disabled={!canEditBank}
                required
                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }}
              />
            </div>
            <button
              type="submit"
              disabled={!canEditBank}
              style={{
                width: '100%',
                padding: '12px',
                background: canEditBank ? '#10b981' : '#cbd5e1',
                color: '#ffffff',
                border: 'none',
                borderRadius: '8px',
                fontWeight: 'bold',
                cursor: canEditBank ? 'pointer' : 'not-allowed'
              }}
            >
              {canEditBank ? 'Save Payment Details' : 'Payment Account Locked'}
            </button>
            {!canEditBank && profile.role === 'OWNER' && (
              <p style={{ margin: '8px 0 0 0', fontSize: '0.78rem', color: '#ef4444', textAlign: 'center' }}>
                This payout account has already been modified once and is locked. Contact support for updates.
              </p>
            )}
          </form>
        </div>

        {/* Change Password Card */}
        <div className="card" style={{ padding: '24px', marginTop: '24px' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#1e293b', marginBottom: '8px', borderBottom: '1px solid #e2e8f0', paddingBottom: '8px' }}>
            Change Password
          </h3>
          <p style={{ color: '#64748b', fontSize: '0.85rem', marginBottom: '16px', lineHeight: '1.4' }}>
            Update your account password. For security, do not share your credentials.
          </p>

          {passwordMessage && <div style={{ background: '#dcfce7', color: '#15803d', padding: '10px', borderRadius: '6px', marginBottom: '14px', fontSize: '0.85rem', fontWeight: '600' }}>{passwordMessage}</div>}
          {passwordError && <div style={{ background: '#fee2e2', color: '#b91c1c', padding: '10px', borderRadius: '6px', marginBottom: '14px', fontSize: '0.85rem', fontWeight: '600' }}>{passwordError}</div>}

          <form onSubmit={handlePasswordChange}>
            <div style={{ marginBottom: '12px' }}>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '4px', color: '#475569', fontSize: '0.85rem' }}>Current Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                required
                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem', boxSizing: 'border-box' }}
              />
            </div>
            <div style={{ marginBottom: '12px' }}>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '4px', color: '#475569', fontSize: '0.85rem' }}>New Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem', boxSizing: 'border-box' }}
              />
            </div>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '4px', color: '#475569', fontSize: '0.85rem' }}>Confirm New Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
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
                cursor: 'pointer'
              }}
            >
              Update Password
            </button>
          </form>
        </div>
      </div>
    </div>

      {activeSample && (
        <div 
          onClick={() => setActiveSample(null)}
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
            zIndex: 9999,
            cursor: 'zoom-out'
          }}
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#ffffff',
              padding: '24px',
              borderRadius: '16px',
              maxWidth: '500px',
              width: '90%',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
              textAlign: 'center',
              position: 'relative',
              cursor: 'default'
            }}
          >
            <button 
              type="button" 
              onClick={() => setActiveSample(null)}
              style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                background: '#f1f5f9',
                border: 'none',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                cursor: 'pointer',
                fontWeight: 'bold',
                color: '#475569',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              ✕
            </button>
            <h4 style={{ margin: '0 0 16px 0', fontSize: '1.2rem', color: '#1e293b', fontWeight: '800' }}>
              {activeSample === 'photoWithPassport' && 'Sample: Self Photo holding Passport'}
              {activeSample === 'passport' && 'Sample: Passport ID Scan'}
              {activeSample === 'residenceProof' && 'Sample: Visa / German Residence Proof'}
              {activeSample === 'signature' && 'Sample: Signature on White Background'}
            </h4>
            <div style={{ display: 'flex', justifyContent: 'center', background: '#f8fafc', padding: '12px', borderRadius: '8px', border: '1px dashed #cbd5e1', marginBottom: '16px' }}>
              <img 
                src={
                  activeSample === 'photoWithPassport' ? '/sample-photo-passport.png' :
                  activeSample === 'passport' ? '/sample-passport-scan.png' :
                  activeSample === 'residenceProof' ? '/sample-residence-permit.png' :
                  '/sample-signature.png'
                } 
                alt="Sample document preview" 
                style={{ maxWidth: '100%', maxHeight: '300px', objectFit: 'contain', borderRadius: '4px' }} 
              />
            </div>
            <p style={{ margin: 0, fontSize: '0.9rem', color: '#475569', lineHeight: '1.5' }}>
              {activeSample === 'photoWithPassport' && 'Hold your open passport page beside your face. Ensure your face details and photo are fully readable.'}
              {activeSample === 'passport' && 'Provide a clear, high-resolution scan of the main photo and credentials page of your passport.'}
              {activeSample === 'residenceProof' && 'Upload a valid scan of your Schengen Visa or official German residence permit (Aufenthaltstitel).'}
              {activeSample === 'signature' && 'Upload a clear signature in black ink on a blank white sheet of paper.'}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
