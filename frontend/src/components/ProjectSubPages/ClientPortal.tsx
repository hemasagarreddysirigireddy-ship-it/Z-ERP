import React, { useState } from 'react';
import { 
  Eye, 
  FileText, 
  CheckSquare, 
  Upload, 
  Download,
  MessageCircle,
  DollarSign,
  Receipt,
  CreditCard,
  Clock,
  ThumbsUp,
  AlertCircle
} from 'lucide-react';

interface ClientPortalProps {
  projectId: number;
}

const ClientPortal: React.FC<ClientPortalProps> = ({ projectId }) => {
  const [activeView, setActiveView] = useState<'progress' | 'tasks' | 'files' | 'queries' | 'payments'>('progress');

  const projectProgress = {
    overall: 75,
    milestones: [
      { name: 'Design Phase', status: 'Completed', progress: 100 },
      { name: 'Development', status: 'In Progress', progress: 75 },
      { name: 'Testing', status: 'Pending', progress: 0 },
      { name: 'Deployment', status: 'Pending', progress: 0 }
    ],
    recentUpdates: [
      { date: '2024-12-03', update: 'Homepage design approved and development started' },
      { date: '2024-12-02', update: 'Responsive layout implementation completed' },
      { date: '2024-12-01', update: 'API integration in progress' }
    ]
  };

  const clientTasks = [
    { id: 1, title: 'Review homepage design', status: 'Completed', dueDate: '2024-11-28', priority: 'High' },
    { id: 2, title: 'Approve color scheme', status: 'Completed', dueDate: '2024-11-30', priority: 'Medium' },
    { id: 3, title: 'Review dashboard mockup', status: 'Pending', dueDate: '2024-12-05', priority: 'High' },
    { id: 4, title: 'Provide content for About page', status: 'Pending', dueDate: '2024-12-08', priority: 'Medium' }
  ];

  const clientFiles = [
    { id: 1, name: 'Design_Mockups_v2.pdf', category: 'Designs', date: '2024-12-01', size: '5.2 MB' },
    { id: 2, name: 'Project_Timeline.xlsx', category: 'Planning', date: '2024-11-28', size: '1.1 MB' },
    { id: 3, name: 'API_Documentation.pdf', category: 'Technical', date: '2024-12-02', size: '2.8 MB' }
  ];

  const queries = [
    { 
      id: 1, 
      subject: 'Question about mobile responsiveness', 
      status: 'Resolved', 
      date: '2024-11-28',
      response: 'We have implemented fully responsive design that works on all devices.',
      attachments: 1
    },
    { 
      id: 2, 
      subject: 'Request for additional feature', 
      status: 'In Review', 
      date: '2024-12-01',
      response: 'Under review by the project manager. Will update soon.',
      attachments: 0
    },
    { 
      id: 3, 
      subject: 'Timeline extension request', 
      status: 'Open', 
      date: '2024-12-03',
      response: null,
      attachments: 0
    }
  ];

  const payments = [
    {
      id: 1,
      invoice: 'INV-2024-001',
      description: 'Project Kickoff Payment',
      amount: 5000,
      status: 'Paid',
      dueDate: '2024-11-05',
      paidDate: '2024-11-03'
    },
    {
      id: 2,
      invoice: 'INV-2024-002',
      description: 'Design Phase Completion',
      amount: 12000,
      status: 'Paid',
      dueDate: '2024-11-20',
      paidDate: '2024-11-18'
    },
    {
      id: 3,
      invoice: 'INV-2024-003',
      description: 'Development Milestone 1',
      amount: 18000,
      status: 'Pending',
      dueDate: '2024-12-10',
      paidDate: null
    }
  ];

  const proposals = [
    { id: 1, title: 'Website Redesign Proposal', status: 'Accepted', date: '2024-10-15', amount: 45000 },
    { id: 2, title: 'Additional Features Proposal', status: 'Under Review', date: '2024-12-01', amount: 8000 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
      case 'Resolved':
      case 'Paid':
      case 'Accepted':
        return 'status-completed';
      case 'In Progress':
      case 'In Review':
      case 'Pending':
      case 'Under Review':
        return 'status-pending';
      case 'Open':
        return 'status-inprogress';
      default:
        return '';
    }
  };

  return (
    <div className="tab-content">
      <div className="client-portal-header">
        <div className="portal-welcome">
          <Eye size={24} />
          <div>
            <h3>Client Portal</h3>
            <p>View project progress, tasks, and manage payments</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="sub-tabs">
        <button 
          className={`sub-tab ${activeView === 'progress' ? 'active' : ''}`}
          onClick={() => setActiveView('progress')}
        >
          <Eye size={16} />
          Progress
        </button>
        <button 
          className={`sub-tab ${activeView === 'tasks' ? 'active' : ''}`}
          onClick={() => setActiveView('tasks')}
        >
          <CheckSquare size={16} />
          Tasks & Approvals
        </button>
        <button 
          className={`sub-tab ${activeView === 'files' ? 'active' : ''}`}
          onClick={() => setActiveView('files')}
        >
          <FileText size={16} />
          Files
        </button>
        <button 
          className={`sub-tab ${activeView === 'queries' ? 'active' : ''}`}
          onClick={() => setActiveView('queries')}
        >
          <MessageCircle size={16} />
          Queries
        </button>
        <button 
          className={`sub-tab ${activeView === 'payments' ? 'active' : ''}`}
          onClick={() => setActiveView('payments')}
        >
          <DollarSign size={16} />
          Payments
        </button>
      </div>

      {/* Progress View */}
      {activeView === 'progress' && (
        <div className="section-content">
          <div className="project-details-card">
            <h3 className="card-section-title">Overall Project Progress</h3>
            <div className="progress-section large">
              <div className="progress-header">
                <span>Project Completion</span>
                <span className="progress-percentage">{projectProgress.overall}%</span>
              </div>
              <div className="progress-bar large">
                <div 
                  className="progress-bar-fill" 
                  style={{ width: `${projectProgress.overall}%` }}
                ></div>
              </div>
            </div>

            <div className="milestones-grid">
              {projectProgress.milestones.map((milestone, idx) => (
                <div key={idx} className="milestone-summary-card">
                  <h4>{milestone.name}</h4>
                  <span className={`status-badge ${getStatusColor(milestone.status)}`}>
                    {milestone.status}
                  </span>
                  <div className="progress-bar small mt-2">
                    <div 
                      className="progress-bar-fill" 
                      style={{ width: `${milestone.progress}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="project-details-card">
            <h3 className="card-section-title">Recent Updates</h3>
            <div className="updates-timeline">
              {projectProgress.recentUpdates.map((update, idx) => (
                <div key={idx} className="update-item">
                  <div className="update-date">{update.date}</div>
                  <div className="update-content">{update.update}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tasks & Approvals View */}
      {activeView === 'tasks' && (
        <div className="section-content">
          <div className="section-header">
            <h3>Tasks Requiring Your Attention</h3>
          </div>

          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Task</th>
                  <th>Status</th>
                  <th>Priority</th>
                  <th>Due Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {clientTasks.map((task) => (
                  <tr key={task.id}>
                    <td className="td-bold">{task.title}</td>
                    <td>
                      <span className={`status-badge ${getStatusColor(task.status)}`}>
                        {task.status}
                      </span>
                    </td>
                    <td>
                      <span className={`priority-badge priority-${task.priority.toLowerCase()}`}>
                        {task.priority}
                      </span>
                    </td>
                    <td>{task.dueDate}</td>
                    <td>
                      {task.status === 'Pending' && (
                        <div className="action-buttons">
                          <button className="btn-primary small">
                            <ThumbsUp size={14} />
                            Approve
                          </button>
                          <button className="btn-secondary small">
                            <Upload size={14} />
                            Upload
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Files View */}
      {activeView === 'files' && (
        <div className="section-content">
          <div className="section-header">
            <h3>Project Files</h3>
            <button className="btn-primary">
              <Upload size={16} />
              Upload Document
            </button>
          </div>

          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>File Name</th>
                  <th>Category</th>
                  <th>Upload Date</th>
                  <th>Size</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {clientFiles.map((file) => (
                  <tr key={file.id}>
                    <td className="td-bold">
                      <FileText size={16} className="mr-2" />
                      {file.name}
                    </td>
                    <td>{file.category}</td>
                    <td>{file.date}</td>
                    <td>{file.size}</td>
                    <td>
                      <button className="icon-btn-small" title="Download">
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

      {/* Queries View */}
      {activeView === 'queries' && (
        <div className="section-content">
          <div className="section-header">
            <h3>Your Queries</h3>
            <button className="btn-primary">
              <MessageCircle size={16} />
              Raise New Query
            </button>
          </div>

          <div className="queries-list">
            {queries.map((query) => (
              <div key={query.id} className="query-card">
                <div className="query-header">
                  <h4>{query.subject}</h4>
                  <span className={`status-badge ${getStatusColor(query.status)}`}>
                    {query.status}
                  </span>
                </div>
                <div className="query-meta">
                  <Clock size={14} />
                  <span>{query.date}</span>
                  {query.attachments > 0 && (
                    <>
                      <FileText size={14} className="ml-3" />
                      <span>{query.attachments} attachment(s)</span>
                    </>
                  )}
                </div>
                {query.response && (
                  <div className="query-response">
                    <strong>Response:</strong> {query.response}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Payments View */}
      {activeView === 'payments' && (
        <div className="section-content">
          {/* Invoices */}
          <div className="project-details-card">
            <h3 className="card-section-title">
              <Receipt size={20} />
              Invoices
            </h3>
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Invoice #</th>
                    <th>Description</th>
                    <th>Amount</th>
                    <th>Due Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((payment) => (
                    <tr key={payment.id}>
                      <td className="td-bold">{payment.invoice}</td>
                      <td>{payment.description}</td>
                      <td>₹{payment.amount.toLocaleString()}</td>
                      <td>{payment.dueDate}</td>
                      <td>
                        <span className={`status-badge ${getStatusColor(payment.status)}`}>
                          {payment.status}
                        </span>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button className="icon-btn-small" title="Download">
                            <Download size={14} />
                          </button>
                          {payment.status === 'Pending' && (
                            <button className="btn-primary small">
                              <CreditCard size={14} />
                              Pay Now
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Proposals */}
          <div className="project-details-card">
            <h3 className="card-section-title">
              <FileText size={20} />
              Proposals
            </h3>
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Proposal</th>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {proposals.map((proposal) => (
                    <tr key={proposal.id}>
                      <td className="td-bold">{proposal.title}</td>
                      <td>{proposal.date}</td>
                      <td>₹{proposal.amount.toLocaleString()}</td>
                      <td>
                        <span className={`status-badge ${getStatusColor(proposal.status)}`}>
                          {proposal.status}
                        </span>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button className="icon-btn-small">
                            <Eye size={14} />
                          </button>
                          {proposal.status === 'Under Review' && (
                            <button className="btn-primary small">
                              <ThumbsUp size={14} />
                              Accept
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Payment Records */}
          <div className="payment-summary-grid">
            <div className="payment-stat-card">
              <DollarSign size={24} className="stat-icon-green" />
              <div>
                <span className="stat-label">Total Paid</span>
                <span className="stat-value success">
                  ₹{payments.filter(p => p.status === 'Paid').reduce((sum, p) => sum + p.amount, 0).toLocaleString()}
                </span>
              </div>
            </div>
            <div className="payment-stat-card">
              <AlertCircle size={24} className="stat-icon-orange" />
              <div>
                <span className="stat-label">Pending Payment</span>
                <span className="stat-value warning">
                  ₹{payments.filter(p => p.status === 'Pending').reduce((sum, p) => sum + p.amount, 0).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientPortal;
