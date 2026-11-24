import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Request interceptor to attach JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('tripsphere_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for centralized error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear token if invalid or expired
      localStorage.removeItem('tripsphere_token');
      localStorage.removeItem('tripsphere_user');
    }
    return Promise.reject(error);
  }
);

// Authentication Services
export const authService = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  logout: () => api.post('/auth/logout'),
  getCurrentUser: () => api.get('/auth/me'),
  updateProfile: (data) => api.put('/auth/profile', data),
  changePassword: (data) => api.put('/auth/change-password', data),
};

// Flight Services
export const flightService = {
  getFlights: (params) => api.get('/flights', { params }),
  getFlightById: (id) => api.get(`/flights/${id}`),
  getFeaturedDeals: () => api.get('/flights/featured'),
};

// Hotel Services
export const hotelService = {
  getHotels: (params) => api.get('/hotels', { params }),
  getHotelById: (id) => api.get(`/hotels/${id}`),
  getFeaturedHotels: () => api.get('/hotels/featured'),
};

// Holiday Services
export const holidayService = {
  getPackages: (params) => api.get('/holidays', { params }),
  getPackageById: (id) => api.get(`/holidays/${id}`),
};

// Booking Services
export const bookingService = {
  createBooking: (bookingData) => api.post('/bookings', bookingData),
  getMyBookings: () => api.get('/bookings/my-trips'),
  getBookingById: (id) => api.get(`/bookings/${id}`),
  cancelBooking: (id) => api.put(`/bookings/${id}/cancel`),
};

// Payment Services
export const paymentService = {
  createPaymentIntent: (bookingId) => api.post('/payments/create-intent', { bookingId }),
  confirmPayment: (paymentData) => api.post('/payments/confirm', paymentData),
};

// Newsletter
export const newsletterService = {
  subscribe: (email) => api.post('/newsletter/subscribe', { email }),
};

// Admin Services
export const adminService = {
  getStats: () => api.get('/admin/stats'),
  getBookings: () => api.get('/admin/bookings'),
  updateBookingStatus: (id, status) => api.put(`/admin/bookings/${id}/status`, { status }),
  getUsers: () => api.get('/admin/users'),
  // Flights CRUD
  createFlight: (flight) => api.post('/admin/flights', flight),
  updateFlight: (id, flight) => api.put(`/admin/flights/${id}`, flight),
  deleteFlight: (id) => api.delete(`/admin/flights/${id}`),
  // Hotels CRUD
  createHotel: (hotel) => api.post('/admin/hotels', hotel),
  updateHotel: (id, hotel) => api.put(`/admin/hotels/${id}`, hotel),
  deleteHotel: (id) => api.delete(`/admin/hotels/${id}`),
  // Packages CRUD
  createPackage: (pkg) => api.post('/admin/holidays', pkg),
  updatePackage: (id, pkg) => api.put(`/admin/holidays/${id}`, pkg),
  deletePackage: (id) => api.delete(`/admin/holidays/${id}`),
};

export default api;

