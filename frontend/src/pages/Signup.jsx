import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import Snowfall from '../components/Snowfall';
import config from '../config';

const schema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(8, 'Password must be at least 8 characters').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, 'Password must contain uppercase, lowercase, number and special character').required('Password is required'),
  mobile: yup.string().matches(/^[0-9]{10}$/, 'Mobile number must be exactly 10 digits').required('Mobile number is required'),
  simType: yup.string().oneOf(['Airtel', 'Jio', 'Vi', 'BSNL'], 'Please select a valid SIM type').required('SIM type is required')
});

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post(`${config.API_URL}/auth/signup`, data);
      const { user, token } = response.data;
      login(user, token);
      navigate('/dashboard');
    } catch (error) {
      alert(error.response?.data?.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center px-4 relative">
      <Snowfall />
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 w-full max-w-md border border-gray-100 relative z-10 my-20">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 text-center">Create Account</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">Name</label>
            <input
              {...register('name')}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-amber-500 outline-none transition-all duration-200"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">Email</label>
            <input
              type="email"
              {...register('email')}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-amber-500 outline-none transition-all duration-200"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">Password</label>
            <input
              type="password"
              {...register('password')}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-amber-500 outline-none transition-all duration-200"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">Mobile Number</label>
            <input
              type="tel"
              {...register('mobile')}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-amber-500 outline-none transition-all duration-200"
            />
            {errors.mobile && <p className="text-red-500 text-sm mt-1">{errors.mobile.message}</p>}
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">SIM Type</label>
            <select
              {...register('simType')}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-amber-500 outline-none transition-all duration-200"
            >
              <option value="">Select SIM Type</option>
              <option value="Airtel">Airtel</option>
              <option value="Jio">Jio</option>
              <option value="Vi">Vi</option>
              <option value="BSNL">BSNL</option>
            </select>
            {errors.simType && <p className="text-red-500 text-sm mt-1">{errors.simType.message}</p>}
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white py-3 rounded-lg font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50"
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>
        <p className="text-center text-gray-600 dark:text-gray-400 mt-6">
          Already have an account? <Link to="/login" className="text-amber-600 dark:text-amber-400 font-semibold hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;