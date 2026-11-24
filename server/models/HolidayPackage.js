import mongoose from 'mongoose';

const holidayPackageSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    destination: {
      type: String,
      required: true,
      trim: true,
    },
    country: {
      type: String,
      required: true,
      trim: true,
    },
    durationDays: {
      type: Number,
      required: true,
    },
    durationNights: {
      type: Number,
      required: true,
    },
    pricePerPerson: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    overview: {
      type: String,
      required: true,
    },
    inclusions: {
      type: [String],
      default: [],
    },
    itinerary: [
      {
        day: Number,
        title: String,
        description: String,
      },
    ],
    departureDates: {
      type: [String],
      default: ['July 2027', 'August 2027', 'September 2027'],
    },
    promoCode: {
      type: String,
      default: '',
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

export default mongoose.model('HolidayPackage', holidayPackageSchema);

