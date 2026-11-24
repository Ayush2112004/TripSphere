import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

export default function MainLayout() {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const isAuth = ['/login', '/register', '/forgot-password'].includes(location.pathname);

  // Auth pages render their own full-bleed background, navigation and minimal footer
  if (isAuth) {
    return <Outlet />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-light-surface text-light-on-surface font-body antialiased selection:bg-light-primary-container selection:text-light-on-primary">
      {/* On non-home pages, provide top navbar with dark header backing */}
      {!isHome && (
        <div className="bg-light-inverse-surface">
          <Navbar />
        </div>
      )}

      {/* Routed Page Content */}
      <div className="flex-1">
        <Outlet />
      </div>

      {/* Professional Footer on all pages */}
      <Footer />
    </div>
  );
}

