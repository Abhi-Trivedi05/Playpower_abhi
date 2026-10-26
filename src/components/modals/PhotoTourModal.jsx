import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, Upload, Heart } from 'lucide-react';

export default function PhotoTourModal({
  categories,
  isOpen,
  onClose,
  initialCategoryIndex = 0,
  isSaved,
  onToggleSave,
  onOpenShare
}) {
  const [activeSection, setActiveSection] = useState(categories[0]?.id || '');
  const containerRef = useRef(null);
  const sectionRefs = useRef({});

  const scrollToRoom = (id) => {
    setActiveSection(id);
    const element = sectionRefs.current[id];
    const container = containerRef.current;
    if (element && container) {
      const containerTop = container.getBoundingClientRect().top;
      const elemTop = element.getBoundingClientRect().top;
      container.scrollTop += (elemTop - containerTop) - 80; // 80px offset for sticky header
    }
  };

  useEffect(() => {
    if (!isOpen) return;

    const targetCat = categories[initialCategoryIndex] || categories[0];
    if (targetCat) {
      setActiveSection(targetCat.id);
      if (initialCategoryIndex > 0) {
        setTimeout(() => {
          scrollToRoom(targetCat.id);
        }, 50);
      } else if (containerRef.current) {
        containerRef.current.scrollTop = 0;
      }
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
  }, [isOpen, onClose, initialCategoryIndex, categories]);

  if (!isOpen) return null;

  return (
    <div
      className="photo-tour-fullscreen"
      role="dialog"
      aria-modal="true"
      aria-label="Photo tour"
      ref={containerRef}
    >
      {/* Sticky Top Header */}
      <div className="photo-tour-header">
        <button
          onClick={onClose}
          aria-label="Back to listing"
          className="photo-tour-back-btn"
        >
          <ChevronLeft size={20} strokeWidth={2.5} />
        </button>

        <span className="photo-tour-title">Photo tour</span>

        <div className="photo-tour-header-actions">
          <button
            className="photo-tour-action-btn"
            onClick={onOpenShare}
            aria-label="Share"
          >
            <Upload size={16} strokeWidth={2} />
            <span>Share</span>
          </button>
          <button
            className={`photo-tour-action-btn ${isSaved ? 'saved' : ''}`}
            onClick={onToggleSave}
            aria-label={isSaved ? 'Remove from wishlist' : 'Save to wishlist'}
          >
            <Heart
              size={16}
              strokeWidth={2}
              fill={isSaved ? '#FF385C' : 'none'}
              color={isSaved ? '#FF385C' : '#222222'}
            />
            <span>{isSaved ? 'Saved' : 'Save'}</span>
          </button>
        </div>
      </div>

      {/* Scrollable Content Body - starts directly with the home room sections */}
      <div className="photo-tour-body">
        {categories.map((cat) => (
          <section
            key={cat.id}
            id={`tour-room-${cat.id}`}
            ref={(el) => { sectionRefs.current[cat.id] = el; }}
            className="tour-room-section"
          >
            {/* Two-column layout: info left, photos right */}
            <div className="tour-room-row">
              <div className="tour-room-info">
                <h3 className="tour-room-name">{cat.name}</h3>
                <p className="tour-room-features">{cat.description}</p>
              </div>

              <div className="tour-room-photos">
                {/* First photo: full-width primary */}
                {cat.photos[0] && (
                  <div className="tour-photo-item primary">
                    <img src={cat.photos[0].url} alt={cat.photos[0].caption || cat.name} loading="lazy" />
                    {cat.photos[0].caption && (
                      <p className="tour-photo-caption">{cat.photos[0].caption}</p>
                    )}
                  </div>
                )}

                {/* Remaining photos: grouped 2-per-row */}
                {(() => {
                  const secondary = cat.photos.slice(1);
                  const rows = [];
                  for (let i = 0; i < secondary.length; i += 2) {
                    const pair = secondary.slice(i, i + 2);
                    if (pair.length === 1) {
                      rows.push(
                        <div key={i} className="tour-photo-item secondary">
                          <img src={pair[0].url} alt={pair[0].caption || cat.name} loading="lazy" />
                          {pair[0].caption && <p className="tour-photo-caption">{pair[0].caption}</p>}
                        </div>
                      );
                    } else {
                      rows.push(
                        <div key={i} className="tour-secondary-row">
                          {pair.map((photo, j) => (
                            <div key={j}>
                              <img src={photo.url} alt={photo.caption || cat.name} loading="lazy" />
                              {photo.caption && <p className="tour-photo-caption">{photo.caption}</p>}
                            </div>
                          ))}
                        </div>
                      );
                    }
                  }
                  return rows;
                })()}
              </div>
            </div>
          </section>
        ))}

        {/* Bottom spacer */}
        <div style={{ height: '60px' }} />
      </div>
    </div>
  );
}
