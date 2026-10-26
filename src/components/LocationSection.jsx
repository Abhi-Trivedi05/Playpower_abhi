import React, { useState } from 'react';
import { Home, Plus, Minus, Search, ChevronRight, ChevronUp } from 'lucide-react';

export default function LocationSection({ location }) {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [showMoreNeighbourhood, setShowMoreNeighbourhood] = useState(false);

  const handleZoom = (delta) => {
    setZoomLevel(prev => Math.min(Math.max(0.8, prev + delta), 1.5));
  };

  return (
    <section className="location-section-wrap" id="location" aria-label="Location information">
      <h3 className="section-heading-lg">Where you'll be</h3>
      <div className="location-address-title">{location.address}</div>

      {/* Interactive Map Visual */}
      <div className="custom-map-container" style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'center center' }}>
        <div className="map-grid-pattern" />

        {/* Top left search tool */}
        <div style={{ position: 'absolute', top: 16, left: 16, zIndex: 5 }}>
          <div style={{
            background: 'white',
            width: 36,
            height: 36,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 6px rgba(0,0,0,0.15)'
          }}>
            <Search size={16} />
          </div>
        </div>

        {/* Center pulsed pin */}
        <div className="map-pin-pulse">
          <div className="map-circle-halo" />
          <div className="map-home-badge" aria-label="Location indicator">
            <Home size={24} />
          </div>
        </div>

        {/* Top-right Zoom Controls */}
        <div className="map-controls-box">
          <button className="map-ctrl-btn" onClick={() => handleZoom(0.1)} aria-label="Zoom in">
            <Plus size={16} />
          </button>
          <button className="map-ctrl-btn" onClick={() => handleZoom(-0.1)} aria-label="Zoom out">
            <Minus size={16} />
          </button>
        </div>
      </div>

      <div className="location-exact-note">
        Exact location will be provided after booking.
      </div>

      {/* Neighbourhood Highlights */}
      <div className="neighbourhood-wrap">
        <h4 className="neighbourhood-title">Neighbourhood highlights</h4>
        <div className="neighbourhood-text">
          {location.neighbourhoodHeadline}
          {showMoreNeighbourhood && (
            <span style={{ display: 'block', marginTop: '10px' }}>
              {location.neighbourhoodMore}
            </span>
          )}
        </div>
        <button
          className="show-more-link-btn"
          onClick={() => setShowMoreNeighbourhood(!showMoreNeighbourhood)}
          aria-expanded={showMoreNeighbourhood}
        >
          <span>{showMoreNeighbourhood ? 'Show less' : 'Show more'}</span>
          {showMoreNeighbourhood ? <ChevronUp size={18} /> : <ChevronRight size={18} />}
        </button>
      </div>
    </section>
  );
}
