import React, { useState } from 'react';
import { ChevronRight, ChevronUp } from 'lucide-react';

export default function Description({ description }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="description-section-wrap">
      {/* Auto translate notice */}
      <div className="auto-translate-notice">
        Some info has been automatically translated. <a href="#translate" onClick={(e) => e.preventDefault()}>Show original</a>
      </div>

      <div className={`listing-description-content ${isExpanded ? '' : 'clamped'}`}>
        {description}
      </div>

      <button
        className="show-more-link-btn"
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
      >
        <span>{isExpanded ? 'Show less' : 'Show more'}</span>
        {isExpanded ? <ChevronUp size={18} /> : <ChevronRight size={18} />}
      </button>
    </div>
  );
}
