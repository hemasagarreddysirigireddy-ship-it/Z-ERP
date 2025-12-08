import React, { useState, useMemo } from 'react';
import {
  DollarSign,
  TrendingUp,
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
  BarChart3
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
}

const Income: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('all');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showFilters, setShowFilters] = useState(true);

  // Sample income data
  const [incomeData] = useState<IncomeTransaction[]>([
    {
      id: 'inc001',
      description: 'Project Phoenix Phase 2 milestone payment',
      amount: 350000,
      date: '2024-12-05',
      category: 'Project Payment',
      paymentMethod: 'Bank Transfer',
      status: 'completed',
      customer: 'ABC Corporation',
      reference: 'INV-CLI-5678',
      notes: 'Payment received on time'
    },
    {
      id: 'inc002',
      description: 'Quarterly consulting services Q4 2024',
      amount: 275000,
      date: '2024-12-03',
      category: 'Consulting Fees',
      paymentMethod: 'IMPS',
      status: 'completed',
      customer: 'XYZ Enterprises',
      reference: 'INV-CLI-9012',
      notes: '40 hours consultation provided'
    },
    {
      id: 'inc003',
      description: 'Custom software product delivery',
      amount: 425000,
      date: '2024-12-01',
      category: 'Product Sales',
      paymentMethod: 'RTGS',
      status: 'completed',
      customer: 'DEF Industries',
      reference: 'INV-CLI-3456',
      notes: 'Final payment received'
    },
    {
      id: 'inc004',
      description: 'Quarterly interest from bank deposits',
      amount: 12560.50,
      date: '2024-11-29',
      category: 'Interest Income',
      paymentMethod: 'Bank Credit',
      status: 'completed',
      reference: 'INT-Q4-2024',
      notes: 'Interest on average balance'
    },
    {
      id: 'inc005',
      description: 'Web development project payment',
      amount: 185000,
      date: '2024-11-28',
      category: 'Project Payment',
      paymentMethod: 'UPI',
      status: 'completed',
      customer: 'GHI Tech Solutions',
      reference: 'INV-CLI-7890',
      notes: 'Milestone 3 completed'
    },
    {
      id: 'inc006',
      description: 'Annual maintenance contract renewal',
      amount: 150000,
      date: '2024-11-25',
      category: 'Service Revenue',
      paymentMethod: 'Cheque',
      status: 'pending',
      customer: 'JKL Enterprises',
      reference: 'INV-CLI-4567',
      notes: 'Cheque under clearance'
    },
    {
      id: 'inc007',
      description: 'Training program fees',
      amount: 95000,
      date: '2024-11-22',
      category: 'Consulting Fees',
      paymentMethod: 'Bank Transfer',
      status: 'completed',
      customer: 'MNO Corporation',
      reference: 'INV-CLI-2345',
      notes: '3-day training session'
    },
    {
      id: 'inc008',
      description: 'License fees for software product',
      amount: 225000,
      date: '2024-11-20',
      category: 'Product Sales',
      paymentMethod: 'NEFT',
      status: 'completed',
      customer: 'PQR Systems',
      reference: 'INV-CLI-6789',
      notes: 'Annual license'
    }
  ]);

  // Filter income data
  const filteredIncome = useMemo(() => {
    return incomeData.filter(item => {
      const matchesSearch = searchQuery === '' || 
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.customer?.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchesPayment = selectedPaymentMethod === 'all' || item.paymentMethod === selectedPaymentMethod;
      
      return matchesSearch && matchesCategory && matchesPayment;
    });
  }, [incomeData, searchQuery, selectedCategory, selectedPaymentMethod]);

  // Calculate statistics
  const totalIncome = filteredIncome
    .filter(item => item.status === 'completed')
    .reduce((sum, item) => sum + item.amount, 0);

  const pendingIncome = filteredIncome
    .filter(item => item.status === 'pending')
    .reduce((sum, item) => sum + item.amount, 0);

  const transactionCount = filteredIncome.length;
  const growthPercentage = 12.5; // Mock data

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

  return (
    <div className="income-expense-modern">
      {/* Header */}
      <div className="ie-header">
        <div className="ie-header-left">
          <div className="ie-icon-main income-gradient">
            <DollarSign size={32} />
          </div>
          <div>
            <h1>Income Management</h1>
            <p>Track and manage all income transactions</p>
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
          <button className="btn-primary-blue">
            <Plus size={18} />
            Record Income
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="ie-stats-grid">
        <div className="stat-card stat-income">
          <div className="stat-icon income-bg">
            <TrendingUp size={24} />
          </div>
          <div className="stat-content">
            <div className="stat-label">Total Income</div>
            <div className="stat-value">{formatCurrency(totalIncome)}</div>
            <div className="stat-subtitle stat-positive">
              <TrendingUp size={14} />
              +{growthPercentage}% from last period
            </div>
          </div>
        </div>

        <div className="stat-card stat-pending">
          <div className="stat-icon pending-bg">
            <Clock size={24} />
          </div>
          <div className="stat-content">
            <div className="stat-label">Pending Income</div>
            <div className="stat-value">{formatCurrency(pendingIncome)}</div>
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
              {formatCurrency(transactionCount > 0 ? totalIncome / transactionCount : 0)}
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
            <option value="Interest Income">Interest Income</option>
            <option value="Service Revenue">Service Revenue</option>
          </select>
          
          <select 
            className="filter-select" 
            value={selectedPaymentMethod} 
            onChange={(e) => setSelectedPaymentMethod(e.target.value)}
          >
            <option value="all">All Payment Methods</option>
            <option value="Bank Transfer">Bank Transfer</option>
            <option value="UPI">UPI</option>
            <option value="IMPS">IMPS</option>
            <option value="RTGS">RTGS</option>
            <option value="NEFT">NEFT</option>
            <option value="Cheque">Cheque</option>
            <option value="Cash">Cash</option>
            <option value="Bank Credit">Bank Credit</option>
          </select>
          
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
              <p>No income transactions found</p>
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
    </div>
  );
};

export default Income;
