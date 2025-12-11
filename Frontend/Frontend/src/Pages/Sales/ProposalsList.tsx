import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, Download, RefreshCw, Eye, Edit, Send, ChevronLeft, ChevronRight } from 'lucide-react';
import StatusBadge from '../../components/StatusBadge';
import FilterDropdown from '../../components/FilterDropdown';

interface Proposal {
  id: string;
  proposalNumber: string;
  subject: string;
  customer: string;
  total: number;
  date: string;
  openTill: string;
  project: string;
  tags: string[];
  dateCreated: string;
  status: 'Draft' | 'Sent' | 'Open' | 'Revised' | 'Declined' | 'Accepted';
}

const ProposalsList: React.FC = () => {
  const navigate = useNavigate();
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);
  const [filters, setFilters] = useState<{ [key: string]: string }>({});

  // Mock data - replace with API call
  useEffect(() => {
    fetchProposals();
  }, []);

  const fetchProposals = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      const mockData: Proposal[] = [
        {
          id: '1',
          proposalNumber: 'PRO-000001',
          subject: 'Mug Print',
          customer: 'Sajeer Moidu',
          total: 100000.00,
          date: '2025-11-07',
          openTill: '2025-11-14',
          project: '',
          tags: [],
          dateCreated: '2025-11-07 17:20:27',
          status: 'Accepted'
        }
      ];
      setProposals(mockData);
      setLoading(false);
    }, 500);
  };

  const handleRefresh = () => {
    fetchProposals();
  };

  const handleExport = () => {
    console.log('Exporting proposals...');
  };

  const handleView = (id: string) => {
    navigate(`/sales/proposals/${id}`);
  };

  const handleEdit = (id: string) => {
    navigate(`/sales/proposals/edit/${id}`);
  };

  const handleSend = (id: string) => {
    console.log('Sending proposal:', id);
  };

  const handleNewProposal = () => {
    navigate('/sales/proposals/new');
  };

  const filterGroups = [
    {
      title: 'Status',
      key: 'status',
      options: [
        { label: 'All', value: 'all' },
        { label: 'Draft', value: 'draft' },
        { label: 'Sent', value: 'sent' },
        { label: 'Open', value: 'open' },
        { label: 'Revised', value: 'revised' },
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
        { label: 'Sale Agent', value: 'sale-agent' },
        { label: 'Expired', value: 'expired' },
        { label: 'Leads Related', value: 'leads-related' },
        { label: 'Customers Related', value: 'customers-related' }
      ]
    }
  ];

  const filteredProposals = proposals.filter(proposal => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        proposal.proposalNumber.toLowerCase().includes(query) ||
        proposal.subject.toLowerCase().includes(query) ||
        proposal.customer.toLowerCase().includes(query)
      );
    }
    return true;
  });

  const totalPages = Math.ceil(filteredProposals.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProposals = filteredProposals.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="page-content">
      <div className="page-header">
        <div className="page-header-left">
          <h2 className="page-title">Proposals</h2>
        </div>
        <div className="page-header-right">
          <button className="btn-secondary" onClick={handleExport}>
            <Download size={18} />
            Export
          </button>
          <button className="btn-primary" onClick={handleNewProposal}>
            <Plus size={18} />
            New Proposal
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
          <button className="btn-secondary" onClick={handleExport}>
            Export
          </button>
          <button className="icon-btn" onClick={handleRefresh}>
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
        ) : paginatedProposals.length === 0 ? (
          <div className="empty-state">No proposals found</div>
        ) : (
          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Proposal #</th>
                  <th>Subject</th>
                  <th>To</th>
                  <th>Total</th>
                  <th>Date</th>
                  <th>Open Till</th>
                  <th>Project</th>
                  <th>Tags</th>
                  <th>Date Created</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedProposals.map((proposal) => (
                  <tr key={proposal.id}>
                    <td>
                      <a href="#" className="link-primary" onClick={(e) => { e.preventDefault(); handleView(proposal.id); }}>
                        {proposal.proposalNumber}
                      </a>
                    </td>
                    <td>{proposal.subject}</td>
                    <td>
                      <a href="#" className="link-primary">
                        {proposal.customer}
                      </a>
                    </td>
                    <td className="amount-cell">${proposal.total.toLocaleString()}</td>
                    <td>{new Date(proposal.date).toLocaleDateString()}</td>
                    <td>{new Date(proposal.openTill).toLocaleDateString()}</td>
                    <td>{proposal.project || '-'}</td>
                    <td>
                      {proposal.tags.length > 0 ? (
                        <div className="tags-cell">
                          {proposal.tags.map((tag, idx) => (
                            <span key={idx} className="tag">{tag}</span>
                          ))}
                        </div>
                      ) : '-'}
                    </td>
                    <td>{new Date(proposal.dateCreated).toLocaleString()}</td>
                    <td>
                      <StatusBadge status={proposal.status} type="proposal" />
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button className="icon-btn-small" onClick={() => handleView(proposal.id)} title="View">
                          <Eye size={16} />
                        </button>
                        <button className="icon-btn-small" onClick={() => handleEdit(proposal.id)} title="Edit">
                          <Edit size={16} />
                        </button>
                        <button className="icon-btn-small" onClick={() => handleSend(proposal.id)} title="Send">
                          <Send size={16} />
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
          Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredProposals.length)} of {filteredProposals.length} entries
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

export default ProposalsList;
