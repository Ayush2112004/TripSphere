import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../../context/BookingContext';

export default function HolidayOffers() {
  const navigate = useNavigate();
  const { startHolidayBooking } = useBooking();

  const handleBookFeaturedPackage = () => {
    startHolidayBooking({
      _id: 'swiss-alps-pkg',
      title: 'Swiss Alps Rail Tour',
      destination: 'Swiss Alps & Zurich',
      country: 'Switzerland',
      durationDays: 7,
      durationNights: 6,
      pricePerPerson: 1490,
      image:
        'https://lh3.googleusercontent.com/aida/ALJJyrCG7Kk1gsgkNHZI_lOLEtonz4lUsn4tfhfIz1Sl7QkyCQftJtN6NGp7AkAsnyjm3nlByKHyRwbAgFBA_F5OT5TusDtjwepnPb-VOTnIGqGqXmxOMV66uduY6vzu5w9PStcl098GKubwocHiJc3Vr-0XlrixeBwWaCaQhQQ7_hQsSXvKaxHrkBFV8AJ_o5SurVIRZvhAOrII_JvHsRW4cDXarbQOGwrIa5hcbmLtNre1TrjnRTphlxpZdx_0Qw',
      highlights: [
        'First-class Glacier Express scenic rail pass',
        '6 nights 4-star boutique hotel accommodations',
        'Daily breakfast included & fondue dinner experience',
        'Panoramic excursions to Matterhorn & Lake Lucerne',
      ],
    });
    navigate('/checkout');
  };

  const handleApplyPromo = (code) => {
    navigate(`/holidays?promo=${code}`);
  };

  return (
    <section id="holiday-offers" className="max-w-7xl mx-auto px-gutter-md md:px-gutter-lg py-section border-t border-light-outline-variant">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-lg items-stretch">
        {/* Featured Holiday Package */}
        <article className="lg:col-span-7 bg-light-surface border border-light-outline-variant rounded-lg overflow-hidden grid grid-cols-1 md:grid-cols-2 shadow-sm">
          <img
            src="https://lh3.googleusercontent.com/aida/ALJJyrCG7Kk1gsgkNHZI_lOLEtonz4lUsn4tfhfIz1Sl7QkyCQftJtN6NGp7AkAsnyjm3nlByKHyRwbAgFBA_F5OT5TusDtjwepnPb-VOTnIGqGqXmxOMV66uduY6vzu5w9PStcl098GKubwocHiJc3Vr-0XlrixeBwWaCaQhQQ7_hQsSXvKaxHrkBFV8AJ_o5SurVIRZvhAOrII_JvHsRW4cDXarbQOGwrIa5hcbmLtNre1TrjnRTphlxpZdx_0Qw"
            alt="Scenic panoramic train crossing a viaduct in the Swiss Alps"
            className="w-full h-64 md:h-full object-cover"
          />
          <div className="p-gutter-lg flex flex-col justify-between gap-gutter-md">
            <div className="flex flex-col gap-gutter-sm">
              <span
                className="self-start px-gutter-sm py-1 rounded-full bg-light-secondary-container text-light-on-secondary-container font-label text-label-sm font-semibold"
                data-design-text-token="label-sm"
              >
                Top Holiday Package
              </span>
              <h2 className="font-headline text-headline-md text-light-on-surface" data-design-text-token="headline-md">
                Swiss Alps Rail Tour
              </h2>
              <p className="font-body text-body-md text-light-on-surface-variant text-pretty" data-design-text-token="body-md">
                6 nights across Zurich, Lucerne, and Zermatt with first-class Glacier Express rail passes and breakfast.
              </p>
            </div>
            <div className="flex items-center justify-between pt-gutter-md border-t border-light-outline-variant">
              <div className="tabular-nums">
                <span className="font-headline text-title-lg text-light-primary-container" data-design-text-token="title-lg">
                  $1,490
                </span>
                <span className="font-body text-body-sm text-light-on-surface-variant ml-1" data-design-text-token="body-sm">
                  / Person
                </span>
              </div>
              <button
                type="button"
                onClick={handleBookFeaturedPackage}
                className="px-gutter-md py-2.5 rounded bg-light-primary-container text-light-on-primary-container hover:bg-light-primary font-label text-label-md cursor-pointer transition-colors"
              >
                <span data-design-text-token="label-md">Book Package</span>
              </button>
            </div>
          </div>
        </article>

        {/* Exclusive Travel Offers */}
        <div className="lg:col-span-5 flex flex-col gap-gutter-md">
          <article
            onClick={() => handleApplyPromo('SUMMER18')}
            className="flex-1 bg-light-surface-container-low border border-light-outline-variant rounded-lg p-gutter-lg flex flex-col justify-between gap-gutter-sm shadow-sm cursor-pointer hover:border-light-primary-container transition-colors"
          >
            <div className="flex items-center justify-between">
              <span
                className="px-gutter-sm py-1 rounded-full bg-light-tertiary-container text-light-on-tertiary-container font-label text-label-sm font-bold"
                data-design-text-token="label-sm"
              >
                Save 18%
              </span>
              <span className="font-mono text-mono-md text-light-on-surface-variant font-bold" data-design-text-token="mono-md">
                CODE: SUMMER18
              </span>
            </div>
            <div>
              <h3 className="font-headline text-title-lg text-light-on-surface mb-1" data-design-text-token="title-lg">
                Mediterranean Early Bird
              </h3>
              <p className="font-body text-body-md text-light-on-surface-variant" data-design-text-token="body-md">
                Save up to $220 on Greece &amp; Italy flight + hotel bundles booked before April 30.
              </p>
            </div>
          </article>

          <article
            onClick={() => handleApplyPromo('SPHEREVIP')}
            className="flex-1 bg-light-surface-container-low border border-light-outline-variant rounded-lg p-gutter-lg flex flex-col justify-between gap-gutter-sm shadow-sm cursor-pointer hover:border-light-primary-container transition-colors"
          >
            <div className="flex items-center justify-between">
              <span
                className="px-gutter-sm py-1 rounded-full bg-light-secondary-container text-light-on-secondary-container font-label text-label-sm font-bold"
                data-design-text-token="label-sm"
              >
                Lounge Pass
              </span>
              <span className="font-mono text-mono-md text-light-on-surface-variant font-bold" data-design-text-token="mono-md">
                CODE: SPHEREVIP
              </span>
            </div>
            <div>
              <h3 className="font-headline text-title-lg text-light-on-surface mb-1" data-design-text-token="title-lg">
                Airport Lounge Access
              </h3>
              <p className="font-body text-body-md text-light-on-surface-variant" data-design-text-token="body-md">
                Included on all international Business &amp; Premium Economy round-trip bookings.
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

