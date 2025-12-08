import React from 'react';
import { FileText, UserPlus, FolderKanban, CheckSquare, LogIn, Clock } from 'lucide-react';

interface Activity {
  id: number;
  type: 'invoice' | 'lead' | 'project' | 'task' | 'login';
  title: string;
  description: string;
  time: string;
  user: string;
}

const ActivityTimeline: React.FC = () => {
  const activities: Activity[] = [
    {
      id: 1,
      type: 'invoice',
      title: 'New Invoice Created',
      description: 'Invoice #INV-2024-089 for Acme Corp',
      time: '2 mins ago',
      user: 'John Doe'
    },
    {
      id: 2,
      type: 'lead',
      title: 'New Lead Added',
      description: 'Tech Solutions Inc. - Software Development',
      time: '15 mins ago',
      user: 'Sarah Smith'
    },
    {
      id: 3,
      type: 'project',
      title: 'Project Updated',
      description: 'Mobile App Development - Progress: 75%',
      time: '1 hour ago',
      user: 'Mike Johnson'
    },
    {
      id: 4,
      type: 'task',
      title: 'Task Completed',
      description: 'Design review for client portal',
      time: '2 hours ago',
      user: 'Emily Davis'
    },
    {
      id: 5,
      type: 'login',
      title: 'User Login',
      description: 'Admin logged in from New York',
      time: '3 hours ago',
      user: 'Admin User'
    },
    {
      id: 6,
      type: 'invoice',
      title: 'Invoice Paid',
      description: 'Invoice #INV-2024-087 - $5,240.00',
      time: '4 hours ago',
      user: 'System'
    },
    {
      id: 7,
      type: 'project',
      title: 'New Project Created',
      description: 'E-commerce Platform Redesign',
      time: '5 hours ago',
      user: 'John Doe'
    },
    {
      id: 8,
      type: 'task',
      title: 'Task Assigned',
      description: 'Backend API integration to Mike Johnson',
      time: '6 hours ago',
      user: 'Sarah Smith'
    }
  ];

  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'invoice':
        return <FileText size={18} />;
      case 'lead':
        return <UserPlus size={18} />;
      case 'project':
        return <FolderKanban size={18} />;
      case 'task':
        return <CheckSquare size={18} />;
      case 'login':
        return <LogIn size={18} />;
      default:
        return <Clock size={18} />;
    }
  };

  const getActivityColor = (type: Activity['type']) => {
    switch (type) {
      case 'invoice':
        return 'activity-invoice';
      case 'lead':
        return 'activity-lead';
      case 'project':
        return 'activity-project';
      case 'task':
        return 'activity-task';
      case 'login':
        return 'activity-login';
      default:
        return 'activity-default';
    }
  };

  return (
    <div className="activity-timeline">
      <div className="activity-header">
        <h3>Recent Activities</h3>
        <button className="activity-view-all">View All</button>
      </div>
      <div className="activity-list">
        {activities.map((activity) => (
          <div key={activity.id} className="activity-item">
            <div className={`activity-icon ${getActivityColor(activity.type)}`}>
              {getActivityIcon(activity.type)}
            </div>
            <div className="activity-content">
              <div className="activity-title">{activity.title}</div>
              <div className="activity-description">{activity.description}</div>
              <div className="activity-meta">
                <span className="activity-user">{activity.user}</span>
                <span className="activity-time">{activity.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityTimeline;
