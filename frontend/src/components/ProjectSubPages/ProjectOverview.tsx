import React, { useState } from 'react';
import { 
  BarChart3, 
  DollarSign, 
  Users, 
  Calendar,
  Target,
  Paperclip,
  Upload,
  FileText,
  Download,
  Trash2
} from 'lucide-react';

interface ProjectOverviewProps {
  project: any;
}

const ProjectOverview: React.FC<ProjectOverviewProps> = ({ project }) => {
  const [showFileUpload, setShowFileUpload] = useState(false);
  const [files, setFiles] = useState([
    { id: 1, name: 'Project_Brief.pdf', size: '2.4 MB', uploadedBy: 'Priya Sharma', date: '2024-11-15' },
    { id: 2, name: 'Requirements.docx', size: '1.8 MB', uploadedBy: 'Rajesh Kumar', date: '2024-11-20' }
  ]);

  const milestones = [
    { id: 1, title: 'Project Kickoff', date: '2024-11-01', status: 'Completed', progress: 100 },
    { id: 2, title: 'Design Phase Complete', date: '2024-11-15', status: 'Completed', progress: 100 },
    { id: 3, title: 'Development Phase', date: '2024-12-10', status: 'In Progress', progress: 75 },
    { id: 4, title: 'Testing & QA', date: '2024-12-20', status: 'Pending', progress: 0 },
    { id: 5, title: 'Final Delivery', date: '2024-12-31', status: 'Pending', progress: 0 }
  ];

  const resourceAllocation = [
    { id: 1, name: 'Priya Sharma', role: 'UI/UX Designer', allocation: '80%', hours: '32h/week' },
    { id: 2, name: 'Rajesh Kumar', role: 'Frontend Developer', allocation: '100%', hours: '40h/week' },
    { id: 3, name: 'Amit Patel', role: 'Backend Developer', allocation: '100%', hours: '40h/week' },
    { id: 4, name: 'Sneha Reddy', role: 'QA Engineer', allocation: '60%', hours: '24h/week' },
    { id: 5, name: 'Vikram Singh', role: 'DevOps', allocation: '40%', hours: '16h/week' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'status-completed';
      case 'In Progress': return 'status-inprogress';
      case 'Pending': return 'status-pending';
      default: return '';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'priority-high';
      case 'Medium': return 'priority-medium';
      case 'Low': return 'priority-low';
      default: return '';
    }
  };

  return (
    <div className="tab-content">
      {/* Project Stats */}
      <div className="project-overview-stats">
        <div className="overview-stat-card">
          <div className="overview-stat-icon icon-blue">
            <BarChart3 size={24} />
          </div>
          <div className="overview-stat-content">
            <h4 className="overview-stat-value">{project.progress}%</h4>
            <p className="overview-stat-label">Progress</p>
          </div>
        </div>
        <div className="overview-stat-card">
          <div className="overview-stat-icon icon-green">
            <DollarSign size={24} />
          </div>
          <div className="overview-stat-content">
            <h4 className="overview-stat-value">₹{(project.budget / 1000).toFixed(0)}K</h4>
            <p className="overview-stat-label">Budget</p>
          </div>
        </div>
        <div className="overview-stat-card">
          <div className="overview-stat-icon icon-orange">
            <DollarSign size={24} />
          </div>
          <div className="overview-stat-content">
            <h4 className="overview-stat-value">₹{(project.spent / 1000).toFixed(0)}K</h4>
            <p className="overview-stat-label">Spent</p>
          </div>
        </div>
        <div className="overview-stat-card">
          <div className="overview-stat-icon icon-purple">
            <Users size={24} />
          </div>
          <div className="overview-stat-content">
            <h4 className="overview-stat-value">{project.team}</h4>
            <p className="overview-stat-label">Team Members</p>
          </div>
        </div>
      </div>

      {/* Project Details and Task Summary Grid */}
      <div className="project-details-grid">
        {/* Project Information */}
        <div className="project-details-card">
          <h3 className="card-section-title">Project Information</h3>
          <div className="project-info-list">
            <div className="project-info-item">
              <span className="info-label">Client:</span>
              <span className="info-value">{project.client}</span>
            </div>
            <div className="project-info-item">
              <span className="info-label">Status:</span>
              <span className={`status-badge ${getStatusColor(project.status)}`}>
                {project.status}
              </span>
            </div>
            <div className="project-info-item">
              <span className="info-label">Priority:</span>
              <span className={`priority-badge ${getPriorityColor(project.priority)}`}>
                {project.priority}
              </span>
            </div>
            <div className="project-info-item">
              <span className="info-label">Category:</span>
              <span className="info-value">Web Development</span>
            </div>
            <div className="project-info-item">
              <span className="info-label">Billing Type:</span>
              <span className="info-value">Fixed Price</span>
            </div>
            <div className="project-info-item">
              <span className="info-label">Start Date:</span>
              <span className="info-value">{project.startDate}</span>
            </div>
            <div className="project-info-item">
              <span className="info-label">Deadline:</span>
              <span className="info-value">{project.deadline}</span>
            </div>
            <div className="project-info-item">
              <span className="info-label">Project Manager:</span>
              <span className="info-value">Vikram Singh</span>
            </div>
            <div className="project-info-item full-width">
              <span className="info-label">Objectives:</span>
              <p className="info-description">Redesign company website with modern UI/UX, improve site performance, implement responsive design, and enhance user engagement.</p>
            </div>
            <div className="project-info-item full-width">
              <span className="info-label">Description:</span>
              <p className="info-description">{project.description}</p>
            </div>
          </div>
        </div>

        {/* Task Summary */}
        <div className="project-details-card">
          <h3 className="card-section-title">Task Summary</h3>
          <div className="task-summary-list">
            <div className="task-summary-item">
              <div className="task-summary-label">
                <div className="task-summary-dot completed"></div>
                Completed Tasks
              </div>
              <div className="task-summary-value">{project.tasks.completed}</div>
            </div>
            <div className="task-summary-item">
              <div className="task-summary-label">
                <div className="task-summary-dot inprogress"></div>
                In Progress
              </div>
              <div className="task-summary-value">{project.tasks.inProgress}</div>
            </div>
            <div className="task-summary-item">
              <div className="task-summary-label">
                <div className="task-summary-dot pending"></div>
                Pending
              </div>
              <div className="task-summary-value">{project.tasks.pending}</div>
            </div>
            <div className="task-summary-item total">
              <div className="task-summary-label">Total Tasks</div>
              <div className="task-summary-value">{project.tasks.total}</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="progress-section">
            <div className="progress-header">
              <span>Overall Progress</span>
              <span className="progress-percentage">{project.progress}%</span>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-bar-fill" 
                style={{ width: `${project.progress}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Milestones Section */}
      <div className="project-details-card">
        <h3 className="card-section-title">
          <Target size={20} />
          Project Milestones
        </h3>
        <div className="milestones-timeline">
          {milestones.map((milestone) => (
            <div key={milestone.id} className="milestone-item">
              <div className="milestone-indicator">
                <div className={`milestone-dot ${milestone.status.toLowerCase().replace(' ', '-')}`}></div>
                <div className="milestone-line"></div>
              </div>
              <div className="milestone-content">
                <div className="milestone-header">
                  <h4>{milestone.title}</h4>
                  <span className={`status-badge ${getStatusColor(milestone.status)}`}>
                    {milestone.status}
                  </span>
                </div>
                <div className="milestone-details">
                  <span className="milestone-date">
                    <Calendar size={14} />
                    {milestone.date}
                  </span>
                  <div className="milestone-progress">
                    <div className="progress-bar small">
                      <div 
                        className="progress-bar-fill" 
                        style={{ width: `${milestone.progress}%` }}
                      ></div>
                    </div>
                    <span className="progress-text">{milestone.progress}%</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Resource Allocation Matrix */}
      <div className="project-details-card">
        <h3 className="card-section-title">
          <Users size={20} />
          Resource Allocation Matrix
        </h3>
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Team Member</th>
                <th>Role</th>
                <th>Allocation</th>
                <th>Hours/Week</th>
              </tr>
            </thead>
            <tbody>
              {resourceAllocation.map((resource) => (
                <tr key={resource.id}>
                  <td>
                    <div className="user-cell">
                      <div className="user-avatar">
                        {resource.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      {resource.name}
                    </div>
                  </td>
                  <td>{resource.role}</td>
                  <td>
                    <div className="allocation-bar">
                      <div 
                        className="allocation-fill" 
                        style={{ width: resource.allocation }}
                      ></div>
                      <span className="allocation-text">{resource.allocation}</span>
                    </div>
                  </td>
                  <td>{resource.hours}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Project Files */}
      <div className="project-details-card">
        <div className="card-header-with-action">
          <h3 className="card-section-title">
            <Paperclip size={20} />
            Project Files
          </h3>
          <button className="btn-primary" onClick={() => setShowFileUpload(true)}>
            <Upload size={16} />
            Upload File
          </button>
        </div>
        <div className="files-list">
          {files.map((file) => (
            <div key={file.id} className="file-item">
              <div className="file-icon">
                <FileText size={24} />
              </div>
              <div className="file-details">
                <h4>{file.name}</h4>
                <p>{file.size} • Uploaded by {file.uploadedBy} • {file.date}</p>
              </div>
              <div className="file-actions">
                <button className="icon-btn-small" title="Download">
                  <Download size={16} />
                </button>
                <button className="icon-btn-small" title="Delete">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectOverview;
