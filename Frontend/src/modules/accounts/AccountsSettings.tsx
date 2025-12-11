import React, { useState } from 'react';
import {
  Settings, Tag, Landmark, Mail, Shield, Plus, Edit2, Trash2,
  Save, X, Check, AlertCircle, ChevronDown, Bell, User, Lock
} from 'lucide-react';
import './AccountsSettings.css';

interface Category {
  id: string;
  name: string;
  type: 'income' | 'expense';
  color: string;
  icon: string;
  isActive: boolean;
}

interface BankConfig {
  id: string;
  bankName: string;
  accountNumber: string;
  isDefault: boolean;
  isActive: boolean;
  defaultPaymentMethod: string;
}

interface ReminderTemplate {
  id: string;
  name: string;
  type: 'email' | 'sms' | 'whatsapp';
  purpose: 'receivable' | 'payable';
  subject?: string;
  message: string;
  isActive: boolean;
}

interface Permission {
  id: string;
  module: string;
  feature: string;
  roles: {
    admin: boolean;
    manager: boolean;
    accountant: boolean;
    viewer: boolean;
  };
}

const AccountsSettings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'categories' | 'bank' | 'reminders' | 'permissions'>('categories');
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showBankModal, setShowBankModal] = useState(false);
  const [showTemplateModal, setShowTemplateModal] = useState(false);

  const [categories, setCategories] = useState<Category[]>([
    { id: '1', name: 'Salary', type: 'expense', color: '#EF4444', icon: 'User', isActive: true },
    { id: '2', name: 'Rent', type: 'expense', color: '#F59E0B', icon: 'Home', isActive: true },
    { id: '3', name: 'Utilities', type: 'expense', color: '#10B981', icon: 'Zap', isActive: true },
    { id: '4', name: 'Sales Revenue', type: 'income', color: '#3B82F6', icon: 'TrendingUp', isActive: true },
    { id: '5', name: 'Service Income', type: 'income', color: '#8B5CF6', icon: 'Briefcase', isActive: true },
    { id: '6', name: 'Marketing', type: 'expense', color: '#EC4899', icon: 'Megaphone', isActive: true },
  ]);

  const [bankConfigs, setBankConfigs] = useState<BankConfig[]>([
    { id: '1', bankName: 'HDFC Bank', accountNumber: '1234567890', isDefault: true, isActive: true, defaultPaymentMethod: 'NEFT' },
    { id: '2', bankName: 'ICICI Bank', accountNumber: '9876543210', isDefault: false, isActive: true, defaultPaymentMethod: 'RTGS' },
    { id: '3', bankName: 'Axis Bank', accountNumber: '5555666677', isDefault: false, isActive: false, defaultPaymentMethod: 'IMPS' },
  ]);

  const [templates, setTemplates] = useState<ReminderTemplate[]>([
    {
      id: '1',
      name: 'Payment Reminder - Polite',
      type: 'email',
      purpose: 'receivable',
      subject: 'Friendly Payment Reminder',
      message: 'Dear {customer_name}, This is a friendly reminder that your payment of {amount} is due on {due_date}. Please make the payment at your earliest convenience.',
      isActive: true
    },
    {
      id: '2',
      name: 'Payment Overdue - Urgent',
      type: 'email',
      purpose: 'receivable',
      subject: 'Urgent: Payment Overdue',
      message: 'Dear {customer_name}, Your payment of {amount} was due on {due_date} and is now {days_overdue} days overdue. Please settle this immediately.',
      isActive: true
    },
    {
      id: '3',
      name: 'Vendor Payment Notification',
      type: 'sms',
      purpose: 'payable',
      message: 'Payment of Rs.{amount} for Bill#{bill_number} has been processed. Payment ID: {payment_id}',
      isActive: true
    },
  ]);

  const [permissions, setPermissions] = useState<Permission[]>([
    { id: '1', module: 'Banking', feature: 'View Accounts', roles: { admin: true, manager: true, accountant: true, viewer: true } },
    { id: '2', module: 'Banking', feature: 'Add/Edit Accounts', roles: { admin: true, manager: true, accountant: true, viewer: false } },
    { id: '3', module: 'Banking', feature: 'Delete Accounts', roles: { admin: true, manager: false, accountant: false, viewer: false } },
    { id: '4', module: 'Receivables', feature: 'View Invoices', roles: { admin: true, manager: true, accountant: true, viewer: true } },
    { id: '5', module: 'Receivables', feature: 'Record Payments', roles: { admin: true, manager: true, accountant: true, viewer: false } },
    { id: '6', module: 'Payables', feature: 'Approve Bills', roles: { admin: true, manager: true, accountant: false, viewer: false } },
    { id: '7', module: 'Reports', feature: 'View Reports', roles: { admin: true, manager: true, accountant: true, viewer: true } },
    { id: '8', module: 'Reports', feature: 'Export Reports', roles: { admin: true, manager: true, accountant: true, viewer: false } },
  ]);

  const togglePermission = (permissionId: string, role: 'admin' | 'manager' | 'accountant' | 'viewer') => {
    setPermissions(permissions.map(p => 
      p.id === permissionId 
        ? { ...p, roles: { ...p.roles, [role]: !p.roles[role] } }
        : p
    ));
  };

  const renderCategories = () => (
    <div className="settings-section">
      <div className="section-header">
        <div>
          <h2>Income & Expense Categories</h2>
          <p>Manage transaction categories for better organization</p>
        </div>
        <button className="btn-primary" onClick={() => setShowCategoryModal(true)}>
          <Plus size={18} />
          Add Category
        </button>
      </div>

      <div className="categories-grid">
        <div className="category-type-section">
          <h3><span className="income-badge">Income Categories</span></h3>
          <div className="categories-list">
            {categories.filter(c => c.type === 'income').map(category => (
              <div key={category.id} className="category-card">
                <div className="category-icon" style={{ backgroundColor: category.color + '20', color: category.color }}>
                  <Tag size={20} />
                </div>
                <div className="category-info">
                  <h4>{category.name}</h4>
                  <span className={`status-badge ${category.isActive ? 'active' : 'inactive'}`}>
                    {category.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <div className="category-actions">
                  <button className="btn-icon"><Edit2 size={16} /></button>
                  <button className="btn-icon danger"><Trash2 size={16} /></button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="category-type-section">
          <h3><span className="expense-badge">Expense Categories</span></h3>
          <div className="categories-list">
            {categories.filter(c => c.type === 'expense').map(category => (
              <div key={category.id} className="category-card">
                <div className="category-icon" style={{ backgroundColor: category.color + '20', color: category.color }}>
                  <Tag size={20} />
                </div>
                <div className="category-info">
                  <h4>{category.name}</h4>
                  <span className={`status-badge ${category.isActive ? 'active' : 'inactive'}`}>
                    {category.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <div className="category-actions">
                  <button className="btn-icon"><Edit2 size={16} /></button>
                  <button className="btn-icon danger"><Trash2 size={16} /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderBankConfig = () => (
    <div className="settings-section">
      <div className="section-header">
        <div>
          <h2>Bank Configuration</h2>
          <p>Configure default bank accounts and payment methods</p>
        </div>
        <button className="btn-primary" onClick={() => setShowBankModal(true)}>
          <Plus size={18} />
          Add Bank Account
        </button>
      </div>

      <div className="bank-configs-list">
        {bankConfigs.map(bank => (
          <div key={bank.id} className="bank-config-card">
            <div className="bank-icon">
              <Landmark size={32} />
            </div>
            <div className="bank-details">
              <div className="bank-header">
                <h4>{bank.bankName}</h4>
                {bank.isDefault && <span className="default-badge">Default</span>}
              </div>
              <p className="account-number">Account: •••• {bank.accountNumber.slice(-4)}</p>
              <div className="bank-meta">
                <span className="payment-method">
                  <Check size={14} /> {bank.defaultPaymentMethod}
                </span>
                <span className={`status-badge ${bank.isActive ? 'active' : 'inactive'}`}>
                  {bank.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>
            <div className="bank-actions">
              <button className="btn-secondary">Edit</button>
              <label className="toggle-switch">
                <input type="checkbox" checked={bank.isActive} onChange={() => {}} />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderReminders = () => (
    <div className="settings-section">
      <div className="section-header">
        <div>
          <h2>Reminder Templates</h2>
          <p>Customize notification templates for payments and bills</p>
        </div>
        <button className="btn-primary" onClick={() => setShowTemplateModal(true)}>
          <Plus size={18} />
          Add Template
        </button>
      </div>

      <div className="templates-list">
        {templates.map(template => (
          <div key={template.id} className="template-card">
            <div className="template-header">
              <div className="template-icon" style={{ 
                backgroundColor: template.type === 'email' ? '#3B82F620' : template.type === 'sms' ? '#10B98120' : '#8B5CF620',
                color: template.type === 'email' ? '#3B82F6' : template.type === 'sms' ? '#10B981' : '#8B5CF6'
              }}>
                {template.type === 'email' ? <Mail size={20} /> : <Bell size={20} />}
              </div>
              <div className="template-info">
                <h4>{template.name}</h4>
                <div className="template-meta">
                  <span className="type-badge">{template.type.toUpperCase()}</span>
                  <span className="purpose-badge">{template.purpose}</span>
                </div>
              </div>
              <div className="template-actions">
                <label className="toggle-switch">
                  <input type="checkbox" checked={template.isActive} onChange={() => {}} />
                  <span className="toggle-slider"></span>
                </label>
                <button className="btn-icon"><Edit2 size={16} /></button>
                <button className="btn-icon danger"><Trash2 size={16} /></button>
              </div>
            </div>
            {template.subject && (
              <div className="template-subject">
                <strong>Subject:</strong> {template.subject}
              </div>
            )}
            <div className="template-message">
              <strong>Message:</strong>
              <p>{template.message}</p>
            </div>
            <div className="template-variables">
              <span className="variable-hint">
                <AlertCircle size={14} />
                Available variables: {'{customer_name}'}, {'{amount}'}, {'{due_date}'}, {'{days_overdue}'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPermissions = () => (
    <div className="settings-section">
      <div className="section-header">
        <div>
          <h2>User Permissions</h2>
          <p>Configure access control for different user roles</p>
        </div>
      </div>

      <div className="permissions-table-container">
        <table className="permissions-table">
          <thead>
            <tr>
              <th>Module</th>
              <th>Feature</th>
              <th><User size={16} /> Admin</th>
              <th><Shield size={16} /> Manager</th>
              <th><Lock size={16} /> Accountant</th>
              <th><User size={16} /> Viewer</th>
            </tr>
          </thead>
          <tbody>
            {permissions.map(permission => (
              <tr key={permission.id}>
                <td><strong>{permission.module}</strong></td>
                <td>{permission.feature}</td>
                <td>
                  <label className="checkbox-wrapper">
                    <input 
                      type="checkbox" 
                      checked={permission.roles.admin}
                      onChange={() => togglePermission(permission.id, 'admin')}
                    />
                    <span className="checkmark"></span>
                  </label>
                </td>
                <td>
                  <label className="checkbox-wrapper">
                    <input 
                      type="checkbox" 
                      checked={permission.roles.manager}
                      onChange={() => togglePermission(permission.id, 'manager')}
                    />
                    <span className="checkmark"></span>
                  </label>
                </td>
                <td>
                  <label className="checkbox-wrapper">
                    <input 
                      type="checkbox" 
                      checked={permission.roles.accountant}
                      onChange={() => togglePermission(permission.id, 'accountant')}
                    />
                    <span className="checkmark"></span>
                  </label>
                </td>
                <td>
                  <label className="checkbox-wrapper">
                    <input 
                      type="checkbox" 
                      checked={permission.roles.viewer}
                      onChange={() => togglePermission(permission.id, 'viewer')}
                    />
                    <span className="checkmark"></span>
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="permissions-actions">
        <button className="btn-primary">
          <Save size={18} />
          Save Changes
        </button>
        <button className="btn-secondary">
          <X size={18} />
          Reset
        </button>
      </div>
    </div>
  );

  return (
    <div className="accounts-settings">
      {/* Header */}
      <div className="settings-header">
        <div className="header-left">
          <Settings className="header-icon" />
          <div>
            <h1>Accounts Settings</h1>
            <p>Configure your accounting system preferences</p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="settings-tabs">
        <button 
          className={`tab-btn ${activeTab === 'categories' ? 'active' : ''}`}
          onClick={() => setActiveTab('categories')}
        >
          <Tag size={18} />
          Categories
        </button>
        <button 
          className={`tab-btn ${activeTab === 'bank' ? 'active' : ''}`}
          onClick={() => setActiveTab('bank')}
        >
          <Landmark size={18} />
          Bank Configuration
        </button>
        <button 
          className={`tab-btn ${activeTab === 'reminders' ? 'active' : ''}`}
          onClick={() => setActiveTab('reminders')}
        >
          <Mail size={18} />
          Reminder Templates
        </button>
        <button 
          className={`tab-btn ${activeTab === 'permissions' ? 'active' : ''}`}
          onClick={() => setActiveTab('permissions')}
        >
          <Shield size={18} />
          Permissions
        </button>
      </div>

      {/* Content */}
      <div className="settings-content">
        {activeTab === 'categories' && renderCategories()}
        {activeTab === 'bank' && renderBankConfig()}
        {activeTab === 'reminders' && renderReminders()}
        {activeTab === 'permissions' && renderPermissions()}
      </div>
    </div>
  );
};

export default AccountsSettings;
