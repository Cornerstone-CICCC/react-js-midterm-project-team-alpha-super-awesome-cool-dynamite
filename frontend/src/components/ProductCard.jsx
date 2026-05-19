import { Link } from 'react-router-dom';

function ProductCard({ product, onAddToCart }) {
  const { _id, name, description, price, image } = product;

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden flex flex-col">
      <img
        src={image}
        alt={name}
        className="w-full h-48 object-cover"
        onError={(e) => { e.target.style.display = 'none'; }}
      />
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-semibold text-lg mb-1">{name}</h3>
        <p className="text-gray-500 text-sm mb-2 flex-1 line-clamp-2">{description}</p>
        <div className="flex items-center justify-between mb-3">
          <span className="text-purple-700 font-bold text-lg">${price.toFixed(2)}</span>
        </div>
        <div className="flex gap-2">
          <Link
            to={`/products/${_id}`}
            className="flex-1 text-center border border-purple-700 text-purple-700 rounded py-1 text-sm hover:bg-purple-50 transition"
          >
            View Details
          </Link>
          <button
            onClick={() => onAddToCart(product)}
            className="flex-1 bg-purple-700 text-white rounded py-1 text-sm hover:bg-purple-800 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
