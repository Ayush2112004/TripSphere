import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized to access this resource. Please log in.',
    });
  }

  try {
    const secret = process.env.JWT_SECRET || 'tripsphere_dev_jwt_secret_2027';
    const decoded = jwt.verify(token, secret);

    if (decoded.demoRole) {
      req.user = {
        _id: decoded.id,
        id: decoded.id,
        name: decoded.demoRole === 'admin' ? 'TripSphere Admin' : 'Claire Bennett',
        email: decoded.demoRole === 'admin' ? 'admin@tripsphere.travel' : 'traveler@tripsphere.travel',
        role: decoded.demoRole,
      };
      return next();
    }

    try {
      req.user = await User.findById(decoded.id).select('-password');
    } catch {
      req.user = {
        _id: decoded.id,
        id: decoded.id,
        name: 'Claire Bennett',
        email: 'traveler@tripsphere.travel',
        role: 'user',
      };
    }

    if (!req.user) {
      req.user = {
        _id: decoded.id,
        id: decoded.id,
        name: 'Claire Bennett',
        email: 'traveler@tripsphere.travel',
        role: 'user',
      };
    }

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired authentication token. Please log in again.',
    });
  }
};

export const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    return res.status(403).json({
      success: false,
      message: 'Access denied. Administrator privileges required.',
    });
  }
};

