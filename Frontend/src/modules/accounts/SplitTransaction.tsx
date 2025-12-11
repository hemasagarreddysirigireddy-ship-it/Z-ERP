import React, { useState } from 'react';
import { 
  Split, 
  Plus, 
  Trash2,
  Save,
  X,
  DollarSign,
  Tag,
  Briefcase,
  Building
} from 'lucide-react';
import './SplitTransaction.css';

interface SplitLine {
  id: string;
  category: string;
  project?: string;
  department?: string;
  amount: number;
  percentage: number;
  description: string;
}

interface Transaction {
  id: string;
  date: string;
  description: string;
  totalAmount: number;
  vendor: string;
}

const SplitTransaction: React.FC = () => {
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [splitLines, setSplitLines] = useState<SplitLine[]>([
    {
      id: 'split1',
      category: '',
      project: '',
      department: '',
      amount: 0,
      percentage: 0,
      description: ''
    }
  ]);

  const [transactions] = useState<Transaction[]>([
    {
      id: 'TXN001',
      date: '2023-12-01',
      description: 'Office supplies and equipment purchase',
      totalAmount: 50000,
      vendor: 'ABC Office Mart'
    },
    {
      id: 'TXN002',
      date: '2023-12-01',
      description: 'Mixed utility bills payment',
      totalAmount: 25000,
      vendor: 'Utility Services'
    },
    {
      id: 'TXN003',
      date: '2023-11-30',
      description: 'Combined marketing and advertising expenses',
      totalAmount: 75000,
      vendor: 'Marketing Solutions Ltd'
    }
  ]);

  const categories = [
    'Office Supplies',
    'Equipment',
    'Marketing',
    'Advertising',
    'Utilities',
    'Rent',
    'Salaries',
    'Travel',
    'Training',
    'Software'
  ];

  const projects = [
    'Project Alpha',
    'Project Beta',
    'Project Gamma',
    'Internal Operations',
    'R&D Initiative'
  ];

  const departments = [
    'Sales',
    'Marketing',
    'IT',
    'HR',
    'Finance',
    'Operations',
    'Admin'
  ];

  const addSplitLine = () => {
    const newLine: SplitLine = {
      id: `split${Date.now()}`,
      category: '',
      project: '',
      department: '',
      amount: 0,
      percentage: 0,
      description: ''
    };
    setSplitLines([...splitLines, newLine]);
  };

  const removeSplitLine = (id: string) => {
    if (splitLines.length > 1) {
      setSplitLines(splitLines.filter(line => line.id !== id));
    }
  };

  const updateSplitLine = (id: string, field: keyof SplitLine, value: any) => {
    setSplitLines(prev => prev.map(line => {
      if (line.id === id) {
        const updated = { ...line, [field]: value };
        
        // If amount changed, calculate percentage
        if (field === 'amount' && selectedTransaction) {
          updated.percentage = (value / selectedTransaction.totalAmount) * 100;
        }
        
        // If percentage changed, calculate amount
        if (field === 'percentage' && selectedTransaction) {
          updated.amount = (value / 100) * selectedTransaction.totalAmount;
        }
        
        return updated;
      }
      return line;
    }));
  };

  const totalSplitAmount = splitLines.reduce((sum, line) => sum + line.amount, 0);
  const totalSplitPercentage = splitLines.reduce((sum, line) => sum + line.percentage, 0);
  const remainingAmount = selectedTransaction ? selectedTransaction.totalAmount - totalSplitAmount : 0;
  const isBalanced = Math.abs(remainingAmount) < 0.01;

  const handleSave = () => {
    if (!isBalanced) {
      alert('Split amounts must equal the transaction total!');
      return;
    }
    console.log('Saving split transaction:', { selectedTransaction, splitLines });
    alert('Split transaction saved successfully!');
    setSelectedTransaction(null);
    setSplitLines([{
      id: 'split1',
      category: '',
      project: '',
      department: '',
      amount: 0,
      percentage: 0,
      description: ''
    }]);
  };

  const distributeEqually = () => {
    if (!selectedTransaction) return;
    
    const equalAmount = selectedTransaction.totalAmount / splitLines.length;
    const equalPercentage = 100 / splitLines.length;
    
    setSplitLines(prev => prev.map(line => ({
      ...line,
      amount: equalAmount,
      percentage: equalPercentage
    })));
  };

  return (
    <div className="split-transaction-container">
      {/* Header */}
      <div className="split-header">
        <div className="split-header-left">
          <div className="split-icon-main">
            <Split size={28} />
          </div>
          <div>
            <h1>Split Transaction</h1>
            <p>Allocate transactions across multiple categories, projects, or departments</p>
          </div>
        </div>
      </div>

      <div className="split-content">
        {/* Transaction Selection */}
        <div className="transaction-selection">
          <h2>Select Transaction to Split</h2>
          <div className="transactions-list">
            {transactions.map(txn => (
              <div 
                key={txn.id}
                className={`transaction-item ${selectedTransaction?.id === txn.id ? 'selected' : ''}`}
                onClick={() => setSelectedTransaction(txn)}
              >
                <div className="txn-info">
                  <strong>{txn.description}</strong>
                  <span className="txn-vendor">{txn.vendor}</span>
                  <span className="txn-date">{new Date(txn.date).toLocaleDateString()}</span>
                </div>
                <div className="txn-amount">
                  ₹ {txn.totalAmount.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Split Form */}
        {selectedTransaction && (
          <div className="split-form">
            <div className="split-form-header">
              <div>
                <h2>Split Details</h2>
                <p className="split-info">
                  Total Amount: <strong>₹ {selectedTransaction.totalAmount.toLocaleString()}</strong>
                </p>
              </div>
              <div className="split-actions">
                <button className="btn-distribute" onClick={distributeEqually}>
                  Distribute Equally
                </button>
                <button className="btn-add-line" onClick={addSplitLine}>
                  <Plus size={18} />
                  Add Line
                </button>
              </div>
            </div>

            <div className="split-lines">
              {splitLines.map((line, index) => (
                <div key={line.id} className="split-line">
                  <div className="split-line-header">
                    <span className="line-number">Line {index + 1}</span>
                    {splitLines.length > 1 && (
                      <button 
                        className="btn-remove"
                        onClick={() => removeSplitLine(line.id)}
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>

                  <div className="split-line-fields">
                    <div className="field-group">
                      <label>
                        <Tag size={16} />
                        Category
                      </label>
                      <select
                        value={line.category}
                        onChange={(e) => updateSplitLine(line.id, 'category', e.target.value)}
                      >
                        <option value="">Select category...</option>
                        {categories.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>

                    <div className="field-group">
                      <label>
                        <Briefcase size={16} />
                        Project (Optional)
                      </label>
                      <select
                        value={line.project || ''}
                        onChange={(e) => updateSplitLine(line.id, 'project', e.target.value)}
                      >
                        <option value="">Select project...</option>
                        {projects.map(proj => (
                          <option key={proj} value={proj}>{proj}</option>
                        ))}
                      </select>
                    </div>

                    <div className="field-group">
                      <label>
                        <Building size={16} />
                        Department (Optional)
                      </label>
                      <select
                        value={line.department || ''}
                        onChange={(e) => updateSplitLine(line.id, 'department', e.target.value)}
                      >
                        <option value="">Select department...</option>
                        {departments.map(dept => (
                          <option key={dept} value={dept}>{dept}</option>
                        ))}
                      </select>
                    </div>

                    <div className="field-group amount-field">
                      <label>
                        <DollarSign size={16} />
                        Amount
                      </label>
                      <input
                        type="number"
                        value={line.amount || ''}
                        onChange={(e) => updateSplitLine(line.id, 'amount', parseFloat(e.target.value) || 0)}
                        placeholder="0.00"
                      />
                    </div>

                    <div className="field-group percentage-field">
                      <label>Percentage</label>
                      <input
                        type="number"
                        value={line.percentage ? line.percentage.toFixed(2) : ''}
                        onChange={(e) => updateSplitLine(line.id, 'percentage', parseFloat(e.target.value) || 0)}
                        placeholder="0.00"
                        step="0.01"
                        max="100"
                      />
                      <span className="percentage-symbol">%</span>
                    </div>

                    <div className="field-group description-field">
                      <label>Description</label>
                      <input
                        type="text"
                        value={line.description}
                        onChange={(e) => updateSplitLine(line.id, 'description', e.target.value)}
                        placeholder="Add description..."
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="split-summary">
              <div className="summary-row">
                <span>Total Transaction Amount:</span>
                <strong>₹ {selectedTransaction.totalAmount.toLocaleString()}</strong>
              </div>
              <div className="summary-row">
                <span>Total Split Amount:</span>
                <strong className={totalSplitAmount > selectedTransaction.totalAmount ? 'over' : ''}>
                  ₹ {totalSplitAmount.toLocaleString()}
                </strong>
              </div>
              <div className="summary-row">
                <span>Total Percentage:</span>
                <strong>{totalSplitPercentage.toFixed(2)}%</strong>
              </div>
              <div className={`summary-row balance ${isBalanced ? 'balanced' : 'unbalanced'}`}>
                <span>Remaining Amount:</span>
                <strong>
                  {isBalanced ? (
                    <span className="balanced-text">✓ Balanced</span>
                  ) : (
                    `₹ ${Math.abs(remainingAmount).toLocaleString()} ${remainingAmount > 0 ? 'remaining' : 'over'}`
                  )}
                </strong>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="split-form-actions">
              <button 
                className="btn-save"
                onClick={handleSave}
                disabled={!isBalanced}
              >
                <Save size={18} />
                Save Split Transaction
              </button>
              <button 
                className="btn-cancel"
                onClick={() => {
                  setSelectedTransaction(null);
                  setSplitLines([{
                    id: 'split1',
                    category: '',
                    project: '',
                    department: '',
                    amount: 0,
                    percentage: 0,
                    description: ''
                  }]);
                }}
              >
                <X size={18} />
                Cancel
              </button>
            </div>
          </div>
        )}

        {!selectedTransaction && (
          <div className="no-selection">
            <Split size={64} />
            <h3>No Transaction Selected</h3>
            <p>Select a transaction from the list above to start splitting</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SplitTransaction;
