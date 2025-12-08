import React from 'react';
import { Bell, Clock, FileText, UserX, Calendar } from 'lucide-react';

const AlertsPanel: React.FC = () => {
  const alerts = [
    {
      id: 1,
      type: 'task',
      icon: Clock,
      title: '5 Tasks Due Today',
      description: 'Complete design review, API testing, and 3 more',
      priority: 'high',
      time: 'Today'
    },
    {
      id: 2,
      type: 'invoice',
      icon: FileText,
      title: '3 Invoices Due This Week',
      description: 'Total amount: $12,450 - Follow up required',
      priority: 'medium',
      time: 'This Week'
    },
    {
      id: 3,
      type: 'lead',
      icon: UserX,
      title: '12 Leads Without Follow-ups',
      description: 'Last contact more than 7 days ago',
      priority: 'medium',
      time: '7 days ago'
    },
    {
      id: 4,
      type: 'deadline',
      icon: Calendar,
      title: '2 Project Deadlines Approaching',
      description: 'Mobile App (3 days) & Website Redesign (5 days)',
      priority: 'high',
      time: 'Coming Soon'
    }
  ];

  return (
    <div className="alerts-panel">
      <div className="alerts-header">
        <div className="alerts-title">
          <Bell size={20} />
          <h3>Alerts & Notifications</h3>
        </div>
        <span className="alerts-badge">{alerts.length}</span>
      </div>
      <div className="alerts-list">
        {alerts.map((alert) => {
          const Icon = alert.icon;
          return (
            <div key={alert.id} className={`alert-item alert-${alert.priority}`}>
              <div className="alert-icon">
                <Icon size={20} />
              </div>
              <div className="alert-content">
                <div className="alert-title">{alert.title}</div>
                <div className="alert-description">{alert.description}</div>
                <div className="alert-time">{alert.time}</div>
              </div>
              <button className="alert-action">View</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AlertsPanel;
