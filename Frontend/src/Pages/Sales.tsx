import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { 
  TrendingUp, FileText, DollarSign, CreditCard, Receipt, FileSignature
} from 'lucide-react';
import ProposalsList from './Sales/ProposalsList';
import EstimatesList from './Sales/EstimatesList';
import InvoicesList from './Sales/InvoicesList';
import PaymentsList from './Sales/PaymentsList';
import CreditNotesList from './Sales/CreditNotesList';

const Sales: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    const saved = localStorage.getItem('sidebarOpen');
    return saved ? JSON.parse(saved) : false;
  });

  const handleSidebarToggle = () => {
    const newState = !sidebarOpen;
    setSidebarOpen(newState);
    localStorage.setItem('sidebarOpen', JSON.stringify(newState));
  };

  // Determine active tab from route
  const getActiveTab = () => {
    const path = location.pathname;
    if (path.includes('/proposals')) return 'proposals';
    if (path.includes('/estimates')) return 'estimates';
    if (path.includes('/payments')) return 'payments';
    if (path.includes('/credit-notes')) return 'credit-notes';
    return 'invoices';
  };

  const activeTab = getActiveTab();

  return (
    <div className="dashboard-layout">
      <Sidebar isOpen={sidebarOpen} onToggle={handleSidebarToggle} />
      
      <div className={`main-content ${sidebarOpen ? 'sidebar-open' : ''}`}>
        <Header onMenuClick={handleSidebarToggle} />
        
        <div className="page-container">
          <div className="page-header">
            <div className="page-header-left">
              <TrendingUp size={32} className="page-icon" />
              <div>
                <h1 className="page-title">Sales Management</h1>
                <p className="page-subtitle">Manage proposals, estimates, invoices, payments & credit notes</p>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="stats-row">
            <div className="stat-card-mini">
              <div className="stat-card-mini-icon revenue">
                <DollarSign size={24} />
              </div>
              <div className="stat-card-mini-content">
                <div className="stat-card-mini-value">₹2.4M</div>
                <div className="stat-card-mini-label">Total Revenue</div>
                <div className="stat-mini-trend positive">+18.2% from last month</div>
              </div>
            </div>
            <div className="stat-card-mini">
              <div className="stat-card-mini-icon completed">
                <FileText size={24} />
              </div>
              <div className="stat-card-mini-content">
                <div className="stat-card-mini-value">156</div>
                <div className="stat-card-mini-label">Total Invoices</div>
                <div className="stat-mini-trend positive">+12 this month</div>
              </div>
            </div>
            <div className="stat-card-mini">
              <div className="stat-card-mini-icon active">
                <CreditCard size={24} />
              </div>
              <div className="stat-card-mini-content">
                <div className="stat-card-mini-value">₹485K</div>
                <div className="stat-card-mini-label">Pending Payments</div>
                <div className="stat-mini-trend negative">28 invoices</div>
              </div>
            </div>
            <div className="stat-card-mini">
              <div className="stat-card-mini-icon projects">
                <TrendingUp size={24} />
              </div>
              <div className="stat-card-mini-content">
                <div className="stat-card-mini-value">42</div>
                <div className="stat-card-mini-label">Active Proposals</div>
                <div className="stat-mini-trend">₹3.2M value</div>
              </div>
            </div>
          </div>

          {/* Tabs Navigation */}
          <div className="tabs">
            <button 
              className={`tab ${activeTab === 'proposals' ? 'tab-active' : ''}`}
              onClick={() => navigate('/sales/proposals')}
            >
              <FileSignature size={18} />
              Proposals
            </button>
            <button 
              className={`tab ${activeTab === 'estimates' ? 'tab-active' : ''}`}
              onClick={() => navigate('/sales/estimates')}
            >
              <FileText size={18} />
              Estimates
            </button>
            <button 
              className={`tab ${activeTab === 'invoices' ? 'tab-active' : ''}`}
              onClick={() => navigate('/sales/invoices')}
            >
              <FileText size={18} />
              Invoices
            </button>
            <button 
              className={`tab ${activeTab === 'payments' ? 'tab-active' : ''}`}
              onClick={() => navigate('/sales/payments')}
            >
              <Receipt size={18} />
              Payments
            </button>
            <button 
              className={`tab ${activeTab === 'credit-notes' ? 'tab-active' : ''}`}
              onClick={() => navigate('/sales/credit-notes')}
            >
              <CreditCard size={18} />
              Credit Notes
            </button>
          </div>

          {/* Content based on active tab */}
          {activeTab === 'proposals' && <ProposalsList />}
          {activeTab === 'estimates' && <EstimatesList />}
          {activeTab === 'invoices' && <InvoicesList />}
          {activeTab === 'payments' && <PaymentsList />}
          {activeTab === 'credit-notes' && <CreditNotesList />}
        </div>
      </div>
    </div>
  );
};

export default Sales;
