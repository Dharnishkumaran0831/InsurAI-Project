import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect, ReactNode } from 'react';

import Login from './pages/Login';
import HRDashboard from './pages/HRDashboard';
import EmployeeDashboard from './pages/EmployeeDashboard';
import PolicyUpload from './pages/PolicyUpload';
import ComplianceChecker from './pages/ComplianceChecker';
import PolicyRecommendation from './pages/PolicyRecommendation';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import HRManagerDashboard from './pages/HRManagerDashboard';
import EmployeesPage from './pages/EmployeesPage';
import { Toaster } from 'sonner';
import { ProfileProvider } from './context/ProfileContext';
import { ThemeProvider } from './context/ThemeContext';

export default function App() {
  const [userRole, setUserRole] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string>('');

  // Restore session from localStorage on mount
  useEffect(() => {
    const role = localStorage.getItem('role');
    const email = localStorage.getItem('email');
    if (role && email) {
      setUserRole(role);
      setUserEmail(email);
    }
  }, []);

  const handleLogin = (role: string, email: string) => {
    setUserRole(role);
    setUserEmail(email);
    localStorage.setItem('role', role);
    localStorage.setItem('email', email);
  };

  // Extract display name from email
  const userName = userEmail
    ? userEmail.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
    : '';

  // Protected Route Component
  const ProtectedRoute = ({
    children,
    allowedRoles,
  }: {
    children: ReactNode;
    allowedRoles: string[];
  }) => {
    if (!userRole) {
      return <Navigate to="/" replace />;
    }
    if (!allowedRoles.includes(userRole)) {
      // Redirect to proper dashboard based on role
      if (userRole === 'HR') return <Navigate to="/hr" replace />;
      if (userRole === 'EMPLOYEE') return <Navigate to="/employee" replace />;
      return <Navigate to="/" replace />;
    }
    return <>{children}</>;
  };

  return (
    <>
      <ThemeProvider>
        <ProfileProvider>
          <Router>
            <Routes>
              {/* Public Route */}
              <Route path="/" element={<Login onLogin={handleLogin} />} />

              {/* HR Routes */}
              <Route
                path="/hr"
                element={
                  <ProtectedRoute allowedRoles={['HR']}>
                    <HRDashboard userName={userName} userEmail={userEmail} />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/hr-manager"
                element={
                  <ProtectedRoute allowedRoles={['HR']}>
                    <HRManagerDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/policy-upload"
                element={
                  <ProtectedRoute allowedRoles={['HR']}>
                    <PolicyUpload userName={userName} userEmail={userEmail} />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/reports"
                element={
                  <ProtectedRoute allowedRoles={['HR']}>
                    <Reports userName={userName} userEmail={userEmail} />
                  </ProtectedRoute>
                }
              />
              {/* HR manages employees */}
              <Route
                path="/employees"
                element={
                  <ProtectedRoute allowedRoles={['HR']}>
                    <EmployeesPage />
                  </ProtectedRoute>
                }
              />

              {/* Shared Routes - HR + EMPLOYEE */}
              <Route
                path="/compliance-checker"
                element={
                  <ProtectedRoute allowedRoles={['HR', 'EMPLOYEE', 'USER']}>
                    <ComplianceChecker userName={userName} userEmail={userEmail} />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/settings"
                element={
                  <ProtectedRoute allowedRoles={['HR', 'EMPLOYEE', 'USER']}>
                    <Settings userName={userName} userEmail={userEmail} />
                  </ProtectedRoute>
                }
              />

              {/* Employee Routes */}
              <Route
                path="/employee"
                element={
                  <ProtectedRoute allowedRoles={['EMPLOYEE', 'USER']}>
                    <EmployeeDashboard userName={userName} userEmail={userEmail} />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/policy-recommendation"
                element={
                  <ProtectedRoute allowedRoles={['EMPLOYEE', 'HR', 'USER']}>
                    <PolicyRecommendation />
                  </ProtectedRoute>
                }
              />

              {/* Catch-all */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Router>
        </ProfileProvider>
      </ThemeProvider>
      <Toaster position="top-right" richColors />
    </>
  );
}