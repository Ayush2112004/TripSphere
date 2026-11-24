import express from 'express';
import {
  getFlights,
  getFlightById,
  getFeaturedFlights,
} from '../controllers/flightController.js';

const router = express.Router();

router.get('/', getFlights);
router.get('/featured', getFeaturedFlights);
router.get('/:id', getFlightById);

export default router;

