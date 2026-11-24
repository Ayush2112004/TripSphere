import Hotel from '../models/Hotel.js';
import Room from '../models/Room.js';
import { isDbConnected } from '../config/db.js';
import { SAMPLE_HOTELS } from '../utils/sampleData.js';

// @desc    Get hotels with search, filter, and sorting
// @route   GET /api/hotels
export const getHotels = async (req, res, next) => {
  try {
    if (!isDbConnected()) {
      return res.json({
        success: true,
        count: SAMPLE_HOTELS.length,
        data: SAMPLE_HOTELS,
      });
    }

    const { destination, minPrice, maxPrice, rating, sort } = req.query;

    const query = {};

    if (destination) {
      query.$or = [
        { city: new RegExp(destination, 'i') },
        { country: new RegExp(destination, 'i') },
        { name: new RegExp(destination, 'i') },
      ];
    }

    if (rating) {
      query.rating = { $gte: parseFloat(rating) };
    }

    if (minPrice || maxPrice) {
      query.pricePerNight = {};
      if (minPrice) query.pricePerNight.$gte = Number(minPrice);
      if (maxPrice) query.pricePerNight.$lte = Number(maxPrice);
    }

    let sortOption = {};
    if (sort === 'price-asc') sortOption = { pricePerNight: 1 };
    else if (sort === 'price-desc') sortOption = { pricePerNight: -1 };
    else if (sort === 'rating') sortOption = { rating: -1 };
    else sortOption = { rating: -1 };

    let hotels = await Hotel.find(query).sort(sortOption);

    if (hotels.length === 0 && destination) {
      hotels = await Hotel.find().limit(6);
    }

    res.json({
      success: true,
      count: hotels.length,
      data: hotels,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get hotel details with rooms
// @route   GET /api/hotels/:id
export const getHotelById = async (req, res, next) => {
  try {
    if (!isDbConnected()) {
      const hotel = SAMPLE_HOTELS.find((h) => h._id === req.params.id) || SAMPLE_HOTELS[0];
      return res.json({ success: true, data: hotel });
    }

    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) {
      return res.status(404).json({ success: false, message: 'Hotel not found' });
    }

    const rooms = await Room.find({ hotel: hotel._id });

    res.json({
      success: true,
      data: {
        ...hotel.toObject(),
        rooms,
      },
    });
  } catch (error) {
    const hotel = SAMPLE_HOTELS.find((h) => h._id === req.params.id) || SAMPLE_HOTELS[0];
    res.json({ success: true, data: hotel });
  }
};

// @desc    Get featured recommended hotels
// @route   GET /api/hotels/featured
export const getFeaturedHotels = async (req, res, next) => {
  try {
    if (!isDbConnected()) {
      return res.json({ success: true, data: SAMPLE_HOTELS.slice(0, 3) });
    }

    const featured = await Hotel.find({ isFeatured: true }).limit(3);
    res.json({ success: true, data: featured });
  } catch (error) {
    res.json({ success: true, data: SAMPLE_HOTELS.slice(0, 3) });
  }
};

