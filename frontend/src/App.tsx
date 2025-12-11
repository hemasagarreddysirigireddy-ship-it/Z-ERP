import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { ToastProvider } from './components/Toast';
import { ThemeProvider } from './context/ThemeContext';
import Loading from './components/Loading';
import './styles/Dashboard.css';

// Lazy load components
const Login = lazy(() => import('./Pages/login'));
const Dashboard = lazy(() => import('./Pages/Dashboard'));
const Projects = lazy(() => import('./Pages/Projects'));
const HRM = lazy(() => import('./Pages/HRM'));
const Sales = lazy(() => import('./Pages/Sales'));
const Accounts = lazy(() => import('./Pages/Accounts'));
const Recruitment = lazy(() => import('./Pages/Recruitment'));
const Customers = lazy(() => import('./Pages/Customers'));
const Contracts = lazy(() => import('./Pages/Contracts'));
const Vendors = lazy(() => import('./Pages/Vendors'));
const ProductsServices = lazy(() => import('./Pages/ProductsServices'));
const Admin = lazy(() => import('./Pages/Admin'));

// Sales Module Components
const ProposalsList = lazy(() => import('./Pages/Sales/ProposalsList'));
const ProposalForm = lazy(() => import('./Pages/Sales/ProposalForm'));
const EstimatesList = lazy(() => import('./Pages/Sales/EstimatesList'));
const EstimateForm = lazy(() => import('./Pages/Sales/EstimateForm'));
const InvoicesList = lazy(() => import('./Pages/Sales/InvoicesList'));
const InvoiceForm = lazy(() => import('./Pages/Sales/InvoiceForm'));
const InvoiceView = lazy(() => import('./Pages/Sales/InvoiceView'));
const PaymentsList = lazy(() => import('./Pages/Sales/PaymentsList'));
const BatchPayments = lazy(() => import('./Pages/Sales/BatchPayments'));
const CreditNotesList = lazy(() => import('./Pages/Sales/CreditNotesList'));
const CreditNoteForm = lazy(() => import('./Pages/Sales/CreditNoteForm'));

// Protected Route Component
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
}

function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <Router>
          <Suspense fallback={<Loading message="Loading application..." />}>
            <Routes>
              <Route path="/login" element={<Login />} />
          <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          
          {/* Projects Module */}
          <Route path="/projects" element={<ProtectedRoute><Projects /></ProtectedRoute>} />
          
          {/* HRM Module */}
          <Route path="/hrm" element={<ProtectedRoute><HRM /></ProtectedRoute>} />
          
          {/* Sales Module */}
          <Route path="/sales" element={<ProtectedRoute><Sales /></ProtectedRoute>} />
          <Route path="/sales/proposals" element={<ProtectedRoute><ProposalsList /></ProtectedRoute>} />
          <Route path="/sales/proposals/new" element={<ProtectedRoute><ProposalForm /></ProtectedRoute>} />
          <Route path="/sales/proposals/edit/:id" element={<ProtectedRoute><ProposalForm /></ProtectedRoute>} />
          <Route path="/sales/estimates" element={<ProtectedRoute><EstimatesList /></ProtectedRoute>} />
          <Route path="/sales/estimates/new" element={<ProtectedRoute><EstimateForm /></ProtectedRoute>} />
          <Route path="/sales/estimates/edit/:id" element={<ProtectedRoute><EstimateForm /></ProtectedRoute>} />
          <Route path="/sales/invoices" element={<ProtectedRoute><InvoicesList /></ProtectedRoute>} />
          <Route path="/sales/invoices/new" element={<ProtectedRoute><InvoiceForm /></ProtectedRoute>} />
          <Route path="/sales/invoices/edit/:id" element={<ProtectedRoute><InvoiceForm /></ProtectedRoute>} />
          <Route path="/sales/invoices/view/:id" element={<ProtectedRoute><InvoiceView /></ProtectedRoute>} />
          <Route path="/sales/payments" element={<ProtectedRoute><PaymentsList /></ProtectedRoute>} />
          <Route path="/sales/payments/batch" element={<ProtectedRoute><BatchPayments /></ProtectedRoute>} />
          <Route path="/sales/credit-notes" element={<ProtectedRoute><CreditNotesList /></ProtectedRoute>} />
          <Route path="/sales/credit-notes/new" element={<ProtectedRoute><CreditNoteForm /></ProtectedRoute>} />
          <Route path="/sales/credit-notes/edit/:id" element={<ProtectedRoute><CreditNoteForm /></ProtectedRoute>} />
          
          {/* Accounts Module */}
          <Route path="/accounts" element={<ProtectedRoute><Accounts /></ProtectedRoute>} />
          <Route path="/accounts/banking" element={<ProtectedRoute><Accounts /></ProtectedRoute>} />
          <Route path="/accounts/reconciliation" element={<ProtectedRoute><Accounts /></ProtectedRoute>} />
          <Route path="/accounts/cheque-management" element={<ProtectedRoute><Accounts /></ProtectedRoute>} />
          <Route path="/accounts/cash-management" element={<ProtectedRoute><Accounts /></ProtectedRoute>} />
          <Route path="/accounts/bank-feeds" element={<ProtectedRoute><Accounts /></ProtectedRoute>} />
          <Route path="/accounts/bank-statements" element={<ProtectedRoute><Accounts /></ProtectedRoute>} />
          <Route path="/accounts/recurring-transactions" element={<ProtectedRoute><Accounts /></ProtectedRoute>} />
          <Route path="/accounts/split-transactions" element={<ProtectedRoute><Accounts /></ProtectedRoute>} />
          <Route path="/accounts/transaction-approval" element={<ProtectedRoute><Accounts /></ProtectedRoute>} />
          <Route path="/accounts/multi-currency" element={<ProtectedRoute><Accounts /></ProtectedRoute>} />
          <Route path="/accounts/income" element={<ProtectedRoute><Accounts /></ProtectedRoute>} />
          <Route path="/accounts/expenses" element={<ProtectedRoute><Accounts /></ProtectedRoute>} />
          <Route path="/accounts/banking-analytics" element={<ProtectedRoute><Accounts /></ProtectedRoute>} />
          <Route path="/accounts/balancesheet" element={<ProtectedRoute><Accounts /></ProtectedRoute>} />
          <Route path="/accounts/alerts-notifications" element={<ProtectedRoute><Accounts /></ProtectedRoute>} />
          <Route path="/accounts/audit-trail" element={<ProtectedRoute><Accounts /></ProtectedRoute>} />
          <Route path="/accounts/receivables" element={<ProtectedRoute><Accounts /></ProtectedRoute>} />
          <Route path="/accounts/payables" element={<ProtectedRoute><Accounts /></ProtectedRoute>} />
          <Route path="/accounts/reports" element={<ProtectedRoute><Accounts /></ProtectedRoute>} />
          <Route path="/accounts/settings" element={<ProtectedRoute><Accounts /></ProtectedRoute>} />
          
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
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
