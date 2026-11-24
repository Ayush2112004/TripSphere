import express from 'express';
import {
  getStats,
  getAllBookings,
  updateBookingStatus,
  getAllUsers,
  createFlight,
  updateFlight,
  deleteFlight,
  createHotel,
  updateHotel,
  deleteHotel,
  createPackage,
  updatePackage,
  deletePackage,
} from '../controllers/adminController.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);
router.use(adminOnly);

router.get('/stats', getStats);
router.get('/bookings', getAllBookings);
router.put('/bookings/:id/status', updateBookingStatus);
router.get('/users', getAllUsers);

// Flights
router.post('/flights', createFlight);
router.put('/flights/:id', updateFlight);
router.delete('/flights/:id', deleteFlight);

// Hotels
router.post('/hotels', createHotel);
router.put('/hotels/:id', updateHotel);
router.delete('/hotels/:id', deleteHotel);

// Holidays
router.post('/holidays', createPackage);
router.put('/holidays/:id', updatePackage);
router.delete('/holidays/:id', deletePackage);

export default router;

