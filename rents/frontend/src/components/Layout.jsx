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
    </div>
  );
}
