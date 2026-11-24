import Stripe from 'stripe';
import Booking from '../models/Booking.js';
import Payment from '../models/Payment.js';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripe = stripeSecretKey ? new Stripe(stripeSecretKey) : null;

// @desc    Create Stripe PaymentIntent
// @route   POST /api/payments/create-intent
export const createPaymentIntent = async (req, res, next) => {
  try {
    const { bookingId } = req.body;

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    // Check ownership
    if (booking.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Unauthorized' });
    }

    const amountInCents = Math.round(booking.totalPrice * 100);

    // If real Stripe credentials configured
    if (stripe) {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amountInCents,
        currency: 'usd',
        metadata: {
          bookingId: booking._id.toString(),
          bookingReference: booking.bookingReference,
          userId: req.user._id.toString(),
        },
      });

      return res.json({
        success: true,
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
        amount: booking.totalPrice,
      });
    }

    // Safe test-mode mock fallback when Stripe key is not configured
    const mockIntentId = `pi_test_${Date.now()}_${Math.random().toString(36).substring(7)}`;
    res.json({
      success: true,
      clientSecret: `${mockIntentId}_secret_test`,
      paymentIntentId: mockIntentId,
      amount: booking.totalPrice,
      isTestMode: true,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Confirm payment & record transaction
// @route   POST /api/payments/confirm
export const confirmPayment = async (req, res, next) => {
  try {
    const { bookingId, paymentIntentId, cardBrand = 'Visa', cardLast4 = '4242' } = req.body;

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    const payment = await Payment.create({
      booking: booking._id,
      user: req.user._id,
      amount: booking.totalPrice,
      currency: 'usd',
      paymentMethod: 'card',
      stripePaymentIntentId: paymentIntentId || `pi_test_${Date.now()}`,
      status: 'succeeded',
      cardBrand,
      cardLast4,
    });

    booking.paymentStatus = 'paid';
    booking.status = 'confirmed';
    await booking.save();

    res.json({
      success: true,
      message: 'Payment completed successfully!',
      data: payment,
    });
  } catch (error) {
    next(error);
  }
};

