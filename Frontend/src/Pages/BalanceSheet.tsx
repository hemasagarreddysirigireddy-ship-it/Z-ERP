import React, { useState, useMemo } from 'react';
import {
  TrendingUp,
  TrendingDown,
  Calendar,
  Download,
  RefreshCw,
  Filter,
  ChevronDown,
  Zap,
  Target,
  CalendarDays,
  BarChart3,
  CheckCircle,
  DollarSign,
  ArrowUpRight,
  ArrowDownLeft,
  PieChart,
  FileText,
  Activity,
  X
} from 'lucide-react';
import '../modules/accounts/IncomeExpense.css';

interface Transaction {
  id: string;
  description: string;
  amount: number;
  date: string;
  category: string;
  type: 'income' | 'expense';
  status: 'completed' | 'pending';
}

interface PeriodOption {
  value: string;
  label: string;
  icon: React.ComponentType<{ size?: number }>;
}

interface BalanceSheetStats {
  totalIncome: number;
  totalExpense: number;
  netProfit: number;
  profitMargin: number;
  growthRate: number;
  isProfit: boolean;
  categoryWiseIncome: { [key: string]: number };
  categoryWiseExpense: { [key: string]: number };
}

const BalanceSheet: React.FC = () => {
  const [showFilters, setShowFilters] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showPeriodDropdown, setShowPeriodDropdown] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('today');
  const [showCustomDateModal, setShowCustomDateModal] = useState(false);
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Period options
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

  // Sample transaction data
  const [transactions] = useState<Transaction[]>([
    // Income transactions
    {
      id: 'inc001',
      description: 'Product Sales - Website',
      amount: 125000,
      date: '2024-12-07',
      category: 'Product Sales',
      type: 'income',
      status: 'completed'
    },
    {
      id: 'inc002',
      description: 'Service Revenue - Consulting',
      amount: 85000,
      date: '2024-12-06',
      category: 'Service Revenue',
      type: 'income',
      status: 'completed'
    },
    {
      id: 'inc003',
      description: 'Project Payment - ABC Corp',
      amount: 250000,
      date: '2024-12-05',
      category: 'Project Payment',
      type: 'income',
      status: 'completed'
    },
    {
      id: 'inc004',
      description: 'Subscription Renewal',
      amount: 45000,
      date: '2024-12-04',
      category: 'Service Revenue',
      type: 'income',
      status: 'completed'
    },
    // Expense transactions
    {
      id: 'exp001',
      description: 'Employee Salaries - November',
      amount: 850000,
      date: '2024-12-04',
      category: 'Salary & Wages',
      type: 'expense',
      status: 'completed'
    },
    {
      id: 'exp002',
      description: 'Office Rent - December',
      amount: 180000,
      date: '2024-12-04',
      category: 'Rent',
      type: 'expense',
      status: 'completed'
    },
    {
      id: 'exp003',
      description: 'Utilities & Internet',
      amount: 45320,
      date: '2024-12-03',
      category: 'Utilities',
      type: 'expense',
      status: 'completed'
    },
    {
      id: 'exp004',
      description: 'Marketing Campaign',
      amount: 125000,
      date: '2024-12-02',
      category: 'Marketing',
      type: 'expense',
      status: 'completed'
    }
  ]);

  // Filter by period
  const filterByPeriod = (data: Transaction[]) => {
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

  // Filter transactions
  const filteredTransactions = useMemo(() => {
    let filtered = filterByPeriod(transactions);
    
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }
    
    return filtered;
  }, [transactions, selectedPeriod, customStartDate, customEndDate, selectedCategory]);

  // Calculate balance sheet statistics
  const stats: BalanceSheetStats = useMemo(() => {
    const completed = filteredTransactions.filter(t => t.status === 'completed');
    
    const income = completed.filter(t => t.type === 'income');
    const expense = completed.filter(t => t.type === 'expense');
    
    const totalIncome = income.reduce((sum, t) => sum + t.amount, 0);
    const totalExpense = expense.reduce((sum, t) => sum + t.amount, 0);
    const netProfit = totalIncome - totalExpense;
    const profitMargin = totalIncome > 0 ? (netProfit / totalIncome) * 100 : 0;
    
    // Category-wise breakdown
    const categoryWiseIncome: { [key: string]: number } = {};
    income.forEach(t => {
      categoryWiseIncome[t.category] = (categoryWiseIncome[t.category] || 0) + t.amount;
    });
    
    const categoryWiseExpense: { [key: string]: number } = {};
    expense.forEach(t => {
      categoryWiseExpense[t.category] = (categoryWiseExpense[t.category] || 0) + t.amount;
    });
    
    return {
      totalIncome,
      totalExpense,
      netProfit,
      profitMargin,
      growthRate: 12.5,
      isProfit: netProfit >= 0,
      categoryWiseIncome,
      categoryWiseExpense
    };
  }, [filteredTransactions]);

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
      alert('Balance Sheet report generated successfully! Download will start shortly.');
    }, 2000);
  };

  const selectedPeriodLabel = periodOptions.find(p => p.value === selectedPeriod)?.label || 'Select Period';

  // Get all unique categories
  const allCategories = useMemo(() => {
    const categories = new Set<string>();
    transactions.forEach(t => categories.add(t.category));
    return Array.from(categories).sort();
  }, [transactions]);

  return (
    <div className="income-expense-modern">
      {/* Header */}
      <div className="ie-header">
        <div className="ie-header-left">
          <div className="ie-icon-main" style={{ background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)', boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)' }}>
            <Activity size={32} />
          </div>
          <div>
            <h1>Balance Sheet & P&L Statement</h1>
            <p>Comprehensive financial overview and profit analysis</p>
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
        </div>
      </div>

      {/* Enhanced Stats Grid - Balance Sheet Overview */}
      <div className="ie-stats-grid enhanced-stats">
        <div className="stat-card" style={{ background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(22, 163, 74, 0.15) 100%)', border: '2px solid rgba(34, 197, 94, 0.2)' }}>
          <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)', boxShadow: '0 4px 12px rgba(34, 197, 94, 0.3)' }}>
            <ArrowDownLeft size={24} />
          </div>
          <div className="stat-content">
            <div className="stat-label">Total Income</div>
            <div className="stat-value">{formatCurrency(stats.totalIncome)}</div>
            <div className="stat-subtitle" style={{ color: '#22c55e' }}>
              Revenue for selected period
            </div>
          </div>
        </div>

        <div className="stat-card" style={{ background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(220, 38, 38, 0.15) 100%)', border: '2px solid rgba(239, 68, 68, 0.2)' }}>
          <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)', boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)' }}>
            <ArrowUpRight size={24} />
          </div>
          <div className="stat-content">
            <div className="stat-label">Total Expenses</div>
            <div className="stat-value">{formatCurrency(stats.totalExpense)}</div>
            <div className="stat-subtitle" style={{ color: '#ef4444' }}>
              Expenditure for selected period
            </div>
          </div>
        </div>

        <div className="stat-card" style={{ 
          background: stats.isProfit 
            ? 'linear-gradient(135deg, rgba(37, 99, 235, 0.1) 0%, rgba(29, 78, 216, 0.15) 100%)' 
            : 'linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(217, 119, 6, 0.15) 100%)',
          border: stats.isProfit ? '2px solid rgba(37, 99, 235, 0.2)' : '2px solid rgba(245, 158, 11, 0.2)'
        }}>
          <div className="stat-icon" style={{ 
            background: stats.isProfit 
              ? 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)' 
              : 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
            boxShadow: stats.isProfit ? '0 4px 12px rgba(37, 99, 235, 0.3)' : '0 4px 12px rgba(245, 158, 11, 0.3)'
          }}>
            {stats.isProfit ? <TrendingUp size={24} /> : <TrendingDown size={24} />}
          </div>
          <div className="stat-content">
            <div className="stat-label">{stats.isProfit ? 'Net Profit' : 'Net Loss'}</div>
            <div className="stat-value" style={{ color: stats.isProfit ? '#2563eb' : '#f59e0b' }}>
              {formatCurrency(Math.abs(stats.netProfit))}
            </div>
            <div className="stat-subtitle" style={{ color: stats.isProfit ? '#2563eb' : '#f59e0b' }}>
              {stats.isProfit ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
              {stats.profitMargin.toFixed(1)}% Profit Margin
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)', boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)' }}>
            <PieChart size={24} />
          </div>
          <div className="stat-content">
            <div className="stat-label">Income Categories</div>
            <div className="stat-value">{Object.keys(stats.categoryWiseIncome).length}</div>
            <div className="stat-subtitle">
              Revenue streams tracked
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)', boxShadow: '0 4px 12px rgba(6, 182, 212, 0.3)' }}>
            <BarChart3 size={24} />
          </div>
          <div className="stat-content">
            <div className="stat-label">Expense Categories</div>
            <div className="stat-value">{Object.keys(stats.categoryWiseExpense).length}</div>
            <div className="stat-subtitle">
              Expense types monitored
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)', boxShadow: '0 4px 12px rgba(249, 115, 22, 0.3)' }}>
            <Target size={24} />
          </div>
          <div className="stat-content">
            <div className="stat-label">Growth Rate</div>
            <div className="stat-value">+{stats.growthRate}%</div>
            <div className="stat-subtitle">
              Compared to previous period
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="ie-content">
        {showFilters && (
          <div className="transactions-filters animate-slide-down">
            <select 
              className="filter-select" 
              value={selectedCategory} 
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">All Categories</option>
              {allCategories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
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
          </div>
        )}

        {/* Category-wise Breakdown */}
        <div className="balance-sheet-breakdown">
          <div className="breakdown-section">
            <h3 className="breakdown-title">
              <ArrowDownLeft size={20} style={{ color: '#22c55e' }} />
              Income Breakdown
            </h3>
            <div className="breakdown-list">
              {Object.entries(stats.categoryWiseIncome).length > 0 ? (
                Object.entries(stats.categoryWiseIncome)
                  .sort(([, a], [, b]) => b - a)
                  .map(([category, amount]) => (
                    <div key={category} className="breakdown-item">
                      <div className="breakdown-item-info">
                        <span className="breakdown-category">{category}</span>
                        <div className="breakdown-bar">
                          <div 
                            className="breakdown-bar-fill income-bar"
                            style={{ width: `${stats.totalIncome > 0 ? (amount / stats.totalIncome) * 100 : 0}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="breakdown-amount income-amount">
                        {formatCurrency(amount)}
                        <span className="breakdown-percent">
                          {stats.totalIncome > 0 ? ((amount / stats.totalIncome) * 100).toFixed(1) : '0.0'}%
                        </span>
                      </div>
                    </div>
                  ))
              ) : (
                <div className="no-data-small">No income data for selected period</div>
              )}
            </div>
          </div>

          <div className="breakdown-section">
            <h3 className="breakdown-title">
              <ArrowUpRight size={20} style={{ color: '#ef4444' }} />
              Expense Breakdown
            </h3>
            <div className="breakdown-list">
              {Object.entries(stats.categoryWiseExpense).length > 0 ? (
                Object.entries(stats.categoryWiseExpense)
                  .sort(([, a], [, b]) => b - a)
                  .map(([category, amount]) => (
                    <div key={category} className="breakdown-item">
                      <div className="breakdown-item-info">
                        <span className="breakdown-category">{category}</span>
                        <div className="breakdown-bar">
                          <div 
                            className="breakdown-bar-fill expense-bar"
                            style={{ width: `${stats.totalExpense > 0 ? (amount / stats.totalExpense) * 100 : 0}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="breakdown-amount expense-amount">
                        {formatCurrency(amount)}
                        <span className="breakdown-percent">
                          {stats.totalExpense > 0 ? ((amount / stats.totalExpense) * 100).toFixed(1) : '0.0'}%
                        </span>
                      </div>
                    </div>
                  ))
              ) : (
                <div className="no-data-small">No expense data for selected period</div>
              )}
            </div>
          </div>
        </div>

        {/* Transaction Summary */}
        <div className="transaction-summary">
          <h3 className="summary-title">
            <FileText size={20} />
            Transaction Summary ({filteredTransactions.length} transactions)
          </h3>
          <div className="summary-stats">
            <div className="summary-stat income-stat">
              <span className="summary-stat-label">Income Transactions</span>
              <span className="summary-stat-value">
                {filteredTransactions.filter(t => t.type === 'income').length}
              </span>
            </div>
            <div className="summary-stat expense-stat">
              <span className="summary-stat-label">Expense Transactions</span>
              <span className="summary-stat-value">
                {filteredTransactions.filter(t => t.type === 'expense').length}
              </span>
            </div>
            <div className={`summary-stat ${stats.isProfit ? 'profit-stat' : 'loss-stat'}`}>
              <span className="summary-stat-label">Financial Status</span>
              <span className="summary-stat-value">
                {stats.isProfit ? '✓ Profitable' : '⚠ Loss'}
              </span>
            </div>
          </div>
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

export default BalanceSheet;
