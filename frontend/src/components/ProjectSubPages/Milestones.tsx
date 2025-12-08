import React, { useState } from 'react';
import { 
  Target, 
  Plus, 
  CheckCircle, 
  Clock, 
  Calendar,
  DollarSign,
  FileText,
  Upload,
  Download,
  ThumbsUp,
  ThumbsDown,
  MoreVertical
} from 'lucide-react';

interface MilestonesProps {
  projectId: number;
}

const Milestones: React.FC<MilestonesProps> = ({ projectId }) => {
  const [showAddMilestone, setShowAddMilestone] = useState(false);

  const milestones = [
    {
      id: 1,
      title: 'Project Kickoff',
      description: 'Initial project setup and team onboarding',
      date: '2024-11-01',
      status: 'Completed',
      progress: 100,
      deliverables: [
        { id: 1, name: 'Project Charter', status: 'Approved', file: 'charter.pdf' },
        { id: 2, name: 'Resource Plan', status: 'Approved', file: 'resources.xlsx' }
      ],
      billingAmount: 5000,
      billingStatus: 'Paid',
      approvedBy: 'Client - John Doe',
      approvalDate: '2024-11-05'
    },
    {
      id: 2,
      title: 'Design Phase Complete',
      description: 'UI/UX designs and prototypes finalized',
      date: '2024-11-15',
      status: 'Completed',
      progress: 100,
      deliverables: [
        { id: 3, name: 'Wireframes', status: 'Approved', file: 'wireframes.fig' },
        { id: 4, name: 'Design Mockups', status: 'Approved', file: 'mockups.fig' },
        { id: 5, name: 'Design System', status: 'Approved', file: 'design-system.pdf' }
      ],
      billingAmount: 12000,
      billingStatus: 'Paid',
      approvedBy: 'Client - John Doe',
      approvalDate: '2024-11-18'
    },
    {
      id: 3,
      title: 'Development Phase - Frontend',
      description: 'Complete frontend implementation',
      date: '2024-12-10',
      status: 'In Progress',
      progress: 75,
      deliverables: [
        { id: 6, name: 'Homepage', status: 'Completed', file: 'homepage-demo.mp4' },
        { id: 7, name: 'User Dashboard', status: 'In Review', file: 'dashboard-demo.mp4' },
        { id: 8, name: 'Responsive Layout', status: 'Pending', file: null }
      ],
      billingAmount: 18000,
      billingStatus: 'Pending',
      approvedBy: null,
      approvalDate: null
    },
    {
      id: 4,
      title: 'Testing & QA',
      description: 'Complete testing and bug fixing',
      date: '2024-12-20',
      status: 'Pending',
      progress: 0,
      deliverables: [
        { id: 9, name: 'Test Cases', status: 'Pending', file: null },
        { id: 10, name: 'QA Report', status: 'Pending', file: null }
      ],
      billingAmount: 8000,
      billingStatus: 'Not Billed',
      approvedBy: null,
      approvalDate: null
    },
    {
      id: 5,
      title: 'Final Delivery',
      description: 'Production deployment and handover',
      date: '2024-12-31',
      status: 'Pending',
      progress: 0,
      deliverables: [
        { id: 11, name: 'Production Build', status: 'Pending', file: null },
        { id: 12, name: 'Documentation', status: 'Pending', file: null },
        { id: 13, name: 'Training Materials', status: 'Pending', file: null }
      ],
      billingAmount: 7000,
      billingStatus: 'Not Billed',
      approvedBy: null,
      approvalDate: null
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'status-completed';
      case 'In Progress': return 'status-inprogress';
      case 'Pending': return 'status-pending';
      case 'In Review': return 'status-review';
      case 'Approved': return 'status-completed';
      default: return '';
    }
  };

  const getBillingStatusColor = (status: string) => {
    switch (status) {
      case 'Paid': return 'billing-paid';
      case 'Pending': return 'billing-pending';
      case 'Not Billed': return 'billing-not-billed';
      default: return '';
    }
  };

  return (
    <div className="tab-content">
      {/* Header */}
      <div className="tab-content-header">
        <h3 className="section-title">
          <Target size={20} />
          Project Milestones & Deliverables
        </h3>
        <button className="btn-primary" onClick={() => setShowAddMilestone(true)}>
          <Plus size={16} />
          Add Milestone
        </button>
      </div>

      {/* Milestones Timeline */}
      <div className="milestones-timeline">
        {milestones.map((milestone, index) => (
          <div key={milestone.id} className="milestone-section">
            <div className="milestone-card">
              {/* Milestone Header */}
              <div className="milestone-header">
                <div className="milestone-title-section">
                  <div className="milestone-indicator-large">
                    <div className={`milestone-dot-large ${milestone.status.toLowerCase().replace(' ', '-')}`}>
                      {milestone.status === 'Completed' && <CheckCircle size={20} />}
                      {milestone.status === 'In Progress' && <Clock size={20} />}
                      {milestone.status === 'Pending' && <Target size={20} />}
                    </div>
                    {index < milestones.length - 1 && <div className="milestone-line-large"></div>}
                  </div>
                  <div>
                    <h3>{milestone.title}</h3>
                    <p className="milestone-description">{milestone.description}</p>
                  </div>
                </div>
                <div className="milestone-actions">
                  <span className={`status-badge ${getStatusColor(milestone.status)}`}>
                    {milestone.status}
                  </span>
                  <button className="icon-btn-small">
                    <MoreVertical size={16} />
                  </button>
                </div>
              </div>

              {/* Milestone Details */}
              <div className="milestone-details-grid">
                <div className="milestone-detail-item">
                  <Calendar size={16} />
                  <div>
                    <span className="detail-label">Due Date</span>
                    <span className="detail-value">{milestone.date}</span>
                  </div>
                </div>
                <div className="milestone-detail-item">
                  <DollarSign size={16} />
                  <div>
                    <span className="detail-label">Billing Amount</span>
                    <span className="detail-value">₹{milestone.billingAmount.toLocaleString()}</span>
                  </div>
                </div>
                <div className="milestone-detail-item">
                  <FileText size={16} />
                  <div>
                    <span className="detail-label">Billing Status</span>
                    <span className={`billing-badge ${getBillingStatusColor(milestone.billingStatus)}`}>
                      {milestone.billingStatus}
                    </span>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="progress-section">
                <div className="progress-header">
                  <span>Completion Progress</span>
                  <span className="progress-percentage">{milestone.progress}%</span>
                </div>
                <div className="progress-bar">
                  <div 
                    className="progress-bar-fill" 
                    style={{ width: `${milestone.progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Deliverables */}
              <div className="deliverables-section">
                <h4 className="deliverables-title">Deliverables</h4>
                <div className="deliverables-list">
                  {milestone.deliverables.map((deliverable) => (
                    <div key={deliverable.id} className="deliverable-item">
                      <div className="deliverable-info">
                        <FileText size={16} />
                        <span className="deliverable-name">{deliverable.name}</span>
                        <span className={`status-badge small ${getStatusColor(deliverable.status)}`}>
                          {deliverable.status}
                        </span>
                      </div>
                      <div className="deliverable-actions">
                        {deliverable.file && (
                          <>
                            <button className="icon-btn-small" title="Download">
                              <Download size={14} />
                            </button>
                            <button className="icon-btn-small" title="Preview">
                              <FileText size={14} />
                            </button>
                          </>
                        )}
                        {deliverable.status === 'In Review' && (
                          <>
                            <button className="icon-btn-small success" title="Approve">
                              <ThumbsUp size={14} />
                            </button>
                            <button className="icon-btn-small danger" title="Request Changes">
                              <ThumbsDown size={14} />
                            </button>
                          </>
                        )}
                        {deliverable.status === 'Pending' && (
                          <button className="btn-secondary xsmall">
                            <Upload size={12} />
                            Upload
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Approval Info */}
              {milestone.approvedBy && (
                <div className="approval-info">
                  <CheckCircle size={16} className="approval-icon" />
                  <span>
                    Approved by <strong>{milestone.approvedBy}</strong> on {milestone.approvalDate}
                  </span>
                </div>
              )}

              {/* Pending Approval Actions */}
              {milestone.status === 'In Progress' && milestone.progress === 100 && (
                <div className="approval-actions">
                  <p className="approval-message">All deliverables completed. Ready for client approval.</p>
                  <div className="action-buttons">
                    <button className="btn-secondary">Request Approval</button>
                    <button className="btn-primary">Submit to Client</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Billing Summary */}
      <div className="project-details-card mt-4">
        <h3 className="card-section-title">
          <DollarSign size={20} />
          Milestone-based Billing Summary
        </h3>
        <div className="billing-summary-grid">
          <div className="billing-stat-card">
            <span className="billing-stat-label">Total Contract Value</span>
            <span className="billing-stat-value">₹{milestones.reduce((sum, m) => sum + m.billingAmount, 0).toLocaleString()}</span>
          </div>
          <div className="billing-stat-card">
            <span className="billing-stat-label">Amount Paid</span>
            <span className="billing-stat-value success">
              ₹{milestones.filter(m => m.billingStatus === 'Paid').reduce((sum, m) => sum + m.billingAmount, 0).toLocaleString()}
            </span>
          </div>
          <div className="billing-stat-card">
            <span className="billing-stat-label">Pending Payment</span>
            <span className="billing-stat-value warning">
              ₹{milestones.filter(m => m.billingStatus === 'Pending').reduce((sum, m) => sum + m.billingAmount, 0).toLocaleString()}
            </span>
          </div>
          <div className="billing-stat-card">
            <span className="billing-stat-label">Not Yet Billed</span>
            <span className="billing-stat-value">
              ₹{milestones.filter(m => m.billingStatus === 'Not Billed').reduce((sum, m) => sum + m.billingAmount, 0).toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Milestones;
