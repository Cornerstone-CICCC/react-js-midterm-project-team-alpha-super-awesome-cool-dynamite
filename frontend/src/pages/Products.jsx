import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import ProductCard from "../components/ProductCard";
import { productsApi, cartApi } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const { refreshCart } = useCart();

  useEffect(() => {
    productsApi
      .getAll()
      .then((res) => setProducts(res.data))
      .catch(() => setError("Failed to load products."))
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

  if (loading)
    return <div className="p-8 text-center">Loading products...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-2xl font-bold mb-6">All Products</h1>
      {products.length === 0 ? (
        <p className="text-gray-500">No products available yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Products;
