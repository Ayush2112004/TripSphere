import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema(
  {
    booking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Booking',
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      default: 'usd',
      lowercase: true,
    },
    paymentMethod: {
      type: String,
      default: 'card',
    },
    stripePaymentIntentId: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: ['succeeded', 'pending', 'failed', 'refunded'],
      default: 'succeeded',
    },
    cardBrand: {
      type: String,
      default: 'Visa',
    },
    cardLast4: {
      type: String,
      default: '4242',
    },
  },
  {
    timestamps: true,
  }
);

paymentSchema.index({ user: 1 });
paymentSchema.index({ booking: 1 });

export default mongoose.model('Payment', paymentSchema);

