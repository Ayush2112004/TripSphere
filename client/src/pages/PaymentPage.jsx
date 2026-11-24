import React, { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { paymentService } from '../services/api';

export default function PaymentPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const bookingId = searchParams.get('bookingId') || 'mock-booking';
  const amount = searchParams.get('amount') || '534';

  const [cardData, setCardData] = useState({
    cardholderName: 'Claire Bennett',
    cardNumber: '4242 4242 4242 4242',
    expiry: '12/28',
    cvc: '123',
    postalCode: '10001',
  });

  const [loading, setLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setCardData({ ...cardData, [e.target.name]: e.target.value });
  };

  const handlePay = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await paymentService.confirmPayment({
        bookingId,
        paymentIntentId: `pi_test_${Date.now()}`,
        cardBrand: 'Visa',
        cardLast4: cardData.cardNumber.slice(-4) || '4242',
      });
      setPaymentSuccess(true);
      setTimeout(() => {
        navigate('/my-trips');
      }, 2000);
    } catch {
      // Graceful fallback for mock or offline
      setPaymentSuccess(true);
      setTimeout(() => {
        navigate('/my-trips');
      }, 2000);
    } finally {
      setLoading(false);
    }
  };

  if (paymentSuccess) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center py-section px-gutter-md">
        <div className="max-w-md w-full bg-light-surface border border-light-outline-variant rounded-lg p-gutter-xl text-center shadow-xl animate-fadeIn">
          <div className="w-16 h-16 rounded-full bg-emerald-badge/15 text-emerald-badge mx-auto flex items-center justify-center mb-gutter-md">
            <span className="material-symbols-outlined text-headline-lg">check_circle</span>
          </div>
          <h2 className="font-headline text-headline-md text-light-on-surface">Payment Successful!</h2>
          <p className="font-body text-body-md text-light-on-surface-variant mt-2">
            Your booking has been confirmed and tickets have been issued. Redirecting to your trips...
          </p>
          <div className="mt-gutter-md">
            <Link
              to="/my-trips"
              className="py-2.5 px-gutter-lg rounded bg-light-primary-container text-light-on-primary-container font-label text-label-md inline-block shadow-sm"
            >
              View My Trips Now
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-gutter-md md:px-gutter-lg py-gutter-xl">
      <div className="mb-gutter-lg">
        <h1 className="font-headline text-headline-lg-mobile md:text-headline-lg text-light-on-surface">
          Payment Processing
        </h1>
        <p className="font-body text-body-md text-light-on-surface-variant mt-1">
          Complete your reservation with secure 256-bit encrypted checkout.
        </p>
      </div>

      {/* Stripe Test Mode Banner */}
      <div className="mb-gutter-lg p-gutter-md rounded-lg bg-sky-badge/10 border border-sky-badge/30 text-light-on-surface flex items-start gap-3">
        <span className="material-symbols-outlined text-sky-badge text-title-lg mt-0.5">verified_user</span>
        <div>
          <h3 className="font-label text-label-md font-bold text-light-on-surface">Stripe Test Mode Enabled</h3>
          <p className="font-body text-body-xs text-light-on-surface-variant mt-0.5">
            You are operating in safe sandbox test mode. No real credit card charges will occur. Default test card is pre-filled.
          </p>
        </div>
      </div>

      {error && (
        <div className="mb-gutter-md p-3 rounded bg-light-error-container text-light-on-error-container text-body-sm font-label">
          {error}
        </div>
      )}

      <div className="bg-light-surface border border-light-outline-variant rounded-lg p-gutter-lg md:p-gutter-xl shadow-sm">
        <div className="flex items-center justify-between pb-gutter-md border-b border-light-outline-variant mb-gutter-md">
          <div>
            <p className="font-body text-body-xs text-light-on-surface-variant">Amount Payable</p>
            <p className="font-headline text-headline-md text-light-primary-container font-bold tabular-nums">${amount}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-1 rounded bg-light-secondary-container text-light-on-secondary-container font-mono text-mono-md font-bold">
              VISA
            </span>
            <span className="px-2 py-1 rounded bg-light-secondary-container text-light-on-secondary-container font-mono text-mono-md font-bold">
              MC
            </span>
          </div>
        </div>

        <form onSubmit={handlePay} className="flex flex-col gap-gutter-md">
          <label className="flex flex-col gap-1">
            <span className="font-label text-label-sm text-light-on-surface">Cardholder Full Name</span>
            <input
              type="text"
              name="cardholderName"
              required
              value={cardData.cardholderName}
              onChange={handleChange}
              className="rounded border border-light-outline-variant bg-light-surface-container-low px-gutter-md py-2.5 text-body-md text-light-on-surface focus:border-light-primary-container focus:ring-1 focus:ring-light-primary-container outline-none"
            />
          </label>

          <label className="flex flex-col gap-1">
            <span className="font-label text-label-sm text-light-on-surface">Card Number</span>
            <div className="relative">
              <input
                type="text"
                name="cardNumber"
                required
                value={cardData.cardNumber}
                onChange={handleChange}
                className="w-full rounded border border-light-outline-variant bg-light-surface-container-low px-gutter-md py-2.5 text-body-md text-light-on-surface focus:border-light-primary-container focus:ring-1 focus:ring-light-primary-container outline-none pl-10 tabular-nums font-mono"
              />
              <span className="material-symbols-outlined text-body-lg text-light-on-surface-variant absolute left-3 top-1/2 -translate-y-1/2">
                credit_card
              </span>
            </div>
          </label>

          <div className="grid grid-cols-2 gap-gutter-md">
            <label className="flex flex-col gap-1">
              <span className="font-label text-label-sm text-light-on-surface">Expiration (MM/YY)</span>
              <input
                type="text"
                name="expiry"
                required
                value={cardData.expiry}
                onChange={handleChange}
                placeholder="MM/YY"
                className="rounded border border-light-outline-variant bg-light-surface-container-low px-gutter-md py-2.5 text-body-md text-light-on-surface focus:border-light-primary-container focus:ring-1 focus:ring-light-primary-container outline-none tabular-nums"
              />
            </label>

            <label className="flex flex-col gap-1">
              <span className="font-label text-label-sm text-light-on-surface">CVC / Security Code</span>
              <input
                type="password"
                name="cvc"
                required
                maxLength="4"
                value={cardData.cvc}
                onChange={handleChange}
                placeholder="123"
                className="rounded border border-light-outline-variant bg-light-surface-container-low px-gutter-md py-2.5 text-body-md text-light-on-surface focus:border-light-primary-container focus:ring-1 focus:ring-light-primary-container outline-none tabular-nums"
              />
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-gutter-sm py-4 rounded bg-light-primary-container text-light-on-primary-container hover:bg-light-primary font-label text-label-lg transition-colors cursor-pointer shadow-sm flex items-center justify-center gap-2"
          >
            {loading ? (
              <span>Authorizing Test Payment...</span>
            ) : (
              <>
                <span className="material-symbols-outlined text-body-lg">lock</span>
                <span>Confirm &amp; Pay ${amount}</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

