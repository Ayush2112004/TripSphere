import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { flightService } from '../services/api';
import { useBooking } from '../context/BookingContext';
import { useAuth } from '../context/AuthContext';

export default function FlightDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { startFlightBooking } = useBooking();
  const { isAuthenticated } = useAuth();

  const [flight, setFlight] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFlight = async () => {
      setLoading(true);
      try {
        const res = await flightService.getFlightById(id);
        if (res.data?.data) {
          setFlight(res.data.data);
        }
      } catch {
        // Fallback detail
        setFlight({
          _id: id,
          airline: 'Delta Air Lines',
          airlineCode: 'DL',
          flightNumber: 'DL 106',
          fromCity: 'New York (JFK)',
          fromAirport: 'JFK',
          toCity: 'London (LHR)',
          toAirport: 'LHR',
          departureTime: '19:30',
          arrivalTime: '07:35',
          duration: '7h 05m',
          stops: 0,
          stopsDetails: 'Non-stop Flight',
          price: 489,
          travelClass: 'Economy',
          baggageAllowance: '1 Personal Item (under-seat) + 1 Carry-on (23kg)',
          availableSeats: 38,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchFlight();
  }, [id]);

  const handleBook = () => {
    if (flight) {
      startFlightBooking(flight);
      if (!isAuthenticated) {
        navigate('/login', {
          state: {
            from: { pathname: '/checkout' },
            message: 'Please sign in or create an account to book your flight.',
          },
        });
      } else {
        navigate('/checkout');
      }
    }
  };

  if (loading) {
    return (
      <div className="py-section text-center">
        <span className="material-symbols-outlined text-display-lg text-light-primary-container animate-spin">
          progress_activity
        </span>
        <p className="font-label text-label-md text-light-on-surface-variant mt-2">Loading flight details...</p>
      </div>
    );
  }

  if (!flight) {
    return (
      <div className="max-w-2xl mx-auto py-section text-center">
        <h2 className="font-headline text-headline-md text-light-on-surface">Flight Not Found</h2>
        <Link to="/flights" className="font-label text-light-primary-container underline mt-4 inline-block">
          Return to Flight Search
        </Link>
      </div>
    );
  }

  const basePrice = flight.price;
  const taxesAndFees = Math.round(basePrice * 0.1);
  const totalPrice = basePrice + taxesAndFees;

  return (
    <div className="max-w-5xl mx-auto px-gutter-md md:px-gutter-lg py-gutter-xl">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 font-label text-label-sm text-light-on-surface-variant mb-gutter-md">
        <Link to="/" className="hover:text-light-on-surface">Home</Link>
        <span>/</span>
        <Link to="/flights" className="hover:text-light-on-surface">Flights</Link>
        <span>/</span>
        <span className="text-light-on-surface">{flight.airline} {flight.flightNumber}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-lg items-start">
        {/* Left Column: Flight Overview, Route, Fare Rules */}
        <div className="lg:col-span-8 flex flex-col gap-gutter-md">
          {/* Main Card */}
          <div className="bg-light-surface border border-light-outline-variant rounded-lg p-gutter-lg shadow-sm">
            <div className="flex items-center justify-between pb-gutter-md border-b border-light-outline-variant">
              <div className="flex items-center gap-gutter-sm">
                <span className="w-10 h-10 rounded-md bg-light-secondary-container text-light-on-secondary-container flex items-center justify-center font-bold text-label-md">
                  {flight.airlineCode}
                </span>
                <div>
                  <h1 className="font-headline text-title-lg text-light-on-surface">{flight.airline}</h1>
                  <p className="font-body text-body-sm text-light-on-surface-variant">Flight {flight.flightNumber} · Boeing 777-300ER</p>
                </div>
              </div>
              <span className="px-gutter-sm py-1 rounded-full bg-light-secondary-container text-light-on-secondary-container font-label text-label-sm font-semibold">
                {flight.stopsDetails || (flight.stops === 0 ? 'Non-stop' : `${flight.stops} Stop`)}
              </span>
            </div>

            {/* Flight Itinerary Details */}
            <div className="py-gutter-md flex items-center justify-between gap-gutter-md">
              <div>
                <p className="font-headline text-headline-md text-light-on-surface">{flight.departureTime}</p>
                <p className="font-mono text-mono-md text-light-primary-container font-bold">{flight.fromAirport}</p>
                <p className="font-body text-body-sm text-light-on-surface">{flight.fromCity}</p>
                <p className="font-body text-body-xs text-light-on-surface-variant">Terminal 4, Gate B22</p>
              </div>

              <div className="flex-1 flex flex-col items-center">
                <span className="font-body text-body-sm text-light-on-surface-variant tabular-nums mb-1">{flight.duration}</span>
                <div className="relative w-full flex items-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-light-primary-container"></div>
                  <div className="flex-1 h-0.5 bg-light-outline-variant"></div>
                  <span className="material-symbols-outlined text-title-md text-light-primary-container px-2">flight_takeoff</span>
                  <div className="flex-1 h-0.5 bg-light-outline-variant"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-light-primary-container"></div>
                </div>
                <span className="text-body-xs text-light-on-surface-variant mt-1">Direct Flight</span>
              </div>

              <div className="text-right">
                <p className="font-headline text-headline-md text-light-on-surface">{flight.arrivalTime}</p>
                <p className="font-mono text-mono-md text-light-primary-container font-bold">{flight.toAirport}</p>
                <p className="font-body text-body-sm text-light-on-surface">{flight.toCity}</p>
                <p className="font-body text-body-xs text-light-on-surface-variant">Terminal 2, Gate A14</p>
              </div>
            </div>

            {/* In-Flight Amenities & Inclusions */}
            <div className="pt-gutter-md border-t border-light-outline-variant grid grid-cols-2 sm:grid-cols-4 gap-gutter-sm">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-body-lg text-light-primary-container">luggage</span>
                <span className="font-body text-body-xs text-light-on-surface">1 Carry-on (23kg)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-body-lg text-light-primary-container">wifi</span>
                <span className="font-body text-body-xs text-light-on-surface">Wi-Fi Available</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-body-lg text-light-primary-container">restaurant</span>
                <span className="font-body text-body-xs text-light-on-surface">Complimentary Meal</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-body-lg text-light-primary-container">power</span>
                <span className="font-body text-body-xs text-light-on-surface">In-seat USB Power</span>
              </div>
            </div>
          </div>

          {/* Fare Rules & Policies */}
          <div className="bg-light-surface border border-light-outline-variant rounded-lg p-gutter-lg shadow-sm">
            <h3 className="font-headline text-title-md text-light-on-surface mb-gutter-sm">Fare Rules &amp; Baggage Allowance</h3>
            <ul className="flex flex-col gap-2 font-body text-body-sm text-light-on-surface-variant">
              <li className="flex items-start gap-2">
                <span className="material-symbols-outlined text-emerald-badge text-body-md mt-0.5">check_circle</span>
                <span><strong>Baggage:</strong> {flight.baggageAllowance}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="material-symbols-outlined text-emerald-badge text-body-md mt-0.5">check_circle</span>
                <span><strong>Cancellation:</strong> Full refund within 24 hours of booking. Standard airline fee applies thereafter.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="material-symbols-outlined text-emerald-badge text-body-md mt-0.5">check_circle</span>
                <span><strong>Changes:</strong> Date changes permitted up to 2 hours before scheduled departure.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Column: Price Breakdown Card & Book Button */}
        <div className="lg:col-span-4 bg-light-surface border border-light-outline-variant rounded-lg p-gutter-lg shadow-sm flex flex-col gap-gutter-md sticky top-24">
          <h3 className="font-headline text-title-lg text-light-on-surface">Price Breakdown</h3>

          <div className="flex flex-col gap-gutter-xs text-body-sm">
            <div className="flex justify-between text-light-on-surface-variant">
              <span>Base Fare (1 Adult)</span>
              <span className="tabular-nums font-semibold text-light-on-surface">${basePrice}</span>
            </div>
            <div className="flex justify-between text-light-on-surface-variant">
              <span>Taxes &amp; Airline Fees</span>
              <span className="tabular-nums font-semibold text-light-on-surface">${taxesAndFees}</span>
            </div>
            <div className="flex justify-between text-light-on-surface-variant">
              <span>Travel Protection &amp; ATOL</span>
              <span className="font-semibold text-emerald-badge">Included</span>
            </div>
            <div className="h-px bg-light-outline-variant my-1"></div>
            <div className="flex justify-between items-baseline font-headline text-title-lg text-light-on-surface">
              <span>Total Amount</span>
              <span className="text-headline-md text-light-primary-container tabular-nums">${totalPrice}</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleBook}
            className="w-full py-3.5 rounded bg-light-primary-container text-light-on-primary-container hover:bg-light-primary font-label text-label-lg transition-colors cursor-pointer text-center shadow-sm flex items-center justify-center gap-2"
          >
            <span>Proceed to Booking</span>
            <span className="material-symbols-outlined text-body-lg">arrow_forward</span>
          </button>

          <p className="text-center font-body text-body-xs text-light-on-surface-variant">
            Zero hidden booking fees · Instant e-ticket confirmation
          </p>
        </div>
      </div>
    </div>
  );
}

