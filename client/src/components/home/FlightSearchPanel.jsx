import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../../context/BookingContext';

export default function FlightSearchPanel() {
  const navigate = useNavigate();
  const { flightSearch, setFlightSearch } = useBooking();

  const handleTripTypeChange = (type) => {
    setFlightSearch((prev) => ({ ...prev, tripType: type }));
  };

  const handleSwapCities = () => {
    setFlightSearch((prev) => ({
      ...prev,
      fromCity: prev.toCity,
      toCity: prev.fromCity,
    }));
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(
      `/flights?from=${encodeURIComponent(flightSearch.fromCity)}&to=${encodeURIComponent(
        flightSearch.toCity
      )}&departure=${encodeURIComponent(flightSearch.departureDate)}&returnDate=${encodeURIComponent(
        flightSearch.returnDate
      )}&passengers=${flightSearch.passengers}&class=${encodeURIComponent(flightSearch.travelClass)}`
    );
  };

  return (
    <div role="tabpanel" id="search-panel-flights" aria-labelledby="search-tab-flights" tabIndex="0">
      {/* Flight Sub-options */}
      <div className="flex flex-wrap items-center gap-gutter-md pb-gutter-md mb-gutter-md border-b border-light-outline-variant">
        <button
          type="button"
          onClick={() => handleTripTypeChange('round-trip')}
          className={`font-label text-label-md pb-1 cursor-pointer transition-colors ${
            flightSearch.tripType === 'round-trip'
              ? 'text-light-primary-container border-b-2 border-light-primary-container'
              : 'text-light-on-surface-variant hover:text-light-on-surface'
          }`}
          data-design-text-token="label-md"
        >
          Round Trip
        </button>
        <button
          type="button"
          onClick={() => handleTripTypeChange('one-way')}
          className={`font-label text-label-md pb-1 cursor-pointer transition-colors ${
            flightSearch.tripType === 'one-way'
              ? 'text-light-primary-container border-b-2 border-light-primary-container'
              : 'text-light-on-surface-variant hover:text-light-on-surface'
          }`}
          data-design-text-token="label-md"
        >
          One-Way
        </button>
        <button
          type="button"
          onClick={() => handleTripTypeChange('multi-city')}
          className={`font-label text-label-md pb-1 cursor-pointer transition-colors ${
            flightSearch.tripType === 'multi-city'
              ? 'text-light-primary-container border-b-2 border-light-primary-container'
              : 'text-light-on-surface-variant hover:text-light-on-surface'
          }`}
          data-design-text-token="label-md"
        >
          Multi-City
        </button>
        <span className="hidden sm:inline-block h-4 w-px bg-light-outline-variant"></span>
        <span className="font-label text-label-md text-light-on-surface-variant" data-design-text-token="label-md">
          All Airlines
        </span>
      </div>

      {/* Flight Fields Grid */}
      <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-gutter-sm items-center">
        {/* From & To with Swap Button */}
        <div className="md:col-span-5 grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] items-center gap-gutter-xs bg-light-surface-container-low rounded-md border border-light-outline-variant p-gutter-xs">
          <label
            data-component-id="input-field-icon"
            data-component-type="input-field"
            data-component-variant="with-icon"
            className="flex flex-col px-gutter-sm py-1.5 cursor-pointer"
          >
            <span
              className="flex items-center gap-gutter-xs font-label text-label-sm text-light-on-surface-variant"
              data-design-text-token="label-sm"
            >
              <span className="material-symbols-outlined text-body-md" aria-hidden="true">
                flight_takeoff
              </span>
              <span>From city</span>
            </span>
            <input
              id="flight-from"
              type="text"
              value={flightSearch.fromCity}
              onChange={(e) => setFlightSearch({ ...flightSearch, fromCity: e.target.value })}
              className="border-0 bg-transparent p-0 font-title text-title-md text-light-on-surface focus:ring-0 outline-none w-full"
            />
          </label>

          <button
            id="swap-cities-btn"
            type="button"
            onClick={handleSwapCities}
            data-component-id="button-icon"
            data-component-type="button"
            data-component-variant="icon"
            aria-label="Swap departure and arrival cities"
            className="mx-auto inline-flex items-center justify-center w-9 h-9 rounded-full bg-light-surface border border-light-outline-variant text-light-primary-container hover:bg-light-secondary-container transition-colors duration-state-change cursor-pointer"
          >
            <span className="material-symbols-outlined text-body-lg" aria-hidden="true">
              swap_horiz
            </span>
          </button>

          <label
            data-component-id="input-field-icon"
            data-component-type="input-field"
            data-component-variant="with-icon"
            className="flex flex-col px-gutter-sm py-1.5 cursor-pointer"
          >
            <span
              className="flex items-center gap-gutter-xs font-label text-label-sm text-light-on-surface-variant"
              data-design-text-token="label-sm"
            >
              <span className="material-symbols-outlined text-body-md" aria-hidden="true">
                flight_land
              </span>
              <span>To city</span>
            </span>
            <input
              id="flight-to"
              type="text"
              value={flightSearch.toCity}
              onChange={(e) => setFlightSearch({ ...flightSearch, toCity: e.target.value })}
              className="border-0 bg-transparent p-0 font-title text-title-md text-light-on-surface focus:ring-0 outline-none w-full"
            />
          </label>
        </div>

        {/* Departure & Return Dates */}
        <div className="md:col-span-3 grid grid-cols-2 gap-gutter-xs bg-light-surface-container-low rounded-md border border-light-outline-variant p-gutter-xs">
          <label className="flex flex-col px-gutter-sm py-1.5 cursor-pointer">
            <span
              className="flex items-center gap-gutter-xs font-label text-label-sm text-light-on-surface-variant"
              data-design-text-token="label-sm"
            >
              <span className="material-symbols-outlined text-body-md" aria-hidden="true">
                calendar_today
              </span>
              <span>Departure</span>
            </span>
            <input
              type="text"
              value={flightSearch.departureDate}
              onChange={(e) => setFlightSearch({ ...flightSearch, departureDate: e.target.value })}
              className="border-0 bg-transparent p-0 font-title text-body-md font-semibold text-light-on-surface tabular-nums focus:ring-0 outline-none w-full"
            />
          </label>
          <label className="flex flex-col px-gutter-sm py-1.5 border-l border-light-outline-variant cursor-pointer">
            <span
              className="flex items-center gap-gutter-xs font-label text-label-sm text-light-on-surface-variant"
              data-design-text-token="label-sm"
            >
              <span className="material-symbols-outlined text-body-md" aria-hidden="true">
                event
              </span>
              <span>Return</span>
            </span>
            <input
              type="text"
              value={flightSearch.returnDate}
              onChange={(e) => setFlightSearch({ ...flightSearch, returnDate: e.target.value })}
              className="border-0 bg-transparent p-0 font-title text-body-md font-semibold text-light-on-surface tabular-nums focus:ring-0 outline-none w-full"
            />
          </label>
        </div>

        {/* Travellers & Class */}
        <div className="md:col-span-2 bg-light-surface-container-low rounded-md border border-light-outline-variant p-gutter-xs">
          <label className="flex flex-col px-gutter-sm py-1.5 cursor-pointer">
            <span
              className="flex items-center gap-gutter-xs font-label text-label-sm text-light-on-surface-variant"
              data-design-text-token="label-sm"
            >
              <span className="material-symbols-outlined text-body-md" aria-hidden="true">
                group
              </span>
              <span>Travellers &amp; class</span>
            </span>
            <input
              type="text"
              value={`${flightSearch.passengers} Adults · ${flightSearch.travelClass}`}
              onChange={(e) => {
                const val = e.target.value;
                setFlightSearch((prev) => ({ ...prev, travelClass: val.includes('Business') ? 'Business' : 'Economy' }));
              }}
              className="border-0 bg-transparent p-0 font-title text-body-md font-semibold text-light-on-surface focus:ring-0 outline-none w-full"
            />
          </label>
        </div>

        {/* Search Flights Button */}
        <div className="md:col-span-2">
          <button
            type="submit"
            data-component-id="button-with-icon"
            data-component-type="button"
            data-component-variant="with-icon"
            className="w-full inline-flex items-center justify-center gap-gutter-xs px-gutter-md py-4 rounded-md bg-light-primary-container text-light-on-primary-container hover:bg-light-primary transition-colors duration-state-change cursor-pointer shadow-sm"
          >
            <span className="material-symbols-outlined text-title-md" aria-hidden="true">
              search
            </span>
            <span className="font-label text-label-lg" data-design-text-token="label-lg">
              Search Flights
            </span>
          </button>
        </div>
      </form>
    </div>
  );
}

