import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Download, RefreshCw, Eye } from 'lucide-react';

interface Payment {
  id: string;
  paymentNumber: string;
  invoiceNumber: string;
  paymentMode: string;
  transactionId: string;
  customer: string;
  amount: number;
  date: string;
}

const PaymentsList: React.FC = () => {
  const navigate = useNavigate();
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    setLoading(true);
    setTimeout(() => {
      const mockData: Payment[] = [
        {
          id: '1',
          paymentNumber: '5',
          invoiceNumber: 'INV-000006',
          paymentMode: 'Bank',
          transactionId: '',
          customer: 'Jack',
          amount: 1250.00,
          date: '2025-09-15'
        },
        {
          id: '2',
          paymentNumber: '4',
          invoiceNumber: 'INV-000004',
          paymentMode: 'Bank',
          transactionId: '1212',
          customer: 'Greeen Dot',
          amount: 450.00,
          date: '2025-09-04'
        },
        {
          id: '3',
          paymentNumber: '3',
          invoiceNumber: 'INV-000003',
          paymentMode: 'Bank',
          transactionId: '',
          customer: 'Sarmad',
          amount: 1000.00,
          date: '2025-09-01'
        },
        {
          id: '4',
          paymentNumber: '2',
          invoiceNumber: 'INV-000002',
          paymentMode: 'Bank',
          transactionId: '',
          customer: 'Sarmad',
          amount: 10.00,
          date: '2025-09-01'
        },
        {
          id: '5',
          paymentNumber: '1',
          invoiceNumber: 'INV-000001',
          paymentMode: 'Bank',
          transactionId: '',
          customer: 'Sarmad',
          amount: 10.00,
          date: '2025-09-01'
        }
      ];
      setPayments(mockData);
      setLoading(false);
    }, 500);
  };

  const handleView = (id: string) => {
    console.log('View payment:', id);
  };

  const filteredPayments = payments.filter(payment => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        payment.invoiceNumber.toLowerCase().includes(query) ||
        payment.customer.toLowerCase().includes(query) ||
        payment.transactionId.toLowerCase().includes(query)
      );
    }
    return true;
  });

  const totalPages = Math.ceil(filteredPayments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedPayments = filteredPayments.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="page-content">
      <div className="page-header">
        <div className="page-header-left">
          <h2 className="page-title">Payments</h2>
        </div>
        <div className="page-header-right">
          <button className="btn-secondary">
            <Download size={18} />
            Export
          </button>
        </div>
      </div>

      <div className="table-controls">
        <div className="table-controls-left">
          <select 
            className="form-control-sm" 
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
            style={{ width: '80px' }}
          >
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
          <button className="btn-secondary">Export</button>
          <button className="icon-btn" onClick={fetchPayments}>
            <RefreshCw size={18} />
          </button>
        </div>
        <div className="table-controls-right">
          <div className="search-box">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search.."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="table-container">
        {loading ? (
          <div className="loading-state">Loading...</div>
        ) : paginatedPayments.length === 0 ? (
          <div className="empty-state">No payments found</div>
        ) : (
          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Payment #</th>
                  <th>Invoice #</th>
                  <th>Payment Mode</th>
                  <th>Transaction ID</th>
                  <th>Customer</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedPayments.map((payment) => (
                  <tr key={payment.id}>
                    <td>{payment.paymentNumber}</td>
                    <td>
                      <a href="#" className="link-primary">
                        {payment.invoiceNumber}
                      </a>
                    </td>
                    <td>{payment.paymentMode}</td>
                    <td>{payment.transactionId || '-'}</td>
                    <td>
                      <a href="#" className="link-primary">{payment.customer}</a>
                    </td>
                    <td className="amount-cell">${payment.amount.toLocaleString()}</td>
                    <td>{new Date(payment.date).toLocaleDateString()}</td>
                    <td>
                      <div className="action-buttons">
                        <button className="icon-btn-small" onClick={() => handleView(payment.id)} title="View">
                          <Eye size={16} />
                        </button>
                        <button className="icon-btn-small" title="Download">
                          <Download size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="table-footer">
        <div className="table-footer-info">
          Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredPayments.length)} of {filteredPayments.length} entries
        </div>
        <div className="pagination">
          <button 
            className="pagination-btn" 
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Previous
          </button>
          <button className="pagination-btn active">{currentPage}</button>
          <button 
            className="pagination-btn" 
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentsList;
