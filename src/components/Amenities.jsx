import React from 'react';
import { 
  Utensils, 
  Wifi, 
  Laptop, 
  Car, 
  Waves, 
  Bath, 
  Dog, 
  Cctv, 
  BellOff, 
  ShieldAlert 
} from 'lucide-react';

export default function Amenities({ previewAmenities, onOpenModal }) {
  const getAmenityIcon = (iconName) => {
    switch (iconName) {
      case 'Utensils': return <Utensils size={24} strokeWidth={1.5} />;
      case 'Wifi': return <Wifi size={24} strokeWidth={1.5} />;
      case 'Laptop': return <Laptop size={24} strokeWidth={1.5} />;
      case 'Car': return <Car size={24} strokeWidth={1.5} />;
      case 'Waves': return <Waves size={24} strokeWidth={1.5} />;
      case 'Bath': return <Bath size={24} strokeWidth={1.5} />;
      case 'Dog': return <Dog size={24} strokeWidth={1.5} />;
      case 'Cctv': return <Cctv size={24} strokeWidth={1.5} />;
      case 'BellOff': return <BellOff size={24} strokeWidth={1.5} />;
      case 'ShieldAlert': return <ShieldAlert size={24} strokeWidth={1.5} />;
      default: return <Wifi size={24} strokeWidth={1.5} />;
    }
  };

  return (
    <div className="amenities-section-wrap" id="amenities">
      <h3 className="section-heading-lg">What this place offers</h3>
      
      <div className="amenities-preview-grid">
        {previewAmenities.map((amenity, idx) => (
          <div key={idx} className={`amenity-row-item ${amenity.strike ? 'strikethrough' : ''}`}>
            {getAmenityIcon(amenity.icon)}
            <span>{amenity.name}</span>
          </div>
        ))}
      </div>

      <button className="outline-action-btn" onClick={onOpenModal}>
        Show all 50 amenities
      </button>
    </div>
  );
}
