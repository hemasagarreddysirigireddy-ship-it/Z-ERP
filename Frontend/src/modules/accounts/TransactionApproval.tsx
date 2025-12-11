import React, { useState } from 'react';
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  Search, 
  Filter, 
  Download,
  Eye,
  MessageSquare,
  User,
  Calendar,
  DollarSign,
  FileText,
  AlertCircle,
  CheckCheck,
  History
} from 'lucide-react';
import './TransactionApproval.css';

interface ApprovalComment {
  id: string;
  userId: string;
  userName: string;
  comment: string;
  timestamp: string;
  action: 'approved' | 'rejected' | 'commented';
}

interface ApprovalLevel {
  level: number;
  approverName: string;
  approverId: string;
  status: 'pending' | 'approved' | 'rejected';
  approvedAt?: string;
  comments?: string;
}

interface TransactionApproval {
  id: string;
  transactionId: string;
  transactionType: 'Payment' | 'Transfer' | 'Withdrawal' | 'Refund';
  amount: number;
  currency: string;
  description: string;
  requestedBy: string;
  requestedById: string;
  requestedAt: string;
  category: string;
  vendor?: string;
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
  currentLevel: number;
  totalLevels: number;
  status: 'pending' | 'approved' | 'rejected' | 'in-review';
  approvalLevels: ApprovalLevel[];
  comments: ApprovalComment[];
  attachments: string[];
  dueDate?: string;
}

