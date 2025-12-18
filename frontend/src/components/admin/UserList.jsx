import { useState, useEffect } from 'react';
import axios from 'axios';
import UserTransactions from './UserTransactions';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const adminToken = localStorage.getItem('adminToken') || localStorage.getItem('token');
      const response = await axios.get('/api/admin/users', {
        headers: { Authorization: `Bearer ${adminToken}` }
      });
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error.response?.data || error.message);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleBlockUser = async (userId) => {
    try {
      const adminToken = localStorage.getItem('adminToken') || localStorage.getItem('token');
      await axios.patch(`/api/admin/users/${userId}/block`, {}, {
        headers: { Authorization: `Bearer ${adminToken}` }
      });
      // Update local state
      const updatedUsers = users.map(user => 
        (user._id || user.id) === userId ? { ...user, blocked: !user.blocked } : user
      );
      setUsers(updatedUsers);
    } catch (error) {
      console.error('Error updating user status:', error);
      alert('Failed to update user status');
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 p-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Active Users & Transactions</h2>
      
      {loading ? (
        <p className="text-gray-600 dark:text-gray-400">Loading users...</p>
      ) : users.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600 dark:text-gray-400 mb-2">No users found in database.</p>
          <p className="text-sm text-gray-500 dark:text-gray-500">Users will appear here once they sign up.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-slate-100 dark:bg-gray-700">
                <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-300">Name</th>
                <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-300">Email</th>
                <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-300">Mobile</th>
                <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-300">SIM Type</th>
                <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <>
                  <tr key={user._id || user.id} className="border-b dark:border-gray-600">
                    <td className="px-4 py-2 text-gray-800 dark:text-white">{user.name}</td>
                    <td className="px-4 py-2 text-gray-800 dark:text-white">{user.email}</td>
                    <td className="px-4 py-2 text-gray-800 dark:text-white">{user.mobile}</td>
                    <td className="px-4 py-2 text-gray-800 dark:text-white">{user.simType}</td>
                    <td className="px-4 py-2 space-x-2">
                      <button
                        onClick={() => setSelectedUser(selectedUser === user._id ? null : user._id)}
                        className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded text-sm transition"
                      >
                        {selectedUser === user._id ? 'Hide' : 'View'} Transactions
                      </button>
                      <button
                        onClick={() => handleBlockUser(user._id)}
                        className={`px-3 py-1 rounded text-sm transition ${
                          user.blocked 
                            ? 'bg-green-500 hover:bg-green-600 text-white' 
                            : 'bg-red-500 hover:bg-red-600 text-white'
                        }`}
                      >
                        {user.blocked ? 'Unblock' : 'Block'}
                      </button>
                    </td>
                  </tr>
                  {selectedUser === user._id && (
                    <tr>
                      <td colSpan="5">
                        <UserTransactions userId={user._id} userName={user.name} />
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserList;