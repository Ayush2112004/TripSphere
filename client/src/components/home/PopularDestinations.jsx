import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DESTINATIONS = [
  {
    id: 'santorini',
    country: 'Greece',
    name: 'Santorini, Greece',
    price: 545,
    rating: 5,
    duration: '4 Nights · Greece',
    image:
      'https://lh3.googleusercontent.com/aida/ALJJyrAK9a3ElWi1HHBJHJhEQ6KiIAVgz-6lLLWGMI3o2mVIKoPbmBkhqDgMrroJTnOhBoHFAe2hyEngxKcCYoMW1HeqMytwjd6PiRqke5i9p_8WXlv4vibgZrrTwCzxh-IJFLQPr_DUQB5a_-FFixWoDPTtzpJID-zrVwSvDTmeMsRE-ofz802MO9zjIkH4bYJYETI3ldopSR3rjQYwf7_Io2hbCAgzIq2AKiQCCgEDp6GwxR8Di7iAsngvNw',
    alt: 'Whitewashed cliffside villas in Santorini, Greece',
  },
  {
    id: 'kyoto',
    country: 'Japan',
    name: 'Kyoto, Japan',
    price: 780,
    rating: 5,
    duration: '5 Nights · Japan',
    image:
      'https://lh3.googleusercontent.com/aida/ALJJyrAjWsU64SytwnbEIr8KRJDF7YYv-umdA0mdruIdxKiPttR60klp1eKyIAVBSgqFr_DaoMpZ0wtcHFJSlM3x3s4i9ht8rlVJlOHQ7Bj0w5uQw4CY7BqdkLm28YeMIQf2ssMdpMK5_Yv32RDmoxillf3_dmwVxsvfdSZDgjnEn079vAFVP5nkSV7CwQCDpEZuA3FHcXLxQdBsVORyDW_uvjeZ-6WD97Y3CMWDu-KLAlu6ennRoE8',
    alt: 'Historic wooden pagoda with cherry blossoms in Kyoto, Japan',
  },
  {
    id: 'amalfi',
    country: 'Italy',
    name: 'Amalfi Coast, Italy',
    price: 620,
    rating: 5,
    duration: '3 Nights · Italy',
    image:
      'https://lh3.googleusercontent.com/aida/ALJJyrAd4SeQxiucN4kcgaPw-wS6PRz4GXUaf8jLLxsaHcerGeiEMcbHfpZk-iUB7YmneDI8hYn_CNCtNJY0a6hJdIquTK6qiZkOe4Yp8jr3D2HmSBmkdz6DZ3pxSZef_3_UsM-RdIUkJ8muZUiYLVCV9bXE8Pgx3FaX54O9BG1q-oq235L4xx4LVtEg0C8vAL0JNRfAem3BnxYAEPh2xBLLN7gDd8Awe2QC3XVeX45rXiMFJW2OFLGq',
    alt: 'Positano cliffside village on the Amalfi Coast, Italy',
  },
  {
    id: 'paris',
    country: 'France',
    name: 'Paris, France',
    price: 510,
    rating: 5,
    duration: '3 Nights · France',
    image:
      'https://lh3.googleusercontent.com/aida/ALJJyrDJSzQTTb1RzzUtAjdqXgN6FWzplTiV4CMo7voBF3ypHqciNjM3_SCLlnbOosfR-t-p2Kl3QI0cjp7u0yYrlTfqtS-A6yh5QQ_OapM1eSAPOjkgtElyyX1BdZKBWbr2n046WEcBQIlRZLDh_84XYMOUgV9DUa0Wm7gRijEHh1zVSfpwqUia1wKNdpDP47DDJvlco5Q0InLyaiaVjyG-2aMw7I85_mUGkxoCNMi7pv8m6-hbPA',
    alt: 'Eiffel Tower rising above Parisian rooftops, France',
  },
];

const COUNTRIES = ['all', 'Greece', 'Japan', 'Italy', 'France'];

export default function PopularDestinations() {
  const [activeFilter, setActiveFilter] = useState('all');
  const navigate = useNavigate();

  const filteredDestinations =
    activeFilter === 'all'
      ? DESTINATIONS
      : DESTINATIONS.filter((d) => d.country === activeFilter);

  const handleBookNow = (dest) => {
    navigate(`/holidays?destination=${encodeURIComponent(dest.name)}`);
  };

  return (
    <section id="popular-destinations" className="max-w-7xl mx-auto px-gutter-md md:px-gutter-lg py-section border-t border-light-outline-variant">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-gutter-md mb-gutter-xl">
        <div>
          <h2
            className="font-headline text-headline-lg-mobile md:text-headline-lg text-light-on-surface mb-gutter-xs"
            data-design-text-token="headline-lg"
          >
            Popular Destinations
          </h2>
          <p className="font-body text-body-md text-light-on-surface-variant" data-design-text-token="body-md">
            Handpicked escapes loved by TripSphere travelers this season.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-gutter-sm" role="group" aria-label="Filter destinations by country">
          {COUNTRIES.map((country) => {
            const isActive = activeFilter === country;
            return (
              <button
                key={country}
                type="button"
                onClick={() => setActiveFilter(country)}
                className={`px-gutter-md py-2 rounded font-label text-label-md cursor-pointer transition-colors ${
                  isActive
                    ? 'border border-light-primary-container bg-light-secondary-container text-light-on-secondary-container font-semibold'
                    : 'border border-light-outline-variant bg-light-surface text-light-on-surface-variant hover:text-light-on-surface'
                }`}
              >
                {country === 'all' ? 'All' : country}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter-lg items-stretch">
        {filteredDestinations.map((dest) => (
          <article
            key={dest.id}
            data-dest-country={dest.country}
            data-component-id="card-action"
            data-component-type="card"
            data-component-variant="action"
            className="h-full bg-light-surface-container-lowest border border-light-outline-variant rounded-lg p-gutter-md flex flex-col gap-gutter-md shadow-sm transition-all hover:shadow-md"
          >
            <img src={dest.image} alt={dest.alt} className="w-full h-44 object-cover rounded-md" />
            <div className="flex-1 flex flex-col gap-gutter-xs">
              <h3 className="font-headline text-title-md text-light-on-surface" data-design-text-token="title-md">
                {dest.name}
              </h3>
              <div className="flex items-baseline gap-gutter-xs tabular-nums">
                <span className="font-headline text-title-md text-light-primary-container" data-design-text-token="title-md">
                  ${dest.price}
                </span>
                <span className="font-body text-body-sm text-light-on-surface-variant" data-design-text-token="body-sm">
                  / Person
                </span>
              </div>
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
            </div>
            <footer className="flex items-center justify-between pt-gutter-sm border-t border-light-outline-variant">
              <button
                type="button"
                onClick={() => handleBookNow(dest)}
                className="px-gutter-md py-2 rounded border border-light-outline-variant text-light-on-surface hover:bg-light-surface-container-low font-label text-label-md cursor-pointer transition-colors"
              >
                <span data-design-text-token="label-md">Book Now</span>
              </button>
              <span className="font-body text-body-sm text-light-on-surface-variant" data-design-text-token="body-sm">
                {dest.duration}
              </span>
            </footer>
          </article>
        ))}
      </div>
    </section>
  );
}

