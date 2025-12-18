import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Snowfall from '../components/Snowfall';

const Recharge = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    mobile: user?.mobile || '',
    simType: user?.simType || '',
    paymentType: 'UPI',
    amount: location.state?.selectedPlan?.price || ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const transactionData = {
        planId: location.state?.selectedPlan?._id,
        mobile: formData.mobile,
        simType: formData.simType,
        paymentType: formData.paymentType,
        amount: formData.amount,
        planName: location.state?.selectedPlan?.planName || 'Custom Recharge'
      };

      const token = localStorage.getItem('token');
      await axios.post('/api/transactions', transactionData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert('Recharge Successful! Your mobile has been recharged.');
      navigate('/transactions');
    } catch (error) {
      alert('Recharge failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 dark:bg-gray-900 relative flex flex-col">
      <Snowfall />
      <Navbar />
      <div className="container mx-auto px-4 py-8 relative z-10 flex-1 mt-16 mb-20">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">Mobile Recharge</h2>
        
        <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">Mobile Number</label>
              <input
                type="tel"
                value={formData.mobile}
                onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-amber-500 outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">SIM Type</label>
              <select
                value={formData.simType}
                onChange={(e) => setFormData({ ...formData, simType: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-amber-500 outline-none"
                required
              >
                <option value="">Select SIM Type</option>
                <option value="Airtel">Airtel</option>
                <option value="Jio">Jio</option>
                <option value="Vi">Vi</option>
                <option value="BSNL">BSNL</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">Amount</label>
              <input
                type="number"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-amber-500 outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">Payment Type</label>
              <select
                value={formData.paymentType}
                onChange={(e) => setFormData({ ...formData, paymentType: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-amber-500 outline-none"
                required
              >
                <option value="UPI">UPI</option>
                <option value="Credit Card">Credit Card</option>
                <option value="Debit Card">Debit Card</option>
                <option value="Net Banking">Net Banking</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white py-3 rounded-lg font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50"
            >
              {loading ? 'Processing...' : 'Recharge Now'}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Recharge;