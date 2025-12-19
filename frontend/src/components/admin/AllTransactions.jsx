import { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../../config';

const AllTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const adminToken = localStorage.getItem('adminToken') || localStorage.getItem('token');
      const response = await axios.get(`${config.API_URL}/admin/transactions`, {
        headers: { Authorization: `Bearer ${adminToken}` }
      });
      setTransactions(response.data);
    } catch (error) {
      console.error('Error fetching transactions:', error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  const downloadTransactions = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Date,Time,User,Mobile,SIM Type,Plan,Amount,Payment Type,Status,Transaction ID\n"
      + transactions.map(t => 
          `${new Date(t.createdAt).toLocaleDateString()},${new Date(t.createdAt).toLocaleTimeString()},${t.userId?.name || 'Unknown'},${t.mobile},${t.simType},${t.planName},₹${t.amount},${t.paymentType},${t.status},${t.transactionId}`
        ).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "all_transactions.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const printTransactions = () => {
    const printContent = `
      <h2>All Transactions History</h2>
      <table border="1" style="width:100%; border-collapse: collapse;">
        <tr>
          <th>Date</th>
          <th>Time</th>
          <th>User</th>
          <th>Mobile</th>
          <th>SIM Type</th>
          <th>Plan</th>
          <th>Amount</th>
          <th>Payment Type</th>
          <th>Status</th>
          <th>Transaction ID</th>
        </tr>
        ${transactions.map(t => `
          <tr>
            <td>${new Date(t.createdAt).toLocaleDateString()}</td>
            <td>${new Date(t.createdAt).toLocaleTimeString()}</td>
            <td>${t.userId?.name || 'Unknown'}</td>
            <td>${t.mobile}</td>
            <td>${t.simType}</td>
            <td>${t.planName}</td>
            <td>₹${t.amount}</td>
            <td>${t.paymentType}</td>
            <td>${t.status}</td>
            <td>${t.transactionId}</td>
          </tr>
        `).join('')}
      </table>
    `;
    
    const printWindow = window.open('', '_blank');
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">All Transactions</h2>
        <div className="space-x-4">
          <button
            onClick={downloadTransactions}
            className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition"
          >
            Download CSV
          </button>
          <button
            onClick={printTransactions}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition"
          >
            Print
          </button>
        </div>
      </div>

      {loading ? (
        <p className="text-gray-600 dark:text-gray-400">Loading transactions...</p>
      ) : transactions.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600 dark:text-gray-400 mb-2">No transactions found in database.</p>
          <p className="text-sm text-gray-500 dark:text-gray-500">Transactions will appear here once users make recharges.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-slate-100 dark:bg-gray-700">
                <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-300">Date & Time</th>
                <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-300">User</th>
                <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-300">Mobile</th>
                <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-300">SIM Type</th>
                <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-300">Plan</th>
                <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-300">Amount</th>
                <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-300">Payment</th>
                <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-300">Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction._id} className="border-b dark:border-gray-600">
                  <td className="px-4 py-2 text-gray-800 dark:text-white">
                    {new Date(transaction.createdAt).toLocaleDateString()}<br/>
                    <span className="text-sm text-gray-500">{new Date(transaction.createdAt).toLocaleTimeString()}</span>
                  </td>
                  <td className="px-4 py-2 text-gray-800 dark:text-white">{transaction.userId?.name || 'Unknown'}</td>
                  <td className="px-4 py-2 text-gray-800 dark:text-white">{transaction.mobile}</td>
                  <td className="px-4 py-2 text-gray-800 dark:text-white">{transaction.simType}</td>
                  <td className="px-4 py-2 text-gray-800 dark:text-white">{transaction.planName}</td>
                  <td className="px-4 py-2 text-gray-800 dark:text-white font-semibold">₹{transaction.amount}</td>
                  <td className="px-4 py-2 text-gray-800 dark:text-white">{transaction.paymentType}</td>
                  <td className="px-4 py-2">
                    <span className={`px-2 py-1 rounded text-sm ${
                      transaction.status === 'Success' ? 'bg-green-100 text-green-800' : 
                      transaction.status === 'Failed' ? 'bg-red-100 text-red-800' : 
                      'bg-yellow-100 text-yellow-800'
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

export default AllTransactions;