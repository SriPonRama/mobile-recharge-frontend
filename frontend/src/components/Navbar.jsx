import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { isDark, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleNavClick = (path) => {
    if (!isAuthenticated && path !== '/plans') {
      alert('Please login to access this page');
      navigate('/login');
      return;
    }
    navigate(path);
  };

  return (
    <nav className="bg-gradient-to-r from-amber-600 to-orange-600 shadow-xl">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/dashboard" className="flex items-center space-x-2">
          <h1 className="text-2xl font-bold text-white">RechargeHub</h1>
        </Link>
        <div className="flex items-center gap-6">
          {isAuthenticated && (
            <>
              <button onClick={() => handleNavClick('/dashboard')} className="text-white hover:text-gray-200 font-medium hidden sm:block">Dashboard</button>
              <button onClick={() => handleNavClick('/recharge')} className="text-white hover:text-gray-200 font-medium hidden sm:block">Recharge</button>
            </>
          )}
          <Link to="/plans" className="text-white hover:text-gray-200 font-medium hidden sm:block">Plans</Link>
          {isAuthenticated && (
            <>
              <button onClick={() => handleNavClick('/transactions')} className="text-white hover:text-gray-200 font-medium hidden sm:block">History</button>
              <button onClick={() => handleNavClick('/profile')} className="text-white hover:text-gray-200 font-medium hidden sm:block">Profile</button>
            </>
          )}
          <button onClick={toggleTheme} className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg font-medium transition-all duration-200">
            {isDark ? 'Light' : 'Dark'}
          </button>
          {isAuthenticated ? (
            <button onClick={handleLogout} className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg font-medium transition-all duration-200">
              Logout
            </button>
          ) : (
            <Link to="/login" className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg font-medium transition-all duration-200">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
