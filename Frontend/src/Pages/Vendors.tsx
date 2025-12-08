import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { Truck, DollarSign, FileText, Calendar, Phone, Mail, MapPin, Plus, Filter, Search, Download } from 'lucide-react';
import '../styles/Dashboard.css';

const Vendors = () => {
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    const saved = localStorage.getItem('sidebarOpen');
    return saved ? JSON.parse(saved) : false;
  });

  const handleSidebarToggle = () => {
    const newState = !sidebarOpen;
    setSidebarOpen(newState);
    localStorage.setItem('sidebarOpen', JSON.stringify(newState));
  };
  const [activeTab, setActiveTab] = useState('list');

  // Vendor List Data
  const vendorData = [
    {
      name: 'Office Supplies Co',
      contactPerson: 'Ramesh Iyer',
      email: 'ramesh@officesupplies.com',
      phone: '+91 98765 43210',
      category: 'Office Supplies',
      location: 'Mumbai',
      totalPaid: '₹3,20,000',
      outstandingAmount: '₹45,000',
      status: 'active',
      rating: 4.5
    },
    {
      name: 'CloudHost Services',
      contactPerson: 'Sarah Wilson',
      email: 'sarah@cloudhost.com',
      phone: '+91 97654 32109',
      category: 'IT Services',
      location: 'Bangalore',
      totalPaid: '₹8,50,000',
      outstandingAmount: '₹0',
      status: 'active',
      rating: 5.0
    },
    {
      name: 'Marketing Agency',
      contactPerson: 'Karan Singh',
      email: 'karan@marketingpro.in',
      phone: '+91 96543 21098',
      category: 'Marketing',
      location: 'Delhi',
      totalPaid: '₹15,00,000',
      outstandingAmount: '₹3,25,000',
      status: 'active',
      rating: 4.2
    },
    {
      name: 'Travel Corp',
      contactPerson: 'Priya Sharma',
      email: 'priya@travelcorp.com',
      phone: '+91 95432 10987',
      category: 'Travel Services',
      location: 'Pune',
      totalPaid: '₹5,40,000',
      outstandingAmount: '₹0',
      status: 'active',
      rating: 4.8
    },
  ];

  // Vendor Payments Data
  const paymentData = [
    {
      paymentId: 'VPY-001',
      vendor: 'Marketing Agency',
      invoiceNumber: 'VINV-2024-003',
      date: '2024-01-15',
      amount: '₹3,25,000',
      dueDate: '2024-01-30',
      status: 'pending',
      paymentMethod: 'Bank Transfer'
    },
    {
      paymentId: 'VPY-002',
      vendor: 'Office Supplies Co',
      invoiceNumber: 'VINV-2024-001',
      date: '2024-01-18',
      amount: '₹45,000',
      dueDate: '2024-01-25',
      status: 'pending',
      paymentMethod: 'Credit Card'
    },
    {
      paymentId: 'VPY-003',
      vendor: 'CloudHost Services',
      invoiceNumber: 'VINV-2024-002',
      date: '2024-01-12',
      amount: '₹8,50,000',
      dueDate: '2024-01-20',
      status: 'paid',
      paymentMethod: 'Bank Transfer'
    },
    {
      paymentId: 'VPY-004',
      vendor: 'Travel Corp',
      invoiceNumber: 'VINV-2024-004',
      date: '2024-01-20',
      amount: '₹1,80,000',
      dueDate: '2024-02-05',
      status: 'scheduled',
      paymentMethod: 'Debit Card'
    },
  ];

  // Documentation Data
  const documentationData = [
    {
      vendor: 'Office Supplies Co',
      documentType: 'Contract Agreement',
      uploadedDate: '2023-06-15',
      expiryDate: '2025-06-14',
      status: 'valid',
      fileSize: '2.5 MB'
    },
    {
      vendor: 'CloudHost Services',
      documentType: 'Service Level Agreement',
      uploadedDate: '2023-08-20',
      expiryDate: '2024-08-19',
      status: 'expiring',
      fileSize: '1.8 MB'
    },
    {
      vendor: 'Marketing Agency',
      documentType: 'NDA',
      uploadedDate: '2023-03-10',
      expiryDate: '2024-03-09',
      status: 'expiring',
      fileSize: '0.9 MB'
    },
    {
      vendor: 'Travel Corp',
      documentType: 'Tax Documents',
      uploadedDate: '2024-01-05',
      expiryDate: '2024-12-31',
      status: 'valid',
      fileSize: '3.2 MB'
    },
  ];

  // Stats
  const stats = [
    { 
      title: 'Total Vendors', 
      value: '28', 
      change: '+4 this month', 
      icon: <Truck size={24} />,
      color: 'primary'
    },
    { 
      title: 'Total Paid', 
      value: '₹32.10L', 
      change: '+12.5%', 
      icon: <DollarSign size={24} />,
      color: 'success'
    },
    { 
      title: 'Pending Payments', 
      value: '₹3.70L', 
      change: '2 overdue', 
      icon: <Calendar size={24} />,
      color: 'warning'
    },
    { 
      title: 'Active Contracts', 
      value: '18', 
      change: '3 expiring soon', 
      icon: <FileText size={24} />,
      color: 'info'
    },
  ];

  return (
    <div className="dashboard-container">
      <Sidebar isOpen={sidebarOpen} onToggle={handleSidebarToggle} />
      <div className={`main-content ${sidebarOpen ? 'sidebar-open' : ''}`}>
        <Header onMenuClick={handleSidebarToggle} />
        <div className="page-content">
          <div className="page-header">
            <div>
              <h1>Vendors</h1>
              <p>Vendor Management & Payments</p>
            </div>
            <div className="page-header-right">
              <button className="btn btn-secondary">
                <Filter size={18} />
                Filter
              </button>
              <button className="btn btn-secondary">
                <Download size={18} />
                Export
              </button>
              <button className="btn btn-primary">
                <Plus size={18} />
                Add Vendor
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className={`stat-card stat-card-${stat.color}`}>
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-details">
                  <h3>{stat.title}</h3>
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-change">{stat.change}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="tabs-container">
            <div className="tabs">
              <button 
                className={activeTab === 'list' ? 'tab active' : 'tab'}
                onClick={() => setActiveTab('list')}
              >
                <Truck size={18} />
                Vendor List
              </button>
              <button 
                className={activeTab === 'payments' ? 'tab active' : 'tab'}
                onClick={() => setActiveTab('payments')}
              >
                <DollarSign size={18} />
                Vendor Payments
              </button>
              <button 
                className={activeTab === 'documentation' ? 'tab active' : 'tab'}
                onClick={() => setActiveTab('documentation')}
              >
                <FileText size={18} />
                Documentation
              </button>
            </div>

            <div className="tab-content">
              {/* Vendor List Tab */}
              {activeTab === 'list' && (
                <div className="table-container">
                  <div className="table-header">
                    <h3>Vendor Database</h3>
                    <div className="header-actions">
                      <div className="search-bar" style={{ marginRight: '1rem' }}>
                        <Search size={18} />
                        <input type="text" placeholder="Search vendors..." />
                      </div>
                      <button className="btn btn-primary btn-sm">
                        <Plus size={16} />
                        Add Vendor
                      </button>
                    </div>
                  </div>
                  <div className="table-wrapper">
                    <table className="data-table">
                      <thead>
                        <tr>
                          <th>Vendor Name</th>
                          <th>Contact Person</th>
                          <th>Contact Info</th>
                          <th>Category</th>
                          <th>Location</th>
                          <th>Total Paid</th>
                          <th>Outstanding</th>
                          <th>Rating</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {vendorData.map((vendor, index) => (
                          <tr key={index}>
                            <td className="client-cell">{vendor.name}</td>
                            <td className="employee-cell">
                              <div className="employee-avatar">
                                {vendor.contactPerson.split(' ').map(n => n[0]).join('')}
                              </div>
                              <span className="employee-name">{vendor.contactPerson}</span>
                            </td>
                            <td>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
                                  <Mail size={14} />
                                  {vendor.email}
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
                                  <Phone size={14} />
                                  {vendor.phone}
                                </div>
                              </div>
                            </td>
                            <td>
                              <span className="badge badge-info">{vendor.category}</span>
                            </td>
                            <td>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <MapPin size={16} />
                                {vendor.location}
                              </div>
                            </td>
                            <td className="amount-cell positive">{vendor.totalPaid}</td>
                            <td className="amount-cell negative">
                              {vendor.outstandingAmount !== '₹0' ? vendor.outstandingAmount : '-'}
                            </td>
                            <td>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <div style={{ color: '#f59e0b', fontWeight: 700 }}>★ {vendor.rating}</div>
                              </div>
                            </td>
                            <td>
                              <span className="badge badge-success">{vendor.status}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Vendor Payments Tab */}
              {activeTab === 'payments' && (
                <div className="table-container">
                  <div className="table-header">
                    <h3>Payment History</h3>
                    <div className="header-actions">
                      <button className="btn btn-primary btn-sm">
                        <Plus size={16} />
                        Record Payment
                      </button>
                    </div>
                  </div>
                  <div className="table-wrapper">
                    <table className="data-table">
                      <thead>
                        <tr>
                          <th>Payment ID</th>
                          <th>Vendor</th>
                          <th>Invoice Number</th>
                          <th>Date</th>
                          <th>Amount</th>
                          <th>Due Date</th>
                          <th>Payment Method</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {paymentData.map((payment) => (
                          <tr key={payment.paymentId}>
                            <td><span className="invoice-id">{payment.paymentId}</span></td>
                            <td className="client-cell">{payment.vendor}</td>
                            <td><span className="invoice-link">{payment.invoiceNumber}</span></td>
                            <td>{payment.date}</td>
                            <td className="amount-cell negative">{payment.amount}</td>
                            <td>{payment.dueDate}</td>
                            <td>{payment.paymentMethod}</td>
                            <td>
                              <span className={`badge ${
                                payment.status === 'paid' ? 'badge-success' :
                                payment.status === 'scheduled' ? 'badge-info' :
                                'badge-warning'
                              }`}>
                                {payment.status}
                              </span>
                            </td>
                            <td>
                              <div className="action-buttons">
                                <button className="btn-approve" title="Mark as Paid">
                                  <DollarSign size={16} />
                                </button>
                                <button className="btn-reject" title="Download Invoice">
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

              {/* Documentation Tab */}
              {activeTab === 'documentation' && (
                <div className="table-container">
                  <div className="table-header">
                    <h3>Vendor Documents</h3>
                    <div className="header-actions">
                      <button className="btn btn-primary btn-sm">
                        <Plus size={16} />
                        Upload Document
                      </button>
                    </div>
                  </div>
                  <div className="table-wrapper">
                    <table className="data-table">
                      <thead>
                        <tr>
                          <th>Vendor Name</th>
                          <th>Document Type</th>
                          <th>Uploaded Date</th>
                          <th>Expiry Date</th>
                          <th>File Size</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {documentationData.map((doc, index) => (
                          <tr key={index}>
                            <td className="client-cell">{doc.vendor}</td>
                            <td className="title-cell">{doc.documentType}</td>
                            <td>{doc.uploadedDate}</td>
                            <td>{doc.expiryDate}</td>
                            <td>{doc.fileSize}</td>
                            <td>
                              <span className={`badge ${
                                doc.status === 'valid' ? 'badge-success' :
                                doc.status === 'expiring' ? 'badge-warning' :
                                'badge-danger'
                              }`}>
                                {doc.status}
                              </span>
                            </td>
                            <td>
                              <div className="action-buttons">
                                <button className="btn-approve" title="View Document">
                                  <FileText size={16} />
                                </button>
                                <button className="btn-reject" title="Download">
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
      </div>
    </div>
  );
};

export default Vendors;
