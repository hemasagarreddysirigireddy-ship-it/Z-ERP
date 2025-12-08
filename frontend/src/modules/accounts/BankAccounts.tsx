import React, { useState } from 'react';
import { 
  Building2, 
  Plus, 
  Search, 
  Download, 
  Eye, 
  Edit2, 
  Trash2, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Calendar,
  DollarSign,
  FileText,
  CheckCircle,
  XCircle,
  Clock,
  MoreVertical,
  User,
  CreditCard,
  TrendingUp,
  Repeat,
  Phone,
  Mail,
  MapPin,
  Hash,
  Shield
} from 'lucide-react';
import './BankAccounts.css';

// Enhanced interfaces with complete banking details
interface AccountHolder {
  name: string;
  email: string;
  phone: string;
  address: string;
  panNumber: string;
  aadharNumber: string;
}

interface BankAccount {
  id: string;
  accountName: string; // Custom account name for easy identification
  accountHolderName: string;
  accountHolder: AccountHolder;
  bankName: string;
  accountNumber: string;
  accountType: 'Savings' | 'Current' | 'Fixed Deposit' | 'Recurring Deposit';
  balance: number;
  currency: string;
  ifscCode: string;
  swiftCode?: string;
  branchName: string;
  branchCode: string;
  branchAddress: string;
  micrCode: string;
  isActive: boolean;
  isPrimary: boolean;
  openingDate: string;
  lastUpdated: string;
  minimumBalance: number;
  overdraftLimit?: number;
  interestRate?: number;
}

interface Transaction {
  id: string;
  accountId: string;
  date: string;
  time: string;
  description: string;
  transactionType: 'sent' | 'received'; // Simplified to sent/received
  amount: number;
  balanceAfter: number;
  category: string;
  reference: string;
  utrNumber: string; // Unique Transaction Reference
  paymentMethod: 'NEFT' | 'RTGS' | 'IMPS' | 'UPI' | 'Cheque' | 'Cash' | 'Online';
  status: 'completed' | 'pending' | 'failed';
  shortNote: string; // User's short note about transaction
  reason: string; // Detailed reason for transaction
  fromAccount?: string;
  toAccount?: string;
  toIfscCode?: string;
  fromIfscCode?: string;
  attachments: string[];
  tags: string[];
}

