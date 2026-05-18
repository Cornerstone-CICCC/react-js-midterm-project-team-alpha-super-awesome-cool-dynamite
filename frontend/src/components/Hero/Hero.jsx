import './Hero.css'

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero__inner container">
        <div className="hero__left">
          <h1 className="hero__title">
            LOREM<br />IPSUM
          </h1>
          <p className="hero__subtitle">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Pellentesque vitae velit ex. Mauris dapibus risus quis suscipit
            vulputate eget.
          </p>
          <button className="hero__cta">ENTER THE VOID</button>
        </div>

        <div className="hero__right">
          <div className="featured-card">
            <div className="featured-card__inner">
              <div className="featured-card__image-wrap">
                <div className="img-placeholder featured-card__image" />
                <span className="featured-card__badge">FEATURED DROP</span>
              </div>
              <div className="featured-card__info">
                <div className="featured-card__meta">
                  <span className="featured-card__title">LOREM IPSUM</span>
                  <span className="featured-card__genre">TACTICAL ACTION / 2024</span>
                </div>
                <div className="featured-card__pricing">
                  <span className="featured-card__price">$59.99</span>
                  <a href="#" className="featured-card__buy">BUY NOW</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
