import { Navigate } from 'react-router-dom';

export default function AdminOwnerEntryPage() {
  const user = (() => {
    try { return JSON.parse(localStorage.getItem('auth_user') || '{}'); } catch { return {}; }
  })();
  const canManageEntries = ['OWNER', 'ADMIN'].includes(user?.role);

  if (canManageEntries) {
    return <Navigate to="/manage-entry/booking-requests" replace />;
  }
  return <Navigate to="/manage-entry/my-bookings" replace />;
}
