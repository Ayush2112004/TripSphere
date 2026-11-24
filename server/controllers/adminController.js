import Booking from '../models/Booking.js';
import User from '../models/User.js';
import Flight from '../models/Flight.js';
import Hotel from '../models/Hotel.js';
import HolidayPackage from '../models/HolidayPackage.js';

// @desc    Get dashboard metrics
// @route   GET /api/admin/stats
export const getStats = async (req, res, next) => {
  try {
    const [totalBookings, usersCount, flightsCount, hotelsCount, packagesCount, bookings] = await Promise.all([
      Booking.countDocuments(),
      User.countDocuments(),
      Flight.countDocuments(),
      Hotel.countDocuments(),
      HolidayPackage.countDocuments(),
      Booking.find({ status: { $ne: 'cancelled' } }).select('totalPrice'),
    ]);

    const totalRevenue = bookings.reduce((sum, b) => sum + (b.totalPrice || 0), 0);

    res.json({
      success: true,
      data: {
        totalBookings,
        totalRevenue,
        usersCount,
        flightsCount,
        hotelsCount,
        packagesCount,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all bookings
// @route   GET /api/admin/bookings
export const getAllBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find()
      .populate('user', 'name email phone')
      .sort({ createdAt: -1 });

    res.json({ success: true, count: bookings.length, data: bookings });
  } catch (error) {
    next(error);
  }
};

// @desc    Update booking status
// @route   PUT /api/admin/bookings/:id/status
export const updateBookingStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    booking.status = status;
    await booking.save();

    res.json({ success: true, message: `Booking status updated to ${status}`, data: booking });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all users
// @route   GET /api/admin/users
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json({ success: true, count: users.length, data: users });
  } catch (error) {
    next(error);
  }
};

// Flights CRUD
export const createFlight = async (req, res, next) => {
  try {
    const flight = await Flight.create(req.body);
    res.status(201).json({ success: true, data: flight });
  } catch (error) {
    next(error);
  }
};

export const updateFlight = async (req, res, next) => {
  try {
    const flight = await Flight.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!flight) return res.status(404).json({ success: false, message: 'Flight not found' });
    res.json({ success: true, data: flight });
  } catch (error) {
    next(error);
  }
};

export const deleteFlight = async (req, res, next) => {
  try {
    const flight = await Flight.findByIdAndDelete(req.params.id);
    if (!flight) return res.status(404).json({ success: false, message: 'Flight not found' });
    res.json({ success: true, message: 'Flight deleted successfully' });
  } catch (error) {
    next(error);
  }
};

// Hotels CRUD
export const createHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.create(req.body);
    res.status(201).json({ success: true, data: hotel });
  } catch (error) {
    next(error);
  }
};

export const updateHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!hotel) return res.status(404).json({ success: false, message: 'Hotel not found' });
    res.json({ success: true, data: hotel });
  } catch (error) {
    next(error);
  }
};

export const deleteHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findByIdAndDelete(req.params.id);
    if (!hotel) return res.status(404).json({ success: false, message: 'Hotel not found' });
    res.json({ success: true, message: 'Hotel deleted successfully' });
  } catch (error) {
    next(error);
  }
};

// Holiday Packages CRUD
export const createPackage = async (req, res, next) => {
  try {
    const pkg = await HolidayPackage.create(req.body);
    res.status(201).json({ success: true, data: pkg });
  } catch (error) {
    next(error);
  }
};

export const updatePackage = async (req, res, next) => {
  try {
    const pkg = await HolidayPackage.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!pkg) return res.status(404).json({ success: false, message: 'Package not found' });
    res.json({ success: true, data: pkg });
  } catch (error) {
    next(error);
  }
};

export const deletePackage = async (req, res, next) => {
  try {
    const pkg = await HolidayPackage.findByIdAndDelete(req.params.id);
    if (!pkg) return res.status(404).json({ success: false, message: 'Package not found' });
    res.json({ success: true, message: 'Package deleted successfully' });
  } catch (error) {
    next(error);
  }
};

