import React, { useState, useRef, useEffect } from 'react';
import { Tag, ChevronDown, ChevronUp, Flag, Plus, Minus } from 'lucide-react';

export default function ReservationCard({
  checkIn,
  checkOut,
  totalNights,
  totalPrice,
  basePrice,
  cancellationDateText,
  isClaimed,
  onToggleClaim,
  guestCounts,
  onUpdateGuests,
  onOpenBooking
}) {
  const [isGuestsOpen, setIsGuestsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsGuestsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const totalGuests = guestCounts.adults + guestCounts.children;
  const maxGuests = 3;

  // Format YYYY-MM-DD to MM/DD/YYYY
  const formatInputDate = (iso) => {
    if (!iso) return 'Add date';
    const [y, m, d] = iso.split('-');
    return `${m}/${d}/${y}`;
  };

  const guestsSummary = `${totalGuests} guest${totalGuests > 1 ? 's' : ''}${
    guestCounts.infants > 0 ? `, ${guestCounts.infants} infant${guestCounts.infants > 1 ? 's' : ''}` : ''
  }${guestCounts.pets > 0 ? `, ${guestCounts.pets} pet${guestCounts.pets > 1 ? 's' : ''}` : ''}`;

  return (
    <aside className="reservation-sidebar-sticky" aria-label="Reservation and pricing">
      {/* 10% Off Promo Card */}
      <div className="promo-discount-card">
        <div className="promo-left">
          <Tag size={20} className="promo-tag-icon" />
          <div>
            <div className="promo-text">Get 10% off your next stay.</div>
            <a href="#terms" className="promo-sub" onClick={(e) => e.preventDefault()}>Terms apply</a>
          </div>
        </div>
        <button
          className={`promo-claim-btn ${isClaimed ? 'claimed' : ''}`}
          onClick={onToggleClaim}
        >
          {isClaimed ? 'Claimed' : 'Claim'}
        </button>
      </div>

      {/* Main Reservation Card */}
      <div className="reservation-card">
        <div className="reservation-card-header">
          <span className="res-price-amount">₹{Math.round(totalPrice).toLocaleString('en-IN')}</span>
          <span className="res-price-nights">for {totalNights} nights</span>
        </div>

        {/* Inputs Box */}
        <div className="reservation-inputs-box">
          <div className="res-dates-row">
            <div className="res-input-col" role="button" tabIndex={0}>
              <span className="res-input-label">CHECK-IN</span>
              <div className="res-input-val">{formatInputDate(checkIn)}</div>
            </div>
            <div className="res-input-col" role="button" tabIndex={0}>
              <span className="res-input-label">CHECKOUT</span>
              <div className="res-input-val">{formatInputDate(checkOut)}</div>
            </div>
          </div>

          <div
            className="res-guests-row"
            onClick={() => setIsGuestsOpen(!isGuestsOpen)}
            role="button"
            tabIndex={0}
            aria-expanded={isGuestsOpen}
            ref={dropdownRef}
          >
            <div>
              <span className="res-input-label">GUESTS</span>
              <div className="res-input-val">{guestsSummary}</div>
            </div>
            {isGuestsOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}

            {/* Guests Popover Dropdown */}
            {isGuestsOpen && (
              <div className="guests-dropdown-popover" onClick={(e) => e.stopPropagation()}>
                {/* Adults */}
                <div className="guest-type-row">
                  <div>
                    <div className="guest-type-title">Adults</div>
                    <div className="guest-type-desc">Age 13+</div>
                  </div>
                  <div className="counter-controls">
                    <button
                      className="counter-btn"
                      onClick={() => onUpdateGuests('adults', -1)}
                      disabled={guestCounts.adults <= 1}
                      aria-label="Decrease adults"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="counter-count">{guestCounts.adults}</span>
                    <button
                      className="counter-btn"
                      onClick={() => onUpdateGuests('adults', 1)}
                      disabled={totalGuests >= maxGuests}
                      aria-label="Increase adults"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>

                {/* Children */}
                <div className="guest-type-row">
                  <div>
                    <div className="guest-type-title">Children</div>
                    <div className="guest-type-desc">Ages 2–12</div>
                  </div>
                  <div className="counter-controls">
                    <button
                      className="counter-btn"
                      onClick={() => onUpdateGuests('children', -1)}
                      disabled={guestCounts.children <= 0}
                      aria-label="Decrease children"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="counter-count">{guestCounts.children}</span>
                    <button
                      className="counter-btn"
                      onClick={() => onUpdateGuests('children', 1)}
                      disabled={totalGuests >= maxGuests}
                      aria-label="Increase children"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>

                {/* Infants */}
                <div className="guest-type-row">
                  <div>
                    <div className="guest-type-title">Infants</div>
                    <div className="guest-type-desc">Under 2</div>
                  </div>
                  <div className="counter-controls">
                    <button
                      className="counter-btn"
                      onClick={() => onUpdateGuests('infants', -1)}
                      disabled={guestCounts.infants <= 0}
                      aria-label="Decrease infants"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="counter-count">{guestCounts.infants}</span>
                    <button
                      className="counter-btn"
                      onClick={() => onUpdateGuests('infants', 1)}
                      disabled={guestCounts.infants >= 5}
                      aria-label="Increase infants"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>

                {/* Pets */}
                <div className="guest-type-row">
                  <div>
                    <div className="guest-type-title">Pets</div>
                    <div className="guest-type-desc">Bringing a service animal?</div>
                  </div>
                  <div className="counter-controls">
                    <button
                      className="counter-btn"
                      onClick={() => onUpdateGuests('pets', -1)}
                      disabled={guestCounts.pets <= 0}
                      aria-label="Decrease pets"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="counter-count">{guestCounts.pets}</span>
                    <button
                      className="counter-btn"
                      onClick={() => onUpdateGuests('pets', 1)}
                      disabled={guestCounts.pets >= 2}
                      aria-label="Increase pets"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>

                <div style={{ textAlign: 'right', marginTop: '12px' }}>
                  <button
                    style={{ fontSize: '14px', fontWeight: 600, textDecoration: 'underline' }}
                    onClick={() => setIsGuestsOpen(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Cancellation Notice */}
        <div className="cancellation-free-pill">
          Free cancellation before <strong>{cancellationDateText}</strong>
        </div>

        {/* Primary CTA */}
        <button className="reserve-cta-btn" onClick={onOpenBooking}>
          Reserve
        </button>

        <div className="res-not-charged-text">
          You won't be charged yet
        </div>
      </div>

      {/* Report listing */}
      <div className="report-listing-wrap" role="button" tabIndex={0}>
        <Flag size={14} />
        <span>Report this listing</span>
      </div>
    </aside>
  );
}
