import React, { useState, useEffect } from 'react';
import { X, Search, Star } from 'lucide-react';

export default function ReviewsModal({
  isOpen,
  onClose,
  allReviews,
  reviewsData
}) {
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (!isOpen) return;

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

  const filtered = allReviews.filter(
    r =>
      r.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-label="All guest reviews">
      <div className="modal-dialog-content reviews-modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Left Column: Overall Stats */}
        <div className="reviews-modal-left-col">
          <button className="modal-close-icon-btn" onClick={onClose} aria-label="Close dialog">
            <X size={20} />
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '32px', fontWeight: 800 }}>
            <span>★</span>
            <span>{reviewsData.overall.toFixed(2)}</span>
          </div>

          <div style={{ fontSize: '18px', fontWeight: 700, marginTop: '4px' }}>
            Guest favourite
          </div>
          <div style={{ fontSize: '14px', color: '#717171', margin: '4px 0 24px' }}>
            {allReviews.length} reviews
          </div>

          {/* Rating Categories */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {reviewsData.categories.map((cat, idx) => (
              <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                <span style={{ color: '#444' }}>{cat.name}</span>
                <span style={{ fontWeight: 600 }}>{cat.score.toFixed(1)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Search + Full List */}
        <div>
          <div className="reviews-search-input-box">
            <Search size={16} color="#717171" />
            <input
              type="text"
              placeholder="Search reviews"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search reviews"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} aria-label="Clear search">
                <X size={14} />
              </button>
            )}
          </div>

          <div className="reviews-modal-list">
            {filtered.length === 0 ? (
              <div style={{ padding: '32px 0', color: '#717171' }}>
                No reviews found matching "{searchQuery}".
              </div>
            ) : (
              filtered.map((rev) => (
                <div key={rev.id} className="review-card">
                  <div className="reviewer-meta-row">
                    {rev.avatarUrl ? (
                      <img src={rev.avatarUrl} alt={rev.author} className="reviewer-avatar-img" />
                    ) : (
                      <div className="reviewer-avatar-placeholder" style={{ backgroundColor: rev.avatarColor || '#333' }}>
                        {rev.avatarText}
                      </div>
                    )}
                    <div>
                      <div className="reviewer-name">{rev.author}</div>
                      <div className="reviewer-tenure">{rev.timeOnAirbnb}</div>
                    </div>
                  </div>

                  <div className="review-date-stars">
                    <div style={{ display: 'flex', gap: '2px' }}>
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} size={12} fill="currentColor" color="currentColor" />
                      ))}
                    </div>
                    <span>·</span>
                    <span>{rev.date}</span>
                  </div>

                  <div className="review-body-text">{rev.text}</div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