const BankAccounts: React.FC = () => {
  const [viewMode, setViewMode] = useState<'overview' | 'transactions' | 'accounts'>('overview');
  const [selectedAccount, setSelectedAccount] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'sent' | 'received'>('all');
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

  // Sample bank accounts with complete details
  const [bankAccounts] = useState<BankAccount[]>([
    {
      id: 'acc1',
      accountName: 'Primary Business Account',
      accountHolderName: 'Acme Corporation Pvt Ltd',
      accountHolder: {
        name: 'Acme Corporation Pvt Ltd',
        email: 'accounts@acmecorp.com',
        phone: '+91 98765 43210',
        address: '123 Business Tower, MG Road, Bangalore 560001',
        panNumber: 'AAACA1234C',
        aadharNumber: '1234-5678-9012'
      },
      bankName: 'HDFC Bank',
      accountNumber: '50200012345678',
      accountType: 'Current',
      balance: 2847650.50,
      currency: 'INR',
      ifscCode: 'HDFC0001234',
      swiftCode: 'HDFCINBBXXX',
      branchName: 'MG Road Branch',
      branchCode: '001234',
      branchAddress: 'MG Road, Bangalore, Karnataka 560001',
      micrCode: '560240002',
      isActive: true,
      isPrimary: true,
      openingDate: '2020-01-15',
      lastUpdated: '2024-12-05T10:30:00',
      minimumBalance: 10000,
      overdraftLimit: 500000,
      interestRate: 3.5
    },
    {
      id: 'acc2',
      accountName: 'Payroll Account',
      accountHolderName: 'Acme Corporation Pvt Ltd',
      accountHolder: {
        name: 'Acme Corporation Pvt Ltd',
        email: 'payroll@acmecorp.com',
        phone: '+91 98765 43210',
        address: '123 Business Tower, MG Road, Bangalore 560001',
        panNumber: 'AAACA1234C',
        aadharNumber: '1234-5678-9012'
      },
      bankName: 'ICICI Bank',
      accountNumber: '000405012345',
      accountType: 'Current',
      balance: 1523400.00,
      currency: 'INR',
      ifscCode: 'ICIC0000004',
      swiftCode: 'ICICINBBXXX',
      branchName: 'Indiranagar Branch',
      branchCode: '000004',
      branchAddress: 'Indiranagar, Bangalore, Karnataka 560038',
      micrCode: '560229002',
      isActive: true,
      isPrimary: false,
      openingDate: '2020-06-20',
      lastUpdated: '2024-12-05T09:15:00',
      minimumBalance: 25000,
      interestRate: 3.25
    },
    {
      id: 'acc3',
      accountName: 'Reserve Fund',
      accountHolderName: 'Acme Corporation Pvt Ltd',
      accountHolder: {
        name: 'Acme Corporation Pvt Ltd',
        email: 'finance@acmecorp.com',
        phone: '+91 98765 43210',
        address: '123 Business Tower, MG Road, Bangalore 560001',
        panNumber: 'AAACA1234C',
        aadharNumber: '1234-5678-9012'
      },
      bankName: 'State Bank of India',
      accountNumber: '12345678901',
      accountType: 'Savings',
      balance: 3250000.00,
      currency: 'INR',
      ifscCode: 'SBIN0001234',
      swiftCode: 'SBININBBXXX',
      branchName: 'Koramangala Branch',
      branchCode: '001234',
      branchAddress: 'Koramangala, Bangalore, Karnataka 560034',
      micrCode: '560002345',
      isActive: true,
      isPrimary: false,
      openingDate: '2019-03-10',
      lastUpdated: '2024-12-04T16:45:00',
      minimumBalance: 5000,
      interestRate: 3.0
    },
    {
      id: 'acc4',
      accountName: 'Vendor Payments',
      accountHolderName: 'Acme Corporation Pvt Ltd',
      accountHolder: {
        name: 'Acme Corporation Pvt Ltd',
        email: 'vendors@acmecorp.com',
        phone: '+91 98765 43210',
        address: '123 Business Tower, MG Road, Bangalore 560001',
        panNumber: 'AAACA1234C',
        aadharNumber: '1234-5678-9012'
      },
      bankName: 'Axis Bank',
      accountNumber: '917020012345678',
      accountType: 'Current',
      balance: 986320.75,
      currency: 'INR',
      ifscCode: 'UTIB0001234',
      swiftCode: 'AXISINBBXXX',
      branchName: 'Whitefield Branch',
      branchCode: '001234',
      branchAddress: 'Whitefield, Bangalore, Karnataka 560066',
      micrCode: '560211002',
      isActive: true,
      isPrimary: false,
      openingDate: '2021-08-05',
      lastUpdated: '2024-12-05T11:20:00',
      minimumBalance: 10000,
      overdraftLimit: 200000,
      interestRate: 3.5
    }
  ]);

  // Sample transactions with complete details
  const [transactions] = useState<Transaction[]>([
    {
      id: 'txn001',
      accountId: 'acc1',
      date: '2024-12-05',
      time: '10:30 AM',
      description: 'Payment to TechVendor Solutions',
      transactionType: 'sent',
      amount: 125000.00,
      balanceAfter: 2847650.50,
      category: 'Vendor Payment',
      reference: 'INV-2024-1234',
      utrNumber: 'HDFC240512345678',
      paymentMethod: 'RTGS',
      status: 'completed',
      shortNote: 'Software license renewal',
      reason: 'Annual software license payment for enterprise suite - Invoice INV-2024-1234. Includes maintenance and support for 12 months.',
      toAccount: 'TechVendor Solutions - 98765432109',
      toIfscCode: 'HDFC0004567',
      attachments: ['invoice-1234.pdf', 'payment-receipt.pdf'],
      tags: ['vendor', 'software', 'recurring']
    },
    {
      id: 'txn002',
      accountId: 'acc1',
      date: '2024-12-05',
      time: '09:15 AM',
      description: 'Payment received from Client ABC',
      transactionType: 'received',
      amount: 350000.00,
      balanceAfter: 2972650.50,
      category: 'Client Payment',
      reference: 'INV-CLI-5678',
      utrNumber: 'ICIC240598765432',
      paymentMethod: 'NEFT',
      status: 'completed',
      shortNote: 'Project milestone payment',
      reason: 'Payment for Project Phoenix Phase 2 completion. Milestone 3 of 5 achieved. Includes development, testing, and deployment.',
      fromAccount: 'ABC Corporation - 12345678901',
      fromIfscCode: 'ICIC0001234',
      attachments: ['client-invoice.pdf'],
      tags: ['revenue', 'project', 'milestone']
    },
    {
      id: 'txn003',
      accountId: 'acc2',
      date: '2024-12-04',
      time: '02:30 PM',
      description: 'Salary credit to employees',
      transactionType: 'sent',
      amount: 850000.00,
      balanceAfter: 1523400.00,
      category: 'Payroll',
      reference: 'SAL-NOV-2024',
      utrNumber: 'ICIC240487654321',
      paymentMethod: 'NEFT',
      status: 'completed',
      shortNote: 'November 2024 salary',
      reason: 'Monthly salary disbursement for November 2024. Total 25 employees. Includes base salary, allowances, and bonuses.',
      attachments: ['payroll-november.pdf', 'salary-register.xlsx'],
      tags: ['payroll', 'salary', 'monthly']
    },
    {
      id: 'txn004',
      accountId: 'acc1',
      date: '2024-12-04',
      time: '11:20 AM',
      description: 'Rent payment for office premises',
      transactionType: 'sent',
      amount: 180000.00,
      balanceAfter: 3122650.50,
      category: 'Rent',
      reference: 'RENT-DEC-2024',
      utrNumber: 'HDFC240476543210',
      paymentMethod: 'Cheque',
      status: 'completed',
      shortNote: 'December rent payment',
      reason: 'Office rent for December 2024. 5000 sq ft commercial space at Business Tower, MG Road. Includes maintenance charges.',
      toAccount: 'Property Management Ltd - 55566677788',
      toIfscCode: 'HDFC0002345',
      attachments: ['rent-agreement.pdf', 'cheque-copy.pdf'],
      tags: ['rent', 'office', 'monthly']
    },
    {
      id: 'txn005',
      accountId: 'acc1',
      date: '2024-12-03',
      time: '04:45 PM',
      description: 'Payment received from Client XYZ',
      transactionType: 'received',
      amount: 275000.00,
      balanceAfter: 3302650.50,
      category: 'Client Payment',
      reference: 'INV-CLI-9012',
      utrNumber: 'SBIN240365432109',
      paymentMethod: 'IMPS',
      status: 'completed',
      shortNote: 'Consulting fees Q4',
      reason: 'Quarterly consulting services payment for Q4 2024. Strategic advisory and implementation support. 40 hours of expert consultation.',
      fromAccount: 'XYZ Enterprises - 99887766554',
      fromIfscCode: 'SBIN0005678',
      attachments: ['consulting-invoice.pdf', 'timesheet.xlsx'],
      tags: ['revenue', 'consulting', 'quarterly']
    },
    {
      id: 'txn006',
      accountId: 'acc4',
      date: '2024-12-03',
      time: '01:15 PM',
      description: 'Utility bill payment',
      transactionType: 'sent',
      amount: 45320.00,
      balanceAfter: 986320.75,
      category: 'Utilities',
      reference: 'UTIL-NOV-2024',
      utrNumber: 'UTIB240354321098',
      paymentMethod: 'Online',
      status: 'completed',
      shortNote: 'Electricity and water bills',
      reason: 'Combined utility payment for November 2024. Includes electricity (₹35,000), water (₹8,000), and internet (₹2,320).',
      toAccount: 'Bangalore Electricity Board',
      attachments: ['electricity-bill.pdf', 'water-bill.pdf'],
      tags: ['utilities', 'bills', 'monthly']
    },
    {
      id: 'txn007',
      accountId: 'acc2',
      date: '2024-12-02',
      time: '10:00 AM',
      description: 'Employee reimbursements',
      transactionType: 'sent',
      amount: 65800.00,
      balanceAfter: 2373400.00,
      category: 'Reimbursement',
      reference: 'REIMB-NOV-2024',
      utrNumber: 'ICIC240243210987',
      paymentMethod: 'NEFT',
      status: 'completed',
      shortNote: 'Travel and expense claims',
      reason: 'Monthly reimbursement for employee travel, meals, and business expenses. 15 claims processed for November 2024.',
      attachments: ['reimbursement-summary.pdf', 'expense-reports.zip'],
      tags: ['reimbursement', 'expenses', 'monthly']
    },
    {
      id: 'txn008',
      accountId: 'acc1',
      date: '2024-12-02',
      time: '03:30 PM',
      description: 'GST payment to government',
      transactionType: 'sent',
      amount: 158900.00,
      balanceAfter: 3027650.50,
      category: 'Tax',
      reference: 'GST-NOV-2024',
      utrNumber: 'HDFC240232109876',
      paymentMethod: 'Online',
      status: 'completed',
      shortNote: 'Monthly GST payment',
      reason: 'GST payment for November 2024. CGST: ₹79,450, SGST: ₹79,450. Filed GSTR-3B return. Period: 01-Nov to 30-Nov 2024.',
      attachments: ['gst-challan.pdf', 'gstr-3b.pdf'],
      tags: ['tax', 'gst', 'monthly', 'compliance']
    },
    {
      id: 'txn009',
      accountId: 'acc1',
      date: '2024-12-01',
      time: '11:45 AM',
      description: 'Payment received from Client DEF',
      transactionType: 'received',
      amount: 425000.00,
      balanceAfter: 3186550.50,
      category: 'Client Payment',
      reference: 'INV-CLI-3456',
      utrNumber: 'HDFC240121098765',
      paymentMethod: 'RTGS',
      status: 'completed',
      shortNote: 'Product delivery payment',
      reason: 'Final payment for custom software product delivery. Project completed successfully. Includes training and documentation.',
      fromAccount: 'DEF Industries - 44455566677',
      fromIfscCode: 'HDFC0006789',
      attachments: ['final-invoice.pdf', 'delivery-note.pdf', 'acceptance-letter.pdf'],
      tags: ['revenue', 'product', 'final-payment']
    },
    {
      id: 'txn010',
      accountId: 'acc4',
      date: '2024-12-01',
      time: '09:30 AM',
      description: 'Office supplies purchase',
      transactionType: 'sent',
      amount: 28450.00,
      balanceAfter: 1031640.75,
      category: 'Office Expenses',
      reference: 'PO-2024-789',
      utrNumber: 'UTIB240110987654',
      paymentMethod: 'UPI',
      status: 'completed',
      shortNote: 'Stationery and supplies',
      reason: 'Monthly office supplies procurement. Includes stationery, printer cartridges, pantry items, and cleaning supplies.',
      toAccount: 'Office Mart Pvt Ltd - 33344455566',
      toIfscCode: 'ICIC0007890',
      attachments: ['purchase-order.pdf', 'delivery-receipt.pdf'],
      tags: ['office', 'supplies', 'monthly']
    },
    {
      id: 'txn011',
      accountId: 'acc1',
      date: '2024-11-30',
      time: '02:15 PM',
      description: 'Investment in mutual funds',
      transactionType: 'sent',
      amount: 500000.00,
      balanceAfter: 2761550.50,
      category: 'Investment',
      reference: 'MF-INV-2024-11',
      utrNumber: 'HDFC240130876543',
      paymentMethod: 'RTGS',
      status: 'completed',
      shortNote: 'Monthly SIP investment',
      reason: 'Monthly systematic investment plan (SIP) in diversified equity mutual funds. Long-term wealth creation strategy.',
      toAccount: 'HDFC Mutual Fund',
      attachments: ['investment-confirmation.pdf'],
      tags: ['investment', 'mutual-fund', 'sip']
    },
    {
      id: 'txn012',
      accountId: 'acc1',
      date: '2024-11-29',
      time: '05:00 PM',
      description: 'Interest credited by bank',
      transactionType: 'received',
      amount: 12560.50,
      balanceAfter: 3261550.50,
      category: 'Interest Income',
      reference: 'INT-Q4-2024',
      utrNumber: 'HDFC240129765432',
      paymentMethod: 'Online',
      status: 'completed',
      shortNote: 'Quarterly interest credit',
      reason: 'Interest earned on average quarterly balance. Rate: 3.5% per annum. Period: October to December 2024.',
      attachments: ['interest-certificate.pdf'],
      tags: ['interest', 'income', 'quarterly']
    }
  ]);

  // Calculate statistics
  const totalBalance = bankAccounts.reduce((sum, acc) => sum + acc.balance, 0);
  const activeAccounts = bankAccounts.filter(acc => acc.isActive).length;
  
  const filteredTransactions = transactions.filter(txn => {
    const matchesAccount = selectedAccount === 'all' || txn.accountId === selectedAccount;
    const matchesSearch = searchQuery === '' || 
      txn.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      txn.shortNote.toLowerCase().includes(searchQuery.toLowerCase()) ||
      txn.reason.toLowerCase().includes(searchQuery.toLowerCase()) ||
      txn.reference.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'all' || txn.transactionType === filterType;
    
    return matchesAccount && matchesSearch && matchesType;
  });

  const totalSent = transactions
    .filter(t => t.transactionType === 'sent' && t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const totalReceived = transactions
    .filter(t => t.transactionType === 'received' && t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  return (
    <div className="bank-accounts-modern">
      {/* Header */}
      <div className="bank-header">
        <div className="bank-header-left">
          <Building2 className="bank-icon-main" />
          <div>
            <h1>Banking & Accounts</h1>
            <p>Manage your bank accounts and transactions</p>
          </div>
        </div>
        <div className="bank-header-actions">
          <button className="btn-secondary">
            <Plus size={18} />
            New Transaction
          </button>
          <button className="btn-primary">
            <Plus size={18} />
            Add Account
          </button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="bank-stats-grid">
        <div className="stat-card stat-primary">
          <div className="stat-icon">
            <DollarSign size={24} />
          </div>
          <div className="stat-content">
            <div className="stat-label">Total Balance</div>
            <div className="stat-value">{formatCurrency(totalBalance)}</div>
            <div className="stat-change positive">
              <TrendingUp size={14} />
              <span>+8.2% from last month</span>
            </div>
          </div>
        </div>

        <div className="stat-card stat-success">
          <div className="stat-icon">
            <ArrowDownLeft size={24} />
          </div>
          <div className="stat-content">
            <div className="stat-label">Money Received</div>
            <div className="stat-value">{formatCurrency(totalReceived)}</div>
            <div className="stat-subtitle">{transactions.filter(t => t.transactionType === 'received').length} transactions</div>
          </div>
        </div>

        <div className="stat-card stat-danger">
          <div className="stat-icon">
            <ArrowUpRight size={24} />
          </div>
          <div className="stat-content">
            <div className="stat-label">Money Sent</div>
            <div className="stat-value">{formatCurrency(totalSent)}</div>
            <div className="stat-subtitle">{transactions.filter(t => t.transactionType === 'sent').length} transactions</div>
          </div>
        </div>

        <div className="stat-card stat-info">
          <div className="stat-icon">
            <Building2 size={24} />
          </div>
          <div className="stat-content">
            <div className="stat-label">Active Accounts</div>
            <div className="stat-value">{activeAccounts}</div>
            <div className="stat-subtitle">Across {new Set(bankAccounts.map(a => a.bankName)).size} banks</div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bank-nav-tabs">
        <button 
          className={`nav-tab ${viewMode === 'overview' ? 'active' : ''}`}
          onClick={() => setViewMode('overview')}
        >
          <FileText size={18} />
          Overview
        </button>
        <button 
          className={`nav-tab ${viewMode === 'transactions' ? 'active' : ''}`}
          onClick={() => setViewMode('transactions')}
        >
          <Repeat size={18} />
          Transactions
        </button>
        <button 
          className={`nav-tab ${viewMode === 'accounts' ? 'active' : ''}`}
          onClick={() => setViewMode('accounts')}
        >
          <Building2 size={18} />
          Account Details
        </button>
      </div>

      {/* Content Area */}
      <div className="bank-content">
        {/* Overview Mode */}
        {viewMode === 'overview' && (
          <div className="overview-content">
            <div className="accounts-grid">
              {bankAccounts.map(account => (
                <div key={account.id} className={`account-card ${account.isPrimary ? 'primary' : ''}`}>
                  <div className="account-card-header">
                    <div className="account-card-title">
                      <Building2 className="account-icon" />
                      <div>
                        <h3>{account.accountName}</h3>
                        <p className="account-type">{account.accountType}</p>
                      </div>
                    </div>
                    {account.isPrimary && <span className="badge-primary">Primary</span>}
                    <div className="account-actions">
                      <button className="icon-btn"><Eye size={16} /></button>
                      <button className="icon-btn"><Edit2 size={16} /></button>
                      <button className="icon-btn"><MoreVertical size={16} /></button>
                    </div>
                  </div>
                  
                  <div className="account-card-body">
                    <div className="account-balance">
                      <span className="balance-label">Current Balance</span>
                      <span className="balance-amount">{formatCurrency(account.balance)}</span>
                    </div>

                    <div className="account-details-grid">
                      <div className="detail-item">
                        <Hash size={14} />
                        <div>
                          <span className="detail-label">Account Number</span>
                          <span className="detail-value">{account.accountNumber}</span>
                        </div>
                      </div>
                      <div className="detail-item">
                        <Building2 size={14} />
                        <div>
                          <span className="detail-label">Bank Name</span>
                          <span className="detail-value">{account.bankName}</span>
                        </div>
                      </div>
                      <div className="detail-item">
                        <FileText size={14} />
                        <div>
                          <span className="detail-label">IFSC Code</span>
                          <span className="detail-value">{account.ifscCode}</span>
                        </div>
                      </div>
                      <div className="detail-item">
                        <User size={14} />
                        <div>
                          <span className="detail-label">Account Holder</span>
                          <span className="detail-value">{account.accountHolderName}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="account-card-footer">
                    <div className="account-status">
                      {account.isActive ? (
                        <span className="status-badge active">
                          <CheckCircle size={12} />
                          Active
                        </span>
                      ) : (
                        <span className="status-badge inactive">
                          <XCircle size={12} />
                          Inactive
                        </span>
                      )}
                    </div>
                    <div className="account-updated">
                      <Clock size={12} />
                      Updated {new Date(account.lastUpdated).toLocaleTimeString('en-IN', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Transactions Preview */}
            <div className="recent-transactions-section">
              <div className="section-header">
                <h2>Recent Transactions</h2>
                <button className="link-btn" onClick={() => setViewMode('transactions')}>
                  View All <ArrowUpRight size={16} />
                </button>
              </div>
              <div className="transactions-preview">
                {transactions.slice(0, 5).map(txn => (
                  <div key={txn.id} className="transaction-preview-item">
                    <div className="txn-icon-wrapper" data-type={txn.transactionType}>
                      {txn.transactionType === 'sent' ? (
                        <ArrowUpRight size={18} />
                      ) : (
                        <ArrowDownLeft size={18} />
                      )}
                    </div>
                    <div className="txn-details">
                      <div className="txn-description">{txn.description}</div>
                      <div className="txn-meta">
                        <span>{txn.date}</span>
                        <span>•</span>
                        <span>{txn.time}</span>
                        <span>•</span>
                        <span className="txn-method">{txn.paymentMethod}</span>
                      </div>
                    </div>
                    <div className={`txn-amount ${txn.transactionType}`}>
                      {txn.transactionType === 'sent' ? '-' : '+'}
                      {formatCurrency(txn.amount)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Transactions Mode */}
        {viewMode === 'transactions' && (
          <div className="transactions-content">
            {/* Filters */}
            <div className="transactions-filters">
              <div className="search-box">
                <Search size={18} />
                <input
                  type="text"
                  placeholder="Search by description, note, reason, or reference..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <select 
                className="filter-select"
                value={selectedAccount}
                onChange={(e) => setSelectedAccount(e.target.value)}
              >
                <option value="all">All Accounts</option>
                {bankAccounts.map(acc => (
                  <option key={acc.id} value={acc.id}>{acc.accountName}</option>
                ))}
              </select>

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

              <button className="btn-secondary">
                <Download size={18} />
                Export
              </button>
            </div>

            {/* Transactions List */}
            <div className="transactions-list">
              {filteredTransactions.length === 0 ? (
                <div className="empty-state">
                  <FileText size={48} />
                  <h3>No transactions found</h3>
                  <p>Try adjusting your filters or search query</p>
                </div>
              ) : (
                filteredTransactions.map(txn => (
                  <div 
                    key={txn.id} 
                    className="transaction-item"
                    onClick={() => setSelectedTransaction(txn)}
                  >
                    <div className="txn-left">
                      <div className={`txn-icon ${txn.transactionType}`}>
                        {txn.transactionType === 'sent' ? (
                          <ArrowUpRight size={20} />
                        ) : (
                          <ArrowDownLeft size={20} />
                        )}
                      </div>
                      <div className="txn-info">
                        <div className="txn-header">
                          <h4>{txn.description}</h4>
                          <div className="txn-badges">
                            <span className={`status-badge ${txn.status}`}>
                              {txn.status === 'completed' && <CheckCircle size={12} />}
                              {txn.status === 'pending' && <Clock size={12} />}
                              {txn.status === 'failed' && <XCircle size={12} />}
                              {txn.status}
                            </span>
                            <span className="method-badge">{txn.paymentMethod}</span>
                          </div>
                        </div>
                        <div className="txn-note">{txn.shortNote}</div>
                        <div className="txn-metadata">
                          <span className="txn-date">
                            <Calendar size={12} />
                            {txn.date} at {txn.time}
                          </span>
                          <span className="txn-ref">
                            <Hash size={12} />
                            {txn.reference}
                          </span>
                          <span className="txn-utr">
                            <FileText size={12} />
                            UTR: {txn.utrNumber}
                          </span>
                          {txn.category && (
                            <span className="txn-category">{txn.category}</span>
                          )}
                        </div>
                        {txn.transactionType === 'sent' && txn.toAccount && (
                          <div className="txn-party">
                            <ArrowUpRight size={12} />
                            To: {txn.toAccount} ({txn.toIfscCode})
                          </div>
                        )}
                        {txn.transactionType === 'received' && txn.fromAccount && (
                          <div className="txn-party">
                            <ArrowDownLeft size={12} />
                            From: {txn.fromAccount} ({txn.fromIfscCode})
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="txn-right">
                      <div className={`txn-amount ${txn.transactionType}`}>
                        {txn.transactionType === 'sent' ? '-' : '+'}
                        {formatCurrency(txn.amount)}
                      </div>
                      <div className="txn-balance">
                        Balance: {formatCurrency(txn.balanceAfter)}
                      </div>
                      {txn.tags.length > 0 && (
                        <div className="txn-tags">
                          {txn.tags.slice(0, 3).map(tag => (
                            <span key={tag} className="tag">{tag}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Account Details Mode */}
        {viewMode === 'accounts' && (
          <div className="accounts-details-content">
            {bankAccounts.map(account => (
              <div key={account.id} className="account-detail-card">
                <div className="account-detail-header">
                  <div className="account-detail-title">
                    <Building2 size={24} />
                    <div>
                      <h3>{account.accountName}</h3>
                      <p>{account.bankName}</p>
                    </div>
                  </div>
                  {account.isPrimary && <span className="badge-primary">Primary Account</span>}
                  {account.isActive ? (
                    <span className="status-badge active">
                      <CheckCircle size={14} />
                      Active
                    </span>
                  ) : (
                    <span className="status-badge inactive">
                      <XCircle size={14} />
                      Inactive
                    </span>
                  )}
                </div>

                <div className="account-detail-body">
                  {/* Account Information */}
                  <div className="detail-section">
                    <h4>Account Information</h4>
                    <div className="detail-grid">
                      <div className="detail-row">
                        <span className="detail-label">Account Number</span>
                        <span className="detail-value">{account.accountNumber}</span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">Account Type</span>
                        <span className="detail-value">{account.accountType}</span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">Current Balance</span>
                        <span className="detail-value balance">{formatCurrency(account.balance)}</span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">Currency</span>
                        <span className="detail-value">{account.currency}</span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">Minimum Balance</span>
                        <span className="detail-value">{formatCurrency(account.minimumBalance)}</span>
                      </div>
                      {account.overdraftLimit && (
                        <div className="detail-row">
                          <span className="detail-label">Overdraft Limit</span>
                          <span className="detail-value">{formatCurrency(account.overdraftLimit)}</span>
                        </div>
                      )}
                      {account.interestRate && (
                        <div className="detail-row">
                          <span className="detail-label">Interest Rate</span>
                          <span className="detail-value">{account.interestRate}% p.a.</span>
                        </div>
                      )}
                      <div className="detail-row">
                        <span className="detail-label">Opening Date</span>
                        <span className="detail-value">{formatDate(account.openingDate)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Bank Details */}
                  <div className="detail-section">
                    <h4>Bank Details</h4>
                    <div className="detail-grid">
                      <div className="detail-row">
                        <span className="detail-label">IFSC Code</span>
                        <span className="detail-value code">{account.ifscCode}</span>
                      </div>
                      {account.swiftCode && (
                        <div className="detail-row">
                          <span className="detail-label">SWIFT Code</span>
                          <span className="detail-value code">{account.swiftCode}</span>
                        </div>
                      )}
                      <div className="detail-row">
                        <span className="detail-label">MICR Code</span>
                        <span className="detail-value code">{account.micrCode}</span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">Branch Name</span>
                        <span className="detail-value">{account.branchName}</span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">Branch Code</span>
                        <span className="detail-value">{account.branchCode}</span>
                      </div>
                      <div className="detail-row full-width">
                        <span className="detail-label">Branch Address</span>
                        <span className="detail-value">{account.branchAddress}</span>
                      </div>
                    </div>
                  </div>

                  {/* Account Holder Details */}
                  <div className="detail-section">
                    <h4>Account Holder Details</h4>
                    <div className="detail-grid">
                      <div className="detail-row">
                        <span className="detail-label">
                          <User size={14} />
                          Name
                        </span>
                        <span className="detail-value">{account.accountHolder.name}</span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">
                          <Mail size={14} />
                          Email
                        </span>
                        <span className="detail-value">{account.accountHolder.email}</span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">
                          <Phone size={14} />
                          Phone
                        </span>
                        <span className="detail-value">{account.accountHolder.phone}</span>
                      </div>
                      <div className="detail-row full-width">
                        <span className="detail-label">
                          <MapPin size={14} />
                          Address
                        </span>
                        <span className="detail-value">{account.accountHolder.address}</span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">
                          <Shield size={14} />
                          PAN Number
                        </span>
                        <span className="detail-value code">{account.accountHolder.panNumber}</span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">
                          <CreditCard size={14} />
                          Aadhar Number
                        </span>
                        <span className="detail-value code">{account.accountHolder.aadharNumber}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="account-detail-footer">
                  <button className="btn-secondary">
                    <Edit2 size={16} />
                    Edit Account
                  </button>
                  <button className="btn-secondary">
                    <Download size={16} />
                    Download Statement
                  </button>
                  <button className="btn-danger">
                    <Trash2 size={16} />
                    Delete Account
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Transaction Detail Modal */}
      {selectedTransaction && (
        <div className="modal-overlay" onClick={() => setSelectedTransaction(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Transaction Details</h2>
              <button className="modal-close" onClick={() => setSelectedTransaction(null)}>
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="txn-detail-card">
                <div className="txn-detail-header">
                  <div className={`txn-detail-icon ${selectedTransaction.transactionType}`}>
                    {selectedTransaction.transactionType === 'sent' ? (
                      <ArrowUpRight size={32} />
                    ) : (
                      <ArrowDownLeft size={32} />
                    )}
                  </div>
                  <div className="txn-detail-amount">
                    <span className="amount-label">
                      {selectedTransaction.transactionType === 'sent' ? 'Sent' : 'Received'}
                    </span>
                    <span className={`amount-value ${selectedTransaction.transactionType}`}>
                      {selectedTransaction.transactionType === 'sent' ? '-' : '+'}
                      {formatCurrency(selectedTransaction.amount)}
                    </span>
                  </div>
                </div>

                <div className="txn-detail-section">
                  <h4>Transaction Information</h4>
                  <div className="detail-grid">
                    <div className="detail-row">
                      <span className="detail-label">Description</span>
                      <span className="detail-value">{selectedTransaction.description}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Date & Time</span>
                      <span className="detail-value">{selectedTransaction.date} at {selectedTransaction.time}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Status</span>
                      <span className={`status-badge ${selectedTransaction.status}`}>
                        {selectedTransaction.status === 'completed' && <CheckCircle size={12} />}
                        {selectedTransaction.status === 'pending' && <Clock size={12} />}
                        {selectedTransaction.status === 'failed' && <XCircle size={12} />}
                        {selectedTransaction.status}
                      </span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Payment Method</span>
                      <span className="detail-value">{selectedTransaction.paymentMethod}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Reference</span>
                      <span className="detail-value code">{selectedTransaction.reference}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">UTR Number</span>
                      <span className="detail-value code">{selectedTransaction.utrNumber}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Category</span>
                      <span className="detail-value">{selectedTransaction.category}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Balance After</span>
                      <span className="detail-value balance">{formatCurrency(selectedTransaction.balanceAfter)}</span>
                    </div>
                  </div>
                </div>

                {(selectedTransaction.toAccount || selectedTransaction.fromAccount) && (
                  <div className="txn-detail-section">
                    <h4>Party Information</h4>
                    <div className="detail-grid">
                      {selectedTransaction.transactionType === 'sent' && selectedTransaction.toAccount && (
                        <>
                          <div className="detail-row">
                            <span className="detail-label">To Account</span>
                            <span className="detail-value">{selectedTransaction.toAccount}</span>
                          </div>
                          <div className="detail-row">
                            <span className="detail-label">To IFSC Code</span>
                            <span className="detail-value code">{selectedTransaction.toIfscCode}</span>
                          </div>
                        </>
                      )}
                      {selectedTransaction.transactionType === 'received' && selectedTransaction.fromAccount && (
                        <>
                          <div className="detail-row">
                            <span className="detail-label">From Account</span>
                            <span className="detail-value">{selectedTransaction.fromAccount}</span>
                          </div>
                          <div className="detail-row">
                            <span className="detail-label">From IFSC Code</span>
                            <span className="detail-value code">{selectedTransaction.fromIfscCode}</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )}

                <div className="txn-detail-section">
                  <h4>Notes & Reason</h4>
                  <div className="detail-grid">
                    <div className="detail-row full-width">
                      <span className="detail-label">Short Note</span>
                      <span className="detail-value">{selectedTransaction.shortNote}</span>
                    </div>
                    <div className="detail-row full-width">
                      <span className="detail-label">Detailed Reason</span>
                      <span className="detail-value">{selectedTransaction.reason}</span>
                    </div>
                  </div>
                </div>

                {selectedTransaction.tags.length > 0 && (
                  <div className="txn-detail-section">
                    <h4>Tags</h4>
                    <div className="tags-container">
                      {selectedTransaction.tags.map(tag => (
                        <span key={tag} className="tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                )}

                {selectedTransaction.attachments.length > 0 && (
                  <div className="txn-detail-section">
                    <h4>Attachments</h4>
                    <div className="attachments-list">
                      {selectedTransaction.attachments.map((file, idx) => (
                        <div key={idx} className="attachment-item">
                          <FileText size={16} />
                          <span>{file}</span>
                          <button className="icon-btn">
                            <Download size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BankAccounts;