const TransactionApproval: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [filterPriority, setFilterPriority] = useState<'all' | 'Low' | 'Medium' | 'High' | 'Urgent'>('all');
  const [selectedApproval, setSelectedApproval] = useState<TransactionApproval | null>(null);
  const [viewMode, setViewMode] = useState<'pending' | 'history'>('pending');
  const [approvalComment, setApprovalComment] = useState('');

  // Sample approval data
  const [approvals] = useState<TransactionApproval[]>([
    {
      id: 'APR001',
      transactionId: 'TXN20231201-001',
      transactionType: 'Payment',
      amount: 45000,
      currency: 'INR',
      description: 'Vendor payment for office supplies',
      requestedBy: 'Priya Sharma',
      requestedById: 'EMP001',
      requestedAt: '2023-12-01T10:30:00',
      category: 'Office Expenses',
      vendor: 'ABC Suppliers Ltd.',
      priority: 'High',
      currentLevel: 2,
      totalLevels: 3,
      status: 'in-review',
      approvalLevels: [
        {
          level: 1,
          approverName: 'Rajesh Kumar',
          approverId: 'MGR001',
          status: 'approved',
          approvedAt: '2023-12-01T11:00:00',
          comments: 'Approved - Valid purchase order'
        },
        {
          level: 2,
          approverName: 'Amit Patel',
          approverId: 'MGR002',
          status: 'pending',
        },
        {
          level: 3,
          approverName: 'Sanjay Mehta (CFO)',
          approverId: 'CFO001',
          status: 'pending',
        }
      ],
      comments: [
        {
          id: 'CMT001',
          userId: 'MGR001',
          userName: 'Rajesh Kumar',
          comment: 'Purchase order verified. Amount matches PO.',
          timestamp: '2023-12-01T11:00:00',
          action: 'approved'
        }
      ],
      attachments: ['PO-12345.pdf', 'Invoice-ABC-001.pdf'],
      dueDate: '2023-12-05T17:00:00'
    },
    {
      id: 'APR002',
      transactionId: 'TXN20231201-002',
      transactionType: 'Transfer',
      amount: 150000,
      currency: 'INR',
      description: 'Fund transfer to project account',
      requestedBy: 'Neha Singh',
      requestedById: 'EMP002',
      requestedAt: '2023-12-01T09:15:00',
      category: 'Project Funding',
      priority: 'Urgent',
      currentLevel: 1,
      totalLevels: 3,
      status: 'pending',
      approvalLevels: [
        {
          level: 1,
          approverName: 'Vikram Malhotra',
          approverId: 'MGR003',
          status: 'pending',
        },
        {
          level: 2,
          approverName: 'Ravi Verma',
          approverId: 'MGR004',
          status: 'pending',
        },
        {
          level: 3,
          approverName: 'Sanjay Mehta (CFO)',
          approverId: 'CFO001',
          status: 'pending',
        }
      ],
      comments: [],
      attachments: ['Project-Budget.xlsx', 'Approval-Request.pdf'],
      dueDate: '2023-12-02T12:00:00'
    },
    {
      id: 'APR003',
      transactionId: 'TXN20231130-015',
      transactionType: 'Payment',
      amount: 25000,
      currency: 'INR',
      description: 'Marketing campaign expense',
      requestedBy: 'Rohit Sharma',
      requestedById: 'EMP003',
      requestedAt: '2023-11-30T14:20:00',
      category: 'Marketing',
      vendor: 'XYZ Digital Marketing',
      priority: 'Medium',
      currentLevel: 3,
      totalLevels: 3,
      status: 'approved',
      approvalLevels: [
        {
          level: 1,
          approverName: 'Priya Gupta',
          approverId: 'MGR005',
          status: 'approved',
          approvedAt: '2023-11-30T15:00:00',
          comments: 'Campaign ROI looks good'
        },
        {
          level: 2,
          approverName: 'Suresh Reddy',
          approverId: 'MGR006',
          status: 'approved',
          approvedAt: '2023-11-30T16:30:00',
          comments: 'Within budget allocation'
        },
        {
          level: 3,
          approverName: 'Sanjay Mehta (CFO)',
          approverId: 'CFO001',
          status: 'approved',
          approvedAt: '2023-12-01T09:00:00',
          comments: 'Final approval granted'
        }
      ],
      comments: [
        {
          id: 'CMT002',
          userId: 'MGR005',
          userName: 'Priya Gupta',
          comment: 'Campaign metrics justify the expense.',
          timestamp: '2023-11-30T15:00:00',
          action: 'approved'
        },
        {
          id: 'CMT003',
          userId: 'CFO001',
          userName: 'Sanjay Mehta',
          comment: 'Approved for Q4 marketing budget.',
          timestamp: '2023-12-01T09:00:00',
          action: 'approved'
        }
      ],
      attachments: ['Campaign-Proposal.pdf', 'Quote-XYZ.pdf']
    },
    {
      id: 'APR004',
      transactionId: 'TXN20231130-012',
      transactionType: 'Withdrawal',
      amount: 80000,
      currency: 'INR',
      description: 'Petty cash replenishment',
      requestedBy: 'Anjali Desai',
      requestedById: 'EMP004',
      requestedAt: '2023-11-30T11:00:00',
      category: 'Petty Cash',
      priority: 'High',
      currentLevel: 2,
      totalLevels: 2,
      status: 'rejected',
      approvalLevels: [
        {
          level: 1,
          approverName: 'Karthik Iyer',
          approverId: 'MGR007',
          status: 'approved',
          approvedAt: '2023-11-30T12:00:00',
          comments: 'Petty cash needed for month-end'
        },
        {
          level: 2,
          approverName: 'Amit Patel',
          approverId: 'MGR002',
          status: 'rejected',
          approvedAt: '2023-11-30T14:00:00',
          comments: 'Amount exceeds monthly limit. Please revise to 50,000 INR.'
        }
      ],
      comments: [
        {
          id: 'CMT004',
          userId: 'MGR002',
          userName: 'Amit Patel',
          comment: 'Please submit revised request with proper justification.',
          timestamp: '2023-11-30T14:00:00',
          action: 'rejected'
        }
      ],
      attachments: ['Petty-Cash-Statement.pdf']
    },
    {
      id: 'APR005',
      transactionId: 'TXN20231201-005',
      transactionType: 'Refund',
      amount: 12000,
      currency: 'INR',
      description: 'Customer refund - Order cancellation',
      requestedBy: 'Deepak Joshi',
      requestedById: 'EMP005',
      requestedAt: '2023-12-01T13:45:00',
      category: 'Customer Refunds',
      priority: 'Medium',
      currentLevel: 1,
      totalLevels: 2,
      status: 'pending',
      approvalLevels: [
        {
          level: 1,
          approverName: 'Meena Nair',
          approverId: 'MGR008',
          status: 'pending',
        },
        {
          level: 2,
          approverName: 'Ravi Verma',
          approverId: 'MGR004',
          status: 'pending',
        }
      ],
      comments: [],
      attachments: ['Cancellation-Request.pdf', 'Original-Invoice.pdf']
    },
    {
      id: 'APR006',
      transactionId: 'TXN20231130-020',
      transactionType: 'Payment',
      amount: 95000,
      currency: 'INR',
      description: 'Software license renewal',
      requestedBy: 'Sunil Kapoor',
      requestedById: 'EMP006',
      requestedAt: '2023-11-30T16:30:00',
      category: 'IT Expenses',
      vendor: 'TechSoft Solutions',
      priority: 'High',
      currentLevel: 2,
      totalLevels: 2,
      status: 'in-review',
      approvalLevels: [
        {
          level: 1,
          approverName: 'Arjun Reddy',
          approverId: 'MGR009',
          status: 'approved',
          approvedAt: '2023-12-01T08:30:00',
          comments: 'Critical for operations'
        },
        {
          level: 2,
          approverName: 'Sanjay Mehta (CFO)',
          approverId: 'CFO001',
          status: 'pending',
        }
      ],
      comments: [
        {
          id: 'CMT005',
          userId: 'MGR009',
          userName: 'Arjun Reddy',
          comment: 'License expires in 5 days. Urgent approval needed.',
          timestamp: '2023-12-01T08:30:00',
          action: 'approved'
        }
      ],
      attachments: ['License-Quote.pdf', 'Current-License.pdf'],
      dueDate: '2023-12-03T17:00:00'
    }
  ]);

  const getStatusBadgeClass = (status: string) => {
    const statusClasses: { [key: string]: string } = {
      'pending': 'badge-warning',
      'approved': 'badge-success',
      'rejected': 'badge-danger',
      'in-review': 'badge-info'
    };
    return statusClasses[status] || 'badge-secondary';
  };

  const getPriorityBadgeClass = (priority: string) => {
    const priorityClasses: { [key: string]: string } = {
      'Low': 'priority-low',
      'Medium': 'priority-medium',
      'High': 'priority-high',
      'Urgent': 'priority-urgent'
    };
    return priorityClasses[priority] || 'priority-medium';
  };

  const filteredApprovals = approvals.filter(approval => {
    const matchesSearch = 
      approval.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      approval.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      approval.requestedBy.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || approval.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || approval.priority === filterPriority;
    const matchesViewMode = viewMode === 'history' ? 
      (approval.status === 'approved' || approval.status === 'rejected') :
      (approval.status === 'pending' || approval.status === 'in-review');

    return matchesSearch && matchesStatus && matchesPriority && matchesViewMode;
  });

  const handleApprove = (approvalId: string) => {
    if (!approvalComment.trim()) {
      alert('Please add a comment before approving');
      return;
    }
    console.log(`Approving ${approvalId} with comment: ${approvalComment}`);
    alert('Transaction approved successfully!');
    setApprovalComment('');
    setSelectedApproval(null);
  };

  const handleReject = (approvalId: string) => {
    if (!approvalComment.trim()) {
      alert('Please add a reason for rejection');
      return;
    }
    console.log(`Rejecting ${approvalId} with reason: ${approvalComment}`);
    alert('Transaction rejected!');
    setApprovalComment('');
    setSelectedApproval(null);
  };

  const pendingCount = approvals.filter(a => a.status === 'pending' || a.status === 'in-review').length;
  const approvedToday = approvals.filter(a => a.status === 'approved' && 
    new Date(a.approvalLevels.find(l => l.status === 'approved')?.approvedAt || '').toDateString() === new Date().toDateString()).length;

  return (
    <div className="transaction-approval-container">
      {/* Header */}
      <div className="approval-header">
        <div className="approval-header-left">
          <div className="approval-icon-main">
            <CheckCheck size={28} />
          </div>
          <div>
            <h1>Transaction Approval</h1>
            <p>Multi-level approval workflow for transactions</p>
          </div>
        </div>
        <div className="approval-header-actions">
          <button className="btn-secondary">
            <Download size={18} />
            Export Report
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="approval-stats">
        <div className="stat-card stat-pending">
          <div className="stat-icon">
            <Clock size={24} />
          </div>
          <div className="stat-details">
            <h3>{pendingCount}</h3>
            <p>Pending Approvals</p>
          </div>
        </div>
        <div className="stat-card stat-approved">
          <div className="stat-icon">
            <CheckCircle size={24} />
          </div>
          <div className="stat-details">
            <h3>{approvedToday}</h3>
            <p>Approved Today</p>
          </div>
        </div>
        <div className="stat-card stat-review">
          <div className="stat-icon">
            <AlertCircle size={24} />
          </div>
          <div className="stat-details">
            <h3>{approvals.filter(a => a.status === 'in-review').length}</h3>
            <p>In Review</p>
          </div>
        </div>
        <div className="stat-card stat-rejected">
          <div className="stat-icon">
            <XCircle size={24} />
          </div>
          <div className="stat-details">
            <h3>{approvals.filter(a => a.status === 'rejected').length}</h3>
            <p>Rejected</p>
          </div>
        </div>
      </div>

      {/* View Mode Toggle */}
      <div className="view-mode-toggle">
        <button 
          className={viewMode === 'pending' ? 'active' : ''}
          onClick={() => setViewMode('pending')}
        >
          <Clock size={18} />
          Pending Approvals
        </button>
        <button 
          className={viewMode === 'history' ? 'active' : ''}
          onClick={() => setViewMode('history')}
        >
          <History size={18} />
          Approval History
        </button>
      </div>

      {/* Filters */}
      <div className="approval-filters">
        <div className="search-box">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search by ID, description, or requester..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <select 
          value={filterStatus} 
          onChange={(e) => setFilterStatus(e.target.value as any)}
          className="filter-select"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="in-review">In Review</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
        <select 
          value={filterPriority} 
          onChange={(e) => setFilterPriority(e.target.value as any)}
          className="filter-select"
        >
          <option value="all">All Priorities</option>
          <option value="Urgent">Urgent</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>

      {/* Approvals List */}
      <div className="approvals-list">
        {filteredApprovals.map(approval => (
          <div key={approval.id} className="approval-card">
            <div className="approval-card-header">
              <div className="approval-card-title">
                <h3>{approval.transactionId}</h3>
                <span className={`badge ${getStatusBadgeClass(approval.status)}`}>
                  {approval.status.replace('-', ' ').toUpperCase()}
                </span>
                <span className={`priority-badge ${getPriorityBadgeClass(approval.priority)}`}>
                  {approval.priority}
                </span>
              </div>
              <button 
                className="btn-icon"
                onClick={() => setSelectedApproval(approval)}
              >
                <Eye size={18} />
              </button>
            </div>

            <div className="approval-card-body">
              <div className="approval-info-grid">
                <div className="info-item">
                  <FileText size={16} />
                  <div>
                    <span className="info-label">Description</span>
                    <span className="info-value">{approval.description}</span>
                  </div>
                </div>
                <div className="info-item">
                  <DollarSign size={16} />
                  <div>
                    <span className="info-label">Amount</span>
                    <span className="info-value amount">
                      {approval.currency} {approval.amount.toLocaleString()}
                    </span>
                  </div>
                </div>
                <div className="info-item">
                  <User size={16} />
                  <div>
                    <span className="info-label">Requested By</span>
                    <span className="info-value">{approval.requestedBy}</span>
                  </div>
                </div>
                <div className="info-item">
                  <Calendar size={16} />
                  <div>
                    <span className="info-label">Requested Date</span>
                    <span className="info-value">
                      {new Date(approval.requestedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Approval Progress */}
              <div className="approval-progress">
                <div className="progress-header">
                  <span>Approval Progress</span>
                  <span className="progress-text">
                    Level {approval.currentLevel} of {approval.totalLevels}
                  </span>
                </div>
                <div className="approval-levels">
                  {approval.approvalLevels.map(level => (
                    <div key={level.level} className={`approval-level level-${level.status}`}>
                      <div className="level-icon">
                        {level.status === 'approved' && <CheckCircle size={20} />}
                        {level.status === 'rejected' && <XCircle size={20} />}
                        {level.status === 'pending' && <Clock size={20} />}
                      </div>
                      <div className="level-details">
                        <span className="level-name">Level {level.level}</span>
                        <span className="approver-name">{level.approverName}</span>
                        {level.approvedAt && (
                          <span className="approval-time">
                            {new Date(level.approvedAt).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              {(approval.status === 'pending' || approval.status === 'in-review') && (
                <div className="approval-actions">
                  <button 
                    className="btn-approve"
                    onClick={() => setSelectedApproval(approval)}
                  >
                    <CheckCircle size={18} />
                    Approve
                  </button>
                  <button 
                    className="btn-reject"
                    onClick={() => setSelectedApproval(approval)}
                  >
                    <XCircle size={18} />
                    Reject
                  </button>
                  <button className="btn-comment">
                    <MessageSquare size={18} />
                    Comment
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}

        {filteredApprovals.length === 0 && (
          <div className="no-approvals">
            <AlertCircle size={48} />
            <h3>No approvals found</h3>
            <p>Try adjusting your filters or search query</p>
          </div>
        )}
      </div>

      {/* Approval Detail Modal */}
      {selectedApproval && (
        <div className="modal-overlay" onClick={() => setSelectedApproval(null)}>
          <div className="modal-content approval-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Approval Details - {selectedApproval.transactionId}</h2>
              <button 
                className="modal-close"
                onClick={() => setSelectedApproval(null)}
              >
                ×
              </button>
            </div>

            <div className="modal-body">
              {/* Transaction Details */}
              <div className="detail-section">
                <h3>Transaction Information</h3>
                <div className="detail-grid">
                  <div className="detail-item">
                    <span className="detail-label">Transaction Type:</span>
                    <span className="detail-value">{selectedApproval.transactionType}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Amount:</span>
                    <span className="detail-value amount">
                      {selectedApproval.currency} {selectedApproval.amount.toLocaleString()}
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Category:</span>
                    <span className="detail-value">{selectedApproval.category}</span>
                  </div>
                  {selectedApproval.vendor && (
                    <div className="detail-item">
                      <span className="detail-label">Vendor:</span>
                      <span className="detail-value">{selectedApproval.vendor}</span>
                    </div>
                  )}
                  <div className="detail-item full-width">
                    <span className="detail-label">Description:</span>
                    <span className="detail-value">{selectedApproval.description}</span>
                  </div>
                </div>
              </div>

              {/* Requester Details */}
              <div className="detail-section">
                <h3>Requester Information</h3>
                <div className="detail-grid">
                  <div className="detail-item">
                    <span className="detail-label">Name:</span>
                    <span className="detail-value">{selectedApproval.requestedBy}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Employee ID:</span>
                    <span className="detail-value">{selectedApproval.requestedById}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Request Date:</span>
                    <span className="detail-value">
                      {new Date(selectedApproval.requestedAt).toLocaleString()}
                    </span>
                  </div>
                  {selectedApproval.dueDate && (
                    <div className="detail-item">
                      <span className="detail-label">Due Date:</span>
                      <span className="detail-value">
                        {new Date(selectedApproval.dueDate).toLocaleString()}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Approval Levels */}
              <div className="detail-section">
                <h3>Approval Workflow</h3>
                <div className="approval-workflow">
                  {selectedApproval.approvalLevels.map(level => (
                    <div key={level.level} className={`workflow-item status-${level.status}`}>
                      <div className="workflow-icon">
                        {level.status === 'approved' && <CheckCircle size={24} />}
                        {level.status === 'rejected' && <XCircle size={24} />}
                        {level.status === 'pending' && <Clock size={24} />}
                      </div>
                      <div className="workflow-details">
                        <div className="workflow-header">
                          <span className="workflow-level">Level {level.level}</span>
                          <span className={`workflow-status ${level.status}`}>
                            {level.status.toUpperCase()}
                          </span>
                        </div>
                        <div className="workflow-approver">{level.approverName}</div>
                        {level.approvedAt && (
                          <div className="workflow-time">
                            {new Date(level.approvedAt).toLocaleString()}
                          </div>
                        )}
                        {level.comments && (
                          <div className="workflow-comment">
                            <MessageSquare size={14} />
                            {level.comments}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Comments History */}
              {selectedApproval.comments.length > 0 && (
                <div className="detail-section">
                  <h3>Comments & Activity</h3>
                  <div className="comments-list">
                    {selectedApproval.comments.map(comment => (
                      <div key={comment.id} className={`comment-item ${comment.action}`}>
                        <div className="comment-header">
                          <div className="comment-user">
                            <User size={16} />
                            <strong>{comment.userName}</strong>
                          </div>
                          <span className="comment-time">
                            {new Date(comment.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="comment-body">{comment.comment}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Attachments */}
              {selectedApproval.attachments.length > 0 && (
                <div className="detail-section">
                  <h3>Attachments</h3>
                  <div className="attachments-list">
                    {selectedApproval.attachments.map((file, index) => (
                      <div key={index} className="attachment-item">
                        <FileText size={18} />
                        <span>{file}</span>
                        <button className="btn-icon">
                          <Download size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Section */}
              {(selectedApproval.status === 'pending' || selectedApproval.status === 'in-review') && (
                <div className="detail-section action-section">
                  <h3>Take Action</h3>
                  <div className="action-form">
                    <textarea
                      placeholder="Add your comments or reason..."
                      value={approvalComment}
                      onChange={(e) => setApprovalComment(e.target.value)}
                      rows={4}
                    />
                    <div className="action-buttons">
                      <button 
                        className="btn-approve-large"
                        onClick={() => handleApprove(selectedApproval.id)}
                      >
                        <CheckCircle size={20} />
                        Approve Transaction
                      </button>
                      <button 
                        className="btn-reject-large"
                        onClick={() => handleReject(selectedApproval.id)}
                      >
                        <XCircle size={20} />
                        Reject Transaction
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionApproval;
