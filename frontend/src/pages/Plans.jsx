import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Snowfall from '../components/Snowfall';
import config from '../config';

const Plans = () => {
  const [selectedOperator, setSelectedOperator] = useState('Airtel');
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const response = await axios.get(`${config.API_URL}/plans`);
      setPlans(response.data);
    } catch (error) {
      console.error('Error fetching plans:', error);
      setPlans([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredPlans = plans.filter(plan => plan.operator === selectedOperator);

  const handleSelectPlan = (plan) => {
    if (!isAuthenticated) {
      alert('Please login to recharge');
      navigate('/login');
      return;
    }
    navigate('/recharge', { state: { selectedPlan: plan, operator: selectedOperator } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 dark:bg-gray-900 relative flex flex-col">
      <Snowfall />
      <Navbar />
      <div className="container mx-auto px-4 py-8 relative z-10 flex-1 mt-16 mb-20">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">Browse All Plans</h2>
        
        <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
          {['Airtel', 'Jio', 'Vi', 'BSNL'].map(op => (
            <button
              key={op}
              onClick={() => setSelectedOperator(op)}
              className={`px-6 py-3 rounded font-semibold whitespace-nowrap transition ${
                selectedOperator === op
                  ? 'bg-amber-500 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-amber-100 hover:text-amber-800 dark:hover:bg-gray-700'
              }`}
            >
              {op}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-8">
            <p className="text-gray-600 dark:text-gray-400">Loading plans...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredPlans.map((plan) => (
              <div key={plan._id} className="bg-white dark:bg-gray-800 rounded shadow-lg p-6 hover:shadow-2xl transform hover:scale-105 transition">
                <div className="text-center mb-4">
                  <h4 className="text-3xl font-bold text-amber-600 dark:text-amber-400">₹{plan.price}</h4>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">{plan.validity} days</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{plan.planName}</p>
                </div>
                <div className="space-y-2 mb-6">
                  <p className="text-gray-700 dark:text-gray-300 font-semibold">{plan.data}</p>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    {plan.benefits && plan.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
                <button
                  onClick={() => handleSelectPlan(plan)}
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white py-2 rounded-lg font-semibold transition-all duration-200"
                >
                  Recharge Now
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Plans;