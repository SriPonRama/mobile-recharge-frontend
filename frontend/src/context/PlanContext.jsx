import { createContext, useContext, useState, useEffect } from 'react';

const PlanContext = createContext();

export const usePlans = () => {
  const context = useContext(PlanContext);
  if (!context) {
    throw new Error('usePlans must be used within a PlanProvider');
  }
  return context;
};

export const PlanProvider = ({ children }) => {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    const savedPlans = localStorage.getItem('adminPlans');
    if (savedPlans) {
      setPlans(JSON.parse(savedPlans));
    }
  }, []);

  const addPlan = (plan) => {
    const newPlan = { ...plan, id: Date.now() };
    const updatedPlans = [...plans, newPlan];
    setPlans(updatedPlans);
    localStorage.setItem('adminPlans', JSON.stringify(updatedPlans));
  };

  const updatePlan = (id, updatedPlan) => {
    const updatedPlans = plans.map(plan => 
      plan.id === id ? { ...plan, ...updatedPlan } : plan
    );
    setPlans(updatedPlans);
    localStorage.setItem('adminPlans', JSON.stringify(updatedPlans));
  };

  const deletePlan = (id) => {
    const updatedPlans = plans.filter(plan => plan.id !== id);
    setPlans(updatedPlans);
    localStorage.setItem('adminPlans', JSON.stringify(updatedPlans));
  };

  const value = {
    plans,
    addPlan,
    updatePlan,
    deletePlan
  };

  return (
    <PlanContext.Provider value={value}>
      {children}
    </PlanContext.Provider>
  );
};