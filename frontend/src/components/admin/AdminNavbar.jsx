import { useAuth } from '../../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import AdminThemeToggle from './AdminThemeToggle';

const AdminNavbar = ({ activeTab, setActiveTab }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-gradient-to-r from-slate-800 to-slate-900 shadow-xl z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center flex-nowrap">
        <h1 className="text-2xl font-bold text-white">
          MobileHub Admin
        </h1>
        
        <div className="flex items-center space-x-6">
          <button
            onClick={() => setActiveTab('users')}
            className={`text-white hover:text-gray-200 font-medium ${
              activeTab === 'users' ? 'border-b-2 border-white' : ''
            }`}
          >
            Manage Users
          </button>
          <button
            onClick={() => setActiveTab('plans')}
            className={`text-white hover:text-gray-200 font-medium ${
              activeTab === 'plans' ? 'border-b-2 border-white' : ''
            }`}
          >
            Manage Plans
          </button>
          <button
            onClick={() => setActiveTab('transactions')}
            className={`text-white hover:text-gray-200 font-medium ${
              activeTab === 'transactions' ? 'border-b-2 border-white' : ''
            }`}
          >
            All Transactions
          </button>
          <AdminThemeToggle />
          <button
            onClick={handleLogout}
            className="px-3 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded font-medium transition"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;