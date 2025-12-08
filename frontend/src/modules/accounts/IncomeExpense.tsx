// Enhanced Income & Expense Module
import React, { useState } from 'react';
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Plus,
  Calendar,
  FileText,
  Search,
  Download,
  Eye,
  Edit2,
  Trash2,
  CheckCircle,
  Clock,
  Tag,
  Building2,
  FolderKanban,
  Repeat,
  PieChart,
  BarChart3,
  ArrowUpRight,
  ArrowDownLeft,
  Users,
  CreditCard
} from 'lucide-react';
import './IncomeExpense.css';

interface IncomeExpenseItem {
  id: string;
  type: 'income' | 'expense';
  category: string;
  amount: number;
  date: string;
  description: string;
  reference: string;
  paymentMethod: string;
  status: 'completed' | 'pending' | 'cancelled';
  isRecurring: boolean;
  recurringFrequency?: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly';
  nextRecurringDate?: string;
  project?: string;
  department?: string;
  customer?: string;
  vendor?: string;
  tags: string[];
  attachments: string[];
  bankAccount?: string;
  notes: string;
}

interface RecurringExpense {
  id: string;
  name: string;
  category: string;
  amount: number;
  frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly';
  startDate: string;
  endDate?: string;
  lastProcessed?: string;
  nextDue: string;
  status: 'active' | 'paused' | 'completed';
  project?: string;
  department?: string;
  totalPaid: number;
  remainingPayments: number;
}

