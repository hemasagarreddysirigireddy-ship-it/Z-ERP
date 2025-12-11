import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, RefreshCw, Eye, Edit, TrendingUp, FileText, DollarSign, Filter, ChevronDown, FileSpreadsheet, Printer } from 'lucide-react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import StatusBadge from '../../components/StatusBadge';

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
  const [searchQuery, setSearchQuery] = useState(() => {
    return localStorage.getItem('estimates_searchQuery') || '';
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(() => {
    const saved = localStorage.getItem('estimates_itemsPerPage');
    return saved ? Number(saved) : 25;
  });
  const [showExportDropdown, setShowExportDropdown] = useState(false);
  const exportDropdownRef = useRef<HTMLDivElement>(null);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const filterDropdownRef = useRef<HTMLDivElement>(null);
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    const saved = localStorage.getItem('sidebarOpen');
    return saved ? JSON.parse(saved) : false;
  });

  const handleSidebarToggle = () => {
    const newState = !sidebarOpen;
    setSidebarOpen(newState);
    localStorage.setItem('sidebarOpen', JSON.stringify(newState));
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (exportDropdownRef.current && !exportDropdownRef.current.contains(event.target as Node)) {
        setShowExportDropdown(false);
      }
      if (filterDropdownRef.current && !filterDropdownRef.current.contains(event.target as Node)) {
        setShowFilterDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Save search query to localStorage
  useEffect(() => {
    localStorage.setItem('estimates_searchQuery', searchQuery);
  }, [searchQuery]);

  // Save items per page to localStorage
  useEffect(() => {
    localStorage.setItem('estimates_itemsPerPage', itemsPerPage.toString());
  }, [itemsPerPage]);

  const handleExport = (format: string) => {
    console.log(`Exporting as ${format}`);
    // Add export logic here
    setShowExportDropdown(false);
  };

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

  useEffect(() => {
    fetchEstimates();
  }, []);

  const handleView = (id: string) => {
    navigate(`/sales/estimates/${id}`);
  };

  const handleEdit = (id: string) => {
    navigate(`/sales/estimates/edit/${id}`);
  };

  const handleRefresh = () => {
    fetchEstimates();
  };

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
    <div className="dashboard-layout">
      <Sidebar isOpen={sidebarOpen} onToggle={handleSidebarToggle} />
      
      <div className={`main-content ${sidebarOpen ? 'sidebar-open' : ''}`}>
        <Header onMenuClick={handleSidebarToggle} />
        
        <div className="page-container">
          <div className="page-header">
            <div className="page-header-left">
              <TrendingUp size={32} className="page-icon" style={{ color: '#10b981' }} />
              <div>
                <h1 className="page-title">Sales Management</h1>
                <p className="page-subtitle">Manage proposals, estimates, invoices & payments</p>
              </div>
            </div>
            <div className="page-header-right">
              <button className="btn-primary" onClick={() => navigate('/sales/estimates/new')}>
                <Plus size={18} />
                New
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="stats-row" style={{ marginBottom: '2rem' }}>
            <div className="stat-card-mini">
              <div className="stat-card-mini-icon" style={{ background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)' }}>
                <DollarSign size={24} />
              </div>
              <div className="stat-card-mini-content">
                <div className="stat-card-mini-value">₹2.4M</div>
                <div className="stat-card-mini-label">Total Revenue</div>
                <div className="stat-mini-trend positive">+18.2% from last month</div>
              </div>
            </div>
            <div className="stat-card-mini">
              <div className="stat-card-mini-icon" style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)' }}>
                <FileText size={24} />
              </div>
              <div className="stat-card-mini-content">
                <div className="stat-card-mini-value">156</div>
                <div className="stat-card-mini-label">Total Invoices</div>
                <div className="stat-mini-trend positive">+12 this month</div>
              </div>
            </div>
            <div className="stat-card-mini">
              <div className="stat-card-mini-icon" style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }}>
                <DollarSign size={24} />
              </div>
              <div className="stat-card-mini-content">
                <div className="stat-card-mini-value">₹485K</div>
                <div className="stat-card-mini-label">Pending Payments</div>
                <div className="stat-mini-trend">28 invoices</div>
              </div>
            </div>
            <div className="stat-card-mini">
              <div className="stat-card-mini-icon" style={{ background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)' }}>
                <TrendingUp size={24} />
              </div>
              <div className="stat-card-mini-content">
                <div className="stat-card-mini-value">42</div>
                <div className="stat-card-mini-label">Active Proposals</div>
                <div className="stat-mini-trend">+3 / this month</div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="tabs" style={{ marginBottom: '1.5rem' }}>
            <button 
              className="tab"
              onClick={() => navigate('/sales/proposals')}
            >
              <FileText size={18} />
              Proposals
            </button>
            <button 
              className="tab tab-active"
              onClick={() => navigate('/sales/estimates')}
            >
              <FileText size={18} />
              Estimates
            </button>
            <button 
              className="tab"
              onClick={() => navigate('/sales/invoices')}
            >
              <FileText size={18} />
              Invoices
            </button>
            <button 
              className="tab"
              onClick={() => navigate('/sales/payments')}
            >
              <DollarSign size={18} />
              Payments
            </button>
          </div>

          <div className="page-content">
            <div className="page-header" style={{ marginBottom: '1rem' }}>
              <div className="page-header-left">
                <h2 className="page-title" style={{ fontSize: '1.5rem' }}>Estimates</h2>
              </div>
              <div className="page-header-right">
                <button className="btn-primary" onClick={() => navigate('/sales/estimates/new')} style={{ background: '#4f46e5', padding: '0.5rem 1rem' }}>
                  <Plus size={18} />
                  Create New Estimate
                </button>
              </div>
            </div>

            <div className="table-controls" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', gap: '1rem' }}>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <select 
                  value={itemsPerPage}
                  onChange={(e) => setItemsPerPage(Number(e.target.value))}
                  style={{ padding: '0.5rem 0.75rem', border: '1px solid #e2e8f0', borderRadius: '6px', background: 'white', cursor: 'pointer', fontSize: '0.875rem' }}
                >
                  <option value="25">25</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>
                
                <div style={{ position: 'relative' }} ref={exportDropdownRef}>
                  <button 
                    onClick={() => setShowExportDropdown(!showExportDropdown)}
                    style={{ padding: '0.5rem 1rem', border: '1px solid #e2e8f0', borderRadius: '6px', background: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}
                  >
                    Export
                    <ChevronDown size={16} />
                  </button>
                  {showExportDropdown && (
                    <div style={{ position: 'absolute', top: '100%', left: 0, marginTop: '0.25rem', background: 'white', border: '1px solid #e2e8f0', borderRadius: '6px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', zIndex: 1000, minWidth: '150px' }}>
                      <button onClick={() => handleExport('csv')} style={{ width: '100%', padding: '0.75rem 1rem', border: 'none', background: 'transparent', textAlign: 'left', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }} onMouseEnter={(e) => e.currentTarget.style.background = '#f1f5f9'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                        <FileSpreadsheet size={16} />
                        CSV
                      </button>
                      <button onClick={() => handleExport('pdf')} style={{ width: '100%', padding: '0.75rem 1rem', border: 'none', background: 'transparent', textAlign: 'left', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }} onMouseEnter={(e) => e.currentTarget.style.background = '#f1f5f9'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                        <FileText size={16} />
                        PDF
                      </button>
                      <button onClick={() => handleExport('excel')} style={{ width: '100%', padding: '0.75rem 1rem', border: 'none', background: 'transparent', textAlign: 'left', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }} onMouseEnter={(e) => e.currentTarget.style.background = '#f1f5f9'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                        <FileSpreadsheet size={16} />
                        Excel
                      </button>
                      <button onClick={() => handleExport('print')} style={{ width: '100%', padding: '0.75rem 1rem', border: 'none', background: 'transparent', textAlign: 'left', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', borderTop: '1px solid #e2e8f0' }} onMouseEnter={(e) => e.currentTarget.style.background = '#f1f5f9'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                        <Printer size={16} />
                        Print
                      </button>
                    </div>
                  )}
                </div>

                <button onClick={handleRefresh} style={{ padding: '0.5rem', border: '1px solid #e2e8f0', borderRadius: '6px', background: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                  <RefreshCw size={18} />
                </button>
              </div>
              
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flex: 1, justifyContent: 'flex-end' }}>
                <div style={{ position: 'relative', flex: '0 1 400px' }}>
                  <Search size={18} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                  <input
                    type="text"
                    placeholder="Search.."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{ width: '100%', padding: '0.5rem 0.75rem 0.5rem 2.5rem', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '0.875rem' }}
                  />
                </div>
                <div style={{ position: 'relative' }} ref={filterDropdownRef}>
                  <button 
                    onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                    style={{ background: '#6366f1', color: 'white', border: 'none', borderRadius: '6px', padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.875rem' }}
                  >
                    <Filter size={18} />
                  </button>
                  {showFilterDropdown && (
                    <div style={{ position: 'absolute', top: '100%', right: 0, marginTop: '0.25rem', background: 'white', border: '1px solid #e2e8f0', borderRadius: '6px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', zIndex: 1000, minWidth: '180px' }}>
                      <button style={{ width: '100%', padding: '0.75rem 1rem', border: 'none', background: 'transparent', textAlign: 'left', cursor: 'pointer', fontSize: '0.875rem', color: '#1e293b' }} onMouseEnter={(e) => e.currentTarget.style.background = '#f1f5f9'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                        All
                      </button>
                      <button style={{ width: '100%', padding: '0.75rem 1rem', border: 'none', background: 'transparent', textAlign: 'left', cursor: 'pointer', fontSize: '0.875rem', color: '#1e293b' }} onMouseEnter={(e) => e.currentTarget.style.background = '#f1f5f9'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                        Draft
                      </button>
                      <button style={{ width: '100%', padding: '0.75rem 1rem', border: 'none', background: 'transparent', textAlign: 'left', cursor: 'pointer', fontSize: '0.875rem', color: '#1e293b' }} onMouseEnter={(e) => e.currentTarget.style.background = '#f1f5f9'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                        Sent
                      </button>
                      <button style={{ width: '100%', padding: '0.75rem 1rem', border: 'none', background: 'transparent', textAlign: 'left', cursor: 'pointer', fontSize: '0.875rem', color: '#1e293b' }} onMouseEnter={(e) => e.currentTarget.style.background = '#f1f5f9'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                        Open
                      </button>
                      <button style={{ width: '100%', padding: '0.75rem 1rem', border: 'none', background: 'transparent', textAlign: 'left', cursor: 'pointer', fontSize: '0.875rem', color: '#1e293b' }} onMouseEnter={(e) => e.currentTarget.style.background = '#f1f5f9'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                        Revised
                      </button>
                      <button style={{ width: '100%', padding: '0.75rem 1rem', border: 'none', background: 'transparent', textAlign: 'left', cursor: 'pointer', fontSize: '0.875rem', color: '#1e293b' }} onMouseEnter={(e) => e.currentTarget.style.background = '#f1f5f9'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                        Declined
                      </button>
                      <button style={{ width: '100%', padding: '0.75rem 1rem', border: 'none', background: 'transparent', textAlign: 'left', cursor: 'pointer', fontSize: '0.875rem', color: '#1e293b' }} onMouseEnter={(e) => e.currentTarget.style.background = '#f1f5f9'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                        Accepted
                      </button>
                      <button style={{ width: '100%', padding: '0.75rem 1rem', border: 'none', background: 'transparent', textAlign: 'left', cursor: 'pointer', fontSize: '0.875rem', color: '#1e293b' }} onMouseEnter={(e) => e.currentTarget.style.background = '#f1f5f9'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                        2023
                      </button>
                      <button style={{ width: '100%', padding: '0.75rem 1rem', border: 'none', background: 'transparent', textAlign: 'left', cursor: 'pointer', fontSize: '0.875rem', color: '#1e293b' }} onMouseEnter={(e) => e.currentTarget.style.background = '#f1f5f9'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                        2024
                      </button>
                      <button style={{ width: '100%', padding: '0.75rem 1rem', border: 'none', background: 'transparent', textAlign: 'left', cursor: 'pointer', fontSize: '0.875rem', color: '#1e293b' }} onMouseEnter={(e) => e.currentTarget.style.background = '#f1f5f9'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                        Sale Agent
                      </button>
                      <button style={{ width: '100%', padding: '0.75rem 1rem', border: 'none', background: 'transparent', textAlign: 'left', cursor: 'pointer', fontSize: '0.875rem', color: '#1e293b' }} onMouseEnter={(e) => e.currentTarget.style.background = '#f1f5f9'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                        Expired
                      </button>
                      <button style={{ width: '100%', padding: '0.75rem 1rem', border: 'none', background: 'transparent', textAlign: 'left', cursor: 'pointer', fontSize: '0.875rem', color: '#1e293b' }} onMouseEnter={(e) => e.currentTarget.style.background = '#f1f5f9'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                        Leads Related
                      </button>
                      <button style={{ width: '100%', padding: '0.75rem 1rem', border: 'none', background: 'transparent', textAlign: 'left', cursor: 'pointer', fontSize: '0.875rem', color: '#1e293b' }} onMouseEnter={(e) => e.currentTarget.style.background = '#f1f5f9'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                        Customers Related
                      </button>
                    </div>
                  )}
                </div>
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
        </div>
      </div>
    </div>
  );
};

export default EstimatesList;
