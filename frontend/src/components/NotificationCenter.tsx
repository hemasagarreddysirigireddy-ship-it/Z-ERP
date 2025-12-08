// Notification Center Component
import React, { useState } from 'react';
import { Bell, X, Check, Trash2, Settings } from 'lucide-react';
import './NotificationCenter.css';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
}

export const NotificationCenter: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const initialNotifications: Notification[] = [
    {
      id: '1',
      title: 'New Task Assigned',
      message: 'You have been assigned to "Frontend UI Design"',
      type: 'info',
      timestamp: new Date('2024-12-05T10:00:00'),
      read: false,
      actionUrl: '/projects'
    },
    {
      id: '2',
      title: 'Payment Received',
      message: 'Client ABC paid ₹350,000 for Project Phoenix',
      type: 'success',
      timestamp: new Date('2024-12-05T08:00:00'),
      read: false,
      actionUrl: '/accounts/banking'
    },
    {
      id: '3',
      title: 'Meeting Reminder',
      message: 'Team standup in 15 minutes',
      type: 'warning',
      timestamp: new Date('2024-12-05T10:25:00'),
      read: false
    }
  ];
  
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const getTimeAgo = (date: Date) => {
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (seconds < 60) return `${seconds}s ago`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  };

  return (
    <div className="notification-center">
      <button 
        className="notification-trigger"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="notification-badge">{unreadCount}</span>
        )}
      </button>

      {isOpen && (
        <>
          <div className="notification-overlay" onClick={() => setIsOpen(false)} />
          <div className="notification-panel">
            <div className="notification-header">
              <div className="notification-header-left">
                <h3>Notifications</h3>
                {unreadCount > 0 && (
                  <span className="unread-count">{unreadCount} new</span>
                )}
              </div>
              <div className="notification-header-actions">
                {unreadCount > 0 && (
                  <button 
                    className="icon-btn-small"
                    onClick={markAllAsRead}
                    title="Mark all as read"
                  >
                    <Check size={16} />
                  </button>
                )}
                <button 
                  className="icon-btn-small"
                  onClick={clearAll}
                  title="Clear all"
                >
                  <Trash2 size={16} />
                </button>
                <button className="icon-btn-small" title="Settings">
                  <Settings size={16} />
                </button>
                <button 
                  className="icon-btn-small"
                  onClick={() => setIsOpen(false)}
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            <div className="notification-list">
              {notifications.length === 0 ? (
                <div className="notification-empty">
                  <Bell size={48} />
                  <p>No notifications</p>
                  <span>You're all caught up!</span>
                </div>
              ) : (
                notifications.map(notification => (
                  <div 
                    key={notification.id}
                    className={`notification-item ${!notification.read ? 'unread' : ''} notification-${notification.type}`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="notification-content">
                      <div className="notification-title">{notification.title}</div>
                      <div className="notification-message">{notification.message}</div>
                      <div className="notification-time">{getTimeAgo(notification.timestamp)}</div>
                    </div>
                    <button 
                      className="notification-delete"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteNotification(notification.id);
                      }}
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default NotificationCenter;
