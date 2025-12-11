import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, Download, RefreshCw, Eye, Edit, Send, DollarSign, FileText } from 'lucide-react';
import StatusBadge from '../../components/StatusBadge';

interface Invoice {
  id: string;
  invoiceNumber: string;
  amount: number;
  totalTax: number;
  date: string;
  customer: string;
  project: string;
  tags: string[];
  dueDate: string;
  status: 'Unpaid' | 'Paid' | 'Partially Paid' | 'Overdue';
}

const InvoicesList: React.FC = () => {
  const navigate = useNavigate();
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    setLoading(true);
    setTimeout(() => {
      const mockData: Invoice[] = [
        {
          id: '1',
          invoiceNumber: 'INV-000014',
          amount: 1000.00,
          totalTax: 0.00,
          date: '2025-10-22',
          customer: 'Jack',
          project: '',
          tags: [],
          dueDate: '2025-11-21',
          status: 'Unpaid'
        },
        {
          id: '2',
          invoiceNumber: 'INV-000013',
          amount: 826.00,
          totalTax: 126.00,
          date: '2025-09-12',
          customer: 'Sarmad',
          project: '',
          tags: [],
          dueDate: '2025-09-19',
          status: 'Unpaid'
        },
        {
          id: '3',
          invoiceNumber: 'INV-000012',
          amount: 8.26,
          totalTax: 1.26,
          date: '2025-09-12',
          customer: 'Sarmad',
          project: '',
          tags: [],
          dueDate: '2025-09-19',
          status: 'Unpaid'
        },
        {
          id: '4',
          invoiceNumber: 'INV-000011',
          amount: 826.00,
          totalTax: 126.00,
          date: '2025-09-12',
          customer: 'Sarmad',
          project: '',
          tags: [],
          dueDate: '2025-09-19',
          status: 'Unpaid'
        },
        {
          id: '5',
          invoiceNumber: 'INV-000010',
          amount: 826.00,
          totalTax: 126.00,
          date: '2025-09-12',
          customer: 'Sarmad',
          project: '',
          tags: [],
          dueDate: '2025-09-19',
          status: 'Unpaid'
        },
        {
          id: '6',
          invoiceNumber: 'INV-000009',
          amount: 100000.00,
          totalTax: 0.00,
          date: '2025-11-07',
          customer: 'Greeen Dot',
          project: '',
          tags: [],
          dueDate: '2025-12-07',
          status: 'Unpaid'
        }
      ];
      setInvoices(mockData);
      setLoading(false);
    }, 500);
  };

  const handleView = (id: string) => {
    navigate(`/sales/invoices/${id}`);
  };

  const handleEdit = (id: string) => {
    navigate(`/sales/invoices/edit/${id}`);
  };

  const handleBatchPayments = () => {
    navigate('/sales/invoices/batch-payments');
  };

  const filteredInvoices = invoices.filter(invoice => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        invoice.invoiceNumber.toLowerCase().includes(query) ||
        invoice.customer.toLowerCase().includes(query)
      );
    }
    return true;
  });

  const totalPages = Math.ceil(filteredInvoices.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedInvoices = filteredInvoices.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="page-content">
      <div className="page-header">
        <div className="page-header-left">
          <h2 className="page-title">Invoices</h2>
        </div>
        <div className="page-header-right">
          <button className="btn-secondary" onClick={handleBatchPayments}>
            <DollarSign size={18} />
            Batch Payments
          </button>
          <button className="btn-secondary">
            <RefreshCw size={18} />
            Recurring Invoices
          </button>
          <button className="btn-primary" onClick={() => navigate('/sales/invoices/new')}>
            <Plus size={18} />
            Create New Invoice
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
          <button className="icon-btn" onClick={fetchInvoices}>
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
        ) : paginatedInvoices.length === 0 ? (
          <div className="empty-state">No invoices found</div>
        ) : (
          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Invoice #</th>
                  <th>Amount</th>
                  <th>Total Tax</th>
                  <th>Date</th>
                  <th>Customer</th>
                  <th>Project</th>
                  <th>Tags</th>
                  <th>Due Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedInvoices.map((invoice) => (
                  <tr key={invoice.id}>
                    <td>
                      <a href="#" className="link-primary" onClick={(e) => { e.preventDefault(); handleView(invoice.id); }}>
                        {invoice.invoiceNumber}
                      </a>
                    </td>
                    <td className="amount-cell">${invoice.amount.toLocaleString()}</td>
                    <td className="amount-cell">${invoice.totalTax.toFixed(2)}</td>
                    <td>{new Date(invoice.date).toLocaleDateString()}</td>
                    <td>
                      <a href="#" className="link-primary">{invoice.customer}</a>
                    </td>
                    <td>{invoice.project || '-'}</td>
                    <td>
                      {invoice.tags.length > 0 ? (
                        <div className="tags-cell">
                          {invoice.tags.map((tag, idx) => (
                            <span key={idx} className="tag">{tag}</span>
                          ))}
                        </div>
                      ) : '-'}
                    </td>
                    <td>{new Date(invoice.dueDate).toLocaleDateString()}</td>
                    <td>
                      <StatusBadge status={invoice.status} type="invoice" />
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button className="icon-btn-small" onClick={() => handleView(invoice.id)} title="View">
                          <Eye size={16} />
                        </button>
                        <button className="icon-btn-small" onClick={() => handleEdit(invoice.id)} title="Edit">
                          <Edit size={16} />
                        </button>
                        <button className="icon-btn-small" title="Send">
                          <Send size={16} />
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
          Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredInvoices.length)} of {filteredInvoices.length} entries
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

export default InvoicesList;
