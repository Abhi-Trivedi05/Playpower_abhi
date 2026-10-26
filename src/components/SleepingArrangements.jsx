import React from 'react';

export default function SleepingArrangements({ arrangements }) {
  return (
    <div className="sleeping-arrangements-wrap">
      <h3 className="section-heading-lg">Where you'll sleep</h3>
      <div className="sleep-cards-grid">
        {arrangements.map((item, idx) => (
          <div key={idx} className="sleep-card">
            <img src={item.image} alt={item.title} loading="lazy" />
            <div className="sleep-card-title">{item.title}</div>
            <div className="sleep-card-subtitle">{item.subtitle}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
