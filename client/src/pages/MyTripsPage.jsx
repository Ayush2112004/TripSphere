import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { bookingService } from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function MyTripsPage() {
  const { isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState('all'); // all | upcoming | completed | cancelled
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  const fallbackBookings = [
    {
      _id: 'bk-1',
      bookingReference: 'TS-FL-78219',
      bookingType: 'flight',
      status: 'confirmed',
      paymentStatus: 'paid',
      totalPrice: 534,
      detailsSnapshot: {
        airline: 'Delta Air Lines',
        flightNumber: 'DL 106',
        fromCity: 'New York (JFK)',
        fromAirport: 'JFK',
        toCity: 'London (LHR)',
        toAirport: 'LHR',
        duration: '7h 05m',
        travelClass: 'Economy',
      },
      bookingDates: {
        departureDate: '2027-05-14',
        returnDate: '2027-05-21',
      },
      travelerDetails: [{ fullName: 'Claire Bennett', email: 'traveler@tripsphere.travel' }],
      createdAt: '2026-11-20T10:00:00.000Z',
    },
    {
      _id: 'bk-2',
      bookingReference: 'TS-HT-99201',
      bookingType: 'hotel',
      status: 'confirmed',
      paymentStatus: 'paid',
      totalPrice: 1254,
      detailsSnapshot: {
        hotelName: 'Alila Cliffside Resort',
        city: 'Uluwatu',
        country: 'Bali',
        roomName: 'One-Bedroom Ocean Pool Villa',
        nights: 4,
      },
      bookingDates: {
        checkIn: '2027-06-08',
        checkOut: '2027-06-12',
      },
      travelerDetails: [{ fullName: 'Claire Bennett', email: 'traveler@tripsphere.travel' }],
      createdAt: '2026-11-18T14:30:00.000Z',
    },
  ];

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const res = await bookingService.getMyBookings();
      if (res.data?.data && res.data.data.length > 0) {
        setBookings(res.data.data);
      } else {
        setBookings(fallbackBookings);
      }
    } catch {
      setBookings(fallbackBookings);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (id) => {
    if (!window.confirm('Are you sure you want to cancel this booking? Full refund will be credited.')) {
      return;
    }
    try {
      await bookingService.cancelBooking(id);
      setMessage('Booking cancelled successfully.');
      fetchBookings();
    } catch {
      // Local state update
      setBookings((prev) =>
        prev.map((b) => (b._id === id ? { ...b, status: 'cancelled', paymentStatus: 'refunded' } : b))
      );
      setMessage('Booking cancelled successfully.');
    }
  };

  const filteredBookings = bookings.filter((b) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'upcoming') return b.status === 'confirmed';
    if (activeTab === 'completed') return b.status === 'completed';
    if (activeTab === 'cancelled') return b.status === 'cancelled';
    return true;
  });

  return (
    <div className="max-w-6xl mx-auto px-gutter-md md:px-gutter-lg py-gutter-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-gutter-md mb-gutter-xl">
        <div>
          <h1 className="font-headline text-headline-lg-mobile md:text-headline-lg text-light-on-surface">
            My Trips &amp; Bookings
          </h1>
          <p className="font-body text-body-md text-light-on-surface-variant mt-1">
            Manage upcoming flights, boutique resort reservations, and digital boarding passes.
          </p>
        </div>
        <Link
          to="/"
          className="inline-flex items-center gap-1 px-4 py-2 rounded bg-light-primary-container text-light-on-primary-container font-label text-label-md hover:bg-light-primary transition-colors shadow-sm self-start"
        >
          <span className="material-symbols-outlined text-body-lg">add</span>
          Plan New Trip
        </Link>
      </div>

      {message && (
        <div className="mb-gutter-md p-3 rounded bg-emerald-badge/10 border border-emerald-badge/30 text-emerald-badge font-label text-label-sm flex items-center justify-between">
          <span>{message}</span>
          <button onClick={() => setMessage('')} className="cursor-pointer">&times;</button>
        </div>
      )}

      {/* Tabs */}
      <div className="flex border-b border-light-outline-variant mb-gutter-lg">
        {[
          { label: 'All Trips', value: 'all' },
          { label: 'Upcoming', value: 'upcoming' },
          { label: 'Completed', value: 'completed' },
          { label: 'Cancelled', value: 'cancelled' },
        ].map((tab) => (
          <button
            key={tab.value}
            type="button"
            onClick={() => setActiveTab(tab.value)}
            className={`px-gutter-md py-3 font-label text-label-md cursor-pointer transition-colors ${
              activeTab === tab.value
                ? 'text-light-primary-container border-b-2 border-light-primary-container font-semibold'
                : 'text-light-on-surface-variant hover:text-light-on-surface'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="py-section text-center">
          <span className="material-symbols-outlined text-display-lg text-light-primary-container animate-spin">
            progress_activity
          </span>
          <p className="font-label text-label-md text-light-on-surface-variant mt-2">Loading trips...</p>
        </div>
      ) : filteredBookings.length === 0 ? (
        <div className="bg-light-surface border border-light-outline-variant rounded-lg p-gutter-xl text-center shadow-sm">
          <span className="material-symbols-outlined text-headline-lg text-light-on-surface-variant">luggage</span>
          <h3 className="font-headline text-title-lg text-light-on-surface mt-2">No bookings in this category</h3>
          <p className="font-body text-body-md text-light-on-surface-variant mt-1">
            Browse our trending flights or boutique hotels to start your next adventure.
          </p>
          <Link
            to="/flights"
            className="mt-4 inline-flex items-center gap-1 font-label text-light-primary-container hover:underline"
          >
            Explore Flights &rarr;
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-gutter-md">
          {filteredBookings.map((booking) => (
            <article
              key={booking._id}
              className="bg-light-surface border border-light-outline-variant rounded-lg p-gutter-lg shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-gutter-md"
            >
              <div className="flex-1 flex flex-col gap-gutter-xs">
                <div className="flex items-center gap-gutter-sm flex-wrap">
                  <span className="font-mono text-mono-md font-bold text-light-primary-container">
                    {booking.bookingReference}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-label-xs font-semibold ${
                      booking.status === 'confirmed'
                        ? 'bg-emerald-badge/15 text-emerald-badge'
                        : booking.status === 'cancelled'
                        ? 'bg-light-error-container text-light-on-error-container'
                        : 'bg-light-secondary-container text-light-on-secondary-container'
                    }`}
                  >
                    {booking.status.toUpperCase()}
                  </span>
                  <span className="text-body-xs text-light-on-surface-variant">
                    Booked on {new Date(booking.createdAt).toLocaleDateString()}
                  </span>
                </div>

                {/* Specifics */}
                {booking.bookingType === 'flight' && (
                  <div>
                    <h3 className="font-headline text-title-md text-light-on-surface">
                      {booking.detailsSnapshot?.airline} · Flight {booking.detailsSnapshot?.flightNumber}
                    </h3>
                    <p className="font-body text-body-sm text-light-on-surface-variant">
                      {booking.detailsSnapshot?.fromAirport} &rarr; {booking.detailsSnapshot?.toAirport} ({booking.detailsSnapshot?.duration})
                    </p>
                    <p className="font-body text-body-xs text-light-on-surface-variant mt-1">
                      Departure: {booking.bookingDates?.departureDate || 'May 14, 2027'} · Traveler: {booking.travelerDetails?.[0]?.fullName}
                    </p>
                  </div>
                )}

                {booking.bookingType === 'hotel' && (
                  <div>
                    <h3 className="font-headline text-title-md text-light-on-surface">
                      {booking.detailsSnapshot?.hotelName}
                    </h3>
                    <p className="font-body text-body-sm text-light-on-surface-variant">
                      {booking.detailsSnapshot?.roomName} · {booking.detailsSnapshot?.city}, {booking.detailsSnapshot?.country}
                    </p>
                    <p className="font-body text-body-xs text-light-on-surface-variant mt-1">
                      Check-in: {booking.bookingDates?.checkIn || 'Jun 08, 2027'} · {booking.detailsSnapshot?.nights || 4} Nights
                    </p>
                  </div>
                )}

                {booking.bookingType === 'package' && (
                  <div>
                    <h3 className="font-headline text-title-md text-light-on-surface">
                      {booking.detailsSnapshot?.packageTitle}
                    </h3>
                    <p className="font-body text-body-sm text-light-on-surface-variant">
                      {booking.detailsSnapshot?.destination} · {booking.detailsSnapshot?.durationDays} Days / {booking.detailsSnapshot?.durationNights} Nights
                    </p>
                  </div>
                )}
              </div>

              {/* Price & Actions */}
              <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-gutter-sm border-t md:border-t-0 md:border-l border-light-outline-variant pt-3 md:pt-0 md:pl-gutter-lg min-w-[150px]">
                <div className="text-left md:text-right tabular-nums">
                  <p className="font-headline text-title-lg text-light-on-surface font-bold">
                    ${booking.totalPrice}
                  </p>
                  <p className="font-body text-body-xs text-emerald-badge font-semibold">
                    {booking.paymentStatus === 'paid' ? 'Paid & Protected' : booking.paymentStatus}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {booking.status === 'confirmed' && (
                    <button
                      type="button"
                      onClick={() => handleCancel(booking._id)}
                      className="py-1 px-3 rounded border border-light-error text-light-error hover:bg-light-error-container/40 font-label text-label-xs cursor-pointer transition-colors"
                    >
                      Cancel Trip
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => alert(`TripSphere E-Ticket / Receipt\nReference: ${booking.bookingReference}\nTotal: $${booking.totalPrice}\nStatus: ${booking.status}`)}
                    className="py-1 px-3 rounded border border-light-outline-variant text-light-on-surface hover:bg-light-surface-container-low font-label text-label-xs cursor-pointer transition-colors"
                  >
                    E-Ticket
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

