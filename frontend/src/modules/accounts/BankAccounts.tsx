import { useState } from 'react';
import { 
  CreditCard, Eye, RefreshCw, Edit, CheckCircle, XCircle, 
  AlertCircle, Plus, ArrowUpRight, ArrowDownLeft, Search,
  Filter, Download, Upload, Calendar, Building2, Hash,
  FileText, TrendingUp, TrendingDown, DollarSign, Clock
} from 'lucide-react';
import './BankAccounts.css';

interface BankAccount {
  id: string;
  bankName: string;
  accountNumber: string;
  accountHolderName: string;
  accountType: string;
  balance: number;
  currency: string;
  status: 'active' | 'inactive' | 'needs-kyc';
  connectionStatus: 'connected' | 'manual';
  lastSynced?: string;
  branch: string;
  ifscCode: string;
  swiftCode?: string;
  branchAddress?: string;
  openingDate: string;
  minimumBalance: number;
}

interface Transaction {
  id: string;
  accountId: string;
  transactionDate: string;
  transactionType: 'sent' | 'received' | 'transfer';
  amount: number;
  balanceAfter: number;
  category: string;
  description: string;
  reference: string;
  paymentMethod: string;
  status: 'completed' | 'pending' | 'failed';
  recipientName?: string;
  senderName?: string;
  notes?: string;
  attachments?: number;
}

