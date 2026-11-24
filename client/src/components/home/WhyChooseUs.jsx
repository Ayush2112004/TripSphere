import React from 'react';

export default function WhyChooseUs() {
  return (
    <section id="why-tripsphere" className="max-w-7xl mx-auto px-gutter-md md:px-gutter-lg py-section">
      <div className="text-center max-w-2xl mx-auto mb-gutter-xl">
        <h2
          className="font-headline text-headline-lg-mobile md:text-headline-lg text-light-on-surface mb-gutter-sm"
          data-design-text-token="headline-lg"
        >
          Why Choose TripSphere?
        </h2>
        <p
          className="font-body text-body-md text-light-on-surface-variant text-pretty"
          data-design-text-token="body-md"
        >
          Discover transparent fares, handpicked stays, and dedicated 24/7 travel support built for effortless journeys.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter-lg items-stretch">
        <article
          data-component-id="card-elevated"
          data-component-type="card"
          data-component-variant="elevated"
          className="h-full bg-light-surface-container-lowest border border-light-outline-variant rounded-lg p-gutter-xl flex flex-col items-center text-center gap-gutter-md shadow-sm"
        >
          <div className="w-14 h-14 rounded-md bg-sky-badge text-light-on-primary flex items-center justify-center">
            <span className="material-symbols-outlined text-headline-md" aria-hidden="true">
              edit_calendar
            </span>
          </div>
          <div className="flex flex-col gap-gutter-xs">
            <h3 className="font-headline text-title-lg text-light-on-surface" data-design-text-token="title-lg">
              Plan a Trip
            </h3>
            <p className="font-body text-body-md text-light-on-surface-variant text-pretty" data-design-text-token="body-md">
              Compare flexible dates, build multi-stop itineraries, and lock in routes with zero hidden fees.
            </p>
          </div>
        </article>

        <article
          data-component-id="card-elevated"
          data-component-type="card"
          data-component-variant="elevated"
          className="h-full bg-light-surface-container-lowest border border-light-outline-variant rounded-lg p-gutter-xl flex flex-col items-center text-center gap-gutter-md shadow-sm"
        >
          <div className="w-14 h-14 rounded-md bg-coral-badge text-light-on-primary flex items-center justify-center">
            <span className="material-symbols-outlined text-headline-md" aria-hidden="true">
              verified
            </span>
          </div>
          <div className="flex flex-col gap-gutter-xs">
            <h3 className="font-headline text-title-lg text-light-on-surface" data-design-text-token="title-lg">
              Explore and Save
            </h3>
            <p className="font-body text-body-md text-light-on-surface-variant text-pretty" data-design-text-token="body-md">
              Unlock member-only rates on direct flights, boutique hotels, and curated seasonal holiday packages.
            </p>
          </div>
        </article>

        <article
          data-component-id="card-elevated"
          data-component-type="card"
          data-component-variant="elevated"
          className="h-full bg-light-surface-container-lowest border border-light-outline-variant rounded-lg p-gutter-xl flex flex-col items-center text-center gap-gutter-md shadow-sm"
        >
          <div className="w-14 h-14 rounded-md bg-emerald-badge text-light-on-primary flex items-center justify-center">
            <span className="material-symbols-outlined text-headline-md" aria-hidden="true">
              beach_access
            </span>
          </div>
          <div className="flex flex-col gap-gutter-xs">
            <h3 className="font-headline text-title-lg text-light-on-surface" data-design-text-token="title-lg">
              Enjoy Your Trip
            </h3>
            <p className="font-body text-body-md text-light-on-surface-variant text-pretty" data-design-text-token="body-md">
              Travel with live flight alerts, instant digital boarding passes, and 24/7 concierge assistance.
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}

