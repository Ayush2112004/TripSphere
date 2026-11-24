import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { hotelService } from '../services/api';

export default function HotelSearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [destination, setDestination] = useState(searchParams.get('destination') || 'Amalfi Coast, Italy');
  const [checkIn, setCheckIn] = useState(searchParams.get('checkIn') || '2027-06-08');
  const [checkOut, setCheckOut] = useState(searchParams.get('checkOut') || '2027-06-14');
  const [guests, setGuests] = useState(Number(searchParams.get('guests')) || 2);
  const [rooms, setRooms] = useState(Number(searchParams.get('rooms')) || 1);

  // Filters
  const [minRating, setMinRating] = useState('0');
  const [maxPrice, setMaxPrice] = useState(1000);
  const [sortBy, setSortBy] = useState('rating');

  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  const fallbackHotels = [
    {
      _id: 'hotel-1',
      name: 'Alila Cliffside Resort',
      city: 'Uluwatu',
      country: 'Bali',
      address: 'Jl. Belimbing Sari, Pecatu, South Kuta, Bali',
      description: 'Perched on limestone cliffs 100 meters above the Indian Ocean, delivering awe-inspiring panoramic seascapes.',
      rating: 4.9,
      reviewCount: 142,
      pricePerNight: 285,
      images: [
        'https://lh3.googleusercontent.com/aida/ALJJyrCsOtAZoxRNbyreSaWNv4mYDq0gubEJKUncwxwOdfyF2BZ5lH3YVw_oqft8rZyUTghBDW3APpx6zznBX5HDsuggXK_oeN17RaJ6G8Xb5Y4noZTj2NlWBIzp8lMJnhV7mfG_WfHNXKrjqu3UV51-IIixDe2P-XfYeBAGuGBSw4fA2CsC7zdkZyCNNDKF3iY6b0SSDDz_qQ_ejzJl3ThO8Ldp-F778UbbWqYpyEUbryLU-HT99Q8',
      ],
      amenities: ['Oceanfront Pool & Spa', 'Sunset Cabanas', 'Butler Service', 'High-speed Wi-Fi'],
    },
    {
      _id: 'hotel-2',
      name: 'The Omnia Alpine Lodge',
      city: 'Zermatt',
      country: 'Switzerland',
      address: 'Auf dem Fels, 3920 Zermatt, Switzerland',
      description: 'Contemporary alpine chalet suspended 45 meters above Zermatt with unobstructed views of the Matterhorn.',
      rating: 4.8,
      reviewCount: 118,
      pricePerNight: 360,
      images: [
        'https://lh3.googleusercontent.com/aida/ALJJyrACYLUn2xyyjRQ2vZRy8S4_jnvaavQ4eTTIT4mCOlbDMPeSwxjpT3uUeSCjJEQAOsu7X1i1uAbjBTtZaRDFhdh_zvFpTfypgvym2z3OhKeBC7wUtKE25ZkzW0q-lYDV9C_Dt8ODg5WE9jBwsZVv6WE23Bgq7Ifrx7Al-TZyYiRUT_l9POiBnpTaPh2QoMDCOdre2QqRCQoOFN01ibDHSTkCbym2K5oiFgrGzpXnkj0N-JOcB6A',
      ],
      amenities: ['Matterhorn Views', 'Breakfast Included', 'Indoor/Outdoor Heated Pool', 'Spa & Sauna'],
    },
    {
      _id: 'hotel-3',
      name: 'Soneva Lagoon Villas',
      city: 'Baa Atoll',
      country: 'Maldives',
      address: 'Kunfunadhoo Island, Baa Atoll, Maldives',
      description: 'Intimate overwater luxury nestled within a UNESCO World Biosphere Reserve with retractable stargazing roofs.',
      rating: 5.0,
      reviewCount: 88,
      pricePerNight: 640,
      images: [
        'https://lh3.googleusercontent.com/aida/ALJJyrAJmDRzj_dzFSlOBg_qvgqcO9DFaLMwrb5_8EaSryVstUlHDPvgWvvvwEj9BPsmd_PUxbAiPAlcn-P-Wt2D79xnLcDo8xaCsr-4EUcA4prKk7Gl6EDrvaD0VyDkegMQ6g6LALtkRBCUOjxMvbBhIYA9F4p_XuM108Y5UB9MQ1J4IYCQcbM-EpdDD0OGaXNhYPDe4O9pqydYyd9C4-wzfUY5DqQkdqei2Cz8OoRLD8Hp4MWwCnwC3G-gRQ',
      ],
      amenities: ['Private Lagoon Water Slide', 'Retractable Roof', 'Barefoot Butler', 'Speedboat Transfer'],
    },
    {
      _id: 'hotel-4',
      name: 'Canaves Oia Suites',
      city: 'Santorini',
      country: 'Greece',
      address: 'Main Street, Oia 847 02, Greece',
      description: 'Carved gracefully into the volcanic cliffside of Oia, pairing Cycladic architecture with infinity pools.',
      rating: 4.9,
      reviewCount: 97,
      pricePerNight: 510,
      images: [
        'https://lh3.googleusercontent.com/aida/ALJJyrAK9a3ElWi1HHBJHJhEQ6KiIAVgz-6lLLWGMI3o2mVIKoPbmBkhqDgMrroJTnOhBoHFAe2hyEngxKcCYoMW1HeqMytwjd6PiRqke5i9p_8WXlv4vibgZrrTwCzxh-IJFLQPr_DUQB5a_-FFixWoDPTtzpJID-zrVwSvDTmeMsRE-ofz802MO9zjIkH4bYJYETI3ldopSR3rjQYwf7_Io2hbCAgzIq2AKiQCCgEDp6GwxR8Di7iAsngvNw',
      ],
      amenities: ['Caldera View Pool', 'Wine Tastings', 'Aegean Restaurant', 'Luxury Yacht Tours'],
    },
  ];

  useEffect(() => {
    fetchHotels();
  }, [destination, minRating, maxPrice, sortBy]);

  const fetchHotels = async () => {
    setLoading(true);
    try {
      const res = await hotelService.getHotels({
        destination,
        rating: minRating,
        maxPrice,
        sort: sortBy,
      });
      if (res.data?.data && res.data.data.length > 0) {
        setHotels(res.data.data);
      } else {
        setHotels(fallbackHotels);
      }
    } catch {
      setHotels(fallbackHotels);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchParams({
      destination,
      checkIn,
      checkOut,
      guests,
      rooms,
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-gutter-md md:px-gutter-lg py-gutter-xl">
      {/* Search Header Bar */}
      <div className="bg-light-surface border border-light-outline-variant rounded-lg p-gutter-md md:p-gutter-lg mb-gutter-xl shadow-sm">
        <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-12 gap-gutter-sm items-center">
          <div className="md:col-span-4 bg-light-surface-container-low rounded-md border border-light-outline-variant p-gutter-xs">
            <div className="flex flex-col px-gutter-sm py-1">
              <span className="flex items-center gap-1 font-label text-label-xs text-light-on-surface-variant">
                <span className="material-symbols-outlined text-body-sm">location_on</span>
                Destination or Hotel
              </span>
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="border-0 bg-transparent p-0 font-title text-title-md text-light-on-surface focus:ring-0 outline-none w-full"
              />
            </div>
          </div>

          <div className="md:col-span-3 grid grid-cols-2 gap-gutter-xs bg-light-surface-container-low rounded-md border border-light-outline-variant p-gutter-xs">
            <div className="flex flex-col px-gutter-sm py-1">
              <span className="font-label text-label-xs text-light-on-surface-variant">Check-in</span>
              <input
                type="text"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="border-0 bg-transparent p-0 font-title text-body-md font-semibold text-light-on-surface tabular-nums focus:ring-0 outline-none w-full"
              />
            </div>
            <div className="flex flex-col px-gutter-sm py-1 border-l border-light-outline-variant">
              <span className="font-label text-label-xs text-light-on-surface-variant">Check-out</span>
              <input
                type="text"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="border-0 bg-transparent p-0 font-title text-body-md font-semibold text-light-on-surface tabular-nums focus:ring-0 outline-none w-full"
              />
            </div>
          </div>

          <div className="md:col-span-3 bg-light-surface-container-low rounded-md border border-light-outline-variant p-gutter-xs">
            <div className="flex flex-col px-gutter-sm py-1">
              <span className="flex items-center gap-1 font-label text-label-xs text-light-on-surface-variant">
                <span className="material-symbols-outlined text-body-sm">bed</span>
                Guests &amp; Rooms
              </span>
              <input
                type="text"
                value={`${guests} Guests · ${rooms} Room`}
                readOnly
                className="border-0 bg-transparent p-0 font-title text-body-md font-semibold text-light-on-surface focus:ring-0 outline-none w-full"
              />
            </div>
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full py-3 rounded-md bg-light-primary-container text-light-on-primary-container hover:bg-light-primary font-label text-label-md transition-colors cursor-pointer flex items-center justify-center gap-1 shadow-sm"
            >
              <span className="material-symbols-outlined text-body-lg">search</span>
              <span>Search</span>
            </button>
          </div>
        </form>
      </div>

      {/* Grid: Sidebar Filters & Stays Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-lg items-start">
        {/* Filters Sidebar */}
        <aside className="lg:col-span-3 bg-light-surface border border-light-outline-variant rounded-lg p-gutter-md flex flex-col gap-gutter-md shadow-sm">
          <div className="flex items-center justify-between pb-gutter-sm border-b border-light-outline-variant">
            <h3 className="font-headline text-title-md text-light-on-surface flex items-center gap-1">
              <span className="material-symbols-outlined text-title-md">tune</span>
              Hotel Filters
            </h3>
            <button
              type="button"
              onClick={() => {
                setMinRating('0');
                setMaxPrice(1000);
              }}
              className="font-label text-label-xs text-light-primary-container hover:underline cursor-pointer"
            >
              Reset
            </button>
          </div>

          {/* Guest Rating Filter */}
          <div>
            <h4 className="font-label text-label-md text-light-on-surface mb-2">Guest Rating</h4>
            <div className="flex flex-col gap-1.5">
              {[
                { label: 'Any Rating', value: '0' },
                { label: '4.8+ Exceptional', value: '4.8' },
                { label: '4.5+ Wonderful', value: '4.5' },
                { label: '4.0+ Very Good', value: '4.0' },
              ].map((rate) => (
                <label key={rate.value} className="flex items-center gap-2 cursor-pointer font-body text-body-sm text-light-on-surface">
                  <input
                    type="radio"
                    name="rating"
                    value={rate.value}
                    checked={minRating === rate.value}
                    onChange={(e) => setMinRating(e.target.value)}
                    className="text-light-primary-container focus:ring-light-primary-container"
                  />
                  <span>{rate.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range Slider */}
          <div className="pt-gutter-sm border-t border-light-outline-variant">
            <div className="flex items-center justify-between mb-1">
              <h4 className="font-label text-label-md text-light-on-surface">Nightly Rate</h4>
              <span className="font-headline text-title-md text-light-primary-container tabular-nums">${maxPrice}</span>
            </div>
            <input
              type="range"
              min="150"
              max="1200"
              step="50"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-light-primary-container cursor-pointer"
            />
            <div className="flex justify-between text-body-xs text-light-on-surface-variant mt-1">
              <span>$150</span>
              <span>$1,200</span>
            </div>
          </div>
        </aside>

        {/* Results Container */}
        <section className="lg:col-span-9 flex flex-col gap-gutter-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-gutter-sm bg-light-surface-container-low border border-light-outline-variant rounded-md px-gutter-md py-2.5">
            <p className="font-body text-body-sm text-light-on-surface">
              Showing <span className="font-semibold">{hotels.length} curated stays</span>
            </p>
            <div className="flex items-center gap-2">
              <span className="font-label text-label-sm text-light-on-surface-variant">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="rounded border border-light-outline-variant bg-light-surface px-2 py-1 text-label-sm text-light-on-surface focus:ring-0 outline-none cursor-pointer"
              >
                <option value="rating">Top Guest Rating</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className="py-section text-center">
              <span className="material-symbols-outlined text-display-lg text-light-primary-container animate-spin">
                progress_activity
              </span>
              <p className="font-label text-label-md text-light-on-surface-variant mt-2">Finding available hotels...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter-md">
              {hotels.map((hotel) => (
                <article
                  key={hotel._id}
                  className="bg-light-surface-container-lowest border border-light-outline-variant rounded-lg p-gutter-md flex flex-col gap-gutter-md shadow-sm hover:shadow-md transition-all"
                >
                  <img
                    src={hotel.images?.[0] || fallbackHotels[0].images[0]}
                    alt={hotel.name}
                    className="w-full h-52 object-cover rounded-md"
                  />
                  <div className="flex-1 flex flex-col gap-gutter-xs">
                    <div className="flex items-start justify-between gap-gutter-sm">
                      <h3 className="font-headline text-title-lg text-light-on-surface">{hotel.name}</h3>
                      <span className="inline-flex items-center gap-1 px-gutter-sm py-0.5 rounded bg-light-secondary-container text-light-on-secondary-container font-label text-label-md tabular-nums font-semibold">
                        <span
                          className="material-symbols-outlined text-body-sm text-amber-star"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          star
                        </span>
                        {hotel.rating.toFixed(1)}
                      </span>
                    </div>
                    <p className="font-body text-body-sm text-light-on-surface-variant">
                      {hotel.city}, {hotel.country}
                    </p>
                    <p className="font-body text-body-xs text-light-on-surface-variant line-clamp-2 mt-1">
                      {hotel.description}
                    </p>
                  </div>
                  <footer className="flex items-center justify-between pt-gutter-sm border-t border-light-outline-variant">
                    <div className="tabular-nums">
                      <span className="font-headline text-title-lg text-light-primary-container font-bold">
                        ${hotel.pricePerNight}
                      </span>
                      <span className="font-body text-body-sm text-light-on-surface-variant ml-1">/ night</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => navigate(`/hotels/${hotel._id}`)}
                      className="px-gutter-md py-2 rounded border border-light-outline-variant text-light-on-surface hover:bg-light-surface-container-low font-label text-label-md cursor-pointer transition-colors"
                    >
                      View Details
                    </button>
                  </footer>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

