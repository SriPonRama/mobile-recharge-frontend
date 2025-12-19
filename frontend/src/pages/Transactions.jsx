import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Snowfall from '../components/Snowfall';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/transactions/user', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTransactions(response.data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  const downloadTransactions = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Date,Time,Plan,Amount,Payment Type,Status,Transaction ID\n"
      + transactions.map(t => 
          `${new Date(t.createdAt).toLocaleDateString()},${new Date(t.createdAt).toLocaleTimeString()},${t.planName},₹${t.amount},${t.paymentType},${t.status},${t.transactionId}`
        ).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "transaction_history.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const printTransactions = () => {
    const printContent = `
      <h2>Transaction History - ${user?.name}</h2>
      <table border="1" style="width:100%; border-collapse: collapse;">
        <tr>
          <th>Date</th>
          <th>Time</th>
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
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 dark:bg-gray-900 relative flex flex-col">
      <Snowfall />
      <Navbar />
      <div className="container mx-auto px-4 py-8 relative z-10 flex-1 mt-16 mb-20">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Transaction History</h2>
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
          <p className="text-gray-600 dark:text-gray-400">No transactions found.</p>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Date & Time</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Plan</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Mobile</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Payment</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {transactions.map((transaction) => (
                    <tr key={transaction._id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {new Date(transaction.createdAt).toLocaleDateString()}<br/>
                        <span className="text-gray-500">{new Date(transaction.createdAt).toLocaleTimeString()}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {transaction.planName}<br/>
                        <span className="text-gray-500">{transaction.simType}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {transaction.mobile}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        ₹{transaction.amount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {transaction.paymentType}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
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
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Transactions;