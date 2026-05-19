// ARTURO: Checkout Page
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { cartApi } from "../services/api";

export default function Checkout() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    zip: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
  });

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setOrderPlaced(true);
    setTimeout(() => navigate("/"), 3000);
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (cartItems.length === 0 && !orderPlaced) {
    return (
      <div className="text-center py-8">
        <p>Your cart is empty</p>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="max-w-md mx-auto p-8 mt-8 text-center">
        <h1 className="text-3xl font-bold mb-4 text-green-600">
          Order Confirmed!
        </h1>
        <p>Thank you for your purchase. Redirecting home...</p>
      </div>
    );
  }

  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.product?.price || 0) * item.quantity,
    0,
  );
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      <div className="grid grid-cols-2 gap-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-xl font-bold">Shipping Address</h2>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              required
              className="border rounded px-3 py-2"
            />
            <input
              type="text"
              name="zip"
              placeholder="ZIP Code"
              value={formData.zip}
              onChange={handleChange}
              required
              className="border rounded px-3 py-2"
            />
          </div>

          <h2 className="text-xl font-bold mt-6">Payment Information</h2>
          <input
            type="text"
            name="cardNumber"
            placeholder="Card Number"
            value={formData.cardNumber}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              name="expiry"
              placeholder="MM/YY"
              value={formData.expiry}
              onChange={handleChange}
              required
              className="border rounded px-3 py-2"
            />
            <input
              type="text"
              name="cvc"
              placeholder="CVC"
              value={formData.cvc}
              onChange={handleChange}
              required
              className="border rounded px-3 py-2"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 mt-4"
          >
            Place Order
          </button>
        </form>

        <div>
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          <div className="border rounded p-4 space-y-2 mb-4">
            {cartItems.map((item) => (
              <div key={item._id} className="flex justify-between">
                <span>
                  {item.product?.name} x {item.quantity}
                </span>
                <span>
                  ${((item.product?.price || 0) * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className="bg-gray-100 p-4 rounded space-y-2">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax (10%):</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg border-t pt-2">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
