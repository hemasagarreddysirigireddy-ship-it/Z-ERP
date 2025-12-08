import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, Download, RefreshCw, Eye } from 'lucide-react';
import StatusBadge from '../../components/StatusBadge';

interface CreditNote {
  id: string;
  creditNoteNumber: string;
  creditNoteDate: string;
  customer: string;
  status: string;
  project: string;
  referenceNumber: string;
  amount: number;
  remainingAmount: number;
}

const CreditNotesList: React.FC = () => {
  const navigate = useNavigate();
  const [creditNotes, setCreditNotes] = useState<CreditNote[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);

  useEffect(() => {
    fetchCreditNotes();
  }, []);

  const fetchCreditNotes = async () => {
    setLoading(true);
    setTimeout(() => {
      const mockData: CreditNote[] = [];
      setCreditNotes(mockData);
      setLoading(false);
    }, 500);
  };

  const handleView = (id: string) => {
    navigate(`/sales/credit-notes/${id}`);
  };

  const handleEdit = (id: string) => {
    navigate(`/sales/credit-notes/edit/${id}`);
  };

  const filteredCreditNotes = creditNotes.filter(note => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        note.creditNoteNumber.toLowerCase().includes(query) ||
        note.customer.toLowerCase().includes(query)
      );
    }
    return true;
  });

  const totalPages = Math.ceil(filteredCreditNotes.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCreditNotes = filteredCreditNotes.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="page-content">
      <div className="page-header">
        <div className="page-header-left">
          <h2 className="page-title">Credit Notes</h2>
        </div>
        <div className="page-header-right">
          <button className="btn-secondary">
            <Download size={18} />
            Export
          </button>
          <button className="btn-primary" onClick={() => navigate('/sales/credit-notes/new')}>
            <Plus size={18} />
            New Credit Note
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
          <button className="icon-btn" onClick={fetchCreditNotes}>
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
        ) : paginatedCreditNotes.length === 0 ? (
          <div className="empty-state">
            <p>No entries found</p>
          </div>
        ) : (
          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Credit Note #</th>
                  <th>Credit Note Date</th>
                  <th>Customer</th>
                  <th>Status</th>
                  <th>Project</th>
                  <th>Reference #</th>
                  <th>Amount</th>
                  <th>Remaining Amount</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedCreditNotes.map((note) => (
                  <tr key={note.id}>
                    <td>
                      <a href="#" className="link-primary" onClick={(e) => { e.preventDefault(); handleView(note.id); }}>
                        {note.creditNoteNumber}
                      </a>
                    </td>
                    <td>{new Date(note.creditNoteDate).toLocaleDateString()}</td>
                    <td>
                      <a href="#" className="link-primary">{note.customer}</a>
                    </td>
                    <td>
                      <StatusBadge status={note.status} type="creditNote" />
                    </td>
                    <td>{note.project || '-'}</td>
                    <td>{note.referenceNumber || '-'}</td>
                    <td className="amount-cell">${note.amount.toFixed(2)}</td>
                    <td className="amount-cell">${note.remainingAmount.toFixed(2)}</td>
                    <td>
                      <div className="action-buttons">
                        <button className="icon-btn-small" onClick={() => handleView(note.id)} title="View">
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

      {paginatedCreditNotes.length > 0 && (
        <div className="table-footer">
          <div className="table-footer-info">
            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredCreditNotes.length)} of {filteredCreditNotes.length} entries
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
      )}
    </div>
  );
};

export default CreditNotesList;