const BankAccounts = () => {
  const [viewMode, setViewMode] = useState<'overview' | 'transactions' | 'statements'>('overview');
  const [selectedAccount, setSelectedAccount] = useState<string | null>(null);
  const [cardView, setCardView] = useState<'card' | 'table'>('card');
  const [hoveredAccountId, setHoveredAccountId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'sent' | 'received'>('all');

  const bankAccounts: BankAccount[] = [
    {
      id: 'BA001',
      bankName: 'HDFC Bank',
      accountNumber: '12345678901234',
      accountHolderName: 'ABC Corporation Pvt Ltd',
      accountType: 'Current Account',
      balance: 4850000,
      currency: 'INR',
      status: 'active',
      connectionStatus: 'connected',
      lastSynced: '12:45 PM, Today',
      branch: 'Mumbai Main Branch',
      ifscCode: 'HDFC0001234',
      swiftCode: 'HDFCINBB',
      branchAddress: 'Nariman Point, Mumbai - 400021',
      openingDate: '2020-05-15',
      minimumBalance: 100000
    },
    {
      id: 'BA002',
      bankName: 'State Bank of India',
      accountNumber: '98765432109876',
      accountHolderName: 'ABC Corporation Pvt Ltd',
      accountType: 'Savings Account',
      balance: 1250000,
      currency: 'INR',
      status: 'active',
      connectionStatus: 'manual',
      branch: 'Pune Shivaji Nagar Branch',
      ifscCode: 'SBIN0005678',
      swiftCode: 'SBININBB',
      branchAddress: 'FC Road, Pune - 411004',
      openingDate: '2019-03-22',
      minimumBalance: 10000
    },
    {
      id: 'BA003',
      bankName: 'ICICI Bank',
      accountNumber: '45678912345678',
      accountHolderName: 'ABC Corporation Pvt Ltd',
      accountType: 'Business Account',
      balance: 2500000,
      currency: 'INR',
      status: 'needs-kyc',
      connectionStatus: 'manual',
      branch: 'Delhi Connaught Place',
      ifscCode: 'ICIC0009876',
      swiftCode: 'ICICINBB',
      branchAddress: 'CP Inner Circle, New Delhi - 110001',
      openingDate: '2021-08-10',
      minimumBalance: 150000
    },
    {
      id: 'BA004',
      bankName: 'Axis Bank',
      accountNumber: '78912345678912',
      accountHolderName: 'ABC Corporation Pvt Ltd',
      accountType: 'Current Account',
      balance: 3200000,
      currency: 'INR',
      status: 'active',
      connectionStatus: 'connected',
      lastSynced: '10:30 AM, Today',
      branch: 'Bangalore Koramangala',
      ifscCode: 'UTIB0001111',
      swiftCode: 'AXISINBB',
      branchAddress: '80 Feet Road, Koramangala, Bangalore - 560034',
      openingDate: '2020-11-18',
      minimumBalance: 100000
    }
  ];

  const transactions: Transaction[] = [
    {
      id: 'TXN001',
      accountId: 'BA001',
      transactionDate: '2024-12-05 14:30',
      transactionType: 'received',
      amount: 250000,
      balanceAfter: 4850000,
      category: 'Client Payment',
      description: 'Payment for Project XYZ - Invoice #INV-2024-1234',
      reference: 'REF2024120501',
      paymentMethod: 'NEFT',
      status: 'completed',
      senderName: 'Tech Solutions Pvt Ltd',
      notes: 'Payment for milestone 3 completion'
    },
    {
      id: 'TXN002',
      accountId: 'BA001',
      transactionDate: '2024-12-05 11:15',
      transactionType: 'sent',
      amount: 85000,
      balanceAfter: 4600000,
      category: 'Vendor Payment',
      description: 'Software License Payment - Adobe Creative Cloud',
      reference: 'REF2024120502',
      paymentMethod: 'RTGS',
      status: 'completed',
      recipientName: 'Adobe Systems India',
      notes: 'Annual subscription renewal'
    },
    {
      id: 'TXN003',
      accountId: 'BA001',
      transactionDate: '2024-12-04 16:45',
      transactionType: 'sent',
      amount: 125000,
      balanceAfter: 4685000,
      category: 'Salary Payment',
      description: 'December 2024 Salary - Marketing Team',
      reference: 'SAL202412001',
      paymentMethod: 'IMPS',
      status: 'completed',
      recipientName: 'Multiple Employees',
      notes: 'Salary disbursement for marketing department',
      attachments: 3
    },
    {
      id: 'TXN004',
      accountId: 'BA001',
      transactionDate: '2024-12-04 10:20',
      transactionType: 'received',
      amount: 450000,
      balanceAfter: 4810000,
      category: 'Project Income',
      description: 'Website Development - Final Payment',
      reference: 'INV2024987',
      paymentMethod: 'NEFT',
      status: 'completed',
      senderName: 'Global Ventures LLC',
      notes: 'Final milestone payment received'
    },
    {
      id: 'TXN005',
      accountId: 'BA002',
      transactionDate: '2024-12-03 15:30',
      transactionType: 'sent',
      amount: 45000,
      balanceAfter: 1250000,
      category: 'Operational Expense',
      description: 'Office Rent Payment - December 2024',
      reference: 'RENT202412',
      paymentMethod: 'Cheque',
      status: 'pending',
      recipientName: 'Property Management Co.',
      notes: 'Monthly office rent for Pune office'
    },
    {
      id: 'TXN006',
      accountId: 'BA004',
      transactionDate: '2024-12-03 09:00',
      transactionType: 'received',
      amount: 180000,
      balanceAfter: 3200000,
      category: 'Service Income',
      description: 'Consulting Services - November 2024',
      reference: 'CONS202411',
      paymentMethod: 'RTGS',
      status: 'completed',
      senderName: 'Enterprise Solutions Inc',
      notes: 'Payment for consulting engagement'
    },
    {
      id: 'TXN007',
      accountId: 'BA003',
      transactionDate: '2024-12-02 14:15',
      transactionType: 'sent',
      amount: 95000,
      balanceAfter: 2500000,
      category: 'Tax Payment',
      description: 'GST Payment - November 2024',
      reference: 'GST202411',
      paymentMethod: 'Online Banking',
      status: 'completed',
      recipientName: 'GSTN',
      notes: 'Monthly GST liability payment'
    },
    {
      id: 'TXN008',
      accountId: 'BA001',
      transactionDate: '2024-12-01 11:30',
      transactionType: 'transfer',
      amount: 200000,
      balanceAfter: 4360000,
      category: 'Internal Transfer',
      description: 'Transfer to SBI Savings Account',
      reference: 'TRF202412001',
      paymentMethod: 'Internal Transfer',
      status: 'completed',
      recipientName: 'ABC Corporation - SBI A/C',
      notes: 'Fund allocation for reserve'
    }
  ];

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'active':
        return { icon: <CheckCircle size={16} />, label: 'Active', class: 'status-active' };
      case 'inactive':
        return { icon: <XCircle size={16} />, label: 'Inactive', class: 'status-inactive' };
      case 'needs-kyc':
        return { icon: <AlertCircle size={16} />, label: 'Needs KYC', class: 'status-warning' };
      default:
        return { icon: <CheckCircle size={16} />, label: 'Active', class: 'status-active' };
    }
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'sent':
        return <ArrowUpRight className="txn-icon-sent" size={18} />;
      case 'received':
        return <ArrowDownLeft className="txn-icon-received" size={18} />;
      default:
        return <RefreshCw className="txn-icon-transfer" size={18} />;
    }
  };

  const getTransactionStatusClass = (status: string) => {
    switch (status) {
      case 'completed':
        return 'txn-status-completed';
      case 'pending':
        return 'txn-status-pending';
      case 'failed':
        return 'txn-status-failed';
      default:
        return 'txn-status-completed';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatAccountNumber = (accountNumber: string) => {
    return `****${accountNumber.slice(-4)}`;
  };

  const totalBalance = bankAccounts.reduce((sum, acc) => sum + acc.balance, 0);
  const activeAccounts = bankAccounts.filter(acc => acc.status === 'active').length;
  const selectedAccountData = bankAccounts.find(acc => acc.id === selectedAccount);
  const accountTransactions = selectedAccount 
    ? transactions.filter(txn => txn.accountId === selectedAccount)
    : transactions;

  const filteredTransactions = accountTransactions.filter(txn => {
    const matchesSearch = txn.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         txn.reference.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         txn.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterType === 'all' || txn.transactionType === filterType;
    return matchesSearch && matchesFilter;
  });

  const totalSent = accountTransactions
    .filter(txn => txn.transactionType === 'sent')
    .reduce((sum, txn) => sum + txn.amount, 0);

  const totalReceived = accountTransactions
    .filter(txn => txn.transactionType === 'received')
    .reduce((sum, txn) => sum + txn.amount, 0);

  return (
    <div className="bank-accounts-advanced">
      {/* Top Navigation */}
      <div className="bank-top-nav">
        <button
          className={`nav-btn ${viewMode === 'overview' ? 'active' : ''}`}
          onClick={() => setViewMode('overview')}
        >
          <Building2 size={18} />
          Accounts Overview
        </button>
        <button
          className={`nav-btn ${viewMode === 'transactions' ? 'active' : ''}`}
          onClick={() => setViewMode('transactions')}
        >
          <FileText size={18} />
          Transactions
        </button>
        <button
          className={`nav-btn ${viewMode === 'statements' ? 'active' : ''}`}
          onClick={() => setViewMode('statements')}
        >
          <Download size={18} />
          Statements
        </button>
      </div>

      {/* Overview Mode */}
      {viewMode === 'overview' && (
        <>
          {/* Header */}
          <div className="bank-accounts-header">
            <div className="header-left">
              <h2>Bank Accounts</h2>
              <p>Manage your bank accounts and monitor transactions</p>
            </div>
            <div className="header-right">
              <div className="view-toggle">
                <button
                  className={`toggle-btn ${cardView === 'card' ? 'active' : ''}`}
                  onClick={() => setCardView('card')}
                >
                  Card View
                </button>
                <button
                  className={`toggle-btn ${cardView === 'table' ? 'active' : ''}`}
                  onClick={() => setCardView('table')}
                >
                  Table View
                </button>
              </div>
              <button className="btn-primary">
                <Plus size={18} />
                Add Bank Account
              </button>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="summary-cards">
            <div className="summary-card">
              <div className="summary-icon balance">
                <DollarSign size={24} />
              </div>
              <div className="summary-content">
                <p className="summary-label">Total Balance</p>
                <h3 className="summary-value">{formatCurrency(totalBalance)}</h3>
                <span className="summary-change positive">
                  <TrendingUp size={14} />
                  +12.5% from last month
                </span>
              </div>
            </div>
            <div className="summary-card">
              <div className="summary-icon active">
                <CheckCircle size={24} />
              </div>
              <div className="summary-content">
                <p className="summary-label">Active Accounts</p>
                <h3 className="summary-value">{activeAccounts} of {bankAccounts.length}</h3>
                <span className="summary-info">All systems operational</span>
              </div>
            </div>
            <div className="summary-card">
              <div className="summary-icon synced">
                <RefreshCw size={24} />
              </div>
              <div className="summary-content">
                <p className="summary-label">Auto-Synced</p>
                <h3 className="summary-value">
                  {bankAccounts.filter(acc => acc.connectionStatus === 'connected').length}
                </h3>
                <span className="summary-info">Real-time data sync</span>
              </div>
            </div>
            <div className="summary-card">
              <div className="summary-icon transactions">
                <FileText size={24} />
              </div>
              <div className="summary-content">
                <p className="summary-label">Transactions Today</p>
                <h3 className="summary-value">{transactions.filter(t => t.transactionDate.includes('2024-12-05')).length}</h3>
                <span className="summary-info">Last updated now</span>
              </div>
            </div>
          </div>

          {/* Card View */}
          {cardView === 'card' && (
            <div className="bank-cards-grid">
              {bankAccounts.map(account => {
                const statusConfig = getStatusConfig(account.status);
                const isHovered = hoveredAccountId === account.id;

                return (
                  <div
                    key={account.id}
                    className="bank-card-advanced"
                    onMouseEnter={() => setHoveredAccountId(account.id)}
                    onMouseLeave={() => setHoveredAccountId(null)}
                  >
                    <div className="bank-card-header">
                      <div className="bank-info">
                        <div className="bank-icon-large">
                          <Building2 size={28} />
                        </div>
                        <div>
                          <h4>{account.bankName}</h4>
                          <p className="account-holder">{account.accountHolderName}</p>
                        </div>
                      </div>
                      <div className="status-badges">
                        <span className={`status-pill ${statusConfig.class}`}>
                          {statusConfig.icon}
                          {statusConfig.label}
                        </span>
                      </div>
                    </div>

                    <div className="bank-card-details">
                      <div className="detail-row">
                        <div className="detail-item">
                          <Hash size={14} />
                          <div>
                            <span className="detail-label">Account Number</span>
                            <span className="detail-value">{formatAccountNumber(account.accountNumber)}</span>
                          </div>
                        </div>
                        <div className="detail-item">
                          <FileText size={14} />
                          <div>
                            <span className="detail-label">Account Type</span>
                            <span className="detail-value">{account.accountType}</span>
                          </div>
                        </div>
                      </div>

                      <div className="detail-row">
                        <div className="detail-item">
                          <Building2 size={14} />
                          <div>
                            <span className="detail-label">IFSC Code</span>
                            <span className="detail-value">{account.ifscCode}</span>
                          </div>
                        </div>
                        <div className="detail-item">
                          <Building2 size={14} />
                          <div>
                            <span className="detail-label">Branch</span>
                            <span className="detail-value">{account.branch}</span>
                          </div>
                        </div>
                      </div>

                      {account.swiftCode && (
                        <div className="detail-row">
                          <div className="detail-item full-width">
                            <Building2 size={14} />
                            <div>
                              <span className="detail-label">SWIFT Code</span>
                              <span className="detail-value">{account.swiftCode}</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="bank-card-balance">
                      <span className="balance-label">Current Balance</span>
                      <h3 className="balance-amount">
                        {formatCurrency(account.balance)}
                      </h3>
                      {account.connectionStatus === 'connected' && account.lastSynced && (
                        <span className="sync-status">
                          <Clock size={12} />
                          Last synced: {account.lastSynced}
                        </span>
                      )}
                    </div>

                    {/* Quick Actions on Hover */}
                    {isHovered && (
                      <div className="bank-card-actions-advanced">
                        <button 
                          className="action-btn primary"
                          onClick={() => {
                            setSelectedAccount(account.id);
                            setViewMode('transactions');
                          }}
                        >
                          <FileText size={16} />
                          View Transactions
                        </button>
                        <button className="action-btn">
                          <Eye size={16} />
                          Statement
                        </button>
                        <button className="action-btn">
                          <Edit size={16} />
                          Edit
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Table View */}
          {cardView === 'table' && (
            <div className="bank-table-container-advanced">
              <table className="bank-table-advanced">
                <thead>
                  <tr>
                    <th>Bank Details</th>
                    <th>Account Number</th>
                    <th>IFSC Code</th>
                    <th>Type</th>
                    <th>Balance</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {bankAccounts.map(account => {
                    const statusConfig = getStatusConfig(account.status);
                    const isHovered = hoveredAccountId === account.id;

                    return (
                      <tr
                        key={account.id}
                        className="bank-table-row-advanced"
                        onMouseEnter={() => setHoveredAccountId(account.id)}
                        onMouseLeave={() => setHoveredAccountId(null)}
                      >
                        <td>
                          <div className="bank-name-cell">
                            <Building2 size={20} />
                            <div>
                              <span className="bank-name">{account.bankName}</span>
                              <span className="bank-branch">{account.branch}</span>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="account-cell">
                            <span className="account-num">{formatAccountNumber(account.accountNumber)}</span>
                            <span className="account-holder-small">{account.accountHolderName}</span>
                          </div>
                        </td>
                        <td>
                          <span className="ifsc-code">{account.ifscCode}</span>
                        </td>
                        <td>{account.accountType}</td>
                        <td>
                          <span className="table-balance-large">
                            {formatCurrency(account.balance)}
                          </span>
                        </td>
                        <td>
                          <span className={`status-pill ${statusConfig.class}`}>
                            {statusConfig.icon}
                            {statusConfig.label}
                          </span>
                        </td>
                        <td>
                          {isHovered && (
                            <div className="table-actions">
                              <button 
                                className="icon-btn primary"
                                onClick={() => {
                                  setSelectedAccount(account.id);
                                  setViewMode('transactions');
                                }}
                                title="View Transactions"
                              >
                                <FileText size={16} />
                              </button>
                              <button className="icon-btn" title="View Statement">
                                <Eye size={16} />
                              </button>
                              <button className="icon-btn" title="Edit">
                                <Edit size={16} />
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}

      {/* Transactions Mode */}
      {viewMode === 'transactions' && (
        <div className="transactions-view">
          {/* Transactions Header */}
          <div className="transactions-header">
            <div>
              <h2>Transaction History</h2>
              {selectedAccountData && (
                <p>
                  {selectedAccountData.bankName} - {formatAccountNumber(selectedAccountData.accountNumber)}
                  <button 
                    className="clear-filter-btn"
                    onClick={() => setSelectedAccount(null)}
                  >
                    View All Accounts
                  </button>
                </p>
              )}
            </div>
            <div className="transactions-header-actions">
              <button className="btn-secondary">
                <Upload size={18} />
                Import
              </button>
              <button className="btn-secondary">
                <Download size={18} />
                Export
              </button>
              <button className="btn-primary">
                <Plus size={18} />
                Add Transaction
              </button>
            </div>
          </div>

          {/* Transaction Stats */}
          <div className="transaction-stats">
            <div className="stat-item">
              <div className="stat-icon sent">
                <ArrowUpRight size={20} />
              </div>
              <div>
                <p className="stat-label">Total Sent</p>
                <h3 className="stat-value">{formatCurrency(totalSent)}</h3>
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-icon received">
                <ArrowDownLeft size={20} />
              </div>
              <div>
                <p className="stat-label">Total Received</p>
                <h3 className="stat-value">{formatCurrency(totalReceived)}</h3>
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-icon balance">
                <TrendingUp size={20} />
              </div>
              <div>
                <p className="stat-label">Net Flow</p>
                <h3 className={`stat-value ${totalReceived - totalSent >= 0 ? 'positive' : 'negative'}`}>
                  {formatCurrency(totalReceived - totalSent)}
                </h3>
              </div>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="transactions-controls">
            <div className="search-bar">
              <Search size={18} />
              <input
                type="text"
                placeholder="Search by description, reference, or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="filter-buttons">
              <button
                className={`filter-btn ${filterType === 'all' ? 'active' : ''}`}
                onClick={() => setFilterType('all')}
              >
                All
              </button>
              <button
                className={`filter-btn ${filterType === 'received' ? 'active' : ''}`}
                onClick={() => setFilterType('received')}
              >
                <ArrowDownLeft size={16} />
                Received
              </button>
              <button
                className={`filter-btn ${filterType === 'sent' ? 'active' : ''}`}
                onClick={() => setFilterType('sent')}
              >
                <ArrowUpRight size={16} />
                Sent
              </button>
            </div>
          </div>

          {/* Transactions List */}
          <div className="transactions-list">
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map(txn => (
                <div key={txn.id} className={`transaction-item ${txn.transactionType}`}>
                  <div className="transaction-icon-wrapper">
                    {getTransactionIcon(txn.transactionType)}
                  </div>

                  <div className="transaction-details">
                    <div className="transaction-main">
                      <h4>{txn.description}</h4>
                      <p className="transaction-party">
                        {txn.transactionType === 'sent' && txn.recipientName && (
                          <>To: {txn.recipientName}</>
                        )}
                        {txn.transactionType === 'received' && txn.senderName && (
                          <>From: {txn.senderName}</>
                        )}
                      </p>
                    </div>
                    <div className="transaction-meta">
                      <span className="transaction-category">{txn.category}</span>
                      <span className="transaction-reference">Ref: {txn.reference}</span>
                      <span className="transaction-method">{txn.paymentMethod}</span>
                      {txn.notes && (
                        <span className="transaction-notes" title={txn.notes}>
                          <FileText size={12} />
                          {txn.notes}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="transaction-amount-section">
                    <span className={`transaction-amount ${txn.transactionType}`}>
                      {txn.transactionType === 'sent' && '- '}
                      {txn.transactionType === 'received' && '+ '}
                      {formatCurrency(txn.amount)}
                    </span>
                    <span className="transaction-date">{txn.transactionDate}</span>
                    <span className={`transaction-status ${getTransactionStatusClass(txn.status)}`}>
                      {txn.status}
                    </span>
                  </div>

                  {txn.attachments && (
                    <div className="transaction-attachments">
                      <FileText size={14} />
                      <span>{txn.attachments} attachment(s)</span>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="no-transactions">
                <FileText size={48} />
                <h3>No transactions found</h3>
                <p>Try adjusting your search or filter criteria</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Statements Mode */}
      {viewMode === 'statements' && (
        <div className="statements-view">
          <div className="statements-header">
            <h2>Bank Statements</h2>
            <p>Download and manage your bank statements</p>
          </div>
          <div className="statements-grid">
            {bankAccounts.map(account => (
              <div key={account.id} className="statement-card">
                <div className="statement-card-header">
                  <Building2 size={24} />
                  <div>
                    <h4>{account.bankName}</h4>
                    <p>{formatAccountNumber(account.accountNumber)}</p>
                  </div>
                </div>
                <div className="statement-actions">
                  <button className="btn-secondary">
                    <Calendar size={16} />
                    Select Date Range
                  </button>
                  <button className="btn-primary">
                    <Download size={16} />
                    Download PDF
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BankAccounts;
