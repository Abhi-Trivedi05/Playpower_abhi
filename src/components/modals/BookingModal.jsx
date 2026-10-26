import React, { useState, useEffect } from 'react';
import { X, CheckCircle, Shield } from 'lucide-react';

export default function BookingModal({
  isOpen,
  onClose,
  title,
  checkIn,
  checkOut,
  totalNights,
  basePrice,
  isClaimed,
  guestCounts
}) {
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setIsSuccess(false);
      return;
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const rawSubtotal = Math.round(basePrice * totalNights);
  const discountAmount = isClaimed ? Math.round(rawSubtotal * 0.1) : 0;
  const cleaningFee = 1500;
  const serviceFee = 2200;
  const finalTotal = rawSubtotal - discountAmount + cleaningFee + serviceFee;

  const handleConfirm = () => {
    setIsSuccess(true);
  };

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-label="Confirm and pay">
      <div className="modal-dialog-content booking-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-icon-btn" onClick={onClose} aria-label="Close dialog">
          <X size={20} />
        </button>

        {isSuccess ? (
          <div style={{ textAlign: 'center', padding: '32px 16px' }}>
            <CheckCircle size={64} color="#008A05" style={{ margin: '0 auto 16px' }} />
            <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '8px' }}>
              Reservation Confirmed!
            </h2>
            <p style={{ color: '#717171', fontSize: '15px', marginBottom: '24px' }}>
              You're all set for your stay at <strong>{title}</strong>. A confirmation email has been sent with check-in instructions.
            </p>
            <button className="outline-action-btn" onClick={onClose}>
              Back to listing
            </button>
          </div>
        ) : (
          <div>
            <div className="booking-summary-header">
              <h2 style={{ fontSize: '24px', fontWeight: 700 }}>Reservation Summary</h2>
              <div style={{ fontSize: '14px', color: '#717171', marginTop: '4px' }}>{title}</div>
            </div>

            <div className="booking-dates-badge">
              <div>
                <span style={{ fontWeight: 600 }}>Dates: </span>
                {checkIn} to {checkOut} ({totalNights} nights)
              </div>
              <div>
                <span style={{ fontWeight: 600 }}>Guests: </span>
                {guestCounts.adults + guestCounts.children} guests
              </div>
            </div>

            <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '16px' }}>Price Details</h3>

            <div className="booking-price-breakdown">
              <div className="price-breakdown-row">
                <span>₹{Math.round(basePrice).toLocaleString('en-IN')} × {totalNights} nights</span>
                <span>₹{rawSubtotal.toLocaleString('en-IN')}</span>
              </div>

              {isClaimed && (
                <div className="price-breakdown-row discount">
                  <span>Special 10% discount promo</span>
                  <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                </div>
              )}

              <div className="price-breakdown-row">
                <span>Cleaning fee</span>
                <span>₹{cleaningFee.toLocaleString('en-IN')}</span>
              </div>

              <div className="price-breakdown-row">
                <span>Airbnb service fee</span>
                <span>₹{serviceFee.toLocaleString('en-IN')}</span>
              </div>

              <div className="price-breakdown-row total">
                <span>Total (INR)</span>
                <span>₹{finalTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#717171', marginBottom: '20px' }}>
              <Shield size={16} />
              <span>Free cancellation up to 48 hours before check-in.</span>
            </div>

            <button className="confirm-booking-btn" onClick={handleConfirm}>
              Confirm and Reserve
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
