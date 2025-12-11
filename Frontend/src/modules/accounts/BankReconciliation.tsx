import React, { useState } from 'react';
import { 
  CheckCircle, XCircle, AlertCircle, Upload, Download, RefreshCw,
  FileText, Calendar, DollarSign, Filter, Search, ArrowRight,
  Check, X, Eye, Edit2, Trash2, Clock, TrendingUp, TrendingDown
} from 'lucide-react';
import './BankReconciliation.css';

interface ReconciliationItem {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'credit' | 'debit';
  status: 'matched' | 'unmatched' | 'disputed' | 'pending';
  bankReference?: string;
  bookReference?: string;
  matchedWith?: string;
  difference?: number;
}

interface ReconciliationStatement {
  id: string;
  accountId: string;
  accountName: string;
  statementDate: string;
  openingBalance: number;
  closingBalance: number;
  totalCredits: number;
  totalDebits: number;
  status: 'in-progress' | 'completed' | 'draft';
  matchedCount: number;
  unmatchedCount: number;
  lastUpdated: string;
}

const BankReconciliation: React.FC = () => {
  const [selectedAccount, setSelectedAccount] = useState<string>('acc1');
  const [reconciliationMode, setReconciliationMode] = useState<'auto' | 'manual'>('auto');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'matched' | 'unmatched' | 'disputed'>('all');
  const [showStatementUpload, setShowStatementUpload] = useState(false);

  const [statements] = useState<ReconciliationStatement[]>([
    {
      id: 'rec1',
      accountId: 'acc1',
      accountName: 'Primary Business Account',
      statementDate: '2024-11-30',
      openingBalance: 2500000,
      closingBalance: 2847650.50,
      totalCredits: 1050000,
      totalDebits: 702349.50,
      status: 'in-progress',
      matchedCount: 45,
      unmatchedCount: 8,
      lastUpdated: '2024-12-05T10:30:00'
    },
    {
      id: 'rec2',
      accountId: 'acc2',
      accountName: 'Payroll Account',
      statementDate: '2024-11-30',
      openingBalance: 1800000,
      closingBalance: 1523400,
      totalCredits: 650000,
      totalDebits: 926600,
      status: 'completed',
      matchedCount: 38,
      unmatchedCount: 0,
      lastUpdated: '2024-12-01T16:45:00'
    }
  ]);

  const [reconciliationItems] = useState<ReconciliationItem[]>([
    {
      id: 'item1',
      date: '2024-12-05',
      description: 'Payment to TechVendor Solutions',
      amount: 125000,
      type: 'debit',
      status: 'matched',
      bankReference: 'HDFC240512345678',
      bookReference: 'INV-2024-1234'
    },
    {
      id: 'item2',
      date: '2024-12-05',
      description: 'Payment from Client ABC',
      amount: 350000,
      type: 'credit',
      status: 'matched',
      bankReference: 'ICIC240598765432',
      bookReference: 'INV-CLI-5678'
    },
    {
      id: 'item3',
      date: '2024-12-04',
      description: 'Bank charges - maintenance',
      amount: 500,
      type: 'debit',
      status: 'unmatched',
      bankReference: 'HDFC240487654321'
    },
    {
      id: 'item4',
      date: '2024-12-03',
      description: 'Interest credited',
      amount: 2850,
      type: 'credit',
      status: 'unmatched',
      bankReference: 'HDFC240376543210'
    },
    {
      id: 'item5',
      date: '2024-12-02',
      description: 'Cheque bounce charges',
      amount: 750,
      type: 'debit',
      status: 'disputed',
      bankReference: 'HDFC240265432109',
      difference: 750
    },
    {
      id: 'item6',
      date: '2024-12-01',
      description: 'Payment from Client XYZ - Partial',
      amount: 275000,
      type: 'credit',
      status: 'disputed',
      bankReference: 'SBIN240354321098',
      bookReference: 'INV-CLI-9012',
      difference: 5000
    }
  ]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const filteredItems = reconciliationItems.filter(item => {
    const matchesSearch = searchQuery === '' || 
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.bankReference?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.bookReference?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || item.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const currentStatement = statements.find(s => s.accountId === selectedAccount);

  return (
    <div className="bank-reconciliation">
      {/* Header */}
      <div className="reconciliation-header">
        <div className="header-left">
          <CheckCircle className="header-icon" size={32} />
          <div>
            <h1>Bank Reconciliation</h1>
            <p>Match bank statements with recorded transactions</p>
          </div>
        </div>
        <div className="header-actions">
          <button className="btn-secondary" onClick={() => setShowStatementUpload(true)}>
            <Upload size={18} />
            Upload Statement
          </button>
          <button className="btn-secondary">
            <Download size={18} />
            Export Report
          </button>
          <button className="btn-primary">
            <RefreshCw size={18} />
            Auto Reconcile
          </button>
        </div>
      </div>

      {/* Account Selector & Summary */}
      <div className="reconciliation-summary">
        <div className="account-selector">
          <label>Select Account</label>
          <select value={selectedAccount} onChange={(e) => setSelectedAccount(e.target.value)}>
            <option value="acc1">Primary Business Account - HDFC Bank</option>
            <option value="acc2">Payroll Account - ICICI Bank</option>
            <option value="acc3">Reserve Fund - SBI</option>
            <option value="acc4">Vendor Payments - Axis Bank</option>
          </select>
        </div>

        {currentStatement && (
          <div className="summary-cards">
            <div className="summary-card">
              <div className="summary-label">Opening Balance</div>
              <div className="summary-value">{formatCurrency(currentStatement.openingBalance)}</div>
            </div>
            <div className="summary-card">
              <div className="summary-icon success">
                <TrendingUp size={20} />
              </div>
              <div className="summary-content">
                <div className="summary-label">Total Credits</div>
                <div className="summary-value positive">{formatCurrency(currentStatement.totalCredits)}</div>
              </div>
            </div>
            <div className="summary-card">
              <div className="summary-icon danger">
                <TrendingDown size={20} />
              </div>
              <div className="summary-content">
                <div className="summary-label">Total Debits</div>
                <div className="summary-value negative">{formatCurrency(currentStatement.totalDebits)}</div>
              </div>
            </div>
            <div className="summary-card">
              <div className="summary-label">Closing Balance</div>
              <div className="summary-value">{formatCurrency(currentStatement.closingBalance)}</div>
            </div>
          </div>
        )}
      </div>

      {/* Status Overview */}
      <div className="status-overview">
        <div className="status-card matched">
          <CheckCircle size={24} />
          <div>
            <div className="status-count">{currentStatement?.matchedCount || 0}</div>
            <div className="status-label">Matched</div>
          </div>
        </div>
        <div className="status-card unmatched">
          <AlertCircle size={24} />
          <div>
            <div className="status-count">{currentStatement?.unmatchedCount || 0}</div>
            <div className="status-label">Unmatched</div>
          </div>
        </div>
        <div className="status-card disputed">
          <XCircle size={24} />
          <div>
            <div className="status-count">{reconciliationItems.filter(i => i.status === 'disputed').length}</div>
            <div className="status-label">Disputed</div>
          </div>
        </div>
        <div className="status-card pending">
          <Clock size={24} />
          <div>
            <div className="status-count">{reconciliationItems.filter(i => i.status === 'pending').length}</div>
            <div className="status-label">Pending Review</div>
          </div>
        </div>
      </div>

      {/* Mode Toggle */}
      <div className="reconciliation-modes">
        <button 
          className={`mode-btn ${reconciliationMode === 'auto' ? 'active' : ''}`}
          onClick={() => setReconciliationMode('auto')}
        >
          <RefreshCw size={18} />
          Auto Match
        </button>
        <button 
          className={`mode-btn ${reconciliationMode === 'manual' ? 'active' : ''}`}
          onClick={() => setReconciliationMode('manual')}
        >
          <Edit2 size={18} />
          Manual Match
        </button>
      </div>

      {/* Filters & Search */}
      <div className="reconciliation-filters">
        <div className="search-box">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search by description or reference..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="filter-buttons">
          <button 
            className={`filter-btn ${filterStatus === 'all' ? 'active' : ''}`}
            onClick={() => setFilterStatus('all')}
          >
            All
          </button>
          <button 
            className={`filter-btn ${filterStatus === 'matched' ? 'active' : ''}`}
            onClick={() => setFilterStatus('matched')}
          >
            <CheckCircle size={16} />
            Matched
          </button>
          <button 
            className={`filter-btn ${filterStatus === 'unmatched' ? 'active' : ''}`}
            onClick={() => setFilterStatus('unmatched')}
          >
            <AlertCircle size={16} />
            Unmatched
          </button>
          <button 
            className={`filter-btn ${filterStatus === 'disputed' ? 'active' : ''}`}
            onClick={() => setFilterStatus('disputed')}
          >
            <XCircle size={16} />
            Disputed
          </button>
        </div>
      </div>

      {/* Reconciliation Items */}
      <div className="reconciliation-items">
        {filteredItems.length === 0 ? (
          <div className="empty-state">
            <FileText size={48} />
            <h3>No items found</h3>
            <p>Try adjusting your filters or search query</p>
          </div>
        ) : (
          filteredItems.map(item => (
            <div key={item.id} className={`reconciliation-item ${item.status}`}>
              <div className="item-status-indicator">
                {item.status === 'matched' && <CheckCircle size={20} />}
                {item.status === 'unmatched' && <AlertCircle size={20} />}
                {item.status === 'disputed' && <XCircle size={20} />}
                {item.status === 'pending' && <Clock size={20} />}
              </div>

              <div className="item-content">
                <div className="item-header">
                  <div className="item-description">
                    <h4>{item.description}</h4>
                    <span className={`item-type ${item.type}`}>
                      {item.type === 'credit' ? '↓ Credit' : '↑ Debit'}
                    </span>
                  </div>
                  <div className={`item-amount ${item.type}`}>
                    {item.type === 'debit' ? '-' : '+'}
                    {formatCurrency(item.amount)}
                  </div>
                </div>

                <div className="item-details">
                  <div className="detail-row">
                    <Calendar size={14} />
                    <span>{formatDate(item.date)}</span>
                  </div>
                  {item.bankReference && (
                    <div className="detail-row">
                      <FileText size={14} />
                      <span>Bank: {item.bankReference}</span>
                    </div>
                  )}
                  {item.bookReference && (
                    <div className="detail-row">
                      <FileText size={14} />
                      <span>Book: {item.bookReference}</span>
                    </div>
                  )}
                  {item.difference !== undefined && (
                    <div className="detail-row difference">
                      <AlertCircle size={14} />
                      <span>Difference: {formatCurrency(item.difference)}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="item-actions">
                {item.status === 'matched' && (
                  <button className="action-btn view">
                    <Eye size={16} />
                  </button>
                )}
                {(item.status === 'unmatched' || item.status === 'disputed') && (
                  <>
                    <button className="action-btn match">
                      <Check size={16} />
                      Match
                    </button>
                    <button className="action-btn edit">
                      <Edit2 size={16} />
                    </button>
                  </>
                )}
                {item.status === 'pending' && (
                  <button className="action-btn approve">
                    <ArrowRight size={16} />
                    Review
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Statement Upload Modal */}
      {showStatementUpload && (
        <div className="modal-overlay" onClick={() => setShowStatementUpload(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Upload Bank Statement</h2>
              <button className="modal-close" onClick={() => setShowStatementUpload(false)}>
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="upload-area">
                <Upload size={48} />
                <h3>Drop your bank statement here</h3>
                <p>Supported formats: CSV, Excel, PDF</p>
                <button className="btn-primary">
                  Choose File
                </button>
              </div>
              <div className="upload-instructions">
                <h4>Instructions:</h4>
                <ul>
                  <li>Download bank statement from your bank's online portal</li>
                  <li>Ensure the statement includes date, description, and amount columns</li>
                  <li>System will automatically match transactions</li>
                  <li>Review and approve matched items</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BankReconciliation;
