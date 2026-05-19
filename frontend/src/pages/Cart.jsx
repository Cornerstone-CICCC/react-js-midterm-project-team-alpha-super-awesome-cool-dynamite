// ARTURO: Cart Page
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { cartApi } from "../services/api";

export default function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await cartApi.getCart();
      setCartItems(response.data.items || []);
    } catch (err) {
      console.error("Error fetching cart");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateQuantity = async (productId, quantity) => {
    try {
      await cartApi.updateItem(productId, { quantity });
      fetchCart();
    } catch (err) {
      console.error("Error updating cart");
    }
  };

  const handleRemove = async (productId) => {
    try {
      await cartApi.removeItem(productId);
      fetchCart();
    } catch (err) {
      console.error("Error removing from cart");
    }
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;

  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.product?.price || 0) * item.quantity,
    0,
  );
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-8">
          <p className="mb-4">Your cart is empty</p>
          <Link to="/products" className="text-blue-600">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4 mb-6">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="border rounded p-4 flex justify-between items-center"
              >
                <div>
                  <h3 className="font-bold">{item.product?.name}</h3>
                  <p className="text-gray-600">${item.product?.price}</p>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      handleUpdateQuantity(
                        item.product?._id,
                        parseInt(e.target.value),
                      )
                    }
                    className="border rounded px-2 py-1 w-16"
                  />
                  <button
                    onClick={() => handleRemove(item.product?._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gray-100 p-4 rounded mb-6">
            <div className="flex justify-between mb-2">
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Tax (10%):</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <div className="flex gap-4">
            <Link
              to="/products"
              className="flex-1 bg-gray-500 text-white text-center py-2 rounded hover:bg-gray-600"
            >
              Continue Shopping
            </Link>
            <button
              onClick={() => navigate("/checkout")}
              className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}
