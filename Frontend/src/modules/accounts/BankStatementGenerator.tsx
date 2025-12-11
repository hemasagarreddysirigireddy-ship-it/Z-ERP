import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Search, 
  Calendar,
  Filter,
  Settings,
  Printer,
  Mail,
  Eye,
  CheckCircle
} from 'lucide-react';
import './BankStatementGenerator.css';

interface StatementTransaction {
  date: string;
  description: string;
  refNo: string;
  debit: number;
  credit: number;
  balance: number;
}

interface BankAccount {
  id: string;
  accountNumber: string;
  accountName: string;
  bankName: string;
  ifscCode: string;
  branchName: string;
}

const BankStatementGenerator: React.FC = () => {
  const [selectedAccount, setSelectedAccount] = useState('');
  const [dateRange, setDateRange] = useState({ from: '2023-11-01', to: '2023-12-01' });
  const [format, setFormat] = useState<'pdf' | 'excel' | 'csv'>('pdf');
  const [layout, setLayout] = useState<'passbook' | 'statement' | 'detailed'>('passbook');
  const [showPreview, setShowPreview] = useState(false);

  const [accounts] = useState<BankAccount[]>([
    {
      id: 'acc1',
      accountNumber: '12345678901',
      accountName: 'Primary Business Account',
      bankName: 'HDFC Bank',
      ifscCode: 'HDFC0001234',
      branchName: 'Mumbai Main Branch'
    },
    {
      id: 'acc2',
      accountNumber: '98765432109',
      accountName: 'Payroll Account',
      bankName: 'ICICI Bank',
      ifscCode: 'ICIC0002345',
      branchName: 'Delhi Branch'
    },
    {
      id: 'acc3',
      accountNumber: '45678912345',
      accountName: 'Savings Account',
      bankName: 'State Bank of India',
      ifscCode: 'SBIN0003456',
      branchName: 'Bangalore Branch'
    }
  ]);

  const [transactions] = useState<StatementTransaction[]>([
    {
      date: '2023-11-01',
      description: 'Opening Balance',
      refNo: 'OB-001',
      debit: 0,
      credit: 500000,
      balance: 500000
    },
    {
      date: '2023-11-02',
      description: 'Payment to Vendor - ABC Suppliers',
      refNo: 'NEFT-123456',
      debit: 45000,
      credit: 0,
      balance: 455000
    },
    {
      date: '2023-11-03',
      description: 'Customer Payment Received',
      refNo: 'IMPS-789012',
      debit: 0,
      credit: 75000,
      balance: 530000
    },
    {
      date: '2023-11-05',
      description: 'Salary Payment - Nov 2023',
      refNo: 'RTGS-345678',
      debit: 150000,
      credit: 0,
      balance: 380000
    },
    {
      date: '2023-11-07',
      description: 'Bank Charges',
      refNo: 'CHG-001',
      debit: 500,
      credit: 0,
      balance: 379500
    },
    {
      date: '2023-11-10',
      description: 'Cash Deposit',
      refNo: 'CASH-456789',
      debit: 0,
      credit: 50000,
      balance: 429500
    },
    {
      date: '2023-11-12',
      description: 'Cheque Payment - #123456',
      refNo: 'CHQ-123456',
      debit: 25000,
      credit: 0,
      balance: 404500
    },
    {
      date: '2023-11-15',
      description: 'Interest Credited',
      refNo: 'INT-001',
      debit: 0,
      credit: 2450,
      balance: 406950
    },
    {
      date: '2023-11-18',
      description: 'Online Payment - Electricity Bill',
      refNo: 'UPI-567890',
      debit: 3500,
      credit: 0,
      balance: 403450
    },
    {
      date: '2023-11-20',
      description: 'Transfer from Savings',
      refNo: 'IMPS-234567',
      debit: 0,
      credit: 100000,
      balance: 503450
    },
    {
      date: '2023-11-22',
      description: 'Rent Payment',
      refNo: 'NEFT-678901',
      debit: 80000,
      credit: 0,
      balance: 423450
    },
    {
      date: '2023-11-25',
      description: 'Customer Invoice Payment',
      refNo: 'RTGS-890123',
      debit: 0,
      credit: 125000,
      balance: 548450
    },
    {
      date: '2023-11-28',
      description: 'Vendor Payment - XYZ Traders',
      refNo: 'NEFT-901234',
      debit: 35000,
      credit: 0,
      balance: 513450
    },
    {
      date: '2023-11-30',
      description: 'Closing Balance',
      refNo: 'CB-001',
      debit: 0,
      credit: 0,
      balance: 513450
    }
  ]);

  const totalDebit = transactions.reduce((sum, txn) => sum + txn.debit, 0);
  const totalCredit = transactions.reduce((sum, txn) => sum + txn.credit, 0);
  const openingBalance = 500000;
  const closingBalance = 513450;

  const handleGenerate = () => {
    if (!selectedAccount) {
      alert('Please select an account');
      return;
    }
    setShowPreview(true);
  };

  const handleExport = (exportFormat: 'pdf' | 'excel' | 'csv') => {
    console.log(`Exporting as ${exportFormat}...`);
    alert(`Statement exported as ${exportFormat.toUpperCase()} successfully!`);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleEmail = () => {
    alert('Statement sent to registered email address!');
  };

  const selectedAccountDetails = accounts.find(acc => acc.id === selectedAccount);

  return (
    <div className="statement-generator-container">
      {/* Header */}
      <div className="statement-header">
        <div className="statement-header-left">
          <div className="statement-icon-main">
            <FileText size={28} />
          </div>
          <div>
            <h1>Bank Statement Generator</h1>
            <p>Generate and export customized bank statements</p>
          </div>
        </div>
      </div>

      {/* Configuration Panel */}
      <div className="config-panel">
        <div className="config-section">
          <h3>Statement Configuration</h3>
          
          <div className="config-grid">
            <div className="config-field">
              <label>Select Account</label>
              <select 
                value={selectedAccount}
                onChange={(e) => setSelectedAccount(e.target.value)}
                className="config-select"
              >
                <option value="">Choose an account...</option>
                {accounts.map(acc => (
                  <option key={acc.id} value={acc.id}>
                    {acc.accountName} - {acc.accountNumber}
                  </option>
                ))}
              </select>
            </div>

            <div className="config-field">
              <label>From Date</label>
              <div className="date-input-wrapper">
                <Calendar size={18} />
                <input
                  type="date"
                  value={dateRange.from}
                  onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })}
                  className="config-input"
                />
              </div>
            </div>

            <div className="config-field">
              <label>To Date</label>
              <div className="date-input-wrapper">
                <Calendar size={18} />
                <input
                  type="date"
                  value={dateRange.to}
                  onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
                  className="config-input"
                />
              </div>
            </div>

            <div className="config-field">
              <label>Export Format</label>
              <select 
                value={format}
                onChange={(e) => setFormat(e.target.value as any)}
                className="config-select"
              >
                <option value="pdf">PDF</option>
                <option value="excel">Excel</option>
                <option value="csv">CSV</option>
              </select>
            </div>

            <div className="config-field">
              <label>Statement Layout</label>
              <select 
                value={layout}
                onChange={(e) => setLayout(e.target.value as any)}
                className="config-select"
              >
                <option value="passbook">Passbook Style</option>
                <option value="statement">Bank Statement</option>
                <option value="detailed">Detailed Report</option>
              </select>
            </div>
          </div>

          <div className="config-actions">
            <button className="btn-primary" onClick={handleGenerate}>
              <Eye size={18} />
              Preview Statement
            </button>
            <button className="btn-secondary" onClick={() => handleExport(format)}>
              <Download size={18} />
              Generate & Download
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="quick-stats">
          <div className="stat-item">
            <span className="stat-label">Total Transactions</span>
            <span className="stat-value">{transactions.length}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Total Debits</span>
            <span className="stat-value debit">₹ {totalDebit.toLocaleString()}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Total Credits</span>
            <span className="stat-value credit">₹ {totalCredit.toLocaleString()}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Net Balance</span>
            <span className="stat-value balance">
              ₹ {(totalCredit - totalDebit).toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Preview Section */}
      {showPreview && selectedAccountDetails && (
        <div className="statement-preview">
          <div className="preview-header">
            <h2>Statement Preview</h2>
            <div className="preview-actions">
              <button className="btn-icon" onClick={handlePrint}>
                <Printer size={18} />
              </button>
              <button className="btn-icon" onClick={handleEmail}>
                <Mail size={18} />
              </button>
              <button className="btn-icon" onClick={() => handleExport('pdf')}>
                <Download size={18} />
              </button>
            </div>
          </div>

          <div className={`statement-document layout-${layout}`}>
            {/* Bank Statement Header */}
            <div className="document-header">
              <div className="bank-logo">
                <div className="logo-placeholder">
                  {selectedAccountDetails.bankName.charAt(0)}
                </div>
              </div>
              <div className="bank-details">
                <h2>{selectedAccountDetails.bankName}</h2>
                <p>{selectedAccountDetails.branchName}</p>
                <p>IFSC Code: {selectedAccountDetails.ifscCode}</p>
              </div>
              <div className="statement-title">
                <h3>BANK STATEMENT</h3>
                <p>Statement Period</p>
                <p className="period">{dateRange.from} to {dateRange.to}</p>
              </div>
            </div>

            {/* Account Information */}
            <div className="account-info-section">
              <div className="info-row">
                <div className="info-item">
                  <span className="info-label">Account Name:</span>
                  <span className="info-value">{selectedAccountDetails.accountName}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Account Number:</span>
                  <span className="info-value">{selectedAccountDetails.accountNumber}</span>
                </div>
              </div>
              <div className="info-row">
                <div className="info-item">
                  <span className="info-label">Opening Balance:</span>
                  <span className="info-value">₹ {openingBalance.toLocaleString()}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Closing Balance:</span>
                  <span className="info-value">₹ {closingBalance.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Transaction Table */}
            <div className="transaction-table-section">
              <table className="statement-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Description</th>
                    <th>Ref No.</th>
                    <th className="amount-col">Debit (₹)</th>
                    <th className="amount-col">Credit (₹)</th>
                    <th className="amount-col">Balance (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((txn, index) => (
                    <tr key={index} className={txn.description.includes('Opening') || txn.description.includes('Closing') ? 'balance-row' : ''}>
                      <td>{new Date(txn.date).toLocaleDateString('en-IN')}</td>
                      <td className="description-col">{txn.description}</td>
                      <td className="ref-col">{txn.refNo}</td>
                      <td className="amount-col debit">
                        {txn.debit > 0 ? txn.debit.toLocaleString() : '-'}
                      </td>
                      <td className="amount-col credit">
                        {txn.credit > 0 ? txn.credit.toLocaleString() : '-'}
                      </td>
                      <td className="amount-col balance">
                        {txn.balance.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="total-row">
                    <td colSpan={3}><strong>Total</strong></td>
                    <td className="amount-col debit">
                      <strong>{totalDebit.toLocaleString()}</strong>
                    </td>
                    <td className="amount-col credit">
                      <strong>{totalCredit.toLocaleString()}</strong>
                    </td>
                    <td className="amount-col balance">
                      <strong>{closingBalance.toLocaleString()}</strong>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>

            {/* Statement Summary */}
            <div className="statement-summary">
              <div className="summary-grid">
                <div className="summary-item">
                  <span className="summary-label">Total Debits:</span>
                  <span className="summary-value">₹ {totalDebit.toLocaleString()}</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Total Credits:</span>
                  <span className="summary-value">₹ {totalCredit.toLocaleString()}</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Number of Transactions:</span>
                  <span className="summary-value">{transactions.length}</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Net Change:</span>
                  <span className="summary-value">
                    ₹ {(closingBalance - openingBalance).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Statement Footer */}
            <div className="statement-footer">
              <p className="footer-note">
                This is a computer-generated statement and does not require a signature.
              </p>
              <p className="footer-note">
                For any queries, please contact your branch or call our customer care.
              </p>
              <div className="footer-meta">
                <span>Generated on: {new Date().toLocaleString()}</span>
                <span>Page 1 of 1</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* No Preview State */}
      {!showPreview && (
        <div className="no-preview-state">
          <FileText size={64} />
          <h3>No Statement Preview</h3>
          <p>Select an account and date range, then click "Preview Statement" to generate</p>
        </div>
      )}
    </div>
  );
};

export default BankStatementGenerator;
