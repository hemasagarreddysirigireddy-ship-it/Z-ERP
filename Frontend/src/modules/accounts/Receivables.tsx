import React, { useState } from 'react';
import {
  Users, FileText, Receipt, Clock, Bell, Search, Download, Mail,
  MessageSquare, Filter, Calendar, DollarSign, Plus, Eye, Send,
  AlertCircle, CheckCircle, XCircle, Edit2, Printer,
  TrendingUp, TrendingDown, Phone, User, CreditCard
} from 'lucide-react';
import './Receivables.css';

// TypeScript Interfaces
interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  totalOutstanding: number;
  creditLimit: number;
  status: 'active' | 'inactive' | 'blocked';
}

interface LedgerEntry {
  id: string;
  customerId: string;
  customerName: string;
  date: string;
  description: string;
  invoiceNo?: string;
  debit: number;
  credit: number;
  balance: number;
  type: 'invoice' | 'payment' | 'adjustment' | 'credit_note';
}

interface OutstandingReceivable {
  id: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  invoiceNo: string;
  invoiceDate: string;
  amount: number;
  dueDate: string;
  daysOverdue: number;
  status: 'current' | 'overdue-30' | 'overdue-60' | 'overdue-90' | 'overdue-90+';
}

interface PaymentReceipt {
  id: string;
  receiptNo: string;
  customerId: string;
  customerName: string;
  amount: number;
  paymentMethod: 'cash' | 'cheque' | 'bank_transfer' | 'upi' | 'card';
  paymentDate: string;
  reference?: string;
  notes?: string;
  status: 'confirmed' | 'pending' | 'cancelled';
}

interface AgingBucket {
  period: string;
  amount: number;
  count: number;
  percentage: number;
}

interface DueAlert {
  id: string;
  customerId: string;
  customerName: string;
  amount: number;
  dueDate: string;
  daysUntilDue: number;
  reminderSent: boolean;
  lastReminderDate?: string;
}

