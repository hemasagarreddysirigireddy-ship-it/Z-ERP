import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { 
  Users, UserPlus, Calendar, Clock, FileText, DollarSign, 
  TrendingUp, Award, Briefcase, Plane, Bell, Download, 
  Upload, Search, Filter, Plus, MoreVertical, CheckCircle, 
  XCircle, Edit2, Trash2, Eye, MapPin, Fingerprint, Smartphone,
  Mail, Phone, AlertCircle, Settings, ChevronRight, Star,
  BarChart3, PieChart, Target, Gift, CreditCard, Send
} from 'lucide-react';
import '../styles/HRM.css';

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
  
  const [activeTab, setActiveTab] = useState('employees');
  const [activeSubTab, setActiveSubTab] = useState('all');

  // Employee data
  const employees = [
    { 
      id: 1, name: 'John Doe', email: 'john@company.com', phone: '+1 234-567-8900',
      department: 'Development', designation: 'Senior Developer', status: 'Active',
      joiningDate: '2022-01-15', location: 'New York', shift: 'Day', manager: 'Robert Smith',
      experience: '5 years', salary: 82000
    },
    { 
      id: 2, name: 'Sarah Smith', email: 'sarah@company.com', phone: '+1 234-567-8901',
      department: 'Design', designation: 'UI/UX Lead', status: 'Active',
      joiningDate: '2021-06-10', location: 'San Francisco', shift: 'Day', manager: 'Emily Davis',
      experience: '6 years', salary: 70000
    },
    { 
      id: 3, name: 'Mike Johnson', email: 'mike@company.com', phone: '+1 234-567-8902',
      department: 'Marketing', designation: 'Marketing Manager', status: 'On Probation',
      joiningDate: '2024-10-01', location: 'Chicago', shift: 'Day', manager: 'David Brown',
      experience: '3 years', salary: 75500
    },
    { 
      id: 4, name: 'Emily Davis', email: 'emily@company.com', phone: '+1 234-567-8903',
      department: 'Sales', designation: 'Sales Executive', status: 'Active',
      joiningDate: '2023-03-20', location: 'Boston', shift: 'Day', manager: 'Sarah Smith',
      experience: '2 years', salary: 59000
    },
  ];

  // Attendance data
  const attendanceData = [
    { id: 1, name: 'John Doe', department: 'Development', checkIn: '09:00 AM', checkOut: '06:00 PM', status: 'Present', hours: 9, type: 'Biometric', location: 'Office' },
    { id: 2, name: 'Sarah Smith', department: 'Design', checkIn: '09:15 AM', checkOut: '06:15 PM', status: 'Present', hours: 9, type: 'Web', location: 'Office' },
    { id: 3, name: 'Mike Johnson', department: 'Marketing', checkIn: '10:30 AM', checkOut: '06:00 PM', status: 'Late', hours: 7.5, type: 'Mobile', location: 'Office' },
    { id: 4, name: 'Emily Davis', department: 'Sales', checkIn: '08:45 AM', checkOut: '05:00 PM', status: 'Field', hours: 8, type: 'GPS', location: 'Client Site' },
    { id: 5, name: 'Robert Wilson', department: 'Development', checkIn: '-', checkOut: '-', status: 'Absent', hours: 0, type: '-', location: '-' },
  ];

  // Leave data
  const leaveRequests = [
    { id: 1, employee: 'John Doe', type: 'Casual Leave', from: '2024-12-10', to: '2024-12-12', days: 3, status: 'Approved', reason: 'Family function', balance: 8 },
    { id: 2, employee: 'Sarah Smith', type: 'Sick Leave', from: '2024-12-15', to: '2024-12-16', days: 2, status: 'Pending', reason: 'Medical checkup', balance: 10 },
    { id: 3, employee: 'Mike Johnson', type: 'Earned Leave', from: '2024-12-20', to: '2024-12-27', days: 8, status: 'Approved', reason: 'Vacation', balance: 15 },
    { id: 4, employee: 'Emily Davis', type: 'WFH', from: '2024-12-05', to: '2024-12-05', days: 1, status: 'Approved', reason: 'Home renovation', balance: 5 },
  ];

  // Payroll data
  const payrollData = [
    { id: 1, name: 'John Doe', empId: 'EMP001', department: 'Development', basic: 60000, hra: 12000, allowances: 10000, pf: 7200, esi: 800, tds: 2000, gross: 82000, net: 72000, status: 'Paid' },
    { id: 2, name: 'Sarah Smith', empId: 'EMP002', department: 'Design', basic: 50000, hra: 10000, allowances: 10000, pf: 6000, esi: 700, tds: 1800, gross: 70000, net: 61500, status: 'Processing' },
    { id: 3, name: 'Mike Johnson', empId: 'EMP003', department: 'Marketing', basic: 55000, hra: 11000, allowances: 9500, pf: 6600, esi: 750, tds: 2150, gross: 75500, net: 66000, status: 'Pending' },
    { id: 4, name: 'Emily Davis', empId: 'EMP004', department: 'Sales', basic: 45000, hra: 9000, allowances: 5000, pf: 5400, esi: 600, tds: 1500, gross: 59000, net: 51500, status: 'Paid' },
  ];

  // Performance data
  const performanceData = [
    { id: 1, employee: 'John Doe', department: 'Development', kpi: 'Code Quality', target: 90, achieved: 92, rating: 4.6, status: 'Excellent', reviewer: 'Robert Smith', date: '2024-11-30' },
    { id: 2, employee: 'Sarah Smith', department: 'Design', kpi: 'Design Delivery', target: 85, achieved: 88, rating: 4.4, status: 'Good', reviewer: 'Emily Davis', date: '2024-11-28' },
    { id: 3, employee: 'Mike Johnson', department: 'Marketing', kpi: 'Campaign ROI', target: 80, achieved: 75, rating: 3.8, status: 'Average', reviewer: 'David Brown', date: '2024-11-25' },
    { id: 4, employee: 'Emily Davis', department: 'Sales', kpi: 'Sales Target', target: 100, achieved: 105, rating: 4.8, status: 'Excellent', reviewer: 'Sarah Smith', date: '2024-11-29' },
  ];

  // Travel requests
  const travelRequests = [
    { id: 1, employee: 'John Doe', from: 'New York', to: 'Boston', startDate: '2024-12-15', endDate: '2024-12-17', purpose: 'Client Meeting', advance: 5000, status: 'Approved' },
    { id: 2, employee: 'Sarah Smith', from: 'San Francisco', to: 'Seattle', startDate: '2024-12-20', endDate: '2024-12-22', purpose: 'Conference', advance: 8000, status: 'Pending' },
    { id: 3, employee: 'Mike Johnson', from: 'Chicago', to: 'Dallas', startDate: '2024-12-10', endDate: '2024-12-12', purpose: 'Training', advance: 6000, status: 'Approved' },
  ];

  // Documents/Letters
  const hrLetters = [
    { id: 1, type: 'Offer Letter', employee: 'New Hire', generatedBy: 'HR Admin', date: '2024-12-01', status: 'Generated' },
    { id: 2, type: 'Appointment Letter', employee: 'John Doe', generatedBy: 'HR Admin', date: '2024-11-28', status: 'Sent' },
    { id: 3, type: 'Experience Letter', employee: 'Former Employee', generatedBy: 'HR Manager', date: '2024-11-25', status: 'Completed' },
    { id: 4, type: 'Salary Certificate', employee: 'Sarah Smith', generatedBy: 'HR Admin', date: '2024-11-20', status: 'Generated' },
  ];

  return (
    <div className="dashboard-layout">
      <Sidebar isOpen={sidebarOpen} onToggle={handleSidebarToggle} />
      
      <div className={`main-content ${sidebarOpen ? 'sidebar-open' : ''}`}>
        <Header onMenuClick={handleSidebarToggle} />
        
        <div className="page-container">
          {/* Page Header */}
          <div className="page-header">
            <div className="page-header-left">
              <Users size={32} className="page-icon" />
              <div>
                <h1 className="page-title">Human Resource Management</h1>
                <p className="page-subtitle">Manage employees, attendance, payroll, leaves & performance</p>
              </div>
            </div>
            <div className="page-header-right">
              <button className="btn-secondary">
                <Download size={18} />
                Export Report
              </button>
              <button className="btn-primary">
                <UserPlus size={18} />
                Add Employee
              </button>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="hrm-stats-overview">
            <div className="hrm-stat-card">
              <div className="hrm-stat-icon blue">
                <Users size={24} />
              </div>
              <div className="hrm-stat-content">
                <div className="hrm-stat-value">156</div>
                <div className="hrm-stat-label">Total Employees</div>
                <div className="hrm-stat-change positive">+12 this month</div>
              </div>
            </div>
            <div className="hrm-stat-card">
              <div className="hrm-stat-icon green">
                <CheckCircle size={24} />
              </div>
              <div className="hrm-stat-content">
                <div className="hrm-stat-value">142</div>
                <div className="hrm-stat-label">Present Today</div>
                <div className="hrm-stat-change">91.0% attendance</div>
              </div>
            </div>
            <div className="hrm-stat-card">
              <div className="hrm-stat-icon orange">
                <Calendar size={24} />
              </div>
              <div className="hrm-stat-content">
                <div className="hrm-stat-value">8</div>
                <div className="hrm-stat-label">On Leave</div>
                <div className="hrm-stat-change">6 approved</div>
              </div>
            </div>
            <div className="hrm-stat-card">
              <div className="hrm-stat-icon purple">
                <DollarSign size={24} />
              </div>
              <div className="hrm-stat-content">
                <div className="hrm-stat-value">₹12.5M</div>
                <div className="hrm-stat-label">Monthly Payroll</div>
                <div className="hrm-stat-change">For 156 employees</div>
              </div>
            </div>
          </div>

          {/* Main Tabs */}
          <div className="hrm-tabs">
            <button 
              className={`hrm-tab ${activeTab === 'employees' ? 'active' : ''}`}
              onClick={() => { setActiveTab('employees'); setActiveSubTab('all'); }}
            >
              <Users size={18} />
              Employee Management
            </button>
            <button 
              className={`hrm-tab ${activeTab === 'attendance' ? 'active' : ''}`}
              onClick={() => { setActiveTab('attendance'); setActiveSubTab('today'); }}
            >
              <Clock size={18} />
              Attendance
            </button>
            <button 
              className={`hrm-tab ${activeTab === 'leaves' ? 'active' : ''}`}
              onClick={() => { setActiveTab('leaves'); setActiveSubTab('requests'); }}
            >
              <Calendar size={18} />
              Leave Management
            </button>
            <button 
              className={`hrm-tab ${activeTab === 'payroll' ? 'active' : ''}`}
              onClick={() => { setActiveTab('payroll'); setActiveSubTab('salary'); }}
            >
              <DollarSign size={18} />
              Payroll
            </button>
            <button 
              className={`hrm-tab ${activeTab === 'performance' ? 'active' : ''}`}
              onClick={() => { setActiveTab('performance'); setActiveSubTab('reviews'); }}
            >
              <TrendingUp size={18} />
              Performance
            </button>
            <button 
              className={`hrm-tab ${activeTab === 'letters' ? 'active' : ''}`}
              onClick={() => { setActiveTab('letters'); setActiveSubTab('generate'); }}
            >
              <FileText size={18} />
              HR Letters
            </button>
            <button 
              className={`hrm-tab ${activeTab === 'travel' ? 'active' : ''}`}
              onClick={() => { setActiveTab('travel'); setActiveSubTab('requests'); }}
            >
              <Plane size={18} />
              Travel & Expense
            </button>
            <button 
              className={`hrm-tab ${activeTab === 'automation' ? 'active' : ''}`}
              onClick={() => { setActiveTab('automation'); setActiveSubTab('notifications'); }}
            >
              <Bell size={18} />
              Automation
            </button>
          </div>

          {/* ===== EMPLOYEE MANAGEMENT TAB ===== */}
          {activeTab === 'employees' && (
            <div className="tab-content">
              <div className="tab-content-header">
                <div className="header-left">
                  <h2>Employee Management</h2>
                  <p>Manage employee profiles, documents & onboarding</p>
                </div>
                <div className="toolbar-actions">
                  <div className="search-box">
                    <Search size={18} />
                    <input type="text" placeholder="Search employees..." />
                  </div>
                  <button className="btn-secondary">
                    <Filter size={18} />
                    Filter
                  </button>
                  <button className="btn-primary">
                    <UserPlus size={18} />
                    Add Employee
                  </button>
                </div>
              </div>

              {/* Sub tabs */}
              <div className="sub-tabs">
                <button className={`sub-tab ${activeSubTab === 'all' ? 'active' : ''}`} onClick={() => setActiveSubTab('all')}>
                  All Employees
                </button>
                <button className={`sub-tab ${activeSubTab === 'active' ? 'active' : ''}`} onClick={() => setActiveSubTab('active')}>
                  Active
                </button>
                <button className={`sub-tab ${activeSubTab === 'probation' ? 'active' : ''}`} onClick={() => setActiveSubTab('probation')}>
                  On Probation
                </button>
                <button className={`sub-tab ${activeSubTab === 'onboarding' ? 'active' : ''}`} onClick={() => setActiveSubTab('onboarding')}>
                  Onboarding
                </button>
                <button className={`sub-tab ${activeSubTab === 'exit' ? 'active' : ''}`} onClick={() => setActiveSubTab('exit')}>
                  Exit Process
                </button>
              </div>

              {/* Employee Grid */}
              <div className="employee-grid">
                {employees.map(emp => (
                  <div key={emp.id} className="employee-card">
                    <div className="employee-card-header">
                      <div className="employee-avatar-wrapper">
                        <div className="employee-avatar large">{emp.name.charAt(0)}</div>
                        <div className={`status-indicator ${emp.status === 'Active' ? 'online' : 'away'}`}></div>
                      </div>
                      <div className="employee-card-actions">
                        <button className="icon-btn-small"><Edit2 size={14} /></button>
                        <button className="icon-btn-small"><MoreVertical size={14} /></button>
                      </div>
                    </div>
                    <div className="employee-card-body">
                      <h3 className="employee-name">{emp.name}</h3>
                      <p className="employee-designation">{emp.designation}</p>
                      <span className={`status-badge ${emp.status === 'Active' ? 'active' : 'probation'}`}>
                        {emp.status}
                      </span>
                      
                      <div className="employee-details">
                        <div className="detail-row">
                          <Mail size={14} />
                          <span>{emp.email}</span>
                        </div>
                        <div className="detail-row">
                          <Phone size={14} />
                          <span>{emp.phone}</span>
                        </div>
                        <div className="detail-row">
                          <Briefcase size={14} />
                          <span>{emp.department}</span>
                        </div>
                        <div className="detail-row">
                          <MapPin size={14} />
                          <span>{emp.location}</span>
                        </div>
                        <div className="detail-row">
                          <Calendar size={14} />
                          <span>Joined: {emp.joiningDate}</span>
                        </div>
                      </div>
                    </div>
                    <div className="employee-card-footer">
                      <button className="btn-secondary small">
                        <Eye size={14} />
                        View Profile
                      </button>
                      <button className="btn-primary small">
                        <FileText size={14} />
                        Documents
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ===== ATTENDANCE MANAGEMENT TAB ===== */}
          {activeTab === 'attendance' && (
            <div className="tab-content">
              <div className="tab-content-header">
                <div className="header-left">
                  <h2>Attendance Management</h2>
                  <p>Track employee attendance, shifts & overtime</p>
                </div>
                <div className="toolbar-actions">
                  <button className="btn-secondary">
                    <Download size={18} />
                    Export
                  </button>
                  <button className="btn-primary">
                    <Clock size={18} />
                    Mark Attendance
                  </button>
                </div>
              </div>

              {/* Sub tabs */}
              <div className="sub-tabs">
                <button className={`sub-tab ${activeSubTab === 'today' ? 'active' : ''}`} onClick={() => setActiveSubTab('today')}>
                  Today's Attendance
                </button>
                <button className={`sub-tab ${activeSubTab === 'monthly' ? 'active' : ''}`} onClick={() => setActiveSubTab('monthly')}>
                  Monthly Summary
                </button>
                <button className={`sub-tab ${activeSubTab === 'shifts' ? 'active' : ''}`} onClick={() => setActiveSubTab('shifts')}>
                  Shift Management
                </button>
                <button className={`sub-tab ${activeSubTab === 'overtime' ? 'active' : ''}`} onClick={() => setActiveSubTab('overtime')}>
                  Overtime
                </button>
              </div>

              {/* Attendance Stats */}
              <div className="attendance-stats">
                <div className="attendance-stat-card">
                  <div className="stat-icon-wrapper green">
                    <CheckCircle size={20} />
                  </div>
                  <div className="stat-info">
                    <div className="stat-value">142</div>
                    <div className="stat-label">Present</div>
                  </div>
                </div>
                <div className="attendance-stat-card">
                  <div className="stat-icon-wrapper red">
                    <XCircle size={20} />
                  </div>
                  <div className="stat-info">
                    <div className="stat-value">5</div>
                    <div className="stat-label">Absent</div>
                  </div>
                </div>
                <div className="attendance-stat-card">
                  <div className="stat-icon-wrapper orange">
                    <AlertCircle size={20} />
                  </div>
                  <div className="stat-info">
                    <div className="stat-value">3</div>
                    <div className="stat-label">Late Entry</div>
                  </div>
                </div>
                <div className="attendance-stat-card">
                  <div className="stat-icon-wrapper blue">
                    <MapPin size={20} />
                  </div>
                  <div className="stat-info">
                    <div className="stat-value">6</div>
                    <div className="stat-label">Field Staff</div>
                  </div>
                </div>
              </div>

              {/* Attendance Table */}
              <div className="data-table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Employee</th>
                      <th>Department</th>
                      <th>Check In</th>
                      <th>Check Out</th>
                      <th>Hours</th>
                      <th>Type</th>
                      <th>Location</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {attendanceData.map(record => (
                      <tr key={record.id}>
                        <td>
                          <div className="user-cell">
                            <div className="user-avatar">{record.name.charAt(0)}</div>
                            <span>{record.name}</span>
                          </div>
                        </td>
                        <td>{record.department}</td>
                        <td className="time-cell">{record.checkIn}</td>
                        <td className="time-cell">{record.checkOut}</td>
                        <td className="hours-cell">{record.hours}h</td>
                        <td>
                          <span className="attendance-type">
                            {record.type === 'Biometric' && <Fingerprint size={14} />}
                            {record.type === 'Mobile' && <Smartphone size={14} />}
                            {record.type === 'GPS' && <MapPin size={14} />}
                            {record.type}
                          </span>
                        </td>
                        <td>{record.location}</td>
                        <td>
                          <span className={`status-badge ${
                            record.status === 'Present' ? 'present' : 
                            record.status === 'Late' ? 'late' :
                            record.status === 'Field' ? 'field' : 'absent'
                          }`}>
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

          {/* ===== LEAVE MANAGEMENT TAB ===== */}
          {activeTab === 'leaves' && (
            <div className="tab-content">
              <div className="tab-content-header">
                <div className="header-left">
                  <h2>Leave Management</h2>
                  <p>Manage leave requests, balances & policies</p>
                </div>
                <div className="toolbar-actions">
                  <button className="btn-secondary">
                    <Calendar size={18} />
                    Leave Calendar
                  </button>
                  <button className="btn-primary">
                    <Plus size={18} />
                    Apply Leave
                  </button>
                </div>
              </div>

              {/* Sub tabs */}
              <div className="sub-tabs">
                <button className={`sub-tab ${activeSubTab === 'requests' ? 'active' : ''}`} onClick={() => setActiveSubTab('requests')}>
                  Leave Requests
                </button>
                <button className={`sub-tab ${activeSubTab === 'balance' ? 'active' : ''}`} onClick={() => setActiveSubTab('balance')}>
                  Leave Balance
                </button>
                <button className={`sub-tab ${activeSubTab === 'types' ? 'active' : ''}`} onClick={() => setActiveSubTab('types')}>
                  Leave Types
                </button>
                <button className={`sub-tab ${activeSubTab === 'calendar' ? 'active' : ''}`} onClick={() => setActiveSubTab('calendar')}>
                  Team Calendar
                  </button>
              </div>

              {/* Leave Requests Table */}
              <div className="data-table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Employee</th>
                      <th>Leave Type</th>
                      <th>From Date</th>
                      <th>To Date</th>
                      <th>Days</th>
                      <th>Balance</th>
                      <th>Reason</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaveRequests.map(leave => (
                      <tr key={leave.id}>
                        <td>
                          <div className="user-cell">
                            <div className="user-avatar">{leave.employee.charAt(0)}</div>
                            <span>{leave.employee}</span>
                          </div>
                        </td>
                        <td>
                          <span className="leave-type">{leave.type}</span>
                        </td>
                        <td>{new Date(leave.from).toLocaleDateString()}</td>
                        <td>{new Date(leave.to).toLocaleDateString()}</td>
                        <td className="days-cell">{leave.days} days</td>
                        <td className="balance-cell">{leave.balance} left</td>
                        <td className="reason-cell">{leave.reason}</td>
                        <td>
                          <span className={`status-badge ${
                            leave.status === 'Approved' ? 'approved' :
                            leave.status === 'Pending' ? 'pending' : 'rejected'
                          }`}>
                            {leave.status}
                          </span>
                        </td>
                        <td>
                          <div className="action-buttons">
                            {leave.status === 'Pending' && (
                              <>
                                <button className="icon-btn-small success" title="Approve">
                                  <CheckCircle size={16} />
                                </button>
                                <button className="icon-btn-small danger" title="Reject">
                                  <XCircle size={16} />
                                </button>
                              </>
                            )}
                            <button className="icon-btn-small">
                              <Eye size={16} />
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

          {/* ===== PAYROLL MANAGEMENT TAB ===== */}
          {activeTab === 'payroll' && (
            <div className="tab-content">
              <div className="tab-content-header">
                <div className="header-left">
                  <h2>Payroll Management</h2>
                  <p>Process salaries, statutory compliance & payslips</p>
                </div>
                <div className="toolbar-actions">
                  <button className="btn-secondary">
                    <Download size={18} />
                    Export Payroll
                  </button>
                  <button className="btn-primary">
                    <CreditCard size={18} />
                    Process Payroll
                  </button>
                </div>
              </div>

              {/* Sub tabs */}
              <div className="sub-tabs">
                <button className={`sub-tab ${activeSubTab === 'salary' ? 'active' : ''}`} onClick={() => setActiveSubTab('salary')}>
                  Salary Processing
                </button>
                <button className={`sub-tab ${activeSubTab === 'statutory' ? 'active' : ''}`} onClick={() => setActiveSubTab('statutory')}>
                  Statutory (PF/ESI/TDS)
                </button>
                <button className={`sub-tab ${activeSubTab === 'payslips' ? 'active' : ''}`} onClick={() => setActiveSubTab('payslips')}>
                  Payslips
                </button>
                <button className={`sub-tab ${activeSubTab === 'settlement' ? 'active' : ''}`} onClick={() => setActiveSubTab('settlement')}>
                  Full & Final
                </button>
              </div>

              {/* Payroll Table */}
              <div className="data-table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Employee</th>
                      <th>Emp ID</th>
                      <th>Basic</th>
                      <th>HRA</th>
                      <th>Allowances</th>
                      <th>PF</th>
                      <th>ESI</th>
                      <th>TDS</th>
                      <th>Gross</th>
                      <th>Net Salary</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payrollData.map(payroll => (
                      <tr key={payroll.id}>
                        <td>
                          <div className="user-cell">
                            <div className="user-avatar">{payroll.name.charAt(0)}</div>
                            <span>{payroll.name}</span>
                          </div>
                        </td>
                        <td className="emp-id">{payroll.empId}</td>
                        <td className="amount-cell">₹{payroll.basic.toLocaleString()}</td>
                        <td className="amount-cell positive">₹{payroll.hra.toLocaleString()}</td>
                        <td className="amount-cell positive">₹{payroll.allowances.toLocaleString()}</td>
                        <td className="amount-cell negative">₹{payroll.pf.toLocaleString()}</td>
                        <td className="amount-cell negative">₹{payroll.esi.toLocaleString()}</td>
                        <td className="amount-cell negative">₹{payroll.tds.toLocaleString()}</td>
                        <td className="amount-cell gross">₹{payroll.gross.toLocaleString()}</td>
                        <td className="amount-cell net-salary">₹{payroll.net.toLocaleString()}</td>
                        <td>
                          <span className={`status-badge ${
                            payroll.status === 'Paid' ? 'paid' :
                            payroll.status === 'Processing' ? 'processing' : 'pending'
                          }`}>
                            {payroll.status}
                          </span>
                        </td>
                        <td>
                          <div className="action-buttons">
                            <button className="icon-btn-small" title="Download Payslip">
                              <Download size={16} />
                            </button>
                            <button className="icon-btn-small" title="Send Email">
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

          {/* ===== PERFORMANCE MANAGEMENT TAB ===== */}
          {activeTab === 'performance' && (
            <div className="tab-content">
              <div className="tab-content-header">
                <div className="header-left">
                  <h2>Performance Management</h2>
                  <p>KPI tracking, reviews & appraisals</p>
                </div>
                <div className="toolbar-actions">
                  <button className="btn-secondary">
                    <BarChart3 size={18} />
                    View Analytics
                  </button>
                  <button className="btn-primary">
                    <Plus size={18} />
                    New Review
                  </button>
                </div>
              </div>

              {/* Sub tabs */}
              <div className="sub-tabs">
                <button className={`sub-tab ${activeSubTab === 'reviews' ? 'active' : ''}`} onClick={() => setActiveSubTab('reviews')}>
                  Reviews
                </button>
                <button className={`sub-tab ${activeSubTab === 'kpi' ? 'active' : ''}`} onClick={() => setActiveSubTab('kpi')}>
                  KPI/OKR
                </button>
                <button className={`sub-tab ${activeSubTab === 'appraisal' ? 'active' : ''}`} onClick={() => setActiveSubTab('appraisal')}>
                  Appraisals
                </button>
                <button className={`sub-tab ${activeSubTab === 'goals' ? 'active' : ''}`} onClick={() => setActiveSubTab('goals')}>
                  Goal Setting
                </button>
              </div>

              {/* Performance Cards */}
              <div className="performance-grid">
                {performanceData.map(perf => (
                  <div key={perf.id} className="performance-card">
                    <div className="performance-header">
                      <div className="user-cell">
                        <div className="user-avatar">{perf.employee.charAt(0)}</div>
                        <div>
                          <div className="perf-name">{perf.employee}</div>
                          <div className="perf-dept">{perf.department}</div>
                        </div>
                      </div>
                      <div className="rating-badge">
                        <Star size={16} fill="#F59E0B" color="#F59E0B" />
                        <span>{perf.rating}</span>
                      </div>
                    </div>
                    
                    <div className="performance-body">
                      <div className="kpi-info">
                        <div className="kpi-label">KPI: {perf.kpi}</div>
                        <div className="kpi-metrics">
                          <div className="metric">
                            <span className="metric-label">Target</span>
                            <span className="metric-value">{perf.target}%</span>
                          </div>
                          <div className="metric">
                            <span className="metric-label">Achieved</span>
                            <span className="metric-value achieved">{perf.achieved}%</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="progress-bar-wrapper">
                        <div className="progress-bar">
                          <div className="progress-bar-fill" style={{ width: `${(perf.achieved / perf.target) * 100}%` }}></div>
                        </div>
                      </div>
                      
                      <div className="performance-footer">
                        <span className={`status-badge ${
                          perf.status === 'Excellent' ? 'excellent' :
                          perf.status === 'Good' ? 'good' : 'average'
                        }`}>
                          {perf.status}
                        </span>
                        <div className="reviewer-info">
                          <span className="reviewer-label">Reviewed by:</span>
                          <span className="reviewer-name">{perf.reviewer}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ===== HR LETTERS TAB ===== */}
          {activeTab === 'letters' && (
            <div className="tab-content">
              <div className="tab-content-header">
                <div className="header-left">
                  <h2>HR Letters & Certificates</h2>
                  <p>Generate & manage employment documents</p>
                </div>
                <div className="toolbar-actions">
                  <button className="btn-primary">
                    <Plus size={18} />
                    Generate Letter
                  </button>
                </div>
              </div>

              {/* Letter Templates */}
              <div className="letter-templates">
                <div className="letter-template-card">
                  <div className="template-icon">
                    <FileText size={32} />
                  </div>
                  <h3>Offer Letter</h3>
                  <p>Generate job offer letters for new hires</p>
                  <button className="btn-secondary">Generate</button>
                </div>
                <div className="letter-template-card">
                  <div className="template-icon">
                    <FileText size={32} />
                  </div>
                  <h3>Appointment Letter</h3>
                  <p>Create official appointment letters</p>
                  <button className="btn-secondary">Generate</button>
                </div>
                <div className="letter-template-card">
                  <div className="template-icon">
                    <FileText size={32} />
                  </div>
                  <h3>Experience Letter</h3>
                  <p>Issue experience certificates</p>
                  <button className="btn-secondary">Generate</button>
                </div>
                <div className="letter-template-card">
                  <div className="template-icon">
                    <FileText size={32} />
                  </div>
                  <h3>Relieving Letter</h3>
                  <p>Generate relieving documents</p>
                  <button className="btn-secondary">Generate</button>
                </div>
                <div className="letter-template-card">
                  <div className="template-icon">
                    <FileText size={32} />
                  </div>
                  <h3>Salary Certificate</h3>
                  <p>Create salary certificates</p>
                  <button className="btn-secondary">Generate</button>
                </div>
                <div className="letter-template-card">
                  <div className="template-icon">
                    <FileText size={32} />
                  </div>
                  <h3>NOC Letter</h3>
                  <p>Issue No Objection Certificates</p>
                  <button className="btn-secondary">Generate</button>
                </div>
              </div>

              {/* Generated Letters History */}
              <div className="section-title">
                <h3>Recent Documents</h3>
              </div>
              <div className="data-table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Letter Type</th>
                      <th>Employee</th>
                      <th>Generated By</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {hrLetters.map(letter => (
                      <tr key={letter.id}>
                        <td className="letter-type">{letter.type}</td>
                        <td>{letter.employee}</td>
                        <td>{letter.generatedBy}</td>
                        <td>{letter.date}</td>
                        <td>
                          <span className={`status-badge ${
                            letter.status === 'Generated' ? 'generated' :
                            letter.status === 'Sent' ? 'sent' : 'completed'
                          }`}>
                            {letter.status}
                          </span>
                        </td>
                        <td>
                          <div className="action-buttons">
                            <button className="icon-btn-small" title="Download">
                              <Download size={16} />
                            </button>
                            <button className="icon-btn-small" title="Send Email">
                              <Send size={16} />
                            </button>
                            <button className="icon-btn-small" title="View">
                              <Eye size={16} />
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

          {/* ===== TRAVEL & EXPENSE TAB ===== */}
          {activeTab === 'travel' && (
            <div className="tab-content">
              <div className="tab-content-header">
                <div className="header-left">
                  <h2>Travel & Expense Management</h2>
                  <p>Manage travel requests, advances & reimbursements</p>
                </div>
                <div className="toolbar-actions">
                  <button className="btn-secondary">
                    <Download size={18} />
                    Export Report
                  </button>
                  <button className="btn-primary">
                    <Plane size={18} />
                    New Travel Request
                  </button>
                </div>
              </div>

              {/* Sub tabs */}
              <div className="sub-tabs">
                <button className={`sub-tab ${activeSubTab === 'requests' ? 'active' : ''}`} onClick={() => setActiveSubTab('requests')}>
                  Travel Requests
                </button>
                <button className={`sub-tab ${activeSubTab === 'claims' ? 'active' : ''}`} onClick={() => setActiveSubTab('claims')}>
                  Expense Claims
                </button>
                <button className={`sub-tab ${activeSubTab === 'advance' ? 'active' : ''}`} onClick={() => setActiveSubTab('advance')}>
                  Travel Advance
                </button>
                <button className={`sub-tab ${activeSubTab === 'reimbursement' ? 'active' : ''}`} onClick={() => setActiveSubTab('reimbursement')}>
                  Reimbursements
                </button>
              </div>

              {/* Travel Requests Table */}
              <div className="data-table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Employee</th>
                      <th>From</th>
                      <th>To</th>
                      <th>Start Date</th>
                      <th>End Date</th>
                      <th>Purpose</th>
                      <th>Advance</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {travelRequests.map(travel => (
                      <tr key={travel.id}>
                        <td>
                          <div className="user-cell">
                            <div className="user-avatar">{travel.employee.charAt(0)}</div>
                            <span>{travel.employee}</span>
                          </div>
                        </td>
                        <td>{travel.from}</td>
                        <td>{travel.to}</td>
                        <td>{new Date(travel.startDate).toLocaleDateString()}</td>
                        <td>{new Date(travel.endDate).toLocaleDateString()}</td>
                        <td>{travel.purpose}</td>
                        <td className="amount-cell">₹{travel.advance.toLocaleString()}</td>
                        <td>
                          <span className={`status-badge ${
                            travel.status === 'Approved' ? 'approved' : 'pending'
                          }`}>
                            {travel.status}
                          </span>
                        </td>
                        <td>
                          <div className="action-buttons">
                            <button className="icon-btn-small" title="View">
                              <Eye size={16} />
                            </button>
                            <button className="icon-btn-small" title="Edit">
                              <Edit2 size={16} />
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

          {/* ===== AUTOMATION TAB ===== */}
          {activeTab === 'automation' && (
            <div className="tab-content">
              <div className="tab-content-header">
                <div className="header-left">
                  <h2>Notifications & Automation</h2>
                  <p>Configure automated alerts & reminders</p>
                </div>
                <div className="toolbar-actions">
                  <button className="btn-primary">
                    <Settings size={18} />
                    Configure
                  </button>
                </div>
              </div>

              {/* Automation Cards */}
              <div className="automation-grid">
                <div className="automation-card">
                  <div className="automation-icon">
                    <Gift size={28} />
                  </div>
                  <div className="automation-content">
                    <h3>Birthday & Anniversary</h3>
                    <p>Auto-send wishes to employees</p>
                    <div className="automation-status active">
                      <CheckCircle size={16} />
                      <span>Active</span>
                    </div>
                  </div>
                </div>

                <div className="automation-card">
                  <div className="automation-icon">
                    <Calendar size={28} />
                  </div>
                  <div className="automation-content">
                    <h3>Leave Balance Reminders</h3>
                    <p>Notify employees about leave balance</p>
                    <div className="automation-status active">
                      <CheckCircle size={16} />
                      <span>Active</span>
                    </div>
                  </div>
                </div>

                <div className="automation-card">
                  <div className="automation-icon">
                    <Bell size={28} />
                  </div>
                  <div className="automation-content">
                    <h3>Interview Alerts</h3>
                    <p>Send interview reminders to candidates</p>
                    <div className="automation-status active">
                      <CheckCircle size={16} />
                      <span>Active</span>
                    </div>
                  </div>
                </div>

                <div className="automation-card">
                  <div className="automation-icon">
                    <DollarSign size={28} />
                  </div>
                  <div className="automation-content">
                    <h3>Payroll Alerts</h3>
                    <p>Notify before payroll processing date</p>
                    <div className="automation-status active">
                      <CheckCircle size={16} />
                      <span>Active</span>
                    </div>
                  </div>
                </div>

                <div className="automation-card">
                  <div className="automation-icon">
                    <AlertCircle size={28} />
                  </div>
                  <div className="automation-content">
                    <h3>Contract Expiry</h3>
                    <p>Alert when contracts are expiring</p>
                    <div className="automation-status inactive">
                      <XCircle size={16} />
                      <span>Inactive</span>
                    </div>
                  </div>
                </div>

                <div className="automation-card">
                  <div className="automation-icon">
                    <FileText size={28} />
                  </div>
                  <div className="automation-content">
                    <h3>Document Expiry</h3>
                    <p>Remind about expiring documents</p>
                    <div className="automation-status active">
                      <CheckCircle size={16} />
                      <span>Active</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HRM;
