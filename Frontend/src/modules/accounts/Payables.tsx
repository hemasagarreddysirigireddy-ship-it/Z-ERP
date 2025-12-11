import React, { useState } from 'react';
import {
  FileText, CreditCard, BookOpen, Clock, TrendingUp, CheckCircle,
  Search, Filter, Plus, Upload, Download, Eye, Edit2, Trash2,
  AlertCircle, XCircle, Check, MessageSquare, Calendar, DollarSign,
  User, Phone, Mail, Printer, Send, Bell, Users
} from 'lucide-react';
import './Payables.css';

// TypeScript Interfaces
interface Vendor {
  id: string;
  name: string;
  phone: string;
  email: string;
  totalPayable: number;
  status: 'active' | 'inactive';
}

interface VendorBill {
  id: string;
  billNo: string;
  vendorId: string;
  vendorName: string;
  billDate: string;
  dueDate: string;
  amount: number;
  taxAmount: number;
  totalAmount: number;
  status: 'draft' | 'pending' | 'approved' | 'paid' | 'cancelled';
  description: string;
  attachmentUrl?: string;
}

interface VendorPayment {
  id: string;
  paymentNo: string;
  vendorId: string;
  vendorName: string;
  billIds: string[];
  amount: number;
  paymentDate: string;
  paymentMethod: 'cash' | 'cheque' | 'bank_transfer' | 'upi' | 'card';
  reference?: string;
  notes?: string;
  status: 'completed' | 'pending' | 'cancelled';
}

interface LedgerEntry {
  id: string;
  vendorId: string;
  vendorName: string;
  date: string;
  description: string;
  billNo?: string;
  debit: number;
  credit: number;
  balance: number;
  type: 'bill' | 'payment' | 'adjustment' | 'debit_note';
}

interface PendingPayment {
  id: string;
  vendorId: string;
  vendorName: string;
  billNo: string;
  billDate: string;
  dueDate: string;
  amount: number;
  daysOverdue: number;
  priority: 'high' | 'medium' | 'low';
  approvalStatus: 'pending' | 'approved' | 'rejected';
}

interface AgingBucket {
  period: string;
  amount: number;
  count: number;
  percentage: number;
}

interface ApprovalWorkflow {
  id: string;
  billId: string;
  billNo: string;
  vendorName: string;
  amount: number;
  requestedBy: string;
  requestedDate: string;
  currentLevel: number;
  totalLevels: number;
  status: 'pending' | 'approved' | 'rejected' | 'cancelled';
  approvers: ApprovalLevel[];
  notes?: string;
}

interface ApprovalLevel {
  level: number;
  approverName: string;
  approverRole: string;
  status: 'pending' | 'approved' | 'rejected';
  date?: string;
  comments?: string;
}

