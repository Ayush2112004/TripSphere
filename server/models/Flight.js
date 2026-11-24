import mongoose from 'mongoose';

const flightSchema = new mongoose.Schema(
  {
    airline: {
      type: String,
      required: true,
      trim: true,
    },
    airlineCode: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
    },
    flightNumber: {
      type: String,
      required: true,
      trim: true,
    },
    fromCity: {
      type: String,
      required: true,
      trim: true,
    },
    fromAirport: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
    },
    toCity: {
      type: String,
      required: true,
      trim: true,
    },
    toAirport: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
    },
    departureTime: {
      type: String,
      required: true,
    },
    arrivalTime: {
      type: String,
      required: true,
    },
    departureDate: {
      type: String,
      default: '2027-05-14',
    },
    returnDate: {
      type: String,
      default: '2027-05-21',
    },
    duration: {
      type: String,
      required: true,
    },
    stops: {
      type: Number,
      default: 0,
    },
    stopsDetails: {
      type: String,
      default: 'Non-stop',
    },
    price: {
      type: Number,
      required: true,
    },
    travelClass: {
      type: String,
      enum: ['Economy', 'Premium Economy', 'Business', 'First'],
      default: 'Economy',
    },
    baggageAllowance: {
      type: String,
      default: '1 Personal Item + 1 Carry-on (23kg)',
    },
    availableSeats: {
      type: Number,
      default: 48,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

flightSchema.index({ fromCity: 1, toCity: 1, departureDate: 1 });
flightSchema.index({ fromAirport: 1, toAirport: 1 });

export default mongoose.model('Flight', flightSchema);

