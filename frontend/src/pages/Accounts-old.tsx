import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { TrendingUp, TrendingDown, DollarSign, CreditCard, FileText, BarChart3, Plus, Download, Filter } from 'lucide-react';
import '../styles/Dashboard.css';

const Accounts = () => {
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    const saved = localStorage.getItem('sidebarOpen');
    return saved ? JSON.parse(saved) : false;
  });

  const handleSidebarToggle = () => {
    const newState = !sidebarOpen;
    setSidebarOpen(newState);
    localStorage.setItem('sidebarOpen', JSON.stringify(newState));
  };
  const [activeTab, setActiveTab] = useState('income');

  // Income Data
  const incomeData = [
    { id: 'INC-001', date: '2024-01-15', client: 'Tech Solutions Inc', category: 'Project Payment', amount: 45000, status: 'received', invoice: 'INV-2024-001' },
    { id: 'INC-002', date: '2024-01-18', client: 'Global Enterprises', category: 'Service Fee', amount: 28500, status: 'received', invoice: 'INV-2024-002' },
    { id: 'INC-003', date: '2024-01-20', client: 'StartUp Hub', category: 'Consulting', amount: 15000, status: 'pending', invoice: 'INV-2024-003' },
    { id: 'INC-004', date: '2024-01-22', client: 'Digital Agency', category: 'Maintenance', amount: 12000, status: 'received', invoice: 'INV-2024-004' },
  ];

  // Expense Data
  const expenseData = [
    { id: 'EXP-001', date: '2024-01-10', vendor: 'Office Supplies Co', category: 'Office Supplies', amount: 3200, status: 'paid', paymentMethod: 'Credit Card' },
    { id: 'EXP-002', date: '2024-01-12', vendor: 'CloudHost Services', category: 'Hosting & Servers', amount: 8500, status: 'paid', paymentMethod: 'Bank Transfer' },
    { id: 'EXP-003', date: '2024-01-15', vendor: 'Marketing Agency', category: 'Marketing', amount: 15000, status: 'pending', paymentMethod: 'Pending' },
    { id: 'EXP-004', date: '2024-01-18', vendor: 'Travel Corp', category: 'Travel Expenses', amount: 5400, status: 'paid', paymentMethod: 'Debit Card' },
  ];

  // Bank Accounts Data
  const bankAccounts = [
    { bankName: 'HDFC Bank', accountNumber: '****8754', accountType: 'Current', balance: 485000, currency: 'INR', status: 'active' },
    { bankName: 'State Bank of India', accountNumber: '****2341', accountType: 'Savings', balance: 125000, currency: 'INR', status: 'active' },
    { bankName: 'ICICI Bank', accountNumber: '****6789', accountType: 'Business', balance: 250000, currency: 'INR', status: 'active' },
  ];

  // Ledger Data
  const ledgerData = [
    { date: '2024-01-15', description: 'Project Payment - Tech Solutions', accountType: 'Income', debit: 0, credit: 45000, balance: 485000 },
    { date: '2024-01-12', description: 'Hosting Services Payment', accountType: 'Expense', debit: 8500, credit: 0, balance: 440000 },
    { date: '2024-01-18', description: 'Service Fee - Global Enterprises', accountType: 'Income', debit: 0, credit: 28500, balance: 468500 },
    { date: '2024-01-18', description: 'Travel Expenses', accountType: 'Expense', debit: 5400, credit: 0, balance: 463100 },
  ];

  // Financial Stats
  const stats = [
    { 
      title: 'Total Income', 
      value: '₹1,00,500', 
      change: '+18.5%', 
      icon: <TrendingUp size={24} />,
      color: 'success'
    },
    { 
      title: 'Total Expenses', 
      value: '₹32,100', 
      change: '+12.3%', 
      icon: <TrendingDown size={24} />,
      color: 'danger'
    },
    { 
      title: 'Net Profit', 
      value: '₹68,400', 
      change: '+24.7%', 
      icon: <DollarSign size={24} />,
      color: 'primary'
    },
    { 
      title: 'Bank Balance', 
      value: '₹8,60,000', 
      change: '+8.2%', 
      icon: <CreditCard size={24} />,
      color: 'info'
    },
  ];

  return (
    <div className="dashboard-container">
      <Sidebar isOpen={sidebarOpen} onToggle={handleSidebarToggle} />
      <div className={`main-content ${sidebarOpen ? 'sidebar-open' : ''}`}>
        <Header onMenuClick={handleSidebarToggle} />
        <div className="page-content">
          <div className="page-header">
            <div>
              <h1>Accounts</h1>
              <p>Financial Management & Reporting</p>
            </div>
            <div className="page-header-right">
              <button className="btn btn-secondary">
                <Filter size={18} />
                Filter
              </button>
              <button className="btn btn-secondary">
                <Download size={18} />
                Export
              </button>
              <button className="btn btn-primary">
                <Plus size={18} />
                Add Transaction
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className={`stat-card stat-card-${stat.color}`}>
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-details">
                  <h3>{stat.title}</h3>
                  <div className="stat-value">{stat.value}</div>
                  <div className={`stat-change ${stat.change.startsWith('+') ? 'positive' : 'negative'}`}>
                    {stat.change} from last month
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="tabs-container">
            <div className="tabs">
              <button 
                className={activeTab === 'income' ? 'tab active' : 'tab'}
                onClick={() => setActiveTab('income')}
              >
                <TrendingUp size={18} />
                Income
              </button>
              <button 
                className={activeTab === 'expenses' ? 'tab active' : 'tab'}
                onClick={() => setActiveTab('expenses')}
              >
                <TrendingDown size={18} />
                Expenses
              </button>
              <button 
                className={activeTab === 'bank' ? 'tab active' : 'tab'}
                onClick={() => setActiveTab('bank')}
              >
                <CreditCard size={18} />
                Bank Accounts
              </button>
              <button 
                className={activeTab === 'ledger' ? 'tab active' : 'tab'}
                onClick={() => setActiveTab('ledger')}
              >
                <FileText size={18} />
                Ledger
              </button>
              <button 
                className={activeTab === 'reports' ? 'tab active' : 'tab'}
                onClick={() => setActiveTab('reports')}
              >
                <BarChart3 size={18} />
                Reports
              </button>
            </div>

            <div className="tab-content">
              {/* Income Tab */}
              {activeTab === 'income' && (
                <div className="table-container">
                  <div className="table-header">
                    <h3>Income Records</h3>
                    <div className="header-actions">
                      <button className="btn btn-primary btn-sm">
                        <Plus size={16} />
                        Add Income
                      </button>
                    </div>
                  </div>
                  <div className="table-wrapper">
                    <table className="data-table">
                      <thead>
                        <tr>
                          <th>Income ID</th>
                          <th>Date</th>
                          <th>Client</th>
                          <th>Category</th>
                          <th>Invoice</th>
                          <th>Amount</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {incomeData.map((income) => (
                          <tr key={income.id}>
                            <td><span className="invoice-id">{income.id}</span></td>
                            <td>{income.date}</td>
                            <td className="client-cell">{income.client}</td>
                            <td>{income.category}</td>
                            <td><span className="invoice-link">{income.invoice}</span></td>
                            <td className="amount-cell positive">₹{income.amount.toLocaleString()}</td>
                            <td>
                              <span className={`badge ${income.status === 'received' ? 'badge-success' : 'badge-warning'}`}>
                                {income.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Expenses Tab */}
              {activeTab === 'expenses' && (
                <div className="table-container">
                  <div className="table-header">
                    <h3>Expense Records</h3>
                    <div className="header-actions">
                      <button className="btn btn-primary btn-sm">
                        <Plus size={16} />
                        Add Expense
                      </button>
                    </div>
                  </div>
                  <div className="table-wrapper">
                    <table className="data-table">
                      <thead>
                        <tr>
                          <th>Expense ID</th>
                          <th>Date</th>
                          <th>Vendor</th>
                          <th>Category</th>
                          <th>Payment Method</th>
                          <th>Amount</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {expenseData.map((expense) => (
                          <tr key={expense.id}>
                            <td><span className="invoice-id">{expense.id}</span></td>
                            <td>{expense.date}</td>
                            <td className="client-cell">{expense.vendor}</td>
                            <td>{expense.category}</td>
                            <td>{expense.paymentMethod}</td>
                            <td className="amount-cell negative">₹{expense.amount.toLocaleString()}</td>
                            <td>
                              <span className={`badge ${expense.status === 'paid' ? 'badge-success' : 'badge-warning'}`}>
                                {expense.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Bank Accounts Tab */}
              {activeTab === 'bank' && (
                <div className="table-container">
                  <div className="table-header">
                    <h3>Bank Accounts</h3>
                    <div className="header-actions">
                      <button className="btn btn-primary btn-sm">
                        <Plus size={16} />
                        Add Bank Account
                      </button>
                    </div>
                  </div>
                  <div className="table-wrapper">
                    <table className="data-table">
                      <thead>
                        <tr>
                          <th>Bank Name</th>
                          <th>Account Number</th>
                          <th>Account Type</th>
                          <th>Balance</th>
                          <th>Currency</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {bankAccounts.map((account, index) => (
                          <tr key={index}>
                            <td className="client-cell">{account.bankName}</td>
                            <td className="invoice-id">{account.accountNumber}</td>
                            <td>{account.accountType}</td>
                            <td className="amount-cell net-salary">₹{account.balance.toLocaleString()}</td>
                            <td>{account.currency}</td>
                            <td>
                              <span className={`badge badge-success`}>
                                {account.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Ledger Tab */}
              {activeTab === 'ledger' && (
                <div className="table-container">
                  <div className="table-header">
                    <h3>General Ledger</h3>
                    <div className="header-actions">
                      <button className="btn btn-secondary btn-sm">
                        <Download size={16} />
                        Export Ledger
                      </button>
                    </div>
                  </div>
                  <div className="table-wrapper">
                    <table className="data-table">
                      <thead>
                        <tr>
                          <th>Date</th>
                          <th>Description</th>
                          <th>Account Type</th>
                          <th>Debit</th>
                          <th>Credit</th>
                          <th>Balance</th>
                        </tr>
                      </thead>
                      <tbody>
                        {ledgerData.map((entry, index) => (
                          <tr key={index}>
                            <td>{entry.date}</td>
                            <td className="title-cell">{entry.description}</td>
                            <td>
                              <span className={`badge ${entry.accountType === 'Income' ? 'badge-success' : 'badge-danger'}`}>
                                {entry.accountType}
                              </span>
                            </td>
                            <td className="amount-cell negative">
                              {entry.debit > 0 ? `₹${entry.debit.toLocaleString()}` : '-'}
                            </td>
                            <td className="amount-cell positive">
                              {entry.credit > 0 ? `₹${entry.credit.toLocaleString()}` : '-'}
                            </td>
                            <td className="amount-cell net-salary">₹{entry.balance.toLocaleString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Reports Tab */}
              {activeTab === 'reports' && (
                <div className="documents-grid">
                  <div className="document-category-card">
                    <div className="category-icon gradient-bg-1">
                      <FileText size={40} />
                    </div>
                    <h3>Profit & Loss</h3>
                    <p>Monthly P&L Statement</p>
                    <button className="btn btn-primary">Generate Report</button>
                  </div>
                  <div className="document-category-card">
                    <div className="category-icon gradient-bg-2">
                      <BarChart3 size={40} />
                    </div>
                    <h3>Balance Sheet</h3>
                    <p>Financial Position Report</p>
                    <button className="btn btn-primary">Generate Report</button>
                  </div>
                  <div className="document-category-card">
                    <div className="category-icon gradient-bg-3">
                      <TrendingUp size={40} />
                    </div>
                    <h3>Cash Flow</h3>
                    <p>Cash Flow Analysis</p>
                    <button className="btn btn-primary">Generate Report</button>
                  </div>
                  <div className="document-category-card">
                    <div className="category-icon gradient-bg-4">
                      <DollarSign size={40} />
                    </div>
                    <h3>Tax Summary</h3>
                    <p>Tax Calculation Report</p>
                    <button className="btn btn-primary">Generate Report</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accounts;
