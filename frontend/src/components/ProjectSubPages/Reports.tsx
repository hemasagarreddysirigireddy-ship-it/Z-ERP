import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  DollarSign, 
  Clock,
  Users,
  Target,
  Download,
  Calendar,
  Filter,
  PieChart,
  Activity
} from 'lucide-react';

interface ReportsProps {
  projectId: number;
}

const Reports: React.FC<ReportsProps> = ({ projectId }) => {
  const [dateRange, setDateRange] = useState('last-30-days');
  const [reportType, setReportType] = useState<'overview' | 'time' | 'budget' | 'resources' | 'tasks' | 'client'>('overview');

  const projectMetrics = {
    overall: {
      completion: 75,
      onTimeDelivery: 85,
      budgetUtilization: 75,
      teamEfficiency: 88
    },
    budget: {
      total: 45000,
      spent: 33750,
      remaining: 11250,
      variance: -2250
    },
    time: {
      planned: 480,
      actual: 456,
      remaining: 144,
      efficiency: 95
    },
    tasks: {
      total: 24,
      completed: 18,
      inProgress: 4,
      pending: 2,
      overdue: 1
    },
    team: {
      totalMembers: 5,
      activeMembers: 4,
      totalHours: 456,
      avgHoursPerMember: 91.2
    }
  };

  const timeTracking = [
    { member: 'Priya Sharma', planned: 80, actual: 85, variance: 5, efficiency: 94 },
    { member: 'Rajesh Kumar', planned: 120, actual: 115, variance: -5, efficiency: 96 },
    { member: 'Amit Patel', planned: 120, actual: 125, variance: 5, efficiency: 96 },
    { member: 'Sneha Reddy', planned: 80, actual: 72, variance: -8, efficiency: 90 },
    { member: 'Vikram Singh', planned: 80, actual: 59, variance: -21, efficiency: 74 }
  ];

  const budgetBreakdown = [
    { category: 'Design', allocated: 12000, spent: 11500, percentage: 26 },
    { category: 'Development', allocated: 20000, spent: 15000, percentage: 44 },
    { category: 'Testing', allocated: 8000, spent: 5000, percentage: 18 },
    { category: 'Deployment', allocated: 5000, spent: 2250, percentage: 11 }
  ];

  const resourceUtilization = [
    { name: 'Priya Sharma', role: 'Designer', utilization: 85, billableHours: 72, nonBillableHours: 13 },
    { name: 'Rajesh Kumar', role: 'Frontend Dev', utilization: 96, billableHours: 110, nonBillableHours: 5 },
    { name: 'Amit Patel', role: 'Backend Dev', utilization: 96, billableHours: 120, nonBillableHours: 5 },
    { name: 'Sneha Reddy', role: 'QA Engineer', utilization: 90, billableHours: 65, nonBillableHours: 7 },
    { name: 'Vikram Singh', role: 'PM', utilization: 74, billableHours: 45, nonBillableHours: 14 }
  ];

  const taskCompletionRate = [
    { week: 'Week 1', completed: 3, total: 5 },
    { week: 'Week 2', completed: 5, total: 6 },
    { week: 'Week 3', completed: 4, total: 5 },
    { week: 'Week 4', completed: 6, total: 8 }
  ];

  const clientSatisfaction = {
    overallRating: 4.5,
    communication: 4.8,
    quality: 4.5,
    timeliness: 4.2,
    feedback: [
      { date: '2024-12-01', rating: 5, comment: 'Excellent progress on the design phase' },
      { date: '2024-11-25', rating: 4, comment: 'Good communication, minor delays in deliverables' }
    ]
  };

  return (
    <div className="tab-content">
      {/* Header */}
      <div className="reports-header">
        <div>
          <h3>Reports & Analytics</h3>
          <p>Comprehensive project insights and performance metrics</p>
        </div>
        <div className="toolbar-actions">
          <select 
            className="date-range-selector"
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
          >
            <option value="last-7-days">Last 7 Days</option>
            <option value="last-30-days">Last 30 Days</option>
            <option value="last-3-months">Last 3 Months</option>
            <option value="all-time">All Time</option>
          </select>
          <button className="btn-secondary">
            <Filter size={16} />
            Filter
          </button>
          <button className="btn-primary">
            <Download size={16} />
            Export Report
          </button>
        </div>
      </div>

      {/* Report Type Tabs */}
      <div className="sub-tabs">
        <button 
          className={`sub-tab ${reportType === 'overview' ? 'active' : ''}`}
          onClick={() => setReportType('overview')}
        >
          <BarChart3 size={16} />
          Overview
        </button>
        <button 
          className={`sub-tab ${reportType === 'time' ? 'active' : ''}`}
          onClick={() => setReportType('time')}
        >
          <Clock size={16} />
          Time Tracking
        </button>
        <button 
          className={`sub-tab ${reportType === 'budget' ? 'active' : ''}`}
          onClick={() => setReportType('budget')}
        >
          <DollarSign size={16} />
          Budget Analysis
        </button>
        <button 
          className={`sub-tab ${reportType === 'resources' ? 'active' : ''}`}
          onClick={() => setReportType('resources')}
        >
          <Users size={16} />
          Resource Utilization
        </button>
        <button 
          className={`sub-tab ${reportType === 'tasks' ? 'active' : ''}`}
          onClick={() => setReportType('tasks')}
        >
          <Target size={16} />
          Task Completion
        </button>
        <button 
          className={`sub-tab ${reportType === 'client' ? 'active' : ''}`}
          onClick={() => setReportType('client')}
        >
          <Activity size={16} />
          Client Satisfaction
        </button>
      </div>

      {/* Overview Report */}
      {reportType === 'overview' && (
        <div className="section-content">
          {/* Key Metrics */}
          <div className="metrics-grid">
            <div className="metric-card">
              <div className="metric-icon blue">
                <TrendingUp size={24} />
              </div>
              <div className="metric-content">
                <span className="metric-value">{projectMetrics.overall.completion}%</span>
                <span className="metric-label">Project Completion</span>
                <span className="metric-trend positive">+5% from last month</span>
              </div>
            </div>
            
            <div className="metric-card">
              <div className="metric-icon green">
                <Target size={24} />
              </div>
              <div className="metric-content">
                <span className="metric-value">{projectMetrics.overall.onTimeDelivery}%</span>
                <span className="metric-label">On-Time Delivery</span>
                <span className="metric-trend positive">Above target</span>
              </div>
            </div>
            
            <div className="metric-card">
              <div className="metric-icon orange">
                <DollarSign size={24} />
              </div>
              <div className="metric-content">
                <span className="metric-value">{projectMetrics.overall.budgetUtilization}%</span>
                <span className="metric-label">Budget Utilization</span>
                <span className="metric-trend neutral">On track</span>
              </div>
            </div>
            
            <div className="metric-card">
              <div className="metric-icon purple">
                <Users size={24} />
              </div>
              <div className="metric-content">
                <span className="metric-value">{projectMetrics.overall.teamEfficiency}%</span>
                <span className="metric-label">Team Efficiency</span>
                <span className="metric-trend positive">+3% improvement</span>
              </div>
            </div>
          </div>

          {/* Charts Grid */}
          <div className="charts-grid">
            <div className="chart-card">
              <h4 className="chart-title">Budget vs. Actual Spend</h4>
              <div className="chart-placeholder">
                <BarChart3 size={48} />
                <p>Bar chart showing budget allocation and actual spending</p>
              </div>
            </div>
            
            <div className="chart-card">
              <h4 className="chart-title">Task Status Distribution</h4>
              <div className="chart-placeholder">
                <PieChart size={48} />
                <p>Pie chart showing task breakdown by status</p>
              </div>
            </div>
          </div>

          {/* Summary Stats */}
          <div className="summary-stats-grid">
            <div className="summary-stat">
              <span className="stat-label">Total Budget</span>
              <span className="stat-value">₹{projectMetrics.budget.total.toLocaleString()}</span>
            </div>
            <div className="summary-stat">
              <span className="stat-label">Spent</span>
              <span className="stat-value spent">₹{projectMetrics.budget.spent.toLocaleString()}</span>
            </div>
            <div className="summary-stat">
              <span className="stat-label">Remaining</span>
              <span className="stat-value remaining">₹{projectMetrics.budget.remaining.toLocaleString()}</span>
            </div>
            <div className="summary-stat">
              <span className="stat-label">Total Hours</span>
              <span className="stat-value">{projectMetrics.team.totalHours}h</span>
            </div>
          </div>
        </div>
      )}

      {/* Time Tracking Report */}
      {reportType === 'time' && (
        <div className="section-content">
          <div className="project-details-card">
            <h3 className="card-section-title">Time Tracking by Team Member</h3>
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Team Member</th>
                    <th>Planned Hours</th>
                    <th>Actual Hours</th>
                    <th>Variance</th>
                    <th>Efficiency</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {timeTracking.map((member, idx) => (
                    <tr key={idx}>
                      <td className="td-bold">{member.member}</td>
                      <td>{member.planned}h</td>
                      <td>{member.actual}h</td>
                      <td>
                        <span className={`variance-badge ${member.variance >= 0 ? 'positive' : 'negative'}`}>
                          {member.variance >= 0 ? '+' : ''}{member.variance}h
                        </span>
                      </td>
                      <td>{member.efficiency}%</td>
                      <td>
                        <div className="efficiency-bar">
                          <div 
                            className="efficiency-fill" 
                            style={{ width: `${member.efficiency}%` }}
                          ></div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="chart-card">
            <h4 className="chart-title">Weekly Time Distribution</h4>
            <div className="chart-placeholder">
              <BarChart3 size={48} />
              <p>Line chart showing hours logged per week</p>
            </div>
          </div>
        </div>
      )}

      {/* Budget Analysis Report */}
      {reportType === 'budget' && (
        <div className="section-content">
          <div className="project-details-card">
            <h3 className="card-section-title">Budget Breakdown by Category</h3>
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Category</th>
                    <th>Allocated</th>
                    <th>Spent</th>
                    <th>Remaining</th>
                    <th>Utilization</th>
                    <th>Progress</th>
                  </tr>
                </thead>
                <tbody>
                  {budgetBreakdown.map((item, idx) => (
                    <tr key={idx}>
                      <td className="td-bold">{item.category}</td>
                      <td>₹{item.allocated.toLocaleString()}</td>
                      <td>₹{item.spent.toLocaleString()}</td>
                      <td>₹{(item.allocated - item.spent).toLocaleString()}</td>
                      <td>{Math.round((item.spent / item.allocated) * 100)}%</td>
                      <td>
                        <div className="progress-bar small">
                          <div 
                            className="progress-bar-fill" 
                            style={{ width: `${(item.spent / item.allocated) * 100}%` }}
                          ></div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="budget-summary-cards">
            <div className="budget-card">
              <DollarSign size={32} className="budget-icon" />
              <div className="budget-info">
                <span className="budget-label">Budget Variance</span>
                <span className={`budget-value ${projectMetrics.budget.variance < 0 ? 'negative' : 'positive'}`}>
                  ₹{Math.abs(projectMetrics.budget.variance).toLocaleString()}
                  {projectMetrics.budget.variance < 0 ? ' under' : ' over'}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Resource Utilization Report */}
      {reportType === 'resources' && (
        <div className="section-content">
          <div className="project-details-card">
            <h3 className="card-section-title">Resource Utilization Analysis</h3>
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Role</th>
                    <th>Utilization %</th>
                    <th>Billable Hours</th>
                    <th>Non-Billable Hours</th>
                    <th>Total Hours</th>
                  </tr>
                </thead>
                <tbody>
                  {resourceUtilization.map((resource, idx) => (
                    <tr key={idx}>
                      <td className="td-bold">{resource.name}</td>
                      <td>{resource.role}</td>
                      <td>
                        <div className="utilization-cell">
                          <span className={`utilization-value ${resource.utilization >= 90 ? 'high' : resource.utilization >= 70 ? 'medium' : 'low'}`}>
                            {resource.utilization}%
                          </span>
                        </div>
                      </td>
                      <td>{resource.billableHours}h</td>
                      <td>{resource.nonBillableHours}h</td>
                      <td>{resource.billableHours + resource.nonBillableHours}h</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Task Completion Report */}
      {reportType === 'tasks' && (
        <div className="section-content">
          <div className="task-metrics-grid">
            <div className="task-metric-card">
              <Target size={32} />
              <div>
                <span className="task-metric-value">{projectMetrics.tasks.completed}/{projectMetrics.tasks.total}</span>
                <span className="task-metric-label">Tasks Completed</span>
              </div>
            </div>
            <div className="task-metric-card">
              <Clock size={32} />
              <div>
                <span className="task-metric-value">{projectMetrics.tasks.inProgress}</span>
                <span className="task-metric-label">In Progress</span>
              </div>
            </div>
            <div className="task-metric-card">
              <Activity size={32} />
              <div>
                <span className="task-metric-value">{projectMetrics.tasks.pending}</span>
                <span className="task-metric-label">Pending</span>
              </div>
            </div>
            <div className="task-metric-card warning">
              <Calendar size={32} />
              <div>
                <span className="task-metric-value">{projectMetrics.tasks.overdue}</span>
                <span className="task-metric-label">Overdue</span>
              </div>
            </div>
          </div>

          <div className="chart-card">
            <h4 className="chart-title">Weekly Task Completion Rate</h4>
            <div className="weekly-completion-chart">
              {taskCompletionRate.map((week, idx) => (
                <div key={idx} className="week-bar">
                  <div className="week-label">{week.week}</div>
                  <div className="completion-bar">
                    <div 
                      className="completion-fill" 
                      style={{ width: `${(week.completed / week.total) * 100}%` }}
                    ></div>
                  </div>
                  <div className="week-stats">{week.completed}/{week.total}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Client Satisfaction Report */}
      {reportType === 'client' && (
        <div className="section-content">
          <div className="satisfaction-overview">
            <div className="overall-rating-card">
              <h3>Overall Client Rating</h3>
              <div className="rating-display">
                <span className="rating-value">{clientSatisfaction.overallRating}</span>
                <span className="rating-max">/ 5.0</span>
              </div>
              <div className="rating-stars">⭐⭐⭐⭐⭐</div>
            </div>

            <div className="rating-breakdown">
              <div className="rating-item">
                <span className="rating-label">Communication</span>
                <div className="rating-bar">
                  <div 
                    className="rating-fill" 
                    style={{ width: `${(clientSatisfaction.communication / 5) * 100}%` }}
                  ></div>
                </div>
                <span className="rating-score">{clientSatisfaction.communication}</span>
              </div>
              <div className="rating-item">
                <span className="rating-label">Quality</span>
                <div className="rating-bar">
                  <div 
                    className="rating-fill" 
                    style={{ width: `${(clientSatisfaction.quality / 5) * 100}%` }}
                  ></div>
                </div>
                <span className="rating-score">{clientSatisfaction.quality}</span>
              </div>
              <div className="rating-item">
                <span className="rating-label">Timeliness</span>
                <div className="rating-bar">
                  <div 
                    className="rating-fill" 
                    style={{ width: `${(clientSatisfaction.timeliness / 5) * 100}%` }}
                  ></div>
                </div>
                <span className="rating-score">{clientSatisfaction.timeliness}</span>
              </div>
            </div>
          </div>

          <div className="project-details-card">
            <h3 className="card-section-title">Client Feedback History</h3>
            <div className="feedback-list">
              {clientSatisfaction.feedback.map((item, idx) => (
                <div key={idx} className="feedback-item">
                  <div className="feedback-header">
                    <span className="feedback-date">{item.date}</span>
                    <span className="feedback-rating">⭐ {item.rating}/5</span>
                  </div>
                  <p className="feedback-comment">{item.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reports;