const Payables: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'bills' | 'payments' | 'ledger' | 'pending' | 'aging' | 'approvals'>('bills');
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFilter, setDateFilter] = useState({ from: '', to: '' });
  const [selectedVendor, setSelectedVendor] = useState<string>('all');
  const [showBillModal, setShowBillModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [editingBill, setEditingBill] = useState<VendorBill | null>(null);

  // Sample Data
  const [vendors] = useState<Vendor[]>([
    { id: 'ven1', name: 'ABC Suppliers Ltd', phone: '+91 98765 11111', email: 'accounts@abcsuppliers.com', totalPayable: 850000, status: 'active' },
    { id: 'ven2', name: 'XYZ Materials Co', phone: '+91 98765 22222', email: 'billing@xyzmaterials.com', totalPayable: 425000, status: 'active' },
    { id: 'ven3', name: 'Global Parts Inc', phone: '+91 98765 33333', email: 'finance@globalparts.com', totalPayable: 1250000, status: 'active' },
    { id: 'ven4', name: 'Tech Equipment Store', phone: '+91 98765 44444', email: 'sales@techequip.com', totalPayable: 375000, status: 'active' }
  ]);

  const [vendorBills] = useState<VendorBill[]>([
    {
      id: 'bill1',
      billNo: 'BILL-2024-001',
      vendorId: 'ven1',
      vendorName: 'ABC Suppliers Ltd',
      billDate: '2024-12-01',
      dueDate: '2024-12-31',
      amount: 500000,
      taxAmount: 90000,
      totalAmount: 590000,
      status: 'approved',
      description: 'Raw materials purchase - December'
    },
    {
      id: 'bill2',
      billNo: 'BILL-2024-002',
      vendorId: 'ven2',
      vendorName: 'XYZ Materials Co',
      billDate: '2024-12-05',
      dueDate: '2024-12-20',
      amount: 350000,
      taxAmount: 63000,
      totalAmount: 413000,
      status: 'pending',
      description: 'Steel sheets and components'
    },
    {
      id: 'bill3',
      billNo: 'BILL-2024-003',
      vendorId: 'ven3',
      vendorName: 'Global Parts Inc',
      billDate: '2024-12-08',
      dueDate: '2024-12-25',
      amount: 750000,
      taxAmount: 135000,
      totalAmount: 885000,
      status: 'approved',
      description: 'Machinery spare parts'
    },
    {
      id: 'bill4',
      billNo: 'BILL-2024-004',
      vendorId: 'ven4',
      vendorName: 'Tech Equipment Store',
      billDate: '2024-12-10',
      dueDate: '2024-12-30',
      amount: 225000,
      taxAmount: 40500,
      totalAmount: 265500,
      status: 'draft',
      description: 'Office equipment and computers'
    }
  ]);

  const [payments] = useState<VendorPayment[]>([
    {
      id: 'pay1',
      paymentNo: 'PAY-2024-001',
      vendorId: 'ven1',
      vendorName: 'ABC Suppliers Ltd',
      billIds: ['bill1'],
      amount: 590000,
      paymentDate: '2024-12-11',
      paymentMethod: 'bank_transfer',
      reference: 'TXN789456123',
      notes: 'Full payment for BILL-2024-001',
      status: 'completed'
    },
    {
      id: 'pay2',
      paymentNo: 'PAY-2024-002',
      vendorId: 'ven2',
      vendorName: 'XYZ Materials Co',
      billIds: ['bill2'],
      amount: 200000,
      paymentDate: '2024-12-10',
      paymentMethod: 'cheque',
      reference: 'CHQ-123456',
      notes: 'Partial payment',
      status: 'completed'
    }
  ]);

  const [ledgerEntries] = useState<LedgerEntry[]>([
    {
      id: 'led1',
      vendorId: 'ven1',
      vendorName: 'ABC Suppliers Ltd',
      date: '2024-12-11',
      description: 'Payment made - BILL-2024-001',
      billNo: 'BILL-2024-001',
      debit: 590000,
      credit: 0,
      balance: 260000,
      type: 'payment'
    },
    {
      id: 'led2',
      vendorId: 'ven1',
      vendorName: 'ABC Suppliers Ltd',
      date: '2024-12-01',
      description: 'Bill received - Raw materials',
      billNo: 'BILL-2024-001',
      debit: 0,
      credit: 590000,
      balance: 850000,
      type: 'bill'
    },
    {
      id: 'led3',
      vendorId: 'ven2',
      vendorName: 'XYZ Materials Co',
      date: '2024-12-10',
      description: 'Partial payment - BILL-2024-002',
      billNo: 'BILL-2024-002',
      debit: 200000,
      credit: 0,
      balance: 225000,
      type: 'payment'
    }
  ]);

  const [pendingPayments] = useState<PendingPayment[]>([
    {
      id: 'pend1',
      vendorId: 'ven2',
      vendorName: 'XYZ Materials Co',
      billNo: 'BILL-2024-002',
      billDate: '2024-12-05',
      dueDate: '2024-12-20',
      amount: 213000,
      daysOverdue: 0,
      priority: 'high',
      approvalStatus: 'approved'
    },
    {
      id: 'pend2',
      vendorId: 'ven3',
      vendorName: 'Global Parts Inc',
      billNo: 'BILL-2024-003',
      billDate: '2024-12-08',
      dueDate: '2024-12-25',
      amount: 885000,
      daysOverdue: 0,
      priority: 'medium',
      approvalStatus: 'approved'
    },
    {
      id: 'pend3',
      vendorId: 'ven4',
      vendorName: 'Tech Equipment Store',
      billNo: 'BILL-2024-004',
      billDate: '2024-12-10',
      dueDate: '2024-12-30',
      amount: 265500,
      daysOverdue: 0,
      priority: 'low',
      approvalStatus: 'pending'
    }
  ]);

  const [agingData] = useState<AgingBucket[]>([
    { period: '0-30 days', amount: 1350000, count: 8, percentage: 45 },
    { period: '31-60 days', amount: 750000, count: 5, percentage: 25 },
    { period: '61-90 days', amount: 600000, count: 4, percentage: 20 },
    { period: '90+ days', amount: 300000, count: 2, percentage: 10 }
  ]);

  const [approvalWorkflows] = useState<ApprovalWorkflow[]>([
    {
      id: 'appr1',
      billId: 'bill2',
      billNo: 'BILL-2024-002',
      vendorName: 'XYZ Materials Co',
      amount: 413000,
      requestedBy: 'John Doe',
      requestedDate: '2024-12-05',
      currentLevel: 2,
      totalLevels: 3,
      status: 'pending',
      approvers: [
        { level: 1, approverName: 'Manager - Accounts', approverRole: 'Account Manager', status: 'approved', date: '2024-12-06', comments: 'Approved' },
        { level: 2, approverName: 'Finance Head', approverRole: 'Finance Manager', status: 'pending' },
        { level: 3, approverName: 'CFO', approverRole: 'Chief Financial Officer', status: 'pending' }
      ],
      notes: 'Urgent payment required'
    },
    {
      id: 'appr2',
      billId: 'bill3',
      billNo: 'BILL-2024-003',
      vendorName: 'Global Parts Inc',
      amount: 885000,
      requestedBy: 'Jane Smith',
      requestedDate: '2024-12-08',
      currentLevel: 3,
      totalLevels: 3,
      status: 'approved',
      approvers: [
        { level: 1, approverName: 'Manager - Accounts', approverRole: 'Account Manager', status: 'approved', date: '2024-12-09', comments: 'Verified and approved' },
        { level: 2, approverName: 'Finance Head', approverRole: 'Finance Manager', status: 'approved', date: '2024-12-09', comments: 'Approved' },
        { level: 3, approverName: 'CFO', approverRole: 'Chief Financial Officer', status: 'approved', date: '2024-12-10', comments: 'Final approval granted' }
      ]
    }
  ]);

  // Summary calculations
  const totalPayables = vendorBills.reduce((sum, bill) => 
    bill.status !== 'cancelled' && bill.status !== 'paid' ? sum + bill.totalAmount : sum, 0);
  const overdueAmount = pendingPayments.reduce((sum, payment) => 
    payment.daysOverdue > 0 ? sum + payment.amount : sum, 0);
  const paymentsThisMonth = payments.reduce((sum, payment) => 
    payment.status === 'completed' ? sum + payment.amount : sum, 0);
  const activeVendors = vendors.filter(v => v.status === 'active').length;

  const getStatusBadgeClass = (status: string) => {
    const statusMap: { [key: string]: string } = {
      'draft': 'status-draft',
      'pending': 'status-pending',
      'approved': 'status-approved',
      'paid': 'status-paid',
      'completed': 'status-completed',
      'cancelled': 'status-cancelled',
      'rejected': 'status-rejected',
      'active': 'status-active',
      'inactive': 'status-inactive'
    };
    return statusMap[status] || 'status-default';
  };

  const getPriorityBadgeClass = (priority: string) => {
    const priorityMap: { [key: string]: string } = {
      'high': 'priority-high',
      'medium': 'priority-medium',
      'low': 'priority-low'
    };
    return priorityMap[priority] || 'priority-default';
  };

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

  return (
    <div className="payables-container">
      {/* Header */}
      <div className="payables-header">
        <div className="header-left">
          <div className="header-icon">
            <CreditCard size={28} />
          </div>
          <div>
            <h1>Accounts Payable</h1>
            <p>Manage vendor bills, payments, and approvals</p>
          </div>
        </div>
        <div className="header-actions">
          <button className="btn btn-secondary" onClick={() => {}}>
            <Download size={18} />
            Export
          </button>
          <button className="btn btn-primary" onClick={() => setShowBillModal(true)}>
            <Plus size={18} />
            Add Bill
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="summary-cards">
        <div className="summary-card card-blue">
          <div className="card-icon">
            <DollarSign size={28} />
          </div>
          <div className="card-content">
            <div className="card-label">Total Payables</div>
            <div className="card-value">{formatCurrency(totalPayables)}</div>
            <div className="card-trend positive">
              <TrendingUp size={16} />
              <span>12% from last month</span>
            </div>
          </div>
        </div>

        <div className="summary-card card-red">
          <div className="card-icon">
            <AlertCircle size={28} />
          </div>
          <div className="card-content">
            <div className="card-label">Overdue</div>
            <div className="card-value">{formatCurrency(overdueAmount)}</div>
            <div className="card-subtitle">{pendingPayments.filter(p => p.daysOverdue > 0).length} bills</div>
          </div>
        </div>

        <div className="summary-card card-green">
          <div className="card-icon">
            <CheckCircle size={28} />
          </div>
          <div className="card-content">
            <div className="card-label">Payments This Month</div>
            <div className="card-value">{formatCurrency(paymentsThisMonth)}</div>
            <div className="card-subtitle">{payments.length} transactions</div>
          </div>
        </div>

        <div className="summary-card card-purple">
          <div className="card-icon">
            <Users size={28} />
          </div>
          <div className="card-content">
            <div className="card-label">Active Vendors</div>
            <div className="card-value">{activeVendors}</div>
            <div className="card-subtitle">Total: {vendors.length}</div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="payables-content">
        {/* Tabs */}
        <div className="tabs-container">
          <div className="tabs">
            <button
              className={`tab ${activeTab === 'bills' ? 'active' : ''}`}
              onClick={() => setActiveTab('bills')}
            >
              <FileText size={18} />
              Vendor Bills
            </button>
            <button
              className={`tab ${activeTab === 'payments' ? 'active' : ''}`}
              onClick={() => setActiveTab('payments')}
            >
              <CreditCard size={18} />
              Vendor Payments
            </button>
            <button
              className={`tab ${activeTab === 'ledger' ? 'active' : ''}`}
              onClick={() => setActiveTab('ledger')}
            >
              <BookOpen size={18} />
              Vendor Ledger
            </button>
            <button
              className={`tab ${activeTab === 'pending' ? 'active' : ''}`}
              onClick={() => setActiveTab('pending')}
            >
              <Clock size={18} />
              Pending Payments
            </button>
            <button
              className={`tab ${activeTab === 'aging' ? 'active' : ''}`}
              onClick={() => setActiveTab('aging')}
            >
              <TrendingUp size={18} />
              Ageing Report
            </button>
            <button
              className={`tab ${activeTab === 'approvals' ? 'active' : ''}`}
              onClick={() => setActiveTab('approvals')}
            >
              <CheckCircle size={18} />
              Approval Workflow
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="filters-section">
          <div className="search-box">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="filter-group">
            <select
              value={selectedVendor}
              onChange={(e) => setSelectedVendor(e.target.value)}
            >
              <option value="all">All Vendors</option>
              {vendors.map(vendor => (
                <option key={vendor.id} value={vendor.id}>{vendor.name}</option>
              ))}
            </select>

            <input
              type="date"
              value={dateFilter.from}
              onChange={(e) => setDateFilter({ ...dateFilter, from: e.target.value })}
              placeholder="From Date"
            />

            <input
              type="date"
              value={dateFilter.to}
              onChange={(e) => setDateFilter({ ...dateFilter, to: e.target.value })}
              placeholder="To Date"
            />

            <button className="btn btn-secondary">
              <Filter size={18} />
              Filter
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {/* Vendor Bills Tab */}
          {activeTab === 'bills' && (
            <div className="bills-table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Bill No</th>
                    <th>Vendor</th>
                    <th>Bill Date</th>
                    <th>Due Date</th>
                    <th>Amount</th>
                    <th>Tax</th>
                    <th>Total Amount</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {vendorBills.map(bill => (
                    <tr key={bill.id}>
                      <td className="font-medium">{bill.billNo}</td>
                      <td>
                        <div className="vendor-info">
                          <User size={16} />
                          {bill.vendorName}
                        </div>
                      </td>
                      <td>{formatDate(bill.billDate)}</td>
                      <td>{formatDate(bill.dueDate)}</td>
                      <td>{formatCurrency(bill.amount)}</td>
                      <td>{formatCurrency(bill.taxAmount)}</td>
                      <td className="font-medium">{formatCurrency(bill.totalAmount)}</td>
                      <td>
                        <span className={`status-badge ${getStatusBadgeClass(bill.status)}`}>
                          {bill.status}
                        </span>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button className="btn-icon" title="View">
                            <Eye size={16} />
                          </button>
                          <button className="btn-icon" title="Edit" onClick={() => setEditingBill(bill)}>
                            <Edit2 size={16} />
                          </button>
                          <button className="btn-icon" title="Delete">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Vendor Payments Tab */}
          {activeTab === 'payments' && (
            <div className="payments-section">
              <div className="section-header">
                <h3>Payment Records</h3>
                <button className="btn btn-primary" onClick={() => setShowPaymentModal(true)}>
                  <Plus size={18} />
                  Record Payment
                </button>
              </div>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Payment No</th>
                    <th>Vendor</th>
                    <th>Amount</th>
                    <th>Payment Date</th>
                    <th>Method</th>
                    <th>Reference</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map(payment => (
                    <tr key={payment.id}>
                      <td className="font-medium">{payment.paymentNo}</td>
                      <td>{payment.vendorName}</td>
                      <td className="font-medium">{formatCurrency(payment.amount)}</td>
                      <td>{formatDate(payment.paymentDate)}</td>
                      <td>
                        <span className="payment-method">{payment.paymentMethod.replace('_', ' ')}</span>
                      </td>
                      <td>{payment.reference || '-'}</td>
                      <td>
                        <span className={`status-badge ${getStatusBadgeClass(payment.status)}`}>
                          {payment.status}
                        </span>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button className="btn-icon" title="View Receipt">
                            <Eye size={16} />
                          </button>
                          <button className="btn-icon" title="Print">
                            <Printer size={16} />
                          </button>
                          <button className="btn-icon" title="Download">
                            <Download size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Vendor Ledger Tab */}
          {activeTab === 'ledger' && (
            <div className="ledger-section">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Vendor</th>
                    <th>Description</th>
                    <th>Bill No</th>
                    <th>Debit</th>
                    <th>Credit</th>
                    <th>Balance</th>
                    <th>Type</th>
                  </tr>
                </thead>
                <tbody>
                  {ledgerEntries.map(entry => (
                    <tr key={entry.id}>
                      <td>{formatDate(entry.date)}</td>
                      <td>{entry.vendorName}</td>
                      <td>{entry.description}</td>
                      <td>{entry.billNo || '-'}</td>
                      <td className={entry.debit > 0 ? 'text-red' : ''}>
                        {entry.debit > 0 ? formatCurrency(entry.debit) : '-'}
                      </td>
                      <td className={entry.credit > 0 ? 'text-green' : ''}>
                        {entry.credit > 0 ? formatCurrency(entry.credit) : '-'}
                      </td>
                      <td className="font-medium">{formatCurrency(entry.balance)}</td>
                      <td>
                        <span className="type-badge">{entry.type}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pending Payments Tab */}
          {activeTab === 'pending' && (
            <div className="pending-section">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Bill No</th>
                    <th>Vendor</th>
                    <th>Bill Date</th>
                    <th>Due Date</th>
                    <th>Amount</th>
                    <th>Days Overdue</th>
                    <th>Priority</th>
                    <th>Approval Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingPayments.map(payment => (
                    <tr key={payment.id}>
                      <td className="font-medium">{payment.billNo}</td>
                      <td>{payment.vendorName}</td>
                      <td>{formatDate(payment.billDate)}</td>
                      <td>{formatDate(payment.dueDate)}</td>
                      <td className="font-medium">{formatCurrency(payment.amount)}</td>
                      <td>
                        <span className={payment.daysOverdue > 0 ? 'text-red font-medium' : ''}>
                          {payment.daysOverdue} days
                        </span>
                      </td>
                      <td>
                        <span className={`priority-badge ${getPriorityBadgeClass(payment.priority)}`}>
                          {payment.priority}
                        </span>
                      </td>
                      <td>
                        <span className={`status-badge ${getStatusBadgeClass(payment.approvalStatus)}`}>
                          {payment.approvalStatus}
                        </span>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button className="btn-icon btn-success" title="Approve">
                            <Check size={16} />
                          </button>
                          <button className="btn-icon btn-primary" title="Pay">
                            <CreditCard size={16} />
                          </button>
                          <button className="btn-icon" title="View">
                            <Eye size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Ageing Report Tab */}
          {activeTab === 'aging' && (
            <div className="aging-section">
              <div className="aging-summary">
                <h3>Payables Ageing Analysis</h3>
                <div className="aging-total">
                  Total Outstanding: {formatCurrency(agingData.reduce((sum, bucket) => sum + bucket.amount, 0))}
                </div>
              </div>

              <div className="aging-buckets">
                {agingData.map((bucket, index) => (
                  <div key={index} className="aging-bucket">
                    <div className="bucket-header">
                      <h4>{bucket.period}</h4>
                      <span className="bucket-percentage">{bucket.percentage}%</span>
                    </div>
                    <div className="bucket-amount">{formatCurrency(bucket.amount)}</div>
                    <div className="bucket-count">{bucket.count} bills</div>
                    <div className="bucket-bar">
                      <div
                        className="bucket-bar-fill"
                        style={{ width: `${bucket.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="aging-chart">
                <div className="chart-header">
                  <h4>Visual Breakdown</h4>
                </div>
                <div className="chart-bars">
                  {agingData.map((bucket, index) => (
                    <div key={index} className="chart-bar-item">
                      <div className="chart-bar-label">{bucket.period}</div>
                      <div className="chart-bar-container">
                        <div
                          className={`chart-bar-fill aging-bar-${index}`}
                          style={{ width: `${(bucket.amount / 3000000) * 100}%` }}
                        >
                          <span className="chart-bar-value">{formatCurrency(bucket.amount)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Approval Workflow Tab */}
          {activeTab === 'approvals' && (
            <div className="approvals-section">
              {approvalWorkflows.map(workflow => (
                <div key={workflow.id} className="approval-card">
                  <div className="approval-header">
                    <div className="approval-title">
                      <h4>{workflow.billNo}</h4>
                      <span className={`status-badge ${getStatusBadgeClass(workflow.status)}`}>
                        {workflow.status}
                      </span>
                    </div>
                    <div className="approval-amount">{formatCurrency(workflow.amount)}</div>
                  </div>

                  <div className="approval-info">
                    <div className="info-item">
                      <User size={16} />
                      <span><strong>Vendor:</strong> {workflow.vendorName}</span>
                    </div>
                    <div className="info-item">
                      <Calendar size={16} />
                      <span><strong>Requested:</strong> {formatDate(workflow.requestedDate)} by {workflow.requestedBy}</span>
                    </div>
                    <div className="info-item">
                      <TrendingUp size={16} />
                      <span><strong>Progress:</strong> Level {workflow.currentLevel} of {workflow.totalLevels}</span>
                    </div>
                  </div>

                  {workflow.notes && (
                    <div className="approval-notes">
                      <MessageSquare size={16} />
                      <span>{workflow.notes}</span>
                    </div>
                  )}

                  <div className="approval-timeline">
                    {workflow.approvers.map((approver, index) => (
                      <div key={index} className={`timeline-item ${approver.status}`}>
                        <div className="timeline-icon">
                          {approver.status === 'approved' && <CheckCircle size={20} />}
                          {approver.status === 'rejected' && <XCircle size={20} />}
                          {approver.status === 'pending' && <Clock size={20} />}
                        </div>
                        <div className="timeline-content">
                          <div className="timeline-header">
                            <span className="timeline-level">Level {approver.level}</span>
                            <span className={`timeline-status ${approver.status}`}>
                              {approver.status}
                            </span>
                          </div>
                          <div className="timeline-approver">
                            <strong>{approver.approverName}</strong>
                            <span className="timeline-role">{approver.approverRole}</span>
                          </div>
                          {approver.date && (
                            <div className="timeline-date">{formatDate(approver.date)}</div>
                          )}
                          {approver.comments && (
                            <div className="timeline-comments">{approver.comments}</div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="approval-actions">
                    {workflow.status === 'pending' && (
                      <>
                        <button className="btn btn-success">
                          <Check size={18} />
                          Approve
                        </button>
                        <button className="btn btn-danger">
                          <XCircle size={18} />
                          Reject
                        </button>
                      </>
                    )}
                    <button className="btn btn-secondary">
                      <Eye size={18} />
                      View Details
                    </button>
                    <button className="btn btn-secondary">
                      <MessageSquare size={18} />
                      Add Note
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      {showBillModal && (
        <div className="modal-overlay" onClick={() => setShowBillModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Add Vendor Bill</h3>
              <button className="modal-close" onClick={() => setShowBillModal(false)}>×</button>
            </div>
            <div className="modal-body">
              <div className="form-grid">
                <div className="form-group">
                  <label>Bill Number</label>
                  <input type="text" placeholder="BILL-2024-XXX" />
                </div>
                <div className="form-group">
                  <label>Vendor</label>
                  <select>
                    <option>Select Vendor</option>
                    {vendors.map(vendor => (
                      <option key={vendor.id} value={vendor.id}>{vendor.name}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Bill Date</label>
                  <input type="date" />
                </div>
                <div className="form-group">
                  <label>Due Date</label>
                  <input type="date" />
                </div>
                <div className="form-group">
                  <label>Amount</label>
                  <input type="number" placeholder="0.00" />
                </div>
                <div className="form-group">
                  <label>Tax Amount</label>
                  <input type="number" placeholder="0.00" />
                </div>
                <div className="form-group full-width">
                  <label>Description</label>
                  <textarea rows={3} placeholder="Bill description..."></textarea>
                </div>
                <div className="form-group full-width">
                  <label>Attachment</label>
                  <div className="file-upload">
                    <Upload size={20} />
                    <span>Click to upload or drag and drop</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowBillModal(false)}>Cancel</button>
              <button className="btn btn-primary">Save Bill</button>
            </div>
          </div>
        </div>
      )}

      {showPaymentModal && (
        <div className="modal-overlay" onClick={() => setShowPaymentModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Record Vendor Payment</h3>
              <button className="modal-close" onClick={() => setShowPaymentModal(false)}>×</button>
            </div>
            <div className="modal-body">
              <div className="form-grid">
                <div className="form-group">
                  <label>Payment Number</label>
                  <input type="text" placeholder="PAY-2024-XXX" />
                </div>
                <div className="form-group">
                  <label>Vendor</label>
                  <select>
                    <option>Select Vendor</option>
                    {vendors.map(vendor => (
                      <option key={vendor.id} value={vendor.id}>{vendor.name}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Amount</label>
                  <input type="number" placeholder="0.00" />
                </div>
                <div className="form-group">
                  <label>Payment Date</label>
                  <input type="date" />
                </div>
                <div className="form-group">
                  <label>Payment Method</label>
                  <select>
                    <option value="cash">Cash</option>
                    <option value="cheque">Cheque</option>
                    <option value="bank_transfer">Bank Transfer</option>
                    <option value="upi">UPI</option>
                    <option value="card">Card</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Reference Number</label>
                  <input type="text" placeholder="Transaction reference" />
                </div>
                <div className="form-group full-width">
                  <label>Notes</label>
                  <textarea rows={3} placeholder="Payment notes..."></textarea>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowPaymentModal(false)}>Cancel</button>
              <button className="btn btn-primary">Record Payment</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payables;
