import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import BankAccounts from '../modules/accounts/BankAccounts';
import '../styles/Dashboard.css';

const Accounts = () => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    const saved = localStorage.getItem('sidebarOpen');
    return saved ? JSON.parse(saved) : false;
  });

  const handleSidebarToggle = () => {
    const newState = !sidebarOpen;
    setSidebarOpen(newState);
    localStorage.setItem('sidebarOpen', JSON.stringify(newState));
  };

  const renderContent = () => {
    const path = location.pathname;

    // Banking Section
    if (path === '/accounts/banking' || path === '/accounts') {
      return <BankAccounts />;
    }

    // Income & Expense Section
    if (path === '/accounts/income-expense') {
      return (
        <div style={{ padding: '24px', background: '#F8FAFC', minHeight: '100%' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: '700', color: '#1E293B', marginBottom: '8px' }}>Income & Expense</h2>
          <p style={{ color: '#64748B', marginBottom: '24px' }}>Manage income and expenses</p>
          <div style={{ background: 'white', padding: '40px', borderRadius: '12px', textAlign: 'center' }}>
            <p style={{ color: '#94A3B8' }}>Coming soon...</p>
          </div>
        </div>
      );
    }

    // Receivables Section
    if (path === '/accounts/receivables') {
      return (
        <div style={{ padding: '24px', background: '#F8FAFC', minHeight: '100%' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: '700', color: '#1E293B', marginBottom: '8px' }}>Receivables</h2>
          <p style={{ color: '#64748B', marginBottom: '24px' }}>Manage customer payments and outstanding amounts</p>
          <div style={{ background: 'white', padding: '40px', borderRadius: '12px', textAlign: 'center' }}>
            <p style={{ color: '#94A3B8' }}>Coming soon...</p>
          </div>
        </div>
      );
    }

    // Payables Section
    if (path === '/accounts/payables') {
      return (
        <div style={{ padding: '24px', background: '#F8FAFC', minHeight: '100%' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: '700', color: '#1E293B', marginBottom: '8px' }}>Payables</h2>
          <p style={{ color: '#64748B', marginBottom: '24px' }}>Manage vendor bills and payments</p>
          <div style={{ background: 'white', padding: '40px', borderRadius: '12px', textAlign: 'center' }}>
            <p style={{ color: '#94A3B8' }}>Coming soon...</p>
          </div>
        </div>
      );
    }

    // Reports Section
    if (path === '/accounts/reports') {
      return (
        <div style={{ padding: '24px', background: '#F8FAFC', minHeight: '100%' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: '700', color: '#1E293B', marginBottom: '8px' }}>Reports</h2>
          <p style={{ color: '#64748B', marginBottom: '24px' }}>Financial reports and analytics</p>
          <div style={{ background: 'white', padding: '40px', borderRadius: '12px', textAlign: 'center' }}>
            <p style={{ color: '#94A3B8' }}>Coming soon...</p>
          </div>
        </div>
      );
    }

    // Settings Section
    if (path === '/accounts/settings') {
      return (
        <div style={{ padding: '24px', background: '#F8FAFC', minHeight: '100%' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: '700', color: '#1E293B', marginBottom: '8px' }}>Settings</h2>
          <p style={{ color: '#64748B', marginBottom: '24px' }}>Configure accounts module</p>
          <div style={{ background: 'white', padding: '40px', borderRadius: '12px', textAlign: 'center' }}>
            <p style={{ color: '#94A3B8' }}>Coming soon...</p>
          </div>
        </div>
      );
    }

    // Default to Banking
    return <BankAccounts />;
  };

  return (
    <div className="dashboard-container">
      <Sidebar isOpen={sidebarOpen} onToggle={handleSidebarToggle} />
      <div className={`main-content ${sidebarOpen ? 'sidebar-open' : ''}`}>
        <Header onMenuClick={handleSidebarToggle} />
        <div className="page-content" style={{ padding: '0', background: '#F8FAFC' }}>
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Accounts;
