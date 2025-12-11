import React, { useState } from 'react';
import { 
  Repeat, Plus, Edit2, Trash2, Play, Pause, Calendar, DollarSign,
  Clock, TrendingUp, ArrowRight, CheckCircle, XCircle, AlertCircle,
  Search, Filter, Download, Eye, MoreVertical, Copy
} from 'lucide-react';
import './RecurringTransactions.css';

interface RecurringTransaction {
  id: string;
  name: string;
  description: string;
  accountId: string;
  accountName: string;
  transactionType: 'sent' | 'received';
  amount: number;
  frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly';
  startDate: string;
  endDate?: string;
  nextOccurrence: string;
  lastExecuted?: string;
  category: string;
  paymentMethod: string;
  status: 'active' | 'paused' | 'completed' | 'failed';
  autoApprove: boolean;
  executionCount: number;
  totalAmount: number;
  toAccount?: string;
  fromAccount?: string;
  tags: string[];
}

const RecurringTransactions: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'paused' | 'completed'>('all');
  const [showAddModal, setShowAddModal] = useState(false);

  const [recurringTransactions] = useState<RecurringTransaction[]>([
    {
      id: 'rec1',
      name: 'Office Rent Payment',
      description: 'Monthly office rent for Business Tower, MG Road',
      accountId: 'acc1',
      accountName: 'Primary Business Account',
      transactionType: 'sent',
      amount: 180000,
      frequency: 'monthly',
      startDate: '2024-01-01',
      nextOccurrence: '2024-12-15',
      lastExecuted: '2024-11-15',
      category: 'Rent',
      paymentMethod: 'NEFT',
      status: 'active',
      autoApprove: true,
      executionCount: 11,
      totalAmount: 1980000,
      toAccount: 'Property Management Ltd - 55566677788',
      tags: ['rent', 'office', 'monthly']
    },
    {
      id: 'rec2',
      name: 'Employee Salary Disbursement',
      description: 'Monthly salary payment to all employees',
      accountId: 'acc2',
      accountName: 'Payroll Account',
      transactionType: 'sent',
      amount: 850000,
      frequency: 'monthly',
      startDate: '2024-01-01',
      nextOccurrence: '2024-12-28',
      lastExecuted: '2024-11-28',
      category: 'Payroll',
      paymentMethod: 'NEFT',
      status: 'active',
      autoApprove: false,
      executionCount: 11,
      totalAmount: 9350000,
      tags: ['payroll', 'salary', 'monthly']
    },
    {
      id: 'rec3',
      name: 'Software License Subscription',
      description: 'Annual software license renewal - Enterprise Suite',
      accountId: 'acc1',
      accountName: 'Primary Business Account',
      transactionType: 'sent',
      amount: 125000,
      frequency: 'yearly',
      startDate: '2024-01-10',
      nextOccurrence: '2025-01-10',
      lastExecuted: '2024-01-10',
      category: 'Software',
      paymentMethod: 'RTGS',
      status: 'active',
      autoApprove: true,
      executionCount: 1,
      totalAmount: 125000,
      toAccount: 'TechVendor Solutions - 98765432109',
      tags: ['software', 'license', 'yearly']
    },
    {
      id: 'rec4',
      name: 'Utility Bills Payment',
      description: 'Monthly electricity and water bill payment',
      accountId: 'acc4',
      accountName: 'Vendor Payments',
      transactionType: 'sent',
      amount: 45000,
      frequency: 'monthly',
      startDate: '2024-01-05',
      nextOccurrence: '2024-12-05',
      lastExecuted: '2024-11-05',
      category: 'Utilities',
      paymentMethod: 'Online',
      status: 'active',
      autoApprove: true,
      executionCount: 11,
      totalAmount: 495000,
      tags: ['utilities', 'bills', 'monthly']
    },
    {
      id: 'rec5',
      name: 'Investment - Mutual Fund SIP',
      description: 'Systematic Investment Plan in diversified equity funds',
      accountId: 'acc1',
      accountName: 'Primary Business Account',
      transactionType: 'sent',
      amount: 500000,
      frequency: 'monthly',
      startDate: '2024-01-01',
      endDate: '2025-12-31',
      nextOccurrence: '2024-12-01',
      lastExecuted: '2024-11-01',
      category: 'Investment',
      paymentMethod: 'RTGS',
      status: 'active',
      autoApprove: true,
      executionCount: 11,
      totalAmount: 5500000,
      toAccount: 'HDFC Mutual Fund',
      tags: ['investment', 'sip', 'monthly']
    },
    {
      id: 'rec6',
      name: 'Internet & Broadband',
      description: 'Monthly internet service charges',
      accountId: 'acc4',
      accountName: 'Vendor Payments',
      transactionType: 'sent',
      amount: 5000,
      frequency: 'monthly',
      startDate: '2024-01-01',
      nextOccurrence: '2024-12-10',
      lastExecuted: '2024-11-10',
      category: 'Internet',
      paymentMethod: 'Online',
      status: 'active',
      autoApprove: true,
      executionCount: 11,
      totalAmount: 55000,
      tags: ['internet', 'monthly']
    },
    {
      id: 'rec7',
      name: 'GST Payment',
      description: 'Monthly GST payment to government',
      accountId: 'acc1',
      accountName: 'Primary Business Account',
      transactionType: 'sent',
      amount: 158900,
      frequency: 'monthly',
      startDate: '2024-01-20',
      nextOccurrence: '2024-12-20',
      lastExecuted: '2024-11-20',
      category: 'Tax',
      paymentMethod: 'Online',
      status: 'active',
      autoApprove: false,
      executionCount: 11,
      totalAmount: 1747900,
      tags: ['tax', 'gst', 'compliance']
    },
    {
      id: 'rec8',
      name: 'Insurance Premium',
      description: 'Quarterly business insurance premium',
      accountId: 'acc1',
      accountName: 'Primary Business Account',
      transactionType: 'sent',
      amount: 75000,
      frequency: 'quarterly',
      startDate: '2024-01-15',
      nextOccurrence: '2025-01-15',
      lastExecuted: '2024-10-15',
      category: 'Insurance',
      paymentMethod: 'NEFT',
      status: 'active',
      autoApprove: true,
      executionCount: 4,
      totalAmount: 300000,
      tags: ['insurance', 'quarterly']
    },
    {
      id: 'rec9',
      name: 'Old Subscription Service',
      description: 'Completed subscription - no longer active',
      accountId: 'acc1',
      accountName: 'Primary Business Account',
      transactionType: 'sent',
      amount: 15000,
      frequency: 'monthly',
      startDate: '2023-01-01',
      endDate: '2024-06-30',
      nextOccurrence: '2024-07-01',
      lastExecuted: '2024-06-01',
      category: 'Subscription',
      paymentMethod: 'Online',
      status: 'completed',
      autoApprove: true,
      executionCount: 18,
      totalAmount: 270000,
      tags: ['subscription', 'completed']
    },
    {
      id: 'rec10',
      name: 'Paused - Market Research Subscription',
      description: 'Temporarily paused market research tool',
      accountId: 'acc1',
      accountName: 'Primary Business Account',
      transactionType: 'sent',
      amount: 25000,
      frequency: 'monthly',
      startDate: '2024-01-01',
      nextOccurrence: '2024-12-01',
      lastExecuted: '2024-09-01',
      category: 'Subscription',
      paymentMethod: 'Online',
      status: 'paused',
      autoApprove: true,
      executionCount: 9,
      totalAmount: 225000,
      tags: ['subscription', 'paused']
    }
  ]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const getFrequencyLabel = (frequency: string) => {
    const labels = {
      daily: 'Daily',
      weekly: 'Weekly',
      monthly: 'Monthly',
      quarterly: 'Quarterly',
      yearly: 'Yearly'
    };
    return labels[frequency as keyof typeof labels];
  };

  const filteredTransactions = recurringTransactions.filter(txn => {
    const matchesSearch = searchQuery === '' || 
      txn.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      txn.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      txn.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || txn.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const activeCount = recurringTransactions.filter(t => t.status === 'active').length;
  const pausedCount = recurringTransactions.filter(t => t.status === 'paused').length;
  const totalMonthlyAmount = recurringTransactions
    .filter(t => t.status === 'active' && t.frequency === 'monthly')
    .reduce((sum, t) => sum + t.amount, 0);
  const upcomingCount = recurringTransactions.filter(t => {
    const nextDate = new Date(t.nextOccurrence);
    const today = new Date();
    const diffDays = Math.ceil((nextDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return diffDays <= 7 && t.status === 'active';
  }).length;

  return (
    <div className="recurring-transactions">
      {/* Header */}
      <div className="recurring-header">
        <div className="header-left">
          <Repeat className="header-icon" size={32} />
          <div>
            <h1>Recurring Transactions</h1>
            <p>Automate regular payments and collections</p>
          </div>
        </div>
        <div className="header-actions">
          <button className="btn-secondary">
            <Download size={18} />
            Export
          </button>
          <button className="btn-primary" onClick={() => setShowAddModal(true)}>
            <Plus size={18} />
            Add Recurring Transaction
          </button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="recurring-stats">
        <div className="stat-card">
          <div className="stat-icon active">
            <CheckCircle size={24} />
          </div>
          <div className="stat-content">
            <div className="stat-label">Active Recurring</div>
            <div className="stat-value">{activeCount}</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon paused">
            <Pause size={24} />
          </div>
          <div className="stat-content">
            <div className="stat-label">Paused</div>
            <div className="stat-value">{pausedCount}</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon monthly">
            <DollarSign size={24} />
          </div>
          <div className="stat-content">
            <div className="stat-label">Monthly Commitment</div>
            <div className="stat-value">{formatCurrency(totalMonthlyAmount)}</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon upcoming">
            <Clock size={24} />
          </div>
          <div className="stat-content">
            <div className="stat-label">Due in 7 Days</div>
            <div className="stat-value">{upcomingCount}</div>
          </div>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="recurring-filters">
        <div className="search-box">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search by name, description, or category..."
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
            className={`filter-btn ${filterStatus === 'active' ? 'active' : ''}`}
            onClick={() => setFilterStatus('active')}
          >
            <CheckCircle size={16} />
            Active
          </button>
          <button 
            className={`filter-btn ${filterStatus === 'paused' ? 'active' : ''}`}
            onClick={() => setFilterStatus('paused')}
          >
            <Pause size={16} />
            Paused
          </button>
          <button 
            className={`filter-btn ${filterStatus === 'completed' ? 'active' : ''}`}
            onClick={() => setFilterStatus('completed')}
          >
            <CheckCircle size={16} />
            Completed
          </button>
        </div>
      </div>

      {/* Recurring Transactions List */}
      <div className="recurring-list">
        {filteredTransactions.length === 0 ? (
          <div className="empty-state">
            <Repeat size={48} />
            <h3>No recurring transactions found</h3>
            <p>Create your first recurring transaction to automate regular payments</p>
            <button className="btn-primary" onClick={() => setShowAddModal(true)}>
              <Plus size={18} />
              Add Recurring Transaction
            </button>
          </div>
        ) : (
          filteredTransactions.map(txn => (
            <div key={txn.id} className={`recurring-item ${txn.status}`}>
              <div className="item-left">
                <div className={`item-status-icon ${txn.status}`}>
                  {txn.status === 'active' && <CheckCircle size={20} />}
                  {txn.status === 'paused' && <Pause size={20} />}
                  {txn.status === 'completed' && <CheckCircle size={20} />}
                  {txn.status === 'failed' && <XCircle size={20} />}
                </div>

                <div className="item-content">
                  <div className="item-header">
                    <h3>{txn.name}</h3>
                    <div className="item-badges">
                      <span className={`status-badge ${txn.status}`}>
                        {txn.status}
                      </span>
                      <span className="frequency-badge">
                        <Repeat size={12} />
                        {getFrequencyLabel(txn.frequency)}
                      </span>
                      {txn.autoApprove && (
                        <span className="auto-approve-badge">
                          Auto-approve
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="item-description">{txn.description}</p>

                  <div className="item-details">
                    <div className="detail-item">
                      <DollarSign size={14} />
                      <span>{formatCurrency(txn.amount)}</span>
                    </div>
                    <div className="detail-item">
                      <Calendar size={14} />
                      <span>Next: {formatDate(txn.nextOccurrence)}</span>
                    </div>
                    {txn.lastExecuted && (
                      <div className="detail-item">
                        <Clock size={14} />
                        <span>Last: {formatDate(txn.lastExecuted)}</span>
                      </div>
                    )}
                    <div className="detail-item">
                      <TrendingUp size={14} />
                      <span>{txn.executionCount} executions • {formatCurrency(txn.totalAmount)} total</span>
                    </div>
                  </div>

                  {txn.tags.length > 0 && (
                    <div className="item-tags">
                      {txn.tags.map(tag => (
                        <span key={tag} className="tag">{tag}</span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="item-actions">
                {txn.status === 'active' && (
                  <button className="action-btn pause" title="Pause">
                    <Pause size={16} />
                  </button>
                )}
                {txn.status === 'paused' && (
                  <button className="action-btn resume" title="Resume">
                    <Play size={16} />
                  </button>
                )}
                <button className="action-btn view" title="View Details">
                  <Eye size={16} />
                </button>
                <button className="action-btn edit" title="Edit">
                  <Edit2 size={16} />
                </button>
                <button className="action-btn copy" title="Duplicate">
                  <Copy size={16} />
                </button>
                <button className="action-btn more" title="More">
                  <MoreVertical size={16} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add Recurring Transaction Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-content large" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Add Recurring Transaction</h2>
              <button className="modal-close" onClick={() => setShowAddModal(false)}>
                ×
              </button>
            </div>
            <div className="modal-body">
              <form className="recurring-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Transaction Name *</label>
                    <input type="text" placeholder="e.g., Office Rent Payment" />
                  </div>
                  <div className="form-group">
                    <label>Category *</label>
                    <select>
                      <option value="">Select category</option>
                      <option value="rent">Rent</option>
                      <option value="payroll">Payroll</option>
                      <option value="utilities">Utilities</option>
                      <option value="subscription">Subscription</option>
                      <option value="insurance">Insurance</option>
                      <option value="tax">Tax</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>Description</label>
                  <textarea rows={3} placeholder="Add details about this recurring transaction..."></textarea>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Account *</label>
                    <select>
                      <option value="">Select account</option>
                      <option value="acc1">Primary Business Account</option>
                      <option value="acc2">Payroll Account</option>
                      <option value="acc3">Reserve Fund</option>
                      <option value="acc4">Vendor Payments</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Transaction Type *</label>
                    <select>
                      <option value="sent">Money Sent</option>
                      <option value="received">Money Received</option>
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Amount *</label>
                    <input type="number" placeholder="0.00" />
                  </div>
                  <div className="form-group">
                    <label>Payment Method *</label>
                    <select>
                      <option value="neft">NEFT</option>
                      <option value="rtgs">RTGS</option>
                      <option value="imps">IMPS</option>
                      <option value="upi">UPI</option>
                      <option value="cheque">Cheque</option>
                      <option value="online">Online</option>
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Frequency *</label>
                    <select>
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                      <option value="quarterly">Quarterly</option>
                      <option value="yearly">Yearly</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Start Date *</label>
                    <input type="date" />
                  </div>
                  <div className="form-group">
                    <label>End Date (Optional)</label>
                    <input type="date" />
                  </div>
                </div>

                <div className="form-group">
                  <label>To/From Account</label>
                  <input type="text" placeholder="e.g., Vendor Name - Account Number" />
                </div>

                <div className="form-group">
                  <label>Tags (comma separated)</label>
                  <input type="text" placeholder="e.g., rent, office, monthly" />
                </div>

                <div className="form-checkbox">
                  <input type="checkbox" id="autoApprove" />
                  <label htmlFor="autoApprove">
                    Auto-approve transactions (no manual approval required)
                  </label>
                </div>

                <div className="form-actions">
                  <button type="button" className="btn-secondary" onClick={() => setShowAddModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary">
                    <Plus size={18} />
                    Create Recurring Transaction
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecurringTransactions;
