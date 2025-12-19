import { useState } from 'react';
import { usePlans } from '../../context/PlanContext';

const PlanEditModal = ({ plan, onClose }) => {
  const [formData, setFormData] = useState({
    name: plan.name,
    operator: plan.operator,
    price: plan.price,
    validity: plan.validity,
    data: plan.data,
    benefits: plan.benefits.join(', ')
  });
  const { updatePlan } = usePlans();

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedPlan = {
      ...formData,
      price: Number(formData.price),
      validity: Number(formData.validity),
      benefits: formData.benefits.split(',').map(b => b.trim())
    };
    updatePlan(plan.id, updatedPlan);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Edit Plan</h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-2">Plan Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-2">Price (₹)</label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({...formData, price: e.target.value})}
              className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-2">Validity (days)</label>
            <input
              type="number"
              value={formData.validity}
              onChange={(e) => setFormData({...formData, validity: e.target.value})}
              className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-2">Data</label>
            <input
              type="text"
              value={formData.data}
              onChange={(e) => setFormData({...formData, data: e.target.value})}
              className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-2">Benefits</label>
            <input
              type="text"
              value={formData.benefits}
              onChange={(e) => setFormData({...formData, benefits: e.target.value})}
              className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>
          
          <div className="flex gap-4">
            <button
              type="submit"
              className="bg-[#F3E2D4] hover:bg-[#E6D1C1] text-gray-800 px-4 py-2 rounded font-semibold transition"
            >
              Update Plan
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded font-semibold transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PlanEditModal;