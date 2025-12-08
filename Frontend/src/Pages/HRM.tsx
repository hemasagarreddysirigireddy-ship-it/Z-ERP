import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { 
  UserCheck, Calendar, DollarSign, FileText, Clock, 
  CheckCircle, XCircle, Users, Download,
  Filter, Search, Plus, MoreVertical, Upload
} from 'lucide-react';

const HRM: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    const saved = localStorage.getItem('sidebarOpen');
    return saved ? JSON.parse(saved) : false;
  });

  const handleSidebarToggle = () => {
    const newState = !sidebarOpen;
    setSidebarOpen(newState);
    localStorage.setItem('sidebarOpen', JSON.stringify(newState));
  };
  const [activeTab, setActiveTab] = useState('attendance');

  const attendanceData = [
    { id: 1, name: 'John Doe', department: 'Development', checkIn: '09:00 AM', checkOut: '06:00 PM', status: 'Present', hours: 9 },
    { id: 2, name: 'Sarah Smith', department: 'Design', checkIn: '09:15 AM', checkOut: '06:15 PM', status: 'Present', hours: 9 },
    { id: 3, name: 'Mike Johnson', department: 'Marketing', checkIn: '-', checkOut: '-', status: 'Absent', hours: 0 },
    { id: 4, name: 'Emily Davis', department: 'Sales', checkIn: '09:30 AM', checkOut: '02:00 PM', status: 'Half Day', hours: 4.5 },
    { id: 5, name: 'Robert Wilson', department: 'Development', checkIn: '08:45 AM', checkOut: '05:45 PM', status: 'Present', hours: 9 },
  ];

  const payrollData = [
    { id: 1, name: 'John Doe', position: 'Senior Developer', basicSalary: 75000, allowances: 15000, deductions: 8000, netSalary: 82000, status: 'Paid' },
    { id: 2, name: 'Sarah Smith', position: 'UI/UX Designer', basicSalary: 65000, allowances: 12000, deductions: 7000, netSalary: 70000, status: 'Pending' },
    { id: 3, name: 'Mike Johnson', position: 'Marketing Manager', basicSalary: 70000, allowances: 13000, deductions: 7500, netSalary: 75500, status: 'Paid' },
    { id: 4, name: 'Emily Davis', position: 'Sales Executive', basicSalary: 55000, allowances: 10000, deductions: 6000, netSalary: 59000, status: 'Processing' },
  ];

  const leaveRequests = [
    { id: 1, employee: 'John Doe', type: 'Sick Leave', from: '2024-12-10', to: '2024-12-12', days: 3, status: 'Approved', reason: 'Medical emergency' },
    { id: 2, employee: 'Sarah Smith', type: 'Casual Leave', from: '2024-12-15', to: '2024-12-16', days: 2, status: 'Pending', reason: 'Personal work' },
    { id: 3, employee: 'Mike Johnson', type: 'Annual Leave', from: '2024-12-20', to: '2024-12-27', days: 8, status: 'Approved', reason: 'Family vacation' },
  ];

  const getStatusBadge = (status: string) => {
    const statusMap: { [key: string]: string } = {
      'Present': 'badge-success',
      'Absent': 'badge-danger',
      'Half Day': 'badge-warning',
      'Late': 'badge-warning',
      'Paid': 'badge-success',
      'Pending': 'badge-warning',
      'Processing': 'badge-info',
      'Approved': 'badge-success',
      'Rejected': 'badge-danger'
    };
    return statusMap[status] || 'badge-secondary';
  };

  return (
    <div className="dashboard-layout">
      <Sidebar isOpen={sidebarOpen} onToggle={handleSidebarToggle} />
      
      <div className={`main-content ${sidebarOpen ? 'sidebar-open' : ''}`}>
        <Header onMenuClick={handleSidebarToggle} />
        
        <div className="page-container">
          <div className="page-header">
            <div className="page-header-left">
              <UserCheck size={32} className="page-icon" />
              <div>
                <h1 className="page-title">Human Resource Management</h1>
                <p className="page-subtitle">Manage employees, attendance, payroll & documents</p>
              </div>
            </div>
            <div className="page-header-right">
              <button className="btn-secondary">
                <Download size={18} />
                Export Report
              </button>
              <button className="btn-primary">
                <Plus size={18} />
                Add Employee
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="stats-row">
            <div className="stat-card-mini">
              <div className="stat-card-mini-icon active">
                <Users size={24} />
              </div>
              <div className="stat-card-mini-content">
                <div className="stat-card-mini-value">156</div>
                <div className="stat-card-mini-label">Total Employees</div>
              </div>
            </div>
            <div className="stat-card-mini">
              <div className="stat-card-mini-icon completed">
                <CheckCircle size={24} />
              </div>
              <div className="stat-card-mini-content">
                <div className="stat-card-mini-value">142</div>
                <div className="stat-card-mini-label">Present Today</div>
              </div>
            </div>
            <div className="stat-card-mini">
              <div className="stat-card-mini-icon projects">
                <XCircle size={24} />
              </div>
              <div className="stat-card-mini-content">
                <div className="stat-card-mini-value">8</div>
                <div className="stat-card-mini-label">Absent Today</div>
              </div>
            </div>
            <div className="stat-card-mini">
              <div className="stat-card-mini-icon revenue">
                <Clock size={24} />
              </div>
              <div className="stat-card-mini-content">
                <div className="stat-card-mini-value">6</div>
                <div className="stat-card-mini-label">On Leave</div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="tabs">
            <button 
              className={`tab ${activeTab === 'attendance' ? 'tab-active' : ''}`}
              onClick={() => setActiveTab('attendance')}
            >
              <Calendar size={18} />
              Attendance
            </button>
            <button 
              className={`tab ${activeTab === 'payroll' ? 'tab-active' : ''}`}
              onClick={() => setActiveTab('payroll')}
            >
              <DollarSign size={18} />
              Salary & Payroll
            </button>
            <button 
              className={`tab ${activeTab === 'leaves' ? 'tab-active' : ''}`}
              onClick={() => setActiveTab('leaves')}
            >
              <FileText size={18} />
              Leave Requests
            </button>
            <button 
              className={`tab ${activeTab === 'documents' ? 'tab-active' : ''}`}
              onClick={() => setActiveTab('documents')}
            >
              <FileText size={18} />
              Documents
            </button>
          </div>

          {/* Search and Filter */}
          <div className="search-filter-bar">
            <div className="search-box">
              <Search size={18} />
              <input type="text" placeholder="Search employees..." />
            </div>
            <button className="btn-secondary">
              <Filter size={18} />
              Filter
            </button>
          </div>

          {/* Attendance Tab */}
          {activeTab === 'attendance' && (
            <div className="table-container">
              <div className="table-header">
                <h3>Today's Attendance - December 3, 2024</h3>
                <button className="btn-primary">
                  <Upload size={18} />
                  Mark Attendance
                </button>
              </div>
              <div className="table-wrapper">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Employee Name</th>
                      <th>Department</th>
                      <th>Check In</th>
                      <th>Check Out</th>
                      <th>Working Hours</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {attendanceData.map(record => (
                      <tr key={record.id}>
                        <td>
                          <div className="employee-cell">
                            <div className="employee-avatar">{record.name.charAt(0)}</div>
                            <span className="employee-name">{record.name}</span>
                          </div>
                        </td>
                        <td>{record.department}</td>
                        <td className="time-cell">{record.checkIn}</td>
                        <td className="time-cell">{record.checkOut}</td>
                        <td className="hours-cell">{record.hours}h</td>
                        <td>
                          <span className={`badge ${getStatusBadge(record.status)}`}>
                            {record.status}
                          </span>
                        </td>
                        <td>
                          <button className="icon-btn-small">
                            <MoreVertical size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Payroll Tab */}
          {activeTab === 'payroll' && (
            <div className="table-container">
              <div className="table-header">
                <h3>Monthly Payroll - December 2024</h3>
                <div className="header-actions">
                  <button className="btn-secondary">
                    <Download size={18} />
                    Download Report
                  </button>
                  <button className="btn-primary">
                    Process Payroll
                  </button>
                </div>
              </div>
              <div className="table-wrapper">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Employee</th>
                      <th>Position</th>
                      <th>Basic Salary</th>
                      <th>Allowances</th>
                      <th>Deductions</th>
                      <th>Net Salary</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payrollData.map(payroll => (
                      <tr key={payroll.id}>
                        <td>
                          <div className="employee-cell">
                            <div className="employee-avatar">{payroll.name.charAt(0)}</div>
                            <span className="employee-name">{payroll.name}</span>
                          </div>
                        </td>
                        <td>{payroll.position}</td>
                        <td className="amount-cell">₹{payroll.basicSalary.toLocaleString()}</td>
                        <td className="amount-cell positive">+₹{payroll.allowances.toLocaleString()}</td>
                        <td className="amount-cell negative">-₹{payroll.deductions.toLocaleString()}</td>
                        <td className="amount-cell net-salary">₹{payroll.netSalary.toLocaleString()}</td>
                        <td>
                          <span className={`badge ${getStatusBadge(payroll.status)}`}>
                            {payroll.status}
                          </span>
                        </td>
                        <td>
                          <button className="icon-btn-small">
                            <Download size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Leave Requests Tab */}
          {activeTab === 'leaves' && (
            <div className="table-container">
              <div className="table-header">
                <h3>Leave Requests</h3>
                <button className="btn-primary">
                  <Plus size={18} />
                  New Leave Request
                </button>
              </div>
              <div className="table-wrapper">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Employee</th>
                      <th>Leave Type</th>
                      <th>From Date</th>
                      <th>To Date</th>
                      <th>Days</th>
                      <th>Reason</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaveRequests.map(leave => (
                      <tr key={leave.id}>
                        <td>
                          <div className="employee-cell">
                            <div className="employee-avatar">{leave.employee.charAt(0)}</div>
                            <span className="employee-name">{leave.employee}</span>
                          </div>
                        </td>
                        <td>{leave.type}</td>
                        <td>{new Date(leave.from).toLocaleDateString()}</td>
                        <td>{new Date(leave.to).toLocaleDateString()}</td>
                        <td className="days-cell">{leave.days} days</td>
                        <td className="reason-cell">{leave.reason}</td>
                        <td>
                          <span className={`badge ${getStatusBadge(leave.status)}`}>
                            {leave.status}
                          </span>
                        </td>
                        <td>
                          <div className="action-buttons">
                            <button className="btn-approve" title="Approve">
                              <CheckCircle size={16} />
                            </button>
                            <button className="btn-reject" title="Reject">
                              <XCircle size={16} />
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

          {/* Documents Tab */}
          {activeTab === 'documents' && (
            <div className="documents-grid">
              <div className="document-category-card">
                <div className="category-icon">
                  <FileText size={32} />
                </div>
                <h3>Employment Contracts</h3>
                <p>156 documents</p>
                <button className="btn-secondary">View All</button>
              </div>
              <div className="document-category-card">
                <div className="category-icon">
                  <FileText size={32} />
                </div>
                <h3>ID Proofs</h3>
                <p>156 documents</p>
                <button className="btn-secondary">View All</button>
              </div>
              <div className="document-category-card">
                <div className="category-icon">
                  <FileText size={32} />
                </div>
                <h3>Certificates</h3>
                <p>89 documents</p>
                <button className="btn-secondary">View All</button>
              </div>
              <div className="document-category-card">
                <div className="category-icon">
                  <FileText size={32} />
                </div>
                <h3>Payslips</h3>
                <p>1,872 documents</p>
                <button className="btn-secondary">View All</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HRM;
