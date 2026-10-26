import React, { useState, useEffect } from 'react';
import { X, Copy, Check, MessageCircle, Mail, Send } from 'lucide-react';

export default function ShareModal({ isOpen, onClose, title, imageUrl }) {
  const [copied, setCopied] = useState(false);

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

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-label="Share listing">
      <div className="modal-dialog-content share-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-icon-btn" onClick={onClose} aria-label="Close dialog">
          <X size={20} />
        </button>

        <h2 className="modal-heading" style={{ fontSize: '22px' }}>Share this place</h2>

        <div className="share-listing-preview-card">
          <img src={imageUrl} alt={title} />
          <div>
            <div style={{ fontWeight: 600, fontSize: '15px' }}>{title}</div>
            <div style={{ fontSize: '13px', color: '#717171', marginTop: '2px' }}>
              Entire serviced apartment in Candolim · ★ 4.95
            </div>
          </div>
        </div>

        <div className="share-options-grid">
          <button className="share-option-btn" onClick={handleCopyLink}>
            {copied ? <Check size={18} color="#008A05" /> : <Copy size={18} />}
            <span>{copied ? 'Link copied!' : 'Copy link'}</span>
          </button>

          <button className="share-option-btn" onClick={() => window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(window.location.href)}`, '_blank')}>
            <MessageCircle size={18} color="#25D366" />
            <span>WhatsApp</span>
          </button>

          <button className="share-option-btn" onClick={() => window.open(`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(window.location.href)}`)}>
            <Mail size={18} />
            <span>Email</span>
          </button>

          <button className="share-option-btn" onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank')}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#1877F2"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            <span>Facebook</span>
          </button>

          <button className="share-option-btn" onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(title)}`, '_blank')}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#000"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            <span>Twitter / X</span>
          </button>

          <button className="share-option-btn" onClick={() => window.open(`https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(title)}`, '_blank')}>
            <Send size={18} color="#0088CC" />
            <span>Telegram</span>
          </button>
        </div>
      </div>
    </div>
  );
}
