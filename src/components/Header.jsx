import React, { useState } from 'react';
import { Search, Globe, Menu, User } from 'lucide-react';

export default function Header() {
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <header className="site-header" id="photos">
      <div className="site-header-inner">
        {/* Logo */}
        <a href="#" className="brand-logo-wrap" aria-label="Airbnb Home">
          <svg className="brand-logo-icon" viewBox="0 0 32 32" aria-hidden="true">
            <path d="M16 1c2.008 0 3.463.963 4.751 3.269l.533 1.025c1.954 3.83 6.114 12.54 7.1 14.836l.145.353c.667 1.591.91 2.472.96 3.396l.011.315c0 4.54-3.518 8.056-8.056 8.056-2.52 0-4.83-1.107-6.444-2.895C13.38 31.143 11.07 32.25 8.55 32.25 4.012 32.25.494 28.734.494 24.194c0-.987.243-1.897.942-3.568l.174-.407c.98-2.28 5.14-10.99 7.094-14.82l.533-1.025C10.537 2.063 11.992 1 14 1h2zm0 2h-2c-1.285 0-2.349.66-3.411 2.553l-.53 1.018c-1.93 3.774-6.07 12.443-7.042 14.717l-.17.398c-.61 1.455-.847 2.18-.847 2.508 0 3.447 2.609 6.056 6.056 6.056 2.296 0 4.385-1.233 5.485-3.21l.46-.826.46.826c1.1 1.977 3.189 3.21 5.484 3.21 3.447 0 6.056-2.609 6.056-6.056 0-.327-.238-1.053-.847-2.508l-.145-.353c-.973-2.274-5.113-10.943-7.042-14.717l-.53-1.018C18.35 3.66 17.285 3 16 3zm0 15c2.209 0 4 1.791 4 4 0 1.96-1.414 3.59-3.298 3.938l-.202.028-.25.017-.25-.017C13.616 25.618 12.202 23.988 12.202 22c0-2.209 1.791-4 4-4zm0 2c-1.105 0-2 .895-2 2 0 .977.701 1.791 1.631 1.965l.169.022.2-.007.2-.022C17.13 23.778 17.8 22.97 17.8 22c0-1.105-.895-2-2-2z"/>
          </svg>
          <span className="brand-logo-text">airbnb</span>
        </a>

        {/* Central Search Pill */}
        <div className="header-search-bar" role="button" tabIndex={0} aria-label="Search places and dates">
          <span className="search-pill-item">Anywhere</span>
          <div className="search-divider" />
          <span className="search-pill-item">Anytime</span>
          <div className="search-divider" />
          <span className="search-pill-item secondary">Add guests</span>
          <button className="search-btn-circle" aria-label="Search">
            <Search size={14} strokeWidth={3} />
          </button>
        </div>

        {/* Right actions */}
        <div className="header-actions">
          <a href="#" className="host-link-btn">Become a host</a>
          <button className="globe-icon-btn" aria-label="Language & Currency">
            <Globe size={18} />
          </button>

          <div style={{ position: 'relative' }}>
            <button
              className="user-menu-pill"
              onClick={() => setShowUserMenu(!showUserMenu)}
              aria-label="Main navigation menu"
              aria-expanded={showUserMenu}
            >
              <Menu size={16} />
              <div className="user-avatar-circle">
                <User size={16} />
              </div>
            </button>

            {showUserMenu && (
              <div
                style={{
                  position: 'absolute',
                  top: '110%',
                  right: 0,
                  width: '240px',
                  backgroundColor: '#FFFFFF',
                  borderRadius: '12px',
                  boxShadow: '0 2px 16px rgba(0,0,0,0.15)',
                  border: '1px solid #EBEBEB',
                  padding: '8px 0',
                  zIndex: 200
                }}
              >
                <div style={{ padding: '12px 16px', fontWeight: 600, fontSize: '14px', borderBottom: '1px solid #EBEBEB' }}>
                  Sign up
                </div>
                <div style={{ padding: '12px 16px', fontSize: '14px', borderBottom: '1px solid #EBEBEB' }}>
                  Log in
                </div>
                <div style={{ padding: '12px 16px', fontSize: '14px' }}>
                  Airbnb your home
                </div>
                <div style={{ padding: '12px 16px', fontSize: '14px' }}>
                  Help Centre
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
