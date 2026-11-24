import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useBooking } from '../../context/BookingContext';
import { useAuth } from '../../context/AuthContext';

const FLIGHT_DEALS = [
  {
    id: 'deal-1',
    airline: 'Delta Air Lines',
    airlineCode: 'DL',
    flightNumber: 'DL 106',
    dateRange: 'May 14 – May 21',
    departureAirport: 'JFK',
    departureCity: 'New York',
    arrivalAirport: 'LHR',
    arrivalCity: 'London',
    duration: '7h 05m',
    stops: 'Non-stop',
    price: 489,
    icon: 'airlines',
  },
  {
    id: 'deal-2',
    airline: 'ANA All Nippon',
    airlineCode: 'NH',
    flightNumber: 'NH 107',
    dateRange: 'Jun 03 – Jun 12',
    departureAirport: 'SFO',
    departureCity: 'San Francisco',
    arrivalAirport: 'HND',
    arrivalCity: 'Tokyo',
    duration: '11h 15m',
    stops: 'Non-stop',
    price: 742,
    icon: 'flight',
  },
  {
    id: 'deal-3',
    airline: 'Air France',
    airlineCode: 'AF',
    flightNumber: 'AF 333',
    dateRange: 'Jul 09 – Jul 17',
    departureAirport: 'BOS',
    departureCity: 'Boston',
    arrivalAirport: 'FCO',
    arrivalCity: 'Rome',
    duration: '9h 40m',
    stops: '1 Stop',
    price: 568,
    icon: 'airplanemode_active',
  },
];

export default function FlightDeals() {
  const navigate = useNavigate();
  const { startFlightBooking } = useBooking();
  const { isAuthenticated } = useAuth();

  const handleSelectFlight = (deal) => {
    // Start checkout or detail flow
    startFlightBooking({
      _id: deal.id,
      airline: deal.airline,
      airlineCode: deal.airlineCode,
      flightNumber: deal.flightNumber,
      fromCity: deal.departureCity,
      fromAirport: deal.departureAirport,
      toCity: deal.arrivalCity,
      toAirport: deal.arrivalAirport,
      duration: deal.duration,
      stops: deal.stops === 'Non-stop' ? 0 : 1,
      price: deal.price,
      travelClass: 'Economy',
    });
    if (!isAuthenticated) {
      navigate('/login', {
        state: {
          from: { pathname: '/checkout' },
          message: 'Please sign in or create an account to book this flight deal.',
        },
      });
    } else {
      navigate('/checkout');
    }
  };

  return (
    <section id="flights-deals" className="bg-light-surface-container-low border-y border-light-outline-variant py-section">
      <div className="max-w-7xl mx-auto px-gutter-md md:px-gutter-lg">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-gutter-md mb-gutter-xl">
          <div>
            <h2
              className="font-headline text-headline-lg-mobile md:text-headline-lg text-light-on-surface mb-gutter-xs"
              data-design-text-token="headline-lg"
            >
              Trending Flight Deals
            </h2>
            <p className="font-body text-body-md text-light-on-surface-variant" data-design-text-token="body-md">
              Round-trip fares departing over the next 60 days, updated hourly.
            </p>
          </div>
          <Link
            to="/flights"
            className="inline-flex items-center gap-gutter-xs font-label text-label-lg text-light-primary-container hover:text-light-primary transition-colors"
            data-design-text-token="label-lg"
          >
            <span>View all flight routes</span>
            <span className="material-symbols-outlined text-body-lg" aria-hidden="true">
              arrow_forward
            </span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter-lg items-stretch">
          {FLIGHT_DEALS.map((deal) => (
            <article
              key={deal.id}
              className="h-full bg-light-surface border border-light-outline-variant rounded-lg p-gutter-lg flex flex-col justify-between gap-gutter-md shadow-sm transition-all hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-gutter-sm">
                  <span className="w-9 h-9 rounded-md bg-light-secondary-container text-light-on-secondary-container flex items-center justify-center">
                    <span className="material-symbols-outlined text-title-md" aria-hidden="true">
                      {deal.icon}
                    </span>
                  </span>
                  <div>
                    <p className="font-label text-label-lg text-light-on-surface" data-design-text-token="label-lg">
                      {deal.airline}
                    </p>
                    <p className="font-body text-body-sm text-light-on-surface-variant" data-design-text-token="body-sm">
                      {deal.dateRange}
                    </p>
                  </div>
                </div>
                <span
                  data-component-id="badge-status"
                  data-component-type="badge"
                  data-component-variant="status"
                  className="px-gutter-sm py-1 rounded-full bg-light-secondary-container text-light-on-secondary-container font-label text-label-sm"
                  data-design-text-token="label-sm"
                >
                  {deal.stops}
                </span>
              </div>

              <div className="flex items-center justify-between gap-gutter-sm py-gutter-sm border-y border-light-outline-variant">
                <div>
                  <p className="font-mono text-mono-md text-light-on-surface font-bold" data-design-text-token="mono-md">
                    {deal.departureAirport}
                  </p>
                  <p className="font-body text-body-sm text-light-on-surface-variant" data-design-text-token="body-sm">
                    {deal.departureCity}
                  </p>
                </div>
                <div className="flex-1 flex flex-col items-center gap-1">
                  <span className="font-body text-body-sm text-light-on-surface-variant tabular-nums" data-design-text-token="body-sm">
                    {deal.duration}
                  </span>
                  <div className="w-full h-px bg-light-outline-variant"></div>
                </div>
                <div className="text-right">
                  <p className="font-mono text-mono-md text-light-on-surface font-bold" data-design-text-token="mono-md">
                    {deal.arrivalAirport}
                  </p>
                  <p className="font-body text-body-sm text-light-on-surface-variant" data-design-text-token="body-sm">
                    {deal.arrivalCity}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="tabular-nums">
                  <span className="font-headline text-title-lg text-light-primary-container" data-design-text-token="title-lg">
                    ${deal.price}
                  </span>
                  <span className="font-body text-body-sm text-light-on-surface-variant ml-1" data-design-text-token="body-sm">
                    round trip
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleSelectFlight(deal)}
                  className="px-gutter-md py-2 rounded bg-light-primary-container text-light-on-primary-container hover:bg-light-primary font-label text-label-md cursor-pointer transition-colors"
                >
                  <span data-design-text-token="label-md">Select Flight</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

