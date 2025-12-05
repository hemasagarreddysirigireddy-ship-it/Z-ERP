import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
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
  RefreshCw
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
      title: 'TEMPLATES',
      value: '3',
      subtitle: '3 Approved',
      icon: FileText,
      color: 'stat-yellow',
      iconBg: 'bg-yellow'
    },
    {
      title: 'LEADS',
      value: '136',
      subtitle: '0 this month',
      icon: TrendingUp,
      color: 'stat-blue',
      iconBg: 'bg-blue'
    },
    {
      title: 'CONTACTS',
      value: '56',
      subtitle: '2 this month',
      icon: UserCheck,
      color: 'stat-green',
      iconBg: 'bg-green'
    },
    {
      title: 'BOTS',
      value: '1',
      subtitle: '0 Messages sent',
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
              {/* My To Do Items */}
              <div className="sidebar-panel">
                <div className="panel-header">
                  <div className="panel-title">
                    <CheckCircle2 size={18} />
                    <span>My To Do Items</span>
                  </div>
                  <div className="panel-actions">
                    <button className="panel-action-btn">View All</button>
                    <button className="panel-action-btn">New To Do</button>
                  </div>
                </div>

                {/* Latest to do's */}
                <div className="todo-section">
                  <h4 className="todo-section-title">
                    ⚠️ Latest to do's
                  </h4>
                  <p className="todo-empty">No todos found</p>
                </div>

                {/* Latest finished to do's */}
                <div className="todo-section">
                  <h4 className="todo-section-title">
                    ✓ Latest finished to do's
                  </h4>
                  <p className="todo-empty">No finished todos found</p>
                </div>
              </div>

              {/* Leads Overview */}
              <div className="sidebar-panel">
                <div className="panel-header">
                  <div className="panel-title">
                    <BarChart3 size={18} />
                    <span>Leads Overview</span>
                  </div>
                </div>

                <div className="leads-chart">
                  <div className="chart-legend">
                    <div className="legend-item">
                      <span className="legend-color bg-cyan"></span>
                      <span>New Enquiry</span>
                    </div>
                    <div className="legend-item">
                      <span className="legend-color bg-green"></span>
                      <span>Follow up</span>
                    </div>
                    <div className="legend-item">
                      <span className="legend-color bg-red"></span>
                      <span>Not interested</span>
                    </div>
                    <div className="legend-item">
                      <span className="legend-color bg-lime"></span>
                      <span>Customer</span>
                    </div>
                    <div className="legend-item">
                      <span className="legend-color bg-orange"></span>
                      <span>Lost Leads</span>
                    </div>
                  </div>
                  
                  {/* Placeholder for chart - would integrate a chart library */}
                  <div className="chart-placeholder">
                    <div className="donut-chart">
                      <svg viewBox="0 0 100 100" className="donut-svg">
                        <circle cx="50" cy="50" r="40" fill="transparent" stroke="#3b82f6" strokeWidth="20" />
                      </svg>
                      <div className="chart-center-text">
                        <span className="chart-value">136</span>
                        <span className="chart-label">Total Leads</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Latest Project Activity */}
              <div className="sidebar-panel">
                <div className="panel-header">
                  <div className="panel-title">
                    <FolderKanban size={18} />
                    <span>Latest Project Activity</span>
                  </div>
                </div>

                <div className="activity-timeline">
                  <div className="activity-item-timeline">
                    <div className="activity-marker"></div>
                    <div className="activity-content-timeline">
                      <div className="activity-header-timeline">
                        <strong>2 DAYS AGO</strong>
                      </div>
                      <p className="activity-text">
                        <strong>Finas Zollid</strong> - Added new task assignee
                      </p>
                      <p className="activity-meta">Project Name: <a href="#">Web RTC</a></p>
                      <p className="activity-meta">Friend end UI Design - C Janardhan</p>
                    </div>
                  </div>
                  
                  <div className="activity-item-timeline">
                    <div className="activity-marker"></div>
                    <div className="activity-content-timeline">
                      <div className="activity-header-timeline">
                        <strong>2 DAYS AGO</strong>
                      </div>
                      <p className="activity-text">
                        <strong>Finas Zollid</strong> - Added new task assignee
                      </p>
                      <p className="activity-meta">Project Name: <a href="#">Web RTC</a></p>
                      <p className="activity-meta">Friend end UI Design - Finas Zollid</p>
                    </div>
                  </div>

                  <div className="activity-item-timeline">
                    <div className="activity-marker"></div>
                    <div className="activity-content-timeline">
                      <div className="activity-header-timeline">
                        <strong>2 DAYS AGO</strong>
                      </div>
                      <p className="activity-text">
                        <strong>Finas Zollid</strong> - Created the project
                      </p>
                      <p className="activity-meta">Project Name: <a href="#">Web RTC</a></p>
                    </div>
                  </div>

                  <div className="activity-item-timeline">
                    <div className="activity-marker"></div>
                    <div className="activity-content-timeline">
                      <div className="activity-header-timeline">
                        <strong>2 DAYS AGO</strong>
                      </div>
                      <p className="activity-text">
                        <strong>Finas Zollid</strong> - Added new team member
                      </p>
                      <p className="activity-meta">Project Name: <a href="#">Web RTC</a></p>
                      <p className="activity-meta">Swaroop Pattar</p>
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
