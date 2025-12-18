import { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const savedTransactions = localStorage.getItem('transactions');
    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedTransactions) setTransactions(JSON.parse(savedTransactions));
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const updateUser = (data) => {
    const updated = { ...user, ...data };
    setUser(updated);
    localStorage.setItem('user', JSON.stringify(updated));
  };

  const addTransaction = (transaction) => {
    const newTransaction = { ...transaction, id: Date.now(), date: new Date().toLocaleString() };
    const updated = [newTransaction, ...transactions];
    setTransactions(updated);
    localStorage.setItem('transactions', JSON.stringify(updated));
  };

  return (
    <UserContext.Provider value={{ user, login, logout, updateUser, transactions, addTransaction }}>
      {children}
    </UserContext.Provider>
  );
};
