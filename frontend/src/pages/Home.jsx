import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import ProductCard from "../components/ProductCard";
import { productsApi, cartApi } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

function Home() {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { refreshCart } = useCart();

  useEffect(() => {
    productsApi
      .getAll()
      .then((res) => setFeatured(res.data.slice(0, 6)))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleAddToCart = async (product) => {
    if (!user) return toast.error("Please log in to add items to your cart.");
    try {
      await cartApi.addItem({ productId: product._id, quantity: 1 });
      toast.success(`"${product.name}" added to cart!`);
      refreshCart();
    } catch {
      toast.error("Failed to add to cart.");
    }
  };

  return (
    <div>
      <section className="bg-purple-700 text-white py-16 px-6 text-center mb-8">
        <h1 className="text-4xl font-bold mb-3">
          Welcome to Glitch Marketplace
        </h1>
        <p className="text-lg mb-6 text-purple-200">
          Your go-to store for games and collectibles
        </p>
        <Link
          to="/products"
          className="bg-white text-purple-700 font-semibold px-6 py-2 rounded hover:bg-purple-50 transition"
        >
          Browse All Products
        </Link>
      </section>

      <div className="container mx-auto px-6 py-10">
        <h2 className="text-2xl font-bold mb-6">Featured Products</h2>
        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : featured.length === 0 ? (
          <p className="text-gray-500">No products available yet.</p>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {featured.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
            <div className="text-center mt-8">
              <Link
                to="/products"
                className="text-purple-700 border border-purple-700 px-6 py-2 rounded hover:bg-purple-50 transition"
              >
                View All Products
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Home;
