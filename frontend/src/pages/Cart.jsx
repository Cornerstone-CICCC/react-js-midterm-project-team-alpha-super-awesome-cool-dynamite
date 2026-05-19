// ARTURO: Cart Page
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { cartApi } from "../services/api";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { refreshCart } = useCart();

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
    if (quantity < 1) return;
    try {
      await cartApi.updateItem(productId, { quantity });
      fetchCart();
      refreshCart();
    } catch (err) {
      console.error("Error updating cart");
    }
  };

  const handleRemove = async (productId) => {
    try {
      await cartApi.removeItem(productId);
      fetchCart();
      refreshCart();
    } catch (err) {
      console.error("Error removing from cart");
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-gray-500 text-lg">Loading cart...</p>
      </div>
    );

  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.product?.price || 0) * item.quantity,
    0
  );
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  return (
    <div className="container mx-auto px-6 py-10 max-w-5xl">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-20">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-20 h-20 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.5 6h13M7 13L5.4 5M10 21a1 1 0 100-2 1 1 0 000 2zm7 0a1 1 0 100-2 1 1 0 000 2z" />
          </svg>
          <p className="text-gray-500 text-lg mb-6">Your cart is empty</p>
          <Link
            to="/products"
            className="bg-purple-700 text-white px-6 py-2 rounded hover:bg-purple-800 transition"
          >
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Items list */}
          <div className="flex-1 flex flex-col gap-4">
            {cartItems.map((item) => {
              const price = item.product?.price || 0;
              const itemTotal = price * item.quantity;
              return (
                <div
                  key={item._id}
                  className="bg-white border border-gray-200 rounded-lg p-4 flex items-center gap-4 shadow-sm"
                >
                  {/* Product image */}
                  {item.product?.image ? (
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                  ) : (
                    <div className="w-20 h-20 bg-gray-100 rounded-lg flex-shrink-0" />
                  )}

                  {/* Name & unit price */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-800 truncate">{item.product?.name}</h3>
                    <p className="text-sm text-gray-500 mt-0.5">${price.toFixed(2)} each</p>
                  </div>

                  {/* Quantity controls */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => handleUpdateQuantity(item.product?._id, item.quantity - 1)}
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:border-purple-700 hover:text-purple-700 transition font-bold text-lg"
                    >
                      −
                    </button>
                    <span className="w-8 text-center font-semibold text-gray-800">{item.quantity}</span>
                    <button
                      onClick={() => handleUpdateQuantity(item.product?._id, item.quantity + 1)}
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:border-purple-700 hover:text-purple-700 transition font-bold text-lg"
                    >
                      +
                    </button>
                  </div>

                  {/* Item total */}
                  <div className="w-20 text-right flex-shrink-0">
                    <p className="font-bold text-purple-700">${itemTotal.toFixed(2)}</p>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => handleRemove(item.product?._id)}
                    className="flex-shrink-0 text-gray-400 hover:text-red-500 transition ml-2"
                    title="Remove item"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              );
            })}
          </div>

          {/* Order summary */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm sticky top-4">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h2>

              <div className="space-y-3 text-sm text-gray-600 mb-4">
                {cartItems.map((item) => (
                  <div key={item._id} className="flex justify-between">
                    <span className="truncate mr-2">{item.product?.name} × {item.quantity}</span>
                    <span className="flex-shrink-0">${((item.product?.price || 0) * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 pt-3 space-y-2 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax (10%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg text-gray-800 pt-2 border-t border-gray-200">
                  <span>Total</span>
                  <span className="text-purple-700">${total.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={() => navigate("/checkout")}
                className="mt-6 w-full bg-purple-700 text-white py-2.5 rounded-lg hover:bg-purple-800 transition font-semibold"
              >
                Proceed to Checkout
              </button>
              <Link
                to="/products"
                className="mt-3 w-full block text-center text-purple-700 border border-purple-700 py-2 rounded-lg hover:bg-purple-50 transition text-sm"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
