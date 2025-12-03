import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import StatCard from '../components/StatCard';
import AnalyticsChart from '../components/AnalyticsChart';
import RecentTransactions from '../components/RecentTransactions';
import ProjectStatus from '../components/ProjectStatus';
import ActivityTimeline from '../components/ActivityTimeline';
import TaskSummary from '../components/TaskSummary';
import SalesPipeline from '../components/SalesPipeline';
import DateFilter from '../components/DateFilter';
import AlertsPanel from '../components/AlertsPanel';
import { 
  FileText, 
  Users, 
  Contact, 
  Zap, 
  DollarSign, 
  CheckCircle,
  Calendar,
  Bell,
  MessageSquare,
  FolderKanban,
  BarChart3,
  Receipt,
  Upload
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const statsData = [
    {
      title: 'Templates',
      value: '3',
      subtitle: '3 Approved',
      trend: { value: '+12.4%', isPositive: true, label: 'vs last month' },
      icon: FileText,
      iconColor: 'icon-yellow',
      forecast: '5 by end of month'
    },
    {
      title: 'Total Leads',
      value: '136',
      subtitle: '0 this month',
      trend: { value: '+18.2%', isPositive: true, label: 'vs last month' },
      icon: Users,
      iconColor: 'icon-blue',
      forecast: '180 projected',
      onClick: () => console.log('Navigate to Leads')
    },
    {
      title: 'Contacts',
      value: '56',
      subtitle: '2 this month',
      trend: { value: '+8.4%', isPositive: true, label: 'vs last month' },
      icon: Contact,
      iconColor: 'icon-green',
      onClick: () => console.log('Navigate to Contacts')
    },
    {
      title: 'Active Clients',
      value: '156',
      subtitle: 'Engaged users',
      trend: { value: '+23.1%', isPositive: true, label: 'vs last month' },
      icon: Zap,
      iconColor: 'icon-purple'
    },
    {
      title: 'Total Revenue',
      value: '₹24.5k',
      subtitle: 'This month',
      trend: { value: '+15.3%', isPositive: true, label: 'vs last month' },
      icon: DollarSign,
      iconColor: 'icon-teal',
      forecast: '₹32k projected',
      onClick: () => console.log('Navigate to Revenue')
    },
    {
      title: 'Completion Rate',
      value: '87.5%',
      subtitle: 'On-time delivery',
      trend: { value: '+4.2%', isPositive: true, label: 'vs last month' },
      icon: CheckCircle,
      iconColor: 'icon-indigo',
      alert: 'Target: 90%'
    }
  ];

  const recentActivities = [
    { id: 1, action: 'New lead added', user: 'John Doe', time: '2 minutes ago', type: 'lead' },
    { id: 2, action: 'Invoice #1234 sent', user: 'Sarah Smith', time: '15 minutes ago', type: 'invoice' },
    { id: 3, action: 'Task completed', user: 'Mike Johnson', time: '1 hour ago', type: 'task' },
    { id: 4, action: 'New client onboarded', user: 'Emily Davis', time: '2 hours ago', type: 'client' },
    { id: 5, action: 'Meeting scheduled', user: 'Admin User', time: '3 hours ago', type: 'appointment' }
  ];

  const upcomingTasks = [
    { id: 1, title: 'Review project proposal', priority: 'high', dueDate: 'Today, 2:00 PM' },
    { id: 2, title: 'Client meeting preparation', priority: 'high', dueDate: 'Today, 4:30 PM' },
    { id: 3, title: 'Update website content', priority: 'medium', dueDate: 'Tomorrow, 10:00 AM' },
    { id: 4, title: 'Send monthly reports', priority: 'medium', dueDate: 'Dec 5, 9:00 AM' },
    { id: 5, title: 'Team sync meeting', priority: 'low', dueDate: 'Dec 6, 11:00 AM' }
  ];

  const quickActions = [
    { icon: FileText, label: 'Create Invoice', color: 'action-blue' },
    { icon: Users, label: 'Add Lead', color: 'action-green' },
    { icon: Contact, label: 'New Contact', color: 'action-purple' },
    { icon: CheckCircle, label: 'Add Task', color: 'action-orange' },
    { icon: FolderKanban, label: 'Create Project', color: 'action-teal' },
    { icon: BarChart3, label: 'Generate Report', color: 'action-indigo' },
    { icon: Receipt, label: 'Add Expense', color: 'action-pink' },
    { icon: Upload, label: 'Upload Docs', color: 'action-cyan' }
  ];

  return (
    <div className="dashboard-layout">
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className="main-content">
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        
        <div className="dashboard-container">
          <div className="dashboard-header">
            <div>
              <h1 className="dashboard-title">Dashboard Overview</h1>
              <p className="dashboard-subtitle">Welcome back! Here's what's happening with your business today.</p>
            </div>
            <DateFilter onChange={(period) => console.log('Period changed:', period)} />
          </div>

          {/* Quick Actions */}
          <div className="quick-actions">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <button key={index} className={`quick-action-btn ${action.color}`}>
                  <Icon size={20} />
                  <span>{action.label}</span>
                </button>
              );
            })}
          </div>

          {/* Stats Grid */}
          <div className="stats-grid">
            {statsData.map((stat, index) => (
              <StatCard
                key={index}
                title={stat.title}
                value={stat.value}
                subtitle={stat.subtitle}
                trend={stat.trend}
                icon={stat.icon}
                iconColor={stat.iconColor}
                onClick={stat.onClick}
                forecast={stat.forecast}
                alert={stat.alert}
              />
            ))}
          </div>

          {/* Bottom Section with Enhanced Panels */}
          <div className="dashboard-bottom">
            {/* Alerts Panel */}
            <AlertsPanel />

            {/* Task Summary */}
            <TaskSummary />

            {/* Sales Pipeline */}
            <SalesPipeline />

            {/* Analytics Chart */}
            <AnalyticsChart 
              title="Revenue Analytics"
              data={[
                { label: 'Mon', value: 25000, color: 'linear-gradient(135deg, #00d97e 0%, #00a860 100%)' },
                { label: 'Tue', value: 32000, color: 'linear-gradient(135deg, #00d97e 0%, #00a860 100%)' },
                { label: 'Wed', value: 28000, color: 'linear-gradient(135deg, #00d97e 0%, #00a860 100%)' },
                { label: 'Thu', value: 45000, color: 'linear-gradient(135deg, #00d97e 0%, #00a860 100%)' },
                { label: 'Fri', value: 38000, color: 'linear-gradient(135deg, #00d97e 0%, #00a860 100%)' },
                { label: 'Sat', value: 42000, color: 'linear-gradient(135deg, #00d97e 0%, #00a860 100%)' },
                { label: 'Sun', value: 35000, color: 'linear-gradient(135deg, #00d97e 0%, #00a860 100%)' }
              ]}
            />

            {/* Activity Timeline */}
            <ActivityTimeline />

            {/* Project Status */}
            <ProjectStatus />

            {/* Recent Transactions */}
            <RecentTransactions />

            <div className="activity-panel">
              <div className="panel-header">
                <div className="panel-header-left">
                  <Bell size={20} />
                  <h2 className="panel-title">Recent Activities</h2>
                </div>
                <button className="view-all-btn">View All</button>
              </div>
              <div className="activity-list">
                {recentActivities.map(activity => (
                  <div key={activity.id} className="activity-item">
                    <div className={`activity-icon ${activity.type}`}>
                      {activity.type === 'lead' && <Users size={16} />}
                      {activity.type === 'invoice' && <FileText size={16} />}
                      {activity.type === 'task' && <CheckCircle size={16} />}
                      {activity.type === 'client' && <Contact size={16} />}
                      {activity.type === 'appointment' && <Calendar size={16} />}
                    </div>
                    <div className="activity-content">
                      <div className="activity-action">{activity.action}</div>
                      <div className="activity-meta">
                        <span className="activity-user">{activity.user}</span>
                        <span className="activity-time">{activity.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="tasks-panel">
              <div className="panel-header">
                <div className="panel-header-left">
                  <MessageSquare size={20} />
                  <h2 className="panel-title">Upcoming Tasks</h2>
                </div>
                <button className="view-all-btn">View All</button>
              </div>
              <div className="tasks-list">
                {upcomingTasks.map(task => (
                  <div key={task.id} className="task-item">
                    <div className="task-checkbox">
                      <input type="checkbox" id={`task-${task.id}`} />
                    </div>
                    <div className="task-content">
                      <label htmlFor={`task-${task.id}`} className="task-title">
                        {task.title}
                      </label>
                      <div className="task-meta">
                        <span className={`task-priority priority-${task.priority}`}>
                          {task.priority}
                        </span>
                        <span className="task-due">{task.dueDate}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
