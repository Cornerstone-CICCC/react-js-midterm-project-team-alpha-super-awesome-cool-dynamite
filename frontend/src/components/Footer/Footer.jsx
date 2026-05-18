import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner container">
        <div className="footer__brand">
          <span className="footer__logo">GLITCH</span>
          <span className="footer__copy">© 2024 GLITCH MARKETPLACE. NO MERCY.</span>
        </div>

        <nav className="footer__links">
          <a href="#" className="footer__link">TERMS</a>
          <a href="#" className="footer__link">PRIVACY</a>
          <a href="#" className="footer__link">CAREERS</a>
          <a href="#" className="footer__link">SUPPORT</a>
        </nav>

        <div className="footer__social">
          <button className="footer__social-btn" aria-label="Share">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="18" cy="5" r="3" />
              <circle cx="6" cy="12" r="3" />
              <circle cx="18" cy="19" r="3" />
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
            </svg>
          </button>
          <button className="footer__social-btn" aria-label="Broadcast">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="7" width="20" height="15" rx="2" ry="2" />
              <polyline points="17 2 12 7 7 2" />
            </svg>
          </button>
          <button className="footer__social-btn" aria-label="Community">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  )
}
