import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Snowfall from '../components/Snowfall';

const schema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  mobile: yup.string().matches(/^[0-9]{10}$/, 'Mobile number must be exactly 10 digits').required('Mobile number is required'),
  simType: yup.string().oneOf(['Airtel', 'Jio', 'Vi', 'BSNL'], 'Please select a valid SIM type').required('SIM type is required')
});

const Profile = () => {
  const { user, login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      mobile: user?.mobile || '',
      simType: user?.simType || ''
    }
  });

  useEffect(() => {
    if (user) {
      reset({
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        simType: user.simType
      });
    }
  }, [user, reset]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put('/api/users/profile', data, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      const updatedUser = { ...user, ...response.data.user };
      login(updatedUser, token);
      setEditing(false);
      alert('Profile updated successfully!');
    } catch (error) {
      alert(error.response?.data?.message || 'Update failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 dark:bg-gray-900 relative flex flex-col">
      <Snowfall />
      <Navbar />
      <div className="container mx-auto px-4 py-8 relative z-10 flex-1 mt-16 mb-20">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">My Profile</h2>
        
        <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Profile Information</h3>
            <button
              onClick={() => setEditing(!editing)}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg font-medium transition"
            >
              {editing ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">Name</label>
              <input
                {...register('name')}
                disabled={!editing}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-amber-500 outline-none transition-all duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
            </div>

            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">Email</label>
              <input
                type="email"
                {...register('email')}
                disabled={!editing}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-amber-500 outline-none transition-all duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">Mobile Number</label>
              <input
                type="tel"
                {...register('mobile')}
                disabled={!editing}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-amber-500 outline-none transition-all duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
              {errors.mobile && <p className="text-red-500 text-sm mt-1">{errors.mobile.message}</p>}
            </div>

            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">SIM Type</label>
              <select
                {...register('simType')}
                disabled={!editing}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-amber-500 outline-none transition-all duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed"
              >
                <option value="">Select SIM Type</option>
                <option value="Airtel">Airtel</option>
                <option value="Jio">Jio</option>
                <option value="Vi">Vi</option>
                <option value="BSNL">BSNL</option>
              </select>
              {errors.simType && <p className="text-red-500 text-sm mt-1">{errors.simType.message}</p>}
            </div>

            {editing && (
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white py-3 rounded-lg font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50"
              >
                {loading ? 'Updating...' : 'Update Profile'}
              </button>
            )}
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;