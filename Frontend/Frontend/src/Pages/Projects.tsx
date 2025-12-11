import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { 
  FolderKanban, 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Users, 
  Clock, 
  CheckSquare,
  BarChart3,
  DollarSign,
  Target,
  Briefcase,
  X,
  Tag
} from 'lucide-react';

const Projects: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    const saved = localStorage.getItem('sidebarOpen');
    return saved ? JSON.parse(saved) : false;
  });

  const handleSidebarToggle = () => {
    const newState = !sidebarOpen;
    setSidebarOpen(newState);
    localStorage.setItem('sidebarOpen', JSON.stringify(newState));
  };
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedProject, setSelectedProject] = useState(1);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [taskFormData, setTaskFormData] = useState({
    subject: '',
    hourlyRate: 0,
    startDate: new Date().toISOString().split('T')[0],
    dueDate: '',
    priority: 'Medium',
    repeatEvery: '',
    relatedTo: '',
    assignees: 'Ragini',
    followers: '',
    tags: '',
    description: '',
    isPublic: false,
    isBillable: true
  });

  const projects = [
    {
      id: 1,
      name: 'Website Redesign',
      client: 'Acme Corp',
      status: 'In Progress',
      progress: 75,
      startDate: '2024-11-01',
      deadline: '2024-12-15',
      budget: 45000,
      spent: 33750,
      team: 5,
      tasks: { total: 24, completed: 18, inProgress: 4, pending: 2 },
      priority: 'High',
      description: 'Complete overhaul of company website with modern design and improved UX'
    },
    {
      id: 2,
      name: 'Mobile App Development',
      client: 'Tech Solutions',
      status: 'In Progress',
      progress: 60,
      startDate: '2024-10-15',
      deadline: '2025-01-30',
      budget: 85000,
      spent: 51000,
      team: 8,
      tasks: { total: 45, completed: 27, inProgress: 12, pending: 6 },
      priority: 'High',
      description: 'Native mobile application for iOS and Android platforms'
    },
    {
      id: 3,
      name: 'CRM Implementation',
      client: 'Global Ventures',
      status: 'Planning',
      progress: 25,
      startDate: '2024-12-01',
      deadline: '2025-03-15',
      budget: 120000,
      spent: 30000,
      team: 6,
      tasks: { total: 60, completed: 15, inProgress: 8, pending: 37 },
      priority: 'Medium',
      description: 'Implementation of enterprise CRM system with custom integrations'
    },
    {
      id: 4,
      name: 'E-commerce Platform',
      client: 'Retail Plus',
      status: 'Completed',
      progress: 100,
      startDate: '2024-08-01',
      deadline: '2024-11-30',
      budget: 95000,
      spent: 92000,
      team: 7,
      tasks: { total: 38, completed: 38, inProgress: 0, pending: 0 },
      priority: 'High',
      description: 'Full-featured e-commerce platform with payment gateway integration'
    }
  ];

  const tasks = [
    { id: 1, projectId: 1, title: 'Design homepage mockup', assignee: 'Priya Sharma', status: 'Completed', priority: 'High', dueDate: '2024-12-05', hours: 8 },
    { id: 2, projectId: 1, title: 'Implement responsive layout', assignee: 'Rajesh Kumar', status: 'In Progress', priority: 'High', dueDate: '2024-12-08', hours: 16 },
    { id: 3, projectId: 1, title: 'API integration', assignee: 'Amit Patel', status: 'In Progress', priority: 'Medium', dueDate: '2024-12-10', hours: 12 },
    { id: 4, projectId: 1, title: 'Testing and QA', assignee: 'Sneha Reddy', status: 'Pending', priority: 'Medium', dueDate: '2024-12-12', hours: 10 },
    { id: 5, projectId: 1, title: 'Deploy to production', assignee: 'Vikram Singh', status: 'Pending', priority: 'High', dueDate: '2024-12-15', hours: 4 },
    { id: 6, projectId: 2, title: 'User authentication module', assignee: 'Deepa Nair', status: 'Completed', priority: 'High', dueDate: '2024-11-20', hours: 20 },
    { id: 7, projectId: 2, title: 'Payment gateway setup', assignee: 'Karan Mehta', status: 'In Progress', priority: 'High', dueDate: '2024-12-15', hours: 24 },
    { id: 8, projectId: 2, title: 'Push notifications', assignee: 'Anita Desai', status: 'In Progress', priority: 'Medium', dueDate: '2024-12-20', hours: 16 }
  ];

  const timesheets = [
    { id: 1, projectId: 1, employee: 'Priya Sharma', date: '2024-12-01', hours: 8, task: 'Homepage design', billable: true },
    { id: 2, projectId: 1, employee: 'Rajesh Kumar', date: '2024-12-01', hours: 7.5, task: 'Frontend development', billable: true },
    { id: 3, projectId: 1, employee: 'Amit Patel', date: '2024-12-01', hours: 6, task: 'API development', billable: true },
    { id: 4, projectId: 1, employee: 'Priya Sharma', date: '2024-12-02', hours: 8, task: 'UI refinements', billable: true },
    { id: 5, projectId: 1, employee: 'Sneha Reddy', date: '2024-12-02', hours: 4, task: 'Testing', billable: false },
    { id: 6, projectId: 2, employee: 'Deepa Nair', date: '2024-12-01', hours: 8, task: 'Authentication setup', billable: true },
    { id: 7, projectId: 2, employee: 'Karan Mehta', date: '2024-12-01', hours: 7, task: 'Payment integration', billable: true },
    { id: 8, projectId: 2, employee: 'Anita Desai', date: '2024-12-02', hours: 6.5, task: 'Push notification config', billable: true }
  ];

  const currentProject = projects.find(p => p.id === selectedProject) || projects[0];
  const projectTasks = tasks.filter(t => t.projectId === selectedProject);
  const projectTimesheets = timesheets.filter(t => t.projectId === selectedProject);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Progress': return 'status-inprogress';
      case 'Planning': return 'status-planning';
      case 'Completed': return 'status-completed';
      case 'On Hold': return 'status-onhold';
      default: return '';
    }
  };

  const getTaskStatusColor = (status: string) => {
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
    <div className="dashboard-layout">
      <Sidebar isOpen={sidebarOpen} onToggle={handleSidebarToggle} />
      
      <div className={`main-content ${sidebarOpen ? 'sidebar-open' : ''}`}>
        <Header onMenuClick={handleSidebarToggle} />
        
        <div className="page-container">
          {/* Page Header */}
          <div className="page-header">
            <div className="page-header-left">
              <FolderKanban size={32} className="page-icon" />
              <div>
                <h1 className="page-title">Projects</h1>
                <p className="page-subtitle">Manage projects, tasks, and timesheets</p>
              </div>
            </div>
            <div className="page-header-right">
              <button className="btn-secondary">
                <Filter size={18} />
                Filter
              </button>
              <button className="btn-primary">
                <Plus size={18} />
                New Project
              </button>
            </div>
          </div>

          {/* Project Selector */}
          <div className="project-selector">
            <label className="project-selector-label">Select Project:</label>
            <select 
              className="project-selector-dropdown"
              value={selectedProject}
              onChange={(e) => setSelectedProject(Number(e.target.value))}
            >
              {projects.map(project => (
                <option key={project.id} value={project.id}>
                  {project.name} - {project.client}
                </option>
              ))}
            </select>
          </div>

          {/* Tabs */}
          <div className="tabs">
            <button 
              className={`tab ${activeTab === 'overview' ? 'tab-active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              <Briefcase size={18} />
              Project Overview
            </button>
            <button 
              className={`tab ${activeTab === 'tasks' ? 'tab-active' : ''}`}
              onClick={() => setActiveTab('tasks')}
            >
              <CheckSquare size={18} />
              Tasks
            </button>
            <button 
              className={`tab ${activeTab === 'timesheets' ? 'tab-active' : ''}`}
              onClick={() => setActiveTab('timesheets')}
            >
              <Clock size={18} />
              Timesheets
            </button>
          </div>

          {/* Project Overview Tab */}
          {activeTab === 'overview' && (
            <div className="tab-content">
              {/* Project Stats */}
              <div className="project-overview-stats">
                <div className="overview-stat-card">
                  <div className="overview-stat-icon icon-blue">
                    <BarChart3 size={24} />
                  </div>
                  <div className="overview-stat-content">
                    <h4 className="overview-stat-value">{currentProject.progress}%</h4>
                    <p className="overview-stat-label">Progress</p>
                  </div>
                </div>
                <div className="overview-stat-card">
                  <div className="overview-stat-icon icon-green">
                    <DollarSign size={24} />
                  </div>
                  <div className="overview-stat-content">
                    <h4 className="overview-stat-value">₹{(currentProject.budget / 1000).toFixed(0)}K</h4>
                    <p className="overview-stat-label">Budget</p>
                  </div>
                </div>
                <div className="overview-stat-card">
                  <div className="overview-stat-icon icon-orange">
                    <DollarSign size={24} />
                  </div>
                  <div className="overview-stat-content">
                    <h4 className="overview-stat-value">₹{(currentProject.spent / 1000).toFixed(0)}K</h4>
                    <p className="overview-stat-label">Spent</p>
                  </div>
                </div>
                <div className="overview-stat-card">
                  <div className="overview-stat-icon icon-purple">
                    <Users size={24} />
                  </div>
                  <div className="overview-stat-content">
                    <h4 className="overview-stat-value">{currentProject.team}</h4>
                    <p className="overview-stat-label">Team Members</p>
                  </div>
                </div>
              </div>

              {/* Project Details */}
              <div className="project-details-grid">
                <div className="project-details-card">
                  <h3 className="card-section-title">Project Information</h3>
                  <div className="project-info-list">
                    <div className="project-info-item">
                      <span className="info-label">Client:</span>
                      <span className="info-value">{currentProject.client}</span>
                    </div>
                    <div className="project-info-item">
                      <span className="info-label">Status:</span>
                      <span className={`status-badge ${getStatusColor(currentProject.status)}`}>
                        {currentProject.status}
                      </span>
                    </div>
                    <div className="project-info-item">
                      <span className="info-label">Priority:</span>
                      <span className={`priority-badge ${getPriorityColor(currentProject.priority)}`}>
                        {currentProject.priority}
                      </span>
                    </div>
                    <div className="project-info-item">
                      <span className="info-label">Start Date:</span>
                      <span className="info-value">{currentProject.startDate}</span>
                    </div>
                    <div className="project-info-item">
                      <span className="info-label">Deadline:</span>
                      <span className="info-value">{currentProject.deadline}</span>
                    </div>
                    <div className="project-info-item full-width">
                      <span className="info-label">Description:</span>
                      <p className="info-description">{currentProject.description}</p>
                    </div>
                  </div>
                </div>

                <div className="project-details-card">
                  <h3 className="card-section-title">Task Summary</h3>
                  <div className="task-summary-list">
                    <div className="task-summary-item">
                      <div className="task-summary-label">
                        <div className="task-summary-dot completed"></div>
                        Completed Tasks
                      </div>
                      <div className="task-summary-value">{currentProject.tasks.completed}</div>
                    </div>
                    <div className="task-summary-item">
                      <div className="task-summary-label">
                        <div className="task-summary-dot inprogress"></div>
                        In Progress
                      </div>
                      <div className="task-summary-value">{currentProject.tasks.inProgress}</div>
                    </div>
                    <div className="task-summary-item">
                      <div className="task-summary-label">
                        <div className="task-summary-dot pending"></div>
                        Pending
                      </div>
                      <div className="task-summary-value">{currentProject.tasks.pending}</div>
                    </div>
                    <div className="task-summary-item total">
                      <div className="task-summary-label">Total Tasks</div>
                      <div className="task-summary-value">{currentProject.tasks.total}</div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="progress-section">
                    <div className="progress-header">
                      <span>Overall Progress</span>
                      <span className="progress-percentage">{currentProject.progress}%</span>
                    </div>
                    <div className="progress-bar">
                      <div 
                        className="progress-bar-fill" 
                        style={{ width: `${currentProject.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tasks Tab */}
          {activeTab === 'tasks' && (
            <div className="tab-content">
              <div className="tab-content-header">
                <div className="search-box">
                  <Search size={18} />
                  <input type="text" placeholder="Search tasks..." />
                </div>
                <button className="btn-primary" onClick={() => setShowTaskModal(true)}>
                  <Plus size={18} />
                  Add Task
                </button>
              </div>

              <div className="table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Task</th>
                      <th>Assignee</th>
                      <th>Status</th>
                      <th>Priority</th>
                      <th>Due Date</th>
                      <th>Hours</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projectTasks.map(task => (
                      <tr key={task.id}>
                        <td className="td-bold">{task.title}</td>
                        <td>
                          <div className="user-cell">
                            <div className="user-avatar">
                              {task.assignee.split(' ').map(n => n[0]).join('')}
                            </div>
                            {task.assignee}
                          </div>
                        </td>
                        <td>
                          <span className={`status-badge ${getTaskStatusColor(task.status)}`}>
                            {task.status}
                          </span>
                        </td>
                        <td>
                          <span className={`priority-badge ${getPriorityColor(task.priority)}`}>
                            {task.priority}
                          </span>
                        </td>
                        <td>{task.dueDate}</td>
                        <td className="td-center">{task.hours}h</td>
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

          {/* Timesheets Tab */}
          {activeTab === 'timesheets' && (
            <div className="tab-content">
              <div className="tab-content-header">
                <div className="timesheet-summary">
                  <div className="timesheet-stat">
                    <Clock size={20} />
                    <div>
                      <div className="timesheet-stat-value">
                        {projectTimesheets.reduce((sum, ts) => sum + ts.hours, 0)}h
                      </div>
                      <div className="timesheet-stat-label">Total Hours</div>
                    </div>
                  </div>
                  <div className="timesheet-stat">
                    <Target size={20} />
                    <div>
                      <div className="timesheet-stat-value">
                        {projectTimesheets.filter(ts => ts.billable).reduce((sum, ts) => sum + ts.hours, 0)}h
                      </div>
                      <div className="timesheet-stat-label">Billable Hours</div>
                    </div>
                  </div>
                </div>
                <button className="btn-primary">
                  <Plus size={18} />
                  Log Time
                </button>
              </div>

              <div className="table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Employee</th>
                      <th>Task</th>
                      <th>Hours</th>
                      <th>Billable</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projectTimesheets.map(timesheet => (
                      <tr key={timesheet.id}>
                        <td>{timesheet.date}</td>
                        <td>
                          <div className="user-cell">
                            <div className="user-avatar">
                              {timesheet.employee.split(' ').map(n => n[0]).join('')}
                            </div>
                            {timesheet.employee}
                          </div>
                        </td>
                        <td className="td-bold">{timesheet.task}</td>
                        <td className="td-center">{timesheet.hours}h</td>
                        <td>
                          <span className={`billable-badge ${timesheet.billable ? 'billable-yes' : 'billable-no'}`}>
                            {timesheet.billable ? 'Yes' : 'No'}
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
        </div>
      </div>

      {/* Add Task Modal */}
      {showTaskModal && (
        <div className="modal-overlay" onClick={() => setShowTaskModal(false)}>
          <div className="modal-container task-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Add new task</h2>
              <button className="modal-close" onClick={() => setShowTaskModal(false)}>
                <X size={20} />
              </button>
            </div>
            
            <form className="modal-form" onSubmit={(e) => {
              e.preventDefault();
              // Handle task creation
              console.log('Task data:', taskFormData);
              setShowTaskModal(false);
            }}>
              {/* Checkboxes at top with Attach Files link */}
              <div className="form-top-row">
                <div className="checkbox-group-top">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={taskFormData.isPublic}
                      onChange={(e) => setTaskFormData({ ...taskFormData, isPublic: e.target.checked })}
                    />
                    <span>Public</span>
                  </label>
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={taskFormData.isBillable}
                      onChange={(e) => setTaskFormData({ ...taskFormData, isBillable: e.target.checked })}
                    />
                    <span>Billable</span>
                  </label>
                </div>
                <button type="button" className="attach-files-link">
                  Attach Files
                </button>
              </div>

              {/* Subject */}
              <div className="form-row">
                <div className="form-group full-width">
                  <label htmlFor="subject">
                    <span className="required">*</span> Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    value={taskFormData.subject}
                    onChange={(e) => setTaskFormData({ ...taskFormData, subject: e.target.value })}
                    required
                  />
                </div>
              </div>

              {/* Hourly Rate */}
              <div className="form-row">
                <div className="form-group full-width">
                  <label htmlFor="hourlyRate">Hourly Rate</label>
                  <input
                    type="number"
                    id="hourlyRate"
                    value={taskFormData.hourlyRate || ''}
                    onChange={(e) => setTaskFormData({ ...taskFormData, hourlyRate: parseFloat(e.target.value) || 0 })}
                    placeholder="0"
                  />
                </div>
              </div>

              {/* Start Date and Due Date */}
              <div className="form-row two-cols">
                <div className="form-group">
                  <label htmlFor="startDate">
                    <span className="required">*</span> Start Date
                  </label>
                  <input
                    type="date"
                    id="startDate"
                    value={taskFormData.startDate}
                    onChange={(e) => setTaskFormData({ ...taskFormData, startDate: e.target.value })}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="dueDate">Due Date</label>
                  <input
                    type="date"
                    id="dueDate"
                    value={taskFormData.dueDate}
                    onChange={(e) => setTaskFormData({ ...taskFormData, dueDate: e.target.value })}
                  />
                </div>
              </div>

              {/* Priority */}
              <div className="form-row">
                <div className="form-group priority-group">
                  <label htmlFor="priority">Priority</label>
                  <select
                    id="priority"
                    value={taskFormData.priority}
                    onChange={(e) => setTaskFormData({ ...taskFormData, priority: e.target.value })}
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Urgent">Urgent</option>
                  </select>
                </div>
              </div>

              {/* Repeat every */}
              <div className="form-row">
                <div className="form-group full-width">
                  <label htmlFor="repeatEvery">Repeat every</label>
                  <select
                    id="repeatEvery"
                    value={taskFormData.repeatEvery}
                    onChange={(e) => setTaskFormData({ ...taskFormData, repeatEvery: e.target.value })}
                  >
                    <option value="">Non selected</option>
                    <option value="Daily">Daily</option>
                    <option value="Weekly">Weekly</option>
                    <option value="Monthly">Monthly</option>
                    <option value="Yearly">Yearly</option>
                  </select>
                </div>
              </div>

              {/* Related To */}
              <div className="form-row">
                <div className="form-group full-width">
                  <label htmlFor="relatedTo">Related To</label>
                  <select
                    id="relatedTo"
                    value={taskFormData.relatedTo}
                    onChange={(e) => setTaskFormData({ ...taskFormData, relatedTo: e.target.value })}
                  >
                    <option value="">Non selected</option>
                    <option value="Project">Project</option>
                    <option value="Customer">Customer</option>
                    <option value="Vendor">Vendor</option>
                  </select>
                </div>
              </div>

              {/* Assignees and Followers */}
              <div className="form-row two-cols">
                <div className="form-group">
                  <label htmlFor="assignees">Assignees</label>
                  <select
                    id="assignees"
                    value={taskFormData.assignees}
                    onChange={(e) => setTaskFormData({ ...taskFormData, assignees: e.target.value })}
                    className="select-with-value"
                  >
                    <option value="Ragini">Ragini</option>
                    <option value="User 1">User 1</option>
                    <option value="User 2">User 2</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label htmlFor="followers">Followers</label>
                  <select
                    id="followers"
                    value={taskFormData.followers}
                    onChange={(e) => setTaskFormData({ ...taskFormData, followers: e.target.value })}
                  >
                    <option value="">Non selected</option>
                    <option value="Follower 1">Follower 1</option>
                    <option value="Follower 2">Follower 2</option>
                  </select>
                </div>
              </div>

              {/* Tags */}
              <div className="form-row">
                <div className="form-group full-width">
                  <label htmlFor="tags">
                    <Tag size={14} /> Tags
                  </label>
                  <input
                    type="text"
                    id="tags"
                    value={taskFormData.tags}
                    onChange={(e) => setTaskFormData({ ...taskFormData, tags: e.target.value })}
                    placeholder="Tag"
                    className="tags-input"
                  />
                </div>
              </div>

              {/* Task Description */}
              <div className="form-row">
                <div className="form-group full-width">
                  <label htmlFor="description">Task Description</label>
                  <textarea
                    id="description"
                    rows={4}
                    value={taskFormData.description}
                    onChange={(e) => setTaskFormData({ ...taskFormData, description: e.target.value })}
                    placeholder="Add Description"
                  />
                </div>
              </div>

              {/* Footer Buttons */}
              <div className="modal-footer">
                <button type="button" className="btn-secondary" onClick={() => setShowTaskModal(false)}>
                  Close
                </button>
                <button type="submit" className="btn-primary">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;
