import React from 'react';

export default function MobileBottomBar({
  totalPrice,
  totalNights,
  basePrice,
  checkIn,
  checkOut,
  rating,
  reviewCount,
  onOpenBooking
}) {
  const formatDatesShort = (inDate, outDate) => {
    if (!inDate || !outDate) return null;
    const [, inM, inD] = inDate.split('-');
    const [, outM, outD] = outDate.split('-');
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const m1 = months[parseInt(inM, 10) - 1];
    const m2 = months[parseInt(outM, 10) - 1];
    if (m1 === m2) {
      return `${parseInt(inD, 10)}–${parseInt(outD, 10)} ${m1}`;
    }
    return `${parseInt(inD, 10)} ${m1} – ${parseInt(outD, 10)} ${m2}`;
  };

  const datesText = formatDatesShort(checkIn, checkOut);

  return (
    <div className="mobile-bottom-bar" aria-label="Quick reservation bar">
      <div className="mobile-bottom-info">
        <div className="mobile-bottom-price-row">
          <span className="mobile-bottom-price">
            ₹{Math.round(totalPrice || basePrice).toLocaleString('en-IN')}
          </span>
          <span className="mobile-bottom-nights">
            {checkIn && checkOut && totalNights ? `for ${totalNights} nights` : 'night'}
          </span>
        </div>
        <div className="mobile-bottom-sub">
          {datesText ? (
            <span className="mobile-bottom-dates">{datesText}</span>
          ) : (
            <span className="mobile-bottom-rating">
              ★ {rating.toFixed(2)} ({reviewCount})
            </span>
          )}
        </div>
      </div>

      <button className="mobile-bottom-reserve-btn" onClick={onOpenBooking}>
        Reserve
      </button>
    </div>
  );
}