const Receivables: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'ledger' | 'outstanding' | 'receipts' | 'aging' | 'alerts'>('outstanding');
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFilter, setDateFilter] = useState({ from: '', to: '' });
  const [selectedCustomer, setSelectedCustomer] = useState<string>('all');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showReminderModal, setShowReminderModal] = useState(false);
  const [showAdjustmentModal, setShowAdjustmentModal] = useState(false);

  // Sample Data
  const [customers] = useState<Customer[]>([
    {
      id: 'cust1',
      name: 'Acme Corporation',
      phone: '+91 98765 43210',
      email: 'accounts@acmecorp.com',
      totalOutstanding: 450000,
      creditLimit: 1000000,
      status: 'active'
    },
    {
      id: 'cust2',
      name: 'TechSolutions Ltd',
      phone: '+91 98765 43211',
      email: 'finance@techsolutions.com',
      totalOutstanding: 285000,
      creditLimit: 500000,
      status: 'active'
    },
    {
      id: 'cust3',
      name: 'Global Traders Pvt Ltd',
      phone: '+91 98765 43212',
      email: 'payments@globaltraders.com',
      totalOutstanding: 675000,
      creditLimit: 800000,
      status: 'active'
    },
    {
      id: 'cust4',
      name: 'Metro Industries',
      phone: '+91 98765 43213',
      email: 'accounts@metroindustries.com',
      totalOutstanding: 125000,
      creditLimit: 300000,
      status: 'active'
    }
  ]);

  const [ledgerEntries] = useState<LedgerEntry[]>([
    {
      id: 'led1',
      customerId: 'cust1',
      customerName: 'Acme Corporation',
      date: '2024-12-10',
      description: 'Payment received - INV-2024-1245',
      invoiceNo: 'INV-2024-1245',
      debit: 0,
      credit: 150000,
      balance: 450000,
      type: 'payment'
    },
    {
      id: 'led2',
      customerId: 'cust1',
      customerName: 'Acme Corporation',
      date: '2024-12-08',
      description: 'Sales Invoice - December supply',
      invoiceNo: 'INV-2024-1267',
      debit: 250000,
      credit: 0,
      balance: 600000,
      type: 'invoice'
    },
    {
      id: 'led3',
      customerId: 'cust1',
      customerName: 'Acme Corporation',
      date: '2024-12-05',
      description: 'Sales Invoice - Product delivery',
      invoiceNo: 'INV-2024-1245',
      debit: 350000,
      credit: 0,
      balance: 350000,
      type: 'invoice'
    },
    {
      id: 'led4',
      customerId: 'cust2',
      customerName: 'TechSolutions Ltd',
      date: '2024-12-09',
      description: 'Payment received - Partial',
      invoiceNo: 'INV-2024-1256',
      debit: 0,
      credit: 85000,
      balance: 285000,
      type: 'payment'
    },
    {
      id: 'led5',
      customerId: 'cust2',
      customerName: 'TechSolutions Ltd',
      date: '2024-12-01',
      description: 'Sales Invoice - Software license',
      invoiceNo: 'INV-2024-1256',
      debit: 370000,
      credit: 0,
      balance: 370000,
      type: 'invoice'
    }
  ]);

  const [outstandingReceivables] = useState<OutstandingReceivable[]>([
    {
      id: 'out1',
      customerId: 'cust1',
      customerName: 'Acme Corporation',
      customerPhone: '+91 98765 43210',
      invoiceNo: 'INV-2024-1267',
      invoiceDate: '2024-12-08',
      amount: 250000,
      dueDate: '2024-12-23',
      daysOverdue: 0,
      status: 'current'
    },
    {
      id: 'out2',
      customerId: 'cust1',
      customerName: 'Acme Corporation',
      customerPhone: '+91 98765 43210',
      invoiceNo: 'INV-2024-1198',
      invoiceDate: '2024-11-15',
      amount: 200000,
      dueDate: '2024-11-30',
      daysOverdue: 11,
      status: 'overdue-30'
    },
    {
      id: 'out3',
      customerId: 'cust2',
      customerName: 'TechSolutions Ltd',
      customerPhone: '+91 98765 43211',
      invoiceNo: 'INV-2024-1256',
      invoiceDate: '2024-12-01',
      amount: 285000,
      dueDate: '2024-12-16',
      daysOverdue: 0,
      status: 'current'
    },
    {
      id: 'out4',
      customerId: 'cust3',
      customerName: 'Global Traders Pvt Ltd',
      customerPhone: '+91 98765 43212',
      invoiceNo: 'INV-2024-1189',
      invoiceDate: '2024-10-25',
      amount: 325000,
      dueDate: '2024-11-09',
      daysOverdue: 32,
      status: 'overdue-60'
    },
    {
      id: 'out5',
      customerId: 'cust3',
      customerName: 'Global Traders Pvt Ltd',
      customerPhone: '+91 98765 43212',
      invoiceNo: 'INV-2024-1123',
      invoiceDate: '2024-09-15',
      amount: 350000,
      dueDate: '2024-09-30',
      daysOverdue: 72,
      status: 'overdue-90'
    },
    {
      id: 'out6',
      customerId: 'cust4',
      customerName: 'Metro Industries',
      customerPhone: '+91 98765 43213',
      invoiceNo: 'INV-2024-1234',
      invoiceDate: '2024-11-20',
      amount: 125000,
      dueDate: '2024-12-05',
      daysOverdue: 6,
      status: 'overdue-30'
    }
  ]);

  const [paymentReceipts] = useState<PaymentReceipt[]>([
    {
      id: 'rcpt1',
      receiptNo: 'RCP-2024-0145',
      customerId: 'cust1',
      customerName: 'Acme Corporation',
      amount: 150000,
      paymentMethod: 'bank_transfer',
      paymentDate: '2024-12-10',
      reference: 'NEFT/240512345',
      notes: 'Payment for INV-2024-1245',
      status: 'confirmed'
    },
    {
      id: 'rcpt2',
      receiptNo: 'RCP-2024-0144',
      customerId: 'cust2',
      customerName: 'TechSolutions Ltd',
      amount: 85000,
      paymentMethod: 'upi',
      paymentDate: '2024-12-09',
      reference: 'UPI/940123456789',
      notes: 'Partial payment',
      status: 'confirmed'
    },
    {
      id: 'rcpt3',
      receiptNo: 'RCP-2024-0143',
      customerId: 'cust4',
      customerName: 'Metro Industries',
      amount: 75000,
      paymentMethod: 'cheque',
      paymentDate: '2024-12-08',
      reference: 'CHQ-456789',
      notes: 'Cheque clearing pending',
      status: 'pending'
    }
  ]);

  const [agingBuckets] = useState<AgingBucket[]>([
    {
      period: '0-30 days',
      amount: 785000,
      count: 8,
      percentage: 48.5
    },
    {
      period: '31-60 days',
      amount: 525000,
      count: 5,
      percentage: 32.4
    },
    {
      period: '61-90 days',
      amount: 210000,
      count: 2,
      percentage: 13.0
    },
    {
      period: '90+ days',
      amount: 100000,
      count: 1,
      percentage: 6.1
    }
  ]);

  const [dueAlerts] = useState<DueAlert[]>([
    {
      id: 'alert1',
      customerId: 'cust2',
      customerName: 'TechSolutions Ltd',
      amount: 285000,
      dueDate: '2024-12-16',
      daysUntilDue: 5,
      reminderSent: false
    },
    {
      id: 'alert2',
      customerId: 'cust1',
      customerName: 'Acme Corporation',
      amount: 250000,
      dueDate: '2024-12-23',
      daysUntilDue: 12,
      reminderSent: true,
      lastReminderDate: '2024-12-08'
    },
    {
      id: 'alert3',
      customerId: 'cust4',
      customerName: 'Metro Industries',
      amount: 50000,
      dueDate: '2024-12-14',
      daysUntilDue: 3,
      reminderSent: true,
      lastReminderDate: '2024-12-09'
    }
  ]);

  // Calculate Summary Metrics
  const totalOutstanding = outstandingReceivables.reduce((sum, item) => sum + item.amount, 0);
  const overdueAmount = outstandingReceivables
    .filter(item => item.daysOverdue > 0)
    .reduce((sum, item) => sum + item.amount, 0);
  
  const paymentsThisMonth = paymentReceipts
    .filter(receipt => {
      const receiptDate = new Date(receipt.paymentDate);
      const currentDate = new Date();
      return receiptDate.getMonth() === currentDate.getMonth() && 
             receiptDate.getFullYear() === currentDate.getFullYear();
    })
    .reduce((sum, receipt) => sum + receipt.amount, 0);

  const activeCustomers = customers.filter(c => c.status === 'active').length;

  // Helper Functions
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

  const getStatusColor = (status: OutstandingReceivable['status']) => {
    switch (status) {
      case 'current':
        return 'status-current';
      case 'overdue-30':
        return 'status-overdue-30';
      case 'overdue-60':
        return 'status-overdue-60';
      case 'overdue-90':
        return 'status-overdue-90';
      case 'overdue-90+':
        return 'status-overdue-90plus';
      default:
        return 'status-current';
    }
  };

  const getStatusLabel = (status: OutstandingReceivable['status']) => {
    switch (status) {
      case 'current':
        return 'Current';
      case 'overdue-30':
        return 'Overdue (1-30 days)';
      case 'overdue-60':
        return 'Overdue (31-60 days)';
      case 'overdue-90':
        return 'Overdue (61-90 days)';
      case 'overdue-90+':
        return 'Overdue (90+ days)';
      default:
        return 'Unknown';
    }
  };

  const getPaymentMethodIcon = (method: PaymentReceipt['paymentMethod']) => {
    switch (method) {
      case 'cash':
        return <DollarSign size={16} />;
      case 'cheque':
        return <FileText size={16} />;
      case 'bank_transfer':
        return <CreditCard size={16} />;
      case 'upi':
        return <Phone size={16} />;
      case 'card':
        return <CreditCard size={16} />;
      default:
        return <DollarSign size={16} />;
    }
  };

  // Filter Functions
  const filteredLedgerEntries = ledgerEntries.filter(entry => {
    const matchesSearch = searchQuery === '' || 
      entry.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (entry.invoiceNo && entry.invoiceNo.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCustomer = selectedCustomer === 'all' || entry.customerId === selectedCustomer;
    
    return matchesSearch && matchesCustomer;
  });

  const filteredOutstanding = outstandingReceivables.filter(item => {
    const matchesSearch = searchQuery === '' ||
      item.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.invoiceNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.customerPhone.includes(searchQuery);
    
    const matchesCustomer = selectedCustomer === 'all' || item.customerId === selectedCustomer;
    
    return matchesSearch && matchesCustomer;
  });

  return (
    <div className="receivables-container">
      {/* Header */}
      <div className="receivables-header">
        <div className="header-left">
          <div className="header-icon">
            <FileText size={32} />
          </div>
          <div>
            <h1>Accounts Receivable</h1>
            <p>Manage customer payments, track outstanding dues, and generate reports</p>
          </div>
        </div>
        <div className="header-actions">
          <button className="btn-secondary">
            <Download size={18} />
            Export Report
          </button>
          <button className="btn-primary" onClick={() => setShowPaymentModal(true)}>
            <Plus size={18} />
            Record Payment
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="summary-cards">
        <div className="summary-card card-blue">
          <div className="card-icon">
            <DollarSign size={24} />
          </div>
          <div className="card-content">
            <p className="card-label">Total Outstanding</p>
            <h3 className="card-value">{formatCurrency(totalOutstanding)}</h3>
            <p className="card-trend positive">
              <TrendingUp size={14} />
              From {outstandingReceivables.length} invoices
            </p>
          </div>
        </div>

        <div className="summary-card card-red">
          <div className="card-icon">
            <AlertCircle size={24} />
          </div>
          <div className="card-content">
            <p className="card-label">Overdue Amount</p>
            <h3 className="card-value">{formatCurrency(overdueAmount)}</h3>
            <p className="card-trend negative">
              <TrendingDown size={14} />
              Requires attention
            </p>
          </div>
        </div>

        <div className="summary-card card-green">
          <div className="card-icon">
            <Receipt size={24} />
          </div>
          <div className="card-content">
            <p className="card-label">Payments This Month</p>
            <h3 className="card-value">{formatCurrency(paymentsThisMonth)}</h3>
            <p className="card-trend positive">
              <CheckCircle size={14} />
              {paymentReceipts.length} transactions
            </p>
          </div>
        </div>

        <div className="summary-card card-purple">
          <div className="card-icon">
            <Users size={24} />
          </div>
          <div className="card-content">
            <p className="card-label">Active Customers</p>
            <h3 className="card-value">{activeCustomers}</h3>
            <p className="card-trend positive">
              <CheckCircle size={14} />
              In good standing
            </p>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="tabs-container">
        <div className="tabs-nav">
          <button
            className={`tab-button ${activeTab === 'ledger' ? 'active' : ''}`}
            onClick={() => setActiveTab('ledger')}
          >
            <Users size={18} />
            Customer Ledger
          </button>
          <button
            className={`tab-button ${activeTab === 'outstanding' ? 'active' : ''}`}
            onClick={() => setActiveTab('outstanding')}
          >
            <FileText size={18} />
            Outstanding Receivables
          </button>
          <button
            className={`tab-button ${activeTab === 'receipts' ? 'active' : ''}`}
            onClick={() => setActiveTab('receipts')}
          >
            <Receipt size={18} />
            Payment Receipts
          </button>
          <button
            className={`tab-button ${activeTab === 'aging' ? 'active' : ''}`}
            onClick={() => setActiveTab('aging')}
          >
            <Clock size={18} />
            Ageing Report
          </button>
          <button
            className={`tab-button ${activeTab === 'alerts' ? 'active' : ''}`}
            onClick={() => setActiveTab('alerts')}
          >
            <Bell size={18} />
            Due Date Alerts
          </button>
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {/* Customer Ledger Tab */}
          {activeTab === 'ledger' && (
            <div className="ledger-section">
              <div className="section-toolbar">
                <div className="search-box">
                  <Search size={18} />
                  <input
                    type="text"
                    placeholder="Search by customer name, phone, or invoice..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="toolbar-actions">
                  <select
                    className="filter-select"
                    value={selectedCustomer}
                    onChange={(e) => setSelectedCustomer(e.target.value)}
                  >
                    <option value="all">All Customers</option>
                    {customers.map(customer => (
                      <option key={customer.id} value={customer.id}>
                        {customer.name}
                      </option>
                    ))}
                  </select>
                  <button className="btn-icon" title="Filter">
                    <Filter size={18} />
                  </button>
                  <button className="btn-icon" title="Download PDF">
                    <Download size={18} />
                  </button>
                </div>
              </div>

              <div className="data-table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Customer</th>
                      <th>Description</th>
                      <th>Invoice No</th>
                      <th className="text-right">Debit</th>
                      <th className="text-right">Credit</th>
                      <th className="text-right">Balance</th>
                      <th className="text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredLedgerEntries.map(entry => (
                      <tr key={entry.id}>
                        <td>{formatDate(entry.date)}</td>
                        <td>
                          <div className="customer-info">
                            <User size={14} />
                            {entry.customerName}
                          </div>
                        </td>
                        <td>{entry.description}</td>
                        <td>
                          <span className="invoice-badge">{entry.invoiceNo || '-'}</span>
                        </td>
                        <td className="text-right">
                          {entry.debit > 0 ? (
                            <span className="amount-debit">{formatCurrency(entry.debit)}</span>
                          ) : '-'}
                        </td>
                        <td className="text-right">
                          {entry.credit > 0 ? (
                            <span className="amount-credit">{formatCurrency(entry.credit)}</span>
                          ) : '-'}
                        </td>
                        <td className="text-right">
                          <strong>{formatCurrency(entry.balance)}</strong>
                        </td>
                        <td className="text-center">
                          <div className="action-buttons">
                            <button className="btn-icon-sm" title="View Details">
                              <Eye size={16} />
                            </button>
                            <button className="btn-icon-sm" title="Download PDF">
                              <Printer size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="section-footer">
                <button className="btn-secondary" onClick={() => setShowAdjustmentModal(true)}>
                  <Edit2 size={18} />
                  Add Adjustment
                </button>
              </div>
            </div>
          )}

          {/* Outstanding Receivables Tab */}
          {activeTab === 'outstanding' && (
            <div className="outstanding-section">
              <div className="section-toolbar">
                <div className="search-box">
                  <Search size={18} />
                  <input
                    type="text"
                    placeholder="Search by customer name, phone, or invoice..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="toolbar-actions">
                  <select
                    className="filter-select"
                    value={selectedCustomer}
                    onChange={(e) => setSelectedCustomer(e.target.value)}
                  >
                    <option value="all">All Customers</option>
                    {customers.map(customer => (
                      <option key={customer.id} value={customer.id}>
                        {customer.name}
                      </option>
                    ))}
                  </select>
                  <button className="btn-secondary" onClick={() => setShowReminderModal(true)}>
                    <Send size={18} />
                    Send Reminders
                  </button>
                  <button className="btn-secondary">
                    <Download size={18} />
                    Download List
                  </button>
                </div>
              </div>

              <div className="data-table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Customer</th>
                      <th>Invoice No</th>
                      <th>Invoice Date</th>
                      <th className="text-right">Amount</th>
                      <th>Due Date</th>
                      <th className="text-center">Days Overdue</th>
                      <th className="text-center">Status</th>
                      <th className="text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOutstanding.map(item => (
                      <tr key={item.id}>
                        <td>
                          <div className="customer-cell">
                            <strong>{item.customerName}</strong>
                            <span className="customer-phone">{item.customerPhone}</span>
                          </div>
                        </td>
                        <td>
                          <span className="invoice-badge">{item.invoiceNo}</span>
                        </td>
                        <td>{formatDate(item.invoiceDate)}</td>
                        <td className="text-right">
                          <strong>{formatCurrency(item.amount)}</strong>
                        </td>
                        <td>{formatDate(item.dueDate)}</td>
                        <td className="text-center">
                          {item.daysOverdue > 0 ? (
                            <span className="overdue-badge">{item.daysOverdue}</span>
                          ) : (
                            <span className="current-badge">0</span>
                          )}
                        </td>
                        <td className="text-center">
                          <span className={`status-badge ${getStatusColor(item.status)}`}>
                            {getStatusLabel(item.status)}
                          </span>
                        </td>
                        <td className="text-center">
                          <div className="action-buttons">
                            <button className="btn-icon-sm" title="Record Payment">
                              <DollarSign size={16} />
                            </button>
                            <button className="btn-icon-sm" title="Send Email">
                              <Mail size={16} />
                            </button>
                            <button className="btn-icon-sm" title="Send WhatsApp">
                              <MessageSquare size={16} />
                            </button>
                            <button className="btn-icon-sm" title="View Details">
                              <Eye size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Payment Receipts Tab */}
          {activeTab === 'receipts' && (
            <div className="receipts-section">
              <div className="section-toolbar">
                <div className="search-box">
                  <Search size={18} />
                  <input
                    type="text"
                    placeholder="Search by receipt number or customer..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="toolbar-actions">
                  <button className="btn-primary" onClick={() => setShowPaymentModal(true)}>
                    <Plus size={18} />
                    New Receipt
                  </button>
                </div>
              </div>

              <div className="data-table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Receipt No</th>
                      <th>Customer</th>
                      <th>Payment Date</th>
                      <th className="text-right">Amount</th>
                      <th>Payment Method</th>
                      <th>Reference</th>
                      <th className="text-center">Status</th>
                      <th className="text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paymentReceipts.map(receipt => (
                      <tr key={receipt.id}>
                        <td>
                          <span className="receipt-number">{receipt.receiptNo}</span>
                        </td>
                        <td>{receipt.customerName}</td>
                        <td>{formatDate(receipt.paymentDate)}</td>
                        <td className="text-right">
                          <strong>{formatCurrency(receipt.amount)}</strong>
                        </td>
                        <td>
                          <div className="payment-method">
                            {getPaymentMethodIcon(receipt.paymentMethod)}
                            <span>{receipt.paymentMethod.replace('_', ' ').toUpperCase()}</span>
                          </div>
                        </td>
                        <td>
                          <span className="reference-code">{receipt.reference || '-'}</span>
                        </td>
                        <td className="text-center">
                          <span className={`status-badge ${receipt.status === 'confirmed' ? 'status-confirmed' : 'status-pending'}`}>
                            {receipt.status === 'confirmed' ? (
                              <>
                                <CheckCircle size={14} />
                                Confirmed
                              </>
                            ) : (
                              <>
                                <Clock size={14} />
                                Pending
                              </>
                            )}
                          </span>
                        </td>
                        <td className="text-center">
                          <div className="action-buttons">
                            <button className="btn-icon-sm" title="Download PDF">
                              <Printer size={16} />
                            </button>
                            <button className="btn-icon-sm" title="Share via Email">
                              <Mail size={16} />
                            </button>
                            <button className="btn-icon-sm" title="Share via WhatsApp">
                              <MessageSquare size={16} />
                            </button>
                            <button className="btn-icon-sm" title="View Details">
                              <Eye size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Ageing Report Tab */}
          {activeTab === 'aging' && (
            <div className="aging-section">
              <div className="section-toolbar">
                <div className="toolbar-actions">
                  <select
                    className="filter-select"
                    value={selectedCustomer}
                    onChange={(e) => setSelectedCustomer(e.target.value)}
                  >
                    <option value="all">All Customers</option>
                    {customers.map(customer => (
                      <option key={customer.id} value={customer.id}>
                        {customer.name}
                      </option>
                    ))}
                  </select>
                  <div className="date-range-filter">
                    <Calendar size={18} />
                    <input
                      type="date"
                      value={dateFilter.from}
                      onChange={(e) => setDateFilter({ ...dateFilter, from: e.target.value })}
                      placeholder="From"
                    />
                    <span>to</span>
                    <input
                      type="date"
                      value={dateFilter.to}
                      onChange={(e) => setDateFilter({ ...dateFilter, to: e.target.value })}
                      placeholder="To"
                    />
                  </div>
                  <button className="btn-secondary">
                    <Download size={18} />
                    Export Report
                  </button>
                </div>
              </div>

              <div className="aging-chart">
                <h3>Receivables Aging Analysis</h3>
                <div className="aging-buckets">
                  {agingBuckets.map((bucket, index) => (
                    <div key={index} className="aging-bucket">
                      <div className="bucket-header">
                        <h4>{bucket.period}</h4>
                        <span className="bucket-count">{bucket.count} invoices</span>
                      </div>
                      <div className="bucket-amount">{formatCurrency(bucket.amount)}</div>
                      <div className="bucket-bar">
                        <div
                          className={`bucket-fill bucket-${index + 1}`}
                          style={{ width: `${bucket.percentage}%` }}
                        ></div>
                      </div>
                      <div className="bucket-percentage">{bucket.percentage.toFixed(1)}%</div>
                    </div>
                  ))}
                </div>

                <div className="aging-summary">
                  <div className="summary-item">
                    <span>Total Receivables:</span>
                    <strong>{formatCurrency(totalOutstanding)}</strong>
                  </div>
                  <div className="summary-item">
                    <span>Total Invoices:</span>
                    <strong>{agingBuckets.reduce((sum, b) => sum + b.count, 0)}</strong>
                  </div>
                  <div className="summary-item highlight">
                    <span>Amount Overdue:</span>
                    <strong>{formatCurrency(overdueAmount)}</strong>
                  </div>
                </div>
              </div>

              <div className="aging-table">
                <h3>Detailed Aging Breakdown by Customer</h3>
                <div className="data-table-container">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Customer</th>
                        <th className="text-right">0-30 Days</th>
                        <th className="text-right">31-60 Days</th>
                        <th className="text-right">61-90 Days</th>
                        <th className="text-right">90+ Days</th>
                        <th className="text-right">Total Outstanding</th>
                      </tr>
                    </thead>
                    <tbody>
                      {customers.map(customer => {
                        const customerReceivables = outstandingReceivables.filter(
                          r => r.customerId === customer.id
                        );
                        const bucket030 = customerReceivables
                          .filter(r => r.daysOverdue <= 30)
                          .reduce((sum, r) => sum + r.amount, 0);
                        const bucket3160 = customerReceivables
                          .filter(r => r.daysOverdue > 30 && r.daysOverdue <= 60)
                          .reduce((sum, r) => sum + r.amount, 0);
                        const bucket6190 = customerReceivables
                          .filter(r => r.daysOverdue > 60 && r.daysOverdue <= 90)
                          .reduce((sum, r) => sum + r.amount, 0);
                        const bucket90plus = customerReceivables
                          .filter(r => r.daysOverdue > 90)
                          .reduce((sum, r) => sum + r.amount, 0);
                        const total = customer.totalOutstanding;

                        return (
                          <tr key={customer.id}>
                            <td>
                              <strong>{customer.name}</strong>
                            </td>
                            <td className="text-right aging-cell-current">
                              {bucket030 > 0 ? formatCurrency(bucket030) : '-'}
                            </td>
                            <td className="text-right aging-cell-30">
                              {bucket3160 > 0 ? formatCurrency(bucket3160) : '-'}
                            </td>
                            <td className="text-right aging-cell-60">
                              {bucket6190 > 0 ? formatCurrency(bucket6190) : '-'}
                            </td>
                            <td className="text-right aging-cell-90">
                              {bucket90plus > 0 ? formatCurrency(bucket90plus) : '-'}
                            </td>
                            <td className="text-right">
                              <strong>{formatCurrency(total)}</strong>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Due Date Alerts Tab */}
          {activeTab === 'alerts' && (
            <div className="alerts-section">
              <div className="section-toolbar">
                <div className="toolbar-actions">
                  <button className="btn-primary" onClick={() => setShowReminderModal(true)}>
                    <Send size={18} />
                    Send Bulk Reminders
                  </button>
                  <button className="btn-secondary">
                    <Download size={18} />
                    Export Alert List
                  </button>
                </div>
              </div>

              <div className="alerts-list">
                {dueAlerts.map(alert => (
                  <div key={alert.id} className="alert-card">
                    <div className="alert-header">
                      <div className="alert-icon">
                        <Bell size={24} />
                      </div>
                      <div className="alert-info">
                        <h4>{alert.customerName}</h4>
                        <p className="alert-amount">{formatCurrency(alert.amount)} due</p>
                      </div>
                      <div className="alert-due">
                        <span className={`due-badge ${alert.daysUntilDue <= 3 ? 'urgent' : ''}`}>
                          {alert.daysUntilDue === 0 ? 'Due Today' :
                           alert.daysUntilDue === 1 ? 'Due Tomorrow' :
                           `Due in ${alert.daysUntilDue} days`}
                        </span>
                      </div>
                    </div>
                    <div className="alert-body">
                      <div className="alert-detail">
                        <Calendar size={16} />
                        <span>Due Date: {formatDate(alert.dueDate)}</span>
                      </div>
                      {alert.reminderSent && (
                        <div className="alert-detail reminder-sent">
                          <CheckCircle size={16} />
                          <span>Reminder sent on {formatDate(alert.lastReminderDate!)}</span>
                        </div>
                      )}
                    </div>
                    <div className="alert-actions">
                      <button className="btn-alert-action">
                        <Mail size={16} />
                        Send Email
                      </button>
                      <button className="btn-alert-action">
                        <MessageSquare size={16} />
                        WhatsApp
                      </button>
                      <button className="btn-alert-action">
                        <Phone size={16} />
                        Call
                      </button>
                      <button className="btn-alert-action primary">
                        <DollarSign size={16} />
                        Record Payment
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="reminder-templates">
                <h3>Reminder Templates</h3>
                <div className="template-cards">
                  <div className="template-card">
                    <h4>Polite Reminder</h4>
                    <p>For payments due within 7 days</p>
                    <button className="btn-secondary">Use Template</button>
                  </div>
                  <div className="template-card">
                    <h4>Urgent Notice</h4>
                    <p>For overdue payments (1-30 days)</p>
                    <button className="btn-secondary">Use Template</button>
                  </div>
                  <div className="template-card">
                    <h4>Final Notice</h4>
                    <p>For severely overdue payments (60+ days)</p>
                    <button className="btn-secondary">Use Template</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="modal-overlay" onClick={() => setShowPaymentModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Record Payment Receipt</h2>
              <button className="modal-close" onClick={() => setShowPaymentModal(false)}>
                <XCircle size={24} />
              </button>
            </div>
            <div className="modal-body">
              <form className="payment-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Receipt Number</label>
                    <input
                      type="text"
                      value="RCP-2024-0146"
                      readOnly
                      className="readonly-input"
                    />
                    <small>Auto-generated</small>
                  </div>
                  <div className="form-group">
                    <label>Payment Date</label>
                    <input type="date" defaultValue={new Date().toISOString().split('T')[0]} />
                  </div>
                </div>

                <div className="form-group">
                  <label>Select Customer</label>
                  <select>
                    <option value="">Choose customer...</option>
                    {customers.map(customer => (
                      <option key={customer.id} value={customer.id}>
                        {customer.name} - Outstanding: {formatCurrency(customer.totalOutstanding)}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Payment Amount</label>
                    <input type="number" placeholder="0.00" min="0" step="0.01" />
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
                </div>

                <div className="form-group">
                  <label>Reference Number (Optional)</label>
                  <input type="text" placeholder="Transaction ID, Cheque No, etc." />
                </div>

                <div className="form-group">
                  <label>Notes</label>
                  <textarea rows={3} placeholder="Additional notes or comments..."></textarea>
                </div>

                <div className="form-actions">
                  <button type="button" className="btn-secondary" onClick={() => setShowPaymentModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary">
                    <Receipt size={18} />
                    Generate Receipt
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Reminder Modal */}
      {showReminderModal && (
        <div className="modal-overlay" onClick={() => setShowReminderModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Send Payment Reminder</h2>
              <button className="modal-close" onClick={() => setShowReminderModal(false)}>
                <XCircle size={24} />
              </button>
            </div>
            <div className="modal-body">
              <form className="reminder-form">
                <div className="form-group">
                  <label>Select Recipients</label>
                  <div className="recipient-list">
                    {outstandingReceivables
                      .filter(r => r.daysOverdue > 0)
                      .map(receivable => (
                        <label key={receivable.id} className="checkbox-label">
                          <input type="checkbox" />
                          <span>
                            {receivable.customerName} - {formatCurrency(receivable.amount)} 
                            ({receivable.daysOverdue} days overdue)
                          </span>
                        </label>
                      ))}
                  </div>
                </div>

                <div className="form-group">
                  <label>Reminder Type</label>
                  <select>
                    <option value="email">Email</option>
                    <option value="sms">SMS</option>
                    <option value="whatsapp">WhatsApp</option>
                    <option value="all">All Methods</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Message Template</label>
                  <select>
                    <option value="polite">Polite Reminder</option>
                    <option value="urgent">Urgent Notice</option>
                    <option value="final">Final Notice</option>
                    <option value="custom">Custom Message</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Message Preview</label>
                  <textarea
                    rows={5}
                    defaultValue="Dear Customer,

This is a friendly reminder that your payment of [AMOUNT] for invoice [INVOICE_NO] was due on [DUE_DATE].

Please process the payment at your earliest convenience.

Thank you for your business.
Best regards,
Your Company"
                  ></textarea>
                </div>

                <div className="form-actions">
                  <button type="button" className="btn-secondary" onClick={() => setShowReminderModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary">
                    <Send size={18} />
                    Send Reminders
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Adjustment Modal */}
      {showAdjustmentModal && (
        <div className="modal-overlay" onClick={() => setShowAdjustmentModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Add Ledger Adjustment</h2>
              <button className="modal-close" onClick={() => setShowAdjustmentModal(false)}>
                <XCircle size={24} />
              </button>
            </div>
            <div className="modal-body">
              <form className="adjustment-form">
                <div className="form-group">
                  <label>Select Customer</label>
                  <select>
                    <option value="">Choose customer...</option>
                    {customers.map(customer => (
                      <option key={customer.id} value={customer.id}>
                        {customer.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Adjustment Date</label>
                    <input type="date" defaultValue={new Date().toISOString().split('T')[0]} />
                  </div>
                  <div className="form-group">
                    <label>Adjustment Type</label>
                    <select>
                      <option value="credit_note">Credit Note</option>
                      <option value="debit_note">Debit Note</option>
                      <option value="write_off">Write Off</option>
                      <option value="correction">Correction</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>Amount</label>
                  <input type="number" placeholder="0.00" min="0" step="0.01" />
                </div>

                <div className="form-group">
                  <label>Description</label>
                  <textarea rows={3} placeholder="Reason for adjustment..."></textarea>
                </div>

                <div className="form-group">
                  <label>Reference Number (Optional)</label>
                  <input type="text" placeholder="Document reference, approval number, etc." />
                </div>

                <div className="form-actions">
                  <button type="button" className="btn-secondary" onClick={() => setShowAdjustmentModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary">
                    <CheckCircle size={18} />
                    Create Adjustment
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

export default Receivables;
