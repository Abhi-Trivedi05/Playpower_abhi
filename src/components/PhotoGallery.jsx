import React, { useState, useRef } from 'react';
import { Grid } from 'lucide-react';

export default function PhotoGallery({ images, onOpenTour }) {
  if (!images || images.length === 0) return null;

  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef(null);

  const handleScroll = () => {
    if (carouselRef.current) {
      const scrollLeft = carouselRef.current.scrollLeft;
      const width = carouselRef.current.clientWidth;
      if (width > 0) {
        const index = Math.round(scrollLeft / width);
        setActiveIndex(Math.min(Math.max(0, index), Math.min(images.length, 5) - 1));
      }
    }
  };

  return (
    <section className="photo-gallery-container" aria-label="Listing photo gallery">
      {/* Desktop 5-photo grid */}
      <div className="photo-gallery-grid desktop-only-grid">
        <div
          className="gallery-photo-item main-photo"
          onClick={() => onOpenTour(0)}
          role="button"
          tabIndex={0}
          aria-label="View photo 1 in tour"
        >
          <img src={images[0].url} alt={images[0].alt} loading="eager" />
        </div>

        {images.slice(1, 5).map((img, idx) => (
          <div
            key={img.id}
            className="gallery-photo-item"
            onClick={() => onOpenTour(idx + 1)}
            role="button"
            tabIndex={0}
            aria-label={`View photo ${idx + 2} in tour`}
          >
            <img src={img.url} alt={img.alt} loading="lazy" />
          </div>
        ))}
      </div>

      {/* Mobile swipeable carousel */}
      <div
        className="photo-gallery-mobile-slider"
        ref={carouselRef}
        onScroll={handleScroll}
      >
        {images.slice(0, 5).map((img, idx) => (
          <div
            key={img.id}
            className="photo-gallery-mobile-slide"
            onClick={() => onOpenTour(idx)}
            role="button"
            tabIndex={0}
            aria-label={`View photo ${idx + 1} of ${Math.min(images.length, 5)}`}
          >
            <img src={img.url} alt={img.alt} loading={idx === 0 ? 'eager' : 'lazy'} />
          </div>
        ))}
      </div>

      {/* Mobile photo index badge */}
      <div className="photo-mobile-counter-pill">
        {activeIndex + 1} / {Math.min(images.length, 5)}
      </div>

      {/* Show all photos button */}
      <button
        className="show-all-photos-btn"
        onClick={() => onOpenTour(activeIndex)}
        aria-label="Show all photos"
      >
        <Grid size={16} />
        <span>Show all photos</span>
      </button>
    </section>
  );
}
