import { NavLink, useLocation, useNavigate } from 'react-router-dom';

export default function Layout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem('auth_token');
  const isLoginPage = location.pathname === '/login';

  const logout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
    navigate('/login');
  };

  return (
    <div className="app-shell">
      {!isLoginPage && (
        <header className="topbar">
          <h1>RentStack Inventory</h1>
          <nav>
            <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>All Listings</NavLink>
            <NavLink to="/listings/short" className={({ isActive }) => (isActive ? 'active' : '')}>Short-term</NavLink>
            <NavLink to="/listings/long" className={({ isActive }) => (isActive ? 'active' : '')}>Long-term</NavLink>
            <NavLink to="/faq" className={({ isActive }) => (isActive ? 'active' : '')}>FAQ</NavLink>
            <NavLink to="/how-it-works" className={({ isActive }) => (isActive ? 'active' : '')}>How It Works</NavLink>
            <NavLink to="/about" className={({ isActive }) => (isActive ? 'active' : '')}>About Us</NavLink>
            {token && <NavLink to="/manage-entry" className={({ isActive }) => (isActive ? 'active' : '')}>Entry & Booking Management</NavLink>}
            {token && <NavLink to="/profile" className={({ isActive }) => (isActive ? 'active' : '')}>Profile</NavLink>}
            {!token && <NavLink to="/login">Login</NavLink>}
            {token && <button className="logout-btn" onClick={logout} type="button">Logout</button>}
          </nav>
        </header>
      )}
      <main>{children}</main>
      {!isLoginPage && (
        <footer className="footer" style={{ marginTop: '60px', padding: '32px 20px', borderTop: '1px solid var(--border-color, #e2e8f0)', background: 'var(--bg-card, #f8fafc)', textAlign: 'center', fontSize: '0.9rem', color: '#64748b' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
            <div style={{ fontWeight: '700', fontSize: '1.1rem', color: '#0f172a', letterSpacing: '-0.02em' }}>
              RentStack Inventory
            </div>
            <div>
              Official Website:{' '}
              <a 
                href="https://rentstackinventory.com/" 
                target="_blank" 
                rel="noopener noreferrer" 
                style={{ color: '#2563eb', fontWeight: '600', textDecoration: 'none' }}
              >
                https://rentstackinventory.com/
              </a>
            </div>
            <p style={{ margin: 0, fontSize: '0.85rem', color: '#94a3b8' }}>
              © {new Date().getFullYear()} RentStack Inventory. All rights reserved. Vetted room & bed coliving ecosystem.
            </p>
          </div>
        </footer>
      )}
    </div>
  );
}
