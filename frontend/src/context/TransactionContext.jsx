import { createContext, useContext, useState, useEffect } from 'react';

const TransactionContext = createContext();

export const useTransactions = () => {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error('useTransactions must be used within a TransactionProvider');
  }
  return context;
};

export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const savedTransactions = localStorage.getItem('transactions');
    if (savedTransactions) {
      setTransactions(JSON.parse(savedTransactions));
    }
  }, []);

  const addTransaction = (transaction) => {
    const newTransaction = {
      ...transaction,
      id: Date.now(),
      date: new Date().toISOString(),
      status: 'Success'
    };
    const updatedTransactions = [...transactions, newTransaction];
    setTransactions(updatedTransactions);
    localStorage.setItem('transactions', JSON.stringify(updatedTransactions));
  };

  const value = {
    transactions,
    addTransaction
  };

  return (
    <TransactionContext.Provider value={value}>
      {children}
    </TransactionContext.Provider>
  );
};