import React, { useState, useMemo, useEffect } from 'react';
import {
  DollarSign,
  TrendingUp,
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
  Users,
  FileText,
  ArrowDownLeft,
  Filter,
  RefreshCw,
  BarChart3,
  ChevronDown,
  X,
  CalendarDays,
  ShoppingCart,
  Scissors,
  Box,
  Building2,
  Zap,
  Target,
  TrendingUpDown
} from 'lucide-react';
import '../modules/accounts/IncomeExpense.css';

interface IncomeTransaction {
  id: string;
  description: string;
  amount: number;
  date: string;
  category: string;
  paymentMethod: string;
  status: 'completed' | 'pending';
  customer?: string;
  reference: string;
  notes?: string;
  source?: string;
}

interface PeriodOption {
  value: string;
  label: string;
  icon: React.ComponentType<{ size?: number }>;
}

interface IncomeStats {
  totalIncome: number;
  pendingIncome: number;
  completedTransactions: number;
  growthPercentage: number;
  averageTransaction: number;
  highestTransaction: number;
  categoryBreakdown: { [key: string]: number };
}

const Income: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('all');
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
    { value: 'month', label: 'This Month', icon: CalendarDays },
    { value: 'lastmonth', label: 'Last Month', icon: CalendarDays },
    { value: 'quarter', label: 'This Quarter', icon: BarChart3 },
    { value: 'year', label: 'This Year', icon: BarChart3 },
    { value: 'lastyear', label: 'Last Year', icon: BarChart3 },
    { value: 'custom', label: 'Custom Range', icon: Target }
  ];

  // Enhanced sample income data with sources and more transactions
  const [incomeData] = useState<IncomeTransaction[]>([
    {
      id: 'inc001',
      description: 'POS Sale - Premium Product Bundle',
      amount: 15000,
      date: '2024-12-08',
      category: 'Product Sales',
      paymentMethod: 'UPI',
      status: 'completed',
      customer: 'Walk-in Customer',
      reference: 'POS-2024-001',
      notes: 'Multiple items',
      source: 'pos'
    },
    {
      id: 'inc002',
      description: 'Haircut & Styling Service',
      amount: 2500,
      date: '2024-12-08',
      category: 'Service Revenue',
      paymentMethod: 'Cash',
      status: 'completed',
      customer: 'John Doe',
      reference: 'APT-2024-045',
      notes: 'Appointment booking',
      source: 'appointments'
    },
    {
      id: 'inc003',
      description: 'Product Sale - Hair Care Professional Kit',
      amount: 8500,
      date: '2024-12-08',
      category: 'Product Sales',
      paymentMethod: 'Card',
      status: 'completed',
      customer: 'Jane Smith',
      reference: 'PRD-2024-123',
      notes: 'Premium hair care kit',
      source: 'products'
    },
    {
      id: 'inc004',
      description: 'Luxury Spa Service Package',
      amount: 12000,
      date: '2024-12-08',
      category: 'Service Revenue',
      paymentMethod: 'Bank Transfer',
      status: 'completed',
      customer: 'Sarah Johnson',
      reference: 'SRV-2024-089',
      notes: 'Full spa package',
      source: 'services'
    },
    {
      id: 'inc005',
      description: 'Online Booking - Beauty Consultation',
      amount: 3500,
      date: '2024-12-08',
      category: 'Consulting Fees',
      paymentMethod: 'UPI',
      status: 'completed',
      customer: 'Michael Brown',
      reference: 'BKG-2024-234',
      notes: 'Online platform booking',
      source: 'bookings'
    },
    {
      id: 'inc006',
      description: 'Employee Commission - Monthly Sales',
      amount: 18000,
      date: '2024-12-07',
      category: 'Employee Revenue',
      paymentMethod: 'Bank Transfer',
      status: 'completed',
      customer: 'Internal',
      reference: 'EMP-2024-078',
      notes: 'Sales commission',
      source: 'employee'
    },
    {
      id: 'inc007',
      description: 'Corporate Service Contract - ABC Corp',
      amount: 75000,
      date: '2024-12-06',
      category: 'Contract Revenue',
      paymentMethod: 'RTGS',
      status: 'completed',
      customer: 'ABC Corporation',
      reference: 'CMP-2024-012',
      notes: 'Corporate service agreement',
      source: 'company'
    },
    {
      id: 'inc008',
      description: 'Project Phoenix Phase 2 milestone',
      amount: 350000,
      date: '2024-12-05',
      category: 'Project Payment',
      paymentMethod: 'Bank Transfer',
      status: 'completed',
      customer: 'XYZ Enterprises',
      reference: 'INV-CLI-5678',
      notes: 'Payment received on time',
      source: 'company'
    },
    {
      id: 'inc009',
      description: 'Quarterly consulting services Q4 2024',
      amount: 275000,
      date: '2024-12-03',
      category: 'Consulting Fees',
      paymentMethod: 'IMPS',
      status: 'completed',
      customer: 'DEF Industries',
      reference: 'INV-CLI-9012',
      notes: '40 hours consultation',
      source: 'company'
    },
    {
      id: 'inc010',
      description: 'Product Retail Sales - December',
      amount: 42000,
      date: '2024-12-02',
      category: 'Product Sales',
      paymentMethod: 'Cash',
      status: 'completed',
      customer: 'Multiple Customers',
      reference: 'RETAIL-DEC-001',
      notes: 'Daily sales aggregate',
      source: 'pos'
    },
    {
      id: 'inc011',
      description: 'Wedding Service Package',
      amount: 95000,
      date: '2024-12-01',
      category: 'Service Revenue',
      paymentMethod: 'NEFT',
      status: 'completed',
      customer: 'Emily Williams',
      reference: 'WED-2024-012',
      notes: 'Complete bridal package',
      source: 'services'
    },
    {
      id: 'inc012',
      description: 'Annual Maintenance Contract',
      amount: 150000,
      date: '2024-11-28',
      category: 'Service Revenue',
      paymentMethod: 'Cheque',
      status: 'pending',
      customer: 'GHI Enterprises',
      reference: 'AMC-2024-045',
      notes: 'Cheque under clearance',
      source: 'company'
    }
  ]);

  // Filter data based on period
  const filterByPeriod = (data: IncomeTransaction[]) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    return data.filter(item => {
      const itemDate = new Date(item.date);

      switch (selectedPeriod) {
        case 'today':
          return itemDate >= today;
        case 'yesterday':
          const yesterday = new Date(today);
          yesterday.setDate(yesterday.getDate() - 1);
          return itemDate >= yesterday && itemDate < today;
        case 'week':
          const weekStart = new Date(today);
          weekStart.setDate(today.getDate() - today.getDay());
          return itemDate >= weekStart;
        case 'lastweek':
          const lastWeekStart = new Date(today);
          lastWeekStart.setDate(today.getDate() - today.getDay() - 7);
          const lastWeekEnd = new Date(lastWeekStart);
          lastWeekEnd.setDate(lastWeekStart.getDate() + 7);
          return itemDate >= lastWeekStart && itemDate < lastWeekEnd;
        case 'month':
          return itemDate.getMonth() === today.getMonth() && itemDate.getFullYear() === today.getFullYear();
        case 'lastmonth':
          const lastMonth = new Date(today);
          lastMonth.setMonth(today.getMonth() - 1);
          return itemDate.getMonth() === lastMonth.getMonth() && itemDate.getFullYear() === lastMonth.getFullYear();
        case 'quarter':
          const currentQuarter = Math.floor(today.getMonth() / 3);
          const itemQuarter = Math.floor(itemDate.getMonth() / 3);
          return itemQuarter === currentQuarter && itemDate.getFullYear() === today.getFullYear();
        case 'year':
          return itemDate.getFullYear() === today.getFullYear();
        case 'lastyear':
          return itemDate.getFullYear() === today.getFullYear() - 1;
        case 'custom':
          if (customStartDate && customEndDate) {
            const start = new Date(customStartDate);
            const end = new Date(customEndDate);
            end.setHours(23, 59, 59, 999);
            return itemDate >= start && itemDate <= end;
          }
          return true;
        default:
          return true;
      }
    });
  };

  // Filter income data
  const filteredIncome = useMemo(() => {
    let filtered = filterByPeriod(incomeData);

    return filtered.filter(item => {
      const matchesSearch = searchQuery === '' || 
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.customer?.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchesPayment = selectedPaymentMethod === 'all' || item.paymentMethod === selectedPaymentMethod;
      
      return matchesSearch && matchesCategory && matchesPayment;
    });
  }, [incomeData, searchQuery, selectedCategory, selectedPaymentMethod, selectedPeriod, customStartDate, customEndDate]);

  // Calculate comprehensive statistics
  const stats: IncomeStats = useMemo(() => {
    const completed = filteredIncome.filter(item => item.status === 'completed');
    const pending = filteredIncome.filter(item => item.status === 'pending');
    
    const totalIncome = completed.reduce((sum, item) => sum + item.amount, 0);
    const pendingIncome = pending.reduce((sum, item) => sum + item.amount, 0);
    const completedCount = completed.length;
    
    const categoryBreakdown: { [key: string]: number } = {};
    completed.forEach(item => {
      categoryBreakdown[item.category] = (categoryBreakdown[item.category] || 0) + item.amount;
    });

    const amounts = completed.map(item => item.amount);
    const highestTransaction = amounts.length > 0 ? Math.max(...amounts) : 0;
    const averageTransaction = completedCount > 0 ? totalIncome / completedCount : 0;

    return {
      totalIncome,
      pendingIncome,
      completedTransactions: completedCount,
      growthPercentage: 15.8,
      averageTransaction,
      highestTransaction,
      categoryBreakdown
    };
  }, [filteredIncome]);

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
      alert('Report generated successfully! Download will start shortly.');
    }, 2000);
  };

  const selectedPeriodLabel = periodOptions.find(p => p.value === selectedPeriod)?.label || 'Select Period';

  return (
    <div className="income-expense-modern">
      {/* Header */}
      <div className="ie-header">
        <div className="ie-header-left">
          <div className="ie-icon-main income-gradient">
            <DollarSign size={32} />
          </div>
          <div>
            <h1>Income Analytics & Reports</h1>
            <p>Comprehensive revenue tracking and analysis</p>
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
          <button 
            className="btn-secondary"
            onClick={generateReport}
            disabled={isGeneratingReport}
          >
            <Download size={18} />
            {isGeneratingReport ? 'Generating...' : 'Export Report'}
          </button>
          <button className="btn-primary-blue">
            <Plus size={18} />
            Record Income
          </button>
        </div>
      </div>

      {/* Enhanced Stats Grid */}
      <div className="ie-stats-grid enhanced-stats">
        <div className="stat-card stat-income">
          <div className="stat-icon income-bg">
            <TrendingUp size={24} />
          </div>
          <div className="stat-content">
            <div className="stat-label">Total Income</div>
            <div className="stat-value">{formatCurrency(stats.totalIncome)}</div>
            <div className="stat-subtitle stat-positive">
              <TrendingUp size={14} />
              +{stats.growthPercentage}% from previous period
            </div>
          </div>
        </div>

        <div className="stat-card stat-pending">
          <div className="stat-icon pending-bg">
            <Clock size={24} />
          </div>
          <div className="stat-content">
            <div className="stat-label">Pending Income</div>
            <div className="stat-value">{formatCurrency(stats.pendingIncome)}</div>
            <div className="stat-subtitle">
              {filteredIncome.filter(i => i.status === 'pending').length} transactions pending
            </div>
          </div>
        </div>

        <div className="stat-card stat-count">
          <div className="stat-icon count-bg">
            <FileText size={24} />
          </div>
          <div className="stat-content">
            <div className="stat-label">Total Transactions</div>
            <div className="stat-value">{stats.completedTransactions}</div>
            <div className="stat-subtitle">
              Completed in selected period
            </div>
          </div>
        </div>

        <div className="stat-card stat-average">
          <div className="stat-icon average-bg">
            <BarChart3 size={24} />
          </div>
          <div className="stat-content">
            <div className="stat-label">Average Transaction</div>
            <div className="stat-value">{formatCurrency(stats.averageTransaction)}</div>
            <div className="stat-subtitle">
              Per transaction value
            </div>
          </div>
        </div>

        <div className="stat-card stat-highest">
          <div className="stat-icon highest-bg">
            <Target size={24} />
          </div>
          <div className="stat-content">
            <div className="stat-label">Highest Transaction</div>
            <div className="stat-value">{formatCurrency(stats.highestTransaction)}</div>
            <div className="stat-subtitle">
              Peak transaction value
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
              placeholder="Search by description or customer..."
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
            <option value="Project Payment">Project Payment</option>
            <option value="Consulting Fees">Consulting Fees</option>
            <option value="Product Sales">Product Sales</option>
            <option value="Service Revenue">Service Revenue</option>
            <option value="Contract Revenue">Contract Revenue</option>
            <option value="Employee Revenue">Employee Revenue</option>
          </select>
          
          <select 
            className="filter-select" 
            value={selectedPaymentMethod} 
            onChange={(e) => setSelectedPaymentMethod(e.target.value)}
          >
            <option value="all">All Payment Methods</option>
            <option value="Bank Transfer">Bank Transfer</option>
            <option value="UPI">UPI</option>
            <option value="Cash">Cash</option>
            <option value="Card">Card</option>
            <option value="IMPS">IMPS</option>
            <option value="RTGS">RTGS</option>
            <option value="NEFT">NEFT</option>
            <option value="Cheque">Cheque</option>
          </select>
          
          {/* Period Dropdown */}
          <div className="period-dropdown-container">
            <button 
              className="period-dropdown-trigger"
              onClick={() => setShowPeriodDropdown(!showPeriodDropdown)}
            >
              <Calendar size={18} />
              <span>{selectedPeriodLabel}</span>
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
          {filteredIncome.length === 0 ? (
            <div className="no-data">
              <FileText size={48} />
              <p>No income transactions found for selected period</p>
              <button className="btn-primary-blue" onClick={() => setSelectedPeriod('today')}>
                Reset to Today
              </button>
            </div>
          ) : (
            filteredIncome.map(item => (
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
                          {item.status === 'completed' ? <CheckCircle size={12} /> : <Clock size={12} />}
                          {item.status === 'completed' ? 'Completed' : 'Pending'}
                        </span>
                      </div>
                    </div>
                    <div className="txn-metadata">
                      <span><Calendar size={12} /> {formatDate(item.date)}</span>
                      <span><Tag size={12} /> {item.category}</span>
                      <span><CreditCard size={12} /> {item.paymentMethod}</span>
                      {item.customer && <span><Users size={12} /> {item.customer}</span>}
                      <span><FileText size={12} /> {item.reference}</span>
                    </div>
                  </div>
                </div>
                <div className="txn-right">
                  <div className="txn-amount income">
                    +{formatCurrency(item.amount)}
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

export default Income;
