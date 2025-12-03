import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { FileText, Clock, AlertTriangle, CheckCircle, Calendar, DollarSign, Users, Plus, Filter, Download } from 'lucide-react';
import '../styles/Dashboard.css';

const Contracts = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('active');

  // Active Contracts Data
  const activeContracts = [
    {
      contractId: 'CNT-2024-001',
      client: 'Tech Solutions Inc',
      title: 'Software Development Agreement',
      startDate: '2023-06-15',
      endDate: '2025-06-14',
      value: '₹45,00,000',
      status: 'active',
      paymentTerms: 'Monthly',
      projectManager: 'Amit Patel'
    },
    {
      contractId: 'CNT-2024-002',
      client: 'Global Enterprises',
      title: 'Digital Transformation Services',
      startDate: '2023-08-20',
      endDate: '2024-08-19',
      value: '₹28,50,000',
      status: 'active',
      paymentTerms: 'Quarterly',
      projectManager: 'Priya Singh'
    },
    {
      contractId: 'CNT-2024-003',
      client: 'Digital Agency Ltd',
      title: 'Maintenance & Support Contract',
      startDate: '2023-11-10',
      endDate: '2024-11-09',
      value: '₹12,00,000',
      status: 'active',
      paymentTerms: 'Annual',
      projectManager: 'Vikram Mehta'
    },
  ];

  // Renewal Contracts Data
  const renewalContracts = [
    {
      contractId: 'CNT-2023-018',
      client: 'Innovation Labs',
      title: 'Cloud Services Agreement',
      currentEndDate: '2024-03-15',
      proposedValue: '₹18,50,000',
      status: 'pending',
      renewalProbability: 85,
      contactPerson: 'Rajesh Kumar'
    },
    {
      contractId: 'CNT-2023-022',
      client: 'StartupHub Co',
      title: 'Consulting Services',
      currentEndDate: '2024-04-20',
      proposedValue: '₹12,75,000',
      status: 'negotiation',
      renewalProbability: 70,
      contactPerson: 'Neha Kapoor'
    },
    {
      contractId: 'CNT-2023-025',
      client: 'FinTech Solutions',
      title: 'Product Development Contract',
      currentEndDate: '2024-05-10',
      proposedValue: '₹32,00,000',
      status: 'approved',
      renewalProbability: 95,
      contactPerson: 'Anil Gupta'
    },
  ];

  // Expiry Alerts Data
  const expiryAlerts = [
    {
      contractId: 'CNT-2024-002',
      client: 'Global Enterprises',
      title: 'Digital Transformation Services',
      endDate: '2024-08-19',
      daysRemaining: 210,
      value: '₹28,50,000',
      priority: 'medium',
      lastContact: '2024-01-15'
    },
    {
      contractId: 'CNT-2023-018',
      client: 'Innovation Labs',
      title: 'Cloud Services Agreement',
      endDate: '2024-03-15',
      daysRemaining: 54,
      value: '₹18,50,000',
      priority: 'high',
      lastContact: '2024-01-20'
    },
    {
      contractId: 'CNT-2024-003',
      client: 'Digital Agency Ltd',
      title: 'Maintenance & Support Contract',
      endDate: '2024-11-09',
      daysRemaining: 292,
      value: '₹12,00,000',
      priority: 'low',
      lastContact: '2024-01-10'
    },
    {
      contractId: 'CNT-2023-022',
      client: 'StartupHub Co',
      title: 'Consulting Services',
      endDate: '2024-04-20',
      daysRemaining: 90,
      value: '₹12,75,000',
      priority: 'high',
      lastContact: '2024-01-18'
    },
  ];

  // Stats
  const stats = [
    { 
      title: 'Active Contracts', 
      value: '24', 
      change: '+3 this month', 
      icon: <FileText size={24} />,
      color: 'primary'
    },
    { 
      title: 'Pending Renewals', 
      value: '8', 
      change: '3 expiring soon', 
      icon: <Clock size={24} />,
      color: 'warning'
    },
    { 
      title: 'Total Contract Value', 
      value: '₹2.85 Cr', 
      change: '+15.2%', 
      icon: <DollarSign size={24} />,
      color: 'success'
    },
    { 
      title: 'Expiry Alerts', 
      value: '5', 
      change: '2 urgent', 
      icon: <AlertTriangle size={24} />,
      color: 'danger'
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
              <h1>Contracts</h1>
              <p>Contract Management & Renewals</p>
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
                New Contract
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
                className={activeTab === 'active' ? 'tab active' : 'tab'}
                onClick={() => setActiveTab('active')}
              >
                <CheckCircle size={18} />
                Active Contracts
              </button>
              <button 
                className={activeTab === 'renewals' ? 'tab active' : 'tab'}
                onClick={() => setActiveTab('renewals')}
              >
                <Clock size={18} />
                Renewals
              </button>
              <button 
                className={activeTab === 'alerts' ? 'tab active' : 'tab'}
                onClick={() => setActiveTab('alerts')}
              >
                <AlertTriangle size={18} />
                Expiry Alerts
              </button>
            </div>

            <div className="tab-content">
              {/* Active Contracts Tab */}
              {activeTab === 'active' && (
                <div className="table-container">
                  <div className="table-header">
                    <h3>Active Contracts</h3>
                    <div className="header-actions">
                      <button className="btn btn-primary btn-sm">
                        <Plus size={16} />
                        Add Contract
                      </button>
                    </div>
                  </div>
                  <div className="table-wrapper">
                    <table className="data-table">
                      <thead>
                        <tr>
                          <th>Contract ID</th>
                          <th>Client</th>
                          <th>Title</th>
                          <th>Start Date</th>
                          <th>End Date</th>
                          <th>Contract Value</th>
                          <th>Payment Terms</th>
                          <th>Project Manager</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {activeContracts.map((contract) => (
                          <tr key={contract.contractId}>
                            <td><span className="invoice-id">{contract.contractId}</span></td>
                            <td className="client-cell">{contract.client}</td>
                            <td className="title-cell">{contract.title}</td>
                            <td>{contract.startDate}</td>
                            <td>{contract.endDate}</td>
                            <td className="amount-cell positive">{contract.value}</td>
                            <td>{contract.paymentTerms}</td>
                            <td>{contract.projectManager}</td>
                            <td>
                              <span className="badge badge-success">{contract.status}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Renewals Tab */}
              {activeTab === 'renewals' && (
                <div className="table-container">
                  <div className="table-header">
                    <h3>Contract Renewals</h3>
                    <div className="header-actions">
                      <button className="btn btn-primary btn-sm">
                        <Users size={16} />
                        Initiate Renewal
                      </button>
                    </div>
                  </div>
                  <div className="table-wrapper">
                    <table className="data-table">
                      <thead>
                        <tr>
                          <th>Contract ID</th>
                          <th>Client</th>
                          <th>Title</th>
                          <th>Current End Date</th>
                          <th>Proposed Value</th>
                          <th>Renewal Probability</th>
                          <th>Contact Person</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {renewalContracts.map((contract) => (
                          <tr key={contract.contractId}>
                            <td><span className="invoice-id">{contract.contractId}</span></td>
                            <td className="client-cell">{contract.client}</td>
                            <td className="title-cell">{contract.title}</td>
                            <td>{contract.currentEndDate}</td>
                            <td className="amount-cell positive">{contract.proposedValue}</td>
                            <td>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <div style={{ 
                                  width: '80px', 
                                  height: '8px', 
                                  background: '#e5e7eb', 
                                  borderRadius: '4px',
                                  overflow: 'hidden'
                                }}>
                                  <div style={{ 
                                    width: `${contract.renewalProbability}%`, 
                                    height: '100%', 
                                    background: contract.renewalProbability >= 90 ? '#00d97e' : contract.renewalProbability >= 70 ? '#f59e0b' : '#ef4444',
                                    borderRadius: '4px'
                                  }}></div>
                                </div>
                                <span className="hours-cell">{contract.renewalProbability}%</span>
                              </div>
                            </td>
                            <td>{contract.contactPerson}</td>
                            <td>
                              <span className={`badge ${
                                contract.status === 'approved' ? 'badge-success' :
                                contract.status === 'negotiation' ? 'badge-warning' :
                                'badge-info'
                              }`}>
                                {contract.status}
                              </span>
                            </td>
                            <td>
                              <div className="action-buttons">
                                <button className="btn-approve" title="Approve">
                                  <CheckCircle size={16} />
                                </button>
                                <button className="btn-reject" title="Follow Up">
                                  <Calendar size={16} />
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

              {/* Expiry Alerts Tab */}
              {activeTab === 'alerts' && (
                <div className="table-container">
                  <div className="table-header">
                    <h3>Contract Expiry Alerts</h3>
                    <div className="header-actions">
                      <button className="btn btn-secondary btn-sm">
                        <Filter size={16} />
                        Filter by Priority
                      </button>
                    </div>
                  </div>
                  <div className="table-wrapper">
                    <table className="data-table">
                      <thead>
                        <tr>
                          <th>Contract ID</th>
                          <th>Client</th>
                          <th>Title</th>
                          <th>End Date</th>
                          <th>Days Remaining</th>
                          <th>Contract Value</th>
                          <th>Priority</th>
                          <th>Last Contact</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {expiryAlerts.map((alert) => (
                          <tr key={alert.contractId}>
                            <td><span className="invoice-id">{alert.contractId}</span></td>
                            <td className="client-cell">{alert.client}</td>
                            <td className="title-cell">{alert.title}</td>
                            <td>{alert.endDate}</td>
                            <td className="days-cell">
                              <span style={{ 
                                color: alert.daysRemaining < 60 ? '#ef4444' : alert.daysRemaining < 180 ? '#f59e0b' : '#00d97e',
                                fontWeight: 700
                              }}>
                                {alert.daysRemaining} days
                              </span>
                            </td>
                            <td className="amount-cell positive">{alert.value}</td>
                            <td>
                              <span className={`badge ${
                                alert.priority === 'high' ? 'badge-danger' :
                                alert.priority === 'medium' ? 'badge-warning' :
                                'badge-info'
                              }`}>
                                {alert.priority}
                              </span>
                            </td>
                            <td>{alert.lastContact}</td>
                            <td>
                              <div className="action-buttons">
                                <button className="btn-approve" title="Contact Client">
                                  <Users size={16} />
                                </button>
                                <button className="btn-reject" title="Set Reminder">
                                  <Clock size={16} />
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

export default Contracts;
