import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import Snowfall from '../components/Snowfall';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Use backend authentication for all users including admin
      const response = await axios.post('/api/auth/login', formData);
      const { user, token } = response.data;
      
      // Store token appropriately
      if (user.role === 'Admin') {
        localStorage.setItem('adminToken', token);
      }
      localStorage.setItem('token', token);
      
      login(user, token);
      navigate(user.role === 'Admin' ? '/admin-dashboard' : '/dashboard');
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      alert(error.response?.data?.message || 'Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center px-4 relative">
      <Snowfall />
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 w-full max-w-md border border-gray-100 relative z-10 my-20">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 text-center">Welcome Back</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-amber-500 outline-none transition-all duration-200"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-amber-500 outline-none transition-all duration-200"
              required
            />
          </div>
          <button type="submit" className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white py-3 rounded-lg font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
            Login
          </button>
        </form>
        <p className="text-center text-gray-600 dark:text-gray-400 mt-6">
          Don't have an account? <Link to="/signup" className="text-amber-600 dark:text-amber-400 font-semibold hover:underline">Sign Up</Link>
        </p>
        <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900 rounded-lg border border-blue-200 dark:border-blue-700">
          <p className="text-sm text-blue-700 dark:text-blue-300 text-center">
            <strong>Admin Login:</strong> admin@admin.com / admin123
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
