import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { Users, TrendingUp, Phone, Mail, MessageSquare, Calendar, DollarSign, Plus, Filter, Search } from 'lucide-react';
import '../styles/Dashboard.css';

const Customers = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('leads');

  // Leads Data
  const leadsData = [
    {
      name: 'Anil Gupta',
      company: 'TechVenture Pvt Ltd',
      email: 'anil@techventure.com',
      phone: '+91 98765 43210',
      source: 'Website',
      status: 'new',
      value: '₹5,00,000',
      assignedTo: 'Rahul Sharma',
      createdDate: '2024-01-20'
    },
    {
      name: 'Meera Patel',
      company: 'Digital Solutions Inc',
      email: 'meera@digitalsol.com',
      phone: '+91 98123 45678',
      source: 'Referral',
      status: 'contacted',
      value: '₹8,50,000',
      assignedTo: 'Priya Singh',
      createdDate: '2024-01-18'
    },
    {
      name: 'Karthik Reddy',
      company: 'CloudConnect Systems',
      email: 'karthik@cloudconnect.io',
      phone: '+91 99887 76655',
      source: 'LinkedIn',
      status: 'qualified',
      value: '₹12,00,000',
      assignedTo: 'Amit Patel',
      createdDate: '2024-01-15'
    },
    {
      name: 'Neha Kapoor',
      company: 'StartupHub Co',
      email: 'neha@startuphub.in',
      phone: '+91 97654 32109',
      source: 'Event',
      status: 'proposal',
      value: '₹6,75,000',
      assignedTo: 'Vikram Mehta',
      createdDate: '2024-01-12'
    },
  ];

  // Customer List Data
  const customerData = [
    {
      name: 'Tech Solutions Inc',
      contactPerson: 'Rajesh Kumar',
      email: 'rajesh@techsolutions.com',
      phone: '+91 98888 77777',
      projects: 5,
      revenue: '₹45,00,000',
      status: 'active',
      joinedDate: '2023-06-15',
      location: 'Mumbai'
    },
    {
      name: 'Global Enterprises',
      contactPerson: 'Sarah Johnson',
      email: 'sarah@globalent.com',
      phone: '+91 97777 66666',
      projects: 3,
      revenue: '₹28,50,000',
      status: 'active',
      joinedDate: '2023-08-20',
      location: 'Bangalore'
    },
    {
      name: 'Digital Agency Ltd',
      contactPerson: 'Amit Shah',
      email: 'amit@digitalagency.com',
      phone: '+91 96666 55555',
      projects: 2,
      revenue: '₹12,00,000',
      status: 'active',
      joinedDate: '2023-11-10',
      location: 'Delhi'
    },
    {
      name: 'Innovation Labs',
      contactPerson: 'Priya Desai',
      email: 'priya@innovationlabs.in',
      phone: '+91 95555 44444',
      projects: 1,
      revenue: '₹8,25,000',
      status: 'inactive',
      joinedDate: '2023-03-05',
      location: 'Pune'
    },
  ];

  // Communication Log Data
  const communicationData = [
    {
      customer: 'Tech Solutions Inc',
      contactPerson: 'Rajesh Kumar',
      type: 'Email',
      subject: 'Project Update - Phase 2',
      date: '2024-01-22',
      time: '10:30 AM',
      status: 'sent',
      notes: 'Sent project timeline and milestone updates'
    },
    {
      customer: 'Global Enterprises',
      contactPerson: 'Sarah Johnson',
      type: 'Phone Call',
      subject: 'Invoice Discussion',
      date: '2024-01-22',
      time: '2:15 PM',
      status: 'completed',
      notes: 'Discussed payment terms for INV-2024-002'
    },
    {
      customer: 'Digital Agency Ltd',
      contactPerson: 'Amit Shah',
      type: 'Meeting',
      subject: 'New Project Proposal',
      date: '2024-01-23',
      time: '11:00 AM',
      status: 'scheduled',
      notes: 'Presenting new service offerings and pricing'
    },
    {
      customer: 'Tech Solutions Inc',
      contactPerson: 'Rajesh Kumar',
      type: 'WhatsApp',
      subject: 'Quick Query Resolution',
      date: '2024-01-21',
      time: '4:45 PM',
      status: 'completed',
      notes: 'Resolved technical query about API integration'
    },
  ];

  // Stats
  const stats = [
    { 
      title: 'Total Leads', 
      value: '48', 
      change: '+12 this month', 
      icon: <TrendingUp size={24} />,
      color: 'primary'
    },
    { 
      title: 'Active Customers', 
      value: '32', 
      change: '+5 this month', 
      icon: <Users size={24} />,
      color: 'success'
    },
    { 
      title: 'Total Revenue', 
      value: '₹93.75L', 
      change: '+18.5%', 
      icon: <DollarSign size={24} />,
      color: 'info'
    },
    { 
      title: 'Conversations', 
      value: '156', 
      change: '28 this week', 
      icon: <MessageSquare size={24} />,
      color: 'warning'
    },
  ];

  return (
    <div className="dashboard-container">
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      <div className="main-content">
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <div className="page-content">
          <div className="page-header">
            <div>
              <h1>Customers</h1>
              <p>Customer Relationship Management</p>
            </div>
            <div className="page-header-right">
              <button className="btn btn-secondary">
                <Filter size={18} />
                Filter
              </button>
              <button className="btn btn-primary">
                <Plus size={18} />
                Add Customer
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
                className={activeTab === 'leads' ? 'tab active' : 'tab'}
                onClick={() => setActiveTab('leads')}
              >
                <TrendingUp size={18} />
                Leads
              </button>
              <button 
                className={activeTab === 'customers' ? 'tab active' : 'tab'}
                onClick={() => setActiveTab('customers')}
              >
                <Users size={18} />
                Customer List
              </button>
              <button 
                className={activeTab === 'communication' ? 'tab active' : 'tab'}
                onClick={() => setActiveTab('communication')}
              >
                <MessageSquare size={18} />
                Communication Log
              </button>
            </div>

            <div className="tab-content">
              {/* Leads Tab */}
              {activeTab === 'leads' && (
                <div className="table-container">
                  <div className="table-header">
                    <h3>Sales Leads Pipeline</h3>
                    <div className="header-actions">
                      <button className="btn btn-primary btn-sm">
                        <Plus size={16} />
                        Add Lead
                      </button>
                    </div>
                  </div>
                  <div className="table-wrapper">
                    <table className="data-table">
                      <thead>
                        <tr>
                          <th>Lead Name</th>
                          <th>Company</th>
                          <th>Contact</th>
                          <th>Source</th>
                          <th>Status</th>
                          <th>Value</th>
                          <th>Assigned To</th>
                          <th>Created</th>
                        </tr>
                      </thead>
                      <tbody>
                        {leadsData.map((lead, index) => (
                          <tr key={index}>
                            <td className="employee-cell">
                              <div className="employee-avatar">
                                {lead.name.split(' ').map(n => n[0]).join('')}
                              </div>
                              <span className="employee-name">{lead.name}</span>
                            </td>
                            <td className="client-cell">{lead.company}</td>
                            <td>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
                                  <Mail size={14} />
                                  {lead.email}
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
                                  <Phone size={14} />
                                  {lead.phone}
                                </div>
                              </div>
                            </td>
                            <td>{lead.source}</td>
                            <td>
                              <span className={`badge ${
                                lead.status === 'new' ? 'badge-info' :
                                lead.status === 'contacted' ? 'badge-warning' :
                                lead.status === 'qualified' ? 'badge-primary' :
                                'badge-success'
                              }`}>
                                {lead.status}
                              </span>
                            </td>
                            <td className="amount-cell positive">{lead.value}</td>
                            <td>{lead.assignedTo}</td>
                            <td>{lead.createdDate}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Customer List Tab */}
              {activeTab === 'customers' && (
                <div className="table-container">
                  <div className="table-header">
                    <h3>Customer Database</h3>
                    <div className="header-actions">
                      <div className="search-bar" style={{ marginRight: '1rem' }}>
                        <Search size={18} />
                        <input type="text" placeholder="Search customers..." />
                      </div>
                      <button className="btn btn-primary btn-sm">
                        <Plus size={16} />
                        Add Customer
                      </button>
                    </div>
                  </div>
                  <div className="table-wrapper">
                    <table className="data-table">
                      <thead>
                        <tr>
                          <th>Company Name</th>
                          <th>Contact Person</th>
                          <th>Email</th>
                          <th>Phone</th>
                          <th>Projects</th>
                          <th>Total Revenue</th>
                          <th>Location</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {customerData.map((customer, index) => (
                          <tr key={index}>
                            <td className="client-cell">{customer.name}</td>
                            <td className="employee-cell">
                              <div className="employee-avatar">
                                {customer.contactPerson.split(' ').map(n => n[0]).join('')}
                              </div>
                              <span className="employee-name">{customer.contactPerson}</span>
                            </td>
                            <td>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Mail size={16} />
                                {customer.email}
                              </div>
                            </td>
                            <td>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Phone size={16} />
                                {customer.phone}
                              </div>
                            </td>
                            <td className="days-cell">{customer.projects}</td>
                            <td className="amount-cell positive">{customer.revenue}</td>
                            <td>{customer.location}</td>
                            <td>
                              <span className={`badge ${customer.status === 'active' ? 'badge-success' : 'badge-secondary'}`}>
                                {customer.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Communication Log Tab */}
              {activeTab === 'communication' && (
                <div className="table-container">
                  <div className="table-header">
                    <h3>Communication History</h3>
                    <div className="header-actions">
                      <button className="btn btn-primary btn-sm">
                        <Plus size={16} />
                        Log Communication
                      </button>
                    </div>
                  </div>
                  <div className="table-wrapper">
                    <table className="data-table">
                      <thead>
                        <tr>
                          <th>Customer</th>
                          <th>Contact Person</th>
                          <th>Type</th>
                          <th>Subject</th>
                          <th>Date & Time</th>
                          <th>Status</th>
                          <th>Notes</th>
                        </tr>
                      </thead>
                      <tbody>
                        {communicationData.map((comm, index) => (
                          <tr key={index}>
                            <td className="client-cell">{comm.customer}</td>
                            <td className="employee-cell">
                              <div className="employee-avatar">
                                {comm.contactPerson.split(' ').map(n => n[0]).join('')}
                              </div>
                              <span className="employee-name">{comm.contactPerson}</span>
                            </td>
                            <td>
                              <span className="badge badge-info">{comm.type}</span>
                            </td>
                            <td className="title-cell">{comm.subject}</td>
                            <td>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                  <Calendar size={14} />
                                  {comm.date}
                                </div>
                                <div className="time-cell">{comm.time}</div>
                              </div>
                            </td>
                            <td>
                              <span className={`badge ${
                                comm.status === 'completed' ? 'badge-success' :
                                comm.status === 'scheduled' ? 'badge-warning' :
                                'badge-info'
                              }`}>
                                {comm.status}
                              </span>
                            </td>
                            <td className="reason-cell">{comm.notes}</td>
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

export default Customers;
