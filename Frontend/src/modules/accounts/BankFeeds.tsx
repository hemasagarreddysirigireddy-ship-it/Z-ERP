import React, { useState } from 'react';
import { 
  Link2, 
  Plus, 
  Search,
  Download,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Eye,
  Settings,
  Upload,
  Mail,
  MessageSquare,
  History
} from 'lucide-react';
import './BankFeeds.css';

interface BankConnection {
  id: string;
  bankName: string;
  accountNumber: string;
  connectionType: 'API' | 'SMS' | 'Email' | 'Manual';
  status: 'connected' | 'disconnected' | 'error';
  lastSync: string;
  transactionsImported: number;
}

interface ImportedTransaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'credit' | 'debit';
  category: string;
  autoMatched: boolean;
  confidence: number;
  source: 'API' | 'SMS' | 'Email';
  status: 'pending' | 'approved' | 'rejected';
}

const BankFeeds: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'approved'>('all');
  const [showConnectModal, setShowConnectModal] = useState(false);

  const [connections] = useState<BankConnection[]>([
    {
      id: 'CON001',
      bankName: 'HDFC Bank',
      accountNumber: '12345678901',
      connectionType: 'API',
      status: 'connected',
      lastSync: '2023-12-01T14:30:00',
      transactionsImported: 245
    },
    {
      id: 'CON002',
      bankName: 'ICICI Bank',
      accountNumber: '98765432109',
      connectionType: 'SMS',
      status: 'connected',
      lastSync: '2023-12-01T13:15:00',
      transactionsImported: 189
    },
    {
      id: 'CON003',
      bankName: 'State Bank of India',
      accountNumber: '45678912345',
      connectionType: 'Email',
      status: 'error',
      lastSync: '2023-11-30T10:20:00',
      transactionsImported: 156
    }
  ]);

  const [importedTransactions] = useState<ImportedTransaction[]>([
    {
      id: 'IMP001',
      date: '2023-12-01',
      description: 'Payment received from ABC Corp',
      amount: 75000,
      type: 'credit',
      category: 'Customer Payments',
      autoMatched: true,
      confidence: 95,
      source: 'API',
      status: 'pending'
    },
    {
      id: 'IMP002',
      date: '2023-12-01',
      description: 'NEFT to XYZ Suppliers Ltd',
      amount: 45000,
      type: 'debit',
      category: 'Vendor Payments',
      autoMatched: true,
      confidence: 88,
      source: 'API',
      status: 'pending'
    },
    {
      id: 'IMP003',
      date: '2023-12-01',
      description: 'UPI payment for electricity bill',
      amount: 3500,
      type: 'debit',
      category: 'Utilities',
      autoMatched: true,
      confidence: 92,
      source: 'SMS',
      status: 'approved'
    },
    {
      id: 'IMP004',
      date: '2023-11-30',
      description: 'Cash deposit at branch',
      amount: 50000,
      type: 'credit',
      category: 'Cash Deposits',
      autoMatched: false,
      confidence: 65,
      source: 'Email',
      status: 'pending'
    },
    {
      id: 'IMP005',
      date: '2023-11-30',
      description: 'Salary payment - November',
      amount: 150000,
      type: 'debit',
      category: 'Payroll',
      autoMatched: true,
      confidence: 97,
      source: 'API',
      status: 'approved'
    },
    {
      id: 'IMP006',
      date: '2023-11-30',
      description: 'Interest credited',
      amount: 2450,
      type: 'credit',
      category: 'Interest Income',
      autoMatched: true,
      confidence: 100,
      source: 'API',
      status: 'approved'
    },
    {
      id: 'IMP007',
      date: '2023-11-29',
      description: 'Online purchase - Amazon',
      amount: 12500,
      type: 'debit',
      category: 'Office Supplies',
      autoMatched: false,
      confidence: 70,
      source: 'SMS',
      status: 'pending'
    },
    {
      id: 'IMP008',
      date: '2023-11-29',
      description: 'Customer payment INV-5678',
      amount: 95000,
      type: 'credit',
      category: 'Customer Payments',
      autoMatched: true,
      confidence: 93,
      source: 'API',
      status: 'approved'
    }
  ]);

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      'connected': 'status-success',
      'disconnected': 'status-warning',
      'error': 'status-error'
    };
    return colors[status] || 'status-default';
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'confidence-high';
    if (confidence >= 75) return 'confidence-medium';
    return 'confidence-low';
  };

  const filteredTransactions = importedTransactions.filter(txn => {
    const matchesSearch = 
      txn.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      txn.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || txn.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const handleSync = (connectionId: string) => {
    console.log(`Syncing connection ${connectionId}...`);
    alert('Sync initiated! New transactions will be imported.');
  };

  const handleApprove = (transactionId: string) => {
    console.log(`Approving transaction ${transactionId}...`);
    alert('Transaction approved and added to books!');
  };

  const handleReject = (transactionId: string) => {
    console.log(`Rejecting transaction ${transactionId}...`);
    alert('Transaction rejected!');
  };

  const pendingCount = importedTransactions.filter(t => t.status === 'pending').length;
  const autoMatchedCount = importedTransactions.filter(t => t.autoMatched).length;

  return (
    <div className="bank-feeds-container">
      {/* Header */}
      <div className="feeds-header">
        <div className="feeds-header-left">
          <div className="feeds-icon-main">
            <Link2 size={28} />
          </div>
          <div>
            <h1>Bank Feeds & Auto-Import</h1>
            <p>Automated transaction import from bank accounts</p>
          </div>
        </div>
        <div className="feeds-header-actions">
          <button 
            className="btn-primary"
            onClick={() => setShowConnectModal(true)}
          >
            <Plus size={18} />
            Connect Bank
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="feeds-stats">
        <div className="stat-card connected">
          <div className="stat-icon">
            <Link2 size={24} />
          </div>
          <div className="stat-content">
            <h3>{connections.filter(c => c.status === 'connected').length}</h3>
            <p>Connected Banks</p>
          </div>
        </div>

        <div className="stat-card pending">
          <div className="stat-icon">
            <AlertCircle size={24} />
          </div>
          <div className="stat-content">
            <h3>{pendingCount}</h3>
            <p>Pending Review</p>
          </div>
        </div>

        <div className="stat-card auto-matched">
          <div className="stat-icon">
            <CheckCircle size={24} />
          </div>
          <div className="stat-content">
            <h3>{autoMatchedCount}</h3>
            <p>Auto-Matched</p>
          </div>
        </div>

        <div className="stat-card total">
          <div className="stat-icon">
            <Download size={24} />
          </div>
          <div className="stat-content">
            <h3>{connections.reduce((sum, c) => sum + c.transactionsImported, 0)}</h3>
            <p>Total Imported</p>
          </div>
        </div>
      </div>

      {/* Bank Connections */}
      <div className="connections-section">
        <h2>Bank Connections</h2>
        <div className="connections-grid">
          {connections.map(conn => (
            <div key={conn.id} className="connection-card">
              <div className="connection-header">
                <div className="connection-info">
                  <h3>{conn.bankName}</h3>
                  <p className="account-number">••••{conn.accountNumber.slice(-4)}</p>
                </div>
                <span className={`connection-status ${getStatusColor(conn.status)}`}>
                  {conn.status === 'connected' && <CheckCircle size={16} />}
                  {conn.status === 'error' && <AlertCircle size={16} />}
                  {conn.status}
                </span>
              </div>

              <div className="connection-details">
                <div className="detail-item">
                  <span className="detail-label">Type:</span>
                  <span className="detail-value">{conn.connectionType}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Last Sync:</span>
                  <span className="detail-value">
                    {new Date(conn.lastSync).toLocaleString()}
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Transactions:</span>
                  <span className="detail-value">{conn.transactionsImported}</span>
                </div>
              </div>

              <div className="connection-actions">
                <button 
                  className="btn-sync"
                  onClick={() => handleSync(conn.id)}
                  disabled={conn.status !== 'connected'}
                >
                  <RefreshCw size={16} />
                  Sync Now
                </button>
                <button className="btn-settings">
                  <Settings size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Imported Transactions */}
      <div className="transactions-section">
        <div className="section-header">
          <h2>Imported Transactions</h2>
          <div className="filters-row">
            <div className="search-box">
              <Search size={18} />
              <input
                type="text"
                placeholder="Search transactions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <select 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="filter-select"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
            </select>
          </div>
        </div>

        <div className="transactions-table-container">
          <table className="transactions-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Amount</th>
                <th>Category</th>
                <th>Source</th>
                <th>Confidence</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map(txn => (
                <tr key={txn.id}>
                  <td>{new Date(txn.date).toLocaleDateString()}</td>
                  <td>
                    <div className="description-cell">
                      <strong>{txn.description}</strong>
                      {txn.autoMatched && (
                        <span className="auto-match-badge">
                          <CheckCircle size={12} />
                          Auto-matched
                        </span>
                      )}
                    </div>
                  </td>
                  <td>
                    <span className={`amount ${txn.type}`}>
                      {txn.type === 'credit' ? '+' : '-'} ₹{txn.amount.toLocaleString()}
                    </span>
                  </td>
                  <td>
                    <span className="category-badge">{txn.category}</span>
                  </td>
                  <td>
                    <span className="source-badge">{txn.source}</span>
                  </td>
                  <td>
                    <div className="confidence-cell">
                      <div className={`confidence-bar ${getConfidenceColor(txn.confidence)}`}>
                        <div 
                          className="confidence-fill"
                          style={{ width: `${txn.confidence}%` }}
                        ></div>
                      </div>
                      <span className="confidence-value">{txn.confidence}%</span>
                    </div>
                  </td>
                  <td>
                    <span className={`status-badge status-${txn.status}`}>
                      {txn.status}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      {txn.status === 'pending' && (
                        <>
                          <button 
                            className="btn-approve"
                            onClick={() => handleApprove(txn.id)}
                            title="Approve"
                          >
                            <CheckCircle size={16} />
                          </button>
                          <button 
                            className="btn-reject"
                            onClick={() => handleReject(txn.id)}
                            title="Reject"
                          >
                            <AlertCircle size={16} />
                          </button>
                        </>
                      )}
                      <button className="btn-view" title="View Details">
                        <Eye size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredTransactions.length === 0 && (
          <div className="no-transactions">
            <Download size={64} />
            <h3>No Transactions Found</h3>
            <p>Try adjusting your search or connect a bank account</p>
          </div>
        )}
      </div>

      {/* Import History */}
      <div className="import-history-section">
        <div className="section-header">
          <h2>
            <History size={20} />
            Import History
          </h2>
        </div>
        <div className="history-list">
          <div className="history-item">
            <div className="history-icon success">
              <CheckCircle size={20} />
            </div>
            <div className="history-content">
              <strong>Successful import from HDFC Bank</strong>
              <p>15 transactions imported via API</p>
              <span className="history-time">Today at 2:30 PM</span>
            </div>
          </div>
          <div className="history-item">
            <div className="history-icon success">
              <CheckCircle size={20} />
            </div>
            <div className="history-content">
              <strong>SMS import completed</strong>
              <p>8 transactions parsed from SMS messages</p>
              <span className="history-time">Today at 1:15 PM</span>
            </div>
          </div>
          <div className="history-item">
            <div className="history-icon error">
              <AlertCircle size={20} />
            </div>
            <div className="history-content">
              <strong>Import failed from SBI</strong>
              <p>Connection timeout - Please retry</p>
              <span className="history-time">Yesterday at 10:20 AM</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankFeeds;
