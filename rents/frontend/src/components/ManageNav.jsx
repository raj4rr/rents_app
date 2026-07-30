import { NavLink } from 'react-router-dom';

export default function ManageNav() {
  const user = (() => {
    try { return JSON.parse(localStorage.getItem('auth_user') || '{}'); } catch { return {}; }
  })();
  const canManageEntries = ['OWNER', 'ADMIN'].includes(user?.role);
  const isAdmin = user?.role === 'ADMIN';

  return (
    <div className="tab-bar" style={{ marginBottom: '24px', flexWrap: 'wrap' }}>
      <NavLink
        to="/manage-entry/my-bookings"
        className={({ isActive }) => `tab-btn ${isActive ? 'active' : ''}`}
      >
        My Bookings
      </NavLink>
      
      {canManageEntries && (
        <NavLink
          to="/manage-entry/booking-requests"
          className={({ isActive }) => `tab-btn ${isActive ? 'active' : ''}`}
        >
          Booking Requests
        </NavLink>
      )}

      {canManageEntries && (
        <NavLink
          to="/manage-entry/my-entries"
          className={({ isActive }) => `tab-btn ${isActive ? 'active' : ''}`}
        >
          My Entries
        </NavLink>
      )}

      {canManageEntries && (
        <NavLink
          to="/manage-entry/create"
          className={({ isActive }) => `tab-btn ${isActive ? 'active' : ''}`}
        >
          Create Entry
        </NavLink>
      )}

      {canManageEntries && (
        <NavLink
          to="/manage-entry/records"
          className={({ isActive }) => `tab-btn ${isActive ? 'active' : ''}`}
        >
          Manage Records
        </NavLink>
      )}

      {canManageEntries && (
        <NavLink
          to="/manage-entry/bank-account"
          className={({ isActive }) => `tab-btn ${isActive ? 'active' : ''}`}
        >
          {isAdmin ? 'Admin Bank Account' : 'Owner Bank Account'}
        </NavLink>
      )}

      {isAdmin && (
        <NavLink
          to="/manage-entry/system-settings"
          className={({ isActive }) => `tab-btn ${isActive ? 'active' : ''}`}
        >
          Global System Settings
        </NavLink>
      )}

      {isAdmin && (
        <NavLink
          to="/manage-entry/owner-fees"
          className={({ isActive }) => `tab-btn ${isActive ? 'active' : ''}`}
        >
          Dynamic Owner Fees
        </NavLink>
      )}
    </div>
  );
}
