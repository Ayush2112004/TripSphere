import HolidayPackage from '../models/HolidayPackage.js';
import { isDbConnected } from '../config/db.js';
import { SAMPLE_PACKAGES } from '../utils/sampleData.js';

// @desc    Get all holiday packages
// @route   GET /api/holidays
export const getPackages = async (req, res, next) => {
  try {
    if (!isDbConnected()) {
      return res.json({
        success: true,
        count: SAMPLE_PACKAGES.length,
        data: SAMPLE_PACKAGES,
      });
    }

    const { destination, promo } = req.query;

    const query = {};

    if (destination) {
      query.$or = [
        { destination: new RegExp(destination, 'i') },
        { country: new RegExp(destination, 'i') },
        { title: new RegExp(destination, 'i') },
      ];
    }

    if (promo) {
      query.promoCode = new RegExp(promo, 'i');
    }

    let packages = await HolidayPackage.find(query);

    if (packages.length === 0 && (destination || promo)) {
      packages = await HolidayPackage.find();
    }

    res.json({
      success: true,
      count: packages.length,
      data: packages,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single holiday package by ID
// @route   GET /api/holidays/:id
export const getPackageById = async (req, res, next) => {
  try {
    if (!isDbConnected()) {
      const pkg = SAMPLE_PACKAGES.find((p) => p._id === req.params.id) || SAMPLE_PACKAGES[0];
      return res.json({ success: true, data: pkg });
    }

    const pkg = await HolidayPackage.findById(req.params.id);
    if (!pkg) {
      return res.status(404).json({ success: false, message: 'Holiday package not found' });
    }
    res.json({ success: true, data: pkg });
  } catch (error) {
    const pkg = SAMPLE_PACKAGES.find((p) => p._id === req.params.id) || SAMPLE_PACKAGES[0];
    res.json({ success: true, data: pkg });
  }
};

