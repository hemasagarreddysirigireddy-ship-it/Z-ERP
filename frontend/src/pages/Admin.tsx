import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { Building, Globe, Users, Shield, Settings, Save, Plus, Edit, Trash2 } from 'lucide-react';
import '../styles/Dashboard.css';

const Admin = () => {
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    const saved = localStorage.getItem('sidebarOpen');
    return saved ? JSON.parse(saved) : false;
  });

  const handleSidebarToggle = () => {
    const newState = !sidebarOpen;
    setSidebarOpen(newState);
    localStorage.setItem('sidebarOpen', JSON.stringify(newState));
  };
  const [activeTab, setActiveTab] = useState('company');

  // Company Details State
  const companyDetails = {
    name: 'Zollid Technologies Pvt Ltd',
    email: 'contact@zollid.com',
    phone: '+91 98765 43210',
    address: 'Tower A, Business Park, Mumbai - 400001',
    website: 'https://erp.zollid.in',
    gst: 'GST27AAAA0000A1Z5',
    pan: 'AAAA0000A',
    registrationDate: '2020-01-15'
  };

  // Domain Setup Data
  const domainData = [
    {
      domain: 'erp.zollid.in',
      type: 'Primary',
      status: 'active',
      sslStatus: 'valid',
      expiryDate: '2025-06-15',
      autoRenew: true
    },
    {
      domain: 'app.zollid.com',
      type: 'Subdomain',
      status: 'active',
      sslStatus: 'valid',
      expiryDate: '2025-06-15',
      autoRenew: true
    },
    {
      domain: 'api.zollid.in',
      type: 'API Domain',
      status: 'active',
      sslStatus: 'valid',
      expiryDate: '2025-06-15',
      autoRenew: true
    },
  ];

  // User Permissions Data
  const usersData = [
    {
      name: 'Amit Patel',
      email: 'amit@zollid.com',
      role: 'Super Admin',
      permissions: ['All Access'],
      status: 'active',
      lastLogin: '2024-01-23 10:30 AM'
    },
    {
      name: 'Priya Singh',
      email: 'priya@zollid.com',
      role: 'Manager',
      permissions: ['Projects', 'HRM', 'Sales'],
      status: 'active',
      lastLogin: '2024-01-23 09:15 AM'
    },
    {
      name: 'Vikram Mehta',
      email: 'vikram@zollid.com',
      role: 'Team Lead',
      permissions: ['Projects', 'Tasks'],
      status: 'active',
      lastLogin: '2024-01-22 04:45 PM'
    },
    {
      name: 'Sarah Johnson',
      email: 'sarah@zollid.com',
      role: 'HR Manager',
      permissions: ['HRM', 'Recruitment'],
      status: 'active',
      lastLogin: '2024-01-23 08:00 AM'
    },
  ];

  // Roles Data
  const rolesData = [
    {
      role: 'Super Admin',
      description: 'Full system access with all permissions',
      users: 2,
      permissions: 'All Modules'
    },
    {
      role: 'Manager',
      description: 'Access to assigned modules with edit permissions',
      users: 5,
      permissions: 'Selected Modules'
    },
    {
      role: 'Team Lead',
      description: 'Team management and project oversight',
      users: 8,
      permissions: 'Projects, Tasks'
    },
    {
      role: 'Employee',
      description: 'Basic access to personal data and tasks',
      users: 45,
      permissions: 'Dashboard, Tasks'
    },
  ];

  // Stats
  const stats = [
    { 
      title: 'Total Users', 
      value: '60', 
      change: '+8 this month', 
      icon: <Users size={24} />,
      color: 'primary'
    },
    { 
      title: 'Active Domains', 
      value: '3', 
      change: 'All verified', 
      icon: <Globe size={24} />,
      color: 'success'
    },
    { 
      title: 'User Roles', 
      value: '7', 
      change: '2 custom', 
      icon: <Shield size={24} />,
      color: 'info'
    },
    { 
      title: 'System Health', 
      value: '99.8%', 
      change: 'Uptime', 
      icon: <Settings size={24} />,
      color: 'success'
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
              <h1>Admin Setup</h1>
              <p>System Configuration & User Management</p>
            </div>
            <div className="page-header-right">
              <button className="btn btn-secondary">
                <Settings size={18} />
                Settings
              </button>
              <button className="btn btn-primary">
                <Save size={18} />
                Save Changes
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
                className={activeTab === 'company' ? 'tab active' : 'tab'}
                onClick={() => setActiveTab('company')}
              >
                <Building size={18} />
                Company Details
              </button>
              <button 
                className={activeTab === 'domain' ? 'tab active' : 'tab'}
                onClick={() => setActiveTab('domain')}
              >
                <Globe size={18} />
                Domain Setup
              </button>
              <button 
                className={activeTab === 'users' ? 'tab active' : 'tab'}
                onClick={() => setActiveTab('users')}
              >
                <Users size={18} />
                User Management
              </button>
              <button 
                className={activeTab === 'permissions' ? 'tab active' : 'tab'}
                onClick={() => setActiveTab('permissions')}
              >
                <Shield size={18} />
                Roles & Permissions
              </button>
            </div>

            <div className="tab-content">
              {/* Company Details Tab */}
              {activeTab === 'company' && (
                <div className="table-container">
                  <div className="table-header">
                    <h3>Company Information</h3>
                    <div className="header-actions">
                      <button className="btn btn-primary btn-sm">
                        <Edit size={16} />
                        Edit Details
                      </button>
                    </div>
                  </div>
                  <div style={{ padding: '2rem' }}>
                    <div style={{ 
                      display: 'grid', 
                      gridTemplateColumns: 'repeat(2, 1fr)', 
                      gap: '2rem',
                      maxWidth: '900px'
                    }}>
                      <div>
                        <label style={{ 
                          display: 'block', 
                          fontSize: '0.875rem', 
                          fontWeight: 600,
                          color: '#64748b',
                          marginBottom: '0.5rem'
                        }}>Company Name</label>
                        <input 
                          type="text" 
                          value={companyDetails.name}
                          readOnly
                          style={{
                            width: '100%',
                            padding: '0.75rem',
                            background: 'rgba(100, 116, 139, 0.05)',
                            border: '1px solid #e5e7eb',
                            borderRadius: '8px',
                            fontSize: '1rem'
                          }}
                        />
                      </div>
                      <div>
                        <label style={{ 
                          display: 'block', 
                          fontSize: '0.875rem', 
                          fontWeight: 600,
                          color: '#64748b',
                          marginBottom: '0.5rem'
                        }}>Email Address</label>
                        <input 
                          type="email" 
                          value={companyDetails.email}
                          readOnly
                          style={{
                            width: '100%',
                            padding: '0.75rem',
                            background: 'rgba(100, 116, 139, 0.05)',
                            border: '1px solid #e5e7eb',
                            borderRadius: '8px',
                            fontSize: '1rem'
                          }}
                        />
                      </div>
                      <div>
                        <label style={{ 
                          display: 'block', 
                          fontSize: '0.875rem', 
                          fontWeight: 600,
                          color: '#64748b',
                          marginBottom: '0.5rem'
                        }}>Phone Number</label>
                        <input 
                          type="text" 
                          value={companyDetails.phone}
                          readOnly
                          style={{
                            width: '100%',
                            padding: '0.75rem',
                            background: 'rgba(100, 116, 139, 0.05)',
                            border: '1px solid #e5e7eb',
                            borderRadius: '8px',
                            fontSize: '1rem'
                          }}
                        />
                      </div>
                      <div>
                        <label style={{ 
                          display: 'block', 
                          fontSize: '0.875rem', 
                          fontWeight: 600,
                          color: '#64748b',
                          marginBottom: '0.5rem'
                        }}>Website</label>
                        <input 
                          type="text" 
                          value={companyDetails.website}
                          readOnly
                          style={{
                            width: '100%',
                            padding: '0.75rem',
                            background: 'rgba(100, 116, 139, 0.05)',
                            border: '1px solid #e5e7eb',
                            borderRadius: '8px',
                            fontSize: '1rem'
                          }}
                        />
                      </div>
                      <div style={{ gridColumn: '1 / -1' }}>
                        <label style={{ 
                          display: 'block', 
                          fontSize: '0.875rem', 
                          fontWeight: 600,
                          color: '#64748b',
                          marginBottom: '0.5rem'
                        }}>Address</label>
                        <input 
                          type="text" 
                          value={companyDetails.address}
                          readOnly
                          style={{
                            width: '100%',
                            padding: '0.75rem',
                            background: 'rgba(100, 116, 139, 0.05)',
                            border: '1px solid #e5e7eb',
                            borderRadius: '8px',
                            fontSize: '1rem'
                          }}
                        />
                      </div>
                      <div>
                        <label style={{ 
                          display: 'block', 
                          fontSize: '0.875rem', 
                          fontWeight: 600,
                          color: '#64748b',
                          marginBottom: '0.5rem'
                        }}>GST Number</label>
                        <input 
                          type="text" 
                          value={companyDetails.gst}
                          readOnly
                          style={{
                            width: '100%',
                            padding: '0.75rem',
                            background: 'rgba(100, 116, 139, 0.05)',
                            border: '1px solid #e5e7eb',
                            borderRadius: '8px',
                            fontSize: '1rem'
                          }}
                        />
                      </div>
                      <div>
                        <label style={{ 
                          display: 'block', 
                          fontSize: '0.875rem', 
                          fontWeight: 600,
                          color: '#64748b',
                          marginBottom: '0.5rem'
                        }}>PAN Number</label>
                        <input 
                          type="text" 
                          value={companyDetails.pan}
                          readOnly
                          style={{
                            width: '100%',
                            padding: '0.75rem',
                            background: 'rgba(100, 116, 139, 0.05)',
                            border: '1px solid #e5e7eb',
                            borderRadius: '8px',
                            fontSize: '1rem'
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Domain Setup Tab */}
              {activeTab === 'domain' && (
                <div className="table-container">
                  <div className="table-header">
                    <h3>Domain Configuration</h3>
                    <div className="header-actions">
                      <button className="btn btn-primary btn-sm">
                        <Plus size={16} />
                        Add Domain
                      </button>
                    </div>
                  </div>
                  <div className="table-wrapper">
                    <table className="data-table">
                      <thead>
                        <tr>
                          <th>Domain Name</th>
                          <th>Type</th>
                          <th>Status</th>
                          <th>SSL Status</th>
                          <th>Expiry Date</th>
                          <th>Auto Renew</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {domainData.map((domain, index) => (
                          <tr key={index}>
                            <td className="client-cell">{domain.domain}</td>
                            <td>
                              <span className="badge badge-info">{domain.type}</span>
                            </td>
                            <td>
                              <span className="badge badge-success">{domain.status}</span>
                            </td>
                            <td>
                              <span className="badge badge-success">{domain.sslStatus}</span>
                            </td>
                            <td>{domain.expiryDate}</td>
                            <td>
                              {domain.autoRenew ? (
                                <span style={{ color: '#00d97e' }}>✓ Enabled</span>
                              ) : (
                                <span style={{ color: '#ef4444' }}>✗ Disabled</span>
                              )}
                            </td>
                            <td>
                              <div className="action-buttons">
                                <button className="btn-approve" title="Edit">
                                  <Edit size={16} />
                                </button>
                                <button className="btn-reject" title="Configure">
                                  <Settings size={16} />
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

              {/* User Management Tab */}
              {activeTab === 'users' && (
                <div className="table-container">
                  <div className="table-header">
                    <h3>User Accounts</h3>
                    <div className="header-actions">
                      <button className="btn btn-primary btn-sm">
                        <Plus size={16} />
                        Add User
                      </button>
                    </div>
                  </div>
                  <div className="table-wrapper">
                    <table className="data-table">
                      <thead>
                        <tr>
                          <th>User</th>
                          <th>Email</th>
                          <th>Role</th>
                          <th>Permissions</th>
                          <th>Status</th>
                          <th>Last Login</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {usersData.map((user, index) => (
                          <tr key={index}>
                            <td className="employee-cell">
                              <div className="employee-avatar">
                                {user.name.split(' ').map(n => n[0]).join('')}
                              </div>
                              <span className="employee-name">{user.name}</span>
                            </td>
                            <td>{user.email}</td>
                            <td>
                              <span className="badge badge-info">{user.role}</span>
                            </td>
                            <td className="reason-cell">{user.permissions.join(', ')}</td>
                            <td>
                              <span className="badge badge-success">{user.status}</span>
                            </td>
                            <td className="time-cell">{user.lastLogin}</td>
                            <td>
                              <div className="action-buttons">
                                <button className="btn-approve" title="Edit User">
                                  <Edit size={16} />
                                </button>
                                <button className="btn-reject" title="Delete User">
                                  <Trash2 size={16} />
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

              {/* Roles & Permissions Tab */}
              {activeTab === 'permissions' && (
                <div className="table-container">
                  <div className="table-header">
                    <h3>Role Configuration</h3>
                    <div className="header-actions">
                      <button className="btn btn-primary btn-sm">
                        <Plus size={16} />
                        Create Role
                      </button>
                    </div>
                  </div>
                  <div className="table-wrapper">
                    <table className="data-table">
                      <thead>
                        <tr>
                          <th>Role Name</th>
                          <th>Description</th>
                          <th>Users Assigned</th>
                          <th>Permissions</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {rolesData.map((role, index) => (
                          <tr key={index}>
                            <td className="client-cell">{role.role}</td>
                            <td className="reason-cell">{role.description}</td>
                            <td className="days-cell">{role.users} users</td>
                            <td className="title-cell">{role.permissions}</td>
                            <td>
                              <div className="action-buttons">
                                <button className="btn-approve" title="Edit Role">
                                  <Edit size={16} />
                                </button>
                                <button className="btn-reject" title="Delete Role">
                                  <Trash2 size={16} />
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

export default Admin;
