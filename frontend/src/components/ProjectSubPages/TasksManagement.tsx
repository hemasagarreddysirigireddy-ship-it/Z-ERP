import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  MoreVertical,
  Calendar,
  Clock,
  Paperclip,
  MessageSquare,
  Filter,
  List,
  LayoutGrid,
  BarChart2
} from 'lucide-react';

interface TasksManagementProps {
  projectId: number;
}

const TasksManagement: React.FC<TasksManagementProps> = ({ projectId }) => {
  const [viewMode, setViewMode] = useState<'kanban' | 'list' | 'gantt' | 'calendar'>('kanban');
  const [showTaskModal, setShowTaskModal] = useState(false);

  const tasks = [
    { 
      id: 1, 
      title: 'Design homepage mockup', 
      assignee: 'Priya Sharma', 
      status: 'Done', 
      priority: 'High', 
      dueDate: '2024-12-05',
      hours: 8,
      subtasks: 2,
      comments: 5,
      attachments: 3,
      dependencies: [],
      recurring: false,
      tags: ['Design', 'UI']
    },
    { 
      id: 2, 
      title: 'Implement responsive layout', 
      assignee: 'Rajesh Kumar', 
      status: 'In Progress', 
      priority: 'High', 
      dueDate: '2024-12-08',
      hours: 16,
      subtasks: 5,
      comments: 8,
      attachments: 1,
      dependencies: [1],
      recurring: false,
      tags: ['Frontend', 'Development']
    },
    { 
      id: 3, 
      title: 'API integration', 
      assignee: 'Amit Patel', 
      status: 'In Progress', 
      priority: 'Medium', 
      dueDate: '2024-12-10',
      hours: 12,
      subtasks: 3,
      comments: 4,
      attachments: 0,
      dependencies: [],
      recurring: false,
      tags: ['Backend', 'API']
    },
    { 
      id: 4, 
      title: 'Testing and QA', 
      assignee: 'Sneha Reddy', 
      status: 'To Do', 
      priority: 'Medium', 
      dueDate: '2024-12-12',
      hours: 10,
      subtasks: 4,
      comments: 2,
      attachments: 0,
      dependencies: [2, 3],
      recurring: false,
      tags: ['Testing', 'QA']
    },
    { 
      id: 5, 
      title: 'Deploy to production', 
      assignee: 'Vikram Singh', 
      status: 'To Do', 
      priority: 'High', 
      dueDate: '2024-12-15',
      hours: 4,
      subtasks: 0,
      comments: 1,
      attachments: 0,
      dependencies: [4],
      recurring: false,
      tags: ['DevOps', 'Deploy']
    },
    {
      id: 6,
      title: 'Weekly status report',
      assignee: 'Priya Sharma',
      status: 'Review',
      priority: 'Low',
      dueDate: '2024-12-06',
      hours: 2,
      subtasks: 0,
      comments: 3,
      attachments: 1,
      dependencies: [],
      recurring: true,
      tags: ['Report', 'Admin']
    }
  ];

  const kanbanColumns = [
    { id: 'To Do', title: 'To Do', tasks: tasks.filter(t => t.status === 'To Do') },
    { id: 'In Progress', title: 'In Progress', tasks: tasks.filter(t => t.status === 'In Progress') },
    { id: 'Review', title: 'Review', tasks: tasks.filter(t => t.status === 'Review') },
    { id: 'Done', title: 'Done', tasks: tasks.filter(t => t.status === 'Done') }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'priority-high';
      case 'Medium': return 'priority-medium';
      case 'Low': return 'priority-low';
      default: return '';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Done': return 'status-completed';
      case 'In Progress': return 'status-inprogress';
      case 'Review': return 'status-review';
      case 'To Do': return 'status-pending';
      default: return '';
    }
  };

  return (
    <div className="tab-content">
      {/* Toolbar */}
      <div className="tab-content-header">
        <div className="search-box">
          <Search size={18} />
          <input type="text" placeholder="Search tasks..." />
        </div>
        
        <div className="toolbar-actions">
          {/* View Mode Selector */}
          <div className="view-mode-selector">
            <button 
              className={`view-btn ${viewMode === 'kanban' ? 'active' : ''}`}
              onClick={() => setViewMode('kanban')}
              title="Kanban View"
            >
              <LayoutGrid size={18} />
            </button>
            <button 
              className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
              title="List View"
            >
              <List size={18} />
            </button>
            <button 
              className={`view-btn ${viewMode === 'gantt' ? 'active' : ''}`}
              onClick={() => setViewMode('gantt')}
              title="Gantt View"
            >
              <BarChart2 size={18} />
            </button>
            <button 
              className={`view-btn ${viewMode === 'calendar' ? 'active' : ''}`}
              onClick={() => setViewMode('calendar')}
              title="Calendar View"
            >
              <Calendar size={18} />
            </button>
          </div>

          <button className="btn-secondary">
            <Filter size={18} />
            Filter
          </button>
          
          <button className="btn-primary" onClick={() => setShowTaskModal(true)}>
            <Plus size={18} />
            Add Task
          </button>
        </div>
      </div>

      {/* Kanban View */}
      {viewMode === 'kanban' && (
        <div className="kanban-board">
          {kanbanColumns.map((column) => (
            <div key={column.id} className="kanban-column">
              <div className="kanban-column-header">
                <h3>{column.title}</h3>
                <span className="task-count">{column.tasks.length}</span>
              </div>
              <div className="kanban-column-content">
                {column.tasks.map((task) => (
                  <div key={task.id} className="kanban-card">
                    <div className="kanban-card-header">
                      <span className={`priority-badge ${getPriorityColor(task.priority)}`}>
                        {task.priority}
                      </span>
                      {task.recurring && <span className="recurring-badge">↻</span>}
                      <button className="icon-btn-small">
                        <MoreVertical size={14} />
                      </button>
                    </div>
                    
                    <h4 className="kanban-card-title">{task.title}</h4>
                    
                    <div className="kanban-card-tags">
                      {task.tags.map((tag, idx) => (
                        <span key={idx} className="tag-badge">{tag}</span>
                      ))}
                    </div>

                    {task.dependencies.length > 0 && (
                      <div className="task-dependencies">
                        <span className="dependency-label">Depends on: Task #{task.dependencies.join(', #')}</span>
                      </div>
                    )}
                    
                    <div className="kanban-card-meta">
                      <div className="meta-item">
                        <Clock size={14} />
                        <span>{task.hours}h</span>
                      </div>
                      {task.subtasks > 0 && (
                        <div className="meta-item">
                          <List size={14} />
                          <span>{task.subtasks}</span>
                        </div>
                      )}
                      {task.comments > 0 && (
                        <div className="meta-item">
                          <MessageSquare size={14} />
                          <span>{task.comments}</span>
                        </div>
                      )}
                      {task.attachments > 0 && (
                        <div className="meta-item">
                          <Paperclip size={14} />
                          <span>{task.attachments}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="kanban-card-footer">
                      <div className="user-avatar small">
                        {task.assignee.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="due-date">
                        <Calendar size={12} />
                        {task.dueDate}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* List View */}
      {viewMode === 'list' && (
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
                <th>Progress</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task.id}>
                  <td className="td-bold">
                    {task.title}
                    {task.recurring && <span className="recurring-badge ml-2">↻ Recurring</span>}
                    {task.dependencies.length > 0 && (
                      <div className="task-dependency-small">
                        Depends on: #{task.dependencies.join(', #')}
                      </div>
                    )}
                  </td>
                  <td>
                    <div className="user-cell">
                      <div className="user-avatar">
                        {task.assignee.split(' ').map(n => n[0]).join('')}
                      </div>
                      {task.assignee}
                    </div>
                  </td>
                  <td>
                    <span className={`status-badge ${getStatusColor(task.status)}`}>
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
                    <div className="task-progress-cell">
                      <MessageSquare size={14} /> {task.comments}
                      {task.attachments > 0 && (
                        <>
                          <Paperclip size={14} className="ml-2" /> {task.attachments}
                        </>
                      )}
                    </div>
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
      )}

      {/* Gantt View Placeholder */}
      {viewMode === 'gantt' && (
        <div className="view-placeholder">
          <BarChart2 size={48} />
          <h3>Gantt Chart View</h3>
          <p>Visual timeline of tasks showing dependencies and progress</p>
          <p className="text-muted">This view displays task dependencies and scheduling</p>
        </div>
      )}

      {/* Calendar View Placeholder */}
      {viewMode === 'calendar' && (
        <div className="view-placeholder">
          <Calendar size={48} />
          <h3>Calendar View</h3>
          <p>View tasks in a calendar format by due date</p>
          <p className="text-muted">Visualize task deadlines and scheduling conflicts</p>
        </div>
      )}
    </div>
  );
};

export default TasksManagement;
