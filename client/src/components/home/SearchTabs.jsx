import React, { useState } from 'react';
import FlightSearchPanel from './FlightSearchPanel';
import HotelSearchPanel from './HotelSearchPanel';
import HolidaySearchPanel from './HolidaySearchPanel';

export default function SearchTabs() {
  const [activeTab, setActiveTab] = useState('flights');

  return (
    <div data-component-id="tabs-horizontal" data-component-type="tabs" data-component-variant="horizontal" className="w-full">
      {/* Top Search Tabs */}
      <div role="tablist" aria-label="Travel booking search type" className="inline-flex items-end gap-gutter-xs max-w-full">
        <button
          role="tab"
          id="search-tab-flights"
          aria-selected={activeTab === 'flights'}
          aria-controls="search-panel-flights"
          tabIndex={activeTab === 'flights' ? 0 : -1}
          onClick={() => setActiveTab('flights')}
          className={`inline-flex items-center gap-gutter-xs px-gutter-md sm:px-gutter-lg py-3 rounded-t-md font-label text-label-lg transition-colors duration-state-change cursor-pointer ${
            activeTab === 'flights'
              ? 'bg-light-surface text-light-on-surface'
              : 'bg-light-scrim/65 text-light-on-primary hover:bg-light-scrim/80'
          }`}
        >
          <span
            className={`material-symbols-outlined text-body-lg ${
              activeTab === 'flights' ? 'text-light-primary-container' : ''
            }`}
            aria-hidden="true"
          >
            flight_takeoff
          </span>
          <span data-design-text-token="label-lg">Flights</span>
        </button>

        <button
          role="tab"
          id="search-tab-hotels"
          aria-selected={activeTab === 'hotels'}
          aria-controls="search-panel-hotels"
          tabIndex={activeTab === 'hotels' ? 0 : -1}
          onClick={() => setActiveTab('hotels')}
          className={`inline-flex items-center gap-gutter-xs px-gutter-md sm:px-gutter-lg py-3 rounded-t-md font-label text-label-lg transition-colors duration-state-change cursor-pointer ${
            activeTab === 'hotels'
              ? 'bg-light-surface text-light-on-surface'
              : 'bg-light-scrim/65 text-light-on-primary hover:bg-light-scrim/80'
          }`}
        >
          <span
            className={`material-symbols-outlined text-body-lg ${
              activeTab === 'hotels' ? 'text-light-primary-container' : ''
            }`}
            aria-hidden="true"
          >
            hotel
          </span>
          <span data-design-text-token="label-lg">Hotels</span>
        </button>

        <button
          role="tab"
          id="search-tab-holidays"
          aria-selected={activeTab === 'holidays'}
          aria-controls="search-panel-holidays"
          tabIndex={activeTab === 'holidays' ? 0 : -1}
          onClick={() => setActiveTab('holidays')}
          className={`inline-flex items-center gap-gutter-xs px-gutter-md sm:px-gutter-lg py-3 rounded-t-md font-label text-label-lg transition-colors duration-state-change cursor-pointer ${
            activeTab === 'holidays'
              ? 'bg-light-surface text-light-on-surface'
              : 'bg-light-scrim/65 text-light-on-primary hover:bg-light-scrim/80'
          }`}
        >
          <span
            className={`material-symbols-outlined text-body-lg ${
              activeTab === 'holidays' ? 'text-light-primary-container' : ''
            }`}
            aria-hidden="true"
          >
            luggage
          </span>
          <span data-design-text-token="label-lg">Holidays</span>
        </button>
      </div>

      {/* Search Card Body */}
      <div className="bg-light-surface rounded-b-lg rounded-tr-lg shadow-xl border border-light-outline-variant p-gutter-md md:p-gutter-lg">
        {activeTab === 'flights' && <FlightSearchPanel />}
        {activeTab === 'hotels' && <HotelSearchPanel />}
        {activeTab === 'holidays' && <HolidaySearchPanel />}
      </div>
    </div>
  );
}

