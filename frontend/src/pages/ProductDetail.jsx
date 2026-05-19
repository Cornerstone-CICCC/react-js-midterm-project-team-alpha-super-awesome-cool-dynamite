// ARTURO: ProductDetail Page
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { productsApi, cartApi } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { refreshCart } = useCart();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await productsApi.getById(id);
      setProduct(response.data);
    } catch (err) {
      setError("Product not found");
      setTimeout(() => navigate("/products"), 2000);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    try {
      await cartApi.addItem({ productId: id, quantity });
      toast.success("Added to cart!");
      refreshCart();
    } catch (err) {
      toast.error("Error adding to cart");
    }
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error)
    return <div className="text-center py-8 text-red-600">{error}</div>;
  if (!product) return null;

  return (
    <div className="max-w-4xl mx-auto p-8">
      <button
        onClick={() => navigate("/products")}
        className="text-blue-600 mb-4"
      >
        ← Back to Products
      </button>
      <div className="grid grid-cols-2 gap-8">
        <div>
          {product.image && (
            <img
              src={product.image}
              alt={product.name}
              className="w-full rounded-lg"
            />
          )}
        </div>
        <div>
          <h1 className="text-4xl font-bold mb-2">{product.name}</h1>
          <p className="text-gray-600 mb-4">{product.category}</p>
          <p className="text-3xl font-bold mb-4">${product.price}</p>
          <p className="text-gray-700 mb-6">{product.description}</p>
          <div className="flex gap-4">
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              className="border rounded px-3 py-2 w-20"
            />
            <button
              onClick={handleAddToCart}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
