import React, { useState } from 'react';
import { Calendar, Clock, ShieldCheck, ChevronRight } from 'lucide-react';

export default function ThingsToKnowSection({ thingsToKnow }) {
  const [activeModal, setActiveModal] = useState(null);

  return (
    <section className="things-to-know-wrap" aria-label="House rules and policies">
      <h3 className="section-heading-lg">Things to know</h3>

      <div className="things-to-know-grid">
        {/* Cancellation Policy */}
        <div className="ttk-col">
          <Calendar size={20} className="ttk-icon" />
          <h4 className="ttk-title">{thingsToKnow.cancellation.title}</h4>
          {thingsToKnow.cancellation.lines.map((line, idx) => (
            <div key={idx} className="ttk-line">{line}</div>
          ))}
          <a
            href="#cancellation-details"
            className="ttk-learn-more"
            onClick={(e) => { e.preventDefault(); setActiveModal('cancellation'); }}
          >
            Learn more &gt;
          </a>
        </div>

        {/* House Rules */}
        <div className="ttk-col">
          <Clock size={20} className="ttk-icon" />
          <h4 className="ttk-title">{thingsToKnow.houseRules.title}</h4>
          {thingsToKnow.houseRules.lines.map((line, idx) => (
            <div key={idx} className="ttk-line">{line}</div>
          ))}
          <a
            href="#house-rules-details"
            className="ttk-learn-more"
            onClick={(e) => { e.preventDefault(); setActiveModal('houseRules'); }}
          >
            Learn more &gt;
          </a>
        </div>

        {/* Safety & Property */}
        <div className="ttk-col">
          <ShieldCheck size={20} className="ttk-icon" />
          <h4 className="ttk-title">{thingsToKnow.safety.title}</h4>
          {thingsToKnow.safety.lines.map((line, idx) => (
            <div key={idx} className="ttk-line">{line}</div>
          ))}
          <a
            href="#safety-details"
            className="ttk-learn-more"
            onClick={(e) => { e.preventDefault(); setActiveModal('safety'); }}
          >
            Learn more &gt;
          </a>
        </div>
      </div>

      {/* Mini info dialog if clicked */}
      {activeModal && (
        <div className="modal-backdrop" onClick={() => setActiveModal(null)}>
          <div className="modal-dialog-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '500px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '16px' }}>
              {activeModal === 'cancellation' && 'Cancellation Policy Details'}
              {activeModal === 'houseRules' && 'Full House Rules'}
              {activeModal === 'safety' && 'Safety & Property Details'}
            </h3>
            <p style={{ fontSize: '15px', lineHeight: 1.6, color: '#444' }}>
              {activeModal === 'cancellation' && 'Full refund available up to 48 hours before check-in. If booked within 48 hours, cancel within 2 hours for a full refund.'}
              {activeModal === 'houseRules' && 'No smoking indoors. Quiet hours begin at 10:00 pm. Maximum 3 registered guests. Parties and commercial events are strictly prohibited.'}
              {activeModal === 'safety' && 'Exterior CCTV cameras monitor the building gate and common parking area. Smoke and carbon monoxide detectors are not present; please take necessary precautions.'}
            </p>
            <button
              className="outline-action-btn"
              style={{ marginTop: '24px' }}
              onClick={() => setActiveModal(null)}
            >
              Done
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
