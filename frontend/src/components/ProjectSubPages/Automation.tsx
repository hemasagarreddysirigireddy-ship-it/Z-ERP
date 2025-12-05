import React, { useState } from 'react';
import { 
  Bell, 
  Mail, 
  MessageSquare, 
  Smartphone,
  Plus,
  Settings,
  Clock,
  AlertTriangle,
  Zap,
  Filter,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';

interface AutomationProps {
  projectId: number;
}

const Automation: React.FC<AutomationProps> = ({ projectId }) => {
  const [activeSection, setActiveSection] = useState<'notifications' | 'reminders' | 'workflows' | 'sla'>('notifications');

  const notificationSettings = [
    {
      id: 1,
      category: 'Task Updates',
      email: true,
      sms: false,
      push: true,
      description: 'Notifications when tasks are created, updated, or completed'
    },
    {
      id: 2,
      category: 'New Comments',
      email: true,
      sms: false,
      push: true,
      description: 'Alerts when someone comments on your tasks or discussions'
    },
    {
      id: 3,
      category: 'File Uploads',
      email: false,
      sms: false,
      push: true,
      description: 'Notifications when new files are uploaded to the project'
    },
    {
      id: 4,
      category: 'Milestone Achievements',
      email: true,
      sms: true,
      push: true,
      description: 'Alerts when project milestones are completed'
    },
    {
      id: 5,
      category: 'Budget Alerts',
      email: true,
      sms: true,
      push: true,
      description: 'Warnings when budget thresholds are reached'
    },
    {
      id: 6,
      category: 'Team Member Added',
      email: true,
      sms: false,
      push: false,
      description: 'Notifications when new team members join the project'
    }
  ];

  const autoReminders = [
    {
      id: 1,
      name: 'Task Due Date Reminder',
      trigger: '1 day before due date',
      recipients: 'Task Assignee',
      status: 'Active',
      frequency: 'Once'
    },
    {
      id: 2,
      name: 'Overdue Task Alert',
      trigger: 'When task becomes overdue',
      recipients: 'Assignee & Project Manager',
      status: 'Active',
      frequency: 'Daily until completed'
    },
    {
      id: 3,
      name: 'Timesheet Submission',
      trigger: 'Every Friday at 5 PM',
      recipients: 'All Team Members',
      status: 'Active',
      frequency: 'Weekly'
    },
    {
      id: 4,
      name: 'Milestone Due Soon',
      trigger: '3 days before milestone date',
      recipients: 'Project Manager & Client',
      status: 'Active',
      frequency: 'Once'
    },
    {
      id: 5,
      name: 'Pending Approval',
      trigger: 'Approval pending for 2 days',
      recipients: 'Approver',
      status: 'Active',
      frequency: 'Every 2 days'
    }
  ];

  const workflows = [
    {
      id: 1,
      name: 'Auto-assign Designer to Design Tasks',
      trigger: 'When task is created with "Design" tag',
      action: 'Assign to Priya Sharma',
      status: 'Active'
    },
    {
      id: 2,
      name: 'Move to Review on Completion',
      trigger: 'When task status changes to "Completed"',
      action: 'Move task to "Review" column',
      status: 'Active'
    },
    {
      id: 3,
      name: 'Notify PM on High Priority Tasks',
      trigger: 'When high priority task is created',
      action: 'Send email to Project Manager',
      status: 'Active'
    },
    {
      id: 4,
      name: 'Auto-create Subtasks',
      trigger: 'When "Development" task is created',
      action: 'Create subtasks: Code, Test, Deploy',
      status: 'Inactive'
    },
    {
      id: 5,
      name: 'Budget Alert Workflow',
      trigger: 'When budget reaches 80%',
      action: 'Send alert to PM and Finance',
      status: 'Active'
    }
  ];

  const slaAlerts = [
    {
      id: 1,
      name: 'High Priority Task Response Time',
      threshold: '2 hours',
      currentStatus: 'Healthy',
      violations: 0,
      lastCheck: '2024-12-03 14:30'
    },
    {
      id: 2,
      name: 'Bug Fix Resolution Time',
      threshold: '24 hours',
      currentStatus: 'Healthy',
      violations: 1,
      lastCheck: '2024-12-03 14:30'
    },
    {
      id: 3,
      name: 'Client Query Response Time',
      threshold: '4 hours',
      currentStatus: 'At Risk',
      violations: 3,
      lastCheck: '2024-12-03 14:30'
    },
    {
      id: 4,
      name: 'Milestone Delivery Time',
      threshold: 'On schedule',
      currentStatus: 'Healthy',
      violations: 0,
      lastCheck: '2024-12-03 14:30'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
      case 'Healthy':
        return 'status-completed';
      case 'Inactive':
        return 'status-pending';
      case 'At Risk':
        return 'status-warning';
      default:
        return '';
    }
  };

  return (
    <div className="tab-content">
      <div className="automation-header">
        <div>
          <h3>Notifications & Automation</h3>
          <p>Configure alerts, reminders, and workflow automation</p>
        </div>
        <button className="btn-primary">
          <Plus size={16} />
          Create Rule
        </button>
      </div>

      {/* Section Tabs */}
      <div className="sub-tabs">
        <button 
          className={`sub-tab ${activeSection === 'notifications' ? 'active' : ''}`}
          onClick={() => setActiveSection('notifications')}
        >
          <Bell size={16} />
          Notifications
        </button>
        <button 
          className={`sub-tab ${activeSection === 'reminders' ? 'active' : ''}`}
          onClick={() => setActiveSection('reminders')}
        >
          <Clock size={16} />
          Auto Reminders
        </button>
        <button 
          className={`sub-tab ${activeSection === 'workflows' ? 'active' : ''}`}
          onClick={() => setActiveSection('workflows')}
        >
          <Zap size={16} />
          Workflows
        </button>
        <button 
          className={`sub-tab ${activeSection === 'sla' ? 'active' : ''}`}
          onClick={() => setActiveSection('sla')}
        >
          <AlertTriangle size={16} />
          SLA Alerts
        </button>
      </div>

      {/* Notifications Section */}
      {activeSection === 'notifications' && (
        <div className="section-content">
          <div className="notification-settings-grid">
            {notificationSettings.map((setting) => (
              <div key={setting.id} className="notification-setting-card">
                <div className="setting-header">
                  <h4>{setting.category}</h4>
                  <p className="setting-description">{setting.description}</p>
                </div>
                
                <div className="setting-channels">
                  <div className="channel-item">
                    <Mail size={16} />
                    <span>Email</span>
                    <button className={`toggle-btn ${setting.email ? 'active' : ''}`}>
                      {setting.email ? <ToggleRight size={20} /> : <ToggleLeft size={20} />}
                    </button>
                  </div>
                  
                  <div className="channel-item">
                    <MessageSquare size={16} />
                    <span>SMS</span>
                    <button className={`toggle-btn ${setting.sms ? 'active' : ''}`}>
                      {setting.sms ? <ToggleRight size={20} /> : <ToggleLeft size={20} />}
                    </button>
                  </div>
                  
                  <div className="channel-item">
                    <Smartphone size={16} />
                    <span>Push</span>
                    <button className={`toggle-btn ${setting.push ? 'active' : ''}`}>
                      {setting.push ? <ToggleRight size={20} /> : <ToggleLeft size={20} />}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Auto Reminders Section */}
      {activeSection === 'reminders' && (
        <div className="section-content">
          <div className="section-header">
            <h3>Automated Reminders & Alarms</h3>
            <button className="btn-primary">
              <Plus size={16} />
              Add Reminder
            </button>
          </div>

          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Reminder Name</th>
                  <th>Trigger</th>
                  <th>Recipients</th>
                  <th>Frequency</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {autoReminders.map((reminder) => (
                  <tr key={reminder.id}>
                    <td className="td-bold">{reminder.name}</td>
                    <td>{reminder.trigger}</td>
                    <td>{reminder.recipients}</td>
                    <td>{reminder.frequency}</td>
                    <td>
                      <span className={`status-badge ${getStatusColor(reminder.status)}`}>
                        {reminder.status}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button className="icon-btn-small">
                          <Settings size={14} />
                        </button>
                        <button className="icon-btn-small">
                          {reminder.status === 'Active' ? <ToggleRight size={14} /> : <ToggleLeft size={14} />}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Workflows Section */}
      {activeSection === 'workflows' && (
        <div className="section-content">
          <div className="section-header">
            <h3>Workflow Automation Rules</h3>
            <button className="btn-primary">
              <Plus size={16} />
              Create Workflow
            </button>
          </div>

          <div className="workflows-list">
            {workflows.map((workflow) => (
              <div key={workflow.id} className="workflow-card">
                <div className="workflow-header">
                  <div className="workflow-icon">
                    <Zap size={20} />
                  </div>
                  <div className="workflow-info">
                    <h4>{workflow.name}</h4>
                    <div className="workflow-details">
                      <div className="workflow-step">
                        <span className="step-label">TRIGGER</span>
                        <span className="step-value">{workflow.trigger}</span>
                      </div>
                      <div className="workflow-arrow">→</div>
                      <div className="workflow-step">
                        <span className="step-label">ACTION</span>
                        <span className="step-value">{workflow.action}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="workflow-actions">
                  <span className={`status-badge ${getStatusColor(workflow.status)}`}>
                    {workflow.status}
                  </span>
                  <button className="icon-btn-small">
                    <Settings size={16} />
                  </button>
                  <button className="icon-btn-small">
                    {workflow.status === 'Active' ? <ToggleRight size={16} /> : <ToggleLeft size={16} />}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SLA Alerts Section */}
      {activeSection === 'sla' && (
        <div className="section-content">
          <div className="section-header">
            <h3>SLA Monitoring & Alerts</h3>
            <button className="btn-primary">
              <Plus size={16} />
              Add SLA Rule
            </button>
          </div>

          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>SLA Name</th>
                  <th>Threshold</th>
                  <th>Current Status</th>
                  <th>Violations</th>
                  <th>Last Check</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {slaAlerts.map((sla) => (
                  <tr key={sla.id}>
                    <td className="td-bold">{sla.name}</td>
                    <td>{sla.threshold}</td>
                    <td>
                      <span className={`status-badge ${getStatusColor(sla.currentStatus)}`}>
                        {sla.currentStatus}
                      </span>
                    </td>
                    <td>
                      <span className={`violation-badge ${sla.violations > 0 ? 'has-violations' : ''}`}>
                        {sla.violations}
                      </span>
                    </td>
                    <td>
                      <Clock size={14} className="mr-1" />
                      {sla.lastCheck}
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button className="icon-btn-small">
                          <Settings size={14} />
                        </button>
                        <button className="icon-btn-small">
                          <Filter size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* SLA Summary */}
          <div className="sla-summary-grid">
            <div className="sla-stat-card healthy">
              <div className="stat-icon">
                <Bell size={24} />
              </div>
              <div className="stat-content">
                <span className="stat-value">{slaAlerts.filter(s => s.currentStatus === 'Healthy').length}</span>
                <span className="stat-label">Healthy</span>
              </div>
            </div>
            <div className="sla-stat-card at-risk">
              <div className="stat-icon">
                <AlertTriangle size={24} />
              </div>
              <div className="stat-content">
                <span className="stat-value">{slaAlerts.filter(s => s.currentStatus === 'At Risk').length}</span>
                <span className="stat-label">At Risk</span>
              </div>
            </div>
            <div className="sla-stat-card violations">
              <div className="stat-icon">
                <AlertTriangle size={24} />
              </div>
              <div className="stat-content">
                <span className="stat-value">{slaAlerts.reduce((sum, s) => sum + s.violations, 0)}</span>
                <span className="stat-label">Total Violations</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Automation;
