import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
  {
    bookingReference: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    bookingType: {
      type: String,
      enum: ['flight', 'hotel', 'package'],
      required: true,
    },
    flight: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Flight',
    },
    hotel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Hotel',
    },
    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Room',
    },
    holidayPackage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'HolidayPackage',
    },
    detailsSnapshot: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
    travelerDetails: [
      {
        fullName: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, default: '' },
        passportNumber: { type: String, default: '' },
        specialRequests: { type: String, default: '' },
      },
    ],
    bookingDates: {
      departureDate: String,
      returnDate: String,
      checkIn: String,
      checkOut: String,
    },
    basePrice: {
      type: Number,
      required: true,
    },
    taxesAndFees: {
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['confirmed', 'completed', 'cancelled'],
      default: 'confirmed',
    },
    paymentStatus: {
      type: String,
      enum: ['paid', 'pending', 'refunded'],
      default: 'paid',
    },
  },
  {
    timestamps: true,
  }
);

bookingSchema.index({ user: 1, createdAt: -1 });

export default mongoose.model('Booking', bookingSchema);
