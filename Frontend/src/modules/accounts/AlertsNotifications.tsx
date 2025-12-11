import React, { useState } from 'react';
import { 
  Bell, 
  AlertTriangle, 
  CheckCircle,
  Info,
  X,
  Settings,
  Filter,
  DollarSign,
  Calendar,
  CreditCard,
  TrendingDown,
  Clock
} from 'lucide-react';
import './AlertsNotifications.css';

interface Notification {
  id: string;
  type: 'low-balance' | 'transaction' | 'payment-due' | 'unusual-activity' | 'info';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  priority: 'low' | 'medium' | 'high' | 'critical';
  accountName?: string;
  amount?: number;
}

const AlertsNotifications: React.FC = () => {
  const [filterType, setFilterType] = useState<'all' | 'unread' | 'critical'>('all');
  const [showSettings, setShowSettings] = useState(false);

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 'NOT001',
      type: 'low-balance',
      title: 'Low Balance Alert',
      message: 'Your Primary Business Account balance has fallen below ₹50,000',
      timestamp: '2023-12-01T14:30:00',
      isRead: false,
      priority: 'critical',
      accountName: 'Primary Business Account',
      amount: 45000
    },
    {
      id: 'NOT002',
      type: 'transaction',
      title: 'Large Transaction Completed',
      message: 'A payment of ₹150,000 has been processed to XYZ Suppliers',
      timestamp: '2023-12-01T13:15:00',
      isRead: false,
      priority: 'high',
      amount: 150000
    },
    {
      id: 'NOT003',
      type: 'payment-due',
      title: 'Payment Reminder',
      message: 'Rent payment of ₹80,000 is due in 3 days',
      timestamp: '2023-12-01T10:00:00',
      isRead: false,
      priority: 'medium',
      amount: 80000
    },
    {
      id: 'NOT004',
      type: 'unusual-activity',
      title: 'Unusual Account Activity',
      message: 'Multiple transactions detected from unusual location',
      timestamp: '2023-12-01T09:45:00',
      isRead: true,
      priority: 'critical',
      accountName: 'Savings Account'
    },
    {
      id: 'NOT005',
      type: 'transaction',
      title: 'Payment Received',
      message: 'Customer payment of ₹75,000 received for Invoice #INV-1234',
      timestamp: '2023-11-30T16:20:00',
      isRead: true,
      priority: 'low',
      amount: 75000
    },
    {
      id: 'NOT006',
      type: 'info',
      title: 'Statement Ready',
      message: 'Your November bank statement is ready for download',
      timestamp: '2023-11-30T08:00:00',
      isRead: true,
      priority: 'low'
    },
    {
      id: 'NOT007',
      type: 'low-balance',
      title: 'Balance Warning',
      message: 'Payroll Account balance is approaching minimum threshold',
      timestamp: '2023-11-29T17:30:00',
      isRead: true,
      priority: 'high',
      accountName: 'Payroll Account',
      amount: 65000
    },
    {
      id: 'NOT008',
      type: 'payment-due',
      title: 'Upcoming Payment',
      message: 'Salary payment of ₹250,000 scheduled for December 5th',
      timestamp: '2023-11-29T09:00:00',
      isRead: true,
      priority: 'medium',
      amount: 250000
    },
    {
      id: 'NOT009',
      type: 'transaction',
      title: 'Recurring Payment Processed',
      message: 'Monthly software subscription of ₹5,000 has been debited',
      timestamp: '2023-11-28T12:00:00',
      isRead: true,
      priority: 'low',
      amount: 5000
    },
    {
      id: 'NOT010',
      type: 'info',
      title: 'Account Maintenance',
      message: 'Scheduled maintenance on Dec 15th from 2 AM to 4 AM',
      timestamp: '2023-11-28T10:00:00',
      isRead: true,
      priority: 'low'
    }
  ]);

  const [alertSettings, setAlertSettings] = useState({
    lowBalanceThreshold: 50000,
    largeTransactionAmount: 100000,
    paymentReminderDays: 3,
    emailNotifications: true,
    smsNotifications: true,
    pushNotifications: true,
    unusualActivityAlert: true
  });

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'low-balance':
        return <TrendingDown size={24} />;
      case 'transaction':
        return <CreditCard size={24} />;
      case 'payment-due':
        return <Calendar size={24} />;
      case 'unusual-activity':
        return <AlertTriangle size={24} />;
      default:
        return <Info size={24} />;
    }
  };

  const getPriorityClass = (priority: string) => {
    const classes: { [key: string]: string } = {
      'low': 'priority-low',
      'medium': 'priority-medium',
      'high': 'priority-high',
      'critical': 'priority-critical'
    };
    return classes[priority] || 'priority-low';
  };

  const getTypeClass = (type: string) => {
    const classes: { [key: string]: string } = {
      'low-balance': 'type-warning',
      'transaction': 'type-info',
      'payment-due': 'type-reminder',
      'unusual-activity': 'type-critical',
      'info': 'type-info'
    };
    return classes[type] || 'type-info';
  };

  const filteredNotifications = notifications.filter(notif => {
    if (filterType === 'unread') return !notif.isRead;
    if (filterType === 'critical') return notif.priority === 'critical' || notif.priority === 'high';
    return true;
  });

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => 
      n.id === id ? { ...n, isRead: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;
  const criticalCount = notifications.filter(n => n.priority === 'critical' && !n.isRead).length;

  return (
    <div className="alerts-notifications-container">
      {/* Header */}
      <div className="alerts-header">
        <div className="alerts-header-left">
          <div className="alerts-icon-main">
            <Bell size={28} />
          </div>
          <div>
            <h1>Alerts & Notifications</h1>
            <p>Stay updated with account activities and reminders</p>
          </div>
        </div>
        <div className="alerts-header-actions">
          <button 
            className="btn-secondary"
            onClick={() => setShowSettings(true)}
          >
            <Settings size={18} />
            Settings
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="alert-summary">
        <div className="summary-card unread">
          <div className="summary-icon">
            <Bell size={24} />
          </div>
          <div className="summary-content">
            <h3>{unreadCount}</h3>
            <p>Unread Notifications</p>
          </div>
        </div>

        <div className="summary-card critical">
          <div className="summary-icon">
            <AlertTriangle size={24} />
          </div>
          <div className="summary-content">
            <h3>{criticalCount}</h3>
            <p>Critical Alerts</p>
          </div>
        </div>

        <div className="summary-card today">
          <div className="summary-icon">
            <Clock size={24} />
          </div>
          <div className="summary-content">
            <h3>
              {notifications.filter(n => 
                new Date(n.timestamp).toDateString() === new Date().toDateString()
              ).length}
            </h3>
            <p>Today's Notifications</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="alerts-filters">
        <div className="filter-buttons">
          <button 
            className={filterType === 'all' ? 'active' : ''}
            onClick={() => setFilterType('all')}
          >
            All Notifications
          </button>
          <button 
            className={filterType === 'unread' ? 'active' : ''}
            onClick={() => setFilterType('unread')}
          >
            Unread ({unreadCount})
          </button>
          <button 
            className={filterType === 'critical' ? 'active' : ''}
            onClick={() => setFilterType('critical')}
          >
            Critical ({criticalCount})
          </button>
        </div>
        {unreadCount > 0 && (
          <button className="btn-mark-read" onClick={markAllAsRead}>
            <CheckCircle size={16} />
            Mark All as Read
          </button>
        )}
      </div>

      {/* Notifications List */}
      <div className="notifications-list">
        {filteredNotifications.map(notif => (
          <div 
            key={notif.id} 
            className={`notification-card ${!notif.isRead ? 'unread' : ''} ${getTypeClass(notif.type)} ${getPriorityClass(notif.priority)}`}
          >
            <div className="notification-icon">
              {getNotificationIcon(notif.type)}
            </div>

            <div className="notification-content">
              <div className="notification-header">
                <h3>{notif.title}</h3>
                <div className="notification-badges">
                  <span className={`priority-badge ${getPriorityClass(notif.priority)}`}>
                    {notif.priority}
                  </span>
                  {!notif.isRead && <span className="unread-badge">New</span>}
                </div>
              </div>

              <p className="notification-message">{notif.message}</p>

              {notif.accountName && (
                <div className="notification-detail">
                  <CreditCard size={14} />
                  <span>{notif.accountName}</span>
                </div>
              )}

              {notif.amount && (
                <div className="notification-detail amount">
                  <DollarSign size={14} />
                  <span>₹ {notif.amount.toLocaleString()}</span>
                </div>
              )}

              <div className="notification-footer">
                <span className="notification-time">
                  <Clock size={14} />
                  {new Date(notif.timestamp).toLocaleString()}
                </span>
                <div className="notification-actions">
                  {!notif.isRead && (
                    <button 
                      className="btn-action"
                      onClick={() => markAsRead(notif.id)}
                    >
                      <CheckCircle size={16} />
                      Mark as Read
                    </button>
                  )}
                  <button 
                    className="btn-action delete"
                    onClick={() => deleteNotification(notif.id)}
                  >
                    <X size={16} />
                    Dismiss
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {filteredNotifications.length === 0 && (
          <div className="no-notifications">
            <Bell size={64} />
            <h3>No Notifications</h3>
            <p>You're all caught up!</p>
          </div>
        )}
      </div>

      {/* Settings Modal */}
      {showSettings && (
        <div className="modal-overlay" onClick={() => setShowSettings(false)}>
          <div className="modal-content settings-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Notification Settings</h2>
              <button 
                className="modal-close"
                onClick={() => setShowSettings(false)}
              >
                ×
              </button>
            </div>

            <div className="modal-body">
              <div className="settings-section">
                <h3>Alert Thresholds</h3>
                <div className="settings-field">
                  <label>Low Balance Alert Threshold</label>
                  <div className="input-with-icon">
                    <DollarSign size={18} />
                    <input
                      type="number"
                      value={alertSettings.lowBalanceThreshold}
                      onChange={(e) => setAlertSettings({
                        ...alertSettings,
                        lowBalanceThreshold: parseInt(e.target.value)
                      })}
                    />
                  </div>
                </div>

                <div className="settings-field">
                  <label>Large Transaction Amount</label>
                  <div className="input-with-icon">
                    <DollarSign size={18} />
                    <input
                      type="number"
                      value={alertSettings.largeTransactionAmount}
                      onChange={(e) => setAlertSettings({
                        ...alertSettings,
                        largeTransactionAmount: parseInt(e.target.value)
                      })}
                    />
                  </div>
                </div>

                <div className="settings-field">
                  <label>Payment Reminder (Days in Advance)</label>
                  <input
                    type="number"
                    value={alertSettings.paymentReminderDays}
                    onChange={(e) => setAlertSettings({
                      ...alertSettings,
                      paymentReminderDays: parseInt(e.target.value)
                    })}
                  />
                </div>
              </div>

              <div className="settings-section">
                <h3>Notification Channels</h3>
                <div className="settings-toggle">
                  <label>
                    <input
                      type="checkbox"
                      checked={alertSettings.emailNotifications}
                      onChange={(e) => setAlertSettings({
                        ...alertSettings,
                        emailNotifications: e.target.checked
                      })}
                    />
                    <span>Email Notifications</span>
                  </label>
                </div>

                <div className="settings-toggle">
                  <label>
                    <input
                      type="checkbox"
                      checked={alertSettings.smsNotifications}
                      onChange={(e) => setAlertSettings({
                        ...alertSettings,
                        smsNotifications: e.target.checked
                      })}
                    />
                    <span>SMS Notifications</span>
                  </label>
                </div>

                <div className="settings-toggle">
                  <label>
                    <input
                      type="checkbox"
                      checked={alertSettings.pushNotifications}
                      onChange={(e) => setAlertSettings({
                        ...alertSettings,
                        pushNotifications: e.target.checked
                      })}
                    />
                    <span>Push Notifications</span>
                  </label>
                </div>

                <div className="settings-toggle">
                  <label>
                    <input
                      type="checkbox"
                      checked={alertSettings.unusualActivityAlert}
                      onChange={(e) => setAlertSettings({
                        ...alertSettings,
                        unusualActivityAlert: e.target.checked
                      })}
                    />
                    <span>Unusual Activity Alerts</span>
                  </label>
                </div>
              </div>

              <div className="modal-actions">
                <button 
                  className="btn-primary"
                  onClick={() => {
                    console.log('Settings saved:', alertSettings);
                    setShowSettings(false);
                  }}
                >
                  Save Settings
                </button>
                <button 
                  className="btn-secondary"
                  onClick={() => setShowSettings(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlertsNotifications;
