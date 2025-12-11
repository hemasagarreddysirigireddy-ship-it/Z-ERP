import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, Download, RefreshCw, Eye, Edit, MoreVertical } from 'lucide-react';
import StatusBadge from '../../components/StatusBadge';
import FilterDropdown from '../../components/FilterDropdown';

interface Estimate {
  id: string;
  estimateNumber: string;
  amount: number;
  totalTax: number;
  customer: string;
  project: string;
  tags: string[];
  date: string;
  expiryDate: string;
  referenceNumber: string;
  status: 'Draft' | 'Sent' | 'Expired' | 'Declined' | 'Accepted';
  invoiced: boolean;
}

const EstimatesList: React.FC = () => {
  const navigate = useNavigate();
  const [estimates, setEstimates] = useState<Estimate[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);
  const [filters, setFilters] = useState<{ [key: string]: string }>({});

  // Stats
  const [stats, setStats] = useState({
    draft: { count: 1, total: 200.00 },
    sent: { count: 0, total: 0.00 },
    expired: { count: 0, total: 0.00 },
    declined: { count: 0, total: 0.00 },
    accepted: { count: 1, total: 900.00 }
  });

  useEffect(() => {
    fetchEstimates();
  }, []);

  const fetchEstimates = async () => {
    setLoading(true);
    setTimeout(() => {
      const mockData: Estimate[] = [
        {
          id: '1',
          estimateNumber: 'EST-00002',
          amount: 200.00,
          totalTax: 0.00,
          customer: 'Arun Pixels Studio',
          project: '',
          tags: [],
          date: '2025-09-15',
          expiryDate: '2025-09-22',
          referenceNumber: '',
          status: 'Draft',
          invoiced: false
        },
        {
          id: '2',
          estimateNumber: 'EST-00001',
          amount: 900.00,
          totalTax: 0.00,
          customer: 'Greeen Dot',
          project: '',
          tags: [],
          date: '2025-09-04',
          expiryDate: '2025-09-12',
          referenceNumber: '',
          status: 'Accepted',
          invoiced: true
        }
      ];
      setEstimates(mockData);
      setLoading(false);
    }, 500);
  };

  const handleView = (id: string) => {
    navigate(`/sales/estimates/${id}`);
  };

  const handleEdit = (id: string) => {
    navigate(`/sales/estimates/edit/${id}`);
  };

  const filterGroups = [
    {
      title: 'Status',
      key: 'status',
      options: [
        { label: 'All', value: 'all' },
        { label: 'Not Sent', value: 'not-sent' },
        { label: 'Invoiced', value: 'invoiced' },
        { label: 'Not Invoiced', value: 'not-invoiced' },
        { label: 'Draft', value: 'draft' },
        { label: 'Sent', value: 'sent' },
        { label: 'Expired', value: 'expired' },
        { label: 'Declined', value: 'declined' },
        { label: 'Accepted', value: 'accepted' }
      ]
    },
    {
      title: 'Year',
      key: 'year',
      options: [
        { label: '2025', value: '2025' },
        { label: '2024', value: '2024' }
      ]
    },
    {
      title: 'Related',
      key: 'related',
      options: [
        { label: 'Sale Agent', value: 'sale-agent' }
      ]
    }
  ];

  const filteredEstimates = estimates.filter(estimate => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        estimate.estimateNumber.toLowerCase().includes(query) ||
        estimate.customer.toLowerCase().includes(query)
      );
    }
    return true;
  });

  const totalPages = Math.ceil(filteredEstimates.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedEstimates = filteredEstimates.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="page-content">
      {/* Stats Cards */}
      <div className="stats-row-mini">
        <div className="stat-mini-card">
          <div className="stat-mini-header">
            <span>Draft</span>
            <span className="stat-mini-amount">${stats.draft.total.toFixed(2)}</span>
          </div>
          <div className="stat-mini-body">
            <span className="stat-mini-label">Draft</span>
            <div className="stat-mini-progress">
              <span className="stat-mini-count">{stats.draft.count} / 2</span>
              <span className="stat-mini-link">View</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: '50%' }}></div>
            </div>
            <span className="stat-mini-percentage">50.00%</span>
          </div>
        </div>

        <div className="stat-mini-card">
          <div className="stat-mini-header">
            <span>Sent</span>
            <span className="stat-mini-amount">${stats.sent.total.toFixed(2)}</span>
          </div>
          <div className="stat-mini-body">
            <span className="stat-mini-label">Sent</span>
            <div className="stat-mini-progress">
              <span className="stat-mini-count">{stats.sent.count} / 2</span>
              <span className="stat-mini-link">View</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: '0%' }}></div>
            </div>
            <span className="stat-mini-percentage">0.00%</span>
          </div>
        </div>

        <div className="stat-mini-card">
          <div className="stat-mini-header">
            <span>Expired</span>
            <span className="stat-mini-amount">${stats.expired.total.toFixed(2)}</span>
          </div>
          <div className="stat-mini-body">
            <span className="stat-mini-label">Expired</span>
            <div className="stat-mini-progress">
              <span className="stat-mini-count">{stats.expired.count} / 2</span>
              <span className="stat-mini-link">View</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: '0%' }}></div>
            </div>
            <span className="stat-mini-percentage">0.00%</span>
          </div>
        </div>

        <div className="stat-mini-card">
          <div className="stat-mini-header">
            <span>Declined</span>
            <span className="stat-mini-amount">${stats.declined.total.toFixed(2)}</span>
          </div>
          <div className="stat-mini-body">
            <span className="stat-mini-label">Declined</span>
            <div className="stat-mini-progress">
              <span className="stat-mini-count">{stats.declined.count} / 2</span>
              <span className="stat-mini-link">View</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: '0%' }}></div>
            </div>
            <span className="stat-mini-percentage">0.00%</span>
          </div>
        </div>

        <div className="stat-mini-card">
          <div className="stat-mini-header">
            <span>Accepted</span>
            <span className="stat-mini-amount">${stats.accepted.total.toFixed(2)}</span>
          </div>
          <div className="stat-mini-body">
            <span className="stat-mini-label">Accepted</span>
            <div className="stat-mini-progress">
              <span className="stat-mini-count">{stats.accepted.count} / 2</span>
              <span className="stat-mini-link">View</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: '50%' }}></div>
            </div>
            <span className="stat-mini-percentage">50.00%</span>
          </div>
        </div>
      </div>

      <div className="page-header">
        <div className="page-header-left">
          <h2 className="page-title">Estimates</h2>
        </div>
        <div className="page-header-right">
          <button className="btn-secondary">
            <Download size={18} />
            Export
          </button>
          <button className="btn-primary" onClick={() => navigate('/sales/estimates/new')}>
            <Plus size={18} />
            Create New Estimate
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
          <button className="icon-btn" onClick={() => fetchEstimates()}>
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
          <FilterDropdown filterGroups={filterGroups} onFilterChange={setFilters} />
        </div>
      </div>

      <div className="table-container">
        {loading ? (
          <div className="loading-state">Loading...</div>
        ) : paginatedEstimates.length === 0 ? (
          <div className="empty-state">No estimates found</div>
        ) : (
          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Estimate #</th>
                  <th>Amount</th>
                  <th>Total Tax</th>
                  <th>Customer</th>
                  <th>Project</th>
                  <th>Tags</th>
                  <th>Date</th>
                  <th>Expiry Date</th>
                  <th>Reference #</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedEstimates.map((estimate) => (
                  <tr key={estimate.id}>
                    <td>
                      <a href="#" className="link-primary" onClick={(e) => { e.preventDefault(); handleView(estimate.id); }}>
                        {estimate.estimateNumber}
                      </a>
                    </td>
                    <td className="amount-cell">${estimate.amount.toFixed(2)}</td>
                    <td className="amount-cell">${estimate.totalTax.toFixed(2)}</td>
                    <td>
                      <a href="#" className="link-primary">{estimate.customer}</a>
                    </td>
                    <td>{estimate.project || '-'}</td>
                    <td>
                      {estimate.tags.length > 0 ? (
                        <div className="tags-cell">
                          {estimate.tags.map((tag, idx) => (
                            <span key={idx} className="tag">{tag}</span>
                          ))}
                        </div>
                      ) : '-'}
                    </td>
                    <td>{new Date(estimate.date).toLocaleDateString()}</td>
                    <td>{new Date(estimate.expiryDate).toLocaleDateString()}</td>
                    <td>{estimate.referenceNumber || '-'}</td>
                    <td>
                      <StatusBadge status={estimate.status} type="estimate" />
                      {estimate.invoiced && (
                        <div className="invoiced-label">Invoiced</div>
                      )}
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button className="icon-btn-small" onClick={() => handleView(estimate.id)} title="View">
                          <Eye size={16} />
                        </button>
                        <button className="icon-btn-small" onClick={() => handleEdit(estimate.id)} title="Edit">
                          <Edit size={16} />
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
          Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredEstimates.length)} of {filteredEstimates.length} entries
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

export default EstimatesList;
