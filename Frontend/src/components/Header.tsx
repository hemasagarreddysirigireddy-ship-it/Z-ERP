import React from 'react';
import { Search, Share2, Clock, Bell, Plus, Menu, MessageSquare, User, Settings, LogOut, ChevronDown } from 'lucide-react';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const [activeView, setActiveView] = React.useState<'week' | 'month' | 'year'>('month');
  const [showNotifications, setShowNotifications] = React.useState(false);
  const [showMessages, setShowMessages] = React.useState(false);
  const [showProfile, setShowProfile] = React.useState(false);

  const notifications = [
    { id: 1, title: 'New invoice received', time: '5 mins ago', type: 'invoice' },
    { id: 2, title: 'Task deadline approaching', time: '1 hour ago', type: 'task' },
    { id: 3, title: 'New lead assigned', time: '2 hours ago', type: 'lead' }
  ];

  const messages = [
    { id: 1, from: 'John Doe', message: 'Project update required', time: '10 mins ago' },
    { id: 2, from: 'Sarah Smith', message: 'Meeting at 3 PM', time: '30 mins ago' },
    { id: 3, from: 'Mike Johnson', message: 'Review completed', time: '1 hour ago' }
  ];

  return (
    <header className="header">
      <div className="header-left">
        <button className="menu-toggle" onClick={onMenuClick}>
          <Menu size={24} />
        </button>
        <div className="search-bar">
          <Search size={20} />
          <input 
            type="text" 
            placeholder="Search projects, tasks, contacts..." 
          />
        </div>
      </div>

      <div className="header-center">
        <div className="view-selector">
          <button 
            className={activeView === 'week' ? 'view-btn active' : 'view-btn'}
            onClick={() => setActiveView('week')}
          >
            Week
          </button>
          <button 
            className={activeView === 'month' ? 'view-btn active' : 'view-btn'}
            onClick={() => setActiveView('month')}
          >
            Month
          </button>
          <button 
            className={activeView === 'year' ? 'view-btn active' : 'view-btn'}
            onClick={() => setActiveView('year')}
          >
            Year
          </button>
        </div>
      </div>

      <div className="header-right">
        <button className="icon-btn" title="Share">
          <Share2 size={20} />
        </button>
        <button className="icon-btn" title="History">
          <Clock size={20} />
        </button>
        
        {/* Messages Dropdown */}
        <div className="dropdown">
          <button 
            className="icon-btn" 
            title="Messages"
            onClick={() => {
              setShowMessages(!showMessages);
              setShowNotifications(false);
              setShowProfile(false);
            }}
          >
            <MessageSquare size={20} />
            <span className="notification-badge">5</span>
          </button>
          {showMessages && (
            <div className="dropdown-menu messages-dropdown">
              <div className="dropdown-header">
                <h4>Messages</h4>
                <button className="view-all-btn">View All</button>
              </div>
              <div className="dropdown-content">
                {messages.map(msg => (
                  <div key={msg.id} className="message-item">
                    <div className="message-avatar">
                      <User size={16} />
                    </div>
                    <div className="message-content">
                      <div className="message-from">{msg.from}</div>
                      <div className="message-text">{msg.message}</div>
                      <div className="message-time">{msg.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Notifications Dropdown */}
        <div className="dropdown">
          <button 
            className="icon-btn notification-btn" 
            title="Notifications"
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowMessages(false);
              setShowProfile(false);
            }}
          >
            <Bell size={20} />
            <span className="notification-badge">3</span>
          </button>
          {showNotifications && (
            <div className="dropdown-menu notifications-dropdown">
              <div className="dropdown-header">
                <h4>Notifications</h4>
                <button className="view-all-btn">View All</button>
              </div>
              <div className="dropdown-content">
                {notifications.map(notif => (
                  <div key={notif.id} className="notification-item">
                    <div className={`notification-icon ${notif.type}`}>
                      <Bell size={16} />
                    </div>
                    <div className="notification-content">
                      <div className="notification-title">{notif.title}</div>
                      <div className="notification-time">{notif.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <button className="btn-primary">
          <Plus size={20} />
          New
        </button>

        {/* Profile Dropdown */}
        <div className="dropdown">
          <button 
            className="profile-btn"
            onClick={() => {
              setShowProfile(!showProfile);
              setShowMessages(false);
              setShowNotifications(false);
            }}
          >
            <User size={20} />
            <span>Admin User</span>
            <ChevronDown size={16} />
          </button>
          {showProfile && (
            <div className="dropdown-menu profile-dropdown">
              <div className="dropdown-content">
                <button className="dropdown-item">
                  <User size={16} />
                  <span>My Profile</span>
                </button>
                <button className="dropdown-item">
                  <Settings size={16} />
                  <span>Settings</span>
                </button>
                <div className="dropdown-divider"></div>
                <button className="dropdown-item logout">
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
