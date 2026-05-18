import './Header.css'

export default function Header() {
  return (
    <header className="header">
      <div className="header__inner">
        <div className="header__logo">GLITCH</div>

        <nav className="header__nav">
          <a href="#" className="header__nav-link header__nav-link--active">DISCOVER</a>
          <a href="#" className="header__nav-link">LIBRARY</a>
          <a href="#" className="header__nav-link">COMMUNITY</a>
          <a href="#" className="header__nav-link">DEALS</a>
        </nav>

        <div className="header__actions">
          <div className="header__search">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="SEARCH PROTOCOL..."
              className="header__search-input"
              readOnly
            />
          </div>

          <button className="header__icon-btn" aria-label="Cart">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
          </button>

          <button className="header__icon-btn" aria-label="Notifications">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
          </button>

          <div className="header__avatar" />
        </div>
      </div>
    </header>
  )
}
