import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Download, RefreshCw, Eye, Plus, DollarSign, FileText, TrendingUp, Filter, ChevronDown, FileSpreadsheet, Printer } from 'lucide-react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';

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
  const [searchQuery, setSearchQuery] = useState(() => {
    return localStorage.getItem('payments_searchQuery') || '';
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(() => {
    const saved = localStorage.getItem('payments_itemsPerPage');
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
    localStorage.setItem('payments_searchQuery', searchQuery);
  }, [searchQuery]);

  // Save items per page to localStorage
  useEffect(() => {
    localStorage.setItem('payments_itemsPerPage', itemsPerPage.toString());
  }, [itemsPerPage]);

  const handleExport = (format: string) => {
    console.log(`Exporting as ${format}`);
    // Add export logic here
    setShowExportDropdown(false);
  };

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
    <div className="dashboard-layout">
      <Sidebar isOpen={sidebarOpen} onToggle={handleSidebarToggle} />
      
      <div className={`main-content ${sidebarOpen ? 'sidebar-open' : ''}`}>
        <Header onMenuClick={handleSidebarToggle} />
        
        <div className="page-container">
          <div className="page-header" style={{ borderBottom: '3px solid #3b82f6', paddingBottom: '1rem', marginBottom: '2rem' }}>
            <div className="page-header-left">
              <TrendingUp size={40} style={{ color: '#10b981', marginRight: '1rem' }} />
              <div>
                <h1 className="page-title" style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '0.25rem' }}>Sales Management</h1>
                <p className="page-subtitle" style={{ color: '#64748b' }}>Manage proposals, estimates, invoices & payments</p>
              </div>
            </div>
            <div className="page-header-right">
              <button className="btn-primary" onClick={() => navigate('/sales/payments/batch')} style={{ background: '#3b82f6', fontSize: '1rem', padding: '0.75rem 1.5rem' }}>
                <Plus size={20} />
                New
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="stats-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
            <div style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <div style={{ width: '80px', height: '80px', borderRadius: '12px', background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <DollarSign size={32} color="white" />
              </div>
              <div>
                <div style={{ fontSize: '1.75rem', fontWeight: '700', color: '#1e293b' }}>₹2.4M</div>
                <div style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '0.25rem' }}>Total Revenue</div>
                <div style={{ color: '#10b981', fontSize: '0.85rem' }}>+18.2% from last month</div>
              </div>
            </div>
            <div style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <div style={{ width: '80px', height: '80px', borderRadius: '12px', background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <FileText size={32} color="white" />
              </div>
              <div>
                <div style={{ fontSize: '1.75rem', fontWeight: '700', color: '#1e293b' }}>156</div>
                <div style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '0.25rem' }}>Total Invoices</div>
                <div style={{ color: '#10b981', fontSize: '0.85rem' }}>+12 this month</div>
              </div>
            </div>
            <div style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <div style={{ width: '80px', height: '80px', borderRadius: '12px', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <DollarSign size={32} color="white" />
              </div>
              <div>
                <div style={{ fontSize: '1.75rem', fontWeight: '700', color: '#1e293b' }}>₹485K</div>
                <div style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '0.25rem' }}>Pending</div>
                <div style={{ color: '#64748b', fontSize: '0.9rem' }}>Payments</div>
                <div style={{ color: '#64748b', fontSize: '0.85rem' }}>28 invoices</div>
              </div>
            </div>
            <div style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <div style={{ width: '80px', height: '80px', borderRadius: '12px', background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <TrendingUp size={32} color="white" />
              </div>
              <div>
                <div style={{ fontSize: '1.75rem', fontWeight: '700', color: '#1e293b' }}>42</div>
                <div style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '0.25rem' }}>Active Proposals</div>
                <div style={{ color: '#64748b', fontSize: '0.85rem' }}>+3 / this month</div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', borderBottom: '1px solid #e2e8f0' }}>
            <button 
              onClick={() => navigate('/sales/proposals')}
              style={{ padding: '0.75rem 1.5rem', background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#64748b', borderBottom: '2px solid transparent', fontSize: '0.95rem' }}
            >
              <FileText size={18} />
              Proposals
            </button>
            <button 
              onClick={() => navigate('/sales/estimates')}
              style={{ padding: '0.75rem 1.5rem', background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#64748b', borderBottom: '2px solid transparent', fontSize: '0.95rem' }}
            >
              <FileText size={18} />
              Estimates
            </button>
            <button 
              onClick={() => navigate('/sales/invoices')}
              style={{ padding: '0.75rem 1.5rem', background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#64748b', borderBottom: '2px solid transparent', fontSize: '0.95rem' }}
            >
              <FileText size={18} />
              Invoices
            </button>
            <button 
              style={{ padding: '0.75rem 1.5rem', background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#1e293b', borderBottom: '2px solid #3b82f6', fontSize: '0.95rem', fontWeight: '600' }}
            >
              <DollarSign size={18} />
              Payments
            </button>
          </div>

          <div className="page-content">
            <div className="page-header">
              <div className="page-header-left">
                <h2 className="page-title">Payments</h2>
              </div>
              <div className="page-header-right">
                <button className="btn-primary" onClick={() => navigate('/sales/payments/batch')}>
                  <Plus size={18} />
                  Add Payments
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

          <button onClick={fetchPayments} style={{ padding: '0.5rem', border: '1px solid #e2e8f0', borderRadius: '6px', background: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
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
            </div>      <div className="table-container">
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
        </div>
      </div>
    </div>
  );
};

export default PaymentsList;
