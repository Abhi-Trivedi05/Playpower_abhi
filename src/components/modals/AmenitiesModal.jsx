import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export default function AmenitiesModal({ isOpen, onClose, categorizedAmenities }) {
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

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-label="Amenities details">
      <div className="modal-dialog-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-icon-btn" onClick={onClose} aria-label="Close dialog">
          <X size={20} />
        </button>

        <h2 className="modal-heading">What this place offers</h2>

        {categorizedAmenities.map((group, idx) => (
          <div key={idx} className="amenities-category-group">
            <h4 className="amenities-category-title">{group.category}</h4>
            <div className="amenities-category-items">
              {group.items.map((item, itemIdx) => (
                <div key={itemIdx} className={`modal-amenity-item ${item.available ? '' : 'unavailable'}`}>
                  <span>{item.name}</span>
                  {!item.available && item.strikeNote && (
                    <span style={{ fontSize: '13px', color: '#717171' }}>({item.strikeNote})</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
