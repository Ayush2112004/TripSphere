import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function LoginPage({ initialMode = 'login' }) {
  const [mode, setMode] = useState(initialMode); // 'login' | 'signup'

  // Login states
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  // Sign up states
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [showSignupPassword, setShowSignupPassword] = useState(false);

  const [agreeTerms, setAgreeTerms] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login, register } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(loginEmail, loginPassword);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password. Please verify your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!agreeTerms) {
      return setError('Please agree with the Terms & Conditions to register.');
    }

    if (signupPassword.length < 6) {
      return setError('Password must be at least 6 characters long.');
    }

    setLoading(true);
    try {
      await register({
        name: signupName,
        email: signupEmail,
        password: signupPassword,
      });
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please check details and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoFill = (role) => {
    if (role === 'traveler') {
      setLoginEmail('traveler@tripsphere.travel');
      setLoginPassword('travelerpassword123');
    } else {
      setLoginEmail('admin@tripsphere.travel');
      setLoginPassword('adminpassword123');
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-light-inverse-surface">
      {/* Full-Bleed Travel Coastline Background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <img
          src="https://lh3.googleusercontent.com/aida/ALJJyrAgiRALg10NnwH0ywQm5jwycVFn9hMRS9i1KJRnPO0cAJvRK6J514iB6buinH8aOWU_cSB9O7HOvqYQecJlKcOyHnIx_zA4gn9aCc-SqbNZnoENjstJSX0DBpEBHzsojB3WoY1fYMoulwac3Jgy-PfmIcOPDkJV6MgPQ84FMDhk2M3jb6Yxw___4sJgzzYVmSKgD2DyUj9qBevO82Hq_Q-EJ_Ce5BdZwLs18v4uL47lQeH9d5cFMSEUpRVxDu7OEAw"
          alt="TripSphere Coastline Background"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-light-scrim/35"></div>
      </div>

      {/* Frosted Top Navigation Bar (Matching User's Auth Reference) */}
      <header className="relative z-10 w-full">
        <div className="max-w-7xl mx-auto px-gutter-md md:px-gutter-lg pt-gutter-md">
          <nav
            aria-label="Authentication navigation"
            className="flex items-center justify-between px-gutter-md md:px-gutter-lg py-3 rounded-lg bg-light-scrim/55 backdrop-blur-md border border-light-surface/20 shadow-sm"
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

            {/* Back to Home Button */}
            <Link
              to="/"
              className="inline-flex items-center gap-gutter-xs px-gutter-md py-2 rounded border border-light-surface/35 bg-light-surface/10 text-light-on-primary hover:bg-light-surface/20 font-label text-label-md transition-colors duration-state-change"
            >
              <span className="material-symbols-outlined text-body-lg" aria-hidden="true">
                arrow_back
              </span>
              <span data-design-text-token="label-md">Back to Home</span>
            </Link>
          </nav>
        </div>
      </header>

      {/* Centered Dark Frosted-Glass Form Card */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-gutter-md py-gutter-xl">
        <section className="w-full max-w-md rounded-lg bg-light-scrim/25 backdrop-blur-md border border-light-surface/30 shadow-2xl p-gutter-lg md:p-gutter-xl flex flex-col gap-gutter-lg">
          {/* Centered Form Title */}
          <h1
            id="auth-heading"
            className="text-center font-headline text-headline-md text-light-on-primary"
            data-design-text-token="headline-md"
          >
            {mode === 'login' ? 'Login Form' : 'Sign Up Form'}
          </h1>

          {/* Minimal Login / Sign Up Switcher Tabs */}
          <div
            role="tablist"
            aria-label="Authentication mode"
            className="grid grid-cols-2 gap-gutter-xs p-gutter-xs rounded-md bg-light-scrim/40 border border-light-surface/25"
          >
            <button
              role="tab"
              id="tab-login"
              aria-selected={mode === 'login'}
              aria-controls="panel-login"
              tabIndex={mode === 'login' ? 0 : -1}
              onClick={() => {
                setMode('login');
                setError('');
              }}
              className={`py-2 rounded font-label text-label-md transition-colors duration-state-change cursor-pointer ${
                mode === 'login'
                  ? 'bg-light-surface text-light-on-surface font-semibold shadow-sm'
                  : 'text-light-on-primary hover:bg-light-surface/10'
              }`}
            >
              <span data-design-text-token="label-md">Login</span>
            </button>
            <button
              role="tab"
              id="tab-signup"
              aria-selected={mode === 'signup'}
              aria-controls="panel-signup"
              tabIndex={mode === 'signup' ? 0 : -1}
              onClick={() => {
                setMode('signup');
                setError('');
              }}
              className={`py-2 rounded font-label text-label-md transition-colors duration-state-change cursor-pointer ${
                mode === 'signup'
                  ? 'bg-light-surface text-light-on-surface font-semibold shadow-sm'
                  : 'text-light-on-primary hover:bg-light-surface/10'
              }`}
            >
              <span data-design-text-token="label-md">Sign Up</span>
            </button>
          </div>

          {/* Error notification banner */}
          {error && (
            <div className="p-3 rounded bg-light-error-container/90 border border-light-error/40 text-light-on-error-container text-body-sm font-label flex items-center gap-2">
              <span className="material-symbols-outlined text-body-lg">error</span>
              <span>{error}</span>
            </div>
          )}

          {/* LOGIN PANEL */}
          {mode === 'login' && (
            <div role="tabpanel" id="panel-login" aria-labelledby="tab-login" tabIndex="0" className="flex flex-col gap-gutter-md">
              <form onSubmit={handleLoginSubmit} id="login-form" className="flex flex-col gap-gutter-md">
                <div>
                  <label htmlFor="login-email" className="sr-only">
                    Your Email Address
                  </label>
                  <input
                    id="login-email"
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="Your Email Address"
                    className="w-full rounded border-0 bg-light-surface px-gutter-md py-3 text-body-md text-light-on-surface placeholder:text-light-on-surface-variant focus:ring-2 focus:ring-light-primary-container outline-none"
                  />
                </div>

                <div className="relative flex items-center">
                  <label htmlFor="login-password" className="sr-only">
                    Your Password
                  </label>
                  <input
                    id="login-password"
                    type={showLoginPassword ? 'text' : 'password'}
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Your Password"
                    className="w-full rounded border-0 bg-light-surface pl-gutter-md pr-11 py-3 text-body-md text-light-on-surface placeholder:text-light-on-surface-variant focus:ring-2 focus:ring-light-primary-container outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowLoginPassword(!showLoginPassword)}
                    aria-label={showLoginPassword ? 'Hide password' : 'Show password'}
                    className="absolute right-2.5 inline-flex items-center justify-center w-8 h-8 rounded text-light-on-surface-variant hover:text-light-on-surface cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-body-lg" aria-hidden="true">
                      {showLoginPassword ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>

                <div className="flex items-center justify-between gap-gutter-sm">
                  <label className="flex items-center gap-gutter-sm cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={agreeTerms}
                      onChange={(e) => setAgreeTerms(e.target.checked)}
                      className="rounded border-light-surface/40 bg-light-surface text-light-primary-container focus:ring-light-primary-container"
                    />
                    <span className="font-body text-body-sm text-light-on-primary" data-design-text-token="body-sm">
                      Agree with <span className="underline">Terms &amp; Conditions</span>
                    </span>
                  </label>
                  <Link
                    to="/forgot-password"
                    className="font-label text-label-sm text-light-on-primary underline hover:text-light-inverse-primary"
                    data-design-text-token="label-sm"
                  >
                    Forgot?
                  </Link>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  data-component-id="button-primary"
                  data-component-type="button"
                  data-component-variant="primary"
                  className="w-full inline-flex items-center justify-center py-3 rounded bg-light-primary-container text-light-on-primary-container hover:bg-light-primary font-label text-label-lg transition-colors duration-state-change cursor-pointer shadow-sm"
                >
                  <span data-design-text-token="label-lg">
                    {loading ? 'Signing in...' : 'Login'}
                  </span>
                </button>
              </form>

              {/* Quick Fill Demo Helpers */}
              <div className="pt-gutter-sm border-t border-light-surface/20 flex flex-col gap-1.5">
                <span className="text-center font-label text-label-xs text-light-on-primary/70 uppercase tracking-wider">
                  Quick Demo Accounts
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => handleDemoFill('traveler')}
                    className="py-1.5 px-2 rounded bg-light-surface/15 hover:bg-light-surface/25 text-light-on-primary font-label text-label-xs transition-colors cursor-pointer text-center"
                  >
                    Demo Traveler
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDemoFill('admin')}
                    className="py-1.5 px-2 rounded bg-light-surface/15 hover:bg-light-surface/25 text-light-on-primary font-label text-label-xs transition-colors cursor-pointer text-center"
                  >
                    Demo Admin
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* SIGN UP PANEL */}
          {mode === 'signup' && (
            <div role="tabpanel" id="panel-signup" aria-labelledby="tab-signup" tabIndex="0" className="flex flex-col gap-gutter-md">
              <form onSubmit={handleSignupSubmit} id="signup-form" className="flex flex-col gap-gutter-md">
                <div>
                  <label htmlFor="signup-name" className="sr-only">
                    Your Full Name
                  </label>
                  <input
                    id="signup-name"
                    type="text"
                    required
                    value={signupName}
                    onChange={(e) => setSignupName(e.target.value)}
                    placeholder="Your Full Name"
                    className="w-full rounded border-0 bg-light-surface px-gutter-md py-3 text-body-md text-light-on-surface placeholder:text-light-on-surface-variant focus:ring-2 focus:ring-light-primary-container outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="signup-email" className="sr-only">
                    Your Email Address
                  </label>
                  <input
                    id="signup-email"
                    type="email"
                    required
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    placeholder="Your Email Address"
                    className="w-full rounded border-0 bg-light-surface px-gutter-md py-3 text-body-md text-light-on-surface placeholder:text-light-on-surface-variant focus:ring-2 focus:ring-light-primary-container outline-none"
                  />
                </div>

                <div className="relative flex items-center">
                  <label htmlFor="signup-password" className="sr-only">
                    Create Password
                  </label>
                  <input
                    id="signup-password"
                    type={showSignupPassword ? 'text' : 'password'}
                    required
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    placeholder="Create Password"
                    className="w-full rounded border-0 bg-light-surface pl-gutter-md pr-11 py-3 text-body-md text-light-on-surface placeholder:text-light-on-surface-variant focus:ring-2 focus:ring-light-primary-container outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowSignupPassword(!showSignupPassword)}
                    aria-label={showSignupPassword ? 'Hide password' : 'Show password'}
                    className="absolute right-2.5 inline-flex items-center justify-center w-8 h-8 rounded text-light-on-surface-variant hover:text-light-on-surface cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-body-lg" aria-hidden="true">
                      {showSignupPassword ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>

                <label className="flex items-center gap-gutter-sm cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="rounded border-light-surface/40 bg-light-surface text-light-primary-container focus:ring-light-primary-container"
                  />
                  <span className="font-body text-body-sm text-light-on-primary" data-design-text-token="body-sm">
                    Agree with <span className="underline">Terms &amp; Conditions</span>
                  </span>
                </label>

                <button
                  type="submit"
                  disabled={loading}
                  data-component-id="button-primary"
                  data-component-type="button"
                  data-component-variant="primary"
                  className="w-full inline-flex items-center justify-center py-3 rounded bg-light-primary-container text-light-on-primary-container hover:bg-light-primary font-label text-label-lg transition-colors duration-state-change cursor-pointer shadow-sm"
                >
                  <span data-design-text-token="label-lg">
                    {loading ? 'Creating Account...' : 'Sign Up'}
                  </span>
                </button>
              </form>
            </div>
          )}
        </section>
      </main>

      {/* Minimal Footer (Matching Reference) */}
      <footer className="relative z-10 py-gutter-md px-gutter-md text-center">
        <p className="font-body text-body-sm text-light-on-primary" data-design-text-token="body-sm">
          &copy; 2027 TripSphere Travel Inc. &middot; ATOL &amp; IATA Protected
        </p>
      </footer>
    </div>
  );
}
