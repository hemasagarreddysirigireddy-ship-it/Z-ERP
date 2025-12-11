import React, { useState } from 'react';
import { 
  Wallet, 
  Plus, 
  Search, 
  Download,
  Eye,
  Edit2,
  Trash2,
  DollarSign,
  Calendar,
  FileText,
  TrendingUp,
  TrendingDown,
  Repeat,
  CheckCircle,
  AlertCircle,
  Banknote,
  Calculator
} from 'lucide-react';
import './CashManagement.css';

interface Denomination {
  value: number;
  count: number;
  total: number;
}

interface CashTransaction {
  id: string;
  date: string;
  time: string;
  type: 'deposit' | 'withdrawal' | 'opening' | 'closing';
  amount: number;
  category: string;
  description: string;
  receivedFrom?: string;
  paidTo?: string;
  voucherNumber: string;
  balanceAfter: number;
  denominationBreakup?: Denomination[];
  approvedBy: string;
  status: 'completed' | 'pending' | 'verified';
}

interface PettyCashEntry {
  id: string;
  date: string;
  voucherNumber: string;
  particulars: string;
  expenseHead: string;
  receipts: number;
  payments: number;
  balance: number;
  claimedBy: string;
  approvedBy: string;
  billNumber?: string;
  attachments: string[];
}

const CashManagement: React.FC = () => {
  const [viewMode, setViewMode] = useState<'cash-book' | 'petty-cash' | 'denomination'>('cash-book');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'deposit' | 'withdrawal'>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDenominationModal, setShowDenominationModal] = useState(false);

  // Cash balance state
  const [cashBalance] = useState(125000);
  const [pettyCashBalance] = useState(15000);

  // Denomination breakdown
  const [denominations, setDenominations] = useState<Denomination[]>([
    { value: 2000, count: 20, total: 40000 },
    { value: 500, count: 50, total: 25000 },
    { value: 200, count: 100, total: 20000 },
    { value: 100, count: 150, total: 15000 },
    { value: 50, count: 200, total: 10000 },
    { value: 20, count: 250, total: 5000 },
    { value: 10, count: 500, total: 5000 },
    { value: 5, count: 600, total: 3000 },
    { value: 2, count: 500, total: 1000 },
    { value: 1, count: 1000, total: 1000 }
  ]);

  // Cash transactions
  const [cashTransactions] = useState<CashTransaction[]>([
    {
      id: 'CSH001',
      date: '2023-12-01',
      time: '09:00 AM',
      type: 'opening',
      amount: 100000,
      category: 'Opening Balance',
      description: 'Opening cash balance for the day',
      voucherNumber: 'OB-20231201',
      balanceAfter: 100000,
      approvedBy: 'Manager',
      status: 'verified'
    },
    {
      id: 'CSH002',
      date: '2023-12-01',
      time: '10:30 AM',
      type: 'deposit',
      amount: 50000,
      category: 'Customer Payment',
      description: 'Cash received from customer - Invoice #INV-1234',
      receivedFrom: 'ABC Enterprises',
      voucherNumber: 'RV-20231201-001',
      balanceAfter: 150000,
      approvedBy: 'Rajesh Kumar',
      status: 'completed'
    },
    {
      id: 'CSH003',
      date: '2023-12-01',
      time: '11:45 AM',
      type: 'withdrawal',
      amount: 15000,
      category: 'Supplier Payment',
      description: 'Payment to supplier for raw materials',
      paidTo: 'XYZ Suppliers',
      voucherNumber: 'PV-20231201-001',
      balanceAfter: 135000,
      approvedBy: 'Amit Patel',
      status: 'completed'
    },
    {
      id: 'CSH004',
      date: '2023-12-01',
      time: '02:30 PM',
      type: 'withdrawal',
      amount: 5000,
      category: 'Petty Cash Replenishment',
      description: 'Petty cash fund replenishment',
      paidTo: 'Petty Cash Custodian',
      voucherNumber: 'PV-20231201-002',
      balanceAfter: 130000,
      approvedBy: 'Finance Manager',
      status: 'completed'
    },
    {
      id: 'CSH005',
      date: '2023-12-01',
      time: '04:15 PM',
      type: 'deposit',
      amount: 25000,
      category: 'Cash Sales',
      description: 'Daily cash sales collection',
      receivedFrom: 'Sales Counter',
      voucherNumber: 'RV-20231201-002',
      balanceAfter: 155000,
      approvedBy: 'Sales Manager',
      status: 'completed'
    },
    {
      id: 'CSH006',
      date: '2023-12-01',
      time: '05:00 PM',
      type: 'withdrawal',
      amount: 30000,
      category: 'Bank Deposit',
      description: 'Cash deposited to bank account',
      paidTo: 'HDFC Bank - Acc #12345',
      voucherNumber: 'PV-20231201-003',
      balanceAfter: 125000,
      approvedBy: 'Cashier',
      status: 'verified'
    }
  ]);

  // Petty cash entries
  const [pettyCashEntries] = useState<PettyCashEntry[]>([
    {
      id: 'PC001',
      date: '2023-12-01',
      voucherNumber: 'PC-20231201-001',
      particulars: 'Opening balance',
      expenseHead: 'Opening Balance',
      receipts: 10000,
      payments: 0,
      balance: 10000,
      claimedBy: '-',
      approvedBy: 'Manager',
      attachments: []
    },
    {
      id: 'PC002',
      date: '2023-12-01',
      voucherNumber: 'PC-20231201-002',
      particulars: 'Office stationery purchase',
      expenseHead: 'Office Supplies',
      receipts: 0,
      payments: 850,
      balance: 9150,
      claimedBy: 'Priya Sharma',
      approvedBy: 'Rajesh Kumar',
      billNumber: 'BILL-4567',
      attachments: ['receipt-4567.pdf']
    },
    {
      id: 'PC003',
      date: '2023-12-01',
      voucherNumber: 'PC-20231201-003',
      particulars: 'Courier charges',
      expenseHead: 'Postage & Courier',
      receipts: 0,
      payments: 320,
      balance: 8830,
      claimedBy: 'Neha Singh',
      approvedBy: 'Rajesh Kumar',
      billNumber: 'BILL-9876',
      attachments: ['courier-receipt.pdf']
    },
    {
      id: 'PC004',
      date: '2023-12-01',
      voucherNumber: 'PC-20231201-004',
      particulars: 'Tea/Coffee supplies',
      expenseHead: 'Refreshments',
      receipts: 0,
      payments: 450,
      balance: 8380,
      claimedBy: 'Office Boy',
      approvedBy: 'Admin',
      billNumber: 'BILL-3421',
      attachments: ['grocery-bill.pdf']
    },
    {
      id: 'PC005',
      date: '2023-12-01',
      voucherNumber: 'PC-20231201-005',
      particulars: 'Taxi fare for client meeting',
      expenseHead: 'Conveyance',
      receipts: 0,
      payments: 580,
      balance: 7800,
      claimedBy: 'Rohit Sharma',
      approvedBy: 'Sales Manager',
      billNumber: 'TAXI-8901',
      attachments: ['taxi-receipt.pdf']
    },
    {
      id: 'PC006',
      date: '2023-12-01',
      voucherNumber: 'PC-20231201-006',
      particulars: 'Replenishment from main cash',
      expenseHead: 'Cash Replenishment',
      receipts: 5000,
      payments: 0,
      balance: 12800,
      claimedBy: '-',
      approvedBy: 'Finance Manager',
      attachments: []
    },
    {
      id: 'PC007',
      date: '2023-12-01',
      voucherNumber: 'PC-20231201-007',
      particulars: 'Printing and photocopying',
      expenseHead: 'Office Supplies',
      receipts: 0,
      payments: 275,
      balance: 12525,
      claimedBy: 'Anjali Desai',
      approvedBy: 'Manager',
      billNumber: 'BILL-5555',
      attachments: ['print-receipt.pdf']
    },
    {
      id: 'PC008',
      date: '2023-12-01',
      voucherNumber: 'PC-20231201-008',
      particulars: 'Mobile recharge',
      expenseHead: 'Communication',
      receipts: 0,
      payments: 499,
      balance: 12026,
      claimedBy: 'IT Department',
      approvedBy: 'IT Manager',
      attachments: ['recharge-receipt.pdf']
    }
  ]);

  const handleDenominationChange = (value: number, count: number) => {
    setDenominations(prev => prev.map(d => 
      d.value === value ? { ...d, count, total: value * count } : d
    ));
  };

  const totalCashInDenominations = denominations.reduce((sum, d) => sum + d.total, 0);

  const filteredCashTransactions = cashTransactions.filter(txn => {
    const matchesSearch = 
      txn.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      txn.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      txn.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = filterType === 'all' || txn.type === filterType;

    return matchesSearch && matchesType;
  });

  const filteredPettyCash = pettyCashEntries.filter(entry => {
    return entry.particulars.toLowerCase().includes(searchQuery.toLowerCase()) ||
           entry.expenseHead.toLowerCase().includes(searchQuery.toLowerCase()) ||
           entry.claimedBy.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="cash-management-container">
      {/* Header */}
      <div className="cash-header">
        <div className="cash-header-left">
          <div className="cash-icon-main">
            <Wallet size={28} />
          </div>
          <div>
            <h1>Cash Management</h1>
            <p>Manage cash & petty cash transactions</p>
          </div>
        </div>
        <div className="cash-header-actions">
          <button 
            className="btn-primary"
            onClick={() => setShowAddModal(true)}
          >
            <Plus size={18} />
            Add Transaction
          </button>
          <button className="btn-secondary">
            <Download size={18} />
            Export Report
          </button>
        </div>
      </div>

      {/* Balance Cards */}
      <div className="balance-cards">
        <div className="balance-card main-cash">
          <div className="balance-icon">
            <Banknote size={32} />
          </div>
          <div className="balance-details">
            <h3>Main Cash Balance</h3>
            <p className="balance-amount">₹ {cashBalance.toLocaleString()}</p>
            <span className="balance-status">As of today</span>
          </div>
        </div>
        <div className="balance-card petty-cash">
          <div className="balance-icon">
            <Wallet size={32} />
          </div>
          <div className="balance-details">
            <h3>Petty Cash Balance</h3>
            <p className="balance-amount">₹ {pettyCashBalance.toLocaleString()}</p>
            <span className="balance-status">Last updated 1 hour ago</span>
          </div>
        </div>
        <div className="balance-card total-cash">
          <div className="balance-icon">
            <Calculator size={32} />
          </div>
          <div className="balance-details">
            <h3>Total Cash on Hand</h3>
            <p className="balance-amount">
              ₹ {(cashBalance + pettyCashBalance).toLocaleString()}
            </p>
            <span className="balance-status">Combined balance</span>
          </div>
        </div>
      </div>

      {/* View Mode Toggle */}
      <div className="view-mode-toggle">
        <button 
          className={viewMode === 'cash-book' ? 'active' : ''}
          onClick={() => setViewMode('cash-book')}
        >
          <FileText size={18} />
          Cash Book
        </button>
        <button 
          className={viewMode === 'petty-cash' ? 'active' : ''}
          onClick={() => setViewMode('petty-cash')}
        >
          <Wallet size={18} />
          Petty Cash Book
        </button>
        <button 
          className={viewMode === 'denomination' ? 'active' : ''}
          onClick={() => setViewMode('denomination')}
        >
          <Banknote size={18} />
          Denomination Count
        </button>
      </div>

      {/* Filters */}
      <div className="cash-filters">
        <div className="search-box">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        {viewMode === 'cash-book' && (
          <select 
            value={filterType} 
            onChange={(e) => setFilterType(e.target.value as any)}
            className="filter-select"
          >
            <option value="all">All Transactions</option>
            <option value="deposit">Deposits</option>
            <option value="withdrawal">Withdrawals</option>
          </select>
        )}
      </div>

      {/* Cash Book View */}
      {viewMode === 'cash-book' && (
        <div className="cash-book-table-container">
          <table className="cash-book-table">
            <thead>
              <tr>
                <th>Date & Time</th>
                <th>Voucher No.</th>
                <th>Particulars</th>
                <th>Category</th>
                <th>Received From / Paid To</th>
                <th>Receipts</th>
                <th>Payments</th>
                <th>Balance</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCashTransactions.map(txn => (
                <tr key={txn.id}>
                  <td>
                    <div className="date-cell">
                      <span className="date">{txn.date}</span>
                      <span className="time">{txn.time}</span>
                    </div>
                  </td>
                  <td>
                    <span className="voucher-number">{txn.voucherNumber}</span>
                  </td>
                  <td>
                    <div className="particulars-cell">
                      <strong>{txn.description}</strong>
                    </div>
                  </td>
                  <td>
                    <span className="category-badge">{txn.category}</span>
                  </td>
                  <td>{txn.receivedFrom || txn.paidTo || '-'}</td>
                  <td>
                    {(txn.type === 'deposit' || txn.type === 'opening') && (
                      <span className="amount-receipt">
                        ₹ {txn.amount.toLocaleString()}
                      </span>
                    )}
                  </td>
                  <td>
                    {(txn.type === 'withdrawal' || txn.type === 'closing') && (
                      <span className="amount-payment">
                        ₹ {txn.amount.toLocaleString()}
                      </span>
                    )}
                  </td>
                  <td>
                    <strong className="balance-amount">
                      ₹ {txn.balanceAfter.toLocaleString()}
                    </strong>
                  </td>
                  <td>
                    <span className={`status-badge status-${txn.status}`}>
                      {txn.status}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button className="btn-icon" title="View">
                        <Eye size={16} />
                      </button>
                      <button className="btn-icon" title="Edit">
                        <Edit2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="total-row">
                <td colSpan={5}><strong>Total</strong></td>
                <td>
                  <strong className="amount-receipt">
                    ₹ {cashTransactions
                      .filter(t => t.type === 'deposit' || t.type === 'opening')
                      .reduce((sum, t) => sum + t.amount, 0)
                      .toLocaleString()}
                  </strong>
                </td>
                <td>
                  <strong className="amount-payment">
                    ₹ {cashTransactions
                      .filter(t => t.type === 'withdrawal' || t.type === 'closing')
                      .reduce((sum, t) => sum + t.amount, 0)
                      .toLocaleString()}
                  </strong>
                </td>
                <td colSpan={3}>
                  <strong className="balance-amount">
                    ₹ {cashBalance.toLocaleString()}
                  </strong>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}

      {/* Petty Cash Book View */}
      {viewMode === 'petty-cash' && (
        <div className="petty-cash-table-container">
          <table className="petty-cash-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Voucher No.</th>
                <th>Particulars</th>
                <th>Expense Head</th>
                <th>Bill No.</th>
                <th>Claimed By</th>
                <th>Receipts</th>
                <th>Payments</th>
                <th>Balance</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPettyCash.map(entry => (
                <tr key={entry.id}>
                  <td>{entry.date}</td>
                  <td>
                    <span className="voucher-number">{entry.voucherNumber}</span>
                  </td>
                  <td>
                    <div className="particulars-cell">
                      <strong>{entry.particulars}</strong>
                    </div>
                  </td>
                  <td>
                    <span className="expense-head-badge">{entry.expenseHead}</span>
                  </td>
                  <td>{entry.billNumber || '-'}</td>
                  <td>{entry.claimedBy}</td>
                  <td>
                    {entry.receipts > 0 && (
                      <span className="amount-receipt">
                        ₹ {entry.receipts.toLocaleString()}
                      </span>
                    )}
                  </td>
                  <td>
                    {entry.payments > 0 && (
                      <span className="amount-payment">
                        ₹ {entry.payments.toLocaleString()}
                      </span>
                    )}
                  </td>
                  <td>
                    <strong className="balance-amount">
                      ₹ {entry.balance.toLocaleString()}
                    </strong>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button className="btn-icon" title="View">
                        <Eye size={16} />
                      </button>
                      {entry.attachments.length > 0 && (
                        <button className="btn-icon" title="Attachments">
                          <FileText size={16} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="total-row">
                <td colSpan={6}><strong>Total</strong></td>
                <td>
                  <strong className="amount-receipt">
                    ₹ {pettyCashEntries
                      .reduce((sum, e) => sum + e.receipts, 0)
                      .toLocaleString()}
                  </strong>
                </td>
                <td>
                  <strong className="amount-payment">
                    ₹ {pettyCashEntries
                      .reduce((sum, e) => sum + e.payments, 0)
                      .toLocaleString()}
                  </strong>
                </td>
                <td colSpan={2}>
                  <strong className="balance-amount">
                    ₹ {pettyCashBalance.toLocaleString()}
                  </strong>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}

      {/* Denomination Count View */}
      {viewMode === 'denomination' && (
        <div className="denomination-container">
          <div className="denomination-header">
            <h2>Cash Denomination Count</h2>
            <button 
              className="btn-primary"
              onClick={() => setShowDenominationModal(true)}
            >
              <CheckCircle size={18} />
              Reconcile Cash
            </button>
          </div>

          <div className="denomination-table">
            <table>
              <thead>
                <tr>
                  <th>Denomination</th>
                  <th>Count</th>
                  <th>Total Amount</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {denominations.map(denom => (
                  <tr key={denom.value}>
                    <td>
                      <div className="denomination-value">
                        <Banknote size={20} />
                        <strong>₹ {denom.value}</strong>
                      </div>
                    </td>
                    <td>
                      <input
                        type="number"
                        value={denom.count}
                        onChange={(e) => handleDenominationChange(denom.value, parseInt(e.target.value) || 0)}
                        className="count-input"
                        min="0"
                      />
                    </td>
                    <td>
                      <strong className="total-amount">
                        ₹ {denom.total.toLocaleString()}
                      </strong>
                    </td>
                    <td>
                      <button className="btn-icon" title="Reset">
                        <Repeat size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="total-row">
                  <td colSpan={2}><strong>Total Cash Counted</strong></td>
                  <td colSpan={2}>
                    <strong className="grand-total">
                      ₹ {totalCashInDenominations.toLocaleString()}
                    </strong>
                  </td>
                </tr>
                <tr className="variance-row">
                  <td colSpan={2}><strong>Expected Balance</strong></td>
                  <td colSpan={2}>
                    <strong>₹ {cashBalance.toLocaleString()}</strong>
                  </td>
                </tr>
                <tr className={totalCashInDenominations === cashBalance ? 'match-row' : 'mismatch-row'}>
                  <td colSpan={2}>
                    <strong>Variance</strong>
                  </td>
                  <td colSpan={2}>
                    <strong>
                      {totalCashInDenominations === cashBalance ? (
                        <span className="match-text">
                          <CheckCircle size={18} />
                          Balanced
                        </span>
                      ) : (
                        <span className="mismatch-text">
                          <AlertCircle size={18} />
                          ₹ {Math.abs(totalCashInDenominations - cashBalance).toLocaleString()}
                          {totalCashInDenominations > cashBalance ? ' Excess' : ' Short'}
                        </span>
                      )}
                    </strong>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          <div className="denomination-summary">
            <div className="summary-card">
              <h3>Cash Counting Summary</h3>
              <div className="summary-details">
                <div className="summary-item">
                  <span>Total Notes/Coins:</span>
                  <strong>{denominations.reduce((sum, d) => sum + d.count, 0)}</strong>
                </div>
                <div className="summary-item">
                  <span>Total Amount:</span>
                  <strong>₹ {totalCashInDenominations.toLocaleString()}</strong>
                </div>
                <div className="summary-item">
                  <span>Expected Balance:</span>
                  <strong>₹ {cashBalance.toLocaleString()}</strong>
                </div>
                <div className="summary-item">
                  <span>Status:</span>
                  <strong>
                    {totalCashInDenominations === cashBalance ? 
                      <span className="status-match">✓ Balanced</span> :
                      <span className="status-mismatch">⚠ Variance Found</span>
                    }
                  </strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CashManagement;
