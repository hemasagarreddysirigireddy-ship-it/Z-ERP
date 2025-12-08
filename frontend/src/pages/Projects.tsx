import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import ProjectOverview from '../components/ProjectSubPages/ProjectOverview';
import TasksManagement from '../components/ProjectSubPages/TasksManagement';
import Timesheets from '../components/ProjectSubPages/Timesheets';
import TeamCollaboration from '../components/ProjectSubPages/TeamCollaboration';
import Milestones from '../components/ProjectSubPages/Milestones';
import ClientPortal from '../components/ProjectSubPages/ClientPortal';
import FilesManagement from '../components/ProjectSubPages/FilesManagement';
import Automation from '../components/ProjectSubPages/Automation';
import Reports from '../components/ProjectSubPages/Reports';
import '../styles/Projects.css';
import { 
  FolderKanban, 
  Plus, 
  Filter, 
  Users, 
  Clock, 
  CheckSquare,
  Target,
  Briefcase,
  Eye,
  FolderOpen,
  Bell,
  TrendingUp,
  ArrowLeft,
  Search,
  RefreshCw
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
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Reset to list view when component mounts
  useEffect(() => {
    setSelectedProject(null);
  }, []);

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

  const currentProject = projects.find(p => p.id === selectedProject) || projects[0];

  const getStatusCount = (status: string) => {
    return projects.filter(p => p.status === status).length;
  };

  const handleProjectClick = (projectId: number) => {
    setSelectedProject(projectId);
    setActiveTab('overview');
  };

  const handleBackToList = () => {
    setSelectedProject(null);
  };

  return (
    <div className="dashboard-layout">
      <Sidebar isOpen={sidebarOpen} onToggle={handleSidebarToggle} />
      
      <div className={`main-content ${sidebarOpen ? 'sidebar-open' : ''}`}>
        <Header onMenuClick={handleSidebarToggle} />
        
        <div className="page-container">
          {/* Show Project List when no project is selected */}
          {selectedProject === null ? (
            <>
              {/* Page Header */}
              <div className="page-header">
                <div className="page-header-left">
                  <FolderKanban size={32} className="page-icon" />
                  <div>
                    <h1 className="page-title">Projects Summary</h1>
                    <p className="page-subtitle">View and manage all projects</p>
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

              {/* Project Status Summary */}
              <div className="project-summary-cards">
                <div className="summary-card">
                  <div className="summary-count">{getStatusCount('Not Started')}</div>
                  <div className="summary-label">Not Started</div>
                </div>
                <div className="summary-card">
                  <div className="summary-count">{getStatusCount('In Progress')}</div>
                  <div className="summary-label">In Progress</div>
                </div>
                <div className="summary-card">
                  <div className="summary-count">{getStatusCount('On Hold')}</div>
                  <div className="summary-label">On Hold</div>
                </div>
                <div className="summary-card">
                  <div className="summary-count">{getStatusCount('Cancelled')}</div>
                  <div className="summary-label">Cancelled</div>
                </div>
                <div className="summary-card">
                  <div className="summary-count">{getStatusCount('Completed')}</div>
                  <div className="summary-label">Finished</div>
                </div>
              </div>

              {/* Projects Table */}
              <div className="projects-table-controls">
                <div className="table-controls-left">
                  <select className="entries-select">
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                  </select>
                  <button className="btn-secondary">
                    <RefreshCw size={16} />
                    Export
                  </button>
                  <button className="btn-secondary">
                    <RefreshCw size={16} />
                  </button>
                </div>
                <div className="table-controls-right">
                  <div className="search-box">
                    <Search size={18} />
                    <input 
                      type="text" 
                      placeholder="Search..." 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="projects-table-wrapper">
                <table className="projects-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Project Name</th>
                      <th>Customer</th>
                      <th>Tags</th>
                      <th>Start Date</th>
                      <th>Deadline</th>
                      <th>Members</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projects.length > 0 ? (
                      projects.map((project, index) => (
                        <tr 
                          key={project.id} 
                          onClick={() => handleProjectClick(project.id)}
                          style={{ cursor: 'pointer' }}
                        >
                          <td>{index + 1}</td>
                          <td className="project-name-cell">{project.name}</td>
                          <td>{project.client}</td>
                          <td>
                            <span className="project-tag">{project.priority}</span>
                          </td>
                          <td>{project.startDate}</td>
                          <td>{project.deadline}</td>
                          <td>
                            <div className="members-avatars">
                              <Users size={16} /> {project.team}
                            </div>
                          </td>
                          <td>
                            <span className={`status-badge status-${project.status.toLowerCase().replace(' ', '-')}`}>
                              {project.status}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={8} style={{ textAlign: 'center', padding: '40px' }}>
                          No entries found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <>
              {/* Project Details View */}
              <div className="page-header">
                <div className="page-header-left">
                  <button className="btn-back" onClick={handleBackToList}>
                    <ArrowLeft size={20} />
                  </button>
                  <FolderKanban size={32} className="page-icon" />
                  <div>
                    <h1 className="page-title">{currentProject.name}</h1>
                    <p className="page-subtitle">{currentProject.client} - {currentProject.status}</p>
                  </div>
                </div>
                <div className="page-header-right">
                  <button className="btn-secondary">
                    <Filter size={18} />
                    Filter
                  </button>
                </div>
              </div>

              {/* Enhanced Tabs with Icons */}
              <div className="project-tabs-container">
                <div className="tabs">
                  <button 
                    className={`tab ${activeTab === 'overview' ? 'tab-active' : ''}`}
                    onClick={() => setActiveTab('overview')}
                  >
                    <Briefcase size={18} />
                    <span>Overview</span>
                  </button>
                  <button 
                    className={`tab ${activeTab === 'tasks' ? 'tab-active' : ''}`}
                    onClick={() => setActiveTab('tasks')}
                  >
                    <CheckSquare size={18} />
                    <span>Tasks</span>
                  </button>
                  <button 
                    className={`tab ${activeTab === 'timesheets' ? 'tab-active' : ''}`}
                    onClick={() => setActiveTab('timesheets')}
                  >
                    <Clock size={18} />
                    <span>Timesheets</span>
                  </button>
                  <button 
                    className={`tab ${activeTab === 'team' ? 'tab-active' : ''}`}
                    onClick={() => setActiveTab('team')}
                  >
                    <Users size={18} />
                    <span>Team</span>
                  </button>
                  <button 
                    className={`tab ${activeTab === 'milestones' ? 'tab-active' : ''}`}
                    onClick={() => setActiveTab('milestones')}
                  >
                    <Target size={18} />
                    <span>Milestones</span>
                  </button>
                  <button 
                    className={`tab ${activeTab === 'client' ? 'tab-active' : ''}`}
                    onClick={() => setActiveTab('client')}
                  >
                    <Eye size={18} />
                    <span>Client Portal</span>
                  </button>
                  <button 
                    className={`tab ${activeTab === 'files' ? 'tab-active' : ''}`}
                    onClick={() => setActiveTab('files')}
                  >
                    <FolderOpen size={18} />
                    <span>Files</span>
                  </button>
                  <button 
                    className={`tab ${activeTab === 'automation' ? 'tab-active' : ''}`}
                    onClick={() => setActiveTab('automation')}
                  >
                    <Bell size={18} />
                    <span>Automation</span>
                  </button>
                  <button 
                    className={`tab ${activeTab === 'reports' ? 'tab-active' : ''}`}
                    onClick={() => setActiveTab('reports')}
                  >
                    <TrendingUp size={18} />
                    <span>Reports</span>
                  </button>
                </div>
              </div>

              {/* Render Active Tab Content with Smooth Transitions */}
              <div className="tab-content-wrapper">
                {activeTab === 'overview' && <ProjectOverview project={currentProject} />}
                {activeTab === 'tasks' && <TasksManagement projectId={selectedProject} />}
                {activeTab === 'timesheets' && <Timesheets projectId={selectedProject} />}
                {activeTab === 'team' && <TeamCollaboration projectId={selectedProject} />}
                {activeTab === 'milestones' && <Milestones projectId={selectedProject} />}
                {activeTab === 'client' && <ClientPortal projectId={selectedProject} />}
                {activeTab === 'files' && <FilesManagement projectId={selectedProject} />}
                {activeTab === 'automation' && <Automation projectId={selectedProject} />}
                {activeTab === 'reports' && <Reports projectId={selectedProject} />}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Projects;
