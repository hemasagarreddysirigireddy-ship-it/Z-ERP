import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  DollarSign,
  Calendar,
  Filter,
  Download,
  PieChart,
  Activity,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import './BankingAnalytics.css';

interface ChartData {
  month: string;
  income: number;
  expense: number;
  balance: number;
}

interface CategorySpending {
  category: string;
  amount: number;
  percentage: number;
  color: string;
}

const BankingAnalytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'quarter' | 'year'>('month');
  const [selectedMetric, setSelectedMetric] = useState<'cashflow' | 'category' | 'trends'>('cashflow');

  const [monthlyData] = useState<ChartData[]>([
    { month: 'Jan', income: 450000, expense: 320000, balance: 130000 },
    { month: 'Feb', income: 520000, expense: 380000, balance: 140000 },
    { month: 'Mar', income: 480000, expense: 350000, balance: 130000 },
    { month: 'Apr', income: 550000, expense: 390000, balance: 160000 },
    { month: 'May', income: 600000, expense: 420000, balance: 180000 },
    { month: 'Jun', income: 580000, expense: 410000, balance: 170000 },
    { month: 'Jul', income: 620000, expense: 440000, balance: 180000 },
    { month: 'Aug', income: 590000, expense: 430000, balance: 160000 },
    { month: 'Sep', income: 640000, expense: 460000, balance: 180000 },
    { month: 'Oct', income: 670000, expense: 480000, balance: 190000 },
    { month: 'Nov', income: 650000, expense: 470000, balance: 180000 },
    { month: 'Dec', income: 700000, expense: 500000, balance: 200000 }
  ]);

  const [categorySpending] = useState<CategorySpending[]>([
    { category: 'Salaries', amount: 250000, percentage: 35, color: '#667eea' },
    { category: 'Rent & Utilities', amount: 120000, percentage: 17, color: '#f093fb' },
    { category: 'Raw Materials', amount: 180000, percentage: 25, color: '#4facfe' },
    { category: 'Marketing', amount: 80000, percentage: 11, color: '#43e97b' },
    { category: 'Operations', amount: 50000, percentage: 7, color: '#fa709a' },
    { category: 'Others', amount: 35000, percentage: 5, color: '#feca57' }
  ]);

  const totalIncome = monthlyData.reduce((sum, d) => sum + d.income, 0);
  const totalExpense = monthlyData.reduce((sum, d) => sum + d.expense, 0);
  const netProfit = totalIncome - totalExpense;
  const avgMonthlyBalance = monthlyData.reduce((sum, d) => sum + d.balance, 0) / monthlyData.length;

  const maxValue = Math.max(...monthlyData.flatMap(d => [d.income, d.expense]));

  return (
    <div className="banking-analytics-container">
      {/* Header */}
      <div className="analytics-header">
        <div className="analytics-header-left">
          <div className="analytics-icon-main">
            <BarChart3 size={28} />
          </div>
          <div>
            <h1>Banking Analytics</h1>
            <p>Advanced financial insights and trends</p>
          </div>
        </div>
        <div className="analytics-header-actions">
          <select 
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value as any)}
            className="time-range-select"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
          <button className="btn-secondary">
            <Download size={18} />
            Export Report
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="kpi-cards">
        <div className="kpi-card income">
          <div className="kpi-icon">
            <ArrowUpRight size={24} />
          </div>
          <div className="kpi-content">
            <span className="kpi-label">Total Income</span>
            <h3 className="kpi-value">₹ {totalIncome.toLocaleString()}</h3>
            <span className="kpi-change positive">
              <TrendingUp size={14} />
              +12.5% from last period
            </span>
          </div>
        </div>

        <div className="kpi-card expense">
          <div className="kpi-icon">
            <ArrowDownRight size={24} />
          </div>
          <div className="kpi-content">
            <span className="kpi-label">Total Expenses</span>
            <h3 className="kpi-value">₹ {totalExpense.toLocaleString()}</h3>
            <span className="kpi-change negative">
              <TrendingUp size={14} />
              +8.3% from last period
            </span>
          </div>
        </div>

        <div className="kpi-card profit">
          <div className="kpi-icon">
            <DollarSign size={24} />
          </div>
          <div className="kpi-content">
            <span className="kpi-label">Net Profit</span>
            <h3 className="kpi-value">₹ {netProfit.toLocaleString()}</h3>
            <span className="kpi-change positive">
              <TrendingUp size={14} />
              +18.2% from last period
            </span>
          </div>
        </div>

        <div className="kpi-card average">
          <div className="kpi-icon">
            <Activity size={24} />
          </div>
          <div className="kpi-content">
            <span className="kpi-label">Avg Monthly Balance</span>
            <h3 className="kpi-value">₹ {Math.round(avgMonthlyBalance).toLocaleString()}</h3>
            <span className="kpi-change positive">
              <TrendingUp size={14} />
              +5.7% from last period
            </span>
          </div>
        </div>
      </div>

      {/* Metric Selector */}
      <div className="metric-selector">
        <button 
          className={selectedMetric === 'cashflow' ? 'active' : ''}
          onClick={() => setSelectedMetric('cashflow')}
        >
          <BarChart3 size={18} />
          Cash Flow Analysis
        </button>
        <button 
          className={selectedMetric === 'category' ? 'active' : ''}
          onClick={() => setSelectedMetric('category')}
        >
          <PieChart size={18} />
          Category Breakdown
        </button>
        <button 
          className={selectedMetric === 'trends' ? 'active' : ''}
          onClick={() => setSelectedMetric('trends')}
        >
          <TrendingUp size={18} />
          Trend Analysis
        </button>
      </div>

      {/* Cash Flow Chart */}
      {selectedMetric === 'cashflow' && (
        <div className="chart-container">
          <div className="chart-header">
            <h2>Cash Flow Analysis</h2>
            <div className="chart-legend">
              <div className="legend-item">
                <div className="legend-color income"></div>
                <span>Income</span>
              </div>
              <div className="legend-item">
                <div className="legend-color expense"></div>
                <span>Expenses</span>
              </div>
              <div className="legend-item">
                <div className="legend-color balance"></div>
                <span>Net Balance</span>
              </div>
            </div>
          </div>

          <div className="bar-chart">
            {monthlyData.map((data, index) => (
              <div key={index} className="bar-group">
                <div className="bars">
                  <div 
                    className="bar income-bar"
                    style={{ height: `${(data.income / maxValue) * 100}%` }}
                    title={`Income: ₹${data.income.toLocaleString()}`}
                  >
                    <span className="bar-value">₹{(data.income / 1000).toFixed(0)}k</span>
                  </div>
                  <div 
                    className="bar expense-bar"
                    style={{ height: `${(data.expense / maxValue) * 100}%` }}
                    title={`Expense: ₹${data.expense.toLocaleString()}`}
                  >
                    <span className="bar-value">₹{(data.expense / 1000).toFixed(0)}k</span>
                  </div>
                  <div 
                    className="bar balance-bar"
                    style={{ height: `${(data.balance / maxValue) * 100}%` }}
                    title={`Balance: ₹${data.balance.toLocaleString()}`}
                  >
                    <span className="bar-value">₹{(data.balance / 1000).toFixed(0)}k</span>
                  </div>
                </div>
                <div className="bar-label">{data.month}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Category Breakdown */}
      {selectedMetric === 'category' && (
        <div className="chart-container">
          <div className="chart-header">
            <h2>Category-wise Spending</h2>
            <span className="total-spending">
              Total: ₹ {categorySpending.reduce((s, c) => s + c.amount, 0).toLocaleString()}
            </span>
          </div>

          <div className="category-breakdown">
            <div className="pie-chart-visual">
              <div className="pie-chart">
                {categorySpending.map((cat, index) => {
                  const rotation = categorySpending
                    .slice(0, index)
                    .reduce((sum, c) => sum + (c.percentage * 3.6), 0);
                  return (
                    <div
                      key={cat.category}
                      className="pie-slice"
                      style={{
                        background: cat.color,
                        transform: `rotate(${rotation}deg)`,
                        clipPath: `polygon(50% 50%, 50% 0%, ${50 + 50 * Math.sin((cat.percentage * 3.6 * Math.PI) / 180)}% ${50 - 50 * Math.cos((cat.percentage * 3.6 * Math.PI) / 180)}%)`
                      }}
                    />
                  );
                })}
              </div>
            </div>

            <div className="category-list">
              {categorySpending.map(cat => (
                <div key={cat.category} className="category-item">
                  <div className="category-info">
                    <div 
                      className="category-color"
                      style={{ background: cat.color }}
                    ></div>
                    <span className="category-name">{cat.category}</span>
                  </div>
                  <div className="category-stats">
                    <span className="category-amount">₹ {cat.amount.toLocaleString()}</span>
                    <span className="category-percentage">{cat.percentage}%</span>
                  </div>
                  <div className="category-bar">
                    <div 
                      className="category-bar-fill"
                      style={{ width: `${cat.percentage}%`, background: cat.color }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Trend Analysis */}
      {selectedMetric === 'trends' && (
        <div className="chart-container">
          <div className="chart-header">
            <h2>Balance Trend Analysis</h2>
            <span className="trend-info">12-month trend with predictions</span>
          </div>

          <div className="line-chart">
            <div className="line-chart-grid">
              {[0, 1, 2, 3, 4].map(i => (
                <div key={i} className="grid-line">
                  <span className="grid-label">
                    ₹{Math.round((maxValue * (4 - i)) / 4 / 1000)}k
                  </span>
                </div>
              ))}
            </div>

            <svg className="line-chart-svg" viewBox="0 0 1000 300">
              <polyline
                points={monthlyData.map((d, i) => 
                  `${(i * 1000) / (monthlyData.length - 1)},${300 - (d.balance / maxValue) * 280}`
                ).join(' ')}
                fill="none"
                stroke="#667eea"
                strokeWidth="3"
              />
              {monthlyData.map((d, i) => (
                <circle
                  key={i}
                  cx={(i * 1000) / (monthlyData.length - 1)}
                  cy={300 - (d.balance / maxValue) * 280}
                  r="5"
                  fill="#667eea"
                />
              ))}
            </svg>

            <div className="line-chart-labels">
              {monthlyData.map((d, i) => (
                <span key={i} className="line-label">{d.month}</span>
              ))}
            </div>
          </div>

          <div className="trend-insights">
            <div className="insight-card">
              <h4>Trend Direction</h4>
              <p className="insight-positive">
                <TrendingUp size={20} />
                Upward trend - Balance increasing by average 5% monthly
              </p>
            </div>
            <div className="insight-card">
              <h4>Predicted Next Month</h4>
              <p className="insight-value">₹ 210,000</p>
            </div>
            <div className="insight-card">
              <h4>Seasonal Pattern</h4>
              <p>Q4 shows highest growth with 15% increase</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BankingAnalytics;
