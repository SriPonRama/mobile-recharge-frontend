import { useState } from 'react';
import { usePlans } from '../../context/PlanContext';

const AddPlanForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    operator: 'Airtel',
    price: '',
    validity: '',
    data: '',
    benefits: ''
  });
  const { addPlan } = usePlans();

  const handleSubmit = (e) => {
    e.preventDefault();
    const plan = {
      ...formData,
      price: Number(formData.price),
      validity: Number(formData.validity),
      benefits: formData.benefits.split(',').map(b => b.trim())
    };
    addPlan(plan);
    setFormData({ name: '', operator: 'Airtel', price: '', validity: '', data: '', benefits: '' });
    alert('Plan added successfully!');
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Add New Plan</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            <label className="block text-gray-700 dark:text-gray-300 mb-2">Operator</label>
            <select
              value={formData.operator}
              onChange={(e) => setFormData({...formData, operator: e.target.value})}
              className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="Airtel">Airtel</option>
              <option value="Jio">Jio</option>
              <option value="Vi">Vi</option>
              <option value="BSNL">BSNL</option>
            </select>
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
              placeholder="e.g., 2GB/day"
              className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-2">Benefits (comma separated)</label>
            <input
              type="text"
              value={formData.benefits}
              onChange={(e) => setFormData({...formData, benefits: e.target.value})}
              placeholder="Unlimited Calls, 100 SMS/day"
              className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>
        </div>
        
        <button
          type="submit"
          className="bg-[#F3E2D4] hover:bg-[#E6D1C1] text-gray-800 px-6 py-2 rounded font-semibold transition"
        >
          Add Plan
        </button>
      </form>
    </div>
  );
};

export default AddPlanForm;