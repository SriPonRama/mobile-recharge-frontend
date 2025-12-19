import { useState } from 'react';
import UserList from './UserList';
import ManagePlans from './ManagePlans';
import AllTransactions from './AllTransactions';
import AdminNavbar from './AdminNavbar';
import Footer from '../Footer';
import Snowfall from '../Snowfall';
import { useAuth } from '../../context/AuthContext';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('users');

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-slate-100 dark:bg-gray-900 relative flex flex-col">
      <Snowfall />
      <AdminNavbar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="container mx-auto px-4 pt-20 pb-8 relative z-10 flex-1 mt-4 mb-20">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
            Welcome, {user?.name || 'Admin'}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage users, plans and transactions
          </p>
        </div>
        
        {activeTab === 'users' && <UserList />}
        {activeTab === 'plans' && <ManagePlans />}
        {activeTab === 'transactions' && <AllTransactions />}
      </div>
      <Footer />
    </div>
  );
};

export default AdminDashboard;