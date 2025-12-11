import React, { useState } from 'react';
import { 
  Globe, 
  Plus, 
  TrendingUp, 
  TrendingDown,
  RefreshCw,
  Calculator,
  DollarSign,
  ArrowRightLeft,
  BarChart3
} from 'lucide-react';
import './MultiCurrency.css';

interface Currency {
  code: string;
  name: string;
  symbol: string;
  flag: string;
}

interface ExchangeRate {
  id: string;
  fromCurrency: string;
  toCurrency: string;
  rate: number;
  previousRate: number;
  change: number;
  lastUpdated: string;
}

interface ForexAccount {
  id: string;
  accountName: string;
  currency: string;
  balance: number;
  balanceInBaseCurrency: number;
  accountNumber: string;
  bank: string;
  status: 'Active' | 'Inactive';
}

interface ForexTransaction {
  id: string;
  date: string;
  fromCurrency: string;
  toCurrency: string;
  fromAmount: number;
  toAmount: number;
  exchangeRate: number;
  gainLoss: number;
  type: 'Gain' | 'Loss';
}

const MultiCurrency: React.FC = () => {
  const [activeView, setActiveView] = useState<'accounts' | 'rates' | 'converter' | 'transactions'>('accounts');
  const [showAddAccount, setShowAddAccount] = useState(false);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('INR');
  const [amount, setAmount] = useState<number>(1000);

  const baseCurrency = 'INR';

  const currencies: Currency[] = [
    { code: 'USD', name: 'US Dollar', symbol: '$', flag: '🇺🇸' },
    { code: 'EUR', name: 'Euro', symbol: '€', flag: '🇪🇺' },
    { code: 'GBP', name: 'British Pound', symbol: '£', flag: '🇬🇧' },
    { code: 'JPY', name: 'Japanese Yen', symbol: '¥', flag: '🇯🇵' },
    { code: 'INR', name: 'Indian Rupee', symbol: '₹', flag: '🇮🇳' },
    { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', flag: '🇦🇺' },
    { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', flag: '🇨🇦' },
    { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF', flag: '🇨🇭' }
  ];

  const [exchangeRates] = useState<ExchangeRate[]>([
    {
      id: '1',
      fromCurrency: 'USD',
      toCurrency: 'INR',
      rate: 83.25,
      previousRate: 83.10,
      change: 0.18,
      lastUpdated: '2023-12-01 10:30:00'
    },
    {
      id: '2',
      fromCurrency: 'EUR',
      toCurrency: 'INR',
      rate: 90.45,
      previousRate: 90.60,
      change: -0.17,
      lastUpdated: '2023-12-01 10:30:00'
    },
    {
      id: '3',
      fromCurrency: 'GBP',
      toCurrency: 'INR',
      rate: 105.30,
      previousRate: 105.10,
      change: 0.19,
      lastUpdated: '2023-12-01 10:30:00'
    },
    {
      id: '4',
      fromCurrency: 'JPY',
      toCurrency: 'INR',
      rate: 0.58,
      previousRate: 0.57,
      change: 1.75,
      lastUpdated: '2023-12-01 10:30:00'
    }
  ]);

  const [forexAccounts] = useState<ForexAccount[]>([
    {
      id: 'FA001',
      accountName: 'USD Operating Account',
      currency: 'USD',
      balance: 50000,
      balanceInBaseCurrency: 4162500,
      accountNumber: 'US1234567890',
      bank: 'HSBC Bank',
      status: 'Active'
    },
    {
      id: 'FA002',
      accountName: 'EUR Business Account',
      currency: 'EUR',
      balance: 35000,
      balanceInBaseCurrency: 3165750,
      accountNumber: 'EU9876543210',
      bank: 'Deutsche Bank',
      status: 'Active'
    },
    {
      id: 'FA003',
      accountName: 'GBP Trading Account',
      currency: 'GBP',
      balance: 25000,
      balanceInBaseCurrency: 2632500,
      accountNumber: 'GB5555666677',
      bank: 'Barclays Bank',
      status: 'Active'
    }
  ]);

  const [forexTransactions] = useState<ForexTransaction[]>([
    {
      id: 'FX001',
      date: '2023-12-01',
      fromCurrency: 'USD',
      toCurrency: 'INR',
      fromAmount: 10000,
      toAmount: 832500,
      exchangeRate: 83.25,
      gainLoss: 1500,
      type: 'Gain'
    },
    {
      id: 'FX002',
      date: '2023-11-30',
      fromCurrency: 'EUR',
      toCurrency: 'INR',
      fromAmount: 8000,
      toAmount: 723600,
      exchangeRate: 90.45,
      gainLoss: -800,
      type: 'Loss'
    },
    {
      id: 'FX003',
      date: '2023-11-29',
      fromCurrency: 'GBP',
      toCurrency: 'INR',
      fromAmount: 5000,
      toAmount: 526500,
      exchangeRate: 105.30,
      gainLoss: 950,
      type: 'Gain'
    }
  ]);

  const totalForexBalance = forexAccounts.reduce((sum, acc) => sum + acc.balanceInBaseCurrency, 0);
  const totalGainLoss = forexTransactions.reduce((sum, txn) => sum + txn.gainLoss, 0);

  const getCurrentRate = (from: string, to: string): number => {
    const rate = exchangeRates.find(r => r.fromCurrency === from && r.toCurrency === to);
    return rate ? rate.rate : 1;
  };

  const convertCurrency = (): number => {
    const rate = getCurrentRate(fromCurrency, toCurrency);
    return amount * rate;
  };

  return (
    <div className="multi-currency-container">
      {/* Header */}
      <div className="currency-header">
        <div className="currency-header-left">
          <div className="currency-icon-main">
            <Globe size={28} />
          </div>
          <div>
            <h1>Multi-Currency Management</h1>
            <p>Manage forex accounts, track exchange rates, and handle currency conversions</p>
          </div>
        </div>
        <div className="currency-header-actions">
          <button className="btn-refresh">
            <RefreshCw size={18} />
            Refresh Rates
          </button>
          <button className="btn-primary" onClick={() => setShowAddAccount(true)}>
            <Plus size={18} />
            Add Forex Account
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="currency-summary">
        <div className="summary-card">
          <div className="summary-icon">
            <DollarSign size={24} />
          </div>
          <div className="summary-content">
            <span className="summary-label">Total Forex Balance</span>
            <span className="summary-value">₹ {totalForexBalance.toLocaleString()}</span>
          </div>
        </div>
        <div className="summary-card">
          <div className="summary-icon gain">
            <TrendingUp size={24} />
          </div>
          <div className="summary-content">
            <span className="summary-label">Total Gain/Loss</span>
            <span className={`summary-value ${totalGainLoss >= 0 ? 'gain' : 'loss'}`}>
              ₹ {Math.abs(totalGainLoss).toLocaleString()}
              {totalGainLoss >= 0 ? ' ↑' : ' ↓'}
            </span>
          </div>
        </div>
        <div className="summary-card">
          <div className="summary-icon">
            <Globe size={24} />
          </div>
          <div className="summary-content">
            <span className="summary-label">Active Currencies</span>
            <span className="summary-value">{forexAccounts.length}</span>
          </div>
        </div>
        <div className="summary-card">
          <div className="summary-icon">
            <ArrowRightLeft size={24} />
          </div>
          <div className="summary-content">
            <span className="summary-label">Forex Transactions</span>
            <span className="summary-value">{forexTransactions.length}</span>
          </div>
        </div>
      </div>

      {/* View Selector */}
      <div className="view-selector">
        <button 
          className={activeView === 'accounts' ? 'active' : ''}
          onClick={() => setActiveView('accounts')}
        >
          <DollarSign size={18} />
          Forex Accounts
        </button>
        <button 
          className={activeView === 'rates' ? 'active' : ''}
          onClick={() => setActiveView('rates')}
        >
          <BarChart3 size={18} />
          Exchange Rates
        </button>
        <button 
          className={activeView === 'converter' ? 'active' : ''}
          onClick={() => setActiveView('converter')}
        >
          <Calculator size={18} />
          Currency Converter
        </button>
        <button 
          className={activeView === 'transactions' ? 'active' : ''}
          onClick={() => setActiveView('transactions')}
        >
          <ArrowRightLeft size={18} />
          Forex Transactions
        </button>
      </div>

      {/* Forex Accounts View */}
      {activeView === 'accounts' && (
        <div className="forex-accounts">
          {forexAccounts.map(account => (
            <div key={account.id} className="forex-account-card">
              <div className="account-header">
                <div className="account-currency">
                  <span className="currency-flag">
                    {currencies.find(c => c.code === account.currency)?.flag}
                  </span>
                  <div>
                    <strong>{account.accountName}</strong>
                    <span className="account-number">{account.accountNumber}</span>
                  </div>
                </div>
                <span className={`status-badge ${account.status.toLowerCase()}`}>
                  {account.status}
                </span>
              </div>
              <div className="account-details">
                <div className="detail-item">
                  <span>Bank:</span>
                  <strong>{account.bank}</strong>
                </div>
                <div className="detail-item">
                  <span>Currency:</span>
                  <strong>{account.currency}</strong>
                </div>
              </div>
              <div className="account-balances">
                <div className="balance-item">
                  <span>Balance ({account.currency}):</span>
                  <strong>
                    {currencies.find(c => c.code === account.currency)?.symbol} {account.balance.toLocaleString()}
                  </strong>
                </div>
                <div className="balance-item base">
                  <span>Balance ({baseCurrency}):</span>
                  <strong>₹ {account.balanceInBaseCurrency.toLocaleString()}</strong>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Exchange Rates View */}
      {activeView === 'rates' && (
        <div className="exchange-rates">
          <table className="rates-table">
            <thead>
              <tr>
                <th>Currency Pair</th>
                <th>Current Rate</th>
                <th>Previous Rate</th>
                <th>Change</th>
                <th>Last Updated</th>
              </tr>
            </thead>
            <tbody>
              {exchangeRates.map(rate => (
                <tr key={rate.id}>
                  <td>
                    <div className="currency-pair">
                      <span className="pair-currencies">
                        {currencies.find(c => c.code === rate.fromCurrency)?.flag}
                        {' → '}
                        {currencies.find(c => c.code === rate.toCurrency)?.flag}
                      </span>
                      <strong>{rate.fromCurrency}/{rate.toCurrency}</strong>
                    </div>
                  </td>
                  <td>
                    <strong className="current-rate">{rate.rate.toFixed(4)}</strong>
                  </td>
                  <td>{rate.previousRate.toFixed(4)}</td>
                  <td>
                    <span className={`change-badge ${rate.change >= 0 ? 'positive' : 'negative'}`}>
                      {rate.change >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                      {Math.abs(rate.change).toFixed(2)}%
                    </span>
                  </td>
                  <td>{new Date(rate.lastUpdated).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Currency Converter View */}
      {activeView === 'converter' && (
        <div className="currency-converter">
          <div className="converter-card">
            <h2>
              <Calculator size={24} />
              Currency Converter
            </h2>
            <div className="converter-form">
              <div className="converter-row">
                <div className="converter-field">
                  <label>From Currency</label>
                  <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
                    {currencies.map(curr => (
                      <option key={curr.code} value={curr.code}>
                        {curr.flag} {curr.code} - {curr.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="converter-field">
                  <label>Amount</label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                    placeholder="Enter amount"
                  />
                </div>
              </div>

              <div className="converter-swap">
                <button 
                  className="btn-swap"
                  onClick={() => {
                    const temp = fromCurrency;
                    setFromCurrency(toCurrency);
                    setToCurrency(temp);
                  }}
                >
                  <ArrowRightLeft size={20} />
                </button>
              </div>

              <div className="converter-row">
                <div className="converter-field">
                  <label>To Currency</label>
                  <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
                    {currencies.map(curr => (
                      <option key={curr.code} value={curr.code}>
                        {curr.flag} {curr.code} - {curr.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="converter-field">
                  <label>Converted Amount</label>
                  <div className="converted-amount">
                    {currencies.find(c => c.code === toCurrency)?.symbol} {convertCurrency().toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                  </div>
                </div>
              </div>

              <div className="exchange-rate-info">
                <span>Exchange Rate:</span>
                <strong>1 {fromCurrency} = {getCurrentRate(fromCurrency, toCurrency).toFixed(4)} {toCurrency}</strong>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Forex Transactions View */}
      {activeView === 'transactions' && (
        <div className="forex-transactions">
          <table className="transactions-table">
            <thead>
              <tr>
                <th>Transaction ID</th>
                <th>Date</th>
                <th>From</th>
                <th>To</th>
                <th>Exchange Rate</th>
                <th>Gain/Loss</th>
              </tr>
            </thead>
            <tbody>
              {forexTransactions.map(txn => (
                <tr key={txn.id}>
                  <td><strong>{txn.id}</strong></td>
                  <td>{new Date(txn.date).toLocaleDateString()}</td>
                  <td>
                    <div className="txn-amount">
                      <span>{currencies.find(c => c.code === txn.fromCurrency)?.flag}</span>
                      <strong>{txn.fromCurrency} {txn.fromAmount.toLocaleString()}</strong>
                    </div>
                  </td>
                  <td>
                    <div className="txn-amount">
                      <span>{currencies.find(c => c.code === txn.toCurrency)?.flag}</span>
                      <strong>{txn.toCurrency} {txn.toAmount.toLocaleString()}</strong>
                    </div>
                  </td>
                  <td>{txn.exchangeRate.toFixed(4)}</td>
                  <td>
                    <span className={`gain-loss-badge ${txn.type.toLowerCase()}`}>
                      {txn.type === 'Gain' ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                      ₹ {Math.abs(txn.gainLoss).toLocaleString()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add Account Modal */}
      {showAddAccount && (
        <div className="modal-overlay" onClick={() => setShowAddAccount(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Add Forex Account</h2>
              <button className="btn-close" onClick={() => setShowAddAccount(false)}>×</button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Account Name</label>
                <input type="text" placeholder="Enter account name" />
              </div>
              <div className="form-group">
                <label>Currency</label>
                <select>
                  {currencies.map(curr => (
                    <option key={curr.code} value={curr.code}>
                      {curr.flag} {curr.code} - {curr.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Bank Name</label>
                <input type="text" placeholder="Enter bank name" />
              </div>
              <div className="form-group">
                <label>Account Number</label>
                <input type="text" placeholder="Enter account number" />
              </div>
              <div className="form-group">
                <label>Opening Balance</label>
                <input type="number" placeholder="Enter opening balance" />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setShowAddAccount(false)}>Cancel</button>
              <button className="btn-primary">Add Account</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiCurrency;