export const IncomeExpense: React.FC = () => {
  const [viewMode, setViewMode] = useState<'overview' | 'income' | 'expenses' | 'recurring' | 'allocation'>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Sample data
  const [incomeExpenseData] = useState<IncomeExpenseItem[]>([
    {
      id: 'ie001',
      type: 'income',
      category: 'Project Payment',
      amount: 350000,
      date: '2024-12-05',
      description: 'Project Phoenix Phase 2 milestone payment',
      reference: 'INV-CLI-5678',
      paymentMethod: 'Bank Transfer',
      status: 'completed',
      isRecurring: false,
      project: 'Project Phoenix',
      customer: 'ABC Corporation',
      tags: ['project', 'milestone'],
      attachments: ['invoice.pdf'],
      bankAccount: 'HDFC Bank - Primary',
      notes: 'Payment received on time'
    },
    {
      id: 'ie002',
      type: 'expense',
      category: 'Salary & Wages',
      amount: 850000,
      date: '2024-12-04',
      description: 'Monthly salary disbursement - November 2024',
      reference: 'SAL-NOV-2024',
      paymentMethod: 'Bank Transfer',
      status: 'completed',
      isRecurring: true,
      recurringFrequency: 'monthly',
      nextRecurringDate: '2025-01-04',
      department: 'All Departments',
      tags: ['payroll', 'recurring'],
      attachments: ['payroll-report.pdf'],
      bankAccount: 'ICICI Bank - Payroll',
      notes: '25 employees paid'
    },
    {
      id: 'ie003',
      type: 'expense',
      category: 'Rent',
      amount: 180000,
      date: '2024-12-04',
      description: 'Office rent - December 2024',
      reference: 'RENT-DEC-2024',
      paymentMethod: 'Cheque',
      status: 'completed',
      isRecurring: true,
      recurringFrequency: 'monthly',
      nextRecurringDate: '2025-01-04',
      department: 'Administration',
      tags: ['rent', 'recurring', 'office'],
      attachments: ['rent-receipt.pdf'],
      bankAccount: 'HDFC Bank - Primary',
      notes: 'Paid to Property Management Ltd'
    },
    {
      id: 'ie004',
      type: 'income',
      category: 'Consulting Fees',
      amount: 275000,
      date: '2024-12-03',
      description: 'Quarterly consulting services Q4 2024',
      reference: 'INV-CLI-9012',
      paymentMethod: 'IMPS',
      status: 'completed',
      isRecurring: true,
      recurringFrequency: 'quarterly',
      nextRecurringDate: '2025-03-03',
      project: 'Consulting Services',
      customer: 'XYZ Enterprises',
      tags: ['consulting', 'recurring'],
      attachments: ['invoice.pdf', 'timesheet.xlsx'],
      bankAccount: 'HDFC Bank - Primary',
      notes: '40 hours consultation provided'
    },
    {
      id: 'ie005',
      type: 'expense',
      category: 'Utilities',
      amount: 45320,
      date: '2024-12-03',
      description: 'Electricity, water, and internet bills',
      reference: 'UTIL-NOV-2024',
      paymentMethod: 'Online',
      status: 'completed',
      isRecurring: true,
      recurringFrequency: 'monthly',
      nextRecurringDate: '2025-01-03',
      department: 'Administration',
      tags: ['utilities', 'recurring'],
      attachments: ['bills.pdf'],
      bankAccount: 'Axis Bank - Vendor Payments',
      notes: 'Combined utility payment'
    },
    {
      id: 'ie006',
      type: 'expense',
      category: 'Software & Licenses',
      amount: 125000,
      date: '2024-12-05',
      description: 'Annual software license renewal',
      reference: 'INV-2024-1234',
      paymentMethod: 'RTGS',
      status: 'completed',
      isRecurring: true,
      recurringFrequency: 'yearly',
      nextRecurringDate: '2025-12-05',
      project: 'IT Infrastructure',
      department: 'Technology',
      vendor: 'TechVendor Solutions',
      tags: ['software', 'license'],
      attachments: ['invoice.pdf'],
      bankAccount: 'HDFC Bank - Primary',
      notes: 'Enterprise suite with support'
    },
    {
      id: 'ie007',
      type: 'expense',
      category: 'Marketing',
      amount: 65000,
      date: '2024-12-02',
      description: 'Digital marketing campaign - December',
      reference: 'MKT-DEC-2024',
      paymentMethod: 'Credit Card',
      status: 'completed',
      isRecurring: false,
      project: 'Brand Awareness Campaign',
      department: 'Marketing',
      tags: ['marketing', 'campaign'],
      attachments: ['campaign-report.pdf'],
      notes: 'Social media and Google Ads'
    },
    {
      id: 'ie008',
      type: 'income',
      category: 'Product Sales',
      amount: 425000,
      date: '2024-12-01',
      description: 'Custom software product delivery',
      reference: 'INV-CLI-3456',
      paymentMethod: 'RTGS',
      status: 'completed',
      isRecurring: false,
      project: 'Custom Software Development',
      customer: 'DEF Industries',
      tags: ['product', 'sales'],
      attachments: ['invoice.pdf', 'delivery-note.pdf'],
      bankAccount: 'HDFC Bank - Primary',
      notes: 'Final payment received'
    },
    {
      id: 'ie009',
      type: 'expense',
      category: 'Travel & Transport',
      amount: 38500,
      date: '2024-11-30',
      description: 'Client meeting travel expenses',
      reference: 'TRV-NOV-2024',
      paymentMethod: 'Company Card',
      status: 'completed',
      isRecurring: false,
      project: 'Client Engagement',
      department: 'Sales',
      tags: ['travel', 'client'],
      attachments: ['expense-report.pdf'],
      notes: 'Mumbai client visit'
    },
    {
      id: 'ie010',
      type: 'expense',
      category: 'Office Supplies',
      amount: 28450,
      date: '2024-12-01',
      description: 'Stationery and office supplies',
      reference: 'PO-2024-789',
      paymentMethod: 'UPI',
      status: 'completed',
      isRecurring: false,
      department: 'Administration',
      vendor: 'Office Mart Pvt Ltd',
      tags: ['supplies', 'office'],
      attachments: ['receipt.pdf'],
      bankAccount: 'Axis Bank - Vendor Payments',
      notes: 'Monthly supplies purchase'
    },
    {
      id: 'ie011',
      type: 'expense',
      category: 'Tax',
      amount: 158900,
      date: '2024-12-02',
      description: 'GST payment - November 2024',
      reference: 'GST-NOV-2024',
      paymentMethod: 'Online',
      status: 'completed',
      isRecurring: true,
      recurringFrequency: 'monthly',
      nextRecurringDate: '2025-01-02',
      department: 'Finance',
      tags: ['tax', 'gst', 'compliance'],
      attachments: ['gst-challan.pdf'],
      bankAccount: 'HDFC Bank - Primary',
      notes: 'GSTR-3B filed'
    },
    {
      id: 'ie012',
      type: 'income',
      category: 'Interest Income',
      amount: 12560.50,
      date: '2024-11-29',
      description: 'Quarterly interest from bank',
      reference: 'INT-Q4-2024',
      paymentMethod: 'Bank Credit',
      status: 'completed',
      isRecurring: true,
      recurringFrequency: 'quarterly',
      nextRecurringDate: '2025-02-28',
      tags: ['interest', 'passive-income'],
      attachments: ['interest-certificate.pdf'],
      bankAccount: 'HDFC Bank - Primary',
      notes: 'Interest on average balance'
    }
  ]);

  const [recurringExpenses] = useState<RecurringExpense[]>([
    {
      id: 'rec001',
      name: 'Monthly Office Rent',
      category: 'Rent',
      amount: 180000,
      frequency: 'monthly',
      startDate: '2024-01-01',
      lastProcessed: '2024-12-04',
      nextDue: '2025-01-04',
      status: 'active',
      department: 'Administration',
      totalPaid: 2160000,
      remainingPayments: 0
    },
    {
      id: 'rec002',
      name: 'Employee Salaries',
      category: 'Salary & Wages',
      amount: 850000,
      frequency: 'monthly',
      startDate: '2024-01-01',
      lastProcessed: '2024-12-04',
      nextDue: '2025-01-04',
      status: 'active',
      department: 'All Departments',
      totalPaid: 10200000,
      remainingPayments: 0
    },
    {
      id: 'rec003',
      name: 'Software Licenses',
      category: 'Software & Licenses',
      amount: 125000,
      frequency: 'yearly',
      startDate: '2023-12-05',
      lastProcessed: '2024-12-05',
      nextDue: '2025-12-05',
      status: 'active',
      department: 'Technology',
      totalPaid: 250000,
      remainingPayments: 0
    },
    {
      id: 'rec004',
      name: 'Utility Bills',
      category: 'Utilities',
      amount: 45320,
      frequency: 'monthly',
      startDate: '2024-01-01',
      lastProcessed: '2024-12-03',
      nextDue: '2025-01-03',
      status: 'active',
      department: 'Administration',
      totalPaid: 543840,
      remainingPayments: 0
    },
    {
      id: 'rec005',
      name: 'GST Payment',
      category: 'Tax',
      amount: 158900,
      frequency: 'monthly',
      startDate: '2024-01-01',
      lastProcessed: '2024-12-02',
      nextDue: '2025-01-02',
      status: 'active',
      department: 'Finance',
      totalPaid: 1906800,
      remainingPayments: 0
    },
    {
      id: 'rec006',
      name: 'Insurance Premium',
      category: 'Insurance',
      amount: 85000,
      frequency: 'quarterly',
      startDate: '2024-01-15',
      lastProcessed: '2024-10-15',
      nextDue: '2025-01-15',
      status: 'active',
      department: 'Administration',
      totalPaid: 340000,
      remainingPayments: 0
    }
  ]);

  // Calculate statistics
  const totalIncome = incomeExpenseData
    .filter(item => item.type === 'income' && item.status === 'completed')
    .reduce((sum, item) => sum + item.amount, 0);

  const totalExpenses = incomeExpenseData
    .filter(item => item.type === 'expense' && item.status === 'completed')
    .reduce((sum, item) => sum + item.amount, 0);

  const netProfit = totalIncome - totalExpenses;
  const profitMargin = totalIncome > 0 ? ((netProfit / totalIncome) * 100).toFixed(2) : '0';

  const recurringExpenseTotal = recurringExpenses
    .filter(rec => rec.status === 'active')
    .reduce((sum, rec) => sum + rec.amount, 0);

  // Category-wise breakdown
  const expensesByCategory: { [key: string]: number } = {};
  incomeExpenseData
    .filter(item => item.type === 'expense' && item.status === 'completed')
    .forEach(item => {
      expensesByCategory[item.category] = (expensesByCategory[item.category] || 0) + item.amount;
    });

  // Department allocation
  const expensesByDepartment: { [key: string]: number } = {};
  incomeExpenseData
    .filter(item => item.type === 'expense' && item.department && item.status === 'completed')
    .forEach(item => {
      const dept = item.department!;
      expensesByDepartment[dept] = (expensesByDepartment[dept] || 0) + item.amount;
    });

  // Project allocation
  const expensesByProject: { [key: string]: number } = {};
  incomeExpenseData
    .filter(item => item.type === 'expense' && item.project && item.status === 'completed')
    .forEach(item => {
      const proj = item.project!;
      expensesByProject[proj] = (expensesByProject[proj] || 0) + item.amount;
    });

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

  const getFrequencyLabel = (frequency: string) => {
    const labels: { [key: string]: string } = {
      daily: 'Daily',
      weekly: 'Weekly',
      monthly: 'Monthly',
      quarterly: 'Quarterly',
      yearly: 'Yearly'
    };
    return labels[frequency] || frequency;
  };

  return (
    <div className="income-expense-modern">
      {/* Header */}
      <div className="ie-header">
        <div className="ie-header-left">
          <DollarSign className="ie-icon-main" />
          <div>
            <h1>Income & Expense Management</h1>
            <p>Track income, expenses, and financial allocations</p>
          </div>
        </div>
        <div className="ie-header-actions">
          <button className="btn-secondary">
            <Download size={18} />
            Export Report
          </button>
          <button className="btn-primary">
            <Plus size={18} />
            Add Transaction
          </button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="ie-stats-grid">
        <div className="stat-card stat-success">
          <div className="stat-icon">
            <TrendingUp size={24} />
          </div>
          <div className="stat-content">
            <div className="stat-label">Total Income</div>
            <div className="stat-value">{formatCurrency(totalIncome)}</div>
            <div className="stat-subtitle">
              {incomeExpenseData.filter(i => i.type === 'income').length} transactions
            </div>
          </div>
        </div>

        <div className="stat-card stat-danger">
          <div className="stat-icon">
            <TrendingDown size={24} />
          </div>
          <div className="stat-content">
            <div className="stat-label">Total Expenses</div>
            <div className="stat-value">{formatCurrency(totalExpenses)}</div>
            <div className="stat-subtitle">
              {incomeExpenseData.filter(i => i.type === 'expense').length} transactions
            </div>
          </div>
        </div>

        <div className={`stat-card ${netProfit >= 0 ? 'stat-primary' : 'stat-warning'}`}>
          <div className="stat-icon">
            <BarChart3 size={24} />
          </div>
          <div className="stat-content">
            <div className="stat-label">Net Profit/Loss</div>
            <div className="stat-value">{formatCurrency(netProfit)}</div>
            <div className="stat-subtitle">
              Profit Margin: {profitMargin}%
            </div>
          </div>
        </div>

        <div className="stat-card stat-info">
          <div className="stat-icon">
            <Repeat size={24} />
          </div>
          <div className="stat-content">
            <div className="stat-label">Recurring Expenses</div>
            <div className="stat-value">{formatCurrency(recurringExpenseTotal)}</div>
            <div className="stat-subtitle">
              {recurringExpenses.filter(r => r.status === 'active').length} active subscriptions
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="ie-nav-tabs">
        <button
          className={`nav-tab ${viewMode === 'overview' ? 'active' : ''}`}
          onClick={() => setViewMode('overview')}
        >
          <PieChart size={18} />
          Overview
        </button>
        <button
          className={`nav-tab ${viewMode === 'income' ? 'active' : ''}`}
          onClick={() => setViewMode('income')}
        >
          <TrendingUp size={18} />
          Income
        </button>
        <button
          className={`nav-tab ${viewMode === 'expenses' ? 'active' : ''}`}
          onClick={() => setViewMode('expenses')}
        >
          <TrendingDown size={18} />
          Expenses
        </button>
        <button
          className={`nav-tab ${viewMode === 'recurring' ? 'active' : ''}`}
          onClick={() => setViewMode('recurring')}
        >
          <Repeat size={18} />
          Recurring
        </button>
        <button
          className={`nav-tab ${viewMode === 'allocation' ? 'active' : ''}`}
          onClick={() => setViewMode('allocation')}
        >
          <FolderKanban size={18} />
          Allocation
        </button>
      </div>

      {/* Content Area */}
      <div className="ie-content">
        {/* Overview Mode */}
        {viewMode === 'overview' && (
          <div className="overview-content">
            {/* Charts Section */}
            <div className="charts-grid">
              <div className="chart-card">
                <div className="chart-header">
                  <h3>Expense by Category</h3>
                  <button className="icon-btn"><Eye size={16} /></button>
                </div>
                <div className="chart-body">
                  {Object.entries(expensesByCategory)
                    .sort((a, b) => b[1] - a[1])
                    .slice(0, 6)
                    .map(([category, amount]) => (
                      <div key={category} className="category-item">
                        <div className="category-info">
                          <span className="category-name">{category}</span>
                          <span className="category-amount">{formatCurrency(amount)}</span>
                        </div>
                        <div className="category-bar">
                          <div
                            className="category-bar-fill"
                            style={{ width: `${(amount / totalExpenses) * 100}%` }}
                          ></div>
                        </div>
                        <span className="category-percent">
                          {((amount / totalExpenses) * 100).toFixed(1)}%
                        </span>
                      </div>
                    ))}
                </div>
              </div>

              <div className="chart-card">
                <div className="chart-header">
                  <h3>Recent Transactions</h3>
                  <button className="icon-btn"><FileText size={16} /></button>
                </div>
                <div className="chart-body">
                  {incomeExpenseData.slice(0, 6).map(item => (
                    <div key={item.id} className="transaction-preview">
                      <div className={`txn-icon-small ${item.type}`}>
                        {item.type === 'income' ? (
                          <ArrowDownLeft size={16} />
                        ) : (
                          <ArrowUpRight size={16} />
                        )}
                      </div>
                      <div className="txn-preview-info">
                        <div className="txn-preview-desc">{item.description}</div>
                        <div className="txn-preview-meta">
                          {item.date} • {item.category}
                        </div>
                      </div>
                      <div className={`txn-preview-amount ${item.type}`}>
                        {item.type === 'income' ? '+' : '-'}
                        {formatCurrency(item.amount)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Upcoming Recurring */}
            <div className="section-card">
              <div className="section-header">
                <h3>Upcoming Recurring Expenses</h3>
                <button className="link-btn" onClick={() => setViewMode('recurring')}>
                  View All <ArrowUpRight size={16} />
                </button>
              </div>
              <div className="recurring-preview">
                {recurringExpenses
                  .filter(rec => rec.status === 'active')
                  .slice(0, 4)
                  .map(rec => (
                    <div key={rec.id} className="recurring-preview-item">
                      <div className="recurring-icon">
                        <Repeat size={20} />
                      </div>
                      <div className="recurring-info">
                        <div className="recurring-name">{rec.name}</div>
                        <div className="recurring-meta">
                          {getFrequencyLabel(rec.frequency)} • Next due: {formatDate(rec.nextDue)}
                        </div>
                      </div>
                      <div className="recurring-amount">
                        {formatCurrency(rec.amount)}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}

        {/* Income Mode */}
        {viewMode === 'income' && (
          <div className="transactions-content">
            <div className="transactions-filters">
              <div className="search-box">
                <Search size={18} />
                <input
                  type="text"
                  placeholder="Search income transactions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <select className="filter-select" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                <option value="all">All Categories</option>
                <option value="Project Payment">Project Payment</option>
                <option value="Consulting Fees">Consulting Fees</option>
                <option value="Product Sales">Product Sales</option>
                <option value="Interest Income">Interest Income</option>
              </select>
              <button className="btn-secondary">
                <Download size={18} />
                Export
              </button>
            </div>

            <div className="transactions-list">
              {incomeExpenseData
                .filter(item => item.type === 'income')
                .map(item => (
                  <div key={item.id} className="transaction-item">
                    <div className="txn-left">
                      <div className="txn-icon income">
                        <ArrowDownLeft size={20} />
                      </div>
                      <div className="txn-info">
                        <div className="txn-header">
                          <h4>{item.description}</h4>
                          <div className="txn-badges">
                            <span className={`status-badge ${item.status}`}>
                              {item.status === 'completed' && <CheckCircle size={12} />}
                              {item.status}
                            </span>
                            {item.isRecurring && (
                              <span className="recurring-badge">
                                <Repeat size={12} />
                                Recurring
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="txn-metadata">
                          <span><Calendar size={12} /> {item.date}</span>
                          <span><Tag size={12} /> {item.category}</span>
                          <span><CreditCard size={12} /> {item.paymentMethod}</span>
                          {item.customer && <span><Users size={12} /> {item.customer}</span>}
                        </div>
                      </div>
                    </div>
                    <div className="txn-right">
                      <div className="txn-amount income">
                        +{formatCurrency(item.amount)}
                      </div>
                      <div className="txn-actions">
                        <button className="icon-btn"><Eye size={16} /></button>
                        <button className="icon-btn"><Edit2 size={16} /></button>
                        <button className="icon-btn"><Trash2 size={16} /></button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Expenses Mode */}
        {viewMode === 'expenses' && (
          <div className="transactions-content">
            <div className="transactions-filters">
              <div className="search-box">
                <Search size={18} />
                <input
                  type="text"
                  placeholder="Search expense transactions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <select className="filter-select" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                <option value="all">All Categories</option>
                <option value="Salary & Wages">Salary & Wages</option>
                <option value="Rent">Rent</option>
                <option value="Utilities">Utilities</option>
                <option value="Software & Licenses">Software & Licenses</option>
                <option value="Marketing">Marketing</option>
                <option value="Travel & Transport">Travel & Transport</option>
                <option value="Office Supplies">Office Supplies</option>
                <option value="Tax">Tax</option>
              </select>
              <button className="btn-secondary">
                <Download size={18} />
                Export
              </button>
            </div>

            <div className="transactions-list">
              {incomeExpenseData
                .filter(item => item.type === 'expense')
                .map(item => (
                  <div key={item.id} className="transaction-item">
                    <div className="txn-left">
                      <div className="txn-icon expense">
                        <ArrowUpRight size={20} />
                      </div>
                      <div className="txn-info">
                        <div className="txn-header">
                          <h4>{item.description}</h4>
                          <div className="txn-badges">
                            <span className={`status-badge ${item.status}`}>
                              {item.status === 'completed' && <CheckCircle size={12} />}
                              {item.status}
                            </span>
                            {item.isRecurring && (
                              <span className="recurring-badge">
                                <Repeat size={12} />
                                Recurring
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="txn-metadata">
                          <span><Calendar size={12} /> {item.date}</span>
                          <span><Tag size={12} /> {item.category}</span>
                          <span><CreditCard size={12} /> {item.paymentMethod}</span>
                          {item.department && <span><Building2 size={12} /> {item.department}</span>}
                          {item.project && <span><FolderKanban size={12} /> {item.project}</span>}
                        </div>
                      </div>
                    </div>
                    <div className="txn-right">
                      <div className="txn-amount expense">
                        -{formatCurrency(item.amount)}
                      </div>
                      <div className="txn-actions">
                        <button className="icon-btn"><Eye size={16} /></button>
                        <button className="icon-btn"><Edit2 size={16} /></button>
                        <button className="icon-btn"><Trash2 size={16} /></button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Recurring Mode */}
        {viewMode === 'recurring' && (
          <div className="recurring-content">
            <div className="recurring-header">
              <h3>Recurring Expenses Management</h3>
              <button className="btn-primary">
                <Plus size={18} />
                Add Recurring
              </button>
            </div>

            <div className="recurring-list">
              {recurringExpenses.map(rec => (
                <div key={rec.id} className="recurring-card">
                  <div className="recurring-card-header">
                    <div className="recurring-card-title">
                      <Repeat size={24} />
                      <div>
                        <h4>{rec.name}</h4>
                        <p>{rec.category}</p>
                      </div>
                    </div>
                    <span className={`status-badge ${rec.status}`}>
                      {rec.status}
                    </span>
                  </div>

                  <div className="recurring-card-body">
                    <div className="recurring-details">
                      <div className="recurring-detail-item">
                        <span className="detail-label">Amount</span>
                        <span className="detail-value amount">{formatCurrency(rec.amount)}</span>
                      </div>
                      <div className="recurring-detail-item">
                        <span className="detail-label">Frequency</span>
                        <span className="detail-value">{getFrequencyLabel(rec.frequency)}</span>
                      </div>
                      <div className="recurring-detail-item">
                        <span className="detail-label">Next Due</span>
                        <span className="detail-value">{formatDate(rec.nextDue)}</span>
                      </div>
                      {rec.department && (
                        <div className="recurring-detail-item">
                          <span className="detail-label">Department</span>
                          <span className="detail-value">{rec.department}</span>
                        </div>
                      )}
                      <div className="recurring-detail-item">
                        <span className="detail-label">Total Paid</span>
                        <span className="detail-value">{formatCurrency(rec.totalPaid)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="recurring-card-footer">
                    <button className="btn-secondary-small">
                      <Edit2 size={14} />
                      Edit
                    </button>
                    <button className="btn-secondary-small">
                      <Clock size={14} />
                      Pause
                    </button>
                    <button className="btn-danger-small">
                      <Trash2 size={14} />
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Allocation Mode */}
        {viewMode === 'allocation' && (
          <div className="allocation-content">
            <div className="allocation-grid">
              {/* Department Allocation */}
              <div className="allocation-card">
                <div className="allocation-header">
                  <Building2 size={24} />
                  <h3>Department-wise Allocation</h3>
                </div>
                <div className="allocation-body">
                  {Object.entries(expensesByDepartment)
                    .sort((a, b) => b[1] - a[1])
                    .map(([dept, amount]) => (
                      <div key={dept} className="allocation-item">
                        <div className="allocation-info">
                          <span className="allocation-name">{dept}</span>
                          <span className="allocation-amount">{formatCurrency(amount)}</span>
                        </div>
                        <div className="allocation-bar">
                          <div
                            className="allocation-bar-fill department"
                            style={{ width: `${(amount / totalExpenses) * 100}%` }}
                          ></div>
                        </div>
                        <span className="allocation-percent">
                          {((amount / totalExpenses) * 100).toFixed(1)}%
                        </span>
                      </div>
                    ))}
                </div>
              </div>

              {/* Project Allocation */}
              <div className="allocation-card">
                <div className="allocation-header">
                  <FolderKanban size={24} />
                  <h3>Project-wise Allocation</h3>
                </div>
                <div className="allocation-body">
                  {Object.entries(expensesByProject)
                    .sort((a, b) => b[1] - a[1])
                    .map(([proj, amount]) => (
                      <div key={proj} className="allocation-item">
                        <div className="allocation-info">
                          <span className="allocation-name">{proj}</span>
                          <span className="allocation-amount">{formatCurrency(amount)}</span>
                        </div>
                        <div className="allocation-bar">
                          <div
                            className="allocation-bar-fill project"
                            style={{ width: `${(amount / totalExpenses) * 100}%` }}
                          ></div>
                        </div>
                        <span className="allocation-percent">
                          {((amount / totalExpenses) * 100).toFixed(1)}%
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default IncomeExpense;
