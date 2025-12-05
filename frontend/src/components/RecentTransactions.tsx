import React from 'react';
import { DollarSign, ArrowUpRight, ArrowDownRight, MoreVertical } from 'lucide-react';

interface Transaction {
  id: string;
  type: 'income' | 'expense';
  description: string;
  amount: number;
  date: string;
  category: string;
  status: 'completed' | 'pending' | 'failed';
}

const RecentTransactions: React.FC = () => {
  const transactions: Transaction[] = [
    {
      id: 'TXN001',
      type: 'income',
      description: 'Payment received from ABC Corp',
      amount: 45000,
      date: '2 hours ago',
      category: 'Invoice Payment',
      status: 'completed'
    },
    {
      id: 'TXN002',
      type: 'expense',
      description: 'Software subscription renewal',
      amount: 5999,
      date: '5 hours ago',
      category: 'Subscription',
      status: 'completed'
    },
    {
      id: 'TXN003',
      type: 'income',
      description: 'Project milestone payment',
      amount: 75000,
      date: 'Yesterday',
      category: 'Project',
      status: 'pending'
    },
    {
      id: 'TXN004',
      type: 'expense',
      description: 'Office supplies purchase',
      amount: 3500,
      date: '2 days ago',
      category: 'Supplies',
      status: 'completed'
    },
    {
      id: 'TXN005',
      type: 'income',
      description: 'Consulting service fee',
      amount: 25000,
      date: '3 days ago',
      category: 'Service',
      status: 'completed'
    }
  ];

  return (
    <div className="transactions-panel">
      <div className="panel-header">
        <div className="panel-header-left">
          <DollarSign size={20} />
          <h2 className="panel-title">Recent Transactions</h2>
        </div>
        <button className="view-all-btn">View All</button>
      </div>
      
      <div className="transactions-list">
        {transactions.map((transaction) => (
          <div key={transaction.id} className="transaction-item">
            <div className={`transaction-icon ${transaction.type}`}>
              {transaction.type === 'income' ? (
                <ArrowDownRight size={20} />
              ) : (
                <ArrowUpRight size={20} />
              )}
            </div>
            
            <div className="transaction-details">
              <div className="transaction-header">
                <span className="transaction-desc">{transaction.description}</span>
                <span className={`transaction-amount ${transaction.type}`}>
                  {transaction.type === 'income' ? '+' : '-'}₹{transaction.amount.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="transaction-meta">
                <span className="transaction-category">{transaction.category}</span>
                <span className="transaction-date">{transaction.date}</span>
                <span className={`transaction-status status-${transaction.status}`}>
                  {transaction.status}
                </span>
              </div>
            </div>
            
            <button className="transaction-menu">
              <MoreVertical size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentTransactions;
