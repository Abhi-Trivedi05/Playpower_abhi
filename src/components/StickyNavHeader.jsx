import React, { useState, useEffect } from 'react';

export default function StickyNavHeader({
  totalPrice,
  totalNights,
  rating,
  reviewCount,
  onOpenBooking
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('photos');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      setIsVisible(scrollPos > 520);

      // Determine active section
      const amenitiesEl = document.getElementById('amenities');
      const reviewsEl = document.getElementById('reviews');
      const locationEl = document.getElementById('location');

      if (locationEl && scrollPos >= locationEl.offsetTop - 120) {
        setActiveTab('location');
      } else if (reviewsEl && scrollPos >= reviewsEl.offsetTop - 120) {
        setActiveTab('reviews');
      } else if (amenitiesEl && scrollPos >= amenitiesEl.offsetTop - 120) {
        setActiveTab('amenities');
      } else {
        setActiveTab('photos');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -90;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <nav className={`sticky-sub-nav ${isVisible ? 'visible' : ''}`} aria-label="Listing navigation tabs">
      <div className="sticky-sub-nav-inner">
        <div className="sticky-nav-tabs">
          <button
            className={`sticky-tab-btn ${activeTab === 'photos' ? 'active' : ''}`}
            onClick={() => scrollToSection('photos')}
          >
            Photos
          </button>
          <button
            className={`sticky-tab-btn ${activeTab === 'amenities' ? 'active' : ''}`}
            onClick={() => scrollToSection('amenities')}
          >
            Amenities
          </button>
          <button
            className={`sticky-tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
            onClick={() => scrollToSection('reviews')}
          >
            Reviews
          </button>
          <button
            className={`sticky-tab-btn ${activeTab === 'location' ? 'active' : ''}`}
            onClick={() => scrollToSection('location')}
          >
            Location
          </button>
        </div>

        <div className="sticky-nav-right">
          <div className="sticky-nav-pricing">
            <div className="sticky-price-text">
              ₹{Math.round(totalPrice).toLocaleString('en-IN')} <span style={{ fontWeight: 400, fontSize: '14px' }}>for {totalNights} nights</span>
            </div>
            <div className="sticky-price-sub">
              ★ {rating.toFixed(2)} · {reviewCount} reviews
            </div>
          </div>

          <button className="sticky-reserve-btn" onClick={onOpenBooking}>
            Reserve
          </button>
        </div>
      </div>
    </nav>
  );
}
