import './Trending.css'

const GAMES = [
  {
    id: 1,
    name: 'LOREM IPSUM',
    genre: 'RPG',
    genreColor: '#22c55e',
    badge: '0.8/10',
    price: '$45.00',
    originalPrice: null,
  },
  {
    id: 2,
    name: 'DOLOR AMET',
    genre: 'FPS',
    genreColor: '#f97316',
    badge: 'NEW',
    price: '$32.00',
    originalPrice: null,
  },
  {
    id: 3,
    name: 'CONSECTETUR',
    genre: 'RETRO',
    genreColor: '#eab308',
    badge: '-20%',
    price: '$19.99',
    originalPrice: '$24.99',
  },
  {
    id: 4,
    name: 'ADIPISCING',
    genre: 'SIM',
    genreColor: '#3b82f6',
    badge: 'HOT',
    price: '$49.99',
    originalPrice: null,
  },
]

function TrendingCard({ game }) {
  return (
    <div className="game-card">
      <div className="game-card__image-wrap">
        <div className="img-placeholder game-card__image" />
        <span
          className="game-card__genre"
          style={{ backgroundColor: game.genreColor }}
        >
          {game.genre}
        </span>
        <span className="game-card__badge">{game.badge}</span>
      </div>
      <div className="game-card__info">
        <span className="game-card__name">{game.name}</span>
        <div className="game-card__bottom">
          <div className="game-card__prices">
            <span className="game-card__price">{game.price}</span>
            {game.originalPrice && (
              <span className="game-card__original">{game.originalPrice}</span>
            )}
          </div>
          <button className="game-card__cart" aria-label="Add to cart">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default function Trending() {
  return (
    <section className="trending">
      <div className="container">
        <div className="trending__header">
          <h2 className="trending__title">TRENDING NOW</h2>
          <a href="#" className="trending__view-all">VIEW ALL →</a>
        </div>
        <div className="trending__divider" />
        <div className="trending__grid">
          {GAMES.map((game) => (
            <TrendingCard key={game.id} game={game} />
          ))}
        </div>
      </div>
    </section>
  )
}
