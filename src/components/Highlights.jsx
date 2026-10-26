import React from 'react';
import { UtensilsCrossed, Fan, LogIn } from 'lucide-react';

export default function Highlights({ highlights }) {
  const getIcon = (type) => {
    switch (type) {
      case 'outdoor':
        return <UtensilsCrossed size={24} strokeWidth={1.75} />;
      case 'fan':
        return <Fan size={24} strokeWidth={1.75} />;
      case 'door':
      default:
        return <LogIn size={24} strokeWidth={1.75} />;
    }
  };

  return (
    <div className="highlights-list">
      {highlights.map((item, idx) => (
        <div key={idx} className="highlight-row">
          <div className="highlight-icon-box">
            {getIcon(item.icon)}
          </div>
          <div>
            <div className="highlight-title">{item.title}</div>
            <div className="highlight-subtitle">{item.subtitle}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
