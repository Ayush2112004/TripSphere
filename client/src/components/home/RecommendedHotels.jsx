import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const RECOMMENDED_HOTELS = [
  {
    id: 'hotel-1',
    name: 'Alila Cliffside Resort',
    rating: 4.9,
    location: 'Uluwatu, Bali',
    features: 'Oceanfront Pool & Spa',
    price: 285,
    image:
      'https://lh3.googleusercontent.com/aida/ALJJyrCsOtAZoxRNbyreSaWNv4mYDq0gubEJKUncwxwOdfyF2BZ5lH3YVw_oqft8rZyUTghBDW3APpx6zznBX5HDsuggXK_oeN17RaJ6G8Xb5Y4noZTj2NlWBIzp8lMJnhV7mfG_WfHNXKrjqu3UV51-IIixDe2P-XfYeBAGuGBSw4fA2CsC7zdkZyCNNDKF3iY6b0SSDDz_qQ_ejzJl3ThO8Ldp-F778UbbWqYpyEUbryLU-HT99Q8',
    alt: 'Cliffside infinity pool resort in Uluwatu, Bali',
  },
  {
    id: 'hotel-2',
    name: 'The Omnia Alpine Lodge',
    rating: 4.8,
    location: 'Zermatt, Switzerland',
    features: 'Breakfast Included',
    price: 360,
    image:
      'https://lh3.googleusercontent.com/aida/ALJJyrACYLUn2xyyjRQ2vZRy8S4_jnvaavQ4eTTIT4mCOlbDMPeSwxjpT3uUeSCjJEQAOsu7X1i1uAbjBTtZaRDFhdh_zvFpTfypgvym2z3OhKeBC7wUtKE25ZkzW0q-lYDV9C_Dt8ODg5WE9jBwsZVv6WE23Bgq7Ifrx7Al-TZyYiRUT_l9POiBnpTaPh2QoMDCOdre2QqRCQoOFN01ibDHSTkCbym2K5oiFgrGzpXnkj0N-JOcB6A',
    alt: 'Modern alpine chalet hotel in Zermatt, Switzerland',
  },
  {
    id: 'hotel-3',
    name: 'Soneva Lagoon Villas',
    rating: 5.0,
    location: 'Baa Atoll, Maldives',
    features: 'Private Lagoon Deck',
    price: 640,
    image:
      'https://lh3.googleusercontent.com/aida/ALJJyrAJmDRzj_dzFSlOBg_qvgqcO9DFaLMwrb5_8EaSryVstUlHDPvgWvvvwEj9BPsmd_PUxbAiPAlcn-P-Wt2D79xnLcDo8xaCsr-4EUcA4prKk7Gl6EDrvaD0VyDkegMQ6g6LALtkRBCUOjxMvbBhIYA9F4p_XuM108Y5UB9MQ1J4IYCQcbM-EpdDD0OGaXNhYPDe4O9pqydYyd9C4-wzfUY5DqQkdqei2Cz8OoRLD8Hp4MWwCnwC3G-gRQ',
    alt: 'Overwater villa terrace in the Maldives',
  },
];

export default function RecommendedHotels() {
  const navigate = useNavigate();

  return (
    <section id="recommended-hotels" className="max-w-7xl mx-auto px-gutter-md md:px-gutter-lg py-section">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-gutter-md mb-gutter-xl">
        <div>
          <h2
            className="font-headline text-headline-lg-mobile md:text-headline-lg text-light-on-surface mb-gutter-xs"
            data-design-text-token="headline-lg"
          >
            Recommended Hotels
          </h2>
          <p className="font-body text-body-md text-light-on-surface-variant" data-design-text-token="body-md">
            Boutique resorts and alpine lodges vetted for comfort, location, and guest satisfaction.
          </p>
        </div>
        <Link
          to="/hotels"
          className="inline-flex items-center gap-gutter-xs font-label text-label-lg text-light-primary-container hover:text-light-primary transition-colors"
          data-design-text-token="label-lg"
        >
          <span>Browse all stays</span>
          <span className="material-symbols-outlined text-body-lg" aria-hidden="true">
            arrow_forward
          </span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter-lg items-stretch">
        {RECOMMENDED_HOTELS.map((hotel) => (
          <article
            key={hotel.id}
            data-component-id="card-hotel"
            data-component-type="card"
            data-component-variant="action"
            className="h-full bg-light-surface-container-lowest border border-light-outline-variant rounded-lg p-gutter-md flex flex-col gap-gutter-md shadow-sm transition-all hover:shadow-md"
          >
            <img src={hotel.image} alt={hotel.alt} className="w-full h-52 object-cover rounded-md" />
            <div className="flex-1 flex flex-col gap-gutter-xs">
              <div className="flex items-start justify-between gap-gutter-sm">
                <h3 className="font-headline text-title-lg text-light-on-surface" data-design-text-token="title-lg">
                  {hotel.name}
                </h3>
                <span
                  className="inline-flex items-center gap-1 px-gutter-sm py-0.5 rounded bg-light-secondary-container text-light-on-secondary-container font-label text-label-md tabular-nums"
                  data-design-text-token="label-md"
                >
                  <span
                    className="material-symbols-outlined text-body-sm text-amber-star"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                    aria-hidden="true"
                  >
                    star
                  </span>
                  {hotel.rating.toFixed(1)}
                </span>
              </div>
              <p className="font-body text-body-sm text-light-on-surface-variant" data-design-text-token="body-sm">
                {hotel.location} · {hotel.features}
              </p>
            </div>
            <footer className="flex items-center justify-between pt-gutter-sm border-t border-light-outline-variant">
              <div className="tabular-nums">
                <span className="font-headline text-title-lg text-light-primary-container" data-design-text-token="title-lg">
                  ${hotel.price}
                </span>
                <span className="font-body text-body-sm text-light-on-surface-variant ml-1" data-design-text-token="body-sm">
                  / night
                </span>
              </div>
              <button
                type="button"
                onClick={() => navigate(`/hotels/${hotel.id}`)}
                className="px-gutter-md py-2 rounded border border-light-outline-variant text-light-on-surface hover:bg-light-surface-container-low font-label text-label-md cursor-pointer transition-colors"
              >
                <span data-design-text-token="label-md">View Details</span>
              </button>
            </footer>
          </article>
        ))}
      </div>
    </section>
  );
}

