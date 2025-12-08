import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import './styles/Dashboard.css';

// Lazy load components
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
const ProposalForm = lazy(() => import('./Pages/Sales/ProposalForm'));
const EstimateForm = lazy(() => import('./Pages/Sales/EstimateForm'));
const InvoiceForm = lazy(() => import('./Pages/Sales/InvoiceForm'));
const InvoiceView = lazy(() => import('./Pages/Sales/InvoiceView'));
const BatchPayments = lazy(() => import('./Pages/Sales/BatchPayments'));
const CreditNoteForm = lazy(() => import('./Pages/Sales/CreditNoteForm'));

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

function App() {
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          
          {/* Projects Module */}
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/tasks" element={<Projects />} />
          <Route path="/projects/timesheets" element={<Projects />} />
          <Route path="/projects/overview" element={<Projects />} />
          
          {/* HRM Module */}
          <Route path="/hrm" element={<HRM />} />
          <Route path="/hrm/attendance" element={<HRM />} />
          <Route path="/hrm/payroll" element={<HRM />} />
          <Route path="/hrm/payslips" element={<HRM />} />
          <Route path="/hrm/documents" element={<HRM />} />
          
          {/* Sales Module */}
          <Route path="/sales" element={<Sales />} />
          <Route path="/sales/proposals" element={<Sales />} />
          <Route path="/sales/proposals/new" element={<ProposalForm />} />
          <Route path="/sales/proposals/edit/:id" element={<ProposalForm />} />
          <Route path="/sales/estimates" element={<Sales />} />
          <Route path="/sales/estimates/new" element={<EstimateForm />} />
          <Route path="/sales/estimates/edit/:id" element={<EstimateForm />} />
          <Route path="/sales/invoices" element={<Sales />} />
          <Route path="/sales/invoices/new" element={<InvoiceForm />} />
          <Route path="/sales/invoices/edit/:id" element={<InvoiceForm />} />
          <Route path="/sales/invoices/:id" element={<InvoiceView />} />
          <Route path="/sales/invoices/batch-payments" element={<BatchPayments />} />
          <Route path="/sales/payments" element={<Sales />} />
          <Route path="/sales/credit-notes" element={<Sales />} />
          <Route path="/sales/credit-notes/new" element={<CreditNoteForm />} />
          <Route path="/sales/credit-notes/edit/:id" element={<CreditNoteForm />} />
          
          {/* Accounts Module */}
          <Route path="/accounts" element={<Accounts />} />
          <Route path="/accounts/income" element={<Accounts />} />
          <Route path="/accounts/expenses" element={<Accounts />} />
          <Route path="/accounts/bank-accounts" element={<Accounts />} />
          <Route path="/accounts/ledger" element={<Accounts />} />
          <Route path="/accounts/reports" element={<Accounts />} />
          
          {/* Recruitment Module */}
          <Route path="/recruitment" element={<Recruitment />} />
          <Route path="/recruitment/jobs" element={<Recruitment />} />
          <Route path="/recruitment/interviews" element={<Recruitment />} />
          <Route path="/recruitment/ai-matching" element={<Recruitment />} />
          
          {/* Customers Module */}
          <Route path="/customers" element={<Customers />} />
          <Route path="/customers/leads" element={<Customers />} />
          <Route path="/customers/list" element={<Customers />} />
          <Route path="/customers/communication" element={<Customers />} />
          
          {/* Contracts Module */}
          <Route path="/contracts" element={<Contracts />} />
          <Route path="/contracts/active" element={<Contracts />} />
          <Route path="/contracts/renewals" element={<Contracts />} />
          <Route path="/contracts/alerts" element={<Contracts />} />
          
          {/* Vendors Module */}
          <Route path="/vendors" element={<Vendors />} />
          <Route path="/vendors/list" element={<Vendors />} />
          <Route path="/vendors/payments" element={<Vendors />} />
          <Route path="/vendors/documents" element={<Vendors />} />
          
          {/* Products & Services Module */}
          <Route path="/products" element={<ProductsServices />} />
          <Route path="/products/list" element={<ProductsServices />} />
          <Route path="/products/services" element={<ProductsServices />} />
          <Route path="/products/pricing" element={<ProductsServices />} />
          
          {/* Admin Setup Module */}
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/company" element={<Admin />} />
          <Route path="/admin/domain" element={<Admin />} />
          <Route path="/admin/permissions" element={<Admin />} />
          <Route path="/admin/support" element={<Admin />} />
          <Route path="/admin/media" element={<Admin />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
