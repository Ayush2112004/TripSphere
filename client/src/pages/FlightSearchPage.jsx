import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { flightService } from '../services/api';
import { useBooking } from '../context/BookingContext';
import { useAuth } from '../context/AuthContext';

export default function FlightSearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { startFlightBooking } = useBooking();
  const { isAuthenticated } = useAuth();

  const [fromCity, setFromCity] = useState(searchParams.get('from') || 'New York (JFK)');
  const [toCity, setToCity] = useState(searchParams.get('to') || 'London (LHR)');
  const [departureDate, setDepartureDate] = useState(searchParams.get('departure') || '2027-05-14');
  const [returnDate, setReturnDate] = useState(searchParams.get('returnDate') || '2027-05-21');
  const [passengers, setPassengers] = useState(Number(searchParams.get('passengers')) || 1);
  const [travelClass, setTravelClass] = useState(searchParams.get('class') || 'Economy');

  // Filters
  const [selectedStops, setSelectedStops] = useState('all');
  const [selectedAirline, setSelectedAirline] = useState('All');
  const [maxPrice, setMaxPrice] = useState(1500);
  const [sortBy, setSortBy] = useState('price-asc');

  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fallback realistic flights if API is connecting
  const fallbackFlights = [
    {
      _id: 'fl-1',
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
      stopsDetails: 'Non-stop',
      price: 489,
      travelClass: 'Economy',
      baggageAllowance: '1 Personal Item + 1 Carry-on (23kg)',
      availableSeats: 38,
    },
    {
      _id: 'fl-2',
      airline: 'ANA All Nippon',
      airlineCode: 'NH',
      flightNumber: 'NH 107',
      fromCity: 'San Francisco (SFO)',
      fromAirport: 'SFO',
      toCity: 'Tokyo (HND)',
      toAirport: 'HND',
      departureTime: '11:15',
      arrivalTime: '15:30',
      duration: '11h 15m',
      stops: 0,
      stopsDetails: 'Non-stop',
      price: 742,
      travelClass: 'Economy',
      baggageAllowance: '2 Checked Bags (23kg each)',
      availableSeats: 26,
    },
    {
      _id: 'fl-3',
      airline: 'Air France',
      airlineCode: 'AF',
      flightNumber: 'AF 333',
      fromCity: 'Boston (BOS)',
      fromAirport: 'BOS',
      toCity: 'Rome (FCO)',
      toAirport: 'FCO',
      departureTime: '17:45',
      arrivalTime: '08:25',
      duration: '9h 40m',
      stops: 1,
      stopsDetails: '1 Stop via CDG Paris',
      price: 568,
      travelClass: 'Economy',
      baggageAllowance: '1 Checked Bag (23kg)',
      availableSeats: 42,
    },
    {
      _id: 'fl-4',
      airline: 'Delta Air Lines',
      airlineCode: 'DL',
      flightNumber: 'DL 242',
      fromCity: 'New York (JFK)',
      fromAirport: 'JFK',
      toCity: 'Santorini (JTR)',
      toAirport: 'JTR',
      departureTime: '21:00',
      arrivalTime: '14:20',
      duration: '10h 20m',
      stops: 1,
      stopsDetails: '1 Stop via ATH Athens',
      price: 545,
      travelClass: 'Economy',
      baggageAllowance: '1 Carry-on + 1 Checked Bag',
      availableSeats: 19,
    },
  ];

  useEffect(() => {
    fetchFlights();
  }, [searchParams, sortBy, selectedStops, selectedAirline, maxPrice]);

  const fetchFlights = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await flightService.getFlights({
        from: fromCity,
        to: toCity,
        stops: selectedStops,
        airline: selectedAirline,
        maxPrice,
        sort: sortBy,
      });
      if (res.data?.data && res.data.data.length > 0) {
        setFlights(res.data.data);
      } else {
        setFlights(fallbackFlights);
      }
    } catch {
      setFlights(fallbackFlights);
    } finally {
      setLoading(false);
    }
  };

  const handleSwap = () => {
    const temp = fromCity;
    setFromCity(toCity);
    setToCity(temp);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchParams({
      from: fromCity,
      to: toCity,
      departure: departureDate,
      returnDate,
      passengers,
      class: travelClass,
    });
  };

  const handleSelectFlight = (flight) => {
    startFlightBooking(flight, {
      passengers,
      travelClass,
      departureDate,
      returnDate,
    });
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
  };

  const handleViewDetails = (id) => {
    navigate(`/flights/${id}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-gutter-md md:px-gutter-lg py-gutter-xl">
      {/* Header Search Modification Bar */}
      <div className="bg-light-surface border border-light-outline-variant rounded-lg p-gutter-md md:p-gutter-lg mb-gutter-xl shadow-sm">
        <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-12 gap-gutter-sm items-center">
          <div className="md:col-span-5 grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] items-center gap-gutter-xs bg-light-surface-container-low rounded-md border border-light-outline-variant p-gutter-xs">
            <div className="flex flex-col px-gutter-sm py-1">
              <span className="flex items-center gap-1 font-label text-label-xs text-light-on-surface-variant">
                <span className="material-symbols-outlined text-body-sm">flight_takeoff</span>
                From
              </span>
              <input
                type="text"
                value={fromCity}
                onChange={(e) => setFromCity(e.target.value)}
                className="border-0 bg-transparent p-0 font-title text-title-md text-light-on-surface focus:ring-0 outline-none w-full"
              />
            </div>

            <button
              type="button"
              onClick={handleSwap}
              className="mx-auto inline-flex items-center justify-center w-8 h-8 rounded-full bg-light-surface border border-light-outline-variant text-light-primary-container hover:bg-light-secondary-container transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-body-md">swap_horiz</span>
            </button>

            <div className="flex flex-col px-gutter-sm py-1">
              <span className="flex items-center gap-1 font-label text-label-xs text-light-on-surface-variant">
                <span className="material-symbols-outlined text-body-sm">flight_land</span>
                To
              </span>
              <input
                type="text"
                value={toCity}
                onChange={(e) => setToCity(e.target.value)}
                className="border-0 bg-transparent p-0 font-title text-title-md text-light-on-surface focus:ring-0 outline-none w-full"
              />
            </div>
          </div>

          <div className="md:col-span-3 grid grid-cols-2 gap-gutter-xs bg-light-surface-container-low rounded-md border border-light-outline-variant p-gutter-xs">
            <div className="flex flex-col px-gutter-sm py-1">
              <span className="font-label text-label-xs text-light-on-surface-variant">Departure</span>
              <input
                type="text"
                value={departureDate}
                onChange={(e) => setDepartureDate(e.target.value)}
                className="border-0 bg-transparent p-0 font-title text-body-md font-semibold text-light-on-surface tabular-nums focus:ring-0 outline-none w-full"
              />
            </div>
            <div className="flex flex-col px-gutter-sm py-1 border-l border-light-outline-variant">
              <span className="font-label text-label-xs text-light-on-surface-variant">Return</span>
              <input
                type="text"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                className="border-0 bg-transparent p-0 font-title text-body-md font-semibold text-light-on-surface tabular-nums focus:ring-0 outline-none w-full"
              />
            </div>
          </div>

          <div className="md:col-span-2 bg-light-surface-container-low rounded-md border border-light-outline-variant p-gutter-xs">
            <div className="flex flex-col px-gutter-sm py-1">
              <span className="font-label text-label-xs text-light-on-surface-variant">Travellers &amp; Class</span>
              <select
                value={travelClass}
                onChange={(e) => setTravelClass(e.target.value)}
                className="border-0 bg-transparent p-0 font-title text-body-sm font-semibold text-light-on-surface focus:ring-0 outline-none cursor-pointer"
              >
                <option value="Economy">1 Traveler · Economy</option>
                <option value="Premium Economy">1 Traveler · Premium</option>
                <option value="Business">1 Traveler · Business</option>
              </select>
            </div>
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full py-3 rounded-md bg-light-primary-container text-light-on-primary-container hover:bg-light-primary font-label text-label-md transition-colors cursor-pointer flex items-center justify-center gap-1 shadow-sm"
            >
              <span className="material-symbols-outlined text-body-lg">search</span>
              <span>Update Search</span>
            </button>
          </div>
        </form>
      </div>

      {/* Main Grid: Sidebar Filters & Results */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-lg items-start">
        {/* Filters Sidebar */}
        <aside className="lg:col-span-3 bg-light-surface border border-light-outline-variant rounded-lg p-gutter-md flex flex-col gap-gutter-md shadow-sm">
          <div className="flex items-center justify-between pb-gutter-sm border-b border-light-outline-variant">
            <h3 className="font-headline text-title-md text-light-on-surface flex items-center gap-1">
              <span className="material-symbols-outlined text-title-md">tune</span>
              Filters
            </h3>
            <button
              type="button"
              onClick={() => {
                setSelectedStops('all');
                setSelectedAirline('All');
                setMaxPrice(1500);
              }}
              className="font-label text-label-xs text-light-primary-container hover:underline cursor-pointer"
            >
              Reset
            </button>
          </div>

          {/* Stops Filter */}
          <div>
            <h4 className="font-label text-label-md text-light-on-surface mb-2">Stops</h4>
            <div className="flex flex-col gap-1.5">
              {[
                { label: 'All Flights', value: 'all' },
                { label: 'Non-stop Only', value: '0' },
                { label: '1 Stop', value: '1' },
              ].map((stop) => (
                <label key={stop.value} className="flex items-center gap-2 cursor-pointer font-body text-body-sm text-light-on-surface">
                  <input
                    type="radio"
                    name="stops"
                    value={stop.value}
                    checked={selectedStops === stop.value}
                    onChange={(e) => setSelectedStops(e.target.value)}
                    className="text-light-primary-container focus:ring-light-primary-container"
                  />
                  <span>{stop.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Airlines Filter */}
          <div className="pt-gutter-sm border-t border-light-outline-variant">
            <h4 className="font-label text-label-md text-light-on-surface mb-2">Airlines</h4>
            <div className="flex flex-col gap-1.5">
              {['All', 'Delta Air Lines', 'ANA All Nippon', 'Air France', 'Emirates'].map((airline) => (
                <label key={airline} className="flex items-center gap-2 cursor-pointer font-body text-body-sm text-light-on-surface">
                  <input
                    type="radio"
                    name="airline"
                    value={airline}
                    checked={selectedAirline === airline}
                    onChange={(e) => setSelectedAirline(e.target.value)}
                    className="text-light-primary-container focus:ring-light-primary-container"
                  />
                  <span>{airline}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range Slider */}
          <div className="pt-gutter-sm border-t border-light-outline-variant">
            <div className="flex items-center justify-between mb-1">
              <h4 className="font-label text-label-md text-light-on-surface">Max Price</h4>
              <span className="font-headline text-title-md text-light-primary-container tabular-nums">${maxPrice}</span>
            </div>
            <input
              type="range"
              min="300"
              max="2000"
              step="50"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-light-primary-container cursor-pointer"
            />
            <div className="flex justify-between text-body-xs text-light-on-surface-variant mt-1">
              <span>$300</span>
              <span>$2,000</span>
            </div>
          </div>
        </aside>

        {/* Results Container */}
        <section className="lg:col-span-9 flex flex-col gap-gutter-md">
          {/* Results Summary & Sorting Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-gutter-sm bg-light-surface-container-low border border-light-outline-variant rounded-md px-gutter-md py-2.5">
            <p className="font-body text-body-sm text-light-on-surface">
              Showing <span className="font-semibold text-light-on-surface">{flights.length} flights</span> available
            </p>
            <div className="flex items-center gap-2">
              <span className="font-label text-label-sm text-light-on-surface-variant">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="rounded border border-light-outline-variant bg-light-surface px-2 py-1 text-label-sm text-light-on-surface focus:ring-0 outline-none cursor-pointer"
              >
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="duration">Fastest Duration</option>
              </select>
            </div>
          </div>

          {/* Flights List */}
          {loading ? (
            <div className="py-section text-center">
              <span className="material-symbols-outlined text-display-lg text-light-primary-container animate-spin">
                progress_activity
              </span>
              <p className="font-label text-label-md text-light-on-surface-variant mt-2">Searching available flights...</p>
            </div>
          ) : flights.length === 0 ? (
            <div className="bg-light-surface border border-light-outline-variant rounded-lg p-gutter-xl text-center">
              <span className="material-symbols-outlined text-headline-lg text-light-on-surface-variant">flight_sm</span>
              <h3 className="font-headline text-title-lg text-light-on-surface mt-2">No matching flights found</h3>
              <p className="font-body text-body-md text-light-on-surface-variant mt-1">
                Try widening your price range or adjusting your dates.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-gutter-md">
              {flights.map((flight) => (
                <article
                  key={flight._id}
                  className="bg-light-surface border border-light-outline-variant rounded-lg p-gutter-md md:p-gutter-lg flex flex-col md:flex-row md:items-center justify-between gap-gutter-md shadow-sm hover:shadow-md transition-all"
                >
                  {/* Left: Airline & Route Details */}
                  <div className="flex-1 flex flex-col gap-gutter-sm">
                    <div className="flex items-center gap-gutter-sm">
                      <span className="w-8 h-8 rounded bg-light-secondary-container text-light-on-secondary-container flex items-center justify-center font-bold text-label-sm">
                        {flight.airlineCode}
                      </span>
                      <div>
                        <span className="font-label text-label-md text-light-on-surface font-semibold">{flight.airline}</span>
                        <span className="text-body-xs text-light-on-surface-variant ml-2">Flight {flight.flightNumber}</span>
                      </div>
                      <span
                        className={`ml-auto sm:ml-2 px-2 py-0.5 rounded-full text-label-xs font-semibold ${
                          flight.stops === 0
                            ? 'bg-light-secondary-container text-light-on-secondary-container'
                            : 'bg-light-surface-container text-light-on-surface-variant'
                        }`}
                      >
                        {flight.stopsDetails || (flight.stops === 0 ? 'Non-stop' : `${flight.stops} Stop`)}
                      </span>
                    </div>

                    {/* Timeline representation */}
                    <div className="flex items-center justify-between gap-gutter-sm py-2">
                      <div className="w-24">
                        <p className="font-headline text-title-md text-light-on-surface">{flight.departureTime}</p>
                        <p className="font-mono text-mono-md text-light-on-surface-variant font-bold">{flight.fromAirport}</p>
                        <p className="font-body text-body-xs text-light-on-surface-variant truncate">{flight.fromCity}</p>
                      </div>

                      <div className="flex-1 flex flex-col items-center px-2">
                        <span className="font-body text-body-xs text-light-on-surface-variant tabular-nums mb-1">
                          {flight.duration}
                        </span>
                        <div className="relative w-full flex items-center">
                          <div className="w-2 h-2 rounded-full bg-light-primary-container"></div>
                          <div className="flex-1 h-px bg-light-outline-variant"></div>
                          <span className="material-symbols-outlined text-body-md text-light-primary-container px-1">
                            flight
                          </span>
                          <div className="flex-1 h-px bg-light-outline-variant"></div>
                          <div className="w-2 h-2 rounded-full bg-light-primary-container"></div>
                        </div>
                        <span className="font-body text-body-xs text-emerald-badge mt-1 font-medium">On-time 98%</span>
                      </div>

                      <div className="w-24 text-right">
                        <p className="font-headline text-title-md text-light-on-surface">{flight.arrivalTime}</p>
                        <p className="font-mono text-mono-md text-light-on-surface-variant font-bold">{flight.toAirport}</p>
                        <p className="font-body text-body-xs text-light-on-surface-variant truncate">{flight.toCity}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-body-xs text-light-on-surface-variant border-t border-light-outline-variant pt-2">
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-body-sm">luggage</span>
                        {flight.baggageAllowance || '1 Carry-on Included'}
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-body-sm">airline_seat_recline_normal</span>
                        {flight.travelClass || 'Economy'}
                      </span>
                    </div>
                  </div>

                  {/* Right: Price & CTA Actions */}
                  <div className="md:border-l md:border-light-outline-variant md:pl-gutter-lg flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-gutter-sm min-w-[160px]">
                    <div className="text-left md:text-right tabular-nums">
                      <p className="font-headline text-headline-md text-light-primary-container font-bold">
                        ${flight.price}
                      </p>
                      <p className="font-body text-body-xs text-light-on-surface-variant">total / passenger</p>
                    </div>

                    <div className="flex flex-col gap-2 w-full max-w-[130px]">
                      <button
                        type="button"
                        onClick={() => handleSelectFlight(flight)}
                        className="w-full py-2 px-3 rounded bg-light-primary-container text-light-on-primary-container hover:bg-light-primary font-label text-label-md cursor-pointer transition-colors text-center shadow-sm"
                      >
                        Select Flight
                      </button>
                      <button
                        type="button"
                        onClick={() => handleViewDetails(flight._id)}
                        className="w-full py-1.5 px-3 rounded border border-light-outline-variant text-light-on-surface hover:bg-light-surface-container-low font-label text-label-sm cursor-pointer transition-colors text-center"
                      >
                        Flight Details
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

