import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../../context/BookingContext';

export default function HolidaySearchPanel() {
  const navigate = useNavigate();
  const { holidaySearch, setHolidaySearch } = useBooking();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/holidays?destination=${encodeURIComponent(holidaySearch.destination)}`);
  };

  return (
    <div role="tabpanel" id="search-panel-holidays" aria-labelledby="search-tab-holidays" tabIndex="0">
      <div className="flex flex-wrap items-center gap-gutter-md pb-gutter-md mb-gutter-md border-b border-light-outline-variant">
        <span
          className="font-label text-label-md text-light-primary-container border-b-2 border-light-primary-container pb-1"
          data-design-text-token="label-md"
        >
          Curated Packages
        </span>
        <span className="font-label text-label-md text-light-on-surface-variant" data-design-text-token="label-md">
          Flights + Hotels + Transfers
        </span>
      </div>
      <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-gutter-sm items-center">
        <div className="md:col-span-4 bg-light-surface-container-low rounded-md border border-light-outline-variant p-gutter-xs">
          <label className="flex flex-col px-gutter-sm py-1.5 cursor-pointer">
            <span className="font-label text-label-sm text-light-on-surface-variant" data-design-text-token="label-sm">
              Holiday destination
            </span>
            <input
              type="text"
              value={holidaySearch.destination}
              onChange={(e) => setHolidaySearch({ ...holidaySearch, destination: e.target.value })}
              className="border-0 bg-transparent p-0 font-title text-title-md text-light-on-surface focus:ring-0 outline-none w-full"
            />
          </label>
        </div>

        <div className="md:col-span-3 bg-light-surface-container-low rounded-md border border-light-outline-variant p-gutter-xs">
          <label className="flex flex-col px-gutter-sm py-1.5 cursor-pointer">
            <span className="font-label text-label-sm text-light-on-surface-variant" data-design-text-token="label-sm">
              Departure month
            </span>
            <input
              type="text"
              value={holidaySearch.departureMonth}
              onChange={(e) => setHolidaySearch({ ...holidaySearch, departureMonth: e.target.value })}
              className="border-0 bg-transparent p-0 font-title text-body-md font-semibold text-light-on-surface focus:ring-0 outline-none w-full"
            />
          </label>
        </div>

        <div className="md:col-span-3 bg-light-surface-container-low rounded-md border border-light-outline-variant p-gutter-xs">
          <label className="flex flex-col px-gutter-sm py-1.5 cursor-pointer">
            <span className="font-label text-label-sm text-light-on-surface-variant" data-design-text-token="label-sm">
              Duration &amp; travellers
            </span>
            <input
              type="text"
              value={holidaySearch.duration}
              onChange={(e) => setHolidaySearch({ ...holidaySearch, duration: e.target.value })}
              className="border-0 bg-transparent p-0 font-title text-body-md font-semibold text-light-on-surface focus:ring-0 outline-none w-full"
            />
          </label>
        </div>

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
              Explore Trips
            </span>
          </button>
        </div>
      </form>
    </div>
  );
}

