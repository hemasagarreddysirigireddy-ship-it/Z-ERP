import React, { useState } from 'react';
import { 
  Shield, 
  User, 
  Clock, 
  Filter,
  Search,
  Eye,
  Lock,
  Unlock,
  FileText,
  AlertCircle
} from 'lucide-react';
import './AuditTrail.css';

interface AuditLog {
  id: string;
  timestamp: string;
  user: string;
  userRole: string;
  action: string;
  module: string;
  recordId: string;
  recordType: string;
  changes: {
    field: string;
    oldValue: string;
    newValue: string;
  }[];
  ipAddress: string;
  status: 'Success' | 'Failed' | 'Warning';
}

const AuditTrail: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterUser, setFilterUser] = useState('all');
  const [filterAction, setFilterAction] = useState('all');
  const [filterModule, setFilterModule] = useState('all');
  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null);

  const [auditLogs] = useState<AuditLog[]>([
    {
      id: 'AUDIT001',
      timestamp: '2023-12-01 14:35:22',
      user: 'John Doe',
      userRole: 'Account Manager',
      action: 'Updated',
      module: 'Bank Accounts',
      recordId: 'BA12345',
      recordType: 'Bank Account',
      changes: [
        { field: 'Account Name', oldValue: 'Main Operating Account', newValue: 'Primary Operating Account' },
        { field: 'Account Balance', oldValue: '₹ 5,000,000', newValue: '₹ 5,500,000' }
      ],
      ipAddress: '192.168.1.105',
      status: 'Success'
    },
    {
      id: 'AUDIT002',
      timestamp: '2023-12-01 13:20:15',
      user: 'Jane Smith',
      userRole: 'Finance Director',
      action: 'Approved',
      module: 'Transactions',
      recordId: 'TXN98765',
      recordType: 'Transaction',
      changes: [
        { field: 'Status', oldValue: 'Pending Approval', newValue: 'Approved' },
        { field: 'Approved By', oldValue: 'null', newValue: 'Jane Smith' }
      ],
      ipAddress: '192.168.1.112',
      status: 'Success'
    },
    {
      id: 'AUDIT003',
      timestamp: '2023-12-01 11:45:30',
      user: 'Mike Johnson',
      userRole: 'Accountant',
      action: 'Created',
      module: 'Journal Entries',
      recordId: 'JE54321',
      recordType: 'Journal Entry',
      changes: [
        { field: 'Entry Date', oldValue: 'null', newValue: '2023-12-01' },
        { field: 'Amount', oldValue: 'null', newValue: '₹ 75,000' },
        { field: 'Description', oldValue: 'null', newValue: 'Expense allocation adjustment' }
      ],
      ipAddress: '192.168.1.118',
      status: 'Success'
    },
    {
      id: 'AUDIT004',
      timestamp: '2023-12-01 10:15:45',
      user: 'Sarah Williams',
      userRole: 'Account Manager',
      action: 'Deleted',
      module: 'Bank Reconciliation',
      recordId: 'REC22334',
      recordType: 'Reconciliation',
      changes: [
        { field: 'Status', oldValue: 'Draft', newValue: 'Deleted' }
      ],
      ipAddress: '192.168.1.125',
      status: 'Warning'
    },
    {
      id: 'AUDIT005',
      timestamp: '2023-12-01 09:30:10',
      user: 'David Brown',
      userRole: 'System Admin',
      action: 'Locked',
      module: 'Transactions',
      recordId: 'TXN88990',
      recordType: 'Transaction',
      changes: [
        { field: 'Lock Status', oldValue: 'Unlocked', newValue: 'Locked' },
        { field: 'Locked By', oldValue: 'null', newValue: 'David Brown' },
        { field: 'Lock Reason', oldValue: 'null', newValue: 'Audit in progress' }
      ],
      ipAddress: '192.168.1.101',
      status: 'Success'
    },
    {
      id: 'AUDIT006',
      timestamp: '2023-11-30 16:55:33',
      user: 'Emma Davis',
      userRole: 'Accountant',
      action: 'Updated',
      module: 'Cheque Management',
      recordId: 'CHQ77665',
      recordType: 'Cheque',
      changes: [
        { field: 'Cheque Status', oldValue: 'Issued', newValue: 'Cleared' },
        { field: 'Clearance Date', oldValue: 'null', newValue: '2023-11-30' }
      ],
      ipAddress: '192.168.1.133',
      status: 'Success'
    },
    {
      id: 'AUDIT007',
      timestamp: '2023-11-30 15:40:20',
      user: 'John Doe',
      userRole: 'Account Manager',
      action: 'Attempted Access',
      module: 'Reports',
      recordId: 'RPT44556',
      recordType: 'Financial Report',
      changes: [
        { field: 'Access Attempt', oldValue: 'null', newValue: 'Unauthorized' }
      ],
      ipAddress: '192.168.1.105',
      status: 'Failed'
    }
  ]);

  const users = Array.from(new Set(auditLogs.map(log => log.user)));
  const actions = Array.from(new Set(auditLogs.map(log => log.action)));
  const modules = Array.from(new Set(auditLogs.map(log => log.module)));

  const filteredLogs = auditLogs.filter(log => {
    const matchesSearch = 
      log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.module.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.recordId.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesUser = filterUser === 'all' || log.user === filterUser;
    const matchesAction = filterAction === 'all' || log.action === filterAction;
    const matchesModule = filterModule === 'all' || log.module === filterModule;

    return matchesSearch && matchesUser && matchesAction && matchesModule;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Success': return 'success';
      case 'Failed': return 'failed';
      case 'Warning': return 'warning';
      default: return 'default';
    }
  };

  const getActionIcon = (action: string) => {
    switch (action.toLowerCase()) {
      case 'locked': return <Lock size={16} />;
      case 'unlocked': return <Unlock size={16} />;
      case 'deleted': return <AlertCircle size={16} />;
      default: return <FileText size={16} />;
    }
  };

  return (
    <div className="audit-trail-container">
      {/* Header */}
      <div className="audit-header">
        <div className="audit-header-left">
          <div className="audit-icon-main">
            <Shield size={28} />
          </div>
          <div>
            <h1>Audit Trail</h1>
            <p>Complete history of all user actions and system changes with compliance tracking</p>
          </div>
        </div>
        <div className="audit-header-actions">
          <button className="btn-export">
            <FileText size={18} />
            Export Audit Log
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="audit-stats">
        <div className="stat-card">
          <div className="stat-icon">
            <Clock size={24} />
          </div>
          <div className="stat-content">
            <span className="stat-label">Total Activities</span>
            <span className="stat-value">{auditLogs.length}</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon success">
            <Shield size={24} />
          </div>
          <div className="stat-content">
            <span className="stat-label">Successful</span>
            <span className="stat-value success">
              {auditLogs.filter(log => log.status === 'Success').length}
            </span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon warning">
            <AlertCircle size={24} />
          </div>
          <div className="stat-content">
            <span className="stat-label">Warnings</span>
            <span className="stat-value warning">
              {auditLogs.filter(log => log.status === 'Warning').length}
            </span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon failed">
            <AlertCircle size={24} />
          </div>
          <div className="stat-content">
            <span className="stat-label">Failed</span>
            <span className="stat-value failed">
              {auditLogs.filter(log => log.status === 'Failed').length}
            </span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="audit-filters">
        <div className="search-box">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search by user, action, module, or record ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-controls">
          <div className="filter-group">
            <Filter size={18} />
            <select value={filterUser} onChange={(e) => setFilterUser(e.target.value)}>
              <option value="all">All Users</option>
              {users.map(user => (
                <option key={user} value={user}>{user}</option>
              ))}
            </select>
          </div>
          <div className="filter-group">
            <Filter size={18} />
            <select value={filterAction} onChange={(e) => setFilterAction(e.target.value)}>
              <option value="all">All Actions</option>
              {actions.map(action => (
                <option key={action} value={action}>{action}</option>
              ))}
            </select>
          </div>
          <div className="filter-group">
            <Filter size={18} />
            <select value={filterModule} onChange={(e) => setFilterModule(e.target.value)}>
              <option value="all">All Modules</option>
              {modules.map(module => (
                <option key={module} value={module}>{module}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Audit Logs */}
      <div className="audit-logs">
        <table className="audit-table">
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>User</th>
              <th>Action</th>
              <th>Module</th>
              <th>Record</th>
              <th>IP Address</th>
              <th>Status</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.map(log => (
              <tr key={log.id}>
                <td>
                  <div className="timestamp">
                    <Clock size={14} />
                    {new Date(log.timestamp).toLocaleString()}
                  </div>
                </td>
                <td>
                  <div className="user-info">
                    <User size={16} />
                    <div>
                      <strong>{log.user}</strong>
                      <span className="user-role">{log.userRole}</span>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="action-badge">
                    {getActionIcon(log.action)}
                    {log.action}
                  </div>
                </td>
                <td><strong>{log.module}</strong></td>
                <td>
                  <div className="record-info">
                    <span className="record-type">{log.recordType}</span>
                    <span className="record-id">{log.recordId}</span>
                  </div>
                </td>
                <td>{log.ipAddress}</td>
                <td>
                  <span className={`status-badge ${getStatusColor(log.status)}`}>
                    {log.status}
                  </span>
                </td>
                <td>
                  <button 
                    className="btn-view-details"
                    onClick={() => setSelectedLog(log)}
                  >
                    <Eye size={16} />
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredLogs.length === 0 && (
          <div className="no-results">
            <Shield size={48} />
            <p>No audit logs found matching your criteria</p>
          </div>
        )}
      </div>

      {/* Details Modal */}
      {selectedLog && (
        <div className="modal-overlay" onClick={() => setSelectedLog(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Audit Log Details</h2>
              <button className="btn-close" onClick={() => setSelectedLog(null)}>×</button>
            </div>
            <div className="modal-body">
              <div className="detail-section">
                <h3>General Information</h3>
                <div className="detail-grid">
                  <div className="detail-item">
                    <span className="label">Audit ID:</span>
                    <strong>{selectedLog.id}</strong>
                  </div>
                  <div className="detail-item">
                    <span className="label">Timestamp:</span>
                    <strong>{new Date(selectedLog.timestamp).toLocaleString()}</strong>
                  </div>
                  <div className="detail-item">
                    <span className="label">User:</span>
                    <strong>{selectedLog.user}</strong>
                  </div>
                  <div className="detail-item">
                    <span className="label">User Role:</span>
                    <strong>{selectedLog.userRole}</strong>
                  </div>
                  <div className="detail-item">
                    <span className="label">Action:</span>
                    <strong>{selectedLog.action}</strong>
                  </div>
                  <div className="detail-item">
                    <span className="label">Module:</span>
                    <strong>{selectedLog.module}</strong>
                  </div>
                  <div className="detail-item">
                    <span className="label">Record Type:</span>
                    <strong>{selectedLog.recordType}</strong>
                  </div>
                  <div className="detail-item">
                    <span className="label">Record ID:</span>
                    <strong>{selectedLog.recordId}</strong>
                  </div>
                  <div className="detail-item">
                    <span className="label">IP Address:</span>
                    <strong>{selectedLog.ipAddress}</strong>
                  </div>
                  <div className="detail-item">
                    <span className="label">Status:</span>
                    <span className={`status-badge ${getStatusColor(selectedLog.status)}`}>
                      {selectedLog.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="detail-section">
                <h3>Changes Made</h3>
                <div className="changes-list">
                  {selectedLog.changes.map((change, index) => (
                    <div key={index} className="change-item">
                      <div className="change-field">
                        <FileText size={16} />
                        <strong>{change.field}</strong>
                      </div>
                      <div className="change-values">
                        <div className="old-value">
                          <span className="value-label">Old Value:</span>
                          <span className="value-content">{change.oldValue === 'null' ? '(empty)' : change.oldValue}</span>
                        </div>
                        <div className="arrow">→</div>
                        <div className="new-value">
                          <span className="value-label">New Value:</span>
                          <span className="value-content">{change.newValue}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-close-modal" onClick={() => setSelectedLog(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuditTrail;
