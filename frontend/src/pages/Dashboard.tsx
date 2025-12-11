import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import RevenueChart from '../components/RevenueChart';
import SalesPipelineChart from '../components/SalesPipelineChart';
import PerformanceChart from '../components/PerformanceChart';
import ProjectStatusChart from '../components/ProjectStatusChart';
import { 
  FileText,
  UserCheck,
  Bot,
  TrendingUp,
  CheckCircle2,
  ListTodo,
  FolderKanban,
  Bell,
  Ticket,
  Volume2,
  ChevronLeft,
  ChevronRight,
  Search,
  BarChart3,
  RefreshCw,
  Activity,
  MessageSquare,
  Upload,
  Calendar,
  User
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    const saved = localStorage.getItem('sidebarOpen');
    return saved ? JSON.parse(saved) : false;
  });

  const handleSidebarToggle = () => {
    const newState = !sidebarOpen;
    setSidebarOpen(newState);
    localStorage.setItem('sidebarOpen', JSON.stringify(newState));
  };
  const [activeTab, setActiveTab] = useState('tasks');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [entriesPerPage, setEntriesPerPage] = useState(25);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [calendarView, setCalendarView] = useState<'month' | 'week' | 'day'>('month');
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);
  const [expandedCalendar, setExpandedCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // Top Stats Cards
  const statsCards = [
    {
      title: 'Projects',
      value: '3',
      subtitle: '3 Active',
      icon: FileText,
      color: 'stat-yellow',
      iconBg: 'bg-yellow'
    },
    {
      title: 'Tasks',
      value: '136',
      subtitle: '0 this month',
      icon: TrendingUp,
      color: 'stat-blue',
      iconBg: 'bg-blue'
    },
    {
      title: 'Contacts',
      value: '56',
      subtitle: '2 this month',
      icon: UserCheck,
      color: 'stat-green',
      iconBg: 'bg-green'
    },
    {
      title: 'Pending Tasks',
      value: '1',
      subtitle: '0 Completed',
      icon: Bot,
      color: 'stat-gray',
      iconBg: 'bg-gray'
    }
  ];

  // Progress Bars Data
  const progressData = [
    {
      title: 'Converted Leads',
      current: 0,
      total: 0,
      percentage: 0,
      icon: TrendingUp,
      color: 'progress-blue'
    },
    {
      title: 'Projects in Progress',
      current: 1,
      total: 1,
      percentage: 100,
      icon: FolderKanban,
      color: 'progress-blue'
    },
    {
      title: 'Tasks Not Finished',
      current: 1,
      total: 1,
      percentage: 100,
      icon: CheckCircle2,
      color: 'progress-dark'
    }
  ];

  // Tasks Data
  const tasksData = [
    {
      id: 1488,
      name: 'Frond end UI Design',
      project: '#203 - Web RTC - Zedunix',
      status: 'In Progress',
      startDate: '02-12-2025',
      tags: [],
      priority: 'High'
    }
  ];

  // Projects Data
  const projectsData = [
    {
      id: 1,
      name: 'Web RTC',
      startDate: '02-12-2025',
      deadline: '',
      status: 'In Progress'
    }
  ];

  // Reminders Data - Empty as shown in image
  const remindersData: Array<{
    id: number;
    relatedTo: string;
    description: string;
    date: string;
  }> = [];

  // Tickets Data
  const ticketsData = [
    {
      id: 2,
      subject: 'need help on abc',
      tags: '',
      status: 'Answered',
      priority: 'Medium',
      lastReply: '24-07-2025 3:53 PM'
    }
  ];

  // Announcements Data
  const announcementsData = [
    {
      id: 1,
      subject: 'Mandatory Wearing of ID Cards Inside the Office',
      view: 'View',
      date: '09-05-2025 1:15 PM'
    },
    {
      id: 2,
      subject: 'Weekly ZOLLID Team Meeting – Building Attitude, Skill & Knowledge',
      date: '11-04-2025 10:15 PM'
    }
  ];

  // Latest Activity Data
  const latestActivityData = [
    {
      id: 1,
      type: 'task_completed',
      user: 'Sarah Johnson',
      action: 'completed task',
      target: 'UI Design Review',
      time: '2 minutes ago',
      avatar: '👩‍💼',
      color: '#10b981',
      icon: 'check'
    },
    {
      id: 2,
      type: 'project_created',
      user: 'Mike Chen',
      action: 'created new project',
      target: 'Mobile App Development',
      time: '15 minutes ago',
      avatar: '👨‍💻',
      color: '#6366f1',
      icon: 'folder'
    },
    {
      id: 3,
      type: 'comment_added',
      user: 'Emma Wilson',
      action: 'commented on',
      target: 'Backend API Integration',
      time: '1 hour ago',
      avatar: '👩‍🔬',
      color: '#8b5cf6',
      icon: 'message'
    },
    {
      id: 4,
      type: 'file_uploaded',
      user: 'Alex Turner',
      action: 'uploaded files to',
      target: 'Design Assets Folder',
      time: '2 hours ago',
      avatar: '👨‍🎨',
      color: '#f59e0b',
      icon: 'upload'
    },
    {
      id: 5,
      type: 'meeting_scheduled',
      user: 'Rachel Green',
      action: 'scheduled meeting',
      target: 'Q4 Planning Session',
      time: '3 hours ago',
      avatar: '👩‍💼',
      color: '#14b8a6',
      icon: 'calendar'
    },
    {
      id: 6,
      type: 'task_assigned',
      user: 'David Park',
      action: 'assigned task to you',
      target: 'Database Optimization',
      time: '5 hours ago',
      avatar: '👨‍💼',
      color: '#ef4444',
      icon: 'user'
    }
  ];

  // Calendar Events
  const calendarEvents = [
    {
      id: 1,
      title: 'Friend end UI Design...',
      color: 'event-blue',
      date: 2
    },
    {
      id: 2,
      title: 'Web RTC',
      color: 'event-pink',
      date: 2
    }
  ];

  // Generate calendar days
  const generateCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    const days = [];

    // Previous month days
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({
        day: daysInPrevMonth - i,
        isCurrentMonth: false,
        isToday: false
      });
    }

    // Current month days
    const today = new Date();
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        day: i,
        isCurrentMonth: true,
        isToday: year === today.getFullYear() && month === today.getMonth() && i === today.getDate()
      });
    }

    // Next month days
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        day: i,
        isCurrentMonth: false,
        isToday: false
      });
    }

    return days;
  };

  const monthName = currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  // Filtering and sorting logic
  const getFilteredData = () => {
    let data: Record<string, unknown>[] = [];
    
    switch (activeTab) {
      case 'tasks':
        data = tasksData;
        break;
      case 'projects':
        data = projectsData;
        break;
      case 'reminders':
        data = remindersData;
        break;
      case 'tickets':
        data = ticketsData;
        break;
      case 'announcements':
        data = announcementsData;
        break;
      default:
        data = [];
    }

    // Apply search filter
    if (searchQuery) {
      data = data.filter(item => 
        Object.values(item).some(val => 
          String(val).toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }

    // Apply sorting
    if (sortConfig) {
      data.sort((a, b) => {
        const aVal = a[sortConfig.key as keyof typeof a] as string | number;
        const bVal = b[sortConfig.key as keyof typeof b] as string | number;
        if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return data;
  };

  // Pagination logic
  const filteredData = getFilteredData();
  const totalPages = Math.ceil(filteredData.length / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  // Calendar navigation
  const goToToday = () => {
    setCurrentMonth(new Date());
    setSelectedDate(new Date());
  };

  const previousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  // Reset to page 1 when tab changes
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setCurrentPage(1);
    setSearchQuery('');
    setSortConfig(null);
  };

  // Handle sort
  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="dashboard-layout">
      <Sidebar isOpen={sidebarOpen} onToggle={handleSidebarToggle} />
      
      <div className={`main-content ${sidebarOpen ? 'sidebar-open' : ''}`}>
        <Header onMenuClick={handleSidebarToggle} />
        
        <div className="dashboard-container-new">
          {/* Top Stats Cards */}
          <div className="stats-cards-grid">
            {statsCards.map((card, index) => {
              const Icon = card.icon;
              return (
                <div key={index} className={`stat-card ${card.color}`}>
                  <div className="stat-card-header">
                    <span className="stat-title">{card.title}</span>
                    <div className={`stat-icon ${card.iconBg}`}>
                      <Icon size={24} />
                    </div>
                  </div>
                  <div className="stat-card-body">
                    <h2 className="stat-value">{card.value}</h2>
                    <p className="stat-subtitle">{card.subtitle}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Progress Bars Section */}
          <div className="progress-section">
            {progressData.map((progress, index) => {
              const Icon = progress.icon;
              return (
                <div key={index} className={`progress-card ${progress.color}`}>
                  <div className="progress-header">
                    <Icon size={18} />
                    <span>{progress.title}</span>
                    <span className="progress-stats">{progress.current} / {progress.total}</span>
                  </div>
                  <div className="progress-bar-wrapper">
                    <div 
                      className="progress-bar-fill-new" 
                      style={{ width: `${progress.percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Advanced Charts Section */}
          <div className="charts-grid">
            <div className="chart-row-main">
              <RevenueChart />
            </div>
            <div className="chart-row-secondary">
              <SalesPipelineChart />
              <PerformanceChart />
            </div>
            <div className="chart-row-tertiary">
              <ProjectStatusChart />
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="main-grid-layout">
            {/* Left Section - Tasks & Calendar */}
            <div className="left-section">
              {/* Tabs Navigation */}
              <div className="tabs-navigation">
                <button 
                  className={`tab-btn ${activeTab === 'tasks' ? 'active' : ''}`}
                  onClick={() => handleTabChange('tasks')}
                >
                  <ListTodo size={18} />
                  <span>My Tasks</span>
                </button>
                <button 
                  className={`tab-btn ${activeTab === 'projects' ? 'active' : ''}`}
                  onClick={() => handleTabChange('projects')}
                >
                  <FolderKanban size={18} />
                  <span>My Projects</span>
                </button>
                <button 
                  className={`tab-btn ${activeTab === 'reminders' ? 'active' : ''}`}
                  onClick={() => handleTabChange('reminders')}
                >
                  <Bell size={18} />
                  <span>My Reminders</span>
                </button>
                <button 
                  className={`tab-btn ${activeTab === 'tickets' ? 'active' : ''}`}
                  onClick={() => handleTabChange('tickets')}
                >
                  <Ticket size={18} />
                  <span>Tickets</span>
                </button>
                <button 
                  className={`tab-btn ${activeTab === 'announcements' ? 'active' : ''}`}
                  onClick={() => handleTabChange('announcements')}
                >
                  <Volume2 size={18} />
                  <span>Announcements</span>
                </button>
              </div>

              {/* View All Link */}
              <div className="view-all-link">
                <a href="#view-all">View All</a>
              </div>

              {/* Table Controls */}
              <div className="table-controls">
                <select 
                  className="entries-select"
                  value={entriesPerPage}
                  onChange={(e) => setEntriesPerPage(Number(e.target.value))}
                >
                  <option value="25">25</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>
                <button className="control-btn">
                  Export
                </button>
                <button className="control-btn">
                  <RefreshCw size={16} />
                </button>
              </div>

              {/* Dynamic Tab Content */}
              {activeTab === 'tasks' && (
                <div className="tasks-table-wrapper">
                  <div className="table-search-bar">
                    <Search size={18} />
                    <input 
                      type="text" 
                      placeholder="Search tasks.." 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <table className="tasks-table">
                    <thead>
                      <tr>
                        <th onClick={() => handleSort('id')} style={{ cursor: 'pointer' }}>
                          # {sortConfig?.key === 'id' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                        </th>
                        <th onClick={() => handleSort('name')} style={{ cursor: 'pointer' }}>
                          Name {sortConfig?.key === 'name' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                        </th>
                        <th onClick={() => handleSort('status')} style={{ cursor: 'pointer' }}>
                          Status {sortConfig?.key === 'status' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                        </th>
                        <th onClick={() => handleSort('startDate')} style={{ cursor: 'pointer' }}>
                          Start Date {sortConfig?.key === 'startDate' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                        </th>
                        <th>Tags</th>
                        <th onClick={() => handleSort('priority')} style={{ cursor: 'pointer' }}>
                          Priority {sortConfig?.key === 'priority' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedData.length > 0 ? (
                        paginatedData.map((item) => {
                          const task = item as typeof tasksData[0];
                          return (
                          <tr key={task.id}>
                            <td>{task.id}</td>
                            <td>
                              <div className="task-name-cell">
                                <a href={`#task-${task.id}`} className="task-link">{task.name}</a>
                                <span className="task-project">{task.project}</span>
                              </div>
                            </td>
                            <td>
                              <span className="status-badge status-progress">
                                {task.status} <ChevronRight size={14} />
                              </span>
                            </td>
                            <td>{task.startDate}</td>
                            <td>-</td>
                            <td>
                              <span className="priority-badge priority-high">
                                {task.priority} <ChevronRight size={14} />
                              </span>
                            </td>
                          </tr>
                        );
                        })
                      ) : (
                        <tr>
                          <td colSpan={6} className="no-entries">
                            No tasks found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                  <div className="table-footer">
                    <span>Showing {startIndex + 1} to {Math.min(endIndex, filteredData.length)} of {filteredData.length} entries</span>
                    <div className="pagination">
                      <button 
                        className="page-btn" 
                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                        disabled={currentPage === 1}
                      >
                        Previous
                      </button>
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        const pageNum = i + 1;
                        return (
                          <button 
                            key={pageNum}
                            className={`page-btn ${currentPage === pageNum ? 'active' : ''}`}
                            onClick={() => setCurrentPage(pageNum)}
                          >
                            {pageNum}
                          </button>
                        );
                      })}
                      <button 
                        className="page-btn" 
                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                        disabled={currentPage === totalPages}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'projects' && (
                <div className="tasks-table-wrapper">
                  <div className="table-search-bar">
                    <Search size={18} />
                    <input 
                      type="text" 
                      placeholder="Search projects.." 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <table className="tasks-table">
                    <thead>
                      <tr>
                        <th onClick={() => handleSort('name')} style={{ cursor: 'pointer' }}>
                          Project Name {sortConfig?.key === 'name' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                        </th>
                        <th onClick={() => handleSort('startDate')} style={{ cursor: 'pointer' }}>
                          Start Date {sortConfig?.key === 'startDate' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                        </th>
                        <th>Deadline</th>
                        <th style={{ width: '50px' }}></th>
                        <th onClick={() => handleSort('status')} style={{ cursor: 'pointer' }}>
                          Status {sortConfig?.key === 'status' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedData.length > 0 ? (
                        paginatedData.map((item) => {
                          const project = item as typeof projectsData[0];
                          return (
                          <tr key={project.id}>
                            <td>
                              <a href={`#project-${project.id}`} className="task-link">{project.name}</a>
                            </td>
                            <td>{project.startDate}</td>
                            <td>{project.deadline || '-'}</td>
                            <td>
                              <button className="icon-btn">
                                <ChevronRight size={18} />
                              </button>
                            </td>
                            <td>
                              <span className="status-badge status-progress">
                                {project.status}
                              </span>
                            </td>
                          </tr>
                        );
                        })
                      ) : (
                        <tr>
                          <td colSpan={5} className="no-entries">
                            No projects found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                  <div className="table-footer">
                    <span>Showing {startIndex + 1} to {Math.min(endIndex, filteredData.length)} of {filteredData.length} entries</span>
                    <div className="pagination">
                      <button 
                        className="page-btn" 
                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                        disabled={currentPage === 1}
                      >
                        Previous
                      </button>
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        const pageNum = i + 1;
                        return (
                          <button 
                            key={pageNum}
                            className={`page-btn ${currentPage === pageNum ? 'active' : ''}`}
                            onClick={() => setCurrentPage(pageNum)}
                          >
                            {pageNum}
                          </button>
                        );
                      })}
                      <button 
                        className="page-btn" 
                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                        disabled={currentPage === totalPages}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'reminders' && (
                <div className="tasks-table-wrapper">
                  <div className="table-search-bar">
                    <Search size={18} />
                    <input 
                      type="text" 
                      placeholder="Search reminders.." 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <table className="tasks-table">
                    <thead>
                      <tr>
                        <th onClick={() => handleSort('relatedTo')} style={{ cursor: 'pointer' }}>
                          Related to {sortConfig?.key === 'relatedTo' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                        </th>
                        <th onClick={() => handleSort('description')} style={{ cursor: 'pointer' }}>
                          Description {sortConfig?.key === 'description' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                        </th>
                        <th onClick={() => handleSort('date')} style={{ cursor: 'pointer' }}>
                          Date {sortConfig?.key === 'date' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                        </th>
                        <th style={{ width: '50px' }}></th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedData.length === 0 ? (
                        <tr>
                          <td colSpan={4} className="no-entries">
                            No entries found
                          </td>
                        </tr>
                      ) : (
                        paginatedData.map((item) => {
                          const reminder = item as typeof remindersData[0];
                          return (
                          <tr key={reminder.id}>
                            <td>{reminder.relatedTo}</td>
                            <td>{reminder.description}</td>
                            <td>{reminder.date}</td>
                            <td>
                              <button className="icon-btn">
                                <ChevronRight size={18} />
                              </button>
                            </td>
                          </tr>
                        );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              )}

              {activeTab === 'tickets' && (
                <div className="tasks-table-wrapper">
                  <div className="table-search-bar">
                    <Search size={18} />
                    <input 
                      type="text" 
                      placeholder="Search tickets.." 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <table className="tasks-table">
                    <thead>
                      <tr>
                        <th onClick={() => handleSort('id')} style={{ cursor: 'pointer' }}>
                          # {sortConfig?.key === 'id' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                        </th>
                        <th onClick={() => handleSort('subject')} style={{ cursor: 'pointer' }}>
                          Subject {sortConfig?.key === 'subject' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                        </th>
                        <th>Tags</th>
                        <th onClick={() => handleSort('status')} style={{ cursor: 'pointer' }}>
                          Status {sortConfig?.key === 'status' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                        </th>
                        <th onClick={() => handleSort('priority')} style={{ cursor: 'pointer' }}>
                          Priority {sortConfig?.key === 'priority' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                        </th>
                        <th onClick={() => handleSort('lastReply')} style={{ cursor: 'pointer' }}>
                          Last Reply {sortConfig?.key === 'lastReply' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedData.length > 0 ? (
                        paginatedData.map((item) => {
                          const ticket = item as typeof ticketsData[0];
                          return (
                          <tr key={ticket.id}>
                            <td>{ticket.id}</td>
                            <td>
                              <a href={`#ticket-${ticket.id}`} className="task-link">{ticket.subject}</a>
                            </td>
                            <td>{ticket.tags || '-'}</td>
                            <td>
                              <span className="status-badge status-answered">
                                {ticket.status}
                              </span>
                            </td>
                            <td>{ticket.priority}</td>
                            <td>{ticket.lastReply}</td>
                          </tr>
                        );
                        })
                      ) : (
                        <tr>
                          <td colSpan={6} className="no-entries">
                            No tickets found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                  <div className="table-footer">
                    <span>Showing {startIndex + 1} to {Math.min(endIndex, filteredData.length)} of {filteredData.length} entries</span>
                    <div className="pagination">
                      <button 
                        className="page-btn" 
                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                        disabled={currentPage === 1}
                      >
                        Previous
                      </button>
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        const pageNum = i + 1;
                        return (
                          <button 
                            key={pageNum}
                            className={`page-btn ${currentPage === pageNum ? 'active' : ''}`}
                            onClick={() => setCurrentPage(pageNum)}
                          >
                            {pageNum}
                          </button>
                        );
                      })}
                      <button 
                        className="page-btn" 
                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                        disabled={currentPage === totalPages}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'announcements' && (
                <div className="tasks-table-wrapper">
                  <div className="table-search-bar">
                    <Search size={18} />
                    <input 
                      type="text" 
                      placeholder="Search announcements.." 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <table className="tasks-table announcements-table">
                    <thead>
                      <tr>
                        <th onClick={() => handleSort('subject')} style={{ cursor: 'pointer' }}>
                          Subject {sortConfig?.key === 'subject' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                        </th>
                        <th onClick={() => handleSort('date')} style={{ cursor: 'pointer' }}>
                          Date {sortConfig?.key === 'date' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                        </th>
                        <th style={{ width: '50px' }}></th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedData.length > 0 ? (
                        paginatedData.map((item) => {
                          const announcement = item as typeof announcementsData[0];
                          return (
                          <tr key={announcement.id}>
                            <td>
                              <div className="announcement-cell">
                                <a href={`#announcement-${announcement.id}`} className="task-link">
                                  {announcement.subject}
                                </a>
                                {announcement.view && (
                                  <a href={`#view-${announcement.id}`} className="view-link">
                                    {announcement.view}
                                  </a>
                                )}
                              </div>
                            </td>
                            <td>{announcement.date}</td>
                            <td>
                              <button className="icon-btn">
                                <ChevronRight size={18} />
                              </button>
                            </td>
                          </tr>
                        );
                        })
                      ) : (
                        <tr>
                          <td colSpan={3} className="no-entries">
                            No announcements found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                  <div className="table-footer">
                    <span>Showing {startIndex + 1} to {Math.min(endIndex, filteredData.length)} of {filteredData.length} entries</span>
                    <div className="pagination">
                      <button 
                        className="page-btn" 
                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                        disabled={currentPage === 1}
                      >
                        Previous
                      </button>
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        const pageNum = i + 1;
                        return (
                          <button 
                            key={pageNum}
                            className={`page-btn ${currentPage === pageNum ? 'active' : ''}`}
                            onClick={() => setCurrentPage(pageNum)}
                          >
                            {pageNum}
                          </button>
                        );
                      })}
                      <button 
                        className="page-btn" 
                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                        disabled={currentPage === totalPages}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Calendar View */}
              <div className="calendar-section">
                <div className="calendar-header">
                  <div className="calendar-controls">
                    <button 
                      className="calendar-nav-btn"
                      onClick={previousMonth}
                      title="Previous Month"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button 
                      className="calendar-nav-btn"
                      onClick={nextMonth}
                      title="Next Month"
                    >
                      <ChevronRight size={20} />
                    </button>
                    <button 
                      className="today-btn"
                      onClick={goToToday}
                      title="Go to Today"
                    >
                      Today
                    </button>
                    <button 
                      className="expand-btn"
                      onClick={() => setExpandedCalendar(!expandedCalendar)}
                      title={expandedCalendar ? "Collapse Calendar" : "Expand Calendar"}
                    >
                      {expandedCalendar ? 'Collapse' : 'Expand'}
                    </button>
                  </div>
                  <h3 className="calendar-month">{monthName}</h3>
                  <div className="calendar-view-options">
                    <button 
                      className={`view-option-btn ${calendarView === 'month' ? 'active' : ''}`}
                      onClick={() => setCalendarView('month')}
                    >
                      Month
                    </button>
                    <button 
                      className={`view-option-btn ${calendarView === 'week' ? 'active' : ''}`}
                      onClick={() => setCalendarView('week')}
                    >
                      Week
                    </button>
                    <button 
                      className={`view-option-btn ${calendarView === 'day' ? 'active' : ''}`}
                      onClick={() => setCalendarView('day')}
                    >
                      Day
                    </button>
                  </div>
                </div>

                <div className={`calendar-grid ${expandedCalendar ? 'expanded' : ''}`}>
                  <div className="calendar-weekdays">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                      <div key={day} className="weekday">{day}</div>
                    ))}
                  </div>
                  <div className="calendar-days">
                    {generateCalendar().map((dayInfo, index) => (
                      <div 
                        key={index} 
                        className={`calendar-day ${!dayInfo.isCurrentMonth ? 'other-month' : ''} ${dayInfo.isToday ? 'today' : ''} ${selectedDate && dayInfo.day === selectedDate.getDate() && dayInfo.isCurrentMonth ? 'selected' : ''}`}
                        onClick={() => dayInfo.isCurrentMonth && setSelectedDate(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), dayInfo.day))}
                        role="button"
                        tabIndex={0}
                      >
                        <span className="day-number">{dayInfo.day}</span>
                        {dayInfo.day === 2 && dayInfo.isCurrentMonth && (
                          <div className="day-events">
                            {calendarEvents.map((event) => (
                              <div 
                                key={event.id} 
                                className={`event-pill ${event.color}`}
                                title={event.title}
                              >
                                {event.title}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Section - Sidebar Panels */}
            <div className="right-section">
              {/* Team Performance */}
              <div className="sidebar-panel team-performance-panel">
                <div className="panel-header">
                  <div className="panel-title">
                    <TrendingUp size={18} />
                    <span>Team Performance</span>
                  </div>
                  <div className="panel-actions">
                    <button className="panel-action-btn">View Details</button>
                  </div>
                </div>

                <div className="performance-metrics">
                  <div className="metric-card metric-success">
                    <div className="metric-icon">🎯</div>
                    <div className="metric-info">
                      <h4 className="metric-value">94%</h4>
                      <p className="metric-label">Tasks Completed</p>
                    </div>
                    <div className="metric-trend trend-up">+8%</div>
                  </div>

                  <div className="metric-card metric-primary">
                    <div className="metric-icon">⚡</div>
                    <div className="metric-info">
                      <h4 className="metric-value">87%</h4>
                      <p className="metric-label">Productivity</p>
                    </div>
                    <div className="metric-trend trend-up">+12%</div>
                  </div>

                  <div className="metric-card metric-warning">
                    <div className="metric-icon">⏱️</div>
                    <div className="metric-info">
                      <h4 className="metric-value">156h</h4>
                      <p className="metric-label">Hours Logged</p>
                    </div>
                    <div className="metric-trend trend-up">+5%</div>
                  </div>

                  <div className="metric-card metric-info">
                    <div className="metric-icon">🚀</div>
                    <div className="metric-info">
                      <h4 className="metric-value">23</h4>
                      <p className="metric-label">Active Projects</p>
                    </div>
                    <div className="metric-trend trend-down">-2</div>
                  </div>
                </div>
              </div>

              {/* Latest Activity Timeline */}
              <div className="sidebar-panel latest-activity-panel">
                <div className="panel-header">
                  <div className="panel-title">
                    <Activity size={18} />
                    <span>Latest Activity</span>
                  </div>
                  <div className="panel-actions">
                    <button className="panel-action-btn">View All</button>
                  </div>
                </div>

                <div className="activity-timeline">
                  {latestActivityData.map((activity, index) => (
                    <div key={activity.id} className="activity-item" style={{'--activity-color': activity.color} as React.CSSProperties}>
                      <div className="activity-avatar">
                        <span className="avatar-emoji">{activity.avatar}</span>
                        <div className="activity-pulse"></div>
                      </div>
                      <div className="activity-content">
                        <div className="activity-header">
                          <span className="activity-user">{activity.user}</span>
                          <span className="activity-time">{activity.time}</span>
                        </div>
                        <div className="activity-body">
                          <span className="activity-action">{activity.action}</span>
                          <span className="activity-target">{activity.target}</span>
                        </div>
                        <div className="activity-type-badge" data-type={activity.type}>
                          {activity.icon === 'check' && <CheckCircle2 size={12} />}
                          {activity.icon === 'folder' && <FolderKanban size={12} />}
                          {activity.icon === 'message' && <MessageSquare size={12} />}
                          {activity.icon === 'upload' && <Upload size={12} />}
                          {activity.icon === 'calendar' && <Calendar size={12} />}
                          {activity.icon === 'user' && <User size={12} />}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="activity-footer">
                  <button className="load-more-btn">
                    <RefreshCw size={14} />
                    Load More Activities
                  </button>
                </div>
              </div>

              {/* Revenue Insights */}
              <div className="sidebar-panel revenue-insights-panel">
                <div className="panel-header">
                  <div className="panel-title">
                    <BarChart3 size={18} />
                    <span>Revenue Insights</span>
                  </div>
                </div>

                <div className="revenue-summary">
                  <div className="revenue-total">
                    <h3 className="revenue-amount">$284,567</h3>
                    <p className="revenue-period">Total Revenue This Month</p>
                    <div className="revenue-change positive">+18.4% from last month</div>
                  </div>

                  <div className="revenue-breakdown">
                    <div className="revenue-item revenue-subscriptions">
                      <div className="revenue-item-header">
                        <span className="revenue-icon">💳</span>
                        <span className="revenue-label">Subscriptions</span>
                      </div>
                      <div className="revenue-value">$142,300</div>
                      <div className="revenue-bar">
                        <div className="revenue-fill" style={{width: '50%'}}></div>
                      </div>
                    </div>

                    <div className="revenue-item revenue-services">
                      <div className="revenue-item-header">
                        <span className="revenue-icon">🛠️</span>
                        <span className="revenue-label">Services</span>
                      </div>
                      <div className="revenue-value">$85,467</div>
                      <div className="revenue-bar">
                        <div className="revenue-fill" style={{width: '30%'}}></div>
                      </div>
                    </div>

                    <div className="revenue-item revenue-products">
                      <div className="revenue-item-header">
                        <span className="revenue-icon">📦</span>
                        <span className="revenue-label">Products</span>
                      </div>
                      <div className="revenue-value">$56,800</div>
                      <div className="revenue-bar">
                        <div className="revenue-fill" style={{width: '20%'}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>


            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
