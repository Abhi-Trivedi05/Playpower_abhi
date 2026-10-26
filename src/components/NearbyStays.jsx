import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

export default function NearbyStays({ stays }) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 2;

  const handlePrev = () => {
    setCurrentPage(prev => (prev === 1 ? totalPages : prev - 1));
  };

  const handleNext = () => {
    setCurrentPage(prev => (prev === totalPages ? 1 : prev + 1));
  };

  return (
    <section className="nearby-stays-wrap" aria-label="Nearby accommodations">
      <div className="nearby-header-row">
        <h3 className="section-heading-lg" style={{ marginBottom: 0 }}>More stays nearby</h3>
        <div className="carousel-nav-controls">
          <span className="page-index-indicator">{currentPage} / {totalPages}</span>
          <button className="carousel-arrow-btn" onClick={handlePrev} aria-label="Previous stays">
            <ChevronLeft size={16} />
          </button>
          <button className="carousel-arrow-btn" onClick={handleNext} aria-label="Next stays">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <div className="nearby-cards-slider">
        {stays.map((stay) => (
          <div key={stay.id} className="nearby-card" role="button" tabIndex={0}>
            <div className="nearby-card-img-wrap">
              <img
                src={stay.image}
                alt={stay.title}
                loading="lazy"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=500&q=80";
                }}
              />
            </div>
            <div className="nearby-stay-title">{stay.title}</div>
            <div className="nearby-stay-price-rating">
              <span style={{ fontWeight: 600 }}>₹{stay.price.toLocaleString('en-IN')}</span>
              <span style={{ color: '#717171' }}>·</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                <Star size={12} fill="currentColor" />
                <span>{stay.rating.toFixed(2)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
