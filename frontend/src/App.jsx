import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import { PlanProvider } from './context/PlanContext.jsx';
import { TransactionProvider } from './context/TransactionContext.jsx';
import { ThemeProvider } from './context/ThemeContext';
import { UserProvider } from './context/UserContext';
import ProtectedRoute from './components/ProtectedRoute';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Recharge from './pages/Recharge';
import Plans from './pages/Plans';
import Profile from './pages/Profile';
import Transactions from './pages/Transactions';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <AuthProvider>
      <PlanProvider>
        <TransactionProvider>
          <ThemeProvider>
            <UserProvider>
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Landing />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                  <Route path="/admin-dashboard" element={<ProtectedRoute requiredRole="Admin"><AdminDashboard /></ProtectedRoute>} />
                  <Route path="/recharge" element={<ProtectedRoute><Recharge /></ProtectedRoute>} />
                  <Route path="/plans" element={<Plans />} />
                  <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                  <Route path="/transactions" element={<ProtectedRoute><Transactions /></ProtectedRoute>} />
                </Routes>
              </BrowserRouter>
            </UserProvider>
          </ThemeProvider>
        </TransactionProvider>
      </PlanProvider>
    </AuthProvider>
  );
}

export default App;
