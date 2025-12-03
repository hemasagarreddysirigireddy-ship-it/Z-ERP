import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { FolderKanban, Plus, Search, Filter, MoreVertical, Users, Clock, Calendar, TrendingUp } from 'lucide-react';

const Projects: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  const projects = [
    {
      id: 1,
      name: 'Website Redesign',
      client: 'Acme Corp',
      status: 'In Progress',
      progress: 75,
      startDate: '2024-11-01',
      deadline: '2024-12-15',
      budget: '$45,000',
      spent: '$33,750',
      team: 5,
      tasks: { total: 24, completed: 18 }
    },
    {
      id: 2,
      name: 'Mobile App Development',
      client: 'Tech Solutions',
      status: 'In Progress',
      progress: 60,
      startDate: '2024-10-15',
      deadline: '2025-01-30',
      budget: '$85,000',
      spent: '$51,000',
      team: 8,
      tasks: { total: 45, completed: 27 }
    },
    {
      id: 3,
      name: 'CRM Implementation',
      client: 'Global Ventures',
      status: 'Planning',
      progress: 25,
      startDate: '2024-12-01',
      deadline: '2025-03-15',
      budget: '$120,000',
      spent: '$30,000',
      team: 6,
      tasks: { total: 60, completed: 15 }
    },
    {
      id: 4,
      name: 'E-commerce Platform',
      client: 'Retail Plus',
      status: 'Completed',
      progress: 100,
      startDate: '2024-08-01',
      deadline: '2024-11-30',
      budget: '$95,000',
      spent: '$92,000',
      team: 7,
      tasks: { total: 38, completed: 38 }
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Progress': return 'status-inprogress';
      case 'Planning': return 'status-planning';
      case 'Completed': return 'status-completed';
      case 'On Hold': return 'status-onhold';
      default: return '';
    }
  };

  return (
    <div className="dashboard-layout">
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className="main-content">
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        
        <div className="page-container">
          <div className="page-header">
            <div className="page-header-left">
              <FolderKanban size={32} className="page-icon" />
              <div>
                <h1 className="page-title">Projects</h1>
                <p className="page-subtitle">Manage and track all your projects</p>
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

          {/* Stats Cards */}
          <div className="stats-row">
            <div className="stat-card-mini">
              <div className="stat-card-mini-icon projects">
                <FolderKanban size={24} />
              </div>
              <div className="stat-card-mini-content">
                <div className="stat-card-mini-value">12</div>
                <div className="stat-card-mini-label">Total Projects</div>
              </div>
            </div>
            <div className="stat-card-mini">
              <div className="stat-card-mini-icon active">
                <TrendingUp size={24} />
              </div>
              <div className="stat-card-mini-content">
                <div className="stat-card-mini-value">8</div>
                <div className="stat-card-mini-label">Active Projects</div>
              </div>
            </div>
            <div className="stat-card-mini">
              <div className="stat-card-mini-icon completed">
                <FolderKanban size={24} />
              </div>
              <div className="stat-card-mini-content">
                <div className="stat-card-mini-value">4</div>
                <div className="stat-card-mini-label">Completed</div>
              </div>
            </div>
            <div className="stat-card-mini">
              <div className="stat-card-mini-icon revenue">
                <TrendingUp size={24} />
              </div>
              <div className="stat-card-mini-content">
                <div className="stat-card-mini-value">$485K</div>
                <div className="stat-card-mini-label">Total Revenue</div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="tabs">
            <button 
              className={`tab ${activeTab === 'all' ? 'tab-active' : ''}`}
              onClick={() => setActiveTab('all')}
            >
              All Projects
            </button>
            <button 
              className={`tab ${activeTab === 'active' ? 'tab-active' : ''}`}
              onClick={() => setActiveTab('active')}
            >
              Active
            </button>
            <button 
              className={`tab ${activeTab === 'completed' ? 'tab-active' : ''}`}
              onClick={() => setActiveTab('completed')}
            >
              Completed
            </button>
            <button 
              className={`tab ${activeTab === 'planning' ? 'tab-active' : ''}`}
              onClick={() => setActiveTab('planning')}
            >
              Planning
            </button>
          </div>

          {/* Search Bar */}
          <div className="search-filter-bar">
            <div className="search-box">
              <Search size={18} />
              <input type="text" placeholder="Search projects..." />
            </div>
          </div>

          {/* Projects Grid */}
          <div className="projects-grid">
            {projects.map(project => (
              <div key={project.id} className="project-card">
                <div className="project-card-header">
                  <div>
                    <h3 className="project-card-title">{project.name}</h3>
                    <p className="project-card-client">{project.client}</p>
                  </div>
                  <button className="icon-btn-small">
                    <MoreVertical size={18} />
                  </button>
                </div>

                <div className={`project-status-badge ${getStatusColor(project.status)}`}>
                  {project.status}
                </div>

                <div className="project-progress">
                  <div className="project-progress-header">
                    <span>Progress</span>
                    <span className="progress-percentage">{project.progress}%</span>
                  </div>
                  <div className="progress-bar-wrapper">
                    <div 
                      className="progress-bar-fill"
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>

                <div className="project-card-meta">
                  <div className="meta-item">
                    <Calendar size={16} />
                    <span>Due: {new Date(project.deadline).toLocaleDateString()}</span>
                  </div>
                  <div className="meta-item">
                    <Users size={16} />
                    <span>{project.team} members</span>
                  </div>
                  <div className="meta-item">
                    <Clock size={16} />
                    <span>{project.tasks.completed}/{project.tasks.total} tasks</span>
                  </div>
                </div>

                <div className="project-card-footer">
                  <div className="budget-info">
                    <span className="budget-label">Budget</span>
                    <span className="budget-value">{project.budget}</span>
                  </div>
                  <div className="budget-info">
                    <span className="budget-label">Spent</span>
                    <span className="budget-value">{project.spent}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
