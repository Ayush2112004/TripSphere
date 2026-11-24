import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { BookingProvider } from './context/BookingContext';
import MainLayout from './layouts/MainLayout';

// Pages
import HomePage from './pages/HomePage';
import FlightSearchPage from './pages/FlightSearchPage';
import FlightDetailsPage from './pages/FlightDetailsPage';
import HotelSearchPage from './pages/HotelSearchPage';
import HotelDetailsPage from './pages/HotelDetailsPage';
import HolidayPackagesPage from './pages/HolidayPackagesPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import CheckoutPage from './pages/CheckoutPage';
import PaymentPage from './pages/PaymentPage';
import MyTripsPage from './pages/MyTripsPage';
import ProfilePage from './pages/ProfilePage';
import AdminDashboardPage from './pages/AdminDashboardPage';

// Protected Route Component
const ProtectedRoute = ({ children, message = 'Please sign in to proceed with your booking.' }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="py-section text-center">
        <span className="material-symbols-outlined text-headline-lg text-light-primary-container animate-spin">
          progress_activity
        </span>
      </div>
    );
  }
  return isAuthenticated ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location, message }} replace />
  );
};

export default function App() {
  return (
    <AuthProvider>
      <BookingProvider>
        <Router>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              {/* Public Routes */}
              <Route index element={<HomePage />} />
              <Route path="flights" element={<FlightSearchPage />} />
              <Route path="flights/:id" element={<FlightDetailsPage />} />
              <Route path="hotels" element={<HotelSearchPage />} />
              <Route path="hotels/:id" element={<HotelDetailsPage />} />
              <Route path="holidays" element={<HolidayPackagesPage />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="register" element={<RegisterPage />} />
              <Route path="forgot-password" element={<ForgotPasswordPage />} />

              {/* Checkout & Payment Flows (Protected: requires login to book) */}
              <Route
                path="checkout"
                element={
                  <ProtectedRoute message="Please sign in or create an account to proceed with your booking.">
                    <CheckoutPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="payment"
                element={
                  <ProtectedRoute message="Please sign in to proceed with your payment.">
                    <PaymentPage />
                  </ProtectedRoute>
                }
              />

              {/* Protected User Routes */}
              <Route
                path="my-trips"
                element={
                  <ProtectedRoute>
                    <MyTripsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="profile"
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                }
              />

              {/* Admin Console */}
              <Route
                path="admin"
                element={
                  <ProtectedRoute>
                    <AdminDashboardPage />
                  </ProtectedRoute>
                }
              />

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </Router>
      </BookingProvider>
    </AuthProvider>
  );
}

