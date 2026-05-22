import './ComingSoon.css'

export default function ComingSoon() {
  return (
    <section className="coming-soon">
      <div className="container">
        <h2 className="coming-soon__title">COMING SOON</h2>

        <div className="coming-soon__grid">
          {/* Left: Exclusive reveal */}
          <div className="reveal-card">
            <div className="img-placeholder reveal-card__image" />
            <div className="reveal-card__overlay">
              <span className="reveal-card__tag">EXCLUSIVE REVEAL</span>
              <h3 className="reveal-card__name">LOREM-IPSUM</h3>
              <button className="reveal-card__btn">WISHLIST NOW</button>
            </div>
          </div>

          {/* Right: Two side cards */}
          <div className="coming-soon__side">
            <div className="side-card side-card--purple">
              <h4 className="side-card__title">BETA ACCESS</h4>
              <p className="side-card__body">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Proin libero nunc consequat interdum varius.
              </p>
              <a href="#" className="side-card__link">APPLY PROTOCOL</a>
            </div>

            <div className="side-card side-card--crimson">
              <h4 className="side-card__title">SUMMER DROP</h4>
              <p className="side-card__body">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore.
              </p>
              <div className="side-card__countdown">14:02:55</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
