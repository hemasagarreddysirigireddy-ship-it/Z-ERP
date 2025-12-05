import React from 'react';
import { Clock, AlertTriangle, CheckCircle2, User } from 'lucide-react';

const TaskSummary: React.FC = () => {
  const taskStats = [
    {
      title: 'Pending Tasks',
      count: 24,
      icon: Clock,
      color: 'task-pending',
      change: '+3 from yesterday'
    },
    {
      title: 'Overdue Tasks',
      count: 7,
      icon: AlertTriangle,
      color: 'task-overdue',
      change: '2 critical'
    },
    {
      title: 'Completed Today',
      count: 15,
      icon: CheckCircle2,
      color: 'task-completed',
      change: '85% completion rate'
    },
    {
      title: 'Assigned to Me',
      count: 12,
      icon: User,
      color: 'task-assigned',
      change: '3 due today'
    }
  ];

  return (
    <div className="task-summary">
      <div className="task-summary-header">
        <h3>Task Overview</h3>
        <button className="task-view-all">Manage Tasks</button>
      </div>
      <div className="task-summary-grid">
        {taskStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className={`task-summary-card ${stat.color}`}>
              <div className="task-summary-icon">
                <Icon size={24} />
              </div>
              <div className="task-summary-content">
                <div className="task-summary-count">{stat.count}</div>
                <div className="task-summary-title">{stat.title}</div>
                <div className="task-summary-change">{stat.change}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TaskSummary;
