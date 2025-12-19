import { useState, useEffect } from 'react';
import axios from 'axios';

const ManagePlans = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);
  const [formData, setFormData] = useState({
    operator: '',
    planName: '',
    price: '',
    validity: '',
    data: '',
    benefits: '',
    category: 'Popular'
  });

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const response = await axios.get('/api/plans');
      setPlans(response.data);
    } catch (error) {
      console.error('Error fetching plans:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const adminToken = localStorage.getItem('adminToken') || localStorage.getItem('token');
    
    const planData = {
      ...formData,
      benefits: formData.benefits.split(',').map(b => b.trim())
    };

    try {
      if (editingPlan) {
        await axios.put(`/api/plans/${editingPlan._id}`, planData, {
          headers: { Authorization: `Bearer ${adminToken}` }
        });
      } else {
        await axios.post('/api/plans', planData, {
          headers: { Authorization: `Bearer ${adminToken}` }
        });
      }
      
      fetchPlans();
      resetForm();
      alert(editingPlan ? 'Plan updated successfully!' : 'Plan created successfully!');
    } catch (error) {
      alert('Error saving plan');
    }
  };

  const handleEdit = (plan) => {
    setEditingPlan(plan);
    setFormData({
      operator: plan.operator,
      planName: plan.planName,
      price: plan.price,
      validity: plan.validity,
      data: plan.data,
      benefits: plan.benefits.join(', '),
      category: plan.category
    });
    setShowForm(true);
  };

  const handleDelete = async (planId) => {
    if (window.confirm('Are you sure you want to delete this plan?')) {
      try {
        const adminToken = localStorage.getItem('adminToken') || localStorage.getItem('token');
        await axios.delete(`/api/plans/${planId}`, {
          headers: { Authorization: `Bearer ${adminToken}` }
        });
        fetchPlans();
        alert('Plan deleted successfully!');
      } catch (error) {
        alert('Error deleting plan');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      operator: '',
      planName: '',
      price: '',
      validity: '',
      data: '',
      benefits: '',
      category: 'Popular'
    });
    setEditingPlan(null);
    setShowForm(false);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Manage Plans</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition"
        >
          {showForm ? 'Cancel' : 'Add New Plan'}
        </button>
      </div>

      {showForm && (
        <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
            {editingPlan ? 'Edit Plan' : 'Add New Plan'}
          </h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Operator</label>
              <select
                value={formData.operator}
                onChange={(e) => setFormData({ ...formData, operator: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                required
              >
                <option value="">Select Operator</option>
                <option value="Airtel">Airtel</option>
                <option value="Jio">Jio</option>
                <option value="Vi">Vi</option>
                <option value="BSNL">BSNL</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Plan Name</label>
              <input
                type="text"
                value={formData.planName}
                onChange={(e) => setFormData({ ...formData, planName: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Price (₹)</label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Validity (days)</label>
              <input
                type="number"
                value={formData.validity}
                onChange={(e) => setFormData({ ...formData, validity: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Data</label>
              <input
                type="text"
                value={formData.data}
                onChange={(e) => setFormData({ ...formData, data: e.target.value })}
                placeholder="e.g., 1.5GB/day"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
              >
                <option value="Popular">Popular</option>
                <option value="Data">Data</option>
                <option value="Unlimited">Unlimited</option>
                <option value="Talktime">Talktime</option>
              </select>
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Benefits (comma separated)</label>
              <input
                type="text"
                value={formData.benefits}
                onChange={(e) => setFormData({ ...formData, benefits: e.target.value })}
                placeholder="e.g., Unlimited Calls, 100 SMS/day"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                required
              />
            </div>
            <div className="col-span-2 flex gap-2">
              <button
                type="submit"
                className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition"
              >
                {editingPlan ? 'Update Plan' : 'Create Plan'}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-medium transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <p className="text-gray-600 dark:text-gray-400">Loading plans...</p>
      ) : plans.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600 dark:text-gray-400 mb-2">No plans found in database.</p>
          <p className="text-sm text-gray-500 dark:text-gray-500">Create plans to display them to users.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-slate-100 dark:bg-gray-700">
                <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-300">Operator</th>
                <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-300">Plan Name</th>
                <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-300">Price</th>
                <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-300">Validity</th>
                <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-300">Data</th>
                <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {plans.map((plan) => (
                <tr key={plan._id} className="border-b dark:border-gray-600">
                  <td className="px-4 py-2 text-gray-800 dark:text-white">{plan.operator}</td>
                  <td className="px-4 py-2 text-gray-800 dark:text-white">{plan.planName}</td>
                  <td className="px-4 py-2 text-gray-800 dark:text-white">₹{plan.price}</td>
                  <td className="px-4 py-2 text-gray-800 dark:text-white">{plan.validity} days</td>
                  <td className="px-4 py-2 text-gray-800 dark:text-white">{plan.data}</td>
                  <td className="px-4 py-2 space-x-2">
                    <button
                      onClick={() => handleEdit(plan)}
                      className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded text-sm transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(plan._id)}
                      className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded text-sm transition"
                    >
                      Delete
                    </button>
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

export default ManagePlans;