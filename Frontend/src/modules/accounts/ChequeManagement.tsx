import React, { useState } from 'react';
import { 
  FileText, Plus, Edit2, Trash2, Download, CheckCircle, XCircle, 
  AlertCircle, Clock, Calendar, DollarSign, Search, Filter, Hash,
  TrendingUp, Eye, MoreVertical, Printer
} from 'lucide-react';
import './ChequeManagement.css';

interface Cheque {
  id: string;
  chequeNumber: string;
  accountId: string;
  accountName: string;
  payeeName: string;
  amount: number;
  issueDate: string;
  chequeDate: string;
  clearanceDate?: string;
  status: 'issued' | 'deposited' | 'cleared' | 'bounced' | 'cancelled' | 'pdc';
  type: 'outgoing' | 'incoming';
  reference: string;
  notes: string;
  category: string;
  bankName: string;
}

const ChequeManagement: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'issued' | 'deposited' | 'cleared' | 'bounced' | 'pdc'>('all');
  const [showAddModal, setShowAddModal] = useState(false);

  const [cheques] = useState<Cheque[]>([
    {
      id: 'chq1',
      chequeNumber: '123456',
      accountId: 'acc1',
      accountName: 'Primary Business Account',
      payeeName: 'Property Management Ltd',
      amount: 180000,
      issueDate: '2024-12-01',
      chequeDate: '2024-12-15',
      clearanceDate: '2024-12-16',
      status: 'cleared',
      type: 'outgoing',
      reference: 'RENT-DEC-2024',
      notes: 'December rent payment',
      category: 'Rent',
      bankName: 'HDFC Bank'
    },
    {
      id: 'chq2',
      chequeNumber: '123457',
      accountId: 'acc1',
      accountName: 'Primary Business Account',
      payeeName: 'TechVendor Solutions',
      amount: 125000,
      issueDate: '2024-12-03',
      chequeDate: '2024-12-20',
      status: 'pdc',
      type: 'outgoing',
      reference: 'INV-2024-1234',
      notes: 'Software license - Post dated cheque',
      category: 'Vendor Payment',
      bankName: 'HDFC Bank'
    },
    {
      id: 'chq3',
      chequeNumber: '987654',
      accountId: 'acc1',
      accountName: 'Primary Business Account',
      payeeName: 'Client ABC Corporation',
      amount: 350000,
      issueDate: '2024-11-28',
      chequeDate: '2024-11-28',
      status: 'deposited',
      type: 'incoming',
      reference: 'INV-CLI-5678',
      notes: 'Payment for Project Phoenix Phase 2',
      category: 'Client Payment',
      bankName: 'ICICI Bank'
    },
    {
      id: 'chq4',
      chequeNumber: '123458',
      accountId: 'acc1',
      accountName: 'Primary Business Account',
      payeeName: 'Office Supplies Ltd',
      amount: 28450,
      issueDate: '2024-11-25',
      chequeDate: '2024-11-25',
      clearanceDate: '2024-11-27',
      status: 'cleared',
      type: 'outgoing',
      reference: 'PO-2024-789',
      notes: 'Office supplies purchase',
      category: 'Office Expenses',
      bankName: 'HDFC Bank'
    },
    {
      id: 'chq5',
      chequeNumber: '765432',
      accountId: 'acc2',
      accountName: 'Payroll Account',
      payeeName: 'Employee Benefit Fund',
      amount: 85000,
      issueDate: '2024-11-20',
      chequeDate: '2024-11-20',
      status: 'bounced',
      type: 'outgoing',
      reference: 'EMP-BEN-NOV',
      notes: 'Bounced due to insufficient funds - Reissued',
      category: 'Employee Benefits',
      bankName: 'ICICI Bank'
    },
    {
      id: 'chq6',
      chequeNumber: '123459',
      accountId: 'acc1',
      accountName: 'Primary Business Account',
      payeeName: 'Marketing Agency',
      amount: 95000,
      issueDate: '2024-12-05',
      chequeDate: '2024-12-05',
      status: 'issued',
      type: 'outgoing',
      reference: 'MARK-NOV-2024',
      notes: 'Marketing campaign payment - November',
      category: 'Marketing',
      bankName: 'HDFC Bank'
    },
    {
      id: 'chq7',
      chequeNumber: '123460',
      accountId: 'acc1',
      accountName: 'Primary Business Account',
      payeeName: 'Insurance Company',
      amount: 75000,
      issueDate: '2024-12-10',
      chequeDate: '2025-01-15',
      status: 'pdc',
      type: 'outgoing',
      reference: 'INS-Q1-2025',
      notes: 'Q1 2025 insurance premium - PDC',
      category: 'Insurance',
      bankName: 'HDFC Bank'
    },
    {
      id: 'chq8',
      chequeNumber: '555666',
      accountId: 'acc1',
      accountName: 'Primary Business Account',
      payeeName: 'Client XYZ Enterprises',
      amount: 275000,
      issueDate: '2024-11-30',
      chequeDate: '2024-11-30',
      clearanceDate: '2024-12-02',
      status: 'cleared',
      type: 'incoming',
      reference: 'INV-CLI-9012',
      notes: 'Consulting fees Q4 2024',
      category: 'Client Payment',
      bankName: 'SBI'
    },
    {
      id: 'chq9',
      chequeNumber: '123461',
      accountId: 'acc4',
      accountName: 'Vendor Payments',
      payeeName: 'Maintenance Services',
      amount: 35000,
      issueDate: '2024-12-02',
      chequeDate: '2024-12-25',
      status: 'pdc',
      type: 'outgoing',
      reference: 'MAINT-DEC-2024',
      notes: 'December maintenance - PDC',
      category: 'Maintenance',
      bankName: 'Axis Bank'
    },
    {
      id: 'chq10',
      chequeNumber: '123462',
      accountId: 'acc1',
      accountName: 'Primary Business Account',
      payeeName: 'Cancelled Vendor',
      amount: 50000,
      issueDate: '2024-11-15',
      chequeDate: '2024-11-15',
      status: 'cancelled',
      type: 'outgoing',
      reference: 'CANC-2024-001',
      notes: 'Cancelled due to order cancellation',
      category: 'Cancelled',
      bankName: 'HDFC Bank'
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

  const filteredCheques = cheques.filter(cheque => {
    const matchesSearch = searchQuery === '' || 
      cheque.chequeNumber.includes(searchQuery) ||
      cheque.payeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cheque.reference.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || cheque.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const issuedCount = cheques.filter(c => c.status === 'issued').length;
  const pdcCount = cheques.filter(c => c.status === 'pdc').length;
  const clearedCount = cheques.filter(c => c.status === 'cleared').length;
  const bouncedCount = cheques.filter(c => c.status === 'bounced').length;
  const totalPDCAmount = cheques
    .filter(c => c.status === 'pdc' && c.type === 'outgoing')
    .reduce((sum, c) => sum + c.amount, 0);

  return (
    <div className="cheque-management">
      {/* Header */}
      <div className="cheque-header">
        <div className="header-left">
          <FileText className="header-icon" size={32} />
          <div>
            <h1>Cheque Management</h1>
            <p>Track cheques - issued, cleared, bounced & PDCs</p>
          </div>
        </div>
        <div className="header-actions">
          <button className="btn-secondary">
            <Download size={18} />
            Export
          </button>
          <button className="btn-primary" onClick={() => setShowAddModal(true)}>
            <Plus size={18} />
            Register Cheque
          </button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="cheque-stats">
        <div className="stat-card">
          <div className="stat-icon issued">
            <FileText size={24} />
          </div>
          <div className="stat-content">
            <div className="stat-label">Issued</div>
            <div className="stat-value">{issuedCount}</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon pdc">
            <Clock size={24} />
          </div>
          <div className="stat-content">
            <div className="stat-label">Post-Dated (PDC)</div>
            <div className="stat-value">{pdcCount}</div>
            <div className="stat-subtitle">{formatCurrency(totalPDCAmount)}</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon cleared">
            <CheckCircle size={24} />
          </div>
          <div className="stat-content">
            <div className="stat-label">Cleared</div>
            <div className="stat-value">{clearedCount}</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon bounced">
            <XCircle size={24} />
          </div>
          <div className="stat-content">
            <div className="stat-label">Bounced</div>
            <div className="stat-value">{bouncedCount}</div>
          </div>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="cheque-filters">
        <div className="search-box">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search by cheque number, payee name, or reference..."
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
            className={`filter-btn ${filterStatus === 'issued' ? 'active' : ''}`}
            onClick={() => setFilterStatus('issued')}
          >
            <FileText size={16} />
            Issued
          </button>
          <button 
            className={`filter-btn ${filterStatus === 'pdc' ? 'active' : ''}`}
            onClick={() => setFilterStatus('pdc')}
          >
            <Clock size={16} />
            PDC
          </button>
          <button 
            className={`filter-btn ${filterStatus === 'cleared' ? 'active' : ''}`}
            onClick={() => setFilterStatus('cleared')}
          >
            <CheckCircle size={16} />
            Cleared
          </button>
          <button 
            className={`filter-btn ${filterStatus === 'bounced' ? 'active' : ''}`}
            onClick={() => setFilterStatus('bounced')}
          >
            <XCircle size={16} />
            Bounced
          </button>
        </div>
      </div>

      {/* Cheques List */}
      <div className="cheques-list">
        {filteredCheques.length === 0 ? (
          <div className="empty-state">
            <FileText size={48} />
            <h3>No cheques found</h3>
            <p>Register your first cheque to start tracking</p>
          </div>
        ) : (
          filteredCheques.map(cheque => (
            <div key={cheque.id} className={`cheque-item ${cheque.status}`}>
              <div className="item-left">
                <div className={`item-status-icon ${cheque.status}`}>
                  {cheque.status === 'issued' && <FileText size={20} />}
                  {cheque.status === 'deposited' && <TrendingUp size={20} />}
                  {cheque.status === 'cleared' && <CheckCircle size={20} />}
                  {cheque.status === 'bounced' && <XCircle size={20} />}
                  {cheque.status === 'pdc' && <Clock size={20} />}
                  {cheque.status === 'cancelled' && <XCircle size={20} />}
                </div>

                <div className="item-content">
                  <div className="item-header">
                    <div>
                      <h3>{cheque.payeeName}</h3>
                      <div className="item-meta">
                        <span className="cheque-number">
                          <Hash size={12} />
                          {cheque.chequeNumber}
                        </span>
                        <span className={`type-badge ${cheque.type}`}>
                          {cheque.type === 'outgoing' ? '↑ Outgoing' : '↓ Incoming'}
                        </span>
                        <span className={`status-badge ${cheque.status}`}>
                          {cheque.status.toUpperCase()}
                        </span>
                      </div>
                    </div>
                    <div className="item-amount">
                      {formatCurrency(cheque.amount)}
                    </div>
                  </div>

                  <p className="item-notes">{cheque.notes}</p>

                  <div className="item-details">
                    <div className="detail-item">
                      <Calendar size={14} />
                      <span>Issue: {formatDate(cheque.issueDate)}</span>
                    </div>
                    <div className="detail-item">
                      <Calendar size={14} />
                      <span>Date: {formatDate(cheque.chequeDate)}</span>
                    </div>
                    {cheque.clearanceDate && (
                      <div className="detail-item">
                        <CheckCircle size={14} />
                        <span>Cleared: {formatDate(cheque.clearanceDate)}</span>
                      </div>
                    )}
                    <div className="detail-item">
                      <span className="bank-name">{cheque.bankName}</span>
                    </div>
                    <div className="detail-item">
                      <span className="category">{cheque.category}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="item-actions">
                <button className="action-btn view" title="View">
                  <Eye size={16} />
                </button>
                <button className="action-btn print" title="Print">
                  <Printer size={16} />
                </button>
                {(cheque.status === 'issued' || cheque.status === 'pdc') && (
                  <button className="action-btn edit" title="Edit">
                    <Edit2 size={16} />
                  </button>
                )}
                <button className="action-btn more" title="More">
                  <MoreVertical size={16} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add Cheque Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Register Cheque</h2>
              <button className="modal-close" onClick={() => setShowAddModal(false)}>
                ×
              </button>
            </div>
            <div className="modal-body">
              <form className="cheque-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Cheque Type *</label>
                    <select>
                      <option value="outgoing">Outgoing (Payment)</option>
                      <option value="incoming">Incoming (Receipt)</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Account *</label>
                    <select>
                      <option value="">Select account</option>
                      <option value="acc1">Primary Business Account - HDFC</option>
                      <option value="acc2">Payroll Account - ICICI</option>
                      <option value="acc3">Reserve Fund - SBI</option>
                      <option value="acc4">Vendor Payments - Axis</option>
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Cheque Number *</label>
                    <input type="text" placeholder="e.g., 123456" />
                  </div>
                  <div className="form-group">
                    <label>Amount *</label>
                    <input type="number" placeholder="0.00" />
                  </div>
                </div>

                <div className="form-group">
                  <label>Payee Name *</label>
                  <input type="text" placeholder="Name of person/company" />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Issue Date *</label>
                    <input type="date" />
                  </div>
                  <div className="form-group">
                    <label>Cheque Date *</label>
                    <input type="date" />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Category *</label>
                    <select>
                      <option value="">Select category</option>
                      <option value="rent">Rent</option>
                      <option value="vendor">Vendor Payment</option>
                      <option value="salary">Salary</option>
                      <option value="utilities">Utilities</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Reference</label>
                    <input type="text" placeholder="Invoice or reference number" />
                  </div>
                </div>

                <div className="form-group">
                  <label>Notes</label>
                  <textarea rows={3} placeholder="Additional notes..."></textarea>
                </div>

                <div className="form-checkbox">
                  <input type="checkbox" id="isPDC" />
                  <label htmlFor="isPDC">
                    This is a Post-Dated Cheque (PDC)
                  </label>
                </div>

                <div className="form-actions">
                  <button type="button" className="btn-secondary" onClick={() => setShowAddModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary">
                    <Plus size={18} />
                    Register Cheque
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

export default ChequeManagement;
