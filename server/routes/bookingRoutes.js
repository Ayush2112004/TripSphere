import express from 'express';
import {
  createBooking,
  getMyTrips,
  getBookingById,
  cancelBooking,
} from '../controllers/bookingController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);

router.post('/', createBooking);
router.get('/my-trips', getMyTrips);
router.get('/:id', getBookingById);
router.put('/:id/cancel', cancelBooking);

export default router;

