import React, { useState, useMemo } from 'react';
import {
  DollarSign,
  TrendingDown,
  Plus,
  Calendar,
  Search,
  Download,
  Eye,
  Edit2,
  Trash2,
  CheckCircle,
  Clock,
  Tag,
  CreditCard,
  Building2,
  FileText,
  ArrowUpRight,
  X,
  BarChart3,
  Filter,
  RefreshCw,
  ChevronDown,
  CalendarDays,
  Zap,
  Target,
  TrendingUp
} from 'lucide-react';
import '../modules/accounts/IncomeExpense.css';

interface ExpenseTransaction {
  id: string;
  description: string;
  amount: number;
  date: string;
  category: string;
  paymentMethod: string;
  status: 'completed' | 'pending';
  department?: string;
  vendor?: string;
  reference: string;
  notes?: string;
}

interface PeriodOption {
  value: string;
  label: string;
  icon: React.ComponentType<{ size?: number }>;
}

interface ExpenseStats {
  totalExpense: number;
  pendingExpense: number;
  completedTransactions: number;
  growthPercentage: number;
  averageTransaction: number;
  highestTransaction: number;
  categoryBreakdown: { [key: string]: number };
}

const Expenses: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showFilters, setShowFilters] = useState(true);
  const [showPeriodDropdown, setShowPeriodDropdown] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('today');
  const [showCustomDateModal, setShowCustomDateModal] = useState(false);
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);

  // Period options with icons
  const periodOptions: PeriodOption[] = [
    { value: 'today', label: 'Today', icon: Calendar },
    { value: 'yesterday', label: 'Yesterday', icon: Calendar },
    { value: 'week', label: 'This Week', icon: CalendarDays },
    { value: 'lastweek', label: 'Last Week', icon: CalendarDays },
    { value: 'month', label: 'This Month', icon: BarChart3 },
    { value: 'lastmonth', label: 'Last Month', icon: BarChart3 },
    { value: 'quarter', label: 'This Quarter', icon: Target },
    { value: 'year', label: 'This Year', icon: TrendingUp },
    { value: 'lastyear', label: 'Last Year', icon: TrendingUp },
    { value: 'custom', label: 'Custom Range', icon: CalendarDays }
  ];
  
  // Form state
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    category: '',
    paymentMethod: '',
    department: '',
    vendor: '',
    notes: ''
  });

  // Sample expense data
  const [expenseData, setExpenseData] = useState<ExpenseTransaction[]>([
    {
      id: 'exp001',
      description: 'Monthly salary disbursement - November 2024',
      amount: 850000,
      date: '2024-12-04',
      category: 'Salary & Wages',
      paymentMethod: 'Bank Transfer',
      status: 'completed',
      department: 'All Departments',
      reference: 'SAL-NOV-2024',
      notes: '25 employees paid'
    },
    {
      id: 'exp002',
      description: 'Office rent - December 2024',
      amount: 180000,
      date: '2024-12-04',
      category: 'Rent',
      paymentMethod: 'Cheque',
      status: 'completed',
      department: 'Administration',
      vendor: 'Property Management Ltd',
      reference: 'RENT-DEC-2024',
      notes: 'Paid to Property Management Ltd'
    },
    {
      id: 'exp003',
      description: 'Electricity, water, and internet bills',
      amount: 45320,
      date: '2024-12-03',
      category: 'Utilities',
      paymentMethod: 'Online',
      status: 'completed',
      department: 'Administration',
      reference: 'UTIL-NOV-2024',
      notes: 'Combined utility payment'
    },
    {
      id: 'exp004',
      description: 'Annual software license renewal',
      amount: 125000,
      date: '2024-12-05',
      category: 'Software & Licenses',
      paymentMethod: 'RTGS',
      status: 'completed',
      department: 'Technology',
      vendor: 'TechVendor Solutions',
      reference: 'INV-2024-1234',
      notes: 'Enterprise suite with support'
    },
    {
      id: 'exp005',
      description: 'Digital marketing campaign - December',
      amount: 65000,
      date: '2024-12-02',
      category: 'Marketing',
      paymentMethod: 'Credit Card',
      status: 'completed',
      department: 'Marketing',
      reference: 'MKT-DEC-2024',
      notes: 'Social media and Google Ads'
    },
    {
      id: 'exp006',
      description: 'Client meeting travel expenses',
      amount: 38500,
      date: '2024-11-30',
      category: 'Travel & Transport',
      paymentMethod: 'Company Card',
      status: 'completed',
      department: 'Sales',
      reference: 'TRV-NOV-2024',
      notes: 'Mumbai client visit'
    },
    {
      id: 'exp007',
      description: 'Stationery and office supplies',
      amount: 28450,
      date: '2024-12-01',
      category: 'Office Supplies',
      paymentMethod: 'UPI',
      status: 'completed',
      department: 'Administration',
      vendor: 'Office Mart Pvt Ltd',
      reference: 'PO-2024-789',
      notes: 'Monthly supplies purchase'
    },
    {
      id: 'exp008',
      description: 'GST payment - November 2024',
      amount: 158900,
      date: '2024-12-02',
      category: 'Tax',
      paymentMethod: 'Online',
      status: 'completed',
      department: 'Finance',
      reference: 'GST-NOV-2024',
      notes: 'GSTR-3B filed'
    },
    {
      id: 'exp009',
      description: 'Equipment maintenance and repairs',
      amount: 42000,
      date: '2024-11-28',
      category: 'Maintenance',
      paymentMethod: 'Bank Transfer',
      status: 'pending',
      department: 'Operations',
      vendor: 'TechFix Services',
      reference: 'MNT-NOV-2024',
      notes: 'Server and AC maintenance'
    },
    {
      id: 'exp010',
      description: 'Insurance premium payment',
      amount: 85000,
      date: '2024-11-25',
      category: 'Insurance',
      paymentMethod: 'NEFT',
      status: 'completed',
      department: 'Administration',
      vendor: 'SafeGuard Insurance',
      reference: 'INS-Q4-2024',
      notes: 'Quarterly premium'
    }
  ]);

  // Filter by period function
  const filterByPeriod = (data: ExpenseTransaction[]) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    switch (selectedPeriod) {
      case 'today':
        return data.filter(item => {
          const itemDate = new Date(item.date);
          return itemDate >= today;
        });
      
      case 'yesterday':
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        return data.filter(item => {
          const itemDate = new Date(item.date);
          return itemDate >= yesterday && itemDate < today;
        });
      
      case 'week':
        const weekStart = new Date(today);
        weekStart.setDate(today.getDate() - today.getDay());
        return data.filter(item => new Date(item.date) >= weekStart);
      
      case 'lastweek':
        const lastWeekStart = new Date(today);
        lastWeekStart.setDate(today.getDate() - today.getDay() - 7);
        const lastWeekEnd = new Date(lastWeekStart);
        lastWeekEnd.setDate(lastWeekStart.getDate() + 7);
        return data.filter(item => {
          const itemDate = new Date(item.date);
          return itemDate >= lastWeekStart && itemDate < lastWeekEnd;
        });
      
      case 'month':
        const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
        return data.filter(item => new Date(item.date) >= monthStart);
      
      case 'lastmonth':
        const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 1);
        return data.filter(item => {
          const itemDate = new Date(item.date);
          return itemDate >= lastMonthStart && itemDate < lastMonthEnd;
        });
      
      case 'quarter':
        const quarterMonth = Math.floor(now.getMonth() / 3) * 3;
        const quarterStart = new Date(now.getFullYear(), quarterMonth, 1);
        return data.filter(item => new Date(item.date) >= quarterStart);
      
      case 'year':
        const yearStart = new Date(now.getFullYear(), 0, 1);
        return data.filter(item => new Date(item.date) >= yearStart);
      
      case 'lastyear':
        const lastYearStart = new Date(now.getFullYear() - 1, 0, 1);
        const lastYearEnd = new Date(now.getFullYear(), 0, 1);
        return data.filter(item => {
          const itemDate = new Date(item.date);
          return itemDate >= lastYearStart && itemDate < lastYearEnd;
        });
      
      case 'custom':
        if (customStartDate && customEndDate) {
          const start = new Date(customStartDate);
          const end = new Date(customEndDate);
          end.setHours(23, 59, 59, 999);
          return data.filter(item => {
            const itemDate = new Date(item.date);
            return itemDate >= start && itemDate <= end;
          });
        }
        return data;
      
      default:
        return data;
    }
  };

  // Filter expense data
  const filteredExpenses = useMemo(() => {
    let filtered = filterByPeriod(expenseData);

    return filtered.filter(item => {
      const matchesSearch = searchQuery === '' || 
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.vendor?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.department?.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchesPayment = selectedPaymentMethod === 'all' || item.paymentMethod === selectedPaymentMethod;
      
      return matchesSearch && matchesCategory && matchesPayment;
    });
  }, [expenseData, searchQuery, selectedCategory, selectedPaymentMethod, selectedPeriod, customStartDate, customEndDate]);

  // Calculate comprehensive statistics
  const stats: ExpenseStats = useMemo(() => {
    const completed = filteredExpenses.filter(item => item.status === 'completed');
    const pending = filteredExpenses.filter(item => item.status === 'pending');
    
    const totalExpense = completed.reduce((sum, item) => sum + item.amount, 0);
    const pendingExpense = pending.reduce((sum, item) => sum + item.amount, 0);
    const completedCount = completed.length;
    
    const categoryBreakdown: { [key: string]: number } = {};
    completed.forEach(item => {
      categoryBreakdown[item.category] = (categoryBreakdown[item.category] || 0) + item.amount;
    });

    const amounts = completed.map(item => item.amount);
    const highestTransaction = amounts.length > 0 ? Math.max(...amounts) : 0;
    const averageTransaction = completedCount > 0 ? totalExpense / completedCount : 0;

    return {
      totalExpense,
      pendingExpense,
      completedTransactions: completedCount,
      growthPercentage: 18.3,
      averageTransaction,
      highestTransaction,
      categoryBreakdown
    };
  }, [filteredExpenses]);

  // Calculate statistics (keep for backward compatibility)
  const totalExpenses = stats.totalExpense;
  const pendingExpenses = stats.pendingExpense;
  const transactionCount = filteredExpenses.length;
  const growthPercentage = stats.growthPercentage;

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

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedPaymentMethod('all');
  };

  const handlePeriodSelect = (value: string) => {
    if (value === 'custom') {
      setShowCustomDateModal(true);
    } else {
      setSelectedPeriod(value);
    }
    setShowPeriodDropdown(false);
  };

  const applyCustomDateRange = () => {
    if (customStartDate && customEndDate) {
      setSelectedPeriod('custom');
      setShowCustomDateModal(false);
      setIsGeneratingReport(true);
      setTimeout(() => {
        setIsGeneratingReport(false);
      }, 1500);
    }
  };

  const generateReport = () => {
    setIsGeneratingReport(true);
    setTimeout(() => {
      setIsGeneratingReport(false);
      alert('Expense report generated successfully! Download will start shortly.');
    }, 2000);
  };

  const handleCreateExpense = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newExpense: ExpenseTransaction = {
      id: `exp${Date.now()}`,
      description: formData.description,
      amount: parseFloat(formData.amount),
      date: formData.date,
      category: formData.category,
      paymentMethod: formData.paymentMethod,
      status: 'pending',
      department: formData.department || undefined,
      vendor: formData.vendor || undefined,
      reference: `REF-${Date.now()}`,
      notes: formData.notes || undefined
    };

    setExpenseData([newExpense, ...expenseData]);
    setShowCreateModal(false);
    
    // Reset form
    setFormData({
      description: '',
      amount: '',
      date: new Date().toISOString().split('T')[0],
      category: '',
      paymentMethod: '',
      department: '',
      vendor: '',
      notes: ''
    });
  };

  return (
    <div className="income-expense-modern">
      {/* Header */}
      <div className="ie-header">
        <div className="ie-header-left">
          <div className="ie-icon-main expense-gradient">
            <DollarSign size={32} />
          </div>
          <div>
            <h1>Expense Management</h1>
            <p>Track and manage all expense transactions</p>
          </div>
        </div>
        <div className="ie-header-actions">
          <button 
            className="icon-btn-large" 
            onClick={handleRefresh}
            title="Refresh Data"
          >
            <RefreshCw size={18} className={isRefreshing ? 'rotating' : ''} />
          </button>
          <button 
            className="icon-btn-large" 
            onClick={() => setShowFilters(!showFilters)}
            title="Toggle Filters"
          >
            <Filter size={18} />
          </button>
          <button className="btn-secondary">
            <Download size={18} />
            Export Report
          </button>
          <button className="btn-danger-gradient" onClick={() => setShowCreateModal(true)}>
            <Plus size={18} />
            Create Expense
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="ie-stats-grid">
        <div className="stat-card stat-expense">
          <div className="stat-icon expense-bg">
            <TrendingDown size={24} />
          </div>
          <div className="stat-content">
            <div className="stat-label">Total Expenses</div>
            <div className="stat-value">{formatCurrency(totalExpenses)}</div>
            <div className="stat-subtitle stat-negative">
              <TrendingDown size={14} />
              +{growthPercentage}% from last period
            </div>
          </div>
        </div>

        <div className="stat-card stat-pending">
          <div className="stat-icon pending-bg">
            <Clock size={24} />
          </div>
          <div className="stat-content">
            <div className="stat-label">Pending Expenses</div>
            <div className="stat-value">{formatCurrency(pendingExpenses)}</div>
            <div className="stat-subtitle">
              {filteredExpenses.filter(i => i.status === 'pending').length} transactions pending
            </div>
          </div>
        </div>

        <div className="stat-card stat-count">
          <div className="stat-icon count-bg">
            <FileText size={24} />
          </div>
          <div className="stat-content">
            <div className="stat-label">Total Transactions</div>
            <div className="stat-value">{transactionCount}</div>
            <div className="stat-subtitle">
              This month
            </div>
          </div>
        </div>

        <div className="stat-card stat-average">
          <div className="stat-icon average-bg">
            <BarChart3 size={24} />
          </div>
          <div className="stat-content">
            <div className="stat-label">Average Transaction</div>
            <div className="stat-value">
              {formatCurrency(transactionCount > 0 ? totalExpenses / transactionCount : 0)}
            </div>
            <div className="stat-subtitle">
              Per transaction
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="ie-content">
        {showFilters && (
        <div className="transactions-filters animate-slide-down">
          <div className="search-box">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search by description, vendor, or department..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <select 
            className="filter-select" 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            <option value="Salary & Wages">Salary & Wages</option>
            <option value="Rent">Rent</option>
            <option value="Utilities">Utilities</option>
            <option value="Software & Licenses">Software & Licenses</option>
            <option value="Marketing">Marketing</option>
            <option value="Travel & Transport">Travel & Transport</option>
            <option value="Office Supplies">Office Supplies</option>
            <option value="Tax">Tax</option>
            <option value="Maintenance">Maintenance</option>
            <option value="Insurance">Insurance</option>
          </select>
          
          <select 
            className="filter-select" 
            value={selectedPaymentMethod} 
            onChange={(e) => setSelectedPaymentMethod(e.target.value)}
          >
            <option value="all">All Payment Methods</option>
            <option value="Bank Transfer">Bank Transfer</option>
            <option value="UPI">UPI</option>
            <option value="RTGS">RTGS</option>
            <option value="NEFT">NEFT</option>
            <option value="Cheque">Cheque</option>
            <option value="Cash">Cash</option>
            <option value="Credit Card">Credit Card</option>
            <option value="Company Card">Company Card</option>
            <option value="Online">Online</option>
          </select>
          
          {/* Period Dropdown */}
          <div className="period-dropdown-container">
            <button 
              className="period-dropdown-trigger"
              onClick={() => setShowPeriodDropdown(!showPeriodDropdown)}
            >
              <Calendar size={18} />
              <span>{periodOptions.find(p => p.value === selectedPeriod)?.label || 'Select Period'}</span>
              <ChevronDown size={16} className={showPeriodDropdown ? 'rotate-180' : ''} />
            </button>
            
            {showPeriodDropdown && (
              <>
                <div className="dropdown-overlay" onClick={() => setShowPeriodDropdown(false)} />
                <div className="period-dropdown-menu">
                  <div className="dropdown-header">
                    <Zap size={16} />
                    <span>Quick Select Period</span>
                  </div>
                  <div className="dropdown-options">
                    {periodOptions.map(option => {
                      const Icon = option.icon;
                      return (
                        <button
                          key={option.value}
                          className={`dropdown-option ${selectedPeriod === option.value ? 'active' : ''}`}
                          onClick={() => handlePeriodSelect(option.value)}
                        >
                          <Icon size={18} />
                          <span>{option.label}</span>
                          {selectedPeriod === option.value && <CheckCircle size={16} className="check-icon" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
          </div>
          
          {(searchQuery || selectedCategory !== 'all' || selectedPaymentMethod !== 'all') && (
            <button className="btn-clear-filters" onClick={clearFilters}>
              Clear Filters
            </button>
          )}
        </div>
        )}

        {/* Transaction List */}
        <div className="transactions-list">
          {filteredExpenses.length === 0 ? (
            <div className="no-data">
              <FileText size={48} />
              <p>No expense transactions found for selected period</p>
              <button className="btn-primary-blue" onClick={() => setSelectedPeriod('today')}>
                Reset to Today
              </button>
            </div>
          ) : (
            filteredExpenses.map(item => (
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
                          {item.status === 'completed' ? <CheckCircle size={12} /> : <Clock size={12} />}
                          {item.status === 'completed' ? 'Completed' : 'Pending'}
                        </span>
                      </div>
                    </div>
                    <div className="txn-metadata">
                      <span><Calendar size={12} /> {formatDate(item.date)}</span>
                      <span><Tag size={12} /> {item.category}</span>
                      <span><CreditCard size={12} /> {item.paymentMethod}</span>
                      {item.department && <span><Building2 size={12} /> {item.department}</span>}
                      {item.vendor && <span><Building2 size={12} /> {item.vendor}</span>}
                      <span><FileText size={12} /> {item.reference}</span>
                    </div>
                  </div>
                </div>
                <div className="txn-right">
                  <div className="txn-amount expense">
                    -{formatCurrency(item.amount)}
                  </div>
                  <div className="txn-actions">
                    <button className="icon-btn" title="View Details">
                      <Eye size={16} />
                    </button>
                    <button className="icon-btn" title="Edit">
                      <Edit2 size={16} />
                    </button>
                    <button className="icon-btn" title="Delete">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Create Expense Modal */}
      {showCreateModal && (
        <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Create New Expense</h2>
              <button className="modal-close" onClick={() => setShowCreateModal(false)}>
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleCreateExpense} className="modal-form">
              <div className="form-group">
                <label htmlFor="description">Description *</label>
                <input
                  type="text"
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  required
                  placeholder="Enter expense description"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="amount">Amount *</label>
                  <input
                    type="number"
                    id="amount"
                    value={formData.amount}
                    onChange={(e) => setFormData({...formData, amount: e.target.value})}
                    required
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="date">Date *</label>
                  <input
                    type="date"
                    id="date"
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="category">Category *</label>
                  <select
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="Salary & Wages">Salary & Wages</option>
                    <option value="Rent">Rent</option>
                    <option value="Utilities">Utilities</option>
                    <option value="Software & Licenses">Software & Licenses</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Travel & Transport">Travel & Transport</option>
                    <option value="Office Supplies">Office Supplies</option>
                    <option value="Tax">Tax</option>
                    <option value="Maintenance">Maintenance</option>
                    <option value="Insurance">Insurance</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="paymentMethod">Payment Method *</label>
                  <select
                    id="paymentMethod"
                    value={formData.paymentMethod}
                    onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})}
                    required
                  >
                    <option value="">Select Method</option>
                    <option value="Bank Transfer">Bank Transfer</option>
                    <option value="UPI">UPI</option>
                    <option value="RTGS">RTGS</option>
                    <option value="NEFT">NEFT</option>
                    <option value="Cheque">Cheque</option>
                    <option value="Cash">Cash</option>
                    <option value="Credit Card">Credit Card</option>
                    <option value="Company Card">Company Card</option>
                    <option value="Online">Online</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="department">Department</label>
                  <input
                    type="text"
                    id="department"
                    value={formData.department}
                    onChange={(e) => setFormData({...formData, department: e.target.value})}
                    placeholder="e.g., Marketing, IT, HR"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="vendor">Vendor</label>
                  <input
                    type="text"
                    id="vendor"
                    value={formData.vendor}
                    onChange={(e) => setFormData({...formData, vendor: e.target.value})}
                    placeholder="Vendor name"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="notes">Notes</label>
                <textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  rows={3}
                  placeholder="Additional notes or comments"
                />
              </div>

              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => setShowCreateModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-danger-gradient">
                  <Plus size={18} />
                  Create Expense
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Custom Date Range Modal */}
      {showCustomDateModal && (
        <div className="modal-overlay" onClick={() => setShowCustomDateModal(false)}>
          <div className="modal-content custom-date-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Select Custom Date Range</h2>
              <button className="modal-close" onClick={() => setShowCustomDateModal(false)}>
                <X size={24} />
              </button>
            </div>
            
            <div className="modal-form">
              <div className="form-group">
                <label htmlFor="startDate">Start Date *</label>
                <input
                  type="date"
                  id="startDate"
                  value={customStartDate}
                  onChange={(e) => setCustomStartDate(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="endDate">End Date *</label>
                <input
                  type="date"
                  id="endDate"
                  value={customEndDate}
                  onChange={(e) => setCustomEndDate(e.target.value)}
                  required
                  min={customStartDate}
                />
              </div>

              <div className="date-range-preview">
                {customStartDate && customEndDate && (
                  <div className="preview-info">
                    <CalendarDays size={20} />
                    <span>
                      {formatDate(customStartDate)} to {formatDate(customEndDate)}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="modal-actions">
              <button 
                type="button" 
                className="btn-secondary" 
                onClick={() => setShowCustomDateModal(false)}
              >
                Cancel
              </button>
              <button 
                type="button" 
                className="btn-primary-blue"
                onClick={applyCustomDateRange}
                disabled={!customStartDate || !customEndDate}
              >
                <Target size={18} />
                Generate Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Expenses;
