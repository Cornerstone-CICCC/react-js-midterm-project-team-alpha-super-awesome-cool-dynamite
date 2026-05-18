import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
      <Link to="/" className="text-purple-700 font-bold text-xl">Glitch Marketplace</Link>
      <div className="flex items-center gap-4">
        <Link to="/products" className="text-gray-700 hover:text-purple-700 transition">Products</Link>
        {user ? (
          <>
            <Link to="/cart" className="text-gray-700 hover:text-purple-700 transition">Cart</Link>
            {user.role === 'admin' && (
              <Link to="/admin" className="text-gray-700 hover:text-purple-700 transition">Admin</Link>
            )}
            <span className="text-sm text-gray-500">{user.name || user.email}</span>
            <button
              onClick={handleLogout}
              className="text-sm text-red-500 hover:text-red-700 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-gray-700 hover:text-purple-700 transition">Login</Link>
            <Link
              to="/signup"
              className="bg-purple-700 text-white px-3 py-1 rounded hover:bg-purple-800 transition text-sm"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
