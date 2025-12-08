import React, { useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Share2, Clock, Bell, Plus, Menu, MessageSquare, User, Settings, LogOut, ChevronDown, X, Tag, Calendar, MapPin, Zap, TrendingUp, Award, Coffee, Target, Activity, Brain, Timer, Mail, Phone, CheckCircle, AlertCircle, Info, Star, Send, RotateCcw, Copy, Link2, Users, Building2, Globe2 } from 'lucide-react';
import EditProfile from '../Pages/EditProfile';
import { useLanguage } from '../i18n/LanguageContext';

interface HeaderProps {
  onMenuClick: () => void;
}

interface SearchablePage {
  name: string;
  path: string;
  description: string;
  keywords: string[];
  icon: React.ReactNode;
  color: string;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const { setLanguage, t } = useLanguage();
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [activeView] = React.useState<'week' | 'month' | 'year'>('month');
  const [showNotifications, setShowNotifications] = React.useState(false);
  const [showMessages, setShowMessages] = React.useState(false);
  const [showProfile, setShowProfile] = React.useState(false);
  const [showProfilePage, setShowProfilePage] = React.useState(false);
  const [showEditProfile, setShowEditProfile] = React.useState(false);
  const [showFullNotifications, setShowFullNotifications] = React.useState(false);
  const [showFullMessages, setShowFullMessages] = React.useState(false);
  const [notificationFilter, setNotificationFilter] = React.useState('all');
  const [messageSearch, setMessageSearch] = React.useState('');
  const [showLanguageMenu, setShowLanguageMenu] = React.useState(false);
  const [selectedLanguage, setSelectedLanguage] = React.useState(() => {
    return localStorage.getItem('selectedLanguage') || 'English';
  });
  const [languageSearch, setLanguageSearch] = React.useState('');
  const [showShareModal, setShowShareModal] = React.useState(false);
  const [shareText, setShareText] = React.useState('');
  const [selectedDepartment, setSelectedDepartment] = React.useState('All Departments');
  const [shareVisibility, setShareVisibility] = React.useState('public');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [showSearchResults, setShowSearchResults] = React.useState(false);
  const [searchFocused, setSearchFocused] = React.useState(false);
  const [showTaskModal, setShowTaskModal] = React.useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const [showClockModal, setShowClockModal] = React.useState(false);
  const [currentTime, setCurrentTime] = React.useState(new Date());
  const [checkInTime, setCheckInTime] = React.useState<Date | null>(null);
  const [checkOutTime, setCheckOutTime] = React.useState<Date | null>(null);
  const [selectedDate, setSelectedDate] = React.useState(new Date().toISOString().split('T')[0]);
  const [totalWorkHours, setTotalWorkHours] = React.useState(0);
  const [isCheckedIn, setIsCheckedIn] = React.useState(false);
  const [workStreak, setWorkStreak] = React.useState(5);
  const [productivityScore, setProductivityScore] = React.useState(87);
  const [breakTime, setBreakTime] = React.useState(0);
  const [focusScore, setFocusScore] = React.useState(92);
  const [tasksCompleted, setTasksCompleted] = React.useState(12);
  const [isOnBreak, setIsOnBreak] = React.useState(false);
  const [breakStartTime, setBreakStartTime] = React.useState<Date | null>(null);
  
  const [taskFormData, setTaskFormData] = React.useState({
    subject: '',
    hourlyRate: 0,
    startDate: new Date().toISOString().split('T')[0],
    dueDate: '',
    priority: 'Medium',
    repeatEvery: '',
    relatedTo: '',
    assignees: 'Ragini',
    followers: '',
    tags: '',
    description: '',
    isPublic: false,
    isBillable: true
  });

  const notificationRef = useRef<HTMLDivElement>(null);
  const messagesRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const clockRef = useRef<HTMLDivElement>(null);
  const languageRef = useRef<HTMLDivElement>(null);

  // Update clock every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      
      // Calculate work hours if checked in
      if (checkInTime && !checkOutTime) {
        const now = new Date();
        const diffMs = now.getTime() - checkInTime.getTime();
        const hours = diffMs / (1000 * 60 * 60);
        setTotalWorkHours(parseFloat(hours.toFixed(2)));
        setIsCheckedIn(true);
        
        // Dynamic productivity score based on work hours
        const newScore = Math.min(95, 75 + Math.floor(hours * 2));
        setProductivityScore(newScore);
        
        // Increment tasks completed every 30 minutes (simulated)
        const minutes = Math.floor(hours * 60);
        setTasksCompleted(12 + Math.floor(minutes / 30));
      }
      
