import React, { createContext, useContext, useState } from 'react';

const BookingContext = createContext(null);

export const BookingProvider = ({ children }) => {
  // Flight search parameters
  const [flightSearch, setFlightSearch] = useState({
    fromCity: 'New York (JFK)',
    toCity: 'Santorini (JTR)',
    departureDate: '2027-05-14',
    returnDate: '2027-05-21',
    tripType: 'round-trip',
    passengers: 2,
    travelClass: 'Economy',
  });

  // Hotel search parameters
  const [hotelSearch, setHotelSearch] = useState({
    destination: 'Amalfi Coast, Italy',
    checkIn: '2027-06-08',
    checkOut: '2027-06-14',
    guests: 2,
    rooms: 1,
  });

  // Holiday search parameters
  const [holidaySearch, setHolidaySearch] = useState({
    destination: 'Swiss Alps & Zurich',
    departureMonth: 'July 2027',
    duration: '6 Nights · 2 Adults',
  });

  // Selected item ready for checkout
  const [selectedBooking, setSelectedBooking] = useState(null);

  // Helper to start booking a flight
  const startFlightBooking = (flight, customOptions = {}) => {
    setSelectedBooking({
      type: 'flight',
      item: flight,
      options: {
        passengers: customOptions.passengers || flightSearch.passengers || 1,
        travelClass: customOptions.travelClass || flight.travelClass || 'Economy',
        departureDate: customOptions.departureDate || flight.departureDate || flightSearch.departureDate,
        returnDate: customOptions.returnDate || flight.returnDate || flightSearch.returnDate,
        tripType: customOptions.tripType || flightSearch.tripType || 'round-trip',
      },
    });
  };

  // Helper to start booking a hotel
  const startHotelBooking = (hotel, selectedRoom, customOptions = {}) => {
    setSelectedBooking({
      type: 'hotel',
      item: hotel,
      room: selectedRoom,
      options: {
        checkIn: customOptions.checkIn || hotelSearch.checkIn,
        checkOut: customOptions.checkOut || hotelSearch.checkOut,
        guests: customOptions.guests || hotelSearch.guests || 2,
        rooms: customOptions.rooms || hotelSearch.rooms || 1,
      },
    });
  };

  // Helper to start booking a holiday package
  const startHolidayBooking = (pkg, customOptions = {}) => {
    setSelectedBooking({
      type: 'package',
      item: pkg,
      options: {
        travelers: customOptions.travelers || 2,
        departureDate: customOptions.departureDate || '2027-07-15',
      },
    });
  };

  const clearBooking = () => {
    setSelectedBooking(null);
  };

  return (
    <BookingContext.Provider
      value={{
        flightSearch,
        setFlightSearch,
        hotelSearch,
        setHotelSearch,
        holidaySearch,
        setHolidaySearch,
        selectedBooking,
        setSelectedBooking,
        startFlightBooking,
        startHotelBooking,
        startHolidayBooking,
        clearBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};

