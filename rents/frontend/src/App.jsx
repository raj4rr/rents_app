import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import ListingsPage from './pages/ListingsPage';
import ListingsShortTerm from './pages/ListingsShortTerm';
import ListingsLongTerm from './pages/ListingsLongTerm';
import BookingShortPage from './pages/BookingShortPage';
import BookingLongPage from './pages/BookingLongPage';
import BookingPage from './pages/BookingPage';
import AdminOwnerEntryPage from './pages/AdminOwnerEntryPage';
import BookingRequestsPage from './pages/BookingRequestsPage';
import MyEntriesPage from './pages/MyEntriesPage';
import CreateEntryPage from './pages/CreateEntryPage';
import ManageRecordsPage from './pages/ManageRecordsPage';
import OwnerBankAccountPage from './pages/OwnerBankAccountPage';
import LoginPage from './pages/LoginPage';
import ListingViewPage from './pages/ListingViewPage';
import RegisterPage from './pages/RegisterPage';
import ManageEntityEditPage from './pages/ManageEntityEditPage';
import BookingPaymentPage from './pages/BookingPaymentPage';
import FAQPage from './pages/FAQPage';
import ProfilePage from './pages/ProfilePage';
import HowItWorksPage from './pages/HowItWorksPage';
import AboutPage from './pages/AboutPage';
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
          <Route path="/listings/short" element={<ListingsShortTerm />} />
          <Route path="/listings/long" element={<ListingsLongTerm />} />
          <Route path="/listing/:id" element={<ListingViewPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/book" element={<Navigate to="/book/short" replace />} />
          <Route path="/book/short" element={<ProtectedRoute><BookingShortPage /></ProtectedRoute>} />
          <Route path="/book/long" element={<ProtectedRoute><BookingLongPage /></ProtectedRoute>} />
          <Route path="/booking-payment/:bookingId" element={<ProtectedRoute><BookingPaymentPage /></ProtectedRoute>} />
          <Route path="/manage-entry" element={<ProtectedRoute><AdminOwnerEntryPage /></ProtectedRoute>} />
          <Route path="/manage-entry/my-bookings" element={<ProtectedRoute><BookingRequestsPage /></ProtectedRoute>} />
          <Route path="/manage-entry/booking-requests" element={<ProtectedRoute><BookingRequestsPage /></ProtectedRoute>} />
          <Route path="/manage-entry/my-entries" element={<ProtectedRoute><MyEntriesPage /></ProtectedRoute>} />
          <Route path="/manage-entry/create" element={<ProtectedRoute><CreateEntryPage /></ProtectedRoute>} />
          <Route path="/manage-entry/records" element={<ProtectedRoute><ManageRecordsPage /></ProtectedRoute>} />
          <Route path="/manage-entry/bank-account" element={<ProtectedRoute><OwnerBankAccountPage /></ProtectedRoute>} />
          <Route path="/manage-entry/edit/:entity/:id" element={<ProtectedRoute><ManageEntityEditPage /></ProtectedRoute>} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
