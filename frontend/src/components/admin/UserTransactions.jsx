import { useState, useEffect } from 'react';
import axios from 'axios';

const UserTransactions = ({ userId, userName }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      fetchUserTransactions();
    }
  }, [userId]);

  const fetchUserTransactions = async () => {
    try {
      const adminToken = localStorage.getItem('adminToken') || localStorage.getItem('token');
      const response = await axios.get(`/api/transactions/user/${userId}`, {
        headers: { Authorization: `Bearer ${adminToken}` }
      });
      setTransactions(response.data);
    } catch (error) {
      console.error('Error fetching user transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
      <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
        {userName}'s Transactions
      </h4>
      
      {loading ? (
        <p className="text-gray-600 dark:text-gray-400">Loading transactions...</p>
      ) : transactions.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400">No transactions found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-600">
                <th className="px-3 py-2 text-left">Date</th>
                <th className="px-3 py-2 text-left">Plan</th>
                <th className="px-3 py-2 text-left">Amount</th>
                <th className="px-3 py-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction._id} className="border-b dark:border-gray-600">
                  <td className="px-3 py-2 text-gray-800 dark:text-white">
                    {new Date(transaction.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-3 py-2 text-gray-800 dark:text-white">
                    {transaction.planName}
                  </td>
                  <td className="px-3 py-2 text-gray-800 dark:text-white">
                    ₹{transaction.amount}
                  </td>
                  <td className="px-3 py-2">
                    <span className={`px-2 py-1 rounded text-xs ${
                      transaction.status === 'Success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {transaction.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserTransactions;