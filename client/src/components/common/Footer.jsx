import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-light-inverse-surface text-light-inverse-on-surface">
      <div className="max-w-7xl mx-auto px-gutter-md md:px-gutter-lg py-section">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter-xl pb-gutter-xl border-b border-light-surface/15">
          <div className="md:col-span-4 flex flex-col gap-gutter-md">
            <div className="flex items-center gap-gutter-sm">
              <span className="inline-flex items-center justify-center w-9 h-9 rounded-md bg-light-primary-container text-light-on-primary-container">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"></circle>
                  <path d="M3.6 9h16.8M3.6 15h16.8" stroke="currentColor" strokeWidth="1.6"></path>
                  <ellipse cx="12" cy="12" rx="4.2" ry="9" stroke="currentColor" strokeWidth="1.6"></ellipse>
                </svg>
              </span>
              <span className="font-headline text-title-lg" data-design-text-token="title-lg">
                TripSphere
              </span>
            </div>
            <p className="font-body text-body-md text-light-inverse-on-surface/75 max-w-xs" data-design-text-token="body-md">
              Modern travel booking for curated flights, boutique stays, and seamless holiday packages worldwide.
            </p>
          </div>

          <div className="md:col-span-2 flex flex-col gap-gutter-sm">
            <h3 className="font-label text-label-lg" data-design-text-token="label-lg">
              Explore
            </h3>
            <Link
              to="/flights"
              className="font-body text-body-md text-light-inverse-on-surface/75 hover:text-light-inverse-on-surface transition-colors"
              data-design-text-token="body-md"
            >
              Flights
            </Link>
            <Link
              to="/hotels"
              className="font-body text-body-md text-light-inverse-on-surface/75 hover:text-light-inverse-on-surface transition-colors"
              data-design-text-token="body-md"
            >
              Hotels
            </Link>
            <Link
              to="/holidays"
              className="font-body text-body-md text-light-inverse-on-surface/75 hover:text-light-inverse-on-surface transition-colors"
              data-design-text-token="body-md"
            >
              Holidays
            </Link>
            <Link
              to="/#popular-destinations"
              className="font-body text-body-md text-light-inverse-on-surface/75 hover:text-light-inverse-on-surface transition-colors"
              data-design-text-token="body-md"
            >
              Destinations
            </Link>
          </div>

          <div className="md:col-span-3 flex flex-col gap-gutter-sm">
            <h3 className="font-label text-label-lg" data-design-text-token="label-lg">
              Support
            </h3>
            <a
              href="#support"
              onClick={(e) => { e.preventDefault(); alert('TripSphere 24/7 Concierge Support: support@tripsphere.travel or +1 (800) 555-TRIP'); }}
              className="font-body text-body-md text-light-inverse-on-surface/75 hover:text-light-inverse-on-surface transition-colors"
              data-design-text-token="body-md"
            >
              24/7 Help Center
            </a>
            <Link
              to="/my-trips"
              className="font-body text-body-md text-light-inverse-on-surface/75 hover:text-light-inverse-on-surface transition-colors"
              data-design-text-token="body-md"
            >
              Manage My Trips
            </Link>
            <a
              href="#policy"
              onClick={(e) => { e.preventDefault(); alert('Free cancellation within 24 hours of booking for eligible airlines and participating hotels.'); }}
              className="font-body text-body-md text-light-inverse-on-surface/75 hover:text-light-inverse-on-surface transition-colors"
              data-design-text-token="body-md"
            >
              Cancellation Policy
            </a>
          </div>

          <div className="md:col-span-3 flex flex-col gap-gutter-sm">
            <h3 className="font-label text-label-lg" data-design-text-token="label-lg">
              Company
            </h3>
            <a
              href="#about"
              onClick={(e) => { e.preventDefault(); alert('TripSphere is a next-generation curated travel booking platform built for travelers seeking luxury, transparency, and seamless discovery.'); }}
              className="font-body text-body-md text-light-inverse-on-surface/75 hover:text-light-inverse-on-surface transition-colors"
              data-design-text-token="body-md"
            >
              About TripSphere
            </a>
            <a
              href="#partners"
              onClick={(e) => { e.preventDefault(); alert('Partner airlines include Delta, ANA, Air France, Emirates, Qatar Airways, and Singapore Airlines.'); }}
              className="font-body text-body-md text-light-inverse-on-surface/75 hover:text-light-inverse-on-surface transition-colors"
              data-design-text-token="body-md"
            >
              Partner Airlines
            </a>
            <a
              href="#privacy"
              onClick={(e) => { e.preventDefault(); alert('TripSphere adheres strictly to GDPR and data protection best practices.'); }}
              className="font-body text-body-md text-light-inverse-on-surface/75 hover:text-light-inverse-on-surface transition-colors"
              data-design-text-token="body-md"
            >
              Privacy &amp; Terms
            </a>
          </div>
        </div>

        <div className="pt-gutter-lg flex flex-col sm:flex-row items-center justify-between gap-gutter-sm">
          <p className="font-body text-body-sm text-light-inverse-on-surface/65" data-design-text-token="body-sm">
            &copy; 2027 TripSphere Travel Inc. All rights reserved.
          </p>
          <p className="font-body text-body-sm text-light-inverse-on-surface/65" data-design-text-token="body-sm">
            ATOL &amp; IATA Protected Booking Platform
          </p>
        </div>
      </div>
    </footer>
  );
}

