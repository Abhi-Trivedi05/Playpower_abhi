import React from 'react';
import { Star } from 'lucide-react';

export default function HostBadge({ type, specs, rating, reviewCount, guestFavouriteText, host }) {
  return (
    <div className="property-overview-wrap">
      {/* Property Subtitle and Specs */}
      <div className="property-subtitle-block">
        <h2>{type}</h2>
        <div className="property-specs-text">{specs}</div>
      </div>

      {/* Guest Favourite Badge Card */}
      <div className="guest-favourite-card">
        <div className="gf-laurel-badge">
          <svg width="24" height="24" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
            <path d="M11.666 4.333c1.5 2.5 1.5 5.5 0 8-1.5 2.5-4 4-7 4.5 1-2.5 1-5.5 0-8 1.5-2.5 4-4 7-4.5zM20.334 4.333c-1.5 2.5-1.5 5.5 0 8 1.5 2.5 4 4 7 4.5-1-2.5-1-5.5 0-8-1.5-2.5-4-4-7-4.5z"/>
          </svg>
          <div>
            <span>Guest</span><br />
            <span>favourite</span>
          </div>
          <svg width="24" height="24" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true" style={{ transform: 'scaleX(-1)' }}>
            <path d="M11.666 4.333c1.5 2.5 1.5 5.5 0 8-1.5 2.5-4 4-7 4.5 1-2.5 1-5.5 0-8 1.5-2.5 4-4 7-4.5zM20.334 4.333c-1.5 2.5-1.5 5.5 0 8 1.5 2.5 4 4 7 4.5-1-2.5-1-5.5 0-8-1.5-2.5-4-4-7-4.5z"/>
          </svg>
        </div>

        <div className="gf-center-desc">
          {guestFavouriteText}
        </div>

        <div className="gf-rating-block">
          <div className="gf-score-stars">
            <span className="score-num">{rating.toFixed(2)}</span>
            <div className="gf-stars-row">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={11} fill="currentColor" color="currentColor" />
              ))}
            </div>
          </div>
          <div className="gf-divider-line" />
          <div className="gf-reviews-count">
            <span className="rev-num">{reviewCount}</span>
            <span className="rev-lbl">Reviews</span>
          </div>
        </div>
      </div>

      {/* Host Snippet Row */}
      <div className="host-snippet-row">
        <img
          src={host.avatar}
          alt={host.name}
          className="host-snippet-avatar"
        />
        <div>
          <div className="host-snippet-name">Hosted by {host.name}</div>
          <div className="host-snippet-tenure">{host.yearsHosting} years hosting</div>
        </div>
      </div>
    </div>
  );
}
