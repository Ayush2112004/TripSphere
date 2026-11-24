import Flight from '../models/Flight.js';
import { isDbConnected } from '../config/db.js';
import { SAMPLE_FLIGHTS } from '../utils/sampleData.js';

// @desc    Get all flights with search, filter, and sorting
// @route   GET /api/flights
export const getFlights = async (req, res, next) => {
  try {
    if (!isDbConnected()) {
      return res.json({
        success: true,
        count: SAMPLE_FLIGHTS.length,
        data: SAMPLE_FLIGHTS,
      });
    }

    const { from, to, departure, stops, travelClass, minPrice, maxPrice, airline, sort } = req.query;

    const query = {};

    if (from) {
      query.$or = [
        { fromCity: new RegExp(from, 'i') },
        { fromAirport: new RegExp(from, 'i') },
      ];
    }

    if (to) {
      const toCondition = [
        { toCity: new RegExp(to, 'i') },
        { toAirport: new RegExp(to, 'i') },
      ];
      if (query.$or) {
        query.$and = [{ $or: query.$or }, { $or: toCondition }];
        delete query.$or;
      } else {
        query.$or = toCondition;
      }
    }

    if (stops !== undefined && stops !== '' && stops !== 'all') {
      query.stops = parseInt(stops, 10);
    }

    if (travelClass && travelClass !== 'All') {
      query.travelClass = travelClass;
    }

    if (airline && airline !== 'All') {
      query.airline = new RegExp(airline, 'i');
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    let sortOption = {};
    if (sort === 'price-asc') sortOption = { price: 1 };
    else if (sort === 'price-desc') sortOption = { price: -1 };
    else if (sort === 'duration') sortOption = { duration: 1 };
    else sortOption = { price: 1 };

    let flights = await Flight.find(query).sort(sortOption);

    // If query returned no results because of strict search, return demo inventory matching airports or all
    if (flights.length === 0 && (from || to)) {
      flights = await Flight.find().limit(6);
    }

    res.json({
      success: true,
      count: flights.length,
      data: flights,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single flight by ID
// @route   GET /api/flights/:id
export const getFlightById = async (req, res, next) => {
  try {
    if (!isDbConnected()) {
      const flight = SAMPLE_FLIGHTS.find((f) => f._id === req.params.id) || SAMPLE_FLIGHTS[0];
      return res.json({ success: true, data: flight });
    }

    const flight = await Flight.findById(req.params.id);
    if (!flight) {
      return res.status(404).json({ success: false, message: 'Flight not found' });
    }
    res.json({ success: true, data: flight });
  } catch (error) {
    const flight = SAMPLE_FLIGHTS.find((f) => f._id === req.params.id) || SAMPLE_FLIGHTS[0];
    res.json({ success: true, data: flight });
  }
};

// @desc    Get featured flight deals (matches Homepage 3 deals)
// @route   GET /api/flights/featured
export const getFeaturedFlights = async (req, res, next) => {
  try {
    if (!isDbConnected()) {
      return res.json({ success: true, data: SAMPLE_FLIGHTS.slice(0, 3) });
    }

    const featured = await Flight.find({ isFeatured: true }).limit(3);
    res.json({ success: true, data: featured });
  } catch (error) {
    res.json({ success: true, data: SAMPLE_FLIGHTS.slice(0, 3) });
  }
};

