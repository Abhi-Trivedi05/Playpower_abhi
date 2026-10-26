import React from 'react';
import { Check, Clock, GraduationCap, Shield } from 'lucide-react';

export default function MeetHostSection({ host }) {
  return (
    <section className="meet-host-section-wrap" aria-label="Host information">
      <h3 className="section-heading-lg">Meet your host</h3>

      <div className="meet-host-grid">
        {/* Left Column: Host Profile Card & Bio Points */}
        <div>
          <div className="host-profile-card">
            <div className="host-avatar-badge-wrap">
              <img
                src={host.avatar}
                alt={host.name}
                className="host-card-avatar"
              />
              <div className="host-verified-badge" aria-label="Verified Host">
                <Check size={16} strokeWidth={3} />
              </div>
              <div className="host-card-name">{host.name}</div>
              <div className="host-card-role">Host</div>
            </div>

            <div className="host-card-stats">
              <div className="host-stat-item">
                <span className="host-stat-num">{host.reviewsCount.toLocaleString()}</span>
                <span className="host-stat-lbl">Reviews</span>
              </div>
              <div className="host-stat-item">
                <span className="host-stat-num">{host.rating.toFixed(2)}★</span>
                <span className="host-stat-lbl">Rating</span>
              </div>
              <div className="host-stat-item">
                <span className="host-stat-num">{host.yearsHosting}</span>
                <span className="host-stat-lbl">Years hosting</span>
              </div>
            </div>
          </div>

          <div className="host-bio-points">
            <div className="bio-point-row">
              <Clock size={20} />
              <span>{host.bornDecade}</span>
            </div>
            <div className="bio-point-row">
              <GraduationCap size={20} />
              <span>Where I went to school: {host.education}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Co-hosts and Host Details */}
        <div>
          <div className="cohosts-wrap">
            <h4>Co-Hosts</h4>
            <div className="cohosts-grid">
              {host.coHosts.map((cohost, idx) => (
                <div key={idx} className="cohost-item-row">
                  {cohost.avatar ? (
                    <img
                      src={cohost.avatar}
                      alt={cohost.name}
                      className="cohost-avatar-img"
                    />
                  ) : (
                    <div
                      className="cohost-avatar-initial"
                      style={{ backgroundColor: cohost.avatarColor || '#EBEBEB', color: '#222' }}
                    >
                      {cohost.avatarText}
                    </div>
                  )}
                  <span className="cohost-name">{cohost.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="host-meta-details-box">
            <h4>Host details</h4>
            <div className="host-meta-line">Response rate: {host.responseRate}</div>
            <div className="host-meta-line">{host.responseTime}</div>

            <button
              className="message-host-btn"
              onClick={() => alert('Host messaging dialog opened.')}
            >
              Message host
            </button>
          </div>

          <div className="payment-protection-note">
            <Shield size={24} style={{ flexShrink: 0 }} />
            <span>
              To help protect your payment, always use Airbnb to send money and communicate with hosts.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
