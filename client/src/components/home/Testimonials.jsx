import React from 'react';

const TESTIMONIALS = [
  {
    id: 1,
    name: 'Claire Bennett',
    trip: 'Santorini · May 2026',
    quote:
      '"Booking our Santorini flights and cliffside hotel together took under five minutes. The fare breakdown was completely transparent."',
    avatar: '/images/avatar-claire.jpg?v=2',
  },
  {
    id: 2,
    name: 'Marcus Chen',
    trip: 'Kyoto & Tokyo · Apr 2026',
    quote:
      '"When our Tokyo flight schedule shifted, TripSphere support rebooked our connection before we even reached the airport."',
    avatar: '/images/avatar-marcus.jpg?v=2',
  },
  {
    id: 3,
    name: 'Priya Nair',
    trip: 'Amalfi Coast · Jun 2026',
    quote:
      '"Every hotel recommendation felt genuinely curated. The Amalfi Coast stay matched every photo and included late checkout."',
    avatar: '/images/avatar-priya.jpg?v=2',
  },
];

export default function Testimonials() {
  return (
    <section className="bg-light-surface-container-low border-y border-light-outline-variant py-section">
      <div className="max-w-7xl mx-auto px-gutter-md md:px-gutter-lg">
        <div className="text-center max-w-2xl mx-auto mb-gutter-xl">
          <h2
            className="font-headline text-headline-lg-mobile md:text-headline-lg text-light-on-surface mb-gutter-xs"
            data-design-text-token="headline-lg"
          >
            Trusted by Travelers Worldwide
          </h2>
          <p className="font-body text-body-md text-light-on-surface-variant" data-design-text-token="body-md">
            Real stories from guests who planned their flights and stays on TripSphere.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter-lg items-stretch">
          {TESTIMONIALS.map((t) => (
            <article
              key={t.id}
              className="h-full bg-light-surface border border-light-outline-variant rounded-lg p-gutter-lg flex flex-col justify-between gap-gutter-md shadow-sm transition-all hover:shadow-md"
            >
              <div className="flex items-center gap-0.5 text-amber-star" aria-label="5 out of 5 stars">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className="material-symbols-outlined text-body-lg"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                    aria-hidden="true"
                  >
                    star
                  </span>
                ))}
              </div>
              <p className="font-body text-body-md text-light-on-surface text-pretty" data-design-text-token="body-md">
                {t.quote}
              </p>
              <div className="flex items-center gap-gutter-sm pt-gutter-sm border-t border-light-outline-variant">
                <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <p className="font-label text-label-md text-light-on-surface" data-design-text-token="label-md">
                    {t.name}
                  </p>
                  <p className="font-body text-body-sm text-light-on-surface-variant" data-design-text-token="body-sm">
                    {t.trip}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

