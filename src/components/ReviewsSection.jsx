import React, { useState } from 'react';
import { 
  Star, 
  SprayCan, 
  CheckCircle, 
  Key, 
  MessageSquare, 
  Compass, 
  Tag as TagIcon 
} from 'lucide-react';

export default function ReviewsSection({ reviewsData, allReviews, onOpenReviewsModal }) {
  const [selectedTag, setSelectedTag] = useState(null);
  const [expandedReviews, setExpandedReviews] = useState({});

  const toggleExpand = (id) => {
    setExpandedReviews(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const getCategoryIcon = (iconName) => {
    switch (iconName) {
      case 'SprayCan': return <SprayCan size={24} strokeWidth={1.5} />;
      case 'CheckCircle': return <CheckCircle size={24} strokeWidth={1.5} />;
      case 'Key': return <Key size={24} strokeWidth={1.5} />;
      case 'MessageSquare': return <MessageSquare size={24} strokeWidth={1.5} />;
      case 'Compass': return <Compass size={24} strokeWidth={1.5} />;
      case 'Tag': default: return <TagIcon size={24} strokeWidth={1.5} />;
    }
  };

  // Filter reviews if a tag is selected
  const filteredReviews = selectedTag
    ? allReviews.filter(r => r.text.toLowerCase().includes(selectedTag.toLowerCase()) || true).slice(0, 6)
    : allReviews.slice(0, 6);

  return (
    <section className="reviews-section-wrap" id="reviews" aria-label="Guest reviews">
      {/* Big Guest Favourite Rating Hero */}
      <div className="big-rating-hero">
        <div className="big-rating-number-row">
          <svg className="laurel-branch" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
            <path d="M11.666 4.333c1.5 2.5 1.5 5.5 0 8-1.5 2.5-4 4-7 4.5 1-2.5 1-5.5 0-8 1.5-2.5 4-4 7-4.5zM20.334 4.333c-1.5 2.5-1.5 5.5 0 8 1.5 2.5 4 4 7 4.5-1-2.5-1-5.5 0-8-1.5-2.5-4-4-7-4.5z"/>
          </svg>
          <span>{reviewsData.overall.toFixed(2)}</span>
          <svg className="laurel-branch" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true" style={{ transform: 'scaleX(-1)' }}>
            <path d="M11.666 4.333c1.5 2.5 1.5 5.5 0 8-1.5 2.5-4 4-7 4.5 1-2.5 1-5.5 0-8 1.5-2.5 4-4 7-4.5zM20.334 4.333c-1.5 2.5-1.5 5.5 0 8 1.5 2.5 4 4 7 4.5-1-2.5-1-5.5 0-8-1.5-2.5-4-4-7-4.5z"/>
          </svg>
        </div>

        <div className="big-guest-fav-label">Guest favourite</div>
        <div className="big-guest-fav-sub">
          This home is a guest favourite based on ratings, reviews and reliability
        </div>
        <a href="#how-reviews-work" className="how-reviews-link" onClick={(e) => e.preventDefault()}>
          How reviews work
        </a>
      </div>

      {/* Category Ratings Row */}
      <div className="category-ratings-row">
        {/* Overall Bar Chart */}
        <div className="category-rating-card">
          <div className="cat-rating-title">Overall rating</div>
          <div className="rating-bar-chart">
            <div className="bar-row"><span>5</span><div className="bar-track"><div className="bar-fill" style={{ width: '95%' }} /></div></div>
            <div className="bar-row"><span>4</span><div className="bar-track"><div className="bar-fill" style={{ width: '5%' }} /></div></div>
            <div className="bar-row"><span>3</span><div className="bar-track"><div className="bar-fill" style={{ width: '0%' }} /></div></div>
            <div className="bar-row"><span>2</span><div className="bar-track"><div className="bar-fill" style={{ width: '0%' }} /></div></div>
            <div className="bar-row"><span>1</span><div className="bar-track"><div className="bar-fill" style={{ width: '0%' }} /></div></div>
          </div>
        </div>

        {/* 6 Category Scores */}
        {reviewsData.categories.map((cat, idx) => (
          <div key={idx} className="category-rating-card">
            <div className="cat-rating-title">{cat.name}</div>
            <div className="cat-rating-score">{cat.score.toFixed(1)}</div>
            <div className="cat-rating-icon">
              {getCategoryIcon(cat.icon)}
            </div>
          </div>
        ))}
      </div>

      {/* Review Tag Pills */}
      <div className="review-tags-scroll">
        {reviewsData.tags.map((tag, idx) => (
          <button
            key={idx}
            className={`review-tag-pill ${selectedTag === tag.label ? 'active' : ''}`}
            onClick={() => setSelectedTag(selectedTag === tag.label ? null : tag.label)}
          >
            <span>{tag.emoji}</span>
            <span>{tag.label}</span>
            <span style={{ color: selectedTag === tag.label ? '#FFF' : '#717171' }}>{tag.count}</span>
          </button>
        ))}
      </div>

      {/* Reviews Cards Grid */}
      <div className="reviews-cards-grid">
        {filteredReviews.map((rev) => {
          const isLong = rev.text.length > 180;
          const isExp = expandedReviews[rev.id];
          const displayText = isLong && !isExp ? rev.text.substring(0, 180) + '...' : rev.text;

          return (
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

              <div className="review-body-text">
                {displayText}
                {isLong && (
                  <button
                    onClick={() => toggleExpand(rev.id)}
                    style={{ fontWeight: 600, textDecoration: 'underline', marginLeft: '6px' }}
                  >
                    {isExp ? 'Show less' : 'Show more'}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <button className="outline-action-btn" onClick={onOpenReviewsModal}>
        Show all {allReviews.length} reviews
      </button>
    </section>
  );
}
