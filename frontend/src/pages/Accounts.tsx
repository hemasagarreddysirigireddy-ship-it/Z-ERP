import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import BankAccounts from '../modules/accounts/BankAccounts';
import BankReconciliation from '../modules/accounts/BankReconciliation';
import RecurringTransactions from '../modules/accounts/RecurringTransactions';
import ChequeManagement from '../modules/accounts/ChequeManagement';
import TransactionApproval from '../modules/accounts/TransactionApproval';
import CashManagement from '../modules/accounts/CashManagement';
import BankStatementGenerator from '../modules/accounts/BankStatementGenerator';
import BankingAnalytics from '../modules/accounts/BankingAnalytics';
import AlertsNotifications from '../modules/accounts/AlertsNotifications';
import BankFeeds from '../modules/accounts/BankFeeds';
import SplitTransaction from '../modules/accounts/SplitTransaction';
import MultiCurrency from '../modules/accounts/MultiCurrency';
import AuditTrail from '../modules/accounts/AuditTrail';
import Receivables from '../modules/accounts/Receivables';
import Payables from '../modules/accounts/Payables';
import AccountsReports from '../modules/accounts/AccountsReports';
import AccountsSettings from '../modules/accounts/AccountsSettings';
import Income from './Income';
import Expenses from './Expenses';
import BalanceSheet from './BalanceSheet';
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

    if (path === '/accounts/reconciliation') {
      return <BankReconciliation />;
    }

    if (path === '/accounts/cheque-management') {
      return <ChequeManagement />;
    }

    if (path === '/accounts/cash-management') {
      return <CashManagement />;
    }

    if (path === '/accounts/bank-feeds') {
      return <BankFeeds />;
    }

    if (path === '/accounts/bank-statements') {
      return <BankStatementGenerator />;
    }

    // Transactions Section
    if (path === '/accounts/recurring-transactions') {
      return <RecurringTransactions />;
    }

    if (path === '/accounts/split-transactions') {
      return <SplitTransaction />;
    }

    if (path === '/accounts/transaction-approval') {
      return <TransactionApproval />;
    }

    if (path === '/accounts/multi-currency') {
      return <MultiCurrency />;
    }

    // Income & Expense Section
    if (path === '/accounts/income') {
      return <Income />;
    }

    if (path === '/accounts/expenses') {
      return <Expenses />;
    }

    // Analytics & Reports
    if (path === '/accounts/banking-analytics') {
      return <BankingAnalytics />;
    }

    if (path === '/accounts/balancesheet') {
      return <BalanceSheet />;
    }

    // System & Security
    if (path === '/accounts/alerts-notifications') {
      return <AlertsNotifications />;
    }

    if (path === '/accounts/audit-trail') {
      return <AuditTrail />;
    }

    // Receivables Section
    if (path === '/accounts/receivables') {
      return <Receivables />;
    }

    // Payables Section
    if (path === '/accounts/payables') {
      return <Payables />;
    }

    // Reports Section
    if (path === '/accounts/reports') {
      return <AccountsReports />;
    }

    // Settings Section
    if (path === '/accounts/settings') {
      return <AccountsSettings />;
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
