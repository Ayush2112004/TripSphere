import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { holidayService } from '../services/api';
import { useBooking } from '../context/BookingContext';

export default function HolidayPackagesPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { startHolidayBooking } = useBooking();

  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  const promo = searchParams.get('promo') || '';

  const fallbackPackages = [
    {
      _id: 'swiss-alps-pkg',
      title: 'Swiss Alps Rail Tour',
      destination: 'Swiss Alps & Zurich',
      country: 'Switzerland',
      durationDays: 7,
      durationNights: 6,
      pricePerPerson: 1490,
      image:
        'https://lh3.googleusercontent.com/aida/ALJJyrCG7Kk1gsgkNHZI_lOLEtonz4lUsn4tfhfIz1Sl7QkyCQftJtN6NGp7AkAsnyjm3nlByKHyRwbAgFBA_F5OT5TusDtjwepnPb-VOTnIGqGqXmxOMV66uduY6vzu5w9PStcl098GKubwocHiJc3Vr-0XlrixeBwWaCaQhQQ7_hQsSXvKaxHrkBFV8AJ_o5SurVIRZvhAOrII_JvHsRW4cDXarbQOGwrIa5hcbmLtNre1TrjnRTphlxpZdx_0Qw',
      overview:
        '6 nights across Zurich, Lucerne, Interlaken, and Zermatt with first-class Glacier Express rail passes, daily alpine breakfast, and mountain excursions.',
      inclusions: [
        'First-class Glacier Express scenic rail pass',
        '6 nights 4-star boutique hotel accommodations',
        'Daily breakfast & fondue dinner tasting experience',
        'Guided excursion to Matterhorn Glacier Paradise',
      ],
      departureDates: ['July 2027', 'August 2027', 'September 2027'],
    },
    {
      _id: 'santorini-pkg',
      title: 'Santorini & Cyclades Dream',
      destination: 'Santorini, Greece',
      country: 'Greece',
      durationDays: 6,
      durationNights: 5,
      pricePerPerson: 1250,
      image:
        'https://lh3.googleusercontent.com/aida/ALJJyrAK9a3ElWi1HHBJHJhEQ6KiIAVgz-6lLLWGMI3o2mVIKoPbmBkhqDgMrroJTnOhBoHFAe2hyEngxKcCYoMW1HeqMytwjd6PiRqke5i9p_8WXlv4vibgZrrTwCzxh-IJFLQPr_DUQB5a_-FFixWoDPTtzpJID-zrVwSvDTmeMsRE-ofz802MO9zjIkH4bYJYETI3ldopSR3rjQYwf7_Io2hbCAgzIq2AKiQCCgEDp6GwxR8Di7iAsngvNw',
      overview:
        'Unwind along the sun-bleached cliffs of Oia with luxury caldera cave suites, sunset catamaran sailing cruises, and volcanic wine tastings.',
      inclusions: [
        '5 nights cliffside cave suite accommodations',
        'Daily breakfast overlooking the Caldera',
        'Sunset Catamaran cruise with BBQ and Greek wine',
        'High-speed ferry transfer between islands',
      ],
      departureDates: ['May 2027', 'June 2027', 'September 2027'],
    },
    {
      _id: 'kyoto-pkg',
      title: 'Kyoto & Tokyo Imperial Heritage',
      destination: 'Kyoto & Tokyo, Japan',
      country: 'Japan',
      durationDays: 8,
      durationNights: 7,
      pricePerPerson: 1850,
      image:
        'https://lh3.googleusercontent.com/aida/ALJJyrAjWsU64SytwnbEIr8KRJDF7YYv-umdA0mdruIdxKiPttR60klp1eKyIAVBSgqFr_DaoMpZ0wtcHFJSlM3x3s4i9ht8rlVJlOHQ7Bj0w5uQw4CY7BqdkLm28YeMIQf2ssMdpMK5_Yv32RDmoxillf3_dmwVxsvfdSZDgjnEn079vAFVP5nkSV7CwQCDpEZuA3FHcXLxQdBsVORyDW_uvjeZ-6WD97Y3CMWDu-KLAlu6ennRoE8',
      overview:
        'Historic wooden pagodas, serene bamboo groves, bullet train rail journeys, and authentic tea ceremony masterclasses.',
      inclusions: [
        '7-day Shinkansen bullet train green pass',
        '7 nights boutique ryokan & luxury Tokyo hotel',
        'Traditional kaiseki dinner experience',
        'Private Arashiyama and Fushimi Inari guide',
      ],
      departureDates: ['April 2027', 'October 2027', 'November 2027'],
    },
  ];

  useEffect(() => {
    const fetchPackages = async () => {
      setLoading(true);
      try {
        const res = await holidayService.getPackages({ promo });
        if (res.data?.data && res.data.data.length > 0) {
          setPackages(res.data.data);
        } else {
          setPackages(fallbackPackages);
        }
      } catch {
        setPackages(fallbackPackages);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, [promo]);

  const handleBook = (pkg) => {
    startHolidayBooking(pkg);
    navigate('/checkout');
  };

  return (
    <div className="max-w-7xl mx-auto px-gutter-md md:px-gutter-lg py-gutter-xl">
      <div className="mb-gutter-xl text-center max-w-2xl mx-auto">
        <h1 className="font-headline text-headline-lg-mobile md:text-headline-lg text-light-on-surface mb-gutter-xs">
          Curated Holiday Packages
        </h1>
        <p className="font-body text-body-md text-light-on-surface-variant">
          Complete end-to-end itineraries featuring scenic rail passes, boutique retreats, and dedicated private transfers.
        </p>
        {promo && (
          <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-light-tertiary-container text-light-on-tertiary-container text-label-sm font-bold">
            <span className="material-symbols-outlined text-body-md">local_offer</span>
            Promo Code Applied: {promo}
          </div>
        )}
      </div>

      {loading ? (
        <div className="py-section text-center">
          <span className="material-symbols-outlined text-display-lg text-light-primary-container animate-spin">
            progress_activity
          </span>
          <p className="font-label text-label-md text-light-on-surface-variant mt-2">Loading packages...</p>
        </div>
      ) : (
        <div className="flex flex-col gap-gutter-xl">
          {packages.map((pkg) => (
            <article
              key={pkg._id}
              className="bg-light-surface border border-light-outline-variant rounded-lg overflow-hidden grid grid-cols-1 lg:grid-cols-12 shadow-sm hover:shadow-md transition-all"
            >
              <div className="lg:col-span-5 h-64 lg:h-auto">
                <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover" />
              </div>
              <div className="lg:col-span-7 p-gutter-lg flex flex-col justify-between gap-gutter-md">
                <div className="flex flex-col gap-gutter-sm">
                  <div className="flex items-center justify-between">
                    <span className="px-gutter-sm py-1 rounded-full bg-light-secondary-container text-light-on-secondary-container font-label text-label-sm font-semibold">
                      {pkg.durationDays} Days / {pkg.durationNights} Nights
                    </span>
                    <span className="font-body text-body-sm text-light-on-surface-variant">{pkg.destination}</span>
                  </div>

                  <h2 className="font-headline text-headline-md text-light-on-surface">{pkg.title}</h2>
                  <p className="font-body text-body-md text-light-on-surface-variant leading-relaxed">{pkg.overview}</p>

                  <div className="mt-2">
                    <h3 className="font-label text-label-sm text-light-on-surface uppercase tracking-wider mb-2">
                      Package Inclusions:
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {pkg.inclusions?.map((inc, i) => (
                        <div key={i} className="flex items-start gap-2 text-body-sm text-light-on-surface">
                          <span className="material-symbols-outlined text-emerald-badge text-body-md mt-0.5">check</span>
                          <span>{inc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-gutter-md border-t border-light-outline-variant">
                  <div className="tabular-nums">
                    <span className="font-headline text-headline-md text-light-primary-container font-bold">
                      ${pkg.pricePerPerson}
                    </span>
                    <span className="font-body text-body-sm text-light-on-surface-variant ml-1">/ Person</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleBook(pkg)}
                    className="px-gutter-lg py-3 rounded bg-light-primary-container text-light-on-primary-container hover:bg-light-primary font-label text-label-md cursor-pointer transition-colors shadow-sm"
                  >
                    Book Package
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

