import { useState, useEffect } from 'react';
import axios from 'axios';

const AdminStats = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalTransactions: 0,
    totalRevenue: 0,
    totalPlans: 0
  });
  const [transactions, setTransactions] = useState([]);
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    try {
      const adminToken = localStorage.getItem('adminToken') || localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${adminToken}` };
      
      const [statsRes, transactionsRes, plansRes] = await Promise.all([
        axios.get('/api/admin/stats', { headers }),
        axios.get('/api/admin/transactions', { headers }),
        axios.get('/api/plans')
      ]);
      
      setStats(statsRes.data);
      setTransactions(transactionsRes.data);
      setPlans(plansRes.data);
    } catch (error) {
      console.error('Error fetching admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  const statsCards = [
    { title: 'Total Users', value: stats.totalUsers, color: 'bg-gradient-to-br from-purple-500 to-purple-600' },
    { title: 'Total Transactions', value: stats.totalTransactions, color: 'bg-gradient-to-br from-indigo-500 to-indigo-600' },
    { title: 'Total Revenue', value: `₹${stats.totalRevenue}`, color: 'bg-gradient-to-br from-green-500 to-green-600' },
    { title: 'Active Plans', value: stats.totalPlans, color: 'bg-gradient-to-br from-slate-500 to-slate-600' }
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-600 dark:text-gray-400">Loading admin statistics...</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Dashboard Statistics</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statsCards.map((stat, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 p-6 hover:shadow-2xl transition-all duration-300">
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Recent Transactions</h3>
          {transactions.slice(0, 5).map((transaction) => (
            <div key={transaction._id} className="flex justify-between items-center py-2 border-b dark:border-gray-600">
              <div>
                <p className="text-gray-800 dark:text-white font-semibold">{transaction.userId?.name || 'Unknown'}</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">₹{transaction.amount} - {transaction.mobile}</p>
              </div>
              <span className="text-green-600 text-sm">{transaction.status}</span>
            </div>
          ))}
          {transactions.length === 0 && (
            <p className="text-gray-500 dark:text-gray-400 text-center py-4">No transactions yet</p>
          )}
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Plan Distribution</h3>
          {['Airtel', 'Jio', 'Vi', 'BSNL'].map((operator) => {
            const count = plans.filter(p => p.operator === operator).length;
            return (
              <div key={operator} className="flex justify-between items-center py-2">
                <span className="text-gray-800 dark:text-white">{operator}</span>
                <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm font-medium">{count} plans</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AdminStats;