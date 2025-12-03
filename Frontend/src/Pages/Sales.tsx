import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { 
  TrendingUp, FileText, DollarSign, CreditCard, Plus,
  Search, Filter, Download, Eye, Edit, Send
} from 'lucide-react';

const Sales: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('invoices');

  const invoices = [
    { id: 'INV-2024-001', client: 'Acme Corporation', date: '2024-12-01', dueDate: '2024-12-15', amount: 45000, status: 'Paid', items: 5 },
    { id: 'INV-2024-002', client: 'Tech Solutions', date: '2024-12-02', dueDate: '2024-12-16', amount: 32000, status: 'Pending', items: 3 },
    { id: 'INV-2024-003', client: 'Global Ventures', date: '2024-12-03', dueDate: '2024-12-17', amount: 58000, status: 'Overdue', items: 7 },
    { id: 'INV-2024-004', client: 'Retail Plus', date: '2024-12-04', dueDate: '2024-12-18', amount: 28000, status: 'Draft', items: 4 },
  ];

  const proposals = [
    { id: 'PROP-2024-001', client: 'Future Tech', title: 'Website Redesign', value: 65000, status: 'Sent', date: '2024-11-28', validUntil: '2024-12-28' },
    { id: 'PROP-2024-002', client: 'Smart Solutions', title: 'Mobile App Development', value: 120000, status: 'Accepted', date: '2024-11-25', validUntil: '2024-12-25' },
    { id: 'PROP-2024-003', client: 'Innovate Corp', title: 'CRM Implementation', value: 85000, status: 'Draft', date: '2024-11-30', validUntil: '2024-12-30' },
    { id: 'PROP-2024-004', client: 'Digital Dynamics', title: 'Cloud Migration', value: 95000, status: 'Declined', date: '2024-11-20', validUntil: '2024-12-20' },
  ];

  const payments = [
    { id: 'PAY-2024-001', invoice: 'INV-2024-001', client: 'Acme Corporation', amount: 45000, method: 'Bank Transfer', date: '2024-12-10', status: 'Completed' },
    { id: 'PAY-2024-002', invoice: 'INV-2023-098', client: 'Tech Solutions', amount: 32000, method: 'Credit Card', date: '2024-12-09', status: 'Completed' },
    { id: 'PAY-2024-003', invoice: 'INV-2024-002', client: 'Global Ventures', amount: 28000, method: 'PayPal', date: '2024-12-08', status: 'Processing' },
  ];

  const creditNotes = [
    { id: 'CN-2024-001', invoice: 'INV-2024-001', client: 'Acme Corporation', amount: 5000, reason: 'Product Return', date: '2024-12-05', status: 'Issued' },
    { id: 'CN-2024-002', invoice: 'INV-2023-095', client: 'Tech Solutions', amount: 3500, reason: 'Discount Adjustment', date: '2024-12-03', status: 'Applied' },
  ];

  const getStatusBadge = (status: string) => {
    const statusMap: { [key: string]: string } = {
      'Paid': 'badge-success',
      'Pending': 'badge-warning',
      'Overdue': 'badge-danger',
      'Draft': 'badge-secondary',
      'Sent': 'badge-info',
      'Accepted': 'badge-success',
      'Declined': 'badge-danger',
      'Completed': 'badge-success',
      'Processing': 'badge-warning',
      'Issued': 'badge-success',
      'Applied': 'badge-info'
    };
    return statusMap[status] || 'badge-secondary';
  };

  return (
    <div className="dashboard-layout">
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className="main-content">
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        
        <div className="page-container">
          <div className="page-header">
            <div className="page-header-left">
              <TrendingUp size={32} className="page-icon" />
              <div>
                <h1 className="page-title">Sales Management</h1>
                <p className="page-subtitle">Manage proposals, invoices, payments & credit notes</p>
              </div>
            </div>
            <div className="page-header-right">
              <button className="btn-secondary">
                <Download size={18} />
                Export
              </button>
              <button className="btn-primary">
                <Plus size={18} />
                New Invoice
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="stats-row">
            <div className="stat-card-mini">
              <div className="stat-card-mini-icon revenue">
                <DollarSign size={24} />
              </div>
              <div className="stat-card-mini-content">
                <div className="stat-card-mini-value">₹2.4M</div>
                <div className="stat-card-mini-label">Total Revenue</div>
                <div className="stat-mini-trend positive">+18.2% from last month</div>
              </div>
            </div>
            <div className="stat-card-mini">
              <div className="stat-card-mini-icon completed">
                <FileText size={24} />
              </div>
              <div className="stat-card-mini-content">
                <div className="stat-card-mini-value">156</div>
                <div className="stat-card-mini-label">Total Invoices</div>
                <div className="stat-mini-trend positive">+12 this month</div>
              </div>
            </div>
            <div className="stat-card-mini">
              <div className="stat-card-mini-icon active">
                <CreditCard size={24} />
              </div>
              <div className="stat-card-mini-content">
                <div className="stat-card-mini-value">₹485K</div>
                <div className="stat-card-mini-label">Pending Payments</div>
                <div className="stat-mini-trend negative">28 invoices</div>
              </div>
            </div>
            <div className="stat-card-mini">
              <div className="stat-card-mini-icon projects">
                <TrendingUp size={24} />
              </div>
              <div className="stat-card-mini-content">
                <div className="stat-card-mini-value">42</div>
                <div className="stat-card-mini-label">Active Proposals</div>
                <div className="stat-mini-trend">₹3.2M value</div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="tabs">
            <button 
              className={`tab ${activeTab === 'invoices' ? 'tab-active' : ''}`}
              onClick={() => setActiveTab('invoices')}
            >
              <FileText size={18} />
              Invoices
            </button>
            <button 
              className={`tab ${activeTab === 'proposals' ? 'tab-active' : ''}`}
              onClick={() => setActiveTab('proposals')}
            >
              <FileText size={18} />
              Proposals
            </button>
            <button 
              className={`tab ${activeTab === 'payments' ? 'tab-active' : ''}`}
              onClick={() => setActiveTab('payments')}
            >
              <DollarSign size={18} />
              Payments
            </button>
            <button 
              className={`tab ${activeTab === 'creditnotes' ? 'tab-active' : ''}`}
              onClick={() => setActiveTab('creditnotes')}
            >
              <CreditCard size={18} />
              Credit Notes
            </button>
          </div>

          {/* Search and Filter */}
          <div className="search-filter-bar">
            <div className="search-box">
              <Search size={18} />
              <input type="text" placeholder="Search..." />
            </div>
            <button className="btn-secondary">
              <Filter size={18} />
              Filter
            </button>
          </div>

          {/* Invoices Tab */}
          {activeTab === 'invoices' && (
            <div className="table-container">
              <div className="table-wrapper">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Invoice ID</th>
                      <th>Client</th>
                      <th>Date</th>
                      <th>Due Date</th>
                      <th>Amount</th>
                      <th>Items</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoices.map(invoice => (
                      <tr key={invoice.id}>
                        <td className="invoice-id">{invoice.id}</td>
                        <td className="client-cell">{invoice.client}</td>
                        <td>{new Date(invoice.date).toLocaleDateString()}</td>
                        <td>{new Date(invoice.dueDate).toLocaleDateString()}</td>
                        <td className="amount-cell">₹{invoice.amount.toLocaleString()}</td>
                        <td className="items-cell">{invoice.items} items</td>
                        <td>
                          <span className={`badge ${getStatusBadge(invoice.status)}`}>
                            {invoice.status}
                          </span>
                        </td>
                        <td>
                          <div className="action-buttons">
                            <button className="icon-btn-small" title="View">
                              <Eye size={16} />
                            </button>
                            <button className="icon-btn-small" title="Edit">
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
            </div>
          )}

          {/* Proposals Tab */}
          {activeTab === 'proposals' && (
            <div className="table-container">
              <div className="table-wrapper">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Proposal ID</th>
                      <th>Client</th>
                      <th>Title</th>
                      <th>Value</th>
                      <th>Date</th>
                      <th>Valid Until</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {proposals.map(proposal => (
                      <tr key={proposal.id}>
                        <td className="invoice-id">{proposal.id}</td>
                        <td className="client-cell">{proposal.client}</td>
                        <td className="title-cell">{proposal.title}</td>
                        <td className="amount-cell">₹{proposal.value.toLocaleString()}</td>
                        <td>{new Date(proposal.date).toLocaleDateString()}</td>
                        <td>{new Date(proposal.validUntil).toLocaleDateString()}</td>
                        <td>
                          <span className={`badge ${getStatusBadge(proposal.status)}`}>
                            {proposal.status}
                          </span>
                        </td>
                        <td>
                          <div className="action-buttons">
                            <button className="icon-btn-small" title="View">
                              <Eye size={16} />
                            </button>
                            <button className="icon-btn-small" title="Edit">
                              <Edit size={16} />
                            </button>
                            <button className="icon-btn-small" title="Send">
                              <Send size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Payments Tab */}
          {activeTab === 'payments' && (
            <div className="table-container">
              <div className="table-wrapper">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Payment ID</th>
                      <th>Invoice</th>
                      <th>Client</th>
                      <th>Amount</th>
                      <th>Payment Method</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payments.map(payment => (
                      <tr key={payment.id}>
                        <td className="invoice-id">{payment.id}</td>
                        <td className="invoice-link">{payment.invoice}</td>
                        <td className="client-cell">{payment.client}</td>
                        <td className="amount-cell">₹{payment.amount.toLocaleString()}</td>
                        <td>{payment.method}</td>
                        <td>{new Date(payment.date).toLocaleDateString()}</td>
                        <td>
                          <span className={`badge ${getStatusBadge(payment.status)}`}>
                            {payment.status}
                          </span>
                        </td>
                        <td>
                          <div className="action-buttons">
                            <button className="icon-btn-small" title="View">
                              <Eye size={16} />
                            </button>
                            <button className="icon-btn-small" title="Download Receipt">
                              <Download size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Credit Notes Tab */}
          {activeTab === 'creditnotes' && (
            <div className="table-container">
              <div className="table-wrapper">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Credit Note ID</th>
                      <th>Invoice</th>
                      <th>Client</th>
                      <th>Amount</th>
                      <th>Reason</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {creditNotes.map(note => (
                      <tr key={note.id}>
                        <td className="invoice-id">{note.id}</td>
                        <td className="invoice-link">{note.invoice}</td>
                        <td className="client-cell">{note.client}</td>
                        <td className="amount-cell negative">-₹{note.amount.toLocaleString()}</td>
                        <td className="reason-cell">{note.reason}</td>
                        <td>{new Date(note.date).toLocaleDateString()}</td>
                        <td>
                          <span className={`badge ${getStatusBadge(note.status)}`}>
                            {note.status}
                          </span>
                        </td>
                        <td>
                          <div className="action-buttons">
                            <button className="icon-btn-small" title="View">
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sales;