      // Calculate break time if on break
      if (isOnBreak && breakStartTime) {
        const now = new Date();
        const diffMs = now.getTime() - breakStartTime.getTime();
        const minutes = diffMs / (1000 * 60);
        setBreakTime(parseFloat(minutes.toFixed(1)));
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [checkInTime, checkOutTime, isOnBreak, breakStartTime]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (messagesRef.current && !messagesRef.current.contains(event.target as Node)) {
        setShowMessages(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfile(false);
      }
      if (clockRef.current && !clockRef.current.contains(event.target as Node)) {
        setShowClockModal(false);
      }
      if (languageRef.current && !languageRef.current.contains(event.target as Node)) {
        setShowLanguageMenu(false);
        setLanguageSearch('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCheckIn = () => {
    const now = new Date();
    setCheckInTime(now);
    setCheckOutTime(null);
    setTotalWorkHours(0);
    setTasksCompleted(12);
    setProductivityScore(87);
    setIsOnBreak(false);
    setBreakTime(0);
    setIsCheckedIn(true);
  };

  const handleCheckOut = () => {
    const now = new Date();
    setCheckOutTime(now);
    setIsCheckedIn(false);
    setIsOnBreak(false);
    
    if (checkInTime) {
      const diff = now.getTime() - checkInTime.getTime();
      setTotalWorkHours(parseFloat((diff / (1000 * 60 * 60)).toFixed(2)));
    }
  };
  
  const handleBreakToggle = () => {
    if (!isOnBreak) {
      setIsOnBreak(true);
      setBreakStartTime(new Date());
    } else {
      setIsOnBreak(false);
      setBreakStartTime(null);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
  };

  const formatTime12Hour = (date: Date) => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
  };

  const getDigitalTime = () => {
    const hours = String(currentTime.getHours()).padStart(2, '0');
    const minutes = String(currentTime.getMinutes()).padStart(2, '0');
    const seconds = String(currentTime.getSeconds()).padStart(2, '0');
    return { hours, minutes, seconds };
  };
  
  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };
  
  const getProductivityMessage = () => {
    if (productivityScore >= 90) return 'Excellent Performance!';
    if (productivityScore >= 80) return 'Great Work Today!';
    if (productivityScore >= 70) return 'Doing Well!';
    return 'Keep Going!';
  };

  const digitalTime = getDigitalTime();
  const currentDate = currentTime.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  const notifications = [
    { id: 1, title: 'New invoice received', description: 'Invoice #INV-2024-0156 from Acme Corp for $5,250.00', time: '5 mins ago', type: 'invoice', unread: true, priority: 'high' },
    { id: 2, title: 'Task deadline approaching', description: 'Complete Q4 Financial Report - Due in 2 hours', time: '1 hour ago', type: 'task', unread: true, priority: 'high' },
    { id: 3, title: 'New lead assigned', description: 'Tech Solutions Inc. - Enterprise plan inquiry', time: '2 hours ago', type: 'lead', unread: true, priority: 'medium' },
    { id: 4, title: 'Payment successful', description: 'Subscription renewed for Premium Plan', time: '3 hours ago', type: 'success', unread: false, priority: 'low' },
    { id: 5, title: 'Meeting reminder', description: 'Team standup meeting at 3:00 PM today', time: '4 hours ago', type: 'calendar', unread: false, priority: 'medium' },
    { id: 6, title: 'Document shared', description: 'Sarah shared "Marketing Strategy 2025" with you', time: '5 hours ago', type: 'info', unread: false, priority: 'low' },
    { id: 7, title: 'Security alert', description: 'New login detected from Chrome on Windows', time: '6 hours ago', type: 'alert', unread: false, priority: 'medium' },
    { id: 8, title: 'Project milestone reached', description: 'E-Commerce Platform - 75% completion', time: '1 day ago', type: 'success', unread: false, priority: 'low' }
  ];

  const messages = [
    { id: 1, from: 'John Doe', message: 'Project update required', fullMessage: 'Hi, we need to discuss the latest project updates. Can you please prepare a summary of the progress made this week?', time: '10 mins ago', unread: true, avatar: 'JD', status: 'online' },
    { id: 2, from: 'Sarah Smith', message: 'Meeting at 3 PM', fullMessage: 'Don\'t forget about our team meeting scheduled for 3 PM today. We\'ll be discussing the Q4 strategy.', time: '30 mins ago', unread: true, avatar: 'SS', status: 'online' },
    { id: 3, from: 'Mike Johnson', message: 'Review completed', fullMessage: 'I\'ve completed the code review for your latest pull request. Overall looks good with minor suggestions.', time: '1 hour ago', unread: true, avatar: 'MJ', status: 'away' },
    { id: 4, from: 'Lisa Chen', message: 'Budget approval needed', fullMessage: 'The new marketing budget proposal is ready for your review and approval. Please check when you get a chance.', time: '2 hours ago', unread: false, avatar: 'LC', status: 'offline' },
    { id: 5, from: 'David Brown', message: 'Client feedback received', fullMessage: 'Great news! The client loved the presentation and wants to move forward with the proposal.', time: '3 hours ago', unread: false, avatar: 'DB', status: 'offline' },
    { id: 6, from: 'Emily Wilson', message: 'Design files updated', fullMessage: 'I\'ve updated the Figma files with the latest design revisions based on your feedback.', time: '5 hours ago', unread: false, avatar: 'EW', status: 'offline' },
    { id: 7, from: 'Alex Turner', message: 'Server maintenance notice', fullMessage: 'Scheduled maintenance this Saturday from 2 AM to 6 AM. Please plan accordingly.', time: '1 day ago', unread: false, avatar: 'AT', status: 'offline' }
  ];

  const unreadNotifications = notifications.filter(n => n.unread).length;
  const unreadMessages = messages.filter(m => m.unread).length;

  // Search functionality
  const searchablePages = [
    { 
      name: 'Dashboard', 
      path: '/', 
      description: 'Overview, analytics, and key metrics',
      keywords: ['home', 'main', 'overview', 'stats', 'analytics', 'metrics', 'reports', 'dashboard'],
      icon: <Activity size={20} />,
      color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    { 
      name: 'My Profile', 
      path: '/profile', 
      description: 'View and manage your profile',
      keywords: ['user', 'account', 'settings', 'personal', 'info', 'details'],
      icon: <User size={20} />,
      color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    },
    { 
      name: 'Edit Profile', 
      path: '/edit-profile', 
      description: 'Update your personal information',
      keywords: ['edit', 'update', 'change', 'modify', 'settings', 'account'],
      icon: <Settings size={20} />,
      color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    },
    { 
      name: 'Projects', 
      path: '/projects', 
      description: 'Manage projects and tasks',
      keywords: ['project', 'task', 'work', 'todo', 'assignment', 'delivery'],
      icon: <Target size={20} />,
      color: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
    },
    { 
      name: 'Sales', 
      path: '/sales', 
      description: 'Sales pipeline and deals',
      keywords: ['revenue', 'deals', 'pipeline', 'leads', 'opportunities', 'crm'],
      icon: <TrendingUp size={20} />,
      color: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)'
    },
    { 
      name: 'Customers', 
      path: '/customers', 
      description: 'Customer database and management',
      keywords: ['clients', 'contacts', 'people', 'crm', 'relationships'],
      icon: <Users size={20} />,
      color: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
    },
    { 
      name: 'Products & Services', 
      path: '/products-services', 
      description: 'Product catalog and services',
      keywords: ['product', 'service', 'catalog', 'items', 'inventory', 'stock'],
      icon: <Award size={20} />,
      color: 'linear-gradient(135deg, #ff9a56 0%, #ff6a88 100%)'
    },
    { 
      name: 'Vendors', 
      path: '/vendors', 
      description: 'Supplier and vendor management',
      keywords: ['supplier', 'vendor', 'purchase', 'procurement'],
      icon: <Building2 size={20} />,
      color: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)'
    },
    { 
      name: 'Accounts', 
      path: '/accounts', 
      description: 'Financial accounts and records',
      keywords: ['finance', 'money', 'accounting', 'ledger', 'transactions'],
      icon: <Mail size={20} />,
      color: 'linear-gradient(135deg, #ff6e7f 0%, #bfe9ff 100%)'
    },
    { 
      name: 'Contracts', 
      path: '/contracts', 
      description: 'Legal contracts and agreements',
      keywords: ['agreement', 'legal', 'document', 'terms', 'conditions'],
      icon: <Copy size={20} />,
      color: 'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)'
    },
    { 
      name: 'HRM', 
      path: '/hrm', 
      description: 'Human resource management',
      keywords: ['hr', 'human', 'employee', 'staff', 'people', 'team', 'payroll'],
      icon: <Users size={20} />,
      color: 'linear-gradient(135deg, #f77062 0%, #fe5196 100%)'
    },
    { 
      name: 'Recruitment', 
      path: '/recruitment', 
      description: 'Hiring and recruitment process',
      keywords: ['hiring', 'jobs', 'careers', 'candidates', 'applicants', 'interviews'],
      icon: <User size={20} />,
      color: 'linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)'
    },
    { 
      name: 'Admin Panel', 
      path: '/admin', 
      description: 'System administration and settings',
      keywords: ['admin', 'settings', 'configuration', 'system', 'manage'],
      icon: <Settings size={20} />,
      color: 'linear-gradient(135deg, #fdcbf1 0%, #e6dee9 100%)'
    },
    { 
      name: 'Messages', 
      path: '/messages', 
      description: 'Team communication and chat',
      keywords: ['chat', 'message', 'communication', 'talk', 'conversation'],
      icon: <MessageSquare size={20} />,
      color: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)'
    },
    { 
      name: 'Notifications', 
      path: '/notifications', 
      description: 'System alerts and updates',
      keywords: ['alert', 'notification', 'update', 'reminder', 'notice'],
      icon: <Bell size={20} />,
      color: 'linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)'
    },
    { 
      name: 'Calendar', 
      path: '/calendar', 
      description: 'Schedule and appointments',
      keywords: ['schedule', 'calendar', 'events', 'appointments', 'meetings'],
      icon: <Calendar size={20} />,
      color: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)'
    },
    { 
      name: 'Time Tracking', 
      path: '/time-tracking', 
      description: 'Work hours and attendance',
      keywords: ['time', 'clock', 'hours', 'attendance', 'checkin', 'checkout'],
      icon: <Clock size={20} />,
      color: 'linear-gradient(135deg, #ff9a56 0%, #ff6a88 100%)'
    }
  ];

  const getSearchResults = useCallback(() => {
    if (!searchQuery.trim()) return [];
    
    const query = searchQuery.toLowerCase().trim();
    return searchablePages.filter(page => 
      page.name.toLowerCase().includes(query) ||
      page.description.toLowerCase().includes(query) ||
      page.keywords.some(keyword => keyword.includes(query))
    ).slice(0, 8); // Limit to 8 results
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  const handleSearchNavigation = useCallback((result: SearchablePage) => {
    console.log('Navigating to:', result.path);
    
    // Close all dropdowns and modals first
    setShowMessages(false);
    setShowNotifications(false);
    setShowProfile(false);
    setShowClockModal(false);
    setShowSearchResults(false);
    setSearchQuery('');
    
    // Handle special cases
    if (result.path === '/profile') {
      setShowProfilePage(true);
    } else if (result.path === '/edit-profile') {
      setShowEditProfile(true);
    } else if (result.path === '/messages') {
      setShowFullMessages(true);
    } else if (result.path === '/notifications') {
      setShowFullNotifications(true);
    } else if (result.path === '/time-tracking') {
      setShowClockModal(true);
    } else {
      // Navigate to the page using React Router
      navigate(result.path);
    }
  }, [navigate]);

  // Click outside to close search results
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearchResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard navigation for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showSearchResults) {
        setShowSearchResults(false);
        setSearchQuery('');
      } else if (e.key === 'Enter' && showSearchResults && searchQuery) {
        const results = getSearchResults();
        if (results.length > 0) {
          handleSearchNavigation(results[0]);
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [showSearchResults, searchQuery, getSearchResults, handleSearchNavigation]);

  return (
    <header className="header">
      <div className="header-left">
        <button className="menu-toggle" onClick={onMenuClick}>
          <Menu size={24} />
        </button>
        <div className="search-container" ref={searchRef}>
          <div className={`search-bar ${searchFocused ? 'search-focused' : ''}`}>
            <Search size={20} className="search-icon" />
            <input 
              type="text" 
              placeholder={t('search')} 
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSearchResults(e.target.value.length > 0);
              }}
              onFocus={() => {
                setSearchFocused(true);
                if (searchQuery.length > 0) {
                  setShowSearchResults(true);
                }
              }}
              onBlur={() => {
                setTimeout(() => {
                  setSearchFocused(false);
                  setShowSearchResults(false);
                }, 200);
              }}
            />
            {searchQuery && (
              <button 
                className="search-clear"
                onClick={() => {
                  setSearchQuery('');
                  setShowSearchResults(false);
                }}
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Search Results Dropdown */}
          {showSearchResults && (
            <div className="search-results-dropdown">
              <div className="search-results-header">
                <span className="search-results-title">Search Results</span>
                <span className="search-results-count">{getSearchResults().length} found</span>
              </div>
              
              <div className="search-results-content">
                {getSearchResults().length > 0 ? (
                  getSearchResults().map((result, index) => (
                    <button
                      key={index}
                      className="search-result-item"
                      onClick={() => handleSearchNavigation(result)}
                    >
                      <div className="search-result-icon" style={{ background: result.color }}>
                        {result.icon}
                      </div>
                      <div className="search-result-content">
                        <div className="search-result-name">{result.name}</div>
                        <div className="search-result-description">{result.description}</div>
                      </div>
                      <ChevronDown size={16} className="search-result-arrow" style={{ transform: 'rotate(-90deg)' }} />
                    </button>
                  ))
                ) : (
                  <div className="search-no-results">
                    <AlertCircle size={32} />
                    <p>No results found for "{searchQuery}"</p>
                    <span>Try searching for pages, features, or settings</span>
                  </div>
                )}
              </div>

              {searchQuery && getSearchResults().length > 0 && (
                <div className="search-results-footer">
                  <span>Press Enter to navigate to first result</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="header-right">
        <button 
          className="icon-btn icon-btn-modern" 
          title="Share"
          onClick={() => setShowShareModal(true)}
        >
          <Share2 size={20} />
        </button>
        
        {/* Clock/Timer Dropdown */}
        <div className="dropdown" ref={clockRef}>
          <button 
            className="icon-btn clock-btn" 
            title="Check In/Out"
            onClick={() => {
              setShowClockModal(!showClockModal);
              setShowMessages(false);
              setShowNotifications(false);
              setShowProfile(false);
            }}
            style={{
              '--hour-rotation': `${(currentTime.getHours() % 12) * 30 + currentTime.getMinutes() * 0.5}deg`,
              '--minute-rotation': `${currentTime.getMinutes() * 6 + currentTime.getSeconds() * 0.1}deg`,
              '--second-rotation': `${currentTime.getSeconds() * 6}deg`
            } as React.CSSProperties}
          >
            <div className="analog-watch-face">
              {/* Hour Markers */}
              {[...Array(12)].map((_, i) => (
                <div key={i} className="watch-marker" />
              ))}
              
              {/* Chronograph Sub-dials (decorative) */}
              <div className="watch-subdial" />
              <div className="watch-subdial" />
              <div className="watch-subdial" />
              
              {/* Watch Hands */}
              <div 
                className="watch-hand hour" 
                style={{ 
                  transform: `rotate(${(currentTime.getHours() % 12) * 30 + currentTime.getMinutes() * 0.5}deg)` 
                }}
              />
              <div 
                className="watch-hand minute" 
                style={{ 
                  transform: `rotate(${currentTime.getMinutes() * 6 + currentTime.getSeconds() * 0.1}deg)` 
                }}
              />
              <div 
                className="watch-hand second" 
                style={{ 
                  transform: `rotate(${currentTime.getSeconds() * 6}deg)` 
                }}
              />
            </div>
            <span className="clock-time">{formatTime(currentTime)}</span>
          </button>
          {showClockModal && (
            <div className="dropdown-menu clock-dropdown futuristic-clock">
              <div className="clock-header-futuristic">
                <div className="status-indicator">
                  <div className={`pulse-dot ${isCheckedIn ? 'active' : ''} ${isOnBreak ? 'break' : ''}`}></div>
                  <span>{isOnBreak ? 'On Break' : isCheckedIn ? 'Active Work Session' : 'Not Checked In'}</span>
                </div>
                <div className="greeting-text">{getGreeting()}</div>
              </div>
              
              {/* Digital Clock Display */}
              <div className="digital-clock-display">
                <div className="time-segments">
                  <div className="time-segment">
                    <div className="segment-value">{digitalTime.hours}</div>
                    <div className="segment-label">HOURS</div>
                  </div>
                  <div className="time-separator">:</div>
                  <div className="time-segment">
                    <div className="segment-value">{digitalTime.minutes}</div>
                    <div className="segment-label">MINUTES</div>
                  </div>
                  <div className="time-separator">:</div>
                  <div className="time-segment">
                    <div className="segment-value">{digitalTime.seconds}</div>
                    <div className="segment-label">SECONDS</div>
                  </div>
                </div>
                <div className="current-date">{currentDate}</div>
              </div>

              {/* Stats Dashboard */}
              <div className="attendance-stats">
                <div className="stat-item">
                  <div className="stat-icon streak">
                    <Award size={20} />
                  </div>
                  <div className="stat-content">
                    <div className="stat-value">{workStreak}</div>
                    <div className="stat-label">Day Streak</div>
                  </div>
                </div>
                <div className="stat-item">
                  <div className="stat-icon productivity">
                    <TrendingUp size={20} />
                  </div>
                  <div className="stat-content">
                    <div className="stat-value">{productivityScore}%</div>
                    <div className="stat-label">Productivity</div>
                  </div>
                </div>
                <div className="stat-item">
                  <div className="stat-icon hours">
                    <Timer size={20} />
                  </div>
                  <div className="stat-content">
                    <div className="stat-value">{totalWorkHours.toFixed(1)}h</div>
                    <div className="stat-label">Work Time</div>
                  </div>
                </div>
                <div className="stat-item">
                  <div className="stat-icon focus">
                    <Brain size={20} />
                  </div>
                  <div className="stat-content">
                    <div className="stat-value">{focusScore}%</div>
                    <div className="stat-label">Focus Score</div>
                  </div>
                </div>
                <div className="stat-item">
                  <div className="stat-icon tasks">
                    <Target size={20} />
                  </div>
                  <div className="stat-content">
                    <div className="stat-value">{tasksCompleted}</div>
                    <div className="stat-label">Tasks Done</div>
                  </div>
                </div>
                <div className="stat-item">
                  <div className="stat-icon break">
                    <Coffee size={20} />
                  </div>
                  <div className="stat-content">
                    <div className="stat-value">{breakTime.toFixed(1)}m</div>
                    <div className="stat-label">Break Time</div>
                  </div>
                </div>
              </div>

              {/* Date Selector */}
              <div className="futuristic-date-selector">
                <Calendar size={18} />
                <input 
                  type="date" 
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="futuristic-date-input"
                />
              </div>

              {/* Check In/Out Actions */}
              <div className="futuristic-actions">
                {!checkInTime ? (
                  <button 
                    className="check-btn check-in-futuristic"
                    onClick={handleCheckIn}
                  >
                    <div className="btn-icon">
                      <MapPin size={20} />
                    </div>
                    <div className="btn-content">
                      <div className="btn-title">Check In</div>
                      <div className="btn-subtitle">Start your workday</div>
                    </div>
                    <div className="btn-arrow">→</div>
                  </button>
                ) : checkInTime && !checkOutTime ? (
                  <div className="action-buttons-group">
                    <button 
                      className={`check-btn ${isOnBreak ? 'resume-break' : 'take-break'}`}
                      onClick={handleBreakToggle}
                    >
                      <div className="btn-icon">
                        <Coffee size={20} />
                      </div>
                      <div className="btn-content">
                        <div className="btn-title">{isOnBreak ? 'Resume Work' : 'Take Break'}</div>
                        <div className="btn-subtitle">{isOnBreak ? 'Get back to work' : 'Rest & recharge'}</div>
                      </div>
                      <div className="btn-arrow">→</div>
                    </button>
                    <button 
                      className="check-btn check-out-futuristic"
                      onClick={handleCheckOut}
                    >
                      <div className="btn-icon">
                        <Zap size={20} />
                      </div>
                      <div className="btn-content">
                        <div className="btn-title">Check Out</div>
                        <div className="btn-subtitle">End your workday</div>
                      </div>
                      <div className="btn-arrow">→</div>
                    </button>
                  </div>
                ) : (
                  <div className="completion-card">
                    <div className="completion-icon">
                      <Award size={32} />
                    </div>
                    <div className="completion-text">
                      <h4>{getProductivityMessage()}</h4>
                      <p>Worked {totalWorkHours.toFixed(1)}h • {tasksCompleted} tasks completed</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Timeline Display */}
              {(checkInTime || checkOutTime) && (
                <div className="time-timeline">
                  {checkInTime && (
                    <div className="timeline-event check-in-event">
                      <div className="event-marker"></div>
                      <div className="event-details">
                        <div className="event-time">{formatTime12Hour(checkInTime)}</div>
                        <div className="event-label">Checked In</div>
                      </div>
                    </div>
                  )}
                  {checkOutTime && (
                    <div className="timeline-event check-out-event">
                      <div className="event-marker"></div>
                      <div className="event-details">
                        <div className="event-time">{formatTime12Hour(checkOutTime)}</div>
                        <div className="event-label">Checked Out</div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Work Progress Bar */}
              {isCheckedIn && (
                <div className="work-progress">
                  <div className="progress-header">
                    <span>Daily Progress</span>
                    <span className="progress-time">{totalWorkHours}h / 8h</span>
                  </div>
                  <div className="progress-bar-container">
                    <div 
                      className="progress-bar-fill" 
                      style={{ width: `${Math.min((totalWorkHours / 8) * 100, 100)}%` }}
                    ></div>
                  </div>
                  <div className="progress-milestones">
                    <div className={`milestone ${totalWorkHours >= 2 ? 'achieved' : ''}`}>
                      <Activity size={14} />
                      <span>2h</span>
                    </div>
                    <div className={`milestone ${totalWorkHours >= 4 ? 'achieved' : ''}`}>
                      <Activity size={14} />
                      <span>4h</span>
                    </div>
                    <div className={`milestone ${totalWorkHours >= 6 ? 'achieved' : ''}`}>
                      <Activity size={14} />
                      <span>6h</span>
                    </div>
                    <div className={`milestone ${totalWorkHours >= 8 ? 'achieved' : ''}`}>
                      <Award size={14} />
                      <span>8h</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        
        {/* Messages Dropdown */}
        <div className="dropdown" ref={messagesRef}>
          <button 
            className="icon-btn icon-btn-modern" 
            title="Messages"
            onClick={() => {
              setShowMessages(!showMessages);
              setShowNotifications(false);
              setShowProfile(false);
              setShowClockModal(false);
            }}
          >
            <MessageSquare size={20} />
            {unreadMessages > 0 && (
              <span className="notification-badge pulse-badge">{unreadMessages}</span>
            )}
          </button>
          {showMessages && (
            <div className="dropdown-menu messages-dropdown-modern">
              <div className="dropdown-header-modern">
                <div className="header-title-section">
                  <MessageSquare size={20} />
                  <h4>Messages</h4>
                  <span className="count-badge">{unreadMessages}</span>
                </div>
                <button className="view-all-btn-modern" onClick={() => {
                  setShowFullMessages(true);
                  setShowMessages(false);
                }}>View All</button>
              </div>
              <div className="dropdown-content-modern">
                {messages.slice(0, 4).map(msg => (
                  <div key={msg.id} className={`message-item-modern ${msg.unread ? 'unread' : ''}`}>
                    <div className="message-avatar-modern">
                      <span>{msg.avatar}</span>
                      <div className={`status-dot status-${msg.status}`}></div>
                    </div>
                    <div className="message-content-modern">
                      <div className="message-header-row">
                        <div className="message-from-modern">{msg.from}</div>
                        <div className="message-time-modern">{msg.time}</div>
                      </div>
                      <div className="message-text-modern">{msg.message}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="dropdown-footer-modern">
                <button className="compose-btn" onClick={() => {
                  setShowFullMessages(true);
                  setShowMessages(false);
                }}>
                  <Send size={16} />
                  Compose Message
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Notifications Dropdown */}
        <div className="dropdown" ref={notificationRef}>
          <button 
            className="icon-btn icon-btn-modern notification-btn" 
            title="Notifications"
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowMessages(false);
              setShowProfile(false);
              setShowClockModal(false);
            }}
          >
            <Bell size={20} />
            {unreadNotifications > 0 && (
              <span className="notification-badge pulse-badge">{unreadNotifications}</span>
            )}
          </button>
          {showNotifications && (
            <div className="dropdown-menu notifications-dropdown-modern">
              <div className="dropdown-header-modern">
                <div className="header-title-section">
                  <Bell size={20} />
                  <h4>Notifications</h4>
                  <span className="count-badge">{unreadNotifications}</span>
                </div>
                <button className="view-all-btn-modern" onClick={() => {
                  setShowFullNotifications(true);
                  setShowNotifications(false);
                }}>View All</button>
              </div>
              <div className="dropdown-content-modern">
                {notifications.slice(0, 4).map(notif => (
                  <div key={notif.id} className={`notification-item-modern ${notif.unread ? 'unread' : ''} priority-${notif.priority}`}>
                    <div className={`notification-icon-modern type-${notif.type}`}>
                      {notif.type === 'success' && <CheckCircle size={20} />}
                      {notif.type === 'alert' && <AlertCircle size={20} />}
                      {notif.type === 'task' && <Target size={20} />}
                      {notif.type === 'invoice' && <Mail size={20} />}
                      {notif.type === 'lead' && <Star size={20} />}
                      {notif.type === 'calendar' && <Calendar size={20} />}
                      {notif.type === 'info' && <Info size={20} />}
                    </div>
                    <div className="notification-content-modern">
                      <div className="notification-header-row">
                        <div className="notification-title-modern">{notif.title}</div>
                        <div className="notification-time-modern">{notif.time}</div>
                      </div>
                      <div className="notification-description">{notif.description}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="dropdown-footer-modern">
                <button className="mark-all-read-btn" onClick={() => setShowFullNotifications(true)}>Mark All as Read</button>
              </div>
            </div>
          )}
        </div>

        <button className="btn-primary" onClick={() => setShowTaskModal(true)}>
          <Plus size={20} />
          <span className="btn-text">New</span>
        </button>

        {/* Profile Dropdown */}
        <div className="dropdown" ref={profileRef}>
          <button 
            className="profile-btn-modern"
            onClick={() => {
              setShowProfile(!showProfile);
              setShowMessages(false);
              setShowNotifications(false);
              setShowClockModal(false);
            }}
          >
            <div className="profile-avatar-modern">
              <User size={18} />
            </div>
            <ChevronDown size={16} className={`chevron-icon ${showProfile ? 'rotate-180' : ''}`} />
          </button>
          {showProfile && (
            <div className="dropdown-menu profile-dropdown-modern">
              <div className="profile-dropdown-header">
                <div className="profile-avatar-display">
                  <User size={28} />
                  <div className="profile-status-online"></div>
                </div>
                <div className="profile-user-details">
                  <h4>Admin User</h4>
                  <p>admin@zollid.com</p>
                </div>
              </div>
              
              <div className="profile-dropdown-content">
                <button 
                  className="profile-menu-item"
                  onClick={() => {
                    setShowProfilePage(true);
                    setShowProfile(false);
                  }}
                >
                  <div className="menu-item-icon">
                    <User size={18} />
                  </div>
                  <span>{t('profile')}</span>
                </button>
                
                <div className="profile-menu-item-wrapper" ref={languageRef}>
                  <button 
                    className="profile-menu-item"
                    onClick={() => {
                      setShowLanguageMenu(!showLanguageMenu);
                      if (!showLanguageMenu) setLanguageSearch('');
                    }}
                  >
                    <div className="menu-item-icon">
                      <Globe2 size={18} />
                    </div>
                    <span>{t('languages')}</span>
                    <ChevronDown size={14} className={`menu-arrow ${showLanguageMenu ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {showLanguageMenu && (
                    <div className="language-submenu-modern">
                      <div className="language-search-container">
                        <Search size={16} className="language-search-icon" />
                        <input
                          type="text"
                          className="language-search-input"
                          placeholder={t('search_languages')}
                          value={languageSearch}
                          onChange={(e) => setLanguageSearch(e.target.value)}
                          autoFocus
                        />
                        {languageSearch && (
                          <button 
                            className="language-search-clear"
                            onClick={() => setLanguageSearch('')}
                          >
                            <X size={14} />
                          </button>
                        )}
                      </div>
                      
                      <div className="language-list">
                        {[
                          { code: 'default', name: 'System Default', flag: '⚙️' },
                          { code: 'en', name: 'English', flag: '🇬🇧' },
                          { code: 'es', name: 'Spanish', flag: '🇪🇸' },
                          { code: 'fr', name: 'French', flag: '🇫🇷' },
                          { code: 'de', name: 'German', flag: '🇩🇪' },
                          { code: 'it', name: 'Italian', flag: '🇮🇹' },
                          { code: 'pt', name: 'Portuguese', flag: '🇵🇹' },
                          { code: 'pt_br', name: 'Portuguese_br', flag: '🇧🇷' },
                          { code: 'ru', name: 'Russian', flag: '🇷🇺' },
                          { code: 'zh', name: 'Chinese', flag: '🇨🇳' },
                          { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
                          { code: 'cs', name: 'Czech', flag: '🇨🇿' },
                          { code: 'vi', name: 'Vietnamese', flag: '🇻🇳' },
                          { code: 'nl', name: 'Dutch', flag: '🇳🇱' },
                          { code: 'fa', name: 'Persian', flag: '🇮🇷' },
                          { code: 'id', name: 'Indonesian', flag: '🇮🇩' },
                          { code: 'no', name: 'Norwegian', flag: '🇳🇴' },
                          { code: 'tr', name: 'Turkish', flag: '🇹🇷' },
                          { code: 'ca', name: 'Catalan', flag: '🏴' },
                          { code: 'bg', name: 'Bulgarian', flag: '🇧🇬' },
                          { code: 'pl', name: 'Polish', flag: '🇵🇱' },
                          { code: 'sk', name: 'Slovak', flag: '🇸🇰' },
                          { code: 'el', name: 'Greek', flag: '🇬🇷' },
                          { code: 'uk', name: 'Ukrainian', flag: '🇺🇦' },
                          { code: 'fi', name: 'Finnish', flag: '🇫🇮' },
                          { code: 'ro', name: 'Romanian', flag: '🇷🇴' },
                          { code: 'sv', name: 'Swedish', flag: '🇸🇪' },
                          { code: 'ar', name: 'Arabic', flag: '🇸🇦' },
                          { code: 'hi', name: 'Hindi', flag: '🇮🇳' },
                          { code: 'ko', name: 'Korean', flag: '🇰🇷' },
                          { code: 'th', name: 'Thai', flag: '🇹🇭' },
                          { code: 'he', name: 'Hebrew', flag: '🇮🇱' },
                          { code: 'da', name: 'Danish', flag: '🇩🇰' },
                          { code: 'hu', name: 'Hungarian', flag: '🇭🇺' }
                        ]
                          .filter(lang => 
                            lang.name.toLowerCase().includes(languageSearch.toLowerCase()) ||
                            lang.code.toLowerCase().includes(languageSearch.toLowerCase())
                          )
                          .map((lang, index) => (
                            <button
                              key={lang.code}
                              className={`language-option-modern ${selectedLanguage === lang.name ? 'active' : ''}`}
                              onClick={() => {
                                setSelectedLanguage(lang.name);
                                setLanguage(lang.name);
                                localStorage.setItem('selectedLanguage', lang.name);
                                setShowLanguageMenu(false);
                                setLanguageSearch('');
                                // Trigger re-render to apply language change
                                window.location.reload();
                              }}
                              style={{ animationDelay: `${index * 0.02}s` }}
                            >
                              <span className="language-flag-modern">{lang.flag}</span>
                              <span className="language-name-modern">{lang.name}</span>
                              {selectedLanguage === lang.name && (
                                <CheckCircle size={16} className="language-check-modern" />
                              )}
                            </button>
                          ))}
                        
                        {[
                          { code: 'default', name: 'System Default', flag: '⚙️' },
                          { code: 'en', name: 'English', flag: '🇬🇧' },
                          { code: 'es', name: 'Spanish', flag: '🇪🇸' },
                          { code: 'fr', name: 'French', flag: '🇫🇷' },
                          { code: 'de', name: 'German', flag: '🇩🇪' },
                          { code: 'it', name: 'Italian', flag: '🇮🇹' },
                          { code: 'pt', name: 'Portuguese', flag: '🇵🇹' },
                          { code: 'pt_br', name: 'Portuguese_br', flag: '🇧🇷' },
                          { code: 'ru', name: 'Russian', flag: '🇷🇺' },
                          { code: 'zh', name: 'Chinese', flag: '🇨🇳' },
                          { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
                          { code: 'cs', name: 'Czech', flag: '🇨🇿' },
                          { code: 'vi', name: 'Vietnamese', flag: '🇻🇳' },
                          { code: 'nl', name: 'Dutch', flag: '🇳🇱' },
                          { code: 'fa', name: 'Persian', flag: '🇮🇷' },
                          { code: 'id', name: 'Indonesian', flag: '🇮🇩' },
                          { code: 'no', name: 'Norwegian', flag: '🇳🇴' },
                          { code: 'tr', name: 'Turkish', flag: '🇹🇷' },
                          { code: 'ca', name: 'Catalan', flag: '🏴' },
                          { code: 'bg', name: 'Bulgarian', flag: '🇧🇬' },
                          { code: 'pl', name: 'Polish', flag: '🇵🇱' },
                          { code: 'sk', name: 'Slovak', flag: '🇸🇰' },
                          { code: 'el', name: 'Greek', flag: '🇬🇷' },
                          { code: 'uk', name: 'Ukrainian', flag: '🇺🇦' },
                          { code: 'fi', name: 'Finnish', flag: '🇫🇮' },
                          { code: 'ro', name: 'Romanian', flag: '🇷🇴' },
                          { code: 'sv', name: 'Swedish', flag: '🇸🇪' },
                          { code: 'ar', name: 'Arabic', flag: '🇸🇦' },
                          { code: 'hi', name: 'Hindi', flag: '🇮🇳' },
                          { code: 'ko', name: 'Korean', flag: '🇰🇷' },
                          { code: 'th', name: 'Thai', flag: '🇹🇭' },
                          { code: 'he', name: 'Hebrew', flag: '🇮🇱' },
                          { code: 'da', name: 'Danish', flag: '🇩🇰' },
                          { code: 'hu', name: 'Hungarian', flag: '🇭🇺' }
                        ].filter(lang => 
                          lang.name.toLowerCase().includes(languageSearch.toLowerCase()) ||
                          lang.code.toLowerCase().includes(languageSearch.toLowerCase())
                        ).length === 0 && (
                          <div className="language-no-results">
                            <Search size={24} />
                            <p>{t('no_results')}</p>
                            <span>{t('try_different')}</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="language-footer">
                        <span className="language-count">
                          {[
                            { code: 'default', name: 'System Default', flag: '⚙️' },
                            { code: 'en', name: 'English', flag: '🇬🇧' },
                            { code: 'es', name: 'Spanish', flag: '🇪🇸' },
                            { code: 'fr', name: 'French', flag: '🇫🇷' },
                            { code: 'de', name: 'German', flag: '🇩🇪' },
                            { code: 'it', name: 'Italian', flag: '🇮🇹' },
                            { code: 'pt', name: 'Portuguese', flag: '🇵🇹' },
                            { code: 'pt_br', name: 'Portuguese_br', flag: '🇧🇷' },
                            { code: 'ru', name: 'Russian', flag: '🇷🇺' },
                            { code: 'zh', name: 'Chinese', flag: '🇨🇳' },
                            { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
                            { code: 'cs', name: 'Czech', flag: '🇨🇿' },
                            { code: 'vi', name: 'Vietnamese', flag: '🇻🇳' },
                            { code: 'nl', name: 'Dutch', flag: '🇳🇱' },
                            { code: 'fa', name: 'Persian', flag: '🇮🇷' },
                            { code: 'id', name: 'Indonesian', flag: '🇮🇩' },
                            { code: 'no', name: 'Norwegian', flag: '🇳🇴' },
                            { code: 'tr', name: 'Turkish', flag: '🇹🇷' },
                            { code: 'ca', name: 'Catalan', flag: '🏴' },
                            { code: 'bg', name: 'Bulgarian', flag: '🇧🇬' },
                            { code: 'pl', name: 'Polish', flag: '🇵🇱' },
                            { code: 'sk', name: 'Slovak', flag: '🇸🇰' },
                            { code: 'el', name: 'Greek', flag: '🇬🇷' },
                            { code: 'uk', name: 'Ukrainian', flag: '🇺🇦' },
                            { code: 'fi', name: 'Finnish', flag: '🇫🇮' },
                            { code: 'ro', name: 'Romanian', flag: '🇷🇴' },
                            { code: 'sv', name: 'Swedish', flag: '🇸🇪' },
                            { code: 'ar', name: 'Arabic', flag: '🇸🇦' },
                            { code: 'hi', name: 'Hindi', flag: '🇮🇳' },
                            { code: 'ko', name: 'Korean', flag: '🇰🇷' },
                            { code: 'th', name: 'Thai', flag: '🇹🇭' },
                            { code: 'he', name: 'Hebrew', flag: '🇮🇱' },
                            { code: 'da', name: 'Danish', flag: '🇩🇰' },
                            { code: 'hu', name: 'Hungarian', flag: '🇭🇺' }
                          ].filter(lang => 
                            lang.name.toLowerCase().includes(languageSearch.toLowerCase()) ||
                            lang.code.toLowerCase().includes(languageSearch.toLowerCase())
                          ).length} {t('languages_available')}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
                
                <button 
                  className="profile-menu-item"
                  onClick={() => {
                    setShowEditProfile(true);
                    setShowProfile(false);
                  }}
                >
                  <div className="menu-item-icon edit-icon">
                    <Settings size={18} />
                  </div>
                  <span>{t('settings')}</span>
                </button>
                
                <div className="profile-dropdown-divider"></div>
                
                <button className="profile-menu-item logout-item">
                  <div className="menu-item-icon logout-icon">
                    <LogOut size={18} />
                  </div>
                  <span>{t('logout')}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Profile Page Modal */}
      {showProfilePage && (
        <div className="modal-overlay" onClick={() => setShowProfilePage(false)}>
          <div className="modal-container profile-page-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>My Profile</h2>
              <button className="modal-close" onClick={() => setShowProfilePage(false)}>
                <X size={20} />
              </button>
            </div>
            
            <div className="profile-page-content">
              {/* Logged Time Stats */}
              <div className="logged-time-stats">
                <div className="time-stat-card">
                  <div className="time-stat-header">
                    <Clock size={18} />
                    <span className="time-stat-label">Total Logged Time</span>
                  </div>
                  <span className="time-stat-value">156:45</span>
                  <div className="time-stat-progress">
                    <div className="progress-bar-mini" style={{ width: '85%' }}></div>
                  </div>
                  <span className="time-stat-change positive">+12% vs last period</span>
                </div>
                <div className="time-stat-card">
                  <div className="time-stat-header">
                    <Calendar size={18} />
                    <span className="time-stat-label">Last Month Logged Time</span>
                  </div>
                  <span className="time-stat-value">42:30</span>
                  <div className="time-stat-progress">
                    <div className="progress-bar-mini" style={{ width: '70%' }}></div>
                  </div>
                  <span className="time-stat-change positive">+8% vs previous</span>
                </div>
                <div className="time-stat-card highlight">
                  <div className="time-stat-header">
                    <TrendingUp size={18} />
                    <span className="time-stat-label">This Month Logged Time</span>
                  </div>
                  <span className="time-stat-value">38:15</span>
                  <div className="time-stat-progress">
                    <div className="progress-bar-mini" style={{ width: '92%' }}></div>
                  </div>
                  <span className="time-stat-change positive">+15% increase</span>
                </div>
                <div className="time-stat-card">
                  <div className="time-stat-header">
                    <Activity size={18} />
                    <span className="time-stat-label">Last Week Logged Time</span>
                  </div>
                  <span className="time-stat-value">12:20</span>
                  <div className="time-stat-progress">
                    <div className="progress-bar-mini" style={{ width: '65%' }}></div>
                  </div>
                  <span className="time-stat-change">On track</span>
                </div>
                <div className="time-stat-card">
                  <div className="time-stat-header">
                    <Zap size={18} />
                    <span className="time-stat-label">This Week Logged Time</span>
                  </div>
                  <span className="time-stat-value">8:45</span>
                  <div className="time-stat-progress">
                    <div className="progress-bar-mini" style={{ width: '55%' }}></div>
                  </div>
                  <span className="time-stat-change">In progress</span>
                </div>
              </div>

              {/* Profile Main Content Grid */}
              <div className="profile-main-grid">
                {/* Left Column - User Info & Projects */}
                <div className="profile-left-column">
                  {/* User Info Card */}
                  <div className="user-info-card">
                    <div className="user-avatar-section">
                      <div className="user-avatar-large">
                        <User size={48} />
                        <div className="online-indicator"></div>
                      </div>
                      <div className="user-basic-info">
                        <h3>Michael Rodriguez</h3>
                        <span className="user-role-tag">Senior Full Stack Developer</span>
                        <div className="user-contact-info">
                          <div className="contact-item">
                            <Mail size={14} />
                            <span>m.rodriguez@techcorp.com</span>
                          </div>
                          <div className="contact-item">
                            <Phone size={14} />
                            <span>+1 (415) 789-2345</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Performance Metrics */}
                    <div className="performance-metrics">
                      <div className="metric-item">
                        <div className="metric-circle">
                          <svg viewBox="0 0 36 36" className="circular-chart">
                            <path className="circle-bg"
                              d="M18 2.0845
                                a 15.9155 15.9155 0 0 1 0 31.831
                                a 15.9155 15.9155 0 0 1 0 -31.831"
                            />
                            <path className="circle-progress green"
                              strokeDasharray="94, 100"
                              d="M18 2.0845
                                a 15.9155 15.9155 0 0 1 0 31.831
                                a 15.9155 15.9155 0 0 1 0 -31.831"
                            />
                            <text x="18" y="20.35" className="percentage">94%</text>
                          </svg>
                        </div>
                        <div className="metric-info">
                          <span className="metric-label">Productivity</span>
                          <span className="metric-status excellent">Excellent</span>
                        </div>
                      </div>
                      <div className="metric-item">
                        <div className="metric-circle">
                          <svg viewBox="0 0 36 36" className="circular-chart">
                            <path className="circle-bg"
                              d="M18 2.0845
                                a 15.9155 15.9155 0 0 1 0 31.831
                                a 15.9155 15.9155 0 0 1 0 -31.831"
                            />
                            <path className="circle-progress blue"
                              strokeDasharray="87, 100"
                              d="M18 2.0845
                                a 15.9155 15.9155 0 0 1 0 31.831
                                a 15.9155 15.9155 0 0 1 0 -31.831"
                            />
                            <text x="18" y="20.35" className="percentage">87%</text>
                          </svg>
                        </div>
                        <div className="metric-info">
                          <span className="metric-label">Efficiency</span>
                          <span className="metric-status good">Very Good</span>
                        </div>
                      </div>
                      <div className="metric-item">
                        <div className="metric-circle">
                          <svg viewBox="0 0 36 36" className="circular-chart">
                            <path className="circle-bg"
                              d="M18 2.0845
                                a 15.9155 15.9155 0 0 1 0 31.831
                                a 15.9155 15.9155 0 0 1 0 -31.831"
                            />
                            <path className="circle-progress purple"
                              strokeDasharray="91, 100"
                              d="M18 2.0845
                                a 15.9155 15.9155 0 0 1 0 31.831
                                a 15.9155 15.9155 0 0 1 0 -31.831"
                            />
                            <text x="18" y="20.35" className="percentage">91%</text>
                          </svg>
                        </div>
                        <div className="metric-info">
                          <span className="metric-label">Quality Score</span>
                          <span className="metric-status excellent">Outstanding</span>
                        </div>
                      </div>
                    </div>

                    <div className="user-department-section">
                      <h4 className="section-subtitle">Departments & Teams</h4>
                      <div className="department-badges">
                        <span className="department-badge primary">Engineering Team</span>
                        <span className="department-badge">Development</span>
                        <span className="department-badge">Architecture</span>
                      </div>
                    </div>

                    {/* Skills Progress */}
                    <div className="skills-progress-section">
                      <h4 className="section-subtitle">Top Skills</h4>
                      <div className="skill-progress-list">
                        <div className="skill-progress-item">
                          <div className="skill-header">
                            <span>React & TypeScript</span>
                            <span className="skill-percentage">95%</span>
                          </div>
                          <div className="skill-bar">
                            <div className="skill-fill" style={{ width: '95%', background: 'linear-gradient(90deg, #00d97e, #00a860)' }}></div>
                          </div>
                        </div>
                        <div className="skill-progress-item">
                          <div className="skill-header">
                            <span>Node.js & Express</span>
                            <span className="skill-percentage">88%</span>
                          </div>
                          <div className="skill-bar">
                            <div className="skill-fill" style={{ width: '88%', background: 'linear-gradient(90deg, #3b82f6, #2563eb)' }}></div>
                          </div>
                        </div>
                        <div className="skill-progress-item">
                          <div className="skill-header">
                            <span>Database Design</span>
                            <span className="skill-percentage">92%</span>
                          </div>
                          <div className="skill-bar">
                            <div className="skill-fill" style={{ width: '92%', background: 'linear-gradient(90deg, #8b5cf6, #7c3aed)' }}></div>
                          </div>
                        </div>
                        <div className="skill-progress-item">
                          <div className="skill-header">
                            <span>Cloud Architecture</span>
                            <span className="skill-percentage">85%</span>
                          </div>
                          <div className="skill-bar">
                            <div className="skill-fill" style={{ width: '85%', background: 'linear-gradient(90deg, #f59e0b, #d97706)' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Projects Section */}
                  <div className="projects-card">
                    <div className="projects-header">
                      <h3>Active Projects</h3>
                      <div className="projects-controls">
                        <select className="entries-select">
                          <option>25</option>
                          <option>50</option>
                          <option>100</option>
                        </select>
                        <button className="export-btn">
                          <Share2 size={16} />
                          Export
                        </button>
                        <button className="refresh-btn">
                          <RotateCcw size={16} />
                        </button>
                      </div>
                    </div>

                    <div className="projects-search">
                      <Search size={18} />
                      <input type="text" placeholder="Search projects..." />
                    </div>

                    <div className="projects-table">
                      <table>
                        <thead>
                          <tr>
                            <th>
                              Project Name
                              <ChevronDown size={14} />
                            </th>
                            <th>
                              Start Date
                              <ChevronDown size={14} />
                            </th>
                            <th>
                              Deadline
                              <ChevronDown size={14} />
                            </th>
                            <th>Progress</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              <a href="#" className="project-link">E-Commerce Platform</a>
                            </td>
                            <td>11-15-2024</td>
                            <td>03-30-2025</td>
                            <td>
                              <div className="project-progress">
                                <div className="project-progress-bar">
                                  <div className="project-progress-fill" style={{ width: '75%' }}></div>
                                </div>
                                <span className="project-progress-text">75%</span>
                              </div>
                            </td>
                            <td>
                              <span className="status-badge status-in-progress">In Progress</span>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <a href="#" className="project-link">Mobile App Redesign</a>
                            </td>
                            <td>10-05-2024</td>
                            <td>02-15-2025</td>
                            <td>
                              <div className="project-progress">
                                <div className="project-progress-bar">
                                  <div className="project-progress-fill" style={{ width: '60%' }}></div>
                                </div>
                                <span className="project-progress-text">60%</span>
                              </div>
                            </td>
                            <td>
                              <span className="status-badge status-in-progress">In Progress</span>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <a href="#" className="project-link">API Integration</a>
                            </td>
                            <td>09-20-2024</td>
                            <td>12-20-2024</td>
                            <td>
                              <div className="project-progress">
                                <div className="project-progress-bar">
                                  <div className="project-progress-fill completed" style={{ width: '100%' }}></div>
                                </div>
                                <span className="project-progress-text">100%</span>
                              </div>
                            </td>
                            <td>
                              <span className="status-badge status-completed">Completed</span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div className="projects-footer">
                      <span className="showing-text">Showing 1 to 3 of 3 entries</span>
                      <div className="pagination-controls">
                        <button className="page-btn" disabled>Previous</button>
                        <button className="page-btn active">1</button>
                        <button className="page-btn" disabled>Next</button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column - Notifications & Activity */}
                <div className="profile-right-column">
                  {/* Quick Stats */}
                  <div className="quick-stats-grid">
                    <div className="quick-stat-card">
                      <div className="stat-icon-small bg-green">
                        <Target size={18} />
                      </div>
                      <div className="stat-content-small">
                        <span className="stat-value-small">24</span>
                        <span className="stat-label-small">Tasks Done</span>
                      </div>
                    </div>
                    <div className="quick-stat-card">
                      <div className="stat-icon-small bg-blue">
                        <Coffee size={18} />
                      </div>
                      <div className="stat-content-small">
                        <span className="stat-value-small">5</span>
                        <span className="stat-label-small">Meetings</span>
                      </div>
                    </div>
                  </div>

                  {/* Notifications Card */}
                  <div className="notifications-card">
                    <div className="notifications-header">
                      <h3>
                        <Bell size={18} />
                        Notifications
                      </h3>
                      <button className="mark-read-btn">Mark all as read</button>
                    </div>

                    <div className="notifications-list">
                      <div className="notification-item unread">
                        <div className="notification-avatar">
                          <User size={20} />
                        </div>
                        <div className="notification-content">
                          <p className="notification-text">
                            <strong>Emily Chen</strong> assigned you to task <strong>Backend Optimization</strong>
                          </p>
                          <span className="notification-time">1 hour ago</span>
                        </div>
                        <div className="notification-status">
                          <div className="unread-dot"></div>
                        </div>
                      </div>

                      <div className="notification-item unread">
                        <div className="notification-avatar">
                          <User size={20} />
                        </div>
                        <div className="notification-content">
                          <p className="notification-text">
                            <strong>David Park</strong> added you as follower on task <strong>Database Migration</strong>
                          </p>
                          <span className="notification-time">3 hours ago</span>
                        </div>
                        <div className="notification-status">
                          <div className="unread-dot"></div>
                        </div>
                      </div>

                      <div className="notification-item">
                        <div className="notification-avatar">
                          <User size={20} />
                        </div>
                        <div className="notification-content">
                          <p className="notification-text">
                            <strong>Jessica Taylor</strong> added you as project member on <strong>Cloud Infrastructure</strong>
                          </p>
                          <span className="notification-time">5 hours ago</span>
                        </div>
                        <div className="notification-status"></div>
                      </div>

                      <div className="notification-item">
                        <div className="notification-avatar">
                          <User size={20} />
                        </div>
                        <div className="notification-content">
                          <p className="notification-text">
                            <strong>Alex Morrison</strong> commented on <strong>Security Audit Report</strong>
                          </p>
                          <span className="notification-time">1 day ago</span>
                        </div>
                        <div className="notification-status"></div>
                      </div>

                      <div className="notification-item">
                        <div className="notification-avatar">
                          <User size={20} />
                        </div>
                        <div className="notification-content">
                          <p className="notification-text">
                            <strong>Sarah Williams</strong> mentioned you in <strong>Sprint Planning Discussion</strong>
                          </p>
                          <span className="notification-time">2 days ago</span>
                        </div>
                        <div className="notification-status"></div>
                      </div>
                    </div>

                    <button className="load-more-btn">
                      Load More Notifications
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Task Modal */}
      {showTaskModal && (
        <div className="modal-overlay" onClick={() => setShowTaskModal(false)}>
          <div className="modal-container task-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Add new task</h2>
              <button className="modal-close" onClick={() => setShowTaskModal(false)}>
                <X size={20} />
              </button>
            </div>
            
            <form className="modal-form" onSubmit={(e) => {
              e.preventDefault();
              // Handle task creation
              console.log('Task data:', taskFormData);
              setShowTaskModal(false);
            }}>
              {/* Checkboxes at top with Attach Files link */}
              <div className="form-top-row">
                <div className="checkbox-group-top">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={taskFormData.isPublic}
                      onChange={(e) => setTaskFormData({ ...taskFormData, isPublic: e.target.checked })}
                    />
                    <span>Public</span>
                  </label>
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={taskFormData.isBillable}
                      onChange={(e) => setTaskFormData({ ...taskFormData, isBillable: e.target.checked })}
                    />
                    <span>Billable</span>
                  </label>
                </div>
                <button type="button" className="attach-files-link">
                  Attach Files
                </button>
              </div>

              {/* Subject */}
              <div className="form-row">
                <div className="form-group full-width">
                  <label htmlFor="subject">
                    <span className="required">*</span> Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    value={taskFormData.subject}
                    onChange={(e) => setTaskFormData({ ...taskFormData, subject: e.target.value })}
                    required
                  />
                </div>
              </div>

              {/* Hourly Rate */}
              <div className="form-row">
                <div className="form-group full-width">
                  <label htmlFor="hourlyRate">Hourly Rate</label>
                  <input
                    type="number"
                    id="hourlyRate"
                    value={taskFormData.hourlyRate || ''}
                    onChange={(e) => setTaskFormData({ ...taskFormData, hourlyRate: parseFloat(e.target.value) || 0 })}
                    placeholder="0"
                  />
                </div>
              </div>

              {/* Start Date and Due Date */}
              <div className="form-row two-cols">
                <div className="form-group">
                  <label htmlFor="startDate">
                    <span className="required">*</span> Start Date
                  </label>
                  <input
                    type="date"
                    id="startDate"
                    value={taskFormData.startDate}
                    onChange={(e) => setTaskFormData({ ...taskFormData, startDate: e.target.value })}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="dueDate">Due Date</label>
                  <input
                    type="date"
                    id="dueDate"
                    value={taskFormData.dueDate}
                    onChange={(e) => setTaskFormData({ ...taskFormData, dueDate: e.target.value })}
                  />
                </div>
              </div>

              {/* Priority */}
              <div className="form-row">
                <div className="form-group priority-group">
                  <label htmlFor="priority">Priority</label>
                  <select
                    id="priority"
                    value={taskFormData.priority}
                    onChange={(e) => setTaskFormData({ ...taskFormData, priority: e.target.value })}
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Urgent">Urgent</option>
                  </select>
                </div>
              </div>

              {/* Repeat every */}
              <div className="form-row">
                <div className="form-group full-width">
                  <label htmlFor="repeatEvery">Repeat every</label>
                  <select
                    id="repeatEvery"
                    value={taskFormData.repeatEvery}
                    onChange={(e) => setTaskFormData({ ...taskFormData, repeatEvery: e.target.value })}
                  >
                    <option value="">Non selected</option>
                    <option value="Daily">Daily</option>
                    <option value="Weekly">Weekly</option>
                    <option value="Monthly">Monthly</option>
                    <option value="Yearly">Yearly</option>
                  </select>
                </div>
              </div>

              {/* Related To */}
              <div className="form-row">
                <div className="form-group full-width">
                  <label htmlFor="relatedTo">Related To</label>
                  <select
                    id="relatedTo"
                    value={taskFormData.relatedTo}
                    onChange={(e) => setTaskFormData({ ...taskFormData, relatedTo: e.target.value })}
                  >
                    <option value="">Non selected</option>
                    <option value="Project">Project</option>
                    <option value="Customer">Customer</option>
                    <option value="Vendor">Vendor</option>
                  </select>
                </div>
              </div>

              {/* Assignees and Followers */}
              <div className="form-row two-cols">
                <div className="form-group">
                  <label htmlFor="assignees">Assignees</label>
                  <select
                    id="assignees"
                    value={taskFormData.assignees}
                    onChange={(e) => setTaskFormData({ ...taskFormData, assignees: e.target.value })}
                    className="select-with-value"
                  >
                    <option value="Ragini">Ragini</option>
                    <option value="User 1">User 1</option>
                    <option value="User 2">User 2</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label htmlFor="followers">Followers</label>
                  <select
                    id="followers"
                    value={taskFormData.followers}
                    onChange={(e) => setTaskFormData({ ...taskFormData, followers: e.target.value })}
                  >
                    <option value="">Non selected</option>
                    <option value="Follower 1">Follower 1</option>
                    <option value="Follower 2">Follower 2</option>
                  </select>
                </div>
              </div>

              {/* Tags */}
              <div className="form-row">
                <div className="form-group full-width">
                  <label htmlFor="tags">
                    <Tag size={14} /> Tags
                  </label>
                  <input
                    type="text"
                    id="tags"
                    value={taskFormData.tags}
                    onChange={(e) => setTaskFormData({ ...taskFormData, tags: e.target.value })}
                    placeholder="Tag"
                    className="tags-input"
                  />
                </div>
              </div>

              {/* Task Description */}
              <div className="form-row">
                <div className="form-group full-width">
                  <label htmlFor="description">Task Description</label>
                  <textarea
                    id="description"
                    rows={4}
                    value={taskFormData.description}
                    onChange={(e) => setTaskFormData({ ...taskFormData, description: e.target.value })}
                    placeholder="Add Description"
                  />
                </div>
              </div>

              {/* Footer Buttons */}
              <div className="modal-footer">
                <button type="button" className="btn-secondary" onClick={() => setShowTaskModal(false)}>
                  Close
                </button>
                <button type="submit" className="btn-primary">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Full Notifications Panel */}
      {showFullNotifications && (
        <div className="modal-overlay" onClick={() => setShowFullNotifications(false)}>
          <div className="modal-container full-notifications-panel" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="header-title-with-icon">
                <Bell size={24} />
                <h2>All Notifications</h2>
                <span className="total-count-badge">{notifications.length}</span>
              </div>
              <button className="modal-close" onClick={() => setShowFullNotifications(false)}>
                <X size={20} />
              </button>
            </div>
            
            <div className="panel-filters">
              <div className="filter-buttons">
                <button 
                  className={`filter-btn ${notificationFilter === 'all' ? 'active' : ''}`}
                  onClick={() => setNotificationFilter('all')}
                >
                  All ({notifications.length})
                </button>
                <button 
                  className={`filter-btn ${notificationFilter === 'unread' ? 'active' : ''}`}
                  onClick={() => setNotificationFilter('unread')}
                >
                  Unread ({unreadNotifications})
                </button>
                <button 
                  className={`filter-btn ${notificationFilter === 'high' ? 'active' : ''}`}
                  onClick={() => setNotificationFilter('high')}
                >
                  High Priority ({notifications.filter(n => n.priority === 'high').length})
                </button>
              </div>
              <button className="mark-all-read-btn-large">Mark All as Read</button>
            </div>

            <div className="panel-content">
              {notifications
                .filter(n => notificationFilter === 'all' || 
                           (notificationFilter === 'unread' && n.unread) ||
                           (notificationFilter === 'high' && n.priority === 'high'))
                .map(notif => (
                <div key={notif.id} className={`notification-card-full ${notif.unread ? 'unread' : ''} priority-${notif.priority}`}>
                  <div className={`notification-icon-large type-${notif.type}`}>
                    {notif.type === 'success' && <CheckCircle size={24} />}
                    {notif.type === 'alert' && <AlertCircle size={24} />}
                    {notif.type === 'task' && <Target size={24} />}
                    {notif.type === 'invoice' && <Mail size={24} />}
                    {notif.type === 'lead' && <Star size={24} />}
                    {notif.type === 'calendar' && <Calendar size={24} />}
                    {notif.type === 'info' && <Info size={24} />}
                  </div>
                  <div className="notification-body-full">
                    <div className="notification-header-full">
                      <h4>{notif.title}</h4>
                      <span className={`priority-badge priority-${notif.priority}`}>{notif.priority}</span>
                    </div>
                    <p className="notification-description-full">{notif.description}</p>
                    <div className="notification-footer-full">
                      <span className="notification-time-full">{notif.time}</span>
                      <div className="notification-actions">
                        <button className="action-btn-small">View</button>
                        {notif.unread && <button className="action-btn-small">Mark as Read</button>}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Full Messages Panel */}
      {showFullMessages && (
        <div className="modal-overlay" onClick={() => setShowFullMessages(false)}>
          <div className="modal-container full-messages-panel" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="header-title-with-icon">
                <MessageSquare size={24} />
                <h2>All Messages</h2>
                <span className="total-count-badge">{messages.length}</span>
              </div>
              <button className="modal-close" onClick={() => setShowFullMessages(false)}>
                <X size={20} />
              </button>
            </div>
            
            <div className="panel-search">
              <div className="search-input-wrapper">
                <Search size={18} />
                <input 
                  type="text" 
                  placeholder="Search messages..." 
                  value={messageSearch}
                  onChange={(e) => setMessageSearch(e.target.value)}
                />
              </div>
              <button className="compose-btn-large">
                <Send size={18} />
                Compose
              </button>
            </div>

            <div className="panel-content">
              {messages
                .filter(m => messageSearch === '' || 
                           m.from.toLowerCase().includes(messageSearch.toLowerCase()) ||
                           m.message.toLowerCase().includes(messageSearch.toLowerCase()))
                .map(msg => (
                <div key={msg.id} className={`message-card-full ${msg.unread ? 'unread' : ''}`}>
                  <div className="message-avatar-large">
                    <span>{msg.avatar}</span>
                    <div className={`status-dot-large status-${msg.status}`}></div>
                  </div>
                  <div className="message-body-full">
                    <div className="message-header-full">
                      <div className="sender-info">
                        <h4>{msg.from}</h4>
                        <span className={`status-text status-${msg.status}`}>{msg.status}</span>
                      </div>
                      <span className="message-time-full">{msg.time}</span>
                    </div>
                    <p className="message-preview">{msg.message}</p>
                    <p className="message-full-text">{msg.fullMessage}</p>
                    <div className="message-actions">
                      <button className="action-btn-message">
                        <Send size={16} />
                        Reply
                      </button>
                      {msg.unread && <button className="action-btn-message">Mark as Read</button>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Edit Profile Modal */}
      {showEditProfile && (
        <EditProfile onClose={() => setShowEditProfile(false)} />
      )}

      {/* Share Modal */}
      {showShareModal && (
        <div className="share-modal-overlay" onClick={() => setShowShareModal(false)}>
          <div className="share-modal-container" onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="share-modal-header">
              <div className="share-modal-header-content">
                <div className="share-modal-icon">
                  <Share2 size={24} />
                </div>
                <div>
                  <h3 className="share-modal-title">Share Update</h3>
                  <p className="share-modal-subtitle">Share documents, ideas, and updates with your team</p>
                </div>
              </div>
              <button className="share-modal-close" onClick={() => setShowShareModal(false)}>
                <X size={20} />
              </button>
            </div>

            {/* User Info */}
            <div className="share-user-section">
              <div className="share-user-avatar">
                <img 
                  src="https://i.pravatar.cc/100?img=12" 
                  alt="User" 
                  className="share-avatar-img"
                />
                <div className="share-avatar-status"></div>
              </div>
              <div className="share-user-details">
                <h4 className="share-user-name">Alexander Mitchell</h4>
                <p className="share-user-role">Senior Software Architect</p>
              </div>
            </div>

            {/* Share Content */}
            <div className="share-content-section">
              <textarea
                className="share-textarea"
                placeholder="Share documents, ideas, updates, or anything with your team..."
                value={shareText}
                onChange={(e) => setShareText(e.target.value)}
                rows={5}
              />
              
              {/* Character Counter */}
              <div className="share-char-counter">
                <span className={shareText.length > 500 ? 'counter-warning' : ''}>
                  {shareText.length}/500
                </span>
              </div>
            </div>

            {/* Options Grid */}
            <div className="share-options-grid">
              {/* Department Selector */}
              <div className="share-option-item">
                <div className="share-option-header">
                  <Building2 size={18} />
                  <label>Department</label>
                </div>
                <select 
                  className="share-select"
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                >
                  <option value="All Departments">All Departments</option>
                  <option value="Engineering">Engineering & Development</option>
                  <option value="Product">Product Management</option>
                  <option value="Design">Design & UX</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Sales">Sales</option>
                  <option value="HR">Human Resources</option>
                  <option value="Finance">Finance</option>
                  <option value="Operations">Operations</option>
                  <option value="Customer Success">Customer Success</option>
                </select>
              </div>

              {/* Visibility Selector */}
              <div className="share-option-item">
                <div className="share-option-header">
                  <Globe2 size={18} />
                  <label>Visibility</label>
                </div>
                <select 
                  className="share-select"
                  value={shareVisibility}
                  onChange={(e) => setShareVisibility(e.target.value)}
                >
                  <option value="public">🌐 Public - Everyone can see</option>
                  <option value="team">👥 Team Only - Your team members</option>
                  <option value="department">🏢 Department - Department members</option>
                  <option value="private">🔒 Private - Only you</option>
                </select>
              </div>
            </div>

            {/* Attachment Options */}
            <div className="share-attachment-section">
              <h5 className="share-section-title">Add to your post</h5>
              <div className="share-attachment-buttons">
                <button className="share-attach-btn" title="Attach Files">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48"/>
                  </svg>
                  <span>Files</span>
                </button>
                <button className="share-attach-btn" title="Add Image">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                    <circle cx="8.5" cy="8.5" r="1.5"/>
                    <path d="M21 15l-5-5L5 21"/>
                  </svg>
                  <span>Image</span>
                </button>
                <button className="share-attach-btn" title="Add Video">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M23 7l-7 5 7 5V7z"/>
                    <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
                  </svg>
                  <span>Video</span>
                </button>
                <button className="share-attach-btn" title="Add Link">
                  <Link2 size={20} />
                  <span>Link</span>
                </button>
                <button className="share-attach-btn" title="Tag People">
                  <Users size={20} />
                  <span>Tag People</span>
                </button>
                <button className="share-attach-btn" title="Add Location">
                  <MapPin size={20} />
                  <span>Location</span>
                </button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="share-quick-actions">
              <div className="share-action-item">
                <input 
                  type="checkbox" 
                  id="allowComments" 
                  className="share-checkbox"
                  defaultChecked
                />
                <label htmlFor="allowComments" className="share-checkbox-label">
                  <MessageSquare size={16} />
                  <span>Allow Comments</span>
                </label>
              </div>
              <div className="share-action-item">
                <input 
                  type="checkbox" 
                  id="notifyUsers" 
                  className="share-checkbox"
                  defaultChecked
                />
                <label htmlFor="notifyUsers" className="share-checkbox-label">
                  <Bell size={16} />
                  <span>Notify Users</span>
                </label>
              </div>
              <div className="share-action-item">
                <input 
                  type="checkbox" 
                  id="pinPost" 
                  className="share-checkbox"
                />
                <label htmlFor="pinPost" className="share-checkbox-label">
                  <Star size={16} />
                  <span>Pin Post</span>
                </label>
              </div>
            </div>

            {/* Footer */}
            <div className="share-modal-footer">
              <button 
                className="share-btn-cancel"
                onClick={() => setShowShareModal(false)}
              >
                Cancel
              </button>
              <button 
                className="share-btn-post"
                onClick={() => {
                  console.log('Posting:', { shareText, selectedDepartment, shareVisibility });
                  setShareText('');
                  setShowShareModal(false);
                }}
                disabled={!shareText.trim()}
              >
                <Send size={18} />
                Post Update
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
