import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy, useState, useEffect } from 'react';
import './styles/Dashboard.css';

// Lazy load components
const Login = lazy(() => import('./pages/login'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Projects = lazy(() => import('./pages/Projects'));
const HRM = lazy(() => import('./pages/HRM'));
const Sales = lazy(() => import('./pages/Sales'));
const Accounts = lazy(() => import('./pages/Accounts'));
const Recruitment = lazy(() => import('./pages/Recruitment'));
const Customers = lazy(() => import('./pages/Customers'));
const Contracts = lazy(() => import('./pages/Contracts'));
const Vendors = lazy(() => import('./pages/Vendors'));
const ProductsServices = lazy(() => import('./pages/ProductsServices'));
const Admin = lazy(() => import('./pages/Admin'));

// Loading component
function Loading() {
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      fontSize: '20px',
      color: '#00d97e'
    }}>
      <div className="loading-spinner"></div>
      <span style={{ marginLeft: '1rem' }}>Loading...</span>
    </div>
  );
}

// Protected Route Component
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated') === 'true';
    setIsAuthenticated(authStatus);
  }, []);

  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          
          {/* Projects Module */}
          <Route path="/projects" element={<ProtectedRoute><Projects /></ProtectedRoute>} />
          <Route path="/projects/tasks" element={<ProtectedRoute><Projects /></ProtectedRoute>} />
          <Route path="/projects/timesheets" element={<ProtectedRoute><Projects /></ProtectedRoute>} />
          <Route path="/projects/overview" element={<ProtectedRoute><Projects /></ProtectedRoute>} />
          
          {/* HRM Module */}
          <Route path="/hrm" element={<ProtectedRoute><HRM /></ProtectedRoute>} />
          <Route path="/hrm/attendance" element={<ProtectedRoute><HRM /></ProtectedRoute>} />
          <Route path="/hrm/payroll" element={<ProtectedRoute><HRM /></ProtectedRoute>} />
          <Route path="/hrm/payslips" element={<ProtectedRoute><HRM /></ProtectedRoute>} />
          <Route path="/hrm/documents" element={<ProtectedRoute><HRM /></ProtectedRoute>} />
          
          {/* Sales Module */}
          <Route path="/sales" element={<ProtectedRoute><Sales /></ProtectedRoute>} />
          <Route path="/sales/proposals" element={<ProtectedRoute><Sales /></ProtectedRoute>} />
          <Route path="/sales/invoices" element={<ProtectedRoute><Sales /></ProtectedRoute>} />
          <Route path="/sales/payments" element={<ProtectedRoute><Sales /></ProtectedRoute>} />
          <Route path="/sales/credit-notes" element={<ProtectedRoute><Sales /></ProtectedRoute>} />
          
          {/* Accounts Module */}
          <Route path="/accounts" element={<ProtectedRoute><Accounts /></ProtectedRoute>} />
          <Route path="/accounts/income" element={<ProtectedRoute><Accounts /></ProtectedRoute>} />
          <Route path="/accounts/expenses" element={<ProtectedRoute><Accounts /></ProtectedRoute>} />
          <Route path="/accounts/bank-accounts" element={<ProtectedRoute><Accounts /></ProtectedRoute>} />
          <Route path="/accounts/ledger" element={<ProtectedRoute><Accounts /></ProtectedRoute>} />
          <Route path="/accounts/reports" element={<ProtectedRoute><Accounts /></ProtectedRoute>} />
          
          {/* Recruitment Module */}
          <Route path="/recruitment" element={<ProtectedRoute><Recruitment /></ProtectedRoute>} />
          <Route path="/recruitment/jobs" element={<ProtectedRoute><Recruitment /></ProtectedRoute>} />
          <Route path="/recruitment/interviews" element={<ProtectedRoute><Recruitment /></ProtectedRoute>} />
          <Route path="/recruitment/ai-matching" element={<ProtectedRoute><Recruitment /></ProtectedRoute>} />
          
          {/* Customers Module */}
          <Route path="/customers" element={<ProtectedRoute><Customers /></ProtectedRoute>} />
          <Route path="/customers/leads" element={<ProtectedRoute><Customers /></ProtectedRoute>} />
          <Route path="/customers/list" element={<ProtectedRoute><Customers /></ProtectedRoute>} />
          <Route path="/customers/communication" element={<ProtectedRoute><Customers /></ProtectedRoute>} />
          
          {/* Contracts Module */}
          <Route path="/contracts" element={<ProtectedRoute><Contracts /></ProtectedRoute>} />
          <Route path="/contracts/active" element={<ProtectedRoute><Contracts /></ProtectedRoute>} />
          <Route path="/contracts/renewals" element={<ProtectedRoute><Contracts /></ProtectedRoute>} />
          <Route path="/contracts/alerts" element={<ProtectedRoute><Contracts /></ProtectedRoute>} />
          
          {/* Vendors Module */}
          <Route path="/vendors" element={<ProtectedRoute><Vendors /></ProtectedRoute>} />
          <Route path="/vendors/list" element={<ProtectedRoute><Vendors /></ProtectedRoute>} />
          <Route path="/vendors/payments" element={<ProtectedRoute><Vendors /></ProtectedRoute>} />
          <Route path="/vendors/documents" element={<ProtectedRoute><Vendors /></ProtectedRoute>} />
          
          {/* Products & Services Module */}
          <Route path="/products" element={<ProtectedRoute><ProductsServices /></ProtectedRoute>} />
          <Route path="/products/list" element={<ProtectedRoute><ProductsServices /></ProtectedRoute>} />
          <Route path="/products/services" element={<ProtectedRoute><ProductsServices /></ProtectedRoute>} />
          <Route path="/products/pricing" element={<ProtectedRoute><ProductsServices /></ProtectedRoute>} />
          
          {/* Admin Setup Module */}
          <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
          <Route path="/admin/company" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
          <Route path="/admin/domain" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
          <Route path="/admin/permissions" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
          <Route path="/admin/support" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
          <Route path="/admin/media" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
