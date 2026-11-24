import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    setUserDropdownOpen(false);
    navigate('/');
  };

  return (
    <header id="main-navbar" className="sticky top-0 z-40 w-full transition-colors duration-surface-enter">
      <div className="max-w-7xl mx-auto px-gutter-md md:px-gutter-lg pt-gutter-md pb-gutter-sm">
        <nav
          aria-label="Primary navigation"
          className="flex items-center justify-between gap-gutter-md px-gutter-md md:px-gutter-lg py-3 rounded-lg bg-light-scrim/55 backdrop-blur-md border border-light-surface/20 shadow-sm"
        >
          {/* TripSphere Logo */}
          <Link
            to="/"
            className="flex items-center gap-gutter-sm text-light-on-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-light-on-primary rounded"
          >
            <span className="inline-flex items-center justify-center w-9 h-9 rounded-md bg-light-primary-container text-light-on-primary-container">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"></circle>
                <path d="M3.6 9h16.8M3.6 15h16.8" stroke="currentColor" strokeWidth="1.6"></path>
                <ellipse cx="12" cy="12" rx="4.2" ry="9" stroke="currentColor" strokeWidth="1.6"></ellipse>
                <path d="M16.5 6.5l2-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"></path>
              </svg>
            </span>
            <span className="font-headline text-title-lg tracking-tight" data-design-text-token="title-lg">
              TripSphere
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-gutter-lg">
            <Link
              to="/flights"
              className="font-label text-label-lg text-light-on-primary hover:text-light-inverse-primary transition-colors duration-state-change"
              data-design-text-token="label-lg"
            >
              Flights
            </Link>
            <Link
              to="/hotels"
              className="font-label text-label-lg text-light-on-primary hover:text-light-inverse-primary transition-colors duration-state-change"
              data-design-text-token="label-lg"
            >
              Hotels
            </Link>
            <Link
              to="/holidays"
              className="font-label text-label-lg text-light-on-primary hover:text-light-inverse-primary transition-colors duration-state-change"
              data-design-text-token="label-lg"
            >
              Holidays
            </Link>
            <Link
              to="/my-trips"
              className="font-label text-label-lg text-light-on-primary hover:text-light-inverse-primary transition-colors duration-state-change"
              data-design-text-token="label-lg"
            >
              My Trips
            </Link>
            {isAdmin && (
              <Link
                to="/admin"
                className="font-label text-label-lg text-amber-star hover:text-amber-300 transition-colors duration-state-change flex items-center gap-1"
                data-design-text-token="label-lg"
              >
                <span className="material-symbols-outlined text-body-md" aria-hidden="true">admin_panel_settings</span>
                Admin
              </Link>
            )}
          </div>

          {/* Auth Buttons / User Profile Menu & Mobile Menu Toggle */}
          <div className="flex items-center gap-gutter-sm">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-light-surface/30 bg-light-surface/10 text-light-on-primary hover:bg-light-surface/20 transition-colors cursor-pointer"
                >
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-light-primary-container text-light-on-primary-container font-headline text-body-sm font-bold uppercase">
                    {user?.name ? user.name.charAt(0) : 'U'}
                  </span>
                  <span className="hidden sm:inline font-label text-label-md max-w-[120px] truncate">
                    {user?.name || 'Account'}
                  </span>
                  <span className="material-symbols-outlined text-body-md" aria-hidden="true">expand_more</span>
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-48 rounded-md bg-light-surface border border-light-outline-variant shadow-xl py-1 z-50 animate-fadeIn"
                    onMouseLeave={() => setUserDropdownOpen(false)}
                  >
                    <div className="px-4 py-2 border-b border-light-outline-variant">
                      <p className="font-label text-label-md text-light-on-surface truncate">{user?.name}</p>
                      <p className="font-body text-body-sm text-light-on-surface-variant truncate">{user?.email}</p>
                    </div>
                    <Link
                      to="/my-trips"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-label-md text-light-on-surface hover:bg-light-surface-container-low transition-colors"
                    >
                      <span className="material-symbols-outlined text-body-lg text-light-on-surface-variant">luggage</span>
                      My Trips
                    </Link>
                    <Link
                      to="/profile"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-label-md text-light-on-surface hover:bg-light-surface-container-low transition-colors"
                    >
                      <span className="material-symbols-outlined text-body-lg text-light-on-surface-variant">person</span>
                      My Profile
                    </Link>
                    {isAdmin && (
                      <Link
                        to="/admin"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-label-md text-light-primary-container hover:bg-light-surface-container-low transition-colors"
                      >
                        <span className="material-symbols-outlined text-body-lg">dashboard</span>
                        Admin Dashboard
                      </Link>
                    )}
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-2 text-label-md text-light-error hover:bg-light-error-container/40 transition-colors text-left cursor-pointer border-t border-light-outline-variant"
                    >
                      <span className="material-symbols-outlined text-body-lg">logout</span>
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="hidden sm:inline-flex items-center justify-center px-gutter-md py-2 rounded border border-light-surface/40 bg-light-surface/10 text-light-on-primary hover:bg-light-surface/20 transition-colors duration-state-change cursor-pointer"
                >
                  <span className="font-label text-label-lg" data-design-text-token="label-lg">
                    Login
                  </span>
                </Link>
                <Link
                  to="/register"
                  className="hidden sm:inline-flex items-center justify-center px-gutter-md py-2 rounded bg-light-primary-container text-light-on-primary-container hover:bg-light-primary transition-colors duration-state-change cursor-pointer"
                >
                  <span className="font-label text-label-lg" data-design-text-token="label-lg">
                    Sign Up
                  </span>
                </Link>
              </>
            )}

            {/* Mobile menu button */}
            <button
              id="mobile-menu-btn"
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Open navigation menu"
              aria-expanded={mobileMenuOpen}
              className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded border border-light-surface/30 text-light-on-primary hover:bg-light-surface/15 transition-colors duration-state-change cursor-pointer"
            >
              <span className="material-symbols-outlined text-title-lg" aria-hidden="true">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </nav>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div
            id="mobile-menu"
            className="lg:hidden mt-gutter-sm rounded-lg bg-light-surface border border-light-outline-variant p-gutter-md shadow-xl animate-fadeIn"
          >
            <div className="flex flex-col gap-gutter-sm">
              <Link
                to="/flights"
                onClick={() => setMobileMenuOpen(false)}
                className="px-gutter-sm py-2 rounded font-label text-label-lg text-light-on-surface hover:bg-light-surface-container-low"
                data-design-text-token="label-lg"
              >
                Flights
              </Link>
              <Link
                to="/hotels"
                onClick={() => setMobileMenuOpen(false)}
                className="px-gutter-sm py-2 rounded font-label text-label-lg text-light-on-surface hover:bg-light-surface-container-low"
                data-design-text-token="label-lg"
              >
                Hotels
              </Link>
              <Link
                to="/holidays"
                onClick={() => setMobileMenuOpen(false)}
                className="px-gutter-sm py-2 rounded font-label text-label-lg text-light-on-surface hover:bg-light-surface-container-low"
                data-design-text-token="label-lg"
              >
                Holidays
              </Link>
              <Link
                to="/my-trips"
                onClick={() => setMobileMenuOpen(false)}
                className="px-gutter-sm py-2 rounded font-label text-label-lg text-light-on-surface hover:bg-light-surface-container-low"
                data-design-text-token="label-lg"
              >
                My Trips
              </Link>
              {isAdmin && (
                <Link
                  to="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-gutter-sm py-2 rounded font-label text-label-lg text-light-primary-container hover:bg-light-surface-container-low"
                  data-design-text-token="label-lg"
                >
                  Admin Dashboard
                </Link>
              )}

              <div className="flex items-center gap-gutter-sm pt-gutter-sm border-t border-light-outline-variant">
                {isAuthenticated ? (
                  <>
                    <Link
                      to="/profile"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex-1 py-2.5 text-center rounded border border-light-outline-variant text-light-on-surface font-label text-label-lg cursor-pointer hover:bg-light-surface-container-low"
                    >
                      Profile
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        handleLogout();
                        setMobileMenuOpen(false);
                      }}
                      className="flex-1 py-2.5 rounded bg-light-error text-light-on-error font-label text-label-lg cursor-pointer"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex-1 py-2.5 text-center rounded border border-light-outline-variant text-light-on-surface font-label text-label-lg cursor-pointer hover:bg-light-surface-container-low"
                    >
                      <span data-design-text-token="label-lg">Login</span>
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex-1 py-2.5 text-center rounded bg-light-primary-container text-light-on-primary-container font-label text-label-lg cursor-pointer hover:bg-light-primary"
                    >
                      <span data-design-text-token="label-lg">Sign Up</span>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

