import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser && savedUser !== 'undefined') {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('user');
      }
    }
  }, []);

  const login = (userData, token = null) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(userData));
    if (token) {
      localStorage.setItem('token', token);
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  const signup = (userData) => {
    try {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const newUser = { ...userData, id: Date.now() };
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      login(newUser);
    } catch (error) {
      console.error('Error parsing users data:', error);
      localStorage.removeItem('users');
      const newUser = { ...userData, id: Date.now() };
      localStorage.setItem('users', JSON.stringify([newUser]));
      login(newUser);
    }
  };

  const value = {
    user,
    isAuthenticated,
    login,
    logout,
    signup
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};