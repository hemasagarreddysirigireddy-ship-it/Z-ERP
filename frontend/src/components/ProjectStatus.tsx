import React from 'react';
import { FolderKanban, Clock, Users as UsersIcon, AlertCircle } from 'lucide-react';

interface Project {
  id: string;
  name: string;
  client: string;
  progress: number;
  status: 'on-track' | 'at-risk' | 'delayed';
  dueDate: string;
  team: number;
  priority: 'high' | 'medium' | 'low';
}

const ProjectStatus: React.FC = () => {
  const projects: Project[] = [
    {
      id: 'PRJ001',
      name: 'Website Redesign',
      client: 'Tech Solutions Ltd',
      progress: 75,
      status: 'on-track',
      dueDate: 'Dec 15, 2025',
      team: 5,
      priority: 'high'
    },
    {
      id: 'PRJ002',
      name: 'Mobile App Development',
      client: 'Startup Inc',
      progress: 45,
      status: 'at-risk',
      dueDate: 'Dec 20, 2025',
      team: 8,
      priority: 'high'
    },
    {
      id: 'PRJ003',
      name: 'Brand Identity Design',
      client: 'Fashion Brand',
      progress: 90,
      status: 'on-track',
      dueDate: 'Dec 8, 2025',
      team: 3,
      priority: 'medium'
    },
    {
      id: 'PRJ004',
      name: 'E-commerce Platform',
      client: 'Retail Corp',
      progress: 30,
      status: 'delayed',
      dueDate: 'Dec 10, 2025',
      team: 6,
      priority: 'high'
    }
  ];

  return (
    <div className="projects-panel">
      <div className="panel-header">
        <div className="panel-header-left">
          <FolderKanban size={20} />
          <h2 className="panel-title">Active Projects</h2>
        </div>
        <button className="view-all-btn">View All</button>
      </div>
      
      <div className="projects-list">
        {projects.map((project) => (
          <div key={project.id} className="project-item">
            <div className="project-header">
              <div className="project-title-section">
                <h3 className="project-name">{project.name}</h3>
                <span className="project-client">{project.client}</span>
              </div>
              <span className={`project-priority priority-${project.priority}`}>
                {project.priority}
              </span>
            </div>
            
            <div className="project-progress-section">
              <div className="progress-header">
                <span className="progress-label">Progress</span>
                <span className="progress-value">{project.progress}%</span>
              </div>
              <div className="progress-bar-container">
                <div 
                  className={`progress-bar progress-${project.status}`}
                  style={{ width: `${project.progress}%` }}
                />
              </div>
            </div>
            
            <div className="project-footer">
              <div className="project-meta">
                <div className="meta-item">
                  <Clock size={14} />
                  <span>{project.dueDate}</span>
                </div>
                <div className="meta-item">
                  <UsersIcon size={14} />
                  <span>{project.team} members</span>
                </div>
              </div>
              <div className={`project-status-badge status-${project.status}`}>
                {project.status === 'at-risk' && <AlertCircle size={14} />}
                {project.status === 'delayed' && <AlertCircle size={14} />}
                <span>{project.status.replace('-', ' ')}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectStatus;
