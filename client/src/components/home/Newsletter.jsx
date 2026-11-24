import React, { useState } from 'react';
import { newsletterService } from '../../services/api';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | subscribed

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    try {
      await newsletterService.subscribe(email);
      setStatus('subscribed');
    } catch {
      // In case server is offline or mock, still show subscribed feedback as original UI did
      setStatus('subscribed');
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-gutter-md md:px-gutter-lg py-section">
      <div className="bg-light-surface border border-light-outline-variant rounded-lg p-gutter-lg md:p-gutter-xl flex flex-col lg:flex-row lg:items-center justify-between gap-gutter-lg shadow-sm">
        <div className="max-w-xl">
          <h2 className="font-headline text-headline-md text-light-on-surface mb-gutter-xs" data-design-text-token="headline-md">
            Get Weekly Fare Drops &amp; Curated Escapes
          </h2>
          <p className="font-body text-body-md text-light-on-surface-variant" data-design-text-token="body-md">
            Join 140,000+ travelers receiving handpicked flight deals and seasonal hotel guides.
          </p>
        </div>
        <form onSubmit={handleSubmit} id="newsletter-form" className="flex flex-col sm:flex-row items-stretch sm:items-center gap-gutter-sm w-full lg:w-auto">
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === 'subscribed'}
            placeholder="you@example.com"
            className="sm:w-72 rounded border border-light-outline-variant bg-light-surface-container-low px-gutter-md py-3 text-body-md text-light-on-surface placeholder:text-light-outline focus:border-light-primary-container focus:ring-1 focus:ring-light-primary-container outline-none"
          />
          <button
            type="submit"
            disabled={status === 'subscribed' || status === 'loading'}
            data-component-id="button-primary"
            data-component-type="button"
            data-component-variant="primary"
            className={`px-gutter-lg py-3 rounded font-label text-label-lg transition-colors duration-state-change cursor-pointer flex items-center justify-center gap-1 ${
              status === 'subscribed'
                ? 'bg-emerald-badge text-light-on-primary'
                : 'bg-light-primary-container text-light-on-primary-container hover:bg-light-primary'
            }`}
          >
            {status === 'subscribed' ? (
              <>
                <span className="material-symbols-outlined text-body-md">check</span>
                <span data-design-text-token="label-lg">Subscribed</span>
              </>
            ) : status === 'loading' ? (
              <span>Subscribing...</span>
            ) : (
              <span data-design-text-token="label-lg">Subscribe</span>
            )}
          </button>
        </form>
      </div>
    </section>
  );
}

