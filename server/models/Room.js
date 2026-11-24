import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema(
  {
    hotel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Hotel',
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      default: 'Standard Room',
    },
    capacity: {
      type: Number,
      default: 2,
    },
    pricePerNight: {
      type: Number,
      required: true,
    },
    bedType: {
      type: String,
      default: '1 King Bed or 2 Twins',
    },
    amenities: {
      type: [String],
      default: ['High-speed Wi-Fi', 'Balcony with Panoramic View', 'En-suite Luxury Bath', 'Air Conditioning'],
    },
    availableCount: {
      type: Number,
      default: 6,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Room', roomSchema);

