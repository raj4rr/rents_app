import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import ListingsPage from './pages/ListingsPage';
import BookingPage from './pages/BookingPage';
import AdminOwnerEntryPage from './pages/AdminOwnerEntryPage';
import LoginPage from './pages/LoginPage';
import ListingViewPage from './pages/ListingViewPage';
import RegisterPage from './pages/RegisterPage';
import ManageEntityEditPage from './pages/ManageEntityEditPage';
import './App.css';

function ProtectedRoute({ children }) {
  const token = localStorage.getItem('auth_token');
  if (!token) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<ListingsPage />} />
          <Route path="/listings" element={<ListingsPage />} />
          <Route path="/listing/:id" element={<ListingViewPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/book" element={<ProtectedRoute><BookingPage /></ProtectedRoute>} />
          <Route path="/manage-entry" element={<ProtectedRoute><AdminOwnerEntryPage /></ProtectedRoute>} />
          <Route path="/manage-entry/edit/:entity/:id" element={<ProtectedRoute><ManageEntityEditPage /></ProtectedRoute>} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
