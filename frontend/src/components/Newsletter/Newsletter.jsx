import './Newsletter.css'

export default function Newsletter() {
  return (
    <section className="newsletter">
      <div className="container">
        <div className="newsletter__box">
          <div className="newsletter__left">
            <h2 className="newsletter__title">
              NO MERCY.<br />NO LAG.
            </h2>
            <p className="newsletter__body">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>

          <div className="newsletter__right">
            <input
              type="email"
              className="newsletter__input"
              placeholder="YOUR_EMAIL@GLITCH.COM"
              readOnly
            />
            <button className="newsletter__btn">JOIN</button>
          </div>
        </div>
      </div>
    </section>
  )
}
