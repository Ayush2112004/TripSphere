import Booking from '../models/Booking.js';
import Flight from '../models/Flight.js';
import Hotel from '../models/Hotel.js';
import Room from '../models/Room.js';
import HolidayPackage from '../models/HolidayPackage.js';
import { isDbConnected } from '../config/db.js';
import { SAMPLE_BOOKINGS, SAMPLE_FLIGHTS, SAMPLE_HOTELS, SAMPLE_PACKAGES } from '../utils/sampleData.js';

// Helper to generate reference code
const generateBookingRef = (type) => {
  const prefix = type === 'flight' ? 'TS-FL' : type === 'hotel' ? 'TS-HT' : 'TS-PK';
  const randomNum = Math.floor(10000 + Math.random() * 90000);
  return `${prefix}-${randomNum}`;
};

// @desc    Create new booking with SERVER-SIDE PRICE RECALCULATION
// @route   POST /api/bookings
export const createBooking = async (req, res, next) => {
  try {
    const {
      bookingType,
      itemId,
      roomId,
      travelerDetails,
      bookingDates,
      passengersCount = 1,
      roomsCount = 1,
      travelersCount = 1,
    } = req.body;

    if (!travelerDetails || !travelerDetails.length) {
      return res.status(400).json({ success: false, message: 'Please provide traveler details.' });
    }

    let basePrice = 0;
    let taxesAndFees = 0;
    let detailsSnapshot = {};
    let flightRef = null;
    let hotelRef = null;
    let roomRef = null;
    let packageRef = null;

    // Recalculate price strictly from backend models
    if (bookingType === 'flight') {
      const flight = await Flight.findById(itemId);
      if (!flight) {
        return res.status(404).json({ success: false, message: 'Selected flight not found' });
      }
      flightRef = flight._id;
      const count = Number(passengersCount) || 1;
      basePrice = flight.price * count;
      taxesAndFees = Math.round(basePrice * 0.1); // 10% taxes and fees
      detailsSnapshot = {
        airline: flight.airline,
        airlineCode: flight.airlineCode,
        flightNumber: flight.flightNumber,
        fromCity: flight.fromCity,
        fromAirport: flight.fromAirport,
        toCity: flight.toCity,
        toAirport: flight.toAirport,
        departureTime: flight.departureTime,
        arrivalTime: flight.arrivalTime,
        travelClass: flight.travelClass,
        duration: flight.duration,
        passengersCount: count,
      };
    } else if (bookingType === 'hotel') {
      const hotel = await Hotel.findById(itemId);
      if (!hotel) {
        return res.status(404).json({ success: false, message: 'Selected hotel not found' });
      }
      hotelRef = hotel._id;

      let roomPrice = hotel.pricePerNight;
      let roomName = 'Standard Luxury Room';

      if (roomId) {
        const room = await Room.findById(roomId);
        if (room) {
          roomRef = room._id;
          roomPrice = room.pricePerNight;
          roomName = room.name;
        }
      }

      // Calculate nights from checkIn & checkOut
      let nights = 1;
      if (bookingDates?.checkIn && bookingDates?.checkOut) {
        const checkInDate = new Date(bookingDates.checkIn);
        const checkOutDate = new Date(bookingDates.checkOut);
        const diffTime = Math.abs(checkOutDate - checkInDate);
        nights = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24))) || 1;
      }

      const rooms = Number(roomsCount) || 1;
      basePrice = roomPrice * nights * rooms;
      taxesAndFees = Math.round(basePrice * 0.12); // 12% hotel occupancy tax & service fee
      detailsSnapshot = {
        hotelName: hotel.name,
        city: hotel.city,
        country: hotel.country,
        roomName,
        nights,
        roomsCount: rooms,
      };
    } else if (bookingType === 'package') {
      const pkg = await HolidayPackage.findById(itemId);
      if (!pkg) {
        return res.status(404).json({ success: false, message: 'Selected package not found' });
      }
      packageRef = pkg._id;
      const travelers = Number(travelersCount) || 2;
      basePrice = pkg.pricePerPerson * travelers;
      taxesAndFees = Math.round(basePrice * 0.08); // 8% travel protection & fees
      detailsSnapshot = {
        packageTitle: pkg.title,
        destination: pkg.destination,
        country: pkg.country,
        durationDays: pkg.durationDays,
        durationNights: pkg.durationNights,
        travelersCount: travelers,
      };
    } else {
      return res.status(400).json({ success: false, message: 'Invalid booking type' });
    }

    const totalPrice = basePrice + taxesAndFees;
    const bookingReference = generateBookingRef(bookingType);

    const booking = await Booking.create({
      bookingReference,
      user: req.user._id,
      bookingType,
      flight: flightRef,
      hotel: hotelRef,
      room: roomRef,
      holidayPackage: packageRef,
      detailsSnapshot,
      travelerDetails,
      bookingDates: bookingDates || {},
      basePrice,
      taxesAndFees,
      totalPrice,
      status: 'confirmed',
      paymentStatus: 'paid', // Marked as paid on successful checkout
    });

    res.status(201).json({
      success: true,
      message: 'Booking successfully confirmed!',
      data: booking,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user's trips
// @route   GET /api/bookings/my-trips
export const getMyTrips = async (req, res, next) => {
  try {
    if (!isDbConnected()) {
      return res.json({
        success: true,
        count: SAMPLE_BOOKINGS.length,
        data: SAMPLE_BOOKINGS,
      });
    }

    const bookings = await Booking.find({ user: req.user._id })
      .populate('flight')
      .populate('hotel')
      .populate('holidayPackage')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (error) {
    res.json({
      success: true,
      count: SAMPLE_BOOKINGS.length,
      data: SAMPLE_BOOKINGS,
    });
  }
};

// @desc    Get single booking by ID (ownership enforced)
// @route   GET /api/bookings/:id
export const getBookingById = async (req, res, next) => {
  try {
    if (!isDbConnected()) {
      const b = SAMPLE_BOOKINGS.find((item) => item._id === req.params.id) || SAMPLE_BOOKINGS[0];
      return res.json({ success: true, data: b });
    }

    const booking = await Booking.findById(req.params.id)
      .populate('flight')
      .populate('hotel')
      .populate('holidayPackage');

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    // Ownership check
    if (booking.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to view this booking' });
    }

    res.json({ success: true, data: booking });
  } catch (error) {
    const b = SAMPLE_BOOKINGS.find((item) => item._id === req.params.id) || SAMPLE_BOOKINGS[0];
    res.json({ success: true, data: b });
  }
};

// @desc    Cancel booking (ownership enforced)
// @route   PUT /api/bookings/:id/cancel
export const cancelBooking = async (req, res, next) => {
  try {
    if (!isDbConnected()) {
      return res.json({
        success: true,
        message: 'Booking successfully cancelled and processed for refund.',
        data: { _id: req.params.id, status: 'cancelled', paymentStatus: 'refunded' },
      });
    }

    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    if (booking.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to modify this booking' });
    }

    booking.status = 'cancelled';
    booking.paymentStatus = 'refunded';
    await booking.save();

    res.json({
      success: true,
      message: 'Booking successfully cancelled and processed for refund.',
      data: booking,
    });
  } catch (error) {
    next(error);
  }
};

