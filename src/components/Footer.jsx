import React from 'react';
import { Globe } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="page-container">
        <div className="footer-top-grid">
          <div className="footer-col">
            <h5>Support</h5>
            <ul className="footer-links-list">
              <li><a href="#help" onClick={(e) => e.preventDefault()}>Help Centre</a></li>
              <li><a href="#aircover" onClick={(e) => e.preventDefault()}>AirCover</a></li>
              <li><a href="#safety" onClick={(e) => e.preventDefault()}>Anti-discrimination</a></li>
              <li><a href="#disability" onClick={(e) => e.preventDefault()}>Disability support</a></li>
              <li><a href="#cancellation" onClick={(e) => e.preventDefault()}>Cancellation options</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h5>Hosting</h5>
            <ul className="footer-links-list">
              <li><a href="#host" onClick={(e) => e.preventDefault()}>Airbnb your home</a></li>
              <li><a href="#aircover-hosts" onClick={(e) => e.preventDefault()}>AirCover for Hosts</a></li>
              <li><a href="#resources" onClick={(e) => e.preventDefault()}>Hosting resources</a></li>
              <li><a href="#community" onClick={(e) => e.preventDefault()}>Community forum</a></li>
              <li><a href="#responsible" onClick={(e) => e.preventDefault()}>Hosting responsibly</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h5>Airbnb</h5>
            <ul className="footer-links-list">
              <li><a href="#newsroom" onClick={(e) => e.preventDefault()}>Newsroom</a></li>
              <li><a href="#features" onClick={(e) => e.preventDefault()}>New features</a></li>
              <li><a href="#careers" onClick={(e) => e.preventDefault()}>Careers</a></li>
              <li><a href="#investors" onClick={(e) => e.preventDefault()}>Investors</a></li>
              <li><a href="#emergency" onClick={(e) => e.preventDefault()}>Airbnb.org emergency stays</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom-row">
          <div className="footer-bottom-left">
            <span>© 2026 Airbnb, Inc.</span>
            <span>·</span>
            <a href="#privacy" onClick={(e) => e.preventDefault()}>Privacy</a>
            <span>·</span>
            <a href="#terms" onClick={(e) => e.preventDefault()}>Terms</a>
            <span>·</span>
            <a href="#sitemap" onClick={(e) => e.preventDefault()}>Sitemap</a>
            <span>·</span>
            <a href="#company" onClick={(e) => e.preventDefault()}>Company details</a>
          </div>

          <div className="footer-bottom-right">
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600 }}>
              <Globe size={16} />
              <span>English (IN)</span>
            </div>
            <span style={{ fontWeight: 600 }}>₹ INR</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
