import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { hotelService } from '../services/api';
import { useBooking } from '../context/BookingContext';

export default function HotelDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { startHotelBooking } = useBooking();

  const [hotel, setHotel] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHotel = async () => {
      setLoading(true);
      try {
        const res = await hotelService.getHotelById(id);
        if (res.data?.data) {
          setHotel(res.data.data);
          if (res.data.data.rooms?.length > 0) {
            setSelectedRoom(res.data.data.rooms[0]);
          }
        }
      } catch {
        // Fallback hotel with rooms
        const fallback = {
          _id: id,
          name: 'Alila Cliffside Resort',
          city: 'Uluwatu',
          country: 'Bali',
          address: 'Jl. Belimbing Sari, Pecatu, South Kuta, Badung, Bali 80364',
          description:
            'Perched on stunning limestone cliffs 100 meters above the Indian Ocean, Alila Villas Uluwatu delivers awe-inspiring panoramic seascapes, an iconic infinity cantilever pool, and open-plan luxury villas crafted from local materials.',
          rating: 4.9,
          reviewCount: 142,
          pricePerNight: 285,
          images: [
            'https://lh3.googleusercontent.com/aida/ALJJyrCsOtAZoxRNbyreSaWNv4mYDq0gubEJKUncwxwOdfyF2BZ5lH3YVw_oqft8rZyUTghBDW3APpx6zznBX5HDsuggXK_oeN17RaJ6G8Xb5Y4noZTj2NlWBIzp8lMJnhV7mfG_WfHNXKrjqu3UV51-IIixDe2P-XfYeBAGuGBSw4fA2CsC7zdkZyCNNDKF3iY6b0SSDDz_qQ_ejzJl3ThO8Ldp-F778UbbWqYpyEUbryLU-HT99Q8',
            'https://lh3.googleusercontent.com/aida/ALJJyrACYLUn2xyyjRQ2vZRy8S4_jnvaavQ4eTTIT4mCOlbDMPeSwxjpT3uUeSCjJEQAOsu7X1i1uAbjBTtZaRDFhdh_zvFpTfypgvym2z3OhKeBC7wUtKE25ZkzW0q-lYDV9C_Dt8ODg5WE9jBwsZVv6WE23Bgq7Ifrx7Al-TZyYiRUT_l9POiBnpTaPh2QoMDCOdre2QqRCQoOFN01ibDHSTkCbym2K5oiFgrGzpXnkj0N-JOcB6A',
          ],
          amenities: [
            'Oceanfront Infinity Pool & Spa',
            'Private Sunset Cabanas',
            'Holistic Wellness Retreat',
            '24/7 Butler Service',
            'Complimentary High-speed Wi-Fi',
            'Gourmet Breakfast Included',
          ],
          rooms: [
            {
              _id: 'room-1',
              name: 'One-Bedroom Ocean Pool Villa',
              capacity: 2,
              pricePerNight: 285,
              bedType: '1 King Bed',
              amenities: ['Private Plunge Pool', 'Outdoor Rain Shower', 'Ocean View Terrace', 'Espresso Machine'],
            },
            {
              _id: 'room-2',
              name: 'Cliff Edge Sunset Sanctuary',
              capacity: 3,
              pricePerNight: 430,
              bedType: '1 King Bed + Daybed',
              amenities: ['Panoramic Cliff Views', 'Deep Soaking Marble Tub', 'Dedicated Butler', 'Complimentary Champagne'],
            },
          ],
        };
        setHotel(fallback);
        setSelectedRoom(fallback.rooms[0]);
      } finally {
        setLoading(false);
      }
    };

    fetchHotel();
  }, [id]);

  const handleBook = (room) => {
    if (hotel) {
      startHotelBooking(hotel, room || selectedRoom);
      navigate('/checkout');
    }
  };

  if (loading) {
    return (
      <div className="py-section text-center">
        <span className="material-symbols-outlined text-display-lg text-light-primary-container animate-spin">
          progress_activity
        </span>
        <p className="font-label text-label-md text-light-on-surface-variant mt-2">Loading hotel details...</p>
      </div>
    );
  }

  if (!hotel) {
    return (
      <div className="max-w-2xl mx-auto py-section text-center">
        <h2 className="font-headline text-headline-md text-light-on-surface">Hotel Not Found</h2>
        <Link to="/hotels" className="font-label text-light-primary-container underline mt-4 inline-block">
          Return to Hotel Search
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-gutter-md md:px-gutter-lg py-gutter-xl">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 font-label text-label-sm text-light-on-surface-variant mb-gutter-md">
        <Link to="/" className="hover:text-light-on-surface">Home</Link>
        <span>/</span>
        <Link to="/hotels" className="hover:text-light-on-surface">Hotels</Link>
        <span>/</span>
        <span className="text-light-on-surface">{hotel.name}</span>
      </nav>

      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-gutter-md mb-gutter-lg">
        <div>
          <h1 className="font-headline text-headline-lg-mobile md:text-headline-lg text-light-on-surface">{hotel.name}</h1>
          <p className="font-body text-body-md text-light-on-surface-variant flex items-center gap-1 mt-1">
            <span className="material-symbols-outlined text-body-md text-light-primary-container">location_on</span>
            {hotel.address || `${hotel.city}, ${hotel.country}`}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded bg-light-secondary-container text-light-on-secondary-container font-headline text-title-md font-bold">
            <span className="material-symbols-outlined text-title-md text-amber-star" style={{ fontVariationSettings: "'FILL' 1" }}>
              star
            </span>
            {hotel.rating.toFixed(1)}
          </span>
          <span className="font-body text-body-sm text-light-on-surface-variant">
            ({hotel.reviewCount} verified reviews)
          </span>
        </div>
      </div>

      {/* Photo Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter-md rounded-lg overflow-hidden mb-gutter-xl">
        <div className="md:col-span-2 h-80 sm:h-96">
          <img src={hotel.images?.[0]} alt={hotel.name} className="w-full h-full object-cover rounded-lg" />
        </div>
        <div className="flex flex-col gap-gutter-md h-80 sm:h-96">
          <img
            src={hotel.images?.[1] || hotel.images?.[0]}
            alt="Interior view"
            className="w-full h-1/2 object-cover rounded-lg"
          />
          <img
            src="https://lh3.googleusercontent.com/aida/ALJJyrAJmDRzj_dzFSlOBg_qvgqcO9DFaLMwrb5_8EaSryVstUlHDPvgWvvvwEj9BPsmd_PUxbAiPAlcn-P-Wt2D79xnLcDo8xaCsr-4EUcA4prKk7Gl6EDrvaD0VyDkegMQ6g6LALtkRBCUOjxMvbBhIYA9F4p_XuM108Y5UB9MQ1J4IYCQcbM-EpdDD0OGaXNhYPDe4O9pqydYyd9C4-wzfUY5DqQkdqei2Cz8OoRLD8Hp4MWwCnwC3G-gRQ"
            alt="Resort terrace"
            className="w-full h-1/2 object-cover rounded-lg"
          />
        </div>
      </div>

      {/* Main Content & Room Selection */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-xl items-start">
        {/* Left: About & Amenities */}
        <div className="lg:col-span-8 flex flex-col gap-gutter-xl">
          <div>
            <h2 className="font-headline text-title-lg text-light-on-surface mb-gutter-sm">About This Resort</h2>
            <p className="font-body text-body-lg text-light-on-surface-variant leading-relaxed">
              {hotel.description}
            </p>
          </div>

          <div>
            <h2 className="font-headline text-title-lg text-light-on-surface mb-gutter-sm">Top Amenities</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-gutter-md">
              {hotel.amenities?.map((amenity, idx) => (
                <div key={idx} className="flex items-center gap-2 bg-light-surface-container-low border border-light-outline-variant p-3 rounded-md">
                  <span className="material-symbols-outlined text-body-lg text-light-primary-container">check_circle</span>
                  <span className="font-body text-body-sm text-light-on-surface">{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Available Rooms */}
          <div>
            <h2 className="font-headline text-title-lg text-light-on-surface mb-gutter-md">Available Rooms &amp; Villas</h2>
            <div className="flex flex-col gap-gutter-md">
              {hotel.rooms?.map((room) => (
                <div
                  key={room._id}
                  className="bg-light-surface border border-light-outline-variant rounded-lg p-gutter-lg flex flex-col sm:flex-row sm:items-center justify-between gap-gutter-md shadow-sm"
                >
                  <div className="flex-1 flex flex-col gap-1">
                    <h3 className="font-headline text-title-md text-light-on-surface">{room.name}</h3>
                    <p className="font-body text-body-sm text-light-on-surface-variant">
                      {room.bedType} · Up to {room.capacity} Guests
                    </p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {room.amenities?.map((am, i) => (
                        <span key={i} className="px-2 py-0.5 rounded bg-light-surface-container text-body-xs text-light-on-surface-variant">
                          {am}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-gutter-sm min-w-[140px] pt-3 sm:pt-0 border-t sm:border-t-0 border-light-outline-variant">
                    <div className="tabular-nums text-left sm:text-right">
                      <p className="font-headline text-title-lg text-light-primary-container font-bold">${room.pricePerNight}</p>
                      <p className="font-body text-body-xs text-light-on-surface-variant">per night</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleBook(room)}
                      className="py-2 px-4 rounded bg-light-primary-container text-light-on-primary-container hover:bg-light-primary font-label text-label-md cursor-pointer transition-colors shadow-sm"
                    >
                      Book Room
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sticky Card */}
        <div className="lg:col-span-4 bg-light-surface border border-light-outline-variant rounded-lg p-gutter-lg shadow-sm sticky top-24 flex flex-col gap-gutter-md">
          <div className="flex items-baseline justify-between">
            <span className="font-headline text-headline-md text-light-primary-container font-bold tabular-nums">
              ${selectedRoom?.pricePerNight || hotel.pricePerNight}
            </span>
            <span className="font-body text-body-sm text-light-on-surface-variant">/ night</span>
          </div>

          <div className="bg-light-surface-container-low rounded-md border border-light-outline-variant p-3 flex flex-col gap-2 text-body-sm">
            <div className="flex justify-between">
              <span className="text-light-on-surface-variant">Selected Room:</span>
              <span className="font-semibold text-light-on-surface">{selectedRoom?.name || 'Standard Villa'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-light-on-surface-variant">Cancellation:</span>
              <span className="font-semibold text-emerald-badge">Free cancellation</span>
            </div>
            <div className="flex justify-between">
              <span className="text-light-on-surface-variant">Breakfast:</span>
              <span className="font-semibold text-light-on-surface">Included</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => handleBook(selectedRoom)}
            className="w-full py-3.5 rounded bg-light-primary-container text-light-on-primary-container hover:bg-light-primary font-label text-label-lg transition-colors cursor-pointer text-center shadow-sm flex items-center justify-center gap-2"
          >
            <span>Proceed to Reservation</span>
            <span className="material-symbols-outlined text-body-lg">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
}

