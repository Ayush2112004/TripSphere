import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
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

      {/* Frosted Top Navigation Bar */}
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
              to="/login"
              className="inline-flex items-center gap-gutter-xs px-gutter-md py-2 rounded border border-light-surface/35 bg-light-surface/10 text-light-on-primary hover:bg-light-surface/20 font-label text-label-md transition-colors duration-state-change"
            >
              <span className="material-symbols-outlined text-body-lg" aria-hidden="true">
                arrow_back
              </span>
              <span data-design-text-token="label-md">Back to Login</span>
            </Link>
          </nav>
        </div>
      </header>

      {/* Centered Frosted-Glass Card */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-gutter-md py-gutter-xl">
        <section className="w-full max-w-md rounded-lg bg-light-scrim/25 backdrop-blur-md border border-light-surface/30 shadow-2xl p-gutter-lg md:p-gutter-xl flex flex-col gap-gutter-lg">
          <h1 className="text-center font-headline text-headline-md text-light-on-primary" data-design-text-token="headline-md">
            Reset Password
          </h1>

          {submitted ? (
            <div className="p-gutter-md rounded bg-light-surface/20 border border-light-surface/30 text-light-on-primary text-center flex flex-col items-center gap-3">
              <span className="material-symbols-outlined text-headline-lg text-emerald-badge">mark_email_read</span>
              <p className="font-label text-label-md">
                Reset link sent to <strong>{email}</strong>
              </p>
              <p className="font-body text-body-sm text-light-on-primary/80">
                Please check your inbox (and spam folder) for the password reset instructions.
              </p>
              <Link
                to="/login"
                className="mt-2 inline-flex items-center gap-1 font-label text-label-md text-light-primary-container underline"
              >
                Back to Sign In
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-gutter-md">
              <p className="font-body text-body-sm text-light-on-primary/85 text-center">
                Enter your registered email address to receive password reset instructions.
              </p>

              <div>
                <label htmlFor="reset-email" className="sr-only">
                  Email Address
                </label>
                <input
                  id="reset-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your Email Address"
                  className="w-full rounded border-0 bg-light-surface px-gutter-md py-3 text-body-md text-light-on-surface placeholder:text-light-on-surface-variant focus:ring-2 focus:ring-light-primary-container outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center py-3 rounded bg-light-primary-container text-light-on-primary-container hover:bg-light-primary font-label text-label-lg transition-colors cursor-pointer shadow-sm"
              >
                Send Reset Link
              </button>

              <div className="text-center mt-1">
                <Link
                  to="/login"
                  className="inline-flex items-center gap-1 font-label text-label-sm text-light-on-primary/85 hover:text-light-on-primary underline"
                >
                  Remembered your password? Login
                </Link>
              </div>
            </form>
          )}
        </section>
      </main>

      {/* Minimal Footer */}
      <footer className="relative z-10 py-gutter-md px-gutter-md text-center">
        <p className="font-body text-body-sm text-light-on-primary" data-design-text-token="body-sm">
          &copy; 2027 TripSphere Travel Inc. &middot; ATOL &amp; IATA Protected
        </p>
      </footer>
    </div>
  );
}
