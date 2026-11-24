import NewsletterSubscriber from '../models/NewsletterSubscriber.js';

// @desc    Subscribe to weekly fare drops
// @route   POST /api/newsletter/subscribe
export const subscribeNewsletter = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: 'Please provide an email address' });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const existing = await NewsletterSubscriber.findOne({ email: normalizedEmail });
    if (existing) {
      return res.json({ success: true, message: 'Already subscribed to TripSphere newsletter!' });
    }

    await NewsletterSubscriber.create({ email: normalizedEmail });

    res.status(201).json({
      success: true,
      message: 'Thank you for subscribing! Check your inbox for weekly fare drops.',
    });
  } catch (error) {
    next(error);
  }
};

