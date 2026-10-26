import React from 'react';
import { Upload, Heart } from 'lucide-react';

export default function PropertyHeader({ title, isSaved, onToggleSave, onOpenShare }) {
  return (
    <section className="listing-title-section">
      <div className="listing-title-row">
        <h1 className="listing-title">{title}</h1>
        <div className="listing-top-actions">
          <button
            className="action-pill-btn"
            onClick={onOpenShare}
            aria-label="Share this listing"
          >
            <Upload size={16} />
            <span>Share</span>
          </button>
          
          <button
            className={`action-pill-btn ${isSaved ? 'saved' : ''}`}
            onClick={onToggleSave}
            aria-label={isSaved ? 'Remove from saved' : 'Save to wishlist'}
          >
            <Heart size={16} className="heart-icon" fill={isSaved ? '#FF385C' : 'none'} />
            <span>Save</span>
          </button>
        </div>
      </div>
    </section>
  );
}
