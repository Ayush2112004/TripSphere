import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../../context/BookingContext';

export default function HotelSearchPanel() {
  const navigate = useNavigate();
  const { hotelSearch, setHotelSearch } = useBooking();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(
      `/hotels?destination=${encodeURIComponent(hotelSearch.destination)}&checkIn=${encodeURIComponent(
        hotelSearch.checkIn
      )}&checkOut=${encodeURIComponent(hotelSearch.checkOut)}&guests=${hotelSearch.guests}&rooms=${hotelSearch.rooms}`
    );
  };

  return (
    <div role="tabpanel" id="search-panel-hotels" aria-labelledby="search-tab-hotels" tabIndex="0">
      <div className="flex flex-wrap items-center gap-gutter-md pb-gutter-md mb-gutter-md border-b border-light-outline-variant">
        <span
          className="font-label text-label-md text-light-primary-container border-b-2 border-light-primary-container pb-1"
          data-design-text-token="label-md"
        >
          Stays &amp; Resorts
        </span>
        <span className="font-label text-label-md text-light-on-surface-variant" data-design-text-token="label-md">
          Free cancellation available
        </span>
      </div>
      <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-gutter-sm items-center">
        <div className="md:col-span-4 bg-light-surface-container-low rounded-md border border-light-outline-variant p-gutter-xs">
          <label className="flex flex-col px-gutter-sm py-1.5 cursor-pointer">
            <span
              className="flex items-center gap-gutter-xs font-label text-label-sm text-light-on-surface-variant"
              data-design-text-token="label-sm"
            >
              <span className="material-symbols-outlined text-body-md" aria-hidden="true">
                location_on
              </span>
              <span>Destination</span>
            </span>
            <input
              type="text"
              value={hotelSearch.destination}
              onChange={(e) => setHotelSearch({ ...hotelSearch, destination: e.target.value })}
              className="border-0 bg-transparent p-0 font-title text-title-md text-light-on-surface focus:ring-0 outline-none w-full"
            />
          </label>
        </div>

        <div className="md:col-span-3 grid grid-cols-2 gap-gutter-xs bg-light-surface-container-low rounded-md border border-light-outline-variant p-gutter-xs">
          <label className="flex flex-col px-gutter-sm py-1.5 cursor-pointer">
            <span className="font-label text-label-sm text-light-on-surface-variant" data-design-text-token="label-sm">
              Check-in
            </span>
            <input
              type="text"
              value={hotelSearch.checkIn}
              onChange={(e) => setHotelSearch({ ...hotelSearch, checkIn: e.target.value })}
              className="border-0 bg-transparent p-0 font-title text-body-md font-semibold text-light-on-surface tabular-nums focus:ring-0 outline-none w-full"
            />
          </label>
          <label className="flex flex-col px-gutter-sm py-1.5 border-l border-light-outline-variant cursor-pointer">
            <span className="font-label text-label-sm text-light-on-surface-variant" data-design-text-token="label-sm">
              Check-out
            </span>
            <input
              type="text"
              value={hotelSearch.checkOut}
              onChange={(e) => setHotelSearch({ ...hotelSearch, checkOut: e.target.value })}
              className="border-0 bg-transparent p-0 font-title text-body-md font-semibold text-light-on-surface tabular-nums focus:ring-0 outline-none w-full"
            />
          </label>
        </div>

        <div className="md:col-span-3 bg-light-surface-container-low rounded-md border border-light-outline-variant p-gutter-xs">
          <label className="flex flex-col px-gutter-sm py-1.5 cursor-pointer">
            <span
              className="flex items-center gap-gutter-xs font-label text-label-sm text-light-on-surface-variant"
              data-design-text-token="label-sm"
            >
              <span className="material-symbols-outlined text-body-md" aria-hidden="true">
                bed
              </span>
              <span>Guests &amp; rooms</span>
            </span>
            <input
              type="text"
              value={`${hotelSearch.guests} Guests · ${hotelSearch.rooms} Room`}
              onChange={(e) => {
                setHotelSearch({ ...hotelSearch, guests: 2, rooms: 1 });
              }}
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
              Search Hotels
            </span>
          </button>
        </div>
      </form>
    </div>
  );
}

