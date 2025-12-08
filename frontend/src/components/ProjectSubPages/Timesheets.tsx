import React, { useState } from 'react';
import { Plus, Clock, Target, Filter, Calendar, Download, CheckCircle, XCircle, MoreVertical } from 'lucide-react';

interface TimesheetsProps {
  projectId: number;
}

const Timesheets: React.FC<TimesheetsProps> = ({ projectId }) => {
  const [showLogTimeModal, setShowLogTimeModal] = useState(false);

  const timesheets = [
    { 
      id: 1, 
      employee: 'Priya Sharma', 
      date: '2024-12-01', 
      hours: 8, 
      task: 'Homepage design', 
      billable: true,
      status: 'Approved',
      approvedBy: 'Vikram Singh',
      notes: 'Completed initial mockups'
    },
    { 
      id: 2, 
      employee: 'Rajesh Kumar', 
      date: '2024-12-01', 
      hours: 7.5, 
      task: 'Frontend development', 
      billable: true,
      status: 'Pending',
      approvedBy: null,
      notes: 'Implemented responsive grid'
    },
    { 
      id: 3, 
      employee: 'Amit Patel', 
      date: '2024-12-01', 
      hours: 6, 
      task: 'API development', 
      billable: true,
      status: 'Approved',
      approvedBy: 'Vikram Singh',
      notes: 'RESTful endpoints created'
    },
    { 
      id: 4, 
      employee: 'Priya Sharma', 
      date: '2024-12-02', 
      hours: 8, 
      task: 'UI refinements', 
      billable: true,
      status: 'Approved',
      approvedBy: 'Vikram Singh',
      notes: ''
    },
    { 
      id: 5, 
      employee: 'Sneha Reddy', 
      date: '2024-12-02', 
      hours: 4, 
      task: 'Testing', 
      billable: false,
      status: 'Rejected',
      approvedBy: 'Vikram Singh',
      notes: 'Internal testing session'
    },
    { 
      id: 6, 
      employee: 'Deepa Nair', 
      date: '2024-12-01', 
      hours: 8, 
      task: 'Authentication setup', 
      billable: true,
      status: 'Approved',
      approvedBy: 'Vikram Singh',
      notes: 'OAuth integration'
    },
    { 
      id: 7, 
      employee: 'Karan Mehta', 
      date: '2024-12-01', 
      hours: 7, 
      task: 'Payment integration', 
      billable: true,
      status: 'Pending',
      approvedBy: null,
      notes: 'Stripe API setup'
    },
    { 
      id: 8, 
      employee: 'Anita Desai', 
      date: '2024-12-02', 
      hours: 6.5, 
      task: 'Push notification config', 
      billable: true,
      status: 'Approved',
      approvedBy: 'Vikram Singh',
      notes: 'Firebase integration'
    }
  ];

  const totalHours = timesheets.reduce((sum, ts) => sum + ts.hours, 0);
  const billableHours = timesheets.filter(ts => ts.billable).reduce((sum, ts) => sum + ts.hours, 0);
  const approvedHours = timesheets.filter(ts => ts.status === 'Approved').reduce((sum, ts) => sum + ts.hours, 0);
  const pendingHours = timesheets.filter(ts => ts.status === 'Pending').reduce((sum, ts) => sum + ts.hours, 0);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved': return 'status-completed';
      case 'Pending': return 'status-pending';
      case 'Rejected': return 'status-rejected';
      default: return '';
    }
  };

  return (
    <div className="tab-content">
      {/* Timesheet Summary */}
      <div className="tab-content-header">
        <div className="timesheet-summary">
          <div className="timesheet-stat">
            <Clock size={20} className="stat-icon-blue" />
            <div>
              <div className="timesheet-stat-value">{totalHours}h</div>
              <div className="timesheet-stat-label">Total Hours</div>
            </div>
          </div>
          <div className="timesheet-stat">
            <Target size={20} className="stat-icon-green" />
            <div>
              <div className="timesheet-stat-value">{billableHours}h</div>
              <div className="timesheet-stat-label">Billable Hours</div>
            </div>
          </div>
          <div className="timesheet-stat">
            <CheckCircle size={20} className="stat-icon-success" />
            <div>
              <div className="timesheet-stat-value">{approvedHours}h</div>
              <div className="timesheet-stat-label">Approved</div>
            </div>
          </div>
          <div className="timesheet-stat">
            <Clock size={20} className="stat-icon-orange" />
            <div>
              <div className="timesheet-stat-value">{pendingHours}h</div>
              <div className="timesheet-stat-label">Pending Approval</div>
            </div>
          </div>
        </div>
        
        <div className="toolbar-actions">
          <button className="btn-secondary">
            <Filter size={18} />
            Filter
          </button>
          <button className="btn-secondary">
            <Download size={18} />
            Export
          </button>
          <button className="btn-primary" onClick={() => setShowLogTimeModal(true)}>
            <Plus size={18} />
            Log Time
          </button>
        </div>
      </div>

      {/* Timesheet Table */}
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Employee</th>
              <th>Task</th>
              <th>Hours</th>
              <th>Billable</th>
              <th>Status</th>
              <th>Approved By</th>
              <th>Notes</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {timesheets.map((timesheet) => (
              <tr key={timesheet.id}>
                <td>
                  <div className="date-cell">
                    <Calendar size={14} />
                    {timesheet.date}
                  </div>
                </td>
                <td>
                  <div className="user-cell">
                    <div className="user-avatar">
                      {timesheet.employee.split(' ').map(n => n[0]).join('')}
                    </div>
                    {timesheet.employee}
                  </div>
                </td>
                <td className="td-bold">{timesheet.task}</td>
                <td className="td-center">
                  <span className="hours-badge">{timesheet.hours}h</span>
                </td>
                <td>
                  <span className={`billable-badge ${timesheet.billable ? 'billable-yes' : 'billable-no'}`}>
                    {timesheet.billable ? 'Yes' : 'No'}
                  </span>
                </td>
                <td>
                  <span className={`status-badge ${getStatusColor(timesheet.status)}`}>
                    {timesheet.status}
                  </span>
                </td>
                <td>{timesheet.approvedBy || '-'}</td>
                <td className="notes-cell">{timesheet.notes || '-'}</td>
                <td>
                  <div className="action-buttons">
                    {timesheet.status === 'Pending' && (
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
                      <MoreVertical size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Weekly Summary */}
      <div className="project-details-card mt-4">
        <h3 className="card-section-title">Weekly Time Distribution</h3>
        <div className="weekly-chart-placeholder">
          <p className="text-muted">Bar chart showing hours logged per day/week</p>
          <div className="chart-bars">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day, idx) => (
              <div key={day} className="chart-bar-item">
                <div className="chart-bar" style={{ height: `${(idx + 1) * 20}%` }}></div>
                <span>{day}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timesheets;
