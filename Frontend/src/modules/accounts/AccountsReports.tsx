import React, { useState } from 'react';
import { 
  TrendingUp, 
  BarChart, 
  PieChart, 
  Calendar, 
  Download,
  DollarSign,
  ArrowUp,
  ArrowDown,
  Activity,
  Briefcase,
  CreditCard,
  FileText
} from 'lucide-react';
import './AccountsReports.css';

// TypeScript Interfaces
interface SummaryMetric {
  title: string;
  value: string;
  change: number;
  icon: React.ReactNode;
  color: string;
}

interface PeriodReport {
  period: string;
  revenue: number;
  expenses: number;
  netIncome: number;
}

interface ProfitLossItem {
  category: string;
  amount: number;
  percentage: number;
}

interface BalanceSheetSection {
  title: string;
  items: { name: string; amount: number }[];
  total: number;
}

interface CashFlowActivity {
  category: string;
  amount: number;
  type: 'operating' | 'investing' | 'financing';
}

interface ChartDataPoint {
  label: string;
  value: number;
}

const AccountsReports: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'periodic' | 'profitloss' | 'balancesheet' | 'cashflow'>('periodic');
  const [reportPeriod, setReportPeriod] = useState<'daily' | 'weekly' | 'monthly'>('monthly');
  const [startDate, setStartDate] = useState('2024-01-01');
  const [endDate, setEndDate] = useState('2024-12-31');

  // Sample Data
  const summaryMetrics: SummaryMetric[] = [
    {
      title: 'Total Revenue',
      value: '$2,458,900',
      change: 12.5,
      icon: <DollarSign size={24} />,
      color: '#10b981'
    },
    {
      title: 'Total Expenses',
      value: '$1,842,300',
      change: -3.2,
      icon: <CreditCard size={24} />,
      color: '#ef4444'
    },
    {
      title: 'Net Profit',
      value: '$616,600',
      change: 18.7,
      icon: <TrendingUp size={24} />,
      color: '#3b82f6'
    },
    {
      title: 'Cash Position',
      value: '$1,234,500',
      change: 8.3,
      icon: <Briefcase size={24} />,
      color: '#8b5cf6'
    }
  ];

  const periodicReports: PeriodReport[] = [
    { period: 'January 2024', revenue: 198500, expenses: 142800, netIncome: 55700 },
    { period: 'February 2024', revenue: 215300, expenses: 156200, netIncome: 59100 },
    { period: 'March 2024', revenue: 189700, expenses: 148900, netIncome: 40800 },
    { period: 'April 2024', revenue: 223400, expenses: 162300, netIncome: 61100 },
    { period: 'May 2024', revenue: 207800, expenses: 151700, netIncome: 56100 },
    { period: 'June 2024', revenue: 198900, expenses: 145600, netIncome: 53300 },
    { period: 'July 2024', revenue: 234600, expenses: 167800, netIncome: 66800 },
    { period: 'August 2024', revenue: 221700, expenses: 159400, netIncome: 62300 },
    { period: 'September 2024', revenue: 209500, expenses: 154200, netIncome: 55300 },
    { period: 'October 2024', revenue: 218900, expenses: 158700, netIncome: 60200 },
    { period: 'November 2024', revenue: 226400, expenses: 163100, netIncome: 63300 },
    { period: 'December 2024', revenue: 214200, expenses: 161600, netIncome: 52600 }
  ];

  const incomeItems: ProfitLossItem[] = [
    { category: 'Sales Revenue', amount: 1850000, percentage: 75.3 },
    { category: 'Service Income', amount: 456900, percentage: 18.6 },
    { category: 'Other Income', amount: 152000, percentage: 6.1 }
  ];

  const expenseItems: ProfitLossItem[] = [
    { category: 'Cost of Goods Sold', amount: 892300, percentage: 48.4 },
    { category: 'Operating Expenses', amount: 567800, percentage: 30.8 },
    { category: 'Salaries & Wages', amount: 245600, percentage: 13.3 },
    { category: 'Administrative', amount: 136600, percentage: 7.5 }
  ];

  const balanceSheetData = {
    assets: {
      title: 'Assets',
      items: [
        { name: 'Cash & Cash Equivalents', amount: 1234500 },
        { name: 'Accounts Receivable', amount: 456700 },
        { name: 'Inventory', amount: 789200 },
        { name: 'Property & Equipment', amount: 2345600 },
        { name: 'Other Assets', amount: 234100 }
      ],
      total: 5060100
    },
    liabilities: {
      title: 'Liabilities',
      items: [
        { name: 'Accounts Payable', amount: 345600 },
        { name: 'Short-term Loans', amount: 567800 },
        { name: 'Long-term Debt', amount: 1234500 },
        { name: 'Other Liabilities', amount: 123400 }
      ],
      total: 2271300
    },
    equity: {
      title: 'Equity',
      items: [
        { name: 'Common Stock', amount: 1500000 },
        { name: 'Retained Earnings', amount: 1172200 },
        { name: 'Other Equity', amount: 116600 }
      ],
      total: 2788800
    }
  };

  const cashFlowData: CashFlowActivity[] = [
    { category: 'Operating Cash Flow', amount: 756400, type: 'operating' },
    { category: 'Accounts Receivable', amount: -123500, type: 'operating' },
    { category: 'Inventory Changes', amount: -67800, type: 'operating' },
    { category: 'Accounts Payable', amount: 89200, type: 'operating' },
    { category: 'Equipment Purchase', amount: -345600, type: 'investing' },
    { category: 'Investment Income', amount: 67800, type: 'investing' },
    { category: 'Loan Proceeds', amount: 450000, type: 'financing' },
    { category: 'Loan Repayment', amount: -234500, type: 'financing' },
    { category: 'Dividends Paid', amount: -125000, type: 'financing' }
  ];

  // Helper Functions
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const exportToPDF = () => {
    alert('Exporting to PDF... (Feature to be implemented)');
  };

  const exportToExcel = () => {
    alert('Exporting to Excel... (Feature to be implemented)');
  };

  const calculateTotal = (items: { amount: number }[]): number => {
    return items.reduce((sum, item) => sum + item.amount, 0);
  };

  const getActivityTotal = (type: 'operating' | 'investing' | 'financing'): number => {
    return cashFlowData
      .filter(activity => activity.type === type)
      .reduce((sum, activity) => sum + activity.amount, 0);
  };

  return (
    <div className="accounts-reports-container">
      {/* Header */}
      <div className="reports-header">
        <div className="reports-header-left">
          <div className="reports-icon-main">
            <FileText size={28} />
          </div>
          <div>
            <h1>Financial Reports</h1>
            <p>Comprehensive financial analysis and reporting</p>
          </div>
        </div>
        <div className="reports-header-actions">
          <button className="export-btn pdf-btn" onClick={exportToPDF}>
            <Download size={18} />
            Export PDF
          </button>
          <button className="export-btn excel-btn" onClick={exportToExcel}>
            <Download size={18} />
            Export Excel
          </button>
        </div>
      </div>

      {/* Summary Metrics */}
      <div className="summary-metrics">
        {summaryMetrics.map((metric, index) => (
          <div key={index} className="metric-card" style={{ borderColor: metric.color }}>
            <div className="metric-icon" style={{ background: `${metric.color}20`, color: metric.color }}>
              {metric.icon}
            </div>
            <div className="metric-content">
              <p className="metric-title">{metric.title}</p>
              <h3 className="metric-value">{metric.value}</h3>
              <div className="metric-change" style={{ color: metric.change > 0 ? '#10b981' : '#ef4444' }}>
                {metric.change > 0 ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
                <span>{Math.abs(metric.change)}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="reports-tabs">
        <button
          className={`tab-btn ${activeTab === 'periodic' ? 'active' : ''}`}
          onClick={() => setActiveTab('periodic')}
        >
          <Calendar size={20} />
          Periodic Reports
        </button>
        <button
          className={`tab-btn ${activeTab === 'profitloss' ? 'active' : ''}`}
          onClick={() => setActiveTab('profitloss')}
        >
          <TrendingUp size={20} />
          Profit & Loss
        </button>
        <button
          className={`tab-btn ${activeTab === 'balancesheet' ? 'active' : ''}`}
          onClick={() => setActiveTab('balancesheet')}
        >
          <BarChart size={20} />
          Balance Sheet
        </button>
        <button
          className={`tab-btn ${activeTab === 'cashflow' ? 'active' : ''}`}
          onClick={() => setActiveTab('cashflow')}
        >
          <Activity size={20} />
          Cash Flow
        </button>
      </div>

      {/* Content Area */}
      <div className="reports-content">
        {/* Periodic Reports Tab */}
        {activeTab === 'periodic' && (
          <div className="periodic-reports">
            {/* Filters */}
            <div className="report-filters">
              <div className="filter-group">
                <label>Report Period</label>
                <div className="period-selector">
                  <button
                    className={`period-btn ${reportPeriod === 'daily' ? 'active' : ''}`}
                    onClick={() => setReportPeriod('daily')}
                  >
                    Daily
                  </button>
                  <button
                    className={`period-btn ${reportPeriod === 'weekly' ? 'active' : ''}`}
                    onClick={() => setReportPeriod('weekly')}
                  >
                    Weekly
                  </button>
                  <button
                    className={`period-btn ${reportPeriod === 'monthly' ? 'active' : ''}`}
                    onClick={() => setReportPeriod('monthly')}
                  >
                    Monthly
                  </button>
                </div>
              </div>
              <div className="filter-group">
                <label>Date Range</label>
                <div className="date-range">
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                  <span>to</span>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Chart Visualization */}
            <div className="chart-card">
              <h3>Revenue vs Expenses Trend</h3>
              <div className="chart-area">
                {periodicReports.map((report, index) => {
                  const maxValue = Math.max(...periodicReports.map(r => Math.max(r.revenue, r.expenses)));
                  const revenueHeight = (report.revenue / maxValue) * 100;
                  const expenseHeight = (report.expenses / maxValue) * 100;
                  
                  return (
                    <div key={index} className="chart-bar-group">
                      <div className="chart-bars">
                        <div
                          className="chart-bar revenue"
                          style={{ height: `${revenueHeight}%` }}
                          title={`Revenue: ${formatCurrency(report.revenue)}`}
                        />
                        <div
                          className="chart-bar expense"
                          style={{ height: `${expenseHeight}%` }}
                          title={`Expenses: ${formatCurrency(report.expenses)}`}
                        />
                      </div>
                      <div className="chart-label">{report.period.split(' ')[0].substring(0, 3)}</div>
                    </div>
                  );
                })}
              </div>
              <div className="chart-legend">
                <div className="legend-item">
                  <span className="legend-color revenue"></span>
                  <span>Revenue</span>
                </div>
                <div className="legend-item">
                  <span className="legend-color expense"></span>
                  <span>Expenses</span>
                </div>
              </div>
            </div>

            {/* Data Table */}
            <div className="data-table-card">
              <h3>Detailed Breakdown</h3>
              <table className="reports-table">
                <thead>
                  <tr>
                    <th>Period</th>
                    <th>Revenue</th>
                    <th>Expenses</th>
                    <th>Net Income</th>
                    <th>Margin %</th>
                  </tr>
                </thead>
                <tbody>
                  {periodicReports.map((report, index) => {
                    const margin = ((report.netIncome / report.revenue) * 100).toFixed(1);
                    return (
                      <tr key={index}>
                        <td className="period-cell">{report.period}</td>
                        <td className="amount-cell revenue">{formatCurrency(report.revenue)}</td>
                        <td className="amount-cell expense">{formatCurrency(report.expenses)}</td>
                        <td className="amount-cell net-income">{formatCurrency(report.netIncome)}</td>
                        <td className="margin-cell">{margin}%</td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr>
                    <td><strong>Total</strong></td>
                    <td className="amount-cell revenue">
                      <strong>{formatCurrency(calculateTotal(periodicReports.map(r => ({ amount: r.revenue }))))}</strong>
                    </td>
                    <td className="amount-cell expense">
                      <strong>{formatCurrency(calculateTotal(periodicReports.map(r => ({ amount: r.expenses }))))}</strong>
                    </td>
                    <td className="amount-cell net-income">
                      <strong>{formatCurrency(calculateTotal(periodicReports.map(r => ({ amount: r.netIncome }))))}</strong>
                    </td>
                    <td></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        )}

        {/* Profit & Loss Tab */}
        {activeTab === 'profitloss' && (
          <div className="profitloss-report">
            <div className="pl-grid">
              {/* Income Section */}
              <div className="pl-section income-section">
                <h3>Income</h3>
                <div className="pl-items">
                  {incomeItems.map((item, index) => (
                    <div key={index} className="pl-item">
                      <div className="pl-item-header">
                        <span className="pl-category">{item.category}</span>
                        <span className="pl-amount income">{formatCurrency(item.amount)}</span>
                      </div>
                      <div className="pl-progress-bar">
                        <div
                          className="pl-progress income"
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                      <span className="pl-percentage">{item.percentage}% of total</span>
                    </div>
                  ))}
                </div>
                <div className="pl-total income-total">
                  <span>Total Income</span>
                  <span>{formatCurrency(calculateTotal(incomeItems))}</span>
                </div>
              </div>

              {/* Expenses Section */}
              <div className="pl-section expense-section">
                <h3>Expenses</h3>
                <div className="pl-items">
                  {expenseItems.map((item, index) => (
                    <div key={index} className="pl-item">
                      <div className="pl-item-header">
                        <span className="pl-category">{item.category}</span>
                        <span className="pl-amount expense">{formatCurrency(item.amount)}</span>
                      </div>
                      <div className="pl-progress-bar">
                        <div
                          className="pl-progress expense"
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                      <span className="pl-percentage">{item.percentage}% of total</span>
                    </div>
                  ))}
                </div>
                <div className="pl-total expense-total">
                  <span>Total Expenses</span>
                  <span>{formatCurrency(calculateTotal(expenseItems))}</span>
                </div>
              </div>
            </div>

            {/* Net Profit */}
            <div className="net-profit-card">
              <div className="net-profit-content">
                <PieChart size={48} />
                <div>
                  <h4>Net Profit</h4>
                  <p className="net-profit-amount">
                    {formatCurrency(calculateTotal(incomeItems) - calculateTotal(expenseItems))}
                  </p>
                  <p className="net-profit-margin">
                    Margin: {(((calculateTotal(incomeItems) - calculateTotal(expenseItems)) / calculateTotal(incomeItems)) * 100).toFixed(1)}%
                  </p>
                </div>
              </div>
            </div>

            {/* Visual Graph */}
            <div className="pl-chart-card">
              <h3>Income vs Expenses Distribution</h3>
              <div className="donut-chart-container">
                <div className="donut-chart">
                  <svg viewBox="0 0 200 200">
                    <circle
                      cx="100"
                      cy="100"
                      r="80"
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="40"
                      strokeDasharray={`${(calculateTotal(incomeItems) / (calculateTotal(incomeItems) + calculateTotal(expenseItems))) * 502.65} 502.65`}
                      transform="rotate(-90 100 100)"
                    />
                    <circle
                      cx="100"
                      cy="100"
                      r="80"
                      fill="none"
                      stroke="#ef4444"
                      strokeWidth="40"
                      strokeDasharray={`${(calculateTotal(expenseItems) / (calculateTotal(incomeItems) + calculateTotal(expenseItems))) * 502.65} 502.65`}
                      strokeDashoffset={`-${(calculateTotal(incomeItems) / (calculateTotal(incomeItems) + calculateTotal(expenseItems))) * 502.65}`}
                      transform="rotate(-90 100 100)"
                    />
                  </svg>
                  <div className="donut-center">
                    <p className="donut-label">Total</p>
                    <p className="donut-value">{formatCurrency(calculateTotal(incomeItems) + calculateTotal(expenseItems))}</p>
                  </div>
                </div>
                <div className="donut-legend">
                  <div className="donut-legend-item">
                    <span className="donut-color" style={{ background: '#10b981' }}></span>
                    <div>
                      <p className="donut-legend-label">Income</p>
                      <p className="donut-legend-value">{formatCurrency(calculateTotal(incomeItems))}</p>
                    </div>
                  </div>
                  <div className="donut-legend-item">
                    <span className="donut-color" style={{ background: '#ef4444' }}></span>
                    <div>
                      <p className="donut-legend-label">Expenses</p>
                      <p className="donut-legend-value">{formatCurrency(calculateTotal(expenseItems))}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Balance Sheet Tab */}
        {activeTab === 'balancesheet' && (
          <div className="balancesheet-report">
            <div className="bs-grid">
              {/* Assets */}
              <div className="bs-section assets-section">
                <div className="bs-section-header">
                  <h3>{balanceSheetData.assets.title}</h3>
                  <div className="bs-icon" style={{ background: '#3b82f620', color: '#3b82f6' }}>
                    <Briefcase size={24} />
                  </div>
                </div>
                <div className="bs-items">
                  {balanceSheetData.assets.items.map((item, index) => (
                    <div key={index} className="bs-item">
                      <span className="bs-item-name">{item.name}</span>
                      <span className="bs-item-amount">{formatCurrency(item.amount)}</span>
                    </div>
                  ))}
                </div>
                <div className="bs-total assets-total">
                  <span>Total Assets</span>
                  <span>{formatCurrency(balanceSheetData.assets.total)}</span>
                </div>
              </div>

              {/* Liabilities */}
              <div className="bs-section liabilities-section">
                <div className="bs-section-header">
                  <h3>{balanceSheetData.liabilities.title}</h3>
                  <div className="bs-icon" style={{ background: '#ef444420', color: '#ef4444' }}>
                    <CreditCard size={24} />
                  </div>
                </div>
                <div className="bs-items">
                  {balanceSheetData.liabilities.items.map((item, index) => (
                    <div key={index} className="bs-item">
                      <span className="bs-item-name">{item.name}</span>
                      <span className="bs-item-amount">{formatCurrency(item.amount)}</span>
                    </div>
                  ))}
                </div>
                <div className="bs-total liabilities-total">
                  <span>Total Liabilities</span>
                  <span>{formatCurrency(balanceSheetData.liabilities.total)}</span>
                </div>
              </div>

              {/* Equity */}
              <div className="bs-section equity-section">
                <div className="bs-section-header">
                  <h3>{balanceSheetData.equity.title}</h3>
                  <div className="bs-icon" style={{ background: '#10b98120', color: '#10b981' }}>
                    <TrendingUp size={24} />
                  </div>
                </div>
                <div className="bs-items">
                  {balanceSheetData.equity.items.map((item, index) => (
                    <div key={index} className="bs-item">
                      <span className="bs-item-name">{item.name}</span>
                      <span className="bs-item-amount">{formatCurrency(item.amount)}</span>
                    </div>
                  ))}
                </div>
                <div className="bs-total equity-total">
                  <span>Total Equity</span>
                  <span>{formatCurrency(balanceSheetData.equity.total)}</span>
                </div>
              </div>
            </div>

            {/* Balance Verification */}
            <div className="balance-verification">
              <div className="verification-item">
                <span>Total Liabilities + Equity</span>
                <span className="verification-amount">
                  {formatCurrency(balanceSheetData.liabilities.total + balanceSheetData.equity.total)}
                </span>
              </div>
              <div className="verification-equals">=</div>
              <div className="verification-item">
                <span>Total Assets</span>
                <span className="verification-amount">
                  {formatCurrency(balanceSheetData.assets.total)}
                </span>
              </div>
              <div className="verification-status">
                {balanceSheetData.assets.total === (balanceSheetData.liabilities.total + balanceSheetData.equity.total) ? (
                  <span className="balanced">✓ Balance Sheet is Balanced</span>
                ) : (
                  <span className="unbalanced">⚠ Balance Sheet is Unbalanced</span>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Cash Flow Tab */}
        {activeTab === 'cashflow' && (
          <div className="cashflow-report">
            {/* Activities Grid */}
            <div className="cf-grid">
              {/* Operating Activities */}
              <div className="cf-section operating-section">
                <h3>Operating Activities</h3>
                <div className="cf-items">
                  {cashFlowData
                    .filter(activity => activity.type === 'operating')
                    .map((activity, index) => (
                      <div key={index} className="cf-item">
                        <span className="cf-category">{activity.category}</span>
                        <span className={`cf-amount ${activity.amount >= 0 ? 'positive' : 'negative'}`}>
                          {activity.amount >= 0 ? '+' : ''}{formatCurrency(activity.amount)}
                        </span>
                      </div>
                    ))}
                </div>
                <div className="cf-subtotal operating">
                  <span>Net Operating Cash Flow</span>
                  <span>{formatCurrency(getActivityTotal('operating'))}</span>
                </div>
              </div>

              {/* Investing Activities */}
              <div className="cf-section investing-section">
                <h3>Investing Activities</h3>
                <div className="cf-items">
                  {cashFlowData
                    .filter(activity => activity.type === 'investing')
                    .map((activity, index) => (
                      <div key={index} className="cf-item">
                        <span className="cf-category">{activity.category}</span>
                        <span className={`cf-amount ${activity.amount >= 0 ? 'positive' : 'negative'}`}>
                          {activity.amount >= 0 ? '+' : ''}{formatCurrency(activity.amount)}
                        </span>
                      </div>
                    ))}
                </div>
                <div className="cf-subtotal investing">
                  <span>Net Investing Cash Flow</span>
                  <span>{formatCurrency(getActivityTotal('investing'))}</span>
                </div>
              </div>

              {/* Financing Activities */}
              <div className="cf-section financing-section">
                <h3>Financing Activities</h3>
                <div className="cf-items">
                  {cashFlowData
                    .filter(activity => activity.type === 'financing')
                    .map((activity, index) => (
                      <div key={index} className="cf-item">
                        <span className="cf-category">{activity.category}</span>
                        <span className={`cf-amount ${activity.amount >= 0 ? 'positive' : 'negative'}`}>
                          {activity.amount >= 0 ? '+' : ''}{formatCurrency(activity.amount)}
                        </span>
                      </div>
                    ))}
                </div>
                <div className="cf-subtotal financing">
                  <span>Net Financing Cash Flow</span>
                  <span>{formatCurrency(getActivityTotal('financing'))}</span>
                </div>
              </div>
            </div>

            {/* Net Cash Flow */}
            <div className="net-cashflow-card">
              <div className="net-cf-content">
                <Activity size={48} />
                <div>
                  <h4>Net Cash Flow</h4>
                  <p className="net-cf-amount">
                    {formatCurrency(getActivityTotal('operating') + getActivityTotal('investing') + getActivityTotal('financing'))}
                  </p>
                  <p className="cf-status">
                    {(getActivityTotal('operating') + getActivityTotal('investing') + getActivityTotal('financing')) >= 0 
                      ? 'Positive cash flow' 
                      : 'Negative cash flow'}
                  </p>
                </div>
              </div>
            </div>

            {/* Cash Position Chart */}
            <div className="cf-chart-card">
              <h3>Cash Position by Activity Type</h3>
              <div className="cf-chart">
                {['operating', 'investing', 'financing'].map((type, index) => {
                  const total = getActivityTotal(type as 'operating' | 'investing' | 'financing');
                  const allTotals = [
                    getActivityTotal('operating'),
                    getActivityTotal('investing'),
                    getActivityTotal('financing')
                  ];
                  const maxAbsValue = Math.max(...allTotals.map(Math.abs));
                  const height = Math.abs((total / maxAbsValue) * 100);
                  const colors = ['#3b82f6', '#8b5cf6', '#10b981'];
                  
                  return (
                    <div key={index} className="cf-chart-bar-group">
                      <div className="cf-chart-wrapper">
                        <div
                          className={`cf-chart-bar ${total >= 0 ? 'positive' : 'negative'}`}
                          style={{ 
                            height: `${height}%`,
                            background: colors[index]
                          }}
                        >
                          <span className="cf-chart-value">{formatCurrency(total)}</span>
                        </div>
                      </div>
                      <div className="cf-chart-label">
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountsReports;
